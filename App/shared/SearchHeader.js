import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import globalstyles from "../shared/globalStyles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataSupabase } from "../api/supabaseClient";

const SearchComponent = ({
  searchInput,
  setSearchInput,
  showProfileImage = true,
}) => {
  const navigation = useNavigation();
  const [clients, setClients] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [subservices, setSubservices] = useState([]);
  const [filteredSubservices, setFilteredSubservices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hour
  const CACHE_KEY_NONPROFITS = "cache_nonprofits";

  useEffect(() => {
    fetch("https://ellis-test-data.com:8000/Clients")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      })
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  useEffect(() => {
    const loadServiceAndNonProfitsData = async () => {
      try {
        setLoading(true);
        const nonProfitsData = await fetchWithCache(
          CACHE_KEY_NONPROFITS,
          "https://ellis-test-data.com:8000/NonProfits"
        );
        setOrganizations(nonProfitsData);
        setFilteredOrganizations(nonProfitsData);
      } catch (error) {
        console.error("Failed to load NonProfits", error);
      } finally {
        setLoading(false);
      }
    };

    loadServiceAndNonProfitsData();

    // Fetch services and extract subservices
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://ellis-test-data.com:8000/Services"
        );
        const servicesData = await response.json();
        const allSubservices = servicesData.flatMap(
          (service) => service.Subservices
        );
        setSubservices(allSubservices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const fetchWithCache = async (cacheKey, url) => {
    try {
      const cachedItem = await AsyncStorage.getItem(cacheKey);
      if (cachedItem) {
        const { data, timestamp } = JSON.parse(cachedItem);
        if (Date.now() - timestamp < CACHE_EXPIRATION) {
          return data;
        }
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({ data, timestamp: Date.now() })
      );
      return data;
    } catch (error) {
      console.error("Error fetching data with cache:", error);
      throw error;
    }
  };

  const handleSearch = (text) => {
    setSearchInput(text);
    if (text.trim()) {
      // Filter organizations
      const filteredOrgs = organizations.filter((organization) => {
        const nameMatch = organization.name
          .toLowerCase()
          .includes(text.toLowerCase());
        const attributesNameMatch =
          organization.attributes?.Name?.toLowerCase().includes(
            text.toLowerCase()
          );

        const tagsMatch =
          typeof organization.attributes?.Tags === "string"
            ? organization.attributes.Tags.toLowerCase().includes(
                text.toLowerCase()
              )
            : Array.isArray(organization.attributes?.Tags)
            ? organization.attributes.Tags.some((tag) =>
                tag.toLowerCase().includes(text.toLowerCase())
              )
            : false;

        const topicsMatch =
          typeof organization.attributes?.Topics === "string"
            ? organization.attributes.Topics.toLowerCase().includes(
                text.toLowerCase()
              )
            : Array.isArray(organization.attributes?.Topics)
            ? organization.attributes.Topics.some((topic) =>
                topic.toLowerCase().includes(text.toLowerCase())
              )
            : false;

        const providedServicesMatch = Array.isArray(
          organization.attributes?.["Provided services"]
        )
          ? organization.attributes["Provided services"].some((service) =>
              service.toLowerCase().includes(text.toLowerCase())
            )
          : false;

        return (
          nameMatch ||
          attributesNameMatch ||
          tagsMatch ||
          topicsMatch ||
          providedServicesMatch
        );
      });

      // Filter subservices
      const filteredSubs = subservices.filter((subservice) =>
        subservice.name.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredOrganizations(filteredOrgs);
      setFilteredSubservices(filteredSubs);
    } else {
      setFilteredOrganizations(organizations);
      setFilteredSubservices([]);
    }
  };

  const handleSendSearch = async () => {
    if (!searchInput.trim()) return;

    const searchTerm = searchInput;
    const searchId = `search-${Date.now()}`; // Use a unique ID if not found
    const newTimestamp = new Date().toISOString();

    try {
      // Step 1: Check if the record already exists
      const { data: existingRecords, error: fetchError } = await dataSupabase
        .from("search_data")
        .select("id, iterations, time")
        .eq("search", searchTerm)
        .single(); // Fetch only one record matching the search term

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("❌ Error checking for existing search:", fetchError);
        return;
      }

      if (existingRecords) {
        // Step 2: If it exists, update iterations and add timestamp
        const updatedIterations = existingRecords.iterations + 1;
        const updatedTime = [...existingRecords.time, newTimestamp];

        const { error: updateError } = await dataSupabase
          .from("search_data")
          .update({ iterations: updatedIterations, time: updatedTime })
          .eq("id", existingRecords.id);

        if (updateError) {
          console.error("❌ Error updating existing search:", updateError);
        } else {
          console.log("✅ Search term updated in Supabase!");
        }
      } else {
        // Step 3: If no record exists, insert a new one
        const newEntry = {
          search: searchTerm,
          Organization: searchInput,
          Subservice: searchInput,
          iterations: 1,
          id: searchId,
          time: [newTimestamp],
        };

        const { error: insertError } = await dataSupabase
          .from("search_data")
          .insert([newEntry]);

        if (insertError) {
          console.error("❌ Error inserting new search term:", insertError);
        } else {
          console.log("✅ New search term inserted into Supabase!");
        }
      }
    } catch (error) {
      console.error("❌ Error processing search term:", error);
    }

    setSearchInput(""); // Clear input after sending data
  };

  const handleSearchPress = async (organization) => {
    const searchTerm = searchInput;
    const organizationName = organization.attributes?.Name || organization.name;
    const orgId = organization.id || `placeholder-${Date.now()}`;
    const newTimestamp = new Date().toISOString();

    try {
      // Step 1: Check if the record already exists
      const { data: existingRecords, error: fetchError } = await dataSupabase
        .from("search_data")
        .select("id, iterations, time")
        .eq("id", orgId)
        .single(); // Fetch only one record

      if (fetchError && fetchError.code !== "PGRST116") {
        // Ignore "PGRST116" because it means no record was found (which is expected sometimes)
        console.error(
          "❌ Error checking for existing organization:",
          fetchError
        );
        return;
      }

      if (existingRecords) {
        // Step 2: If the record exists, update it
        const updatedIterations = existingRecords.iterations + 1;
        const updatedTime = [...existingRecords.time, newTimestamp]; // Append new timestamp

        const { error: updateError } = await dataSupabase
          .from("search_data")
          .update({ iterations: updatedIterations, time: updatedTime })
          .eq("id", orgId);

        if (updateError) {
          console.error(
            "❌ Error updating existing organization:",
            updateError
          );
        } else {
          console.log("✅ Organization search updated in Supabase!");
        }
      } else {
        // Step 3: If no record exists, insert a new one
        const newEntry = {
          search: searchTerm,
          Organization: organizationName,
          Subservice: null,
          iterations: 1,
          id: orgId,
          time: [newTimestamp], // Start with one timestamp
        };

        const { error: insertError } = await dataSupabase
          .from("search_data")
          .insert([newEntry]);

        if (insertError) {
          console.error(
            "❌ Error inserting new organization search:",
            insertError
          );
        } else {
          console.log("✅ New organization search inserted into Supabase!");
        }
      }
    } catch (error) {
      console.error("❌ Error processing organization search:", error);
    }

    setSearchInput("");
    navigation.navigate("Amenity Page", { amenity: organization });
  };

  const handleSubservicePress = async (subservice) => {
    const searchTerm = searchInput;
    const subserviceName = subservice.name;
    const subserviceId = subservice.valueId || `placeholder-${Date.now()}`;
    const newTimestamp = new Date().toISOString();

    try {
      const { data: existingRecords, error: fetchError } = await dataSupabase
        .from("search_data")
        .select("id, iterations, time")
        .eq("id", subserviceId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("❌ Error checking for existing subservice:", fetchError);
        return;
      }

      if (existingRecords) {
        const updatedIterations = existingRecords.iterations + 1;
        const updatedTime = [...existingRecords.time, newTimestamp];

        const { error: updateError } = await dataSupabase
          .from("search_data")
          .update({ iterations: updatedIterations, time: updatedTime })
          .eq("id", subserviceId);

        if (updateError) {
          console.error("❌ Error updating subservice:", updateError);
        } else {
          console.log("✅ Subservice search updated in Supabase!");
        }
      } else {
        const newEntry = {
          search: searchTerm,
          Subservice: subserviceName,
          Organization: null,
          iterations: 1,
          id: subserviceId,
          time: [newTimestamp],
        };

        const { error: insertError } = await dataSupabase
          .from("search_data")
          .insert([newEntry]);

        if (insertError) {
          console.error(
            "❌ Error inserting new subservice search:",
            insertError
          );
        } else {
          console.log("✅ New subservice search inserted into Supabase!");
        }
      }
    } catch (error) {
      console.error("❌ Error processing subservice search:", error);
    }

    setSearchInput("");
    navigation.navigate("Referral Location", {
      option: subserviceName,
      providedServicesId: subservice.valueId,
    });
  };

  const handlePress = (client) => {
    setSearchInput("");
    navigation.navigate("Profile Page", { client: clients[0] });
  };

  const combinedResults = [
    { type: "header", title: "Services" },
    ...filteredSubservices.map((service) => ({ type: "service", ...service })),
    { type: "header", title: "Organizations" },
    ...filteredOrganizations.map((org) => ({ type: "organization", ...org })),
  ];

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={globalstyles.searchSection}>
          <View style={globalstyles.searchContainer}>
            <Icon
              name="search-outline"
              size={25}
              color="#616a6c"
              style={globalstyles.searchIcon}
            />
            <TextInput
              style={globalstyles.searchBar}
              value={searchInput}
              onChangeText={handleSearch}
              placeholder="Type in keyword"
            />
          </View>

          {showProfileImage && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handlePress(clients[0])}
            >
              <Image
                source={require("../assets/images/userImage1.jpg")}
                style={[
                  globalstyles.profileImage,
                  { marginLeft: 10, width: 45, height: 45 },
                ]}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      {searchInput.trim() !== "" && (
        <View style={[styles.floatingListContainer, { maxHeight: 300 }]}>
          {filteredSubservices.length === 0 &&
          filteredOrganizations.length === 0 ? (
            <View>
              <Text style={styles.noResults}>
                No services or organizations found. Type the full name and press
                the button below to send a request.
              </Text>
              <TouchableOpacity onPress={handleSendSearch}>
                <Text style={styles.sendSearchText}>
                  Send "{searchInput}" to database for future addition
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={combinedResults}
              keyExtractor={(item, index) =>
                item.id?.toString() || index.toString()
              }
              renderItem={({ item }) => {
                if (item.type === "header") {
                  return <Text style={styles.header}>{item.title}</Text>;
                } else if (item.type === "service") {
                  return (
                    <TouchableOpacity
                      onPress={() => handleSubservicePress(item)}
                      style={styles.organizationItem}
                    >
                      <Text style={styles.organizationName}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                } else if (item.type === "organization") {
                  return (
                    <TouchableOpacity
                      onPress={() => handleSearchPress(item)}
                      style={styles.organizationItem}
                    >
                      <Text style={styles.organizationName}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }
              }}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    marginLeft: 10,
    color: "#094852",
  },
  organizationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 5,
    borderRadius: 8,
  },
  organizationName: {
    fontSize: 16,
    color: "#333",
  },
  floatingListContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 5,
    maxHeight: 300,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#10798B",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  noResults: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
    color: "#555",
  },
  sendSearchText: {
    marginTop: 10,
    marginHorizontal: 15,
    color: "#10798B",
    fontSize: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default SearchComponent;

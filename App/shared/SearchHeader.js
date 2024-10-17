import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import globalstyles from "../shared/globalStyles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hour
  const CACHE_KEY_NONPROFITS = "cache_nonprofits";

  useEffect(() => {
    fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients")
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
          "http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/NonProfits"
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
          "http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Services"
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

  const handleSendSearch = () => {
    const dataToSend = {
      search: searchInput,
      Organization: searchInput,
      iterations: 1,
      id: `${searchInput} Needs an id`,
    };

    fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send data");
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage(`Data for "${searchInput}" sent successfully!`);
        setModalVisible(true); // Show modal
      })
      .catch((error) => {
        console.error("Error sending data to /Data endpoint:", error);
      });

    setSearchInput("");
  };

  const handleSearchPress = (organization) => {
    const dataToSend = {
      search: searchInput,
      Organization: organization.attributes?.Name || organization.name,
      iterations: 1,
      id: organization.id,
    };

    fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send data");
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage(`Data for "${organization.name}" sent successfully!`);
        setModalVisible(true); // Show modal
      })
      .catch((error) => {
        console.error("Error sending data to /Data endpoint:", error);
      });

    setSearchInput("");
    navigation.navigate("Amenity Page", { amenity: organization });
  };

  const handleSubservicePress = (subservice) => {
    navigation.navigate("Referral Location", {
      option: subservice.name,
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
              blurOnSubmit={true}
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
          />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{successMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
});

export default SearchComponent;

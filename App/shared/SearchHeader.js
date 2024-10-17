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
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import globalstyles from "../shared/globalStyles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

const SearchComponent = ({
  searchInput,
  setSearchInput,
  showProfileImage = true,
}) => {
  const navigation = useNavigation();
  const [clients, setClients] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subservices, setSubservices] = useState([]);

  const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hour
  const CACHE_KEY_NONPROFITS = "cache_nonprofits";

  useEffect(() => {
    fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
        setFilteredClients(data);
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
      const filtered = organizations.filter((organization) => {
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

      const subservicesFiltered = subservices.filter((subservice) =>
        subservice.name.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredOrganizations([...filtered, ...subservicesFiltered]);
    } else {
      setFilteredOrganizations(organizations);
    }
  };

  const handleSubservicePress = (subservice) => {
    navigation.navigate("Referral Location", {
      option: subservice.name,
      providedServicesId: subservice.valueId,
    });
  };

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
              onPress={() => handlePress(filteredClients[0])}
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
            data={filteredOrganizations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSubservicePress(item)}
                style={styles.organizationItem}
              >
                <Text style={styles.organizationName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Handle modal close on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{successMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)} // Close modal on button press
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
    maxHeight: 300, // Limit the height of the container
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
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

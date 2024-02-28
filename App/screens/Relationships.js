import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchComponent from "../shared/SearchHeader";
import Card from "../shared/Card";
import globalstyles from "../shared/globalStyles";
import imageMap from "../shared/getProfileImage";
import ProgressBar from "../shared/ProgressBar";
import { useNavigation } from "@react-navigation/native";

const RelationshipPage = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("all"); // default filter
  const [searchInput, setSearchInput] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/Clients")
      .then((response) => response.json())
      .then((data) => {
        setAllClients(data);
        setFilteredClients(data);
        let filtered = data;
        if (searchInput) {
          // If there's a search input, filter based on the search input and the status.
          filtered = filtered.filter((client) =>
            client.fullName.toLowerCase().includes(searchInput.toLowerCase())
          );
        }
        if (filter && filter !== "all") {
          filtered = filtered.filter(
            (client) => client.status.toLowerCase() === filter.toLowerCase()
          );
        }

        setFilteredClients(filtered);
      });
  }, [filter, searchInput]);

  const handleSearchChange = (text) => {
    setSearchInput(text);

    let filtered;

    if (text) {
      filtered = allClients.filter((client) =>
        client.fullName.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      filtered = allClients;
    }

    // If search input is cleared, show all clients or consider the filter.
    if (filter && filter !== "all") {
      filtered = filtered.filter(
        (client) => client.status.toLowerCase() === filter.toLowerCase()
      );
      setFilteredClients(filtered);
    }
  };

  const toggleFilter = (selectedFilter) => {
    if (filter === selectedFilter) {
      setFilter("all"); // Reset filter
    } else {
      setFilter(selectedFilter);
    }
  };

  return (
    <SafeAreaView style={globalstyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchComponent
          searchInput={searchInput}
          setSearchInput={handleSearchChange}
        />

        {/* Favorite People Section */}
        <View style={styles.relationshipsContainer}>
          <Text style={globalstyles.title}>Relationships</Text>
        </View>
        <View style={styles.favoriteContainer}>
          <Text style={styles.headerText}>Favorites</Text>
          <ScrollView horizontal={true}>
            <Image
              source={require("../assets/images/userImage1.jpg")}
              style={styles.favoriteIcons}
            />
            <Image
              source={require("../assets/images/userImage2.jpg")}
              style={styles.favoriteIcons}
            />
            {/* ... add more profiles as needed */}
          </ScrollView>
        </View>

        {/* Filter Section */}
        <View>
          <Text style={styles.headerText}>All Relationships</Text>
        </View>
        <View style={styles.filterContainer}>
          {["Current", "Requested", "Past"].map((statusFilter) => (
            <TouchableOpacity
              key={statusFilter}
              onPress={() => toggleFilter(statusFilter)}
              activeOpacity={1}
            >
              <View
                style={[
                  styles.filterButton,
                  statusFilter === filter && styles.selectedFilterButton,
                ]}
                key={statusFilter}
              >
                <Text
                  style={[
                    styles.filterText,
                    statusFilter === filter && styles.selectedFilterText,
                  ]}
                >
                  {statusFilter}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {filteredClients.map((client) => (
          <TouchableOpacity
            key={client.id}
            onPress={() => navigation.navigate("Profile Page", { client })}
            activeOpacity={1}
          >
            <Card key={client.id}>
              <View style={styles.headerContainer}>
                <View style={styles.header}>
                  <View style={styles.start}>
                    <Image
                      source={imageMap[client.image]}
                      style={globalstyles.profileImage}
                    />
                    <View>
                      <Text style={styles.name}>{client.fullName}</Text>
                      <Text style={styles.recency}>
                        {client.status === "Requested"
                          ? `Requested service ${client.recency}`
                          : `Last met: ${client.recency}`}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={[
                        styles.status,
                        client.status === "Current"
                          ? {
                              backgroundColor: "#e7f2f3",
                              borderColor: "#5fa5b1",
                            }
                          : {},
                        client.status === "Requested"
                          ? {
                              backgroundColor: "#fdf8ee",
                              borderColor: "#f3c98b",
                            }
                          : {},
                        client.status === "Past"
                          ? {
                              backgroundColor: "#dbdddd",
                              borderColor: "#c7cccc",
                            }
                          : {},
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          client.status === "Current"
                            ? { color: "#41737a" }
                            : {},
                          client.status === "Requested"
                            ? { color: "#694e27" }
                            : {},
                          client.status === "Past" ? { color: "#6c7576" } : {},
                        ]}
                      >
                        {client.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={
                  client.status === "Requested"
                    ? styles.requestedContainer
                    : styles.providerContainer
                }
              >
                <Text
                  style={
                    client.status === "Requested"
                      ? styles.requestedText
                      : styles.providersText
                  }
                >
                  {client.status === "Requested"
                    ? `REQUESTED SERVICES`
                    : `${client.providers}`}
                </Text>
              </View>
              <View style={globalstyles.tagContainer}>
                {client.services && Array.isArray(client.services)
                  ? client.services.map((services, index) => (
                      <View key={index} style={globalstyles.tagBackground}>
                        <Text style={globalstyles.individualTags}>
                          {services}
                        </Text>
                      </View>
                    ))
                  : null}
              </View>
              {/* <ProgressBar progress={client.progress} /> */}
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  relationshipsContainer: {
    marginVertical: 15,
  },

  favoriteContainer: {
    marginBottom: 20,
  },

  headerText: {
    fontSize: 20,
    color: "#727c7d",
    marginBottom: 10,
    fontFamily: "gabarito-regular",
  },

  favoriteIcons: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 10,
  },

  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  filterButton: {
    borderColor: "#1e8191",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
  },

  filterText: {
    fontSize: 18,
    color: "#094851",
    fontFamily: "gabarito-medium",
  },

  selectedFilterText: {
    color: "#ffffff",
  },

  selectedFilterButton: {
    backgroundColor: "#1e8191",
  },

  headerContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },

  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  start: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    color: "#053e59",
    fontSize: 24,
    fontFamily: "gabarito-semibold",
  },

  recency: {
    color: "#636c6e",
    fontSize: 16,
    fontFamily: "karla-regular",
  },

  status: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 18,
  },

  statusText: {
    padding: 8,
    fontSize: 12,
  },

  requestedContainer: {
    marginBottom: 0,
  },

  providerContainer: {
    marginBottom: 10,
  },

  requestedText: {
    fontSize: 16,
    color: "#677072",
    fontFamily: "gabarito-regular",
  },

  providersText: {
    fontSize: 16,
    color: "#677072",
    fontFamily: "karla-regular",
  },
});

export default RelationshipPage;

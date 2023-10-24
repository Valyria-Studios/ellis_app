import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "@expo/vector-icons/Fontisto";
import Icon from "@expo/vector-icons/Ionicons";
import Card from "../shared/Card";
import Clients from "../api/Clients";
import globalstyles from "../shared/globalStyles";

const RelationshipPage = () => {
  const [filter, setFilter] = useState("current"); // default filter
  const [searchInput, setSearchInput] = useState("");
  const [filteredClients, setFilteredClients] = useState(Clients);

  const handleSearchChange = (text) => {
    setSearchInput(text);
    const filtered = Clients.filter((client) =>
      client.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalstyles.searchSection}>
          <View style={globalstyles.searchContainer}>
            <Icon
              name="search-outline"
              size={25}
              color="#616a6c"
              style={globalstyles.searchIcon}
            />
            <TextInput
              value={searchInput}
              onChangeText={handleSearchChange}
              placeholder="Type in keyword"
              style={globalstyles.searchBar}
            />
          </View>
          <Fontisto
            name="nav-icon-grid-a"
            size={20}
            color="#094851"
            style={globalstyles.gridIcon}
          />
        </View>

        {/* Favorite People Section */}
        <View style={styles.relationshipsContainer}>
          <Text style={styles.relationships}>Relationships</Text>
        </View>
        <View style={styles.favoriteContainer}>
          <Text style={styles.headerText}>Favorites</Text>
          <ScrollView horizontal={true}>
            <Image
              source={require("../assets/images/userImage1.jpg")}
              style={styles.profileIcon}
            />
            <Image
              source={require("../assets/images/userImage2.jpg")}
              style={styles.profileIcon}
            />
            {/* ... add more profiles as needed */}
          </ScrollView>
        </View>

        {/* Filter Section */}
        <View>
          <Text style={styles.headerText}>All Relationships</Text>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilter("current")}
          >
            <Text>Current</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilter("requested")}
          >
            <Text>Requested</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilter("past")}
          >
            <Text>Past</Text>
          </TouchableOpacity>
        </View>
        {filteredClients.map((client) => (
          <Card key={client.key}>
            <View style={styles.cardContainer}>
              <View style={styles.header}>
                <View style={styles.start}>
                  <Image
                    source={client.image}
                    style={globalstyles.profileImage}
                  />
                  <View>
                    <Text style={styles.name}>{client.name}</Text>
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
                        client.status === "Current" ? { color: "#41737a" } : {},
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
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f8f9",
    padding: 15,
    paddingBottom: 0,
  },

  relationshipsContainer: {
    marginVertical: 15,
  },

  relationships: {
    fontSize: 40,
    color: "#094851",
    fontFamily: "gabarito-bold",
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

  profileIcon: {
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
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
  },

  cardContainer: {
    flexDirection: "row",
  },

  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  start: {
    flexDirection: "row",
    justifyContent: "center",
  },

  name: {},

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
});

export default RelationshipPage;

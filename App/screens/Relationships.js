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
import Clients from "../shared/Clients";

const RelationshipPage = () => {
  const [filter, setFilter] = useState("current"); // default filter
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (text) => {
    setSearchInput(text);
    const filtered = Amenities.filter((amenity) =>
      amenity.location.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredAmenities(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Icon
              name="search-outline"
              size={25}
              color="#616a6c"
              style={styles.searchIcon}
            />
            <TextInput
              value={searchInput}
              onChangeText={handleSearchChange}
              placeholder="Type in keyword"
              style={styles.searchBar}
            />
          </View>
          <Fontisto
            name="nav-icon-grid-a"
            size={20}
            color="#094851"
            style={styles.gridIcon}
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
        {Clients.map((client) => (
          <Card key={client.key}>
            <View>
              <Text>{client.name}</Text>
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
  searchIcon: {
    paddingHorizontal: 10,
  },

  searchSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 50,
    padding: 5,
    alignItems: "center",
    flex: 1,
    height: 50,
    backgroundColor: "white",
  },

  searchBar: {
    flex: 1,
    fontSize: 18,
    color: "#999fa0",
  },

  gridIcon: {
    paddingLeft: 20,
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

  card: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
});

export default RelationshipPage;

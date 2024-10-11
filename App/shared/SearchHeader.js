import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import globalstyles from "../shared/globalStyles";
import { useNavigation } from "@react-navigation/native";

const SearchComponent = ({ searchInput, setSearchInput }) => {
  const navigation = useNavigation();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
        setFilteredClients(data);
      })
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  const handleSearch = (text) => {
    setSearchInput(text);
    if (text.trim()) {
      const filtered = clients.filter((client) =>
        client.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  };

  const handlePress = (client) => {
    setSearchInput("");
    navigation.navigate("Profile Page", { client });
  };

  return (
    <View>
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
      </View>

      {/* List of Filtered Clients */}
      {searchInput.trim() !== "" && (
        <View style={styles.floatingListContainer}>
          <FlatList
            data={filteredClients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                style={styles.clientItem}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../assets/images/userImage1.jpg")}
                    style={styles.clientImage}
                  />
                  <Text style={styles.clientName}>{item.fullName}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={globalstyles.noResults}>No clients found</Text>
            }
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft: 10,
  },
  floatingListContainer: {
    position: "absolute",
    top: 60, // Adjust as needed to position below the search bar
    left: 0,
    right: 0,
    zIndex: 20, // Ensure it is higher than other elements
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  clientItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  clientName: {
    fontSize: 16,
    color: "#333",
  },
  clientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  listContainer: {
    backgroundColor: "#fff",
  },
});

export default SearchComponent;

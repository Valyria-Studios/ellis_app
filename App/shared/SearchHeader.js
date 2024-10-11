import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import globalstyles from "../shared/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchComponent = ({ searchInput, setSearchInput }) => {
  const navigation = useNavigation();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePress = (client) => {
    setModalVisible(false); // Hide the modal when a client is selected
    navigation.navigate("Profile Page", { client });
  };

  useEffect(() => {
    fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
        setFilteredClients(data); // Initially display all clients
      })
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  // Function to filter clients based on search input
  const handleSearch = (text) => {
    setSearchInput(text); // Update the input value
    if (text.trim()) {
      const filtered = clients.filter((client) =>
        client.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredClients(filtered);
      setModalVisible(true); // Show the modal when there are search results
    } else {
      setFilteredClients(clients); // Reset to show all clients when input is cleared
      setModalVisible(false); // Hide the modal when input is empty
    }
  };

  return (
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

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={filteredClients}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePress(item)}>
                    <View style={globalstyles.clientItem}>
                      <Text style={globalstyles.clientName}>
                        {item.fullName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={globalstyles.noResults}>No clients found</Text>
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Creates a semi-transparent overlay
    justifyContent: "flex-start", // Aligns the content to the top initially
    alignItems: "center",
    paddingTop: 100, // Adjust this value to position the list lower on the screen
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "90%", // Adjust as needed
    borderRadius: 10,
    padding: 10,
    // Optionally add shadow for better visibility
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SearchComponent;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import imageMap from "../../shared/getProfileImage";
import globalstyles from "../../shared/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const MyClients = ({ navigation }) => {
  const [engagementClients, setEngagementClients] = useState([]);

  useEffect(() => {
    fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const firstClient = data[0];
          const engagementClientDetails = firstClient.engagements.clients.map(
            (engagementClient) => {
              const client = data.find(
                (c) => c.id === engagementClient.clientId
              );
              return {
                ...client,
                dateAdded: engagementClient.dateAdded,
                interactions: engagementClient.interactions,
              };
            }
          );
          setEngagementClients(engagementClientDetails);
        }
      })
      .catch((error) => console.error("Error fetching client data:", error));
  }, []);

  const handleClientPress = (client) => {
    navigation.navigate("Profile Page", { client }); // Navigate to the ProfilePage with client data
  };

  const removeClient = async (engagementClientId) => {
    try {
      // Fetch all clients
      const response = await fetch(
        "http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients"
      );
      const clients = await response.json();

      // Find the client that contains the engagement to be deleted
      const clientToUpdate = clients.find((client) =>
        client.engagements.clients.some(
          (engagement) => engagement.clientId === engagementClientId
        )
      );

      if (clientToUpdate) {
        // Update the engagements array
        const updatedEngagementClients =
          clientToUpdate.engagements.clients.filter(
            (engagement) => engagement.clientId !== engagementClientId
          );

        // Create updated client object
        const updatedClientData = {
          ...clientToUpdate,
          engagements: {
            ...clientToUpdate.engagements,
            clients: updatedEngagementClients,
          },
        };

        // Send PUT request to update the specific client
        await fetch(
          `http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients/${clientToUpdate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedClientData),
          }
        );

        // Update the local state
        setEngagementClients((prevClients) =>
          prevClients.filter((client) => client.id !== engagementClientId)
        );
      } else {
        console.error("Client containing the specified engagement not found.");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const renderEngagementClientItem = ({ item }) => (
    <View style={styles.clientItem}>
      <View style={{ flexDirection: "row" }}>
        <Image source={imageMap[item.image]} style={styles.profileImage} />
        <View style={styles.clientHeader}>
          <Text style={styles.clientName}>{item.fullName}</Text>
          <Menu>
            <MenuTrigger>
              <MaterialIcons name="more-vert" size={24} color="#666" />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption
                onSelect={() => handleClientPress(item)}
                text="View Profile"
              />
              <MenuOption
                onSelect={() => {
                  /* Add your logic for editing the client */
                }}
                text="Edit Client"
              />
              <MenuOption
                onSelect={() => removeClient(item.id)}
                text="Remove Client"
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text
            style={[globalstyles.details, { margin: 0, letterSpacing: 1.5 }]}
          >
            Date Started
          </Text>
          <Text style={styles.description}>{item.dateAdded}</Text>
        </View>
        <View>
          <Text
            style={[globalstyles.details, { margin: 0, letterSpacing: 1.5 }]}
          >
            Interactions
          </Text>
          <Text style={styles.description}>{item.interactions}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[globalstyles.container, { backgroundColor: "#FFFFFF" }]}>
      <FlatList
        data={engagementClients}
        renderItem={renderEngagementClientItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  clientItem: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginBottom: 10,
    marginRight: 10,
  },
  clientInfo: {
    marginLeft: 10,
    flex: 1,
  },
  clientHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clientName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#171B1C",
  },
});

const optionsStyles = {
  optionsContainer: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    width: 150,
  },
  optionWrapper: {
    padding: 10,
  },
  optionText: {
    color: "#333",
    fontSize: 16,
  },
};

export default MyClients;

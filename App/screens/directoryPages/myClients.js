// LOGIC FOR INTERACTIONS

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

const MyClients = ({ navigation }) => {
  const [engagementClients, setEngagementClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/Clients")
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

  const renderEngagementClientItem = ({ item }) => (
    <View style={styles.clientItem}>
      <View style={{ flexDirection: "row" }}>
        <Image source={imageMap[item.image]} style={styles.profileImage} />
        <View style={styles.clientHeader}>
          <Text style={styles.clientName}>{item.fullName}</Text>
          <TouchableWithoutFeedback onPress={() => handleClientPress(item)}>
            <MaterialIcons name="more-vert" size={24} color="#666" />
          </TouchableWithoutFeedback>
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
        <Text style={[globalstyles.details, { margin: 0, letterSpacing: 1.5 }]}>
          Interactions
        </Text>
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

export default MyClients;

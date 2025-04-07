import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import globalstyles from "../shared/globalStyles";
import { useFocusEffect } from "@react-navigation/native";

const AdminManagementScreen = ({ route }) => {
  const { client } = route.params;
  const [currentClient, setCurrentClient] = useState(client); // Use the passed client
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Inside your AdminManagementScreen component
  useFocusEffect(
    useCallback(() => {
      const fetchCurrentClientData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://ellis-test-data.com:8000/Clients/${client.id}`
          );
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
          const updatedClientData = await response.json();
          setCurrentClient(updatedClientData);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      };

      fetchCurrentClientData();
    }, [])
  );

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://ellis-test-data.com:8000/Clients"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setClients(data);
        setFilteredClients(data); // Initially, no filter is applied
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchClients();
  }, []);

  useEffect(() => {
    // Start by excluding the current client
    const clientsExcludingCurrent = clients.filter(
      (client) => client.id !== currentClient.id
    );

    // If there's a search query, filter the already-excluded list based on the query
    if (searchQuery.trim() !== "") {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = clientsExcludingCurrent.filter((client) =>
        client.fullName.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredClients(filtered);
    } else {
      // If there's no search query, use the list that already excludes the current client
      setFilteredClients(clientsExcludingCurrent);
    }
  }, [searchQuery, clients, currentClient.id]);

  const handleMoveToMembers = async (admin) => {
    const updatedAdmins = currentClient.team.admins.filter(
      (a) => a.id !== admin.id
    );

    try {
      const response = await fetch(
        `https://ellis-test-data.com:8000/Clients/${currentClient.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentClient.id,
            ...currentClient,
            team: {
              admins: updatedAdmins, // Only send admins, exclude members
            },
          }),
        }
      );

      if (response.ok) {
        const newClientData = {
          ...currentClient,
          team: {
            admins: updatedAdmins, // Only update admins
          },
        };
        setCurrentClient(newClientData);
      } else {
        throw new Error("Failed to update data on the server");
      }
    } catch (error) {
      console.error("Error updating team data:", error);
    }
  };

  const handleAddToAdmins = async (newAdmin) => {
    const adminObject = { id: newAdmin.id, name: newAdmin.fullName };

    if (currentClient.team.admins.some((admin) => admin.id === newAdmin.id)) {
      alert(`${newAdmin.fullName} is already an admin.`);
      return;
    }

    const updatedAdmins = [...currentClient.team.admins, adminObject];

    try {
      const response = await fetch(
        `https://ellis-test-data.com:8000/Clients/${currentClient.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentClient.id,
            ...currentClient,
            team: {
              admins: updatedAdmins, // Only include admins
            },
          }),
        }
      );

      if (response.ok) {
        const newClientData = await response.json();
        setCurrentClient(newClientData);
      } else {
        throw new Error("Failed to update data on the server");
      }
    } catch (error) {
      console.error("Error adding to team admins:", error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator />; // Or some loading component
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={globalstyles.container}>
      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.header, { marginTop: 25 }]}>Current Admins</Text>
        {currentClient.team.admins.map((admin, index) => (
          <View key={index} style={styles.adminRow}>
            <View
              style={{
                flex: 1,
                borderRadius: 10,
                paddingVertical: 10,
                backgroundColor: "#E7F2F3",
              }}
            >
              {/* Fix: Render admin.name instead of the whole admin object */}
              <Text style={styles.adminText}>{admin.name}</Text>
            </View>
            <View
              style={{
                paddingLeft: 10,
                paddingVertical: 11,
                backgroundColor: "#F3F8F9",
              }}
            >
              <TouchableOpacity onPress={() => handleMoveToMembers(admin)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.header}>Add new admin</Text>
      <View style={[globalstyles.searchContainer, { flex: 0, padding: 5 }]}>
        <Ionicons
          name="search-outline"
          size={25}
          color="#465355"
          style={[globalstyles.searchIcon, { borderColor: "#B5BABB" }]}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Type team member name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {searchQuery.trim() !== "" && filteredClients.length > 0 ? (
        <FlatList
          data={filteredClients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.clientItem}
              onPress={() => handleAddToAdmins(item)}
            >
              <Text style={styles.clientName}>{item.fullName}</Text>
            </TouchableOpacity>
          )}
        />
      ) : searchQuery.trim() !== "" && filteredClients.length === 0 ? (
        <Text style={styles.noResultsText}>No clients found.</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#030E07",
    marginBottom: 5,
  },
  adminRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    // more styles
  },
  adminText: {
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
    color: "#171B1C",
    paddingLeft: 5,
  },
  removeText: {
    color: "#094852",
    // more styles
  },

  searchBar: {
    flex: 1,
    marginVertical: 6,
    fontSize: 18,
    color: "#909899",
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
  },
});

export default AdminManagementScreen;

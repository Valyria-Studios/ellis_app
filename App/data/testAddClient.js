import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";

const AddClientToEngagement = ({ route }) => {
  const { clientId } = route.params;
  const [clientData, setClientData] = useState(null);
  const [allClients, setAllClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [engagementClients, setEngagementClients] = useState([]);

  // Fetch the main client's data
  useEffect(() => {
    fetch(`http://localhost:3000/Clients/${clientId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Client data fetched:", data);
        setClientData(data);
        fetchEngagementClients(data.engagements.clients);
      })
      .catch((error) => console.error("Error fetching client data:", error));
  }, [clientId]);

  const fetchEngagementClients = (engagementClients) => {
    const fetchPromises = engagementClients.map((client) =>
      fetch(`http://localhost:3000/Clients/${client.clientId}`).then(
        (response) => response.json()
      )
    );

    Promise.all(fetchPromises)
      .then((clients) => setEngagementClients(clients))
      .catch((error) =>
        console.error("Error fetching engagement clients:", error)
      );
  };
  // Fetch all clients
  useEffect(() => {
    fetch("http://localhost:3000/Clients")
      .then((response) => response.json())
      .then((data) => setAllClients(data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  const filteredClients = allClients.filter((client) =>
    client.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to add selected client to the engagements
  const addClientToEngagement = async () => {
    if (selectedClient) {
      try {
        console.log("Adding client with ID:", selectedClient.id);
        const updatedEngagements = {
          ...clientData.engagements,
          clients: [
            ...clientData.engagements.clients,
            { clientId: selectedClient.id, relationship: "added" },
          ],
        };
        const response = await fetch(
          `http://localhost:3000/Clients/${clientId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              engagements: updatedEngagements,
            }),
          }
        );

        if (response.ok) {
          const updatedClientData = await response.json();
          setClientData(updatedClientData);
        } else {
          console.error("Error adding client to engagements");
        }
      } catch (error) {
        console.error("Error adding client to engagements:", error);
      }
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a client"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.clientItem}
            onPress={() => setSelectedClient(item)}
          >
            <Text style={styles.clientItemText}>{item.fullName}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={addClientToEngagement} style={styles.button}>
        <Text style={styles.buttonText}>Add Client to Engagement</Text>
      </TouchableOpacity>
      <Text style={styles.subHeader}>Engagement Clients</Text>
      <FlatList
        data={engagementClients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.engagementClient}>
            <Text style={styles.clientName}>{item.fullName}</Text>
            <Text style={styles.clientDetails}>Age: {item.age}</Text>
            <Text style={styles.clientDetails}>Address: {item.address}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default AddClientToEngagement;

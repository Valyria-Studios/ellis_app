// LOGIC TO SEND TO NEXT PAGE

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import { EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";

const CreateNote = () => {
  const [selectedClient, setSelectedClient] = useState("");
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [title, setTitle] = useState("");
  const [showClients, setShowClients] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState("");
  const [topicTag, setTopicTag] = useState("");
  const [teamMember, setTeamMember] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/Clients");
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchClients();
  }, []);

  useEffect(() => {
    // Filter clients based on input
    if (selectedClient) {
      const filtered = clients.filter((client) =>
        client.fullName.toLowerCase().includes(selectedClient.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients([]);
    }
  }, [selectedClient, clients]);

  const handleSelectClient = (client) => {
    setSelectedClient(client.fullName);
    setShowClients(false); // Hide the list
  };

  const handleSaveNote = async () => {
    const now = new Date();
    const formattedDate = format(now, "PPpp"); // Formats the current date and time
    const newNote = {
      title: title,
      content: note,
      topics: topicTag,
      teamMember: teamMember,
      client: selectedClient,
      date: formattedDate,
    };
    console.log(newNote);
    try {
      const response = await fetch("http://localhost:3000/Notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      if (response.ok) {
        const responseJson = await response.json();
        console.log("Note added successfully:", responseJson);
        // Optionally, handle navigation or state updates here
        // navigation.navigate("NoteDetails", { noteId: responseJson.id });
      } else {
        console.error("HTTP error: " + response.status + " during adding note");
      }
    } catch (error) {
      console.error("Error sending data to API", error);
    }
  };

  return (
    <SafeAreaView
      style={[
        globalstyles.container,
        { backgroundColor: "#FFFFFF", paddingTop: -30 },
      ]}
    >
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View style={styles.textInputContainer}>
          <EvilIcons
            name="search"
            size={24}
            color="#828B89"
            style={{ paddingLeft: 10 }}
          />
          <TextInput
            blurOnSubmit={true}
            style={styles.textInput}
            placeholder="Select Client"
            value={selectedClient}
            onChangeText={setSelectedClient}
            onFocus={() => setShowClients(true)} // Show the list when input is focused
          />
        </View>
        {showClients && filteredClients.length > 0 && (
          <FlatList
            data={filteredClients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectClient(item)}
                style={styles.clientItem}
              >
                <Text>{item.fullName}</Text>
              </TouchableOpacity>
            )}
            style={[styles.clientList, { maxHeight: 200 }]}
          />
        )}
        <View style={styles.textInputContainer}>
          <TextInput
            blurOnSubmit={true}
            style={styles.textInput}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View
          style={[
            styles.textInputContainer,
            { flex: 0.75, alignItems: "flex-start" },
          ]}
        >
          <TextInput
            blurOnSubmit={true}
            style={[styles.textInput, { paddingBottom: 410 }]}
            multiline={true}
            placeholder="Input Notes"
            value={note}
            onChangeText={setNote}
          />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons
            name="label-outline"
            size={20}
            color="#828B89"
            style={{ paddingLeft: 10 }}
          />
          <TextInput
            blurOnSubmit={true}
            style={styles.textInput}
            placeholder="Topic Tags"
            value={topicTag}
            onChangeText={setTopicTag}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#828B89"
            style={{ paddingLeft: 10 }}
          />
          <TextInput
            blurOnSubmit={true}
            style={styles.textInput}
            placeholder="Tag a Team Member"
            value={teamMember}
            onChangeText={setTeamMember}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={handleSaveNote}
            style={[
              globalstyles.buttonContainer,
              { backgroundColor: "#FFFFFF", borderRadius: 15 },
            ]}
            activeOpacity={0.6}
          >
            <Text style={[globalstyles.buttonText]}>Save Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#B5BABB",
    justifyContent: "center",
  },

  textInput: {
    padding: 10,
    flex: 1,
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#909899",
  },

  clientItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  clientList: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    top: 40, // Adjust top as per your UI
    left: 0,
    right: 0,
    zIndex: 1, // Make sure FlatList is rendered above the BlurView
  },
});

export default CreateNote;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";

const API_URL = "http://localhost:3000/sheets";
const ADD_EVENT_URL = "http://localhost:3000/add-event";
const DELETE_EVENT_URL = "http://localhost:3000/delete-event";

const GoogleSheetScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState(["", "", ""]); // [Event, Date, Availability]

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data.slice(1)); // Remove headers
    } catch (error) {
      console.error("Error fetching Google Sheets data:", error);
    }
    setLoading(false);
  };

  const addEvent = async () => {
    if (!newEvent[0] || !newEvent[1] || !newEvent[2]) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post(ADD_EVENT_URL, { values: newEvent });
      fetchData();
      setNewEvent(["", "", ""]);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const deleteEvent = async (index) => {
    try {
      await axios.post(DELETE_EVENT_URL, { row: index + 2 }); // Adjust row number
      fetchData();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      {/* Add Event Input */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Event Name"
          value={newEvent[0]}
          onChangeText={(text) => setNewEvent([text, newEvent[1], newEvent[2]])}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (e.g. 3/5)"
          value={newEvent[1]}
          onChangeText={(text) => setNewEvent([newEvent[0], text, newEvent[2]])}
        />
        <TextInput
          style={styles.input}
          placeholder="Availability"
          keyboardType="numeric"
          value={newEvent[2]}
          onChangeText={(text) => setNewEvent([newEvent[0], newEvent[1], text])}
        />
        <Button title="Add Event" onPress={addEvent} />
      </View>

      {/* List of Events */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.text}>{item[0]}</Text>
            <Text style={styles.text}>{item[1]}</Text>
            <Text style={styles.text}>{item[2]}</Text>
            <Button title="❌" onPress={() => deleteEvent(index)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  addContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    fontSize: 16,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});

export default GoogleSheetScreen;

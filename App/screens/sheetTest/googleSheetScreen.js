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
const UPDATE_API_URL = "http://localhost:3000/update-sheet";

const GoogleSheetScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState(null);
  const [editedValues, setEditedValues] = useState(["", "", ""]);

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

  const handleEdit = (index) => {
    setEditingRow(index);
    setEditedValues(data[index]);
  };

  const handleSave = async (index) => {
    try {
      await axios.post(UPDATE_API_URL, {
        row: index + 2, // Adjust row number (1-based index)
        values: editedValues,
      });

      // Refresh data after update
      fetchData();
      setEditingRow(null);
    } catch (error) {
      console.error("Error updating Google Sheet:", error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            {editingRow === index ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editedValues[0]}
                  onChangeText={(text) =>
                    setEditedValues([text, editedValues[1], editedValues[2]])
                  }
                />
                <TextInput
                  style={styles.input}
                  value={editedValues[1]}
                  onChangeText={(text) =>
                    setEditedValues([editedValues[0], text, editedValues[2]])
                  }
                />
                <TextInput
                  style={styles.input}
                  value={editedValues[2]}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setEditedValues([editedValues[0], editedValues[1], text])
                  }
                />
                <Button title="Save" onPress={() => handleSave(index)} />
              </>
            ) : (
              <>
                <Text style={styles.text}>{item[0]}</Text>
                <Text style={styles.text}>{item[1]}</Text>
                <Text style={styles.text}>{item[2]}</Text>
                <Button title="Edit" onPress={() => handleEdit(index)} />
              </>
            )}
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
  },
});

export default GoogleSheetScreen;

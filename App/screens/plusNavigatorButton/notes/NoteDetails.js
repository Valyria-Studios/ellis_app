// TAGS ARE COMMENTED OUT

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../../../shared/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

const NoteDetails = ({ route }) => {
  const { note } = route.params;
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const [editedTeamMember, setEditedTeamMember] = useState(note.teamMember);

  const handleUpdateNote = async () => {
    const updatedNote = {
      ...note,
      content: editedContent,
      teamMember: editedTeamMember,
      // Additional fields can be updated here if needed
    };

    try {
      const response = await fetch(`http://localhost:3000/Notes/${note.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      if (response.ok) {
        const responseJson = await response.json();
        console.log("Note updated successfully:", responseJson);
      } else {
        console.error(
          "HTTP error: " + response.status + " during updating note"
        );
      }
    } catch (error) {
      console.error("Error sending data to API", error);
    }
    setEditMode(false);
  };

  return (
    <SafeAreaView
      style={[globalstyles.container, { backgroundColor: "#FFFFFF" }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dateContainer}>
          <View>
            <Text style={styles.dateHeader}>Created</Text>
            <Text style={styles.date}>{note.date}</Text>
          </View>
          <View>
            <Text style={styles.dateHeader}>Last edited</Text>
            <Text style={styles.date}>{note.date}</Text>
          </View>
        </View>
        {/* <View style={{ flexDirection: "row" }}>
        {note.topics.map((tags) => (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tags}</Text>
          </View>
        ))}
      </View> */}
        <Text style={styles.detail}>Assigned to: {note.teamMember}</Text>
        {editMode ? (
          <TextInput
            value={editedTeamMember}
            onChangeText={setEditedTeamMember}
            style={styles.input}
          />
        ) : (
          <Text style={styles.content}>{note.teamMember}</Text>
        )}
        <Text style={styles.detail}>Note:</Text>
        {editMode ? (
          <TextInput
            value={editedContent}
            onChangeText={setEditedContent}
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            multiline
          />
        ) : (
          <Text style={styles.content}>{note.content}</Text>
        )}
        <View>
          <TouchableOpacity
            onPress={() => (editMode ? handleUpdateNote() : setEditMode(true))}
            style={[
              globalstyles.buttonContainer,
              {
                backgroundColor: "#FFFFFF",
                borderRadius: 15,
                shadowOpacity: 0,
              },
            ]}
            activeOpacity={0.6}
          >
            <Text style={[globalstyles.buttonText]}>
              {editMode ? "Save Changes" : "Edit Note"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  dateContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },

  dateHeader: {
    fontFamily: "gabarito-regular",
    textTransform: "uppercase",
    fontSize: 12,
    color: "#465355",
    letterSpacing: 2,
  },

  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#B5BABB",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginVertical: 15,
    justifyContent: "center",
  },

  tagText: {
    color: "#094852",
    fontFamily: "karla-regular",
    fontSize: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontFamily: "karla-bold",
    fontSize: 16,
    color: "#465355",
    letterSpacing: -1,
  },
  content: {
    fontFamily: "karla-regular",
    fontSize: 16,
    marginBottom: 20,
    color: "#465355",
    letterSpacing: 0.4,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    fontFamily: "karla-regular",
    color: "#465355",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
});

export default NoteDetails;

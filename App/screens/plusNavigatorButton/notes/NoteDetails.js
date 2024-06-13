// TAGS ARE COMMENTED OUT

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../../../shared/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { format } from "date-fns";

const NoteDetails = ({ route, navigation }) => {
  const { note } = route.params;
  const [currentNote, setCurrentNote] = useState(note);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [editedTeamMember, setEditedTeamMember] = useState(note.teamMember);

  const handleUpdateNote = async () => {
    const now = new Date();
    const editDate = format(now, "p, PP"); // Formats the current date and time
    const updatedNote = {
      ...note,
      title: editedTitle, // Update title
      content: editedContent,
      teamMember: editedTeamMember,
      lastEdited: editDate,
      // Additional fields can be updated here if needed
    };

    try {
      const response = await fetch(
        `http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Notes/${note.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNote),
        }
      );
      if (response.ok) {
        const updatedNote = await response.json();
        console.log("Note updated successfully:", updatedNote);
        setCurrentNote(updatedNote);
        setEditMode(false);
        navigation.setOptions({
          headerTitle: `${updatedNote.title} Notes`,
        });
      } else {
        console.error(
          "HTTP error: " + response.status + " during updating note"
        );
      }
    } catch (error) {
      console.error("Error sending data to API", error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "No, keep note",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "Yes, confirm delete",
          onPress: () => deleteNote(),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteNote = async () => {
    try {
      const response = await fetch(
        `http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Notes/${route.params.note.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Note deleted successfully");
        navigation.goBack();
      } else {
        throw new Error("Failed to delete the note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Ensure these functions are set when the component mounts
  useEffect(() => {
    navigation.setParams({ confirmDelete });
  }, []);

  return (
    <SafeAreaView
      style={[globalstyles.container, { backgroundColor: "#FFFFFF" }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dateContainer}>
          <View>
            <Text style={styles.dateHeader}>Created</Text>
            <Text style={styles.date}>{currentNote.dateCreated}</Text>
          </View>
          <View>
            <Text style={styles.dateHeader}>Last edited</Text>
            <Text style={styles.date}>{currentNote.lastEdited}</Text>
          </View>
        </View>
        {/* <View style={{ flexDirection: "row" }}>
        {note.topics.map((tags) => (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tags}</Text>
          </View>
        ))}
      </View> */}
        {editMode && (
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            style={styles.input}
          />
        )}
        {editMode ? (
          <TextInput
            value={editedTeamMember}
            onChangeText={setEditedTeamMember}
            style={styles.input}
          />
        ) : (
          <Text style={styles.content}>{currentNote.teamMember}</Text>
        )}
        {editMode ? (
          <TextInput
            value={editedContent}
            onChangeText={setEditedContent}
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            multiline
          />
        ) : (
          <Text style={styles.content}>{currentNote.content}</Text>
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
              {editMode ? "Save Note" : "Edit Note"}
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

// TAGS ARE COMMENTED OUT

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../../../shared/globalStyles";

const NoteDetails = ({ route }) => {
  const { note } = route.params;

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
      <Text style={styles.content}>{note.content}</Text>
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
    justifyContent: 'space-between'
  },

  dateHeader: {
    fontFamily: 'gabarito-regular',
    textTransform: 'uppercase',
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
    fontFamily: 'karla-regular',
    fontSize: 16,
    marginBottom: 20,
    color:"#465355",
    letterSpacing: .4,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default NoteDetails;

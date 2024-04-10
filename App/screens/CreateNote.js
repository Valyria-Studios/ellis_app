// LOGIC TO SEND TO NEXT PAGE

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import { EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";

const CreateNote = () => {
  const [selectedClient, setSelectedClient] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [topicTag, setTopicTag] = useState("");
  const [teamMember, setTeamMember] = useState("");

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
          />
        </View>
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
});

export default CreateNote;

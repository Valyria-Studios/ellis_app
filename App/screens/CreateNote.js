import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import { EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";

const CreateNote = () => {
  return (
    <View
      style={[
        globalstyles.container,
        { backgroundColor: "#FFFFFF", justifyContent: "space-between" },
      ]}
    >
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
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          blurOnSubmit={true}
          style={styles.textInput}
          placeholder="Title"
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
          style={styles.textInput}
          placeholder="Input Notes"
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
        />
      </View>
      <View>
        <Text>Save Note</Text>
      </View>
    </View>
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

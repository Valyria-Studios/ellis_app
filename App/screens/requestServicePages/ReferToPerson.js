import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const ReferToPerson = () => {
  const [text, setText] = useState("");

  return (
    <View>
      <Text>Refer to Person</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    // Add styles for the main content area (optional)
  },
  textInput: {
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

export default ReferToPerson;

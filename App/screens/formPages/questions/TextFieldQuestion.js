import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import globalstyles from "../../../shared/globalStyles";

const TextFieldQuestion = ({ question, placeholder, onAnswerChange }) => {
  const handleTextChange = (text) => {
    if (onAnswerChange) {
      onAnswerChange(text);
    }
  };

  return (
    <View>
      <Text style={globalstyles.question}>{question}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        multiline={true}
        onChangeText={handleTextChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 75,
    borderColor: "#B5BABB",
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default TextFieldQuestion;

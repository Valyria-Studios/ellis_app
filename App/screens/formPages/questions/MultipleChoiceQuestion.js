import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "@expo/vector-icons/MaterialIcons";
import globalstyles from "../../../shared/globalStyles";

const MultipleChoiceQuestion = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const pickerItems = options.map((option, index) => ({
    label: option,
    value: option,
    key: index,
  }));

  return (
    <View style={styles.container}>
      <Text style={globalstyles.question}>{question}</Text>
      <View style={styles.optionContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedOption(value)}
          items={pickerItems}
          placeholder={{ label: "Select an option", value: null }}
          style={{
            input: styles.input, // Common style for both iOS and Android
            placeholder: styles.placeholder,
            icon: styles.icon
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <Icon name="keyboard-arrow-right" size={24} color="#094852" />
          )} //Icon not lined up in center //
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  optionContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: {
    alignItems: 'center'
  },

  input: {
    fontSize: 16,
    fontFamily: "karla-regular",
    color: "#051A2E",
    // Common styles for picker input
  },
  placeholder: {
    fontSize: 16,
    color: "#051A2E",
    fontFamily: "karla-regular",
    // Add more styles for placeholder
  },
});

export default MultipleChoiceQuestion;

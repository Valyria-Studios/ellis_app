import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "@expo/vector-icons/MaterialIcons";
import globalstyles from "../../../shared/globalStyles";

const MultipleChoiceQuestion = ({ question, options, onAnswerChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const pickerItems = options.map((option, index) => ({
    label: option,
    value: option,
    key: index,
  }));

  const handleValueChange = (value) => {
    setSelectedOption(value);
    if (onAnswerChange) {
      onAnswerChange(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={globalstyles.question}>{question}</Text>
      <View style={globalstyles.optionContainer}>
        <RNPickerSelect
          onValueChange={handleValueChange}
          items={pickerItems}
          placeholder={{ label: "Select an option", value: null }}
          style={{
            input: globalstyles.input, // Common style for both iOS and Android
            placeholder: globalstyles.placeholder,
            icon: styles.icon,
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
  icon: {
    alignItems: "center",
  },

  
});

export default MultipleChoiceQuestion;

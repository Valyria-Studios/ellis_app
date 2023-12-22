import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import globalstyles from "../../../shared/globalStyles";

const CheckboxOption = ({ label, isSelected, onToggle }) => (
  <TouchableOpacity
    onPress={onToggle}
    style={{ flexDirection: "row", alignItems: "center" }}
  >
    <Text>{isSelected ? "[x]" : "[ ]"}</Text>
    <Text>{label}</Text>
  </TouchableOpacity>
);

const CheckboxQuestion = ({ question, options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  return (
    <View>
      <Text style={globalstyles.question}>{question}</Text>
      {options.map((option) => (
        <CheckboxOption
          key={option}
          label={option}
          isSelected={selectedOptions.includes(option)}
          onToggle={() => toggleOption(option)}
        />
      ))}
    </View>
  );
};

export default CheckboxQuestion;

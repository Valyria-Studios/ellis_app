import React, { useState } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const MultipleChoiceQuestion = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const pickerItems = options.map((option, index) => ({
    label: option,
    value: option,
    key: index,
  }));

  return (
    <View>
      <Text>{question}</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedOption(value)}
        items={pickerItems}
        placeholder={{ label: "Select an option...", value: null }}
      />
    </View>
  );
};

export default MultipleChoiceQuestion;

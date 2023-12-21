import React from 'react';
import { View, Text, Button } from 'react-native';

const MultipleChoiceQuestion = ({ question, options }) => {
  return (
    <View>
      <Text>{question}</Text>
      {options.map((option, index) => (
        <Button key={index} title={option} onPress={() => {/* Handle selection */}} />
      ))}
    </View>
  );
};

export default MultipleChoiceQuestion;

import React from 'react';
import { View, Text, Button } from 'react-native';

const TrueFalseQuestion = ({ question }) => {
  return (
    <View>
      <Text>{question}</Text>
      <Button title="True" onPress={() => {/* Handle selection */}} />
      <Button title="False" onPress={() => {/* Handle selection */}} />
    </View>
  );
};

export default TrueFalseQuestion;

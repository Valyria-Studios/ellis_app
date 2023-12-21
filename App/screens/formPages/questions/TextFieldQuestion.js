import React from 'react';
import { View, Text, TextInput } from 'react-native';

const TextFieldQuestion = ({ question }) => {
  return (
    <View>
      <Text>{question}</Text>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
    </View>
  );
};

export default TextFieldQuestion;

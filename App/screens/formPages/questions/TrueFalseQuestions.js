import React from "react";
import { View, Text, Button } from "react-native";
import globalstyles from "../../../shared/globalStyles";

const TrueFalseQuestion = ({ question }) => {
  return (
    <View>
      <Text style={globalstyles.question}>{question}</Text>
      <Button
        title="True"
        onPress={() => {
          /* Handle selection */
        }}
      />
      <Button
        title="False"
        onPress={() => {
          /* Handle selection */
        }}
      />
    </View>
  );
};

export default TrueFalseQuestion;

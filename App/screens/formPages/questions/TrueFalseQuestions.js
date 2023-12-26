import React from "react";
import { View, Text, Button } from "react-native";
import globalstyles from "../../../shared/globalStyles";

const TrueFalseQuestion = ({ question, onAnswerChange }) => {
  return (
    <View>
      <Text style={globalstyles.question}>{question}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="True"
          onPress={() => {
            if (onAnswerChange) {
              onAnswerChange("true");
            }
          }}
        />
        <Button
          title="False"
          onPress={() => {
            if (onAnswerChange) {
              onAnswerChange("false");
            }
          }}
        />
      </View>
    </View>
  );
};

export default TrueFalseQuestion;

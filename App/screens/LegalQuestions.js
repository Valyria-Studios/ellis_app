import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import questions from "../api/Questions";

function LegalQuestions({ route }) {
  const { selectedCategories } = route.params;

  const renderQuestions = () => {
    // Filter questions based on selected categories
    const filteredQuestions = questions.filter(
      (question) => selectedCategories[question.category]
    );

    // Render questions
    return filteredQuestions.map((question) => (
      <Text key={question.id}>{question.text}</Text>
    ));
  };

  return (
    <SafeAreaView>
      <View>{renderQuestions()}</View>
    </SafeAreaView>
  );
}

export default LegalQuestions;

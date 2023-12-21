import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import questions from '../api/Questions'; // Adjust the path as necessary

function LegalQuestions({ route, navigation }) {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, text) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: text
    }));
  };

  const submitAnswers = () => {
    // Logic to submit answers
    // e.g., call an API endpoint
    console.log(answers);
    navigation.goBack(); // or navigate to another screen
  };

  const renderQuestions = () => {
    const { selectedCategories } = route.params;

    // Filter questions based on selected categories
    const filteredQuestions = questions.filter(question =>
      selectedCategories[question.category]
    );

    // Render questions with TextInput for answers
    return filteredQuestions.map(question => (
      <View key={question.id} style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => handleAnswerChange(question.id, text)}
          value={answers[question.id] || ''}
          placeholder="Type your answer here"
        />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {renderQuestions()}
      <Button title="Submit Answers" onPress={submitAnswers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
});

export default LegalQuestions;

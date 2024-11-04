import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import TextFieldQuestion from "./questions/TextFieldQuestion";
import TrueFalseQuestion from "./questions/TrueFalseQuestions";
import RadioButtonQuestion from "./questions/RadioButtonQuestion";
import CheckboxQuestion from "./questions/CheckboxQuestion";
import globalstyles from "../../shared/globalStyles";

const LegalFormScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch("https://ellis-test-data.com:8000/Legal_Form") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Submit handler
  const handleSubmit = () => {
    // Copy the Legal_Form structure from state
    let updatedLegalForm = [...questions];

    // Update the user_answer field for each question
    updatedLegalForm = updatedLegalForm.map((question, index) => {
      return {
        ...question,
        user_answer: answers[index] || question.user_answer,
      };
    });
  };

  // Add code to render legal questions here
  return (
    <SafeAreaView style={globalstyles.container}>
      <ScrollView
        style={{ marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginVertical: 10 }}>
          <Text style={globalstyles.title}>Legal Aid</Text>
        </View>
        {questions.length > 0 ? (
          questions.map((question, index) => {
            switch (question.type) {
              case "text_input":
                return (
                  <TextFieldQuestion
                    key={index}
                    question={question.question}
                    placeholder="Enter Text"
                    onAnswerChange={(answer) =>
                      handleAnswerChange(index, answer)
                    }
                  />
                );
              case "multiple_choice":
                return (
                  <MultipleChoiceQuestion
                    key={index}
                    question={question.question}
                    options={question.options}
                    onAnswerChange={(answer) =>
                      handleAnswerChange(index, answer)
                    }
                  />
                );
              case "true_false":
                return (
                  <TrueFalseQuestion
                    key={index}
                    question={question.question}
                    onAnswerChange={(answer) =>
                      handleAnswerChange(index, answer)
                    }
                  />
                );
              case "radio_button":
                return (
                  <RadioButtonQuestion
                    key={index}
                    question={question.question}
                    options={question.options}
                    onAnswerChange={(answer) =>
                      handleAnswerChange(index, answer)
                    }
                  />
                );
              case "checkbox":
                return (
                  <CheckboxQuestion
                    key={index}
                    question={question.question}
                    options={question.options}
                    onAnswerChange={(answer) =>
                      handleAnswerChange(index, answer)
                    }
                  />
                );
              default:
                return null;
            }
          })
        ) : (
          <Text>Loading...</Text>
        )}
        <TouchableOpacity
          // disabled={!serviceLocation || !openingHours || !closingHours}
          style={[
            globalstyles.buttonContainer,
            { marginVertical: 20, borderRadius: 15 },
          ]}
          onPress={handleSubmit}
        >
          <Text style={globalstyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LegalFormScreen;

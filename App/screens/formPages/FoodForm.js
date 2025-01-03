import React, { useState, useEffect } from "react";
import { ScrollView, Text, SafeAreaView } from "react-native";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import TextFieldQuestion from "./questions/TextFieldQuestion";
import TrueFalseQuestion from "./questions/TrueFalseQuestions";
import RadioButtonQuestion from "./questions/RadioButtonQuestion";
import CheckboxQuestion from "./questions/CheckboxQuestion";
import globalstyles from "../../shared/globalStyles";

const FoodFormScreen = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://ellis-test-data.com:8000/Food_Form") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Add code to render legal questions here
  return (
    <SafeAreaView style={globalstyles.container}>
      <ScrollView style={{ margin: 10 }}>
        {questions.length > 0 ? (
          questions.map((question, index) => {
            switch (question.type) {
              case "text_input":
                return (
                  <TextFieldQuestion
                    key={index}
                    question={question.question}
                    placeholder="Enter Text"
                  />
                );
              case "multiple_choice":
                return (
                  <MultipleChoiceQuestion
                    key={index}
                    question={question.question}
                    options={question.options}
                  />
                );
              case "true_false":
                return (
                  <TrueFalseQuestion key={index} question={question.question} />
                );
              case "radio_button":
                return (
                  <RadioButtonQuestion
                    key={index}
                    question={question.question}
                    options={question.options}
                  />
                );
              case "checkbox":
                return (
                  <CheckboxQuestion
                    key={index}
                    question={question.question}
                    options={question.options}
                  />
                );
              default:
                return null;
            }
          })
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodFormScreen;

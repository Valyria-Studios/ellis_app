import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import mockFetchMessages from "../api/ChatMessages";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatPage({ route }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const chatIdentifier = route.params.chatIdentifier;

    mockFetchMessages(chatIdentifier)
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { type: "sent", text: inputText.trim() }]);
      setInputText("");
    }
  };

  return (
    <View style={styles.chat}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <Message
            key={index}
            received={message.type === "received"}
            text={message.text}
          />
        ))}
      </ScrollView>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </SafeAreaView>
    </View>
  );
}

function Message({ received, text }) {
  return (
    <View style={received ? styles.receivedMessage : styles.sentMessage}>
      <Text style={received ? styles.receivedText : styles.sentText}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chat: {
    flex: 1,
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messagesContainer: {
    padding: 10,
  },
  receivedMessage: {
    marginBottom: 10,
    alignSelf: "flex-start",
    backgroundColor: "#e1e1e1",
    borderRadius: 10,
    padding: 8,
  },
  sentMessage: {
    marginBottom: 10,
    alignSelf: "flex-end",
    backgroundColor: "#4a90e2",
    borderRadius: 10,
    padding: 8,
  },
  receivedText: {
    color: "black",
  },
  sentText: {
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
});

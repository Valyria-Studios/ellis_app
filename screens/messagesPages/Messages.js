import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { fetchChats } from "../../api/Chats";
import SearchComponent from "../../shared/SearchHeader";
import globalstyles from "../../shared/globalStyles";

const Messages = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State to hold the search input

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChats();
      setMessages(data);
    };
    fetchData();
  }, []);

  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ zIndex: 10 }}>
        <SearchComponent
          searchInput={searchInput}
          setSearchInput={handleSearchChange}
        />
      </View>
      <View style={styles.header}>
        <Text style={globalstyles.title}>Messages</Text>
      </View>
      <View>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.messageContainer}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("ChatPage", { chatIdentifier: item.name })
              }
            >
              <Image source={item.image} style={styles.profileImage} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message}>{item.message}</Text>
              </View>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
    padding: 15,
    backgroundColor: "#f3f8f9",
  },

  container: {
    flex: 1,
    backgroundColor: "#f3f8f9",
  },

  messageContainer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },

  textContainer: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f4c55",
  },

  message: {
    color: "#343838",
  },

  timestamp: {
    color: "#6a7374",
    marginLeft: 10,
  },
});

export default Messages;

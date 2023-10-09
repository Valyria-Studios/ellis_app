import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchMessages } from "../api/messages";
import Icon from "@expo/vector-icons/Fontisto";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState(""); // State to hold the search input

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMessages();
      setMessages(data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            value={search}
            onChangeText={setSearch}
            placeholder="Search..."
          />
          <Icon name="nav-icon-grid-a" size={20} color="#094851" />
        </View>
        <Text style={styles.title}>Messages</Text>
      </View>
      <View>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Image source={item.image} style={styles.profileImage} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message}>{item.message}</Text>
              </View>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: "#f3f8f9",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 10,
    color: "#094851",
  },
  searchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
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
  },
  message: {
    color: "gray",
  },
  timestamp: {
    color: "gray",
    marginLeft: 10,
  },
});

export default Messages;

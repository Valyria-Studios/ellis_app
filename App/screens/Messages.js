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
import { fetchChats } from "../api/Chats";
import Fontisto from "@expo/vector-icons/Fontisto";
import Icon from "@expo/vector-icons/Ionicons";

const Messages = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState(""); // State to hold the search input

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChats();
      setMessages(data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Icon
              name="search-outline"
              size={25}
              color="#616a6c"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchBar}
              value={search}
              onChangeText={setSearch}
              placeholder="Type in keyword"
            />
          </View>
          <Fontisto
            name="nav-icon-grid-a"
            size={20}
            color="#094851"
            style={styles.gridIcon}
          />
        </View>
        <Text style={styles.title}>Messages</Text>
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
    padding: 15,
    backgroundColor: "#f3f8f9",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 10,
    color: "#094851",
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 50,
    padding: 5,
    alignItems: "center",
    flex: 1,
    height: 50,
    backgroundColor: "white",
  },
  searchBar: {
    flex: 1,
    fontSize: 18,
    color: "#999fa0",
  },
  gridIcon: {
    paddingLeft: 20,
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

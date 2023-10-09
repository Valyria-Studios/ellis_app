import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  {
    name: "Steve Binnquist",
    message: "Lorem ipsum dolor sit amet...",
    timestamp: "Just Now",
    // image: require("./path_to_image.jpg"),
  },
  {
    name: "Kent McCormick",
    message: "Lorem ipsum dolor sit amet...",
    timestamp: "3:35pm",
    // image: require("./path_to_image.jpg"),
  },
  {
    name: "Kent McCormick",
    message: "Lorem ipsum dolor sit amet...",
    timestamp: "3:35pm",
    // image: require("./path_to_image.jpg"),
  },
  {
    name: "Kent McCormick",
    message: "Lorem ipsum dolor sit amet...",
    timestamp: "3:35pm",
    // image: require("./path_to_image.jpg"),
  },
  {
    name: "Kent McCormick",
    message: "Lorem ipsum dolor sit amet...",
    timestamp: "3:35pm",
    // image: require("./path_to_image.jpg"),
  },
  {
    name: "Kent McCormick",
    message: "Lorem ipsum dolor sit amet...",
    timestamp: "3:35pm",
    // image: require("./path_to_image.jpg"),
  },
  {
    name: "Kent McCormick",
    message: "Lorem ipsum dolor sit amet...",
    timestamp: "3:35pm",
    // image: require("./path_to_image.jpg"),
  },
  {
    name: "Kent McCormick",
    message: "Lorem ipsum dolor sit amet...",
    timestamp: "3:35pm",
    // image: require("./path_to_image.jpg"),
  },
  {
    name: "Kent McCormick",
    message: "Lorem ipsum dolor sit amet...",
    timestamp: "3:35pm",
    // image: require("./path_to_image.jpg"),
  },
  {
    name: "Kent McCormick",
    message: "Lorem ipsum dolor sit amet...",
    timestamp: "3:35pm",
    // image: require("./path_to_image.jpg"),
  },
  // ... add other entries here
];

const Messages = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={data}
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
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  messageContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
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

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MyServices = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to your services!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyServices;

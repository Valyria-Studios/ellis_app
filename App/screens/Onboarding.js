import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";

const Onboarding = ({ navigation }) => {
  return (
    <SafeAreaView style={globalstyles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}> Welcome to Ellis </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Ellis is a relationship and service manager for service providers to
          meet our marginalized neighbors' needs more efficiently and
          effectively.
        </Text>
      </View>
      <View> 
        <Button title="Login"></Button>
        <Button title="Register"></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    paddingVertical: 40,
    marginBottom: 350,
  },
  welcome: {
    color: "#062411",
    fontSize: 30,
    fontFamily: "gabarito-semibold",
  },
  descriptionContainer: {
    paddingHorizontal: 15,
  },
  description: {
    color: "#062411",
    fontSize: 18,
    fontFamily: "gabarito-regular",
    alignItems: "center",
    justifyContent: "center"
  },
});

export default Onboarding;

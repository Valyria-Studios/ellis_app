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
        <TouchableOpacity style={[styles.buttonContainer, { marginBottom: 5 }]}>
          <View>
            <Text>Log in</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, { marginTop: 5 }]}>
          <View>
            <Text>Register</Text>
          </View>
        </TouchableOpacity>
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
    justifyContent: "center",
  },

  buttonContainer: {
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    margin: 15,
  },
});

export default Onboarding;

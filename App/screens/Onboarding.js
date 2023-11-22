import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity
            style={[styles.buttonContainer, { marginBottom: 5 }]}
            onPress={() => navigation.push("Login")}
          >
            <View>
              <Text style={styles.buttonText}>Log in</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonContainer, { marginTop: 5 }]}
            onPress={() => navigation.push("Register")}
          >
            <View>
              <Text style={styles.buttonText}>Register</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <View style={styles.divderLines} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divderLines} />
          </View>
          <TouchableOpacity style={[styles.buttonContainer]}>
            <View>
              <Text style={styles.buttonText}>Enter an invite code</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    marginTop: 50,
    // marginTop: 100,
    marginBottom: 425,
    padding: 5,
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
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#10798B",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    // margin: 15,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: "gabarito-regular",
    color: "#094852",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    marginVertical: 10,
  },

  divderLines: {
    flex: 1,
    height: 1,
    backgroundColor: "#909899",
  },

  dividerText: {
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#909899",
    fontFamily: "gabarito-regular",
    fontWeight: 400,
    letterSpacing: 2.4,
    textTransform: "uppercase",
  },
});

export default Onboarding;

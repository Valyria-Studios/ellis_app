import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../../shared/globalStyles";

const Onboarding = ({ navigation }) => {
  return (
    <SafeAreaView style={globalstyles.container}>
      <View style={{ margin: 40 }}></View>
      <View style={styles.welcomeContainer}>
        <Text style={globalstyles.header}> Welcome to Ellis </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Ellis is a relationship and service manager for service providers to
          meet our marginalized neighbors' needs more efficiently and
          effectively.
        </Text>
        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity
            style={[globalstyles.buttonContainer, { marginBottom: 5 }]}
            onPress={() => navigation.push("Register")}
            activeOpacity={0.6}
          >
            <View>
              <Text style={globalstyles.buttonText}>
                Register as a Service Provider
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalstyles.buttonContainer, { marginTop: 5 }]}
            onPress={() => navigation.push("Register")}
            activeOpacity={0.6}
          >
            <View>
              <Text style={globalstyles.buttonText}>Register as a Client</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <View style={styles.divderLines} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divderLines} />
          </View>
          <TouchableOpacity
            style={[globalstyles.buttonContainer]}
            activeOpacity={0.6}
          >
            <View>
              <Text style={globalstyles.buttonText}>Enter an invite code</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => navigation.push("Login")}
          >
            <Text style={styles.loginText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    marginBottom: 350,
    padding: 5,
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

  loginContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  loginText: {
    color: "#10798B",
    fontFamily: "karla-regular",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default Onboarding;

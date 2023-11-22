import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 50 }}></View>
      <View style={styles.headerContainer}>
        <Text style={globalstyles.header}>Create an account</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.subHeader}>
          Create an account on Ellis to get started
        </Text>
        <TextInput placeholder="Name" style={styles.textInput}></TextInput>
        <TextInput
          placeholder="Email Address"
          style={styles.textInput}
        ></TextInput>
        <TextInput placeholder="Password" style={styles.textInput}></TextInput>
      </View>
      <View>
        <Text>I agree to Ellis' privacy policy and terms of use</Text>
      </View>
      <View>
        <TouchableOpacity>
          <View>
            <Text>Sign Up</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text>Use Passkey</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8F9",
    paddingHorizontal: 20,
  },

  headerContainer: {
    marginBottom: 30,
  },

  subHeader: {
    fontSize: 16,
    fontFamily: "karla-regular",
    letterSpacing: -0.16,
    color: "#030E07",
    marginBottom: 10,
  },

  textInput: {
    padding: 15,
    marginVertical: 5,
    borderColor: "#C1C5C4",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 25,
  },
});

export default Register;

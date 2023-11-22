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
        <View style ={{margin: 50,}}></View>
      <View style={styles.headerContainer}>
        <Text style={globalstyles.header}>Create an account</Text>
      </View>
      <View>
        <Text style={styles.subHeader}>
          Create an account on Ellis to get started
        </Text>
        <TextInput placeholder="Name"></TextInput>
        <TextInput placeholder="Email Address"></TextInput>
        <TextInput placeholder="Password"></TextInput>
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
  },
});

export default Register;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";
import CreateOrganization from "./CreateOrganization";

const Register = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [agreed, setAgreed] = useState(false);

  const toggleAgree = () => {
    setAgreed(!agreed);
  };

  const handleSubmit = async () => {
    const formData = { name, email, password, agreed };

    try {
      const response = await fetch("http://localhost:3000/Accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setName("");
      setEmail("");
      setPassword("");
      setAgreed(false);
    } catch (error) {
      console.error("Error sending data to API", error);
    }

    navigation.push("CreateOrganization");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 40 }}></View>
      <View style={styles.headerContainer}>
        <Text style={globalstyles.header}>Create an account</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.subHeader}>
          Create an account on Ellis to get started
        </Text>
        <TextInput
          placeholder="Name"
          style={styles.textInput}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email Address"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.agreeContainer}>
        <TouchableOpacity
          style={[styles.agreeCircle, agreed && styles.checkedAgreeCircle]}
          onPress={toggleAgree}
          activeOpacity={0.8}
        />
        <Text style={styles.agreeText}>
          I agree to Ellis' privacy policy and terms of use
        </Text>
      </View>
      <View>
        <TouchableOpacity
          disabled={!agreed || !name || !email || !password}
          style={[
            globalstyles.buttonContainer,
            !agreed || !name || !email || !password
              ? styles.disabledButton
              : { backgroundColor: "#10798B" },
            { marginVertical: 10 },
          ]}
          activeOpacity={0.6}
          onPress={handleSubmit}
        >
          <Text style={[globalstyles.buttonText, { color: "#fff" }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalstyles.buttonContainer}
          activeOpacity={0.6}
        >
          <Text style={globalstyles.buttonText}>Use Passkey</Text>
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

  agreeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  agreeCircle: {
    borderColor: "#10798B",
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 50,
  },

  checkedAgreeCircle: {
    borderColor: "#10798B",
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#10798B",
  },

  agreeText: {
    color: "#030E07",
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
    paddingLeft: 10,
  },

  disabledButton: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
});

export default Register;

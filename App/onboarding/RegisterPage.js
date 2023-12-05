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

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [agreed, setAgreed] = useState(false);

  const toggleAgree = () => {
    setAgreed(!agreed);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const formData = { name, email, password, agreed };

    let valid = true;
    if (!name) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a vaild email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      const response = await fetch("http://localhost:3000/Accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseJson = await response.json();
        const userId = responseJson.id;
        navigation.navigate("CreateOrganization", { userId: userId });
      } else {
        console.error("HTTP error: " + response.status);
      }
    } catch (error) {
      console.error("Error sending data to API", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 40 }}></View>
      <View style={globalstyles.headerContainer}>
        <Text style={globalstyles.header}>Create an account</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={globalstyles.subHeader}>
          Create an account on Ellis to get started
        </Text>
        <TextInput
          placeholder="Name"
          style={globalstyles.textInput}
          value={name}
          onChangeText={setName}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        <TextInput
          placeholder="Email Address"
          style={globalstyles.textInput}
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          placeholder="Password"
          style={globalstyles.textInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
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
          // disabled={!agreed || !name || !email || !password}
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

  errorText: {
    color: "red",
    paddingHorizontal: 15,
  },
});

export default Register;

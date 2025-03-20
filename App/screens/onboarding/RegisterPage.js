import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPInputView from "@twotalltotems/react-native-otp-input"; // ✅ Import OTP input
import globalstyles from "../../shared/globalStyles";
import { authSupabase } from "../../api/supabaseClient"; // Import Supabase client

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [agreedError, setAgreedError] = useState("");
  const [loading, setLoading] = useState(false);

  const [agreed, setAgreed] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpModalVisible, setOtpModalVisible] = useState(false);

  const toggleAgree = () => {
    setAgreed(!agreed);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle registration
  const handleSubmit = async () => {
    setLoading(true);

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
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!agreed) {
      setAgreedError("Must accept Terms of Use");
      valid = false;
    } else {
      setAgreedError("");
    }

    if (!valid) {
      setLoading(false);
      return;
    }

    try {
      // Send OTP instead of magic link
      const { error } = await authSupabase.auth.signInWithOtp({ email });

      if (error) {
        Alert.alert("Signup Error", error.message);
        setLoading(false);
        return;
      }

      Alert.alert("Check Your Email", "Enter the OTP code sent to your email.");
      setOtpModalVisible(true);
      setLoading(false);
    } catch (error) {
      console.error("Unexpected error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // Function to verify OTP
  // Function to verify OTP
  const handleVerifyOtp = async (code) => {
    try {
      const { data, error } = await authSupabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });

      if (error) {
        Alert.alert("Verification Error", error.message);
        return;
      }

      Alert.alert("Success", "You are registered!");
      setOtpModalVisible(false); // Close modal
      setOtp("");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
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
      {agreedError ? <Text style={styles.errorText}>{agreedError}</Text> : null}
      <TouchableOpacity
        style={[
          globalstyles.buttonContainer,
          !agreed || !name || !email
            ? styles.disabledButton
            : { backgroundColor: "#10798B" },
          { marginVertical: 10 },
        ]}
        activeOpacity={0.6}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={[globalstyles.buttonText, { color: "#fff" }]}>
          {loading ? "Signing up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={otpModalVisible}
          onRequestClose={() => setOtpModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter the Code</Text>
              <OTPInputView
                style={{ width: "80%", height: 80 }}
                pinCount={6}
                autoFocusOnLoad
                keyboardType="number-pad"
                clearInputs={false} // Keeps input visible even if wrong code is entered
                codeInputFieldStyle={styles.otpInput}
                codeInputHighlightStyle={styles.otpInputActive}
                onCodeChanged={(code) => setOtp(code)} // Updates OTP state as user types or deletes
                onCodeFilled={(code) => handleVerifyOtp(code)} // Automatically submits when 6 digits are entered
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setOtpModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    marginHorizontal: 10,
    marginVertical: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  otpInput: {
    width: 40,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    color: "#000",
  },
  otpInputActive: {
    borderColor: "#10798B",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#10798B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Register;

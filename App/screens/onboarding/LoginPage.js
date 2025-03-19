import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input"; // ✅ Import OTP input
import { authSupabase } from "../../api/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const navigation = useNavigation();

  // Function to send OTP
  const handleLogin = async () => {
    const { error } = await authSupabase.auth.signInWithOtp({ email });

    if (error) {
      Alert.alert("Login Error", error.message);
    } else {
      Alert.alert("Check Your Email", "Enter the OTP code sent to your email.");
      setOtpModalVisible(true);
    }
  };

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

      Alert.alert("Success", "You are registered and logged in!");
      setOtpModalVisible(false); // Close modal
    } catch (error) {
      console.error("OTP Verification Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Automatically check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await authSupabase.auth.getUser();
      if (data?.user) {
        navigation.navigate("Service Directory"); // Redirect if user is already logged in
      }
    };

    checkUser();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Login with OTP</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <Button title="Send OTP Code" onPress={handleLogin} />

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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default Login;

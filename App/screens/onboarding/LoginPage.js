import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { authSupabase } from "../../api/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [waitingForOtp, setWaitingForOtp] = useState(false);
  const navigation = useNavigation();

  // Function to send OTP
  const handleLogin = async () => {
    const { error } = await authSupabase.auth.signInWithOtp({ email });

    if (error) {
      Alert.alert("Login Error", error.message);
    } else {
      Alert.alert("Check Your Email", "Enter the OTP code sent to your email.");
      setWaitingForOtp(true);
    }
  };

  const handleVerifyOtp = async () => {
    const { data, error } = await authSupabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      Alert.alert("Verification Error", error.message);
      console.log("OTP Verification Error:", error);
    } else {
      console.log("User Data After Login:", data);
      Alert.alert("Success", "You are logged in!");
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

        {waitingForOtp && (
          <>
            <TextInput
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              style={{ borderBottomWidth: 1, marginTop: 10 }}
            />
            <Button title="Verify OTP" onPress={handleVerifyOtp} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;

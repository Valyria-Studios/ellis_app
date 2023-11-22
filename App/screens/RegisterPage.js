import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";

const Register = () => {
  return (
    <SafeAreaView style={globalstyles.container}>
      <View>
        <Text>Create an account</Text>
      </View>
      <View>
        <Text>Create an account on Ellis to get started</Text>
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

export default Register;

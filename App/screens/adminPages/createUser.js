import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../../shared/globalStyles";

function CreateUser() {
  return (
    <SafeAreaView style={globalstyles.container}>
      <View>
        <Text style={styles.addClient}>You are adding a new client for</Text>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    addClient: {
        fontSize: 16,
        fontFamily: "karla-regular",
        letterSpacing: 0.16
    }
});

export default CreateUser;

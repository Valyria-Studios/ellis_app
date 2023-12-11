import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../../shared/globalStyles";
import SearchComponent from "../../shared/SearchHeader";

export default function Settings() {
  return (
    <SafeAreaView style={globalstyles.container}>
      <SearchComponent />
      <View style={{marginVertical: 5}}>
        <Text style={globalstyles.title}>Settings</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

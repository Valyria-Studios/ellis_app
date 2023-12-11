import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../../shared/globalStyles";
import SearchComponent from "../../shared/SearchHeader";

export default function Settings() {
  const pages = [
    { name: "Org Profile", label: "Organization Profile" },
    { name: "Account", label: "My Account" },
    { name: "Notifications", label: "Notifications" },
    { name: "Help", label: "Help" },
    { name: "Log Out", label: "Log Out" },
  ];

  return (
    <SafeAreaView style={globalstyles.container}>
      <SearchComponent />
      <View style={{ marginVertical: 5 }}>
        <Text style={globalstyles.title}>Settings</Text>
      </View>
      <View>
        {pages.map((page, index) => (
          <TouchableOpacity key={index} style={styles.container}>
            <Text>{page.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical:5,
    padding: 20,
    borderRadius: 15,
  },
});

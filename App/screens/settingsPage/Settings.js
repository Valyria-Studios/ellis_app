import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../../shared/globalStyles";
import SearchComponent from "../../shared/SearchHeader";
import Icon from "@expo/vector-icons/MaterialIcons";

export default function Settings() {
  const pages = [
    { name: "Org Profile", label: "Organization Profile", icon: "business" },
    { name: "Account", label: "My Account", icon: 'admin-panel-settings' },
    { name: "Notifications", label: "Notifications", icon: 'notifications-none' },
    { name: "Help", label: "Help", icon: 'info-outline' },
    { name: "Log Out", label: "Log Out", icon: 'logout' },
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
            <View style={styles.optionsContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={page.icon} size={30} style={styles.icon} />
                <Text style={styles.optionsText}>{page.label}</Text>
              </View>
              <Icon name="keyboard-arrow-right" size={30} style={styles.icon} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
  },

  optionsContainer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionsText: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: "gabarito-regular",
    color: "#171B1C",
  },

  icon: {
    color: "#094852",
  },
});

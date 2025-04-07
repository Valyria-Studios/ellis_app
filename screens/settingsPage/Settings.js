import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../../shared/globalStyles";
import SearchComponent from "../../shared/SearchHeader";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");

  const pages = [
    {
      label: "Organization Profile",
      icon: "business",
      screenName: "Organization Profile",
    },
    {
      label: "My Account",
      icon: "admin-panel-settings",
      screenName: "Account",
    },
    {
      label: "Notifications",
      icon: "notifications-none",
      screenName: "Notifications",
    },
    { label: "Help", icon: "info-outline", screenName: "Help" },
    { label: "Log Out", icon: "logout", screenName: "LogOut" },
  ];

  const pushPage = (screenName) => {
    navigation.push(screenName);
  };

  return (
    <SafeAreaView style={globalstyles.container}>
      <SearchComponent searchInput={searchInput} showProfileImage={true} />
      <View style={{ marginVertical: 5 }}>
        <Text style={globalstyles.title}>Settings</Text>
      </View>
      <View>
        {pages.map((page, index) => (
          <TouchableOpacity
            key={index}
            style={styles.container}
            onPress={() => pushPage(page.screenName)}
          >
            <View style={globalstyles.optionsContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={page.icon} size={30} style={styles.icon} />
                <Text style={globalstyles.optionsText}>{page.label}</Text>
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
    marginVertical: 5,
  },

  icon: {
    color: "#094852",
  },
});

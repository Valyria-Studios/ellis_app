import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import FloatingActionMenu from "./FloatingActionMenu";
import Messages from "../screens/Messages";
import Settings from "../screens/settingsPage/Settings";
import RelationshipPage from "../screens/Relationships";
import Directory from "../screens/directoryPages/Directory";


const MainScreenContainer = () => {
  const [currentScreen, setCurrentScreen] = useState("Directory");

  const renderScreen = () => {
    switch (currentScreen) {
      case "Directory":
        return <Directory />;
      case "Relationships":
        return <RelationshipPage />;
      case "Messages":
        return <Messages />;
      case "Settings":
        return <Settings />;
      default:
        return <Directory />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <FloatingActionMenu onItemSelect={setCurrentScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreenContainer;

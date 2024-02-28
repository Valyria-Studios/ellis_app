import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FloatingActionMenu from "./TestingNavi";
import Messages from "../screens/Messages";
import Settings from "../screens/settingsPage/Settings";
import RelationshipPage from "../screens/Relationships";
import Directory from "../screens/Directory";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MainScreenContainer = () => {
  const [currentScreen, setCurrentScreen] = useState("Directory");

  const renderScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Directory"
          component={Directory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Relationships"
          component={RelationshipPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
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

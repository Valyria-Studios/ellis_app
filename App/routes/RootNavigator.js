import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator"; // Import your BottomTabNavigator
import ChatPage from "../screens/ChatPage";

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name=" "
        component={AppNavigator}
        options={{ headerShown: false }} // Hide header for the MainApp
      />
      <RootStack.Screen
        name="ChatPage"
        component={ChatPage}
        options={({ route }) => ({
          headerTitle: route.params.chatName || "Chat",
        })}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;

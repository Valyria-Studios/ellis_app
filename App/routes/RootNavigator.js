import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator"; // Import your BottomTabNavigator
import ChatPage from "../screens/ChatPage";
import AmenityPage from "../screens/AmenityPage";
import ProfilePage from "../screens/ProfilePage";

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
          headerTitle: route.params.chatIdentifier || "Chat",
          headerTintColor: "black",
        })}
      />
      <RootStack.Screen
        name="Amenity Page"
        component={AmenityPage}
        options={({ route }) => ({
          headerTitle: route.params.amenity.location,
          headerTitleStyle: {
            color: "#171b1c",
            fontSize: 28,
            marginLeft: -160,
          },
          headerTitleContainerStyle: { left: 0 },
          headerTintColor: "#094852",
        })}
      />
      <RootStack.Screen
        name="Profile Page"
        component={ProfilePage}
        options={({ route }) => ({
          headerTitle: route.params.client.name,
          headerTitleStyle: {
            color: "#171B1C",
            fontSize: 24,
            marginLeft: -160,
          },
          headerTitleContainerStyle: { left: 0 },
          headerTintColor: "#094852"
        })}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;

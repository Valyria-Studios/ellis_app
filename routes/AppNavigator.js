import React, { lazy } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Messages from "../screens/messagesPages/Messages";
import Settings from "../screens/settingsPage/Settings";
import RelationshipPage from "../screens/relationshipsPages/Relationships";
import Ionicons from "@expo/vector-icons/Ionicons";
import Directory from "../screens/directoryPages/Directory";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        lazy: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName, IconComponent;

          // Select an icon name based on the route name
          if (route.name === "Directory") {
            iconName = focused ? "compass" : "compass-outline";
            IconComponent = Ionicons;
          } else if (route.name === "Relationships") {
            iconName = focused ? "person-circle" : "person-circle-outline";
            IconComponent = Ionicons;
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbox" : "chatbox-outline";
            IconComponent = Ionicons;
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            IconComponent = Ionicons;
          }

          if (!IconComponent || !iconName) return null;

          // Return an Icon component with the selected iconName
          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFFFFF", // Set active tab color
        tabBarInactiveTintColor: "#094851", // Set inactive tab color
        tabBarActiveBackgroundColor: "#10798B",
        tabBarStyle: {
          // height: 100,
          display: "flex",
          elevation: 10,
        },
      })}
    >
      <Tab.Screen
        name="Directory"
        component={Directory}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Relationships"
        component={RelationshipPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

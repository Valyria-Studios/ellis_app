import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "../screens/Chat";
import Applications from "../screens/Applications";
import Settings from "../screens/Settings";
import Feathericons from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName, IconComponent;

          // Select an icon name based on the route name
          if (route.name === "Home") {
            iconName = focused ? "compass" : "compass";
            IconComponent = Feathericons;
          } else if (route.name === "Applications") {
            iconName = focused ? "plus-circle" : "plus-circle";
            IconComponent = Feathericons;
          } else if (route.name === "Chat") {
            iconName = focused
              ? "person-circle-outline"
              : "person-circle-outline";
            IconComponent = Ionicons;
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            IconComponent = Ionicons;
          }

          if (!IconComponent || !iconName) return null;

          // Return an Icon component with the selected iconName
          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ebae52", // Set active tab color
        tabBarInactiveTintColor: "gray", // Set inactive tab color
        tabBarStyle: {
          display: "flex",
          height: 70,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          elevation: 10,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Applications"
        component={Applications}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
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

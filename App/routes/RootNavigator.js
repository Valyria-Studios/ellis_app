import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator"; // Import your BottomTabNavigator
import ChatPage from "../screens/ChatPage";
import AmenityPage from "../screens/AmenityPage";
import ProfilePage from "../screens/ProfilePage";
import RequestService from "../screens/RequestServicePage";
import OrgProfile from "../screens/settingsPage/OrganizationProfile";
import AccountPage from "../screens/settingsPage/AccountPage";
import NotificationsPage from "../screens/settingsPage/NotificationsPage";
import HelpPage from "../screens/settingsPage/HelpPage";
import LogOutPage from "../screens/settingsPage/LogOutPage";
import LegalFormScreen from "../screens/formPages/LegalForm";

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
          headerTintColor: "#094852",
        })}
      />
      <RootStack.Screen
        name="Request Services Page"
        component={RequestService}
        options={{
          headerTitle: "",
          headerTintColor: "#094852",
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        }}
      />
      <RootStack.Screen
        name="Organization Profile"
        component={OrgProfile}
        options={{}}
      />
      <RootStack.Screen name="Account" component={AccountPage} options={{}} />
      <RootStack.Screen
        name="Notifications"
        component={NotificationsPage}
        options={{}}
      />
      <RootStack.Screen name="Help" component={HelpPage} options={{}} />
      <RootStack.Screen name="LogOut" component={LogOutPage} options={{}} />
      <RootStack.Screen name="Legal Aid" component={LegalFormScreen} options={{}} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;

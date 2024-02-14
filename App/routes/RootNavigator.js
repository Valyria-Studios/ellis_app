import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator"; // Import your BottomTabNavigator
import ChatPage from "../screens/ChatPage";
import AmenityPage from "../screens/AmenityPage";
import ProfilePage from "../screens/ProfilePage";
import RequestService from "../screens/requestServicePages/RequestServicePage";
import OrgProfile from "../screens/settingsPage/OrganizationProfile";
import AccountPage from "../screens/settingsPage/AccountPage";
import NotificationsPage from "../screens/settingsPage/NotificationsPage";
import HelpPage from "../screens/settingsPage/HelpPage";
import LogOutPage from "../screens/settingsPage/LogOutPage";
import LegalFormScreen from "../screens/formPages/LegalForm";
import AdminManagementScreen from "../screens/adminManagement";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import ServiceDetails from "../screens/requestServicePages/ServiceDetails";
import SelectReferralLocation from "../screens/requestServicePages/SelectReferralLocation";
import SelectClientWithLocation from "../screens/requestServicePages/SelectClientWithReferralLocation";
import EnrollmentForm from "../screens/requestServicePages/EnrollmentForm";
import ConfirmReferral from "../screens/requestServicePages/ConfirmReferral";
import ReferralSent from "../screens/requestServicePages/ReferralSent";

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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Your code to handle the press, e.g., open a menu or navigate
                console.log("Three vertical dots pressed");
              }}
              style={{ paddingRight: 10 }} // Add padding if needed
            >
              <Ionicons name="ellipsis-vertical" size={25} color="#094852" />
            </TouchableOpacity>
          ),
        })}
      />
      <RootStack.Screen
        name="Request Services Page"
        component={RequestService}
        options={{
          headerTitle: "Service Directory",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
            left: -180,
          },
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
      <RootStack.Screen
        name="Legal Aid"
        component={LegalFormScreen}
        options={{}}
      />
      <RootStack.Screen
        name="Profile Admin Settings"
        component={AdminManagementScreen}
        options={{
          headerBackTitle: " ",
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
            left: -180,
          },
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        }}
      />
      <RootStack.Screen
        name="Service Details"
        component={ServiceDetails}
        options={({ route }) => ({
          headerTitle: route.params.category.name,
          headerBackTitle: " ",
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
            left: -180,
          },
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        })}
      />
      <RootStack.Screen
        name="Referral Location"
        component={SelectReferralLocation}
        options={({ route }) => ({
          headerTitle: route.params.option,
          headerBackTitle: " ",
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
            left: -180,
          },
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        })}
      />
      <RootStack.Screen
        name="Select Client With Location"
        component={SelectClientWithLocation}
        options={({ route }) => ({
          headerTitle: `${route.params.option} Referral`,
          headerBackTitle: " ",
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
            left: -180,
          },
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        })}
      />
      <RootStack.Screen
        name="Enrollment Form"
        component={EnrollmentForm}
        options={({ route }) => ({
          headerTitle: `${route.params.option} Enrollment Form`,
          headerBackTitle: " ",
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
            left: -190,
          },
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        })}
      />
      <RootStack.Screen
        name="Confirm Referral"
        component={ConfirmReferral}
        options={{
          headerBackTitle: " ",
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
            left: -190,
          },
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        }}
      />
      <RootStack.Screen
        name="Referral Sent"
        component={ReferralSent}
        options={({ navigation }) => ({
          headerBackTitle: " ",
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
          },
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.popToTop()} // Navigates to the first screen in the stack
              style={{ marginLeft: 10 }} // Add marginLeft if needed for positioning
            >
              <Ionicons name="close" size={30} color="#094852" />
            </TouchableOpacity>
          ),
        })}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;

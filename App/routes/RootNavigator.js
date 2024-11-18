import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator"; // Import your BottomTabNavigator
import ChatPage from "../screens/ChatPage";
import AmenityPage from "../screens/AmenityPage";
import ProfilePage from "../screens/ProfilePage";
import ServiceDirectory from "../screens/referralFlowPages/ServiceDirectory";
import OrgProfile from "../screens/settingsPage/OrganizationProfile";
import AccountPage from "../screens/settingsPage/AccountPage";
import NotificationsPage from "../screens/settingsPage/NotificationsPage";
import HelpPage from "../screens/settingsPage/HelpPage";
import LogOutPage from "../screens/settingsPage/LogOutPage";
import LegalFormScreen from "../screens/formPages/LegalForm";
import AdminManagementScreen from "../screens/adminManagement";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import ServiceDetails from "../screens/referralFlowPages/ServiceDetails";
import SelectReferralLocation from "../screens/referralFlowPages/SelectReferralLocation";
import SelectClientWithLocation from "../screens/referralFlowPages/SelectClientWithReferralLocation";
import EnrollmentForm from "../screens/referralFlowPages/EnrollmentForm";
import ConfirmReferral from "../screens/referralFlowPages/ConfirmReferral";
import ReferralSent from "../screens/referralFlowPages/ReferralSent";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import SelectClient from "../screens/referralFlowPages/SelectClient";
import SelectReferralFor from "../screens/referralFlowPages/SelectReferralFor";
import ReferToPerson from "../screens/referralFlowPages/ReferToPerson";
import ReferToService from "../screens/referralFlowPages/ReferToService";
import MainScreenContainer from "./MainScreenContainer";
import CreateNote from "../screens/plusNavigatorButton/notes/CreateNote";
import CreateClient from "../screens/plusNavigatorButton/client/CreateClient";
import ClientInformation from "../screens/plusNavigatorButton/client/ClientInformation";
import NoteDetails from "../screens/plusNavigatorButton/notes/NoteDetails";
import MyHours from "../screens/directoryPages/myHours";
import MyServices from "../screens/directoryPages/myServices";
import MyClients from "../screens/directoryPages/myClients";
import AddClientToEngagement from "../data/testAddClient";
import ServicePage from "../screens/plusNavigatorButton/services/services";
import AppointmentScheduler from "../screens/coachReferPages/selectMeetingTime";
import EntitiesScreen from "../screens/testingGeoApi";
import CustomBackButton from "../shared/CustomBackButton";
import NonprofitsByTag from "../screens/referralFlowPages/NonprofitTags";
import RecentReferrals from "../screens/directoryPages/recentReferral";

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="MainScreen"
        component={MainScreenContainer}
        options={{
          headerShown: false,
        }} // Hide header for the MainApp
      />
      <RootStack.Screen
        name="My Clients"
        component={MyClients}
        options={{
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
          },
          headerStyle: {
            shadowColor: "transparent",
            elevation: 0,
          },
        }}
      />
      <RootStack.Screen
        name="My Services"
        component={MyServices}
        options={{
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
          },
          headerStyle: {
            shadowColor: "transparent",
            elevation: 0,
          },
        }}
      />
      <RootStack.Screen
        name="My Hours"
        component={MyHours}
        options={{
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
          },
          headerStyle: {
            shadowColor: "transparent",
            elevation: 0,
          },
        }}
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
        options={{
          headerTitle: "",
          headerLeft: () => <CustomBackButton color="#094852" />,
          headerTitleStyle: {
            color: "#171b1c",
            fontSize: 28,
            marginLeft: -160,
          },
          headerTitleContainerStyle: { left: 0 },
          headerTintColor: "#094852",
          headerTransparent: true,
        }}
      />
      <RootStack.Screen
        name="Profile Page"
        component={ProfilePage}
        options={({ route, navigation }) => ({
          headerTitle: route.params?.client?.fullName || "Profile",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
          headerTitleStyle: {
            color: "#171B1C",
            fontSize: 24,
          },
          headerTintColor: "#094852",
          headerRight: () => (
            <Menu>
              <MenuTrigger>
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  style={{ paddingRight: 10, color: "#094852" }}
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  marginTop: 30,
                  width: 150,
                  padding: 5,
                }}
              >
                <MenuOption
                  onSelect={() => navigation.navigate("SendMessagePage")}
                  text="Send Message"
                  style={styles.menuOption}
                />
                <MenuOption
                  onSelect={() =>
                    navigation.navigate("Request Services Page", {
                      client: route.params.client,
                    })
                  }
                  text="Refer to service"
                  style={styles.menuOption}
                />
                <MenuOption
                  onSelect={() => navigation.navigate("RemoveClientPage")}
                  text="Remove as client"
                  style={[styles.menuOption, { borderBottomWidth: 0 }]}
                />
              </MenuOptions>
            </Menu>
          ),
        })}
      />
      <RootStack.Screen
        name="Request Services Page"
        component={ServiceDirectory}
        options={({ route }) => ({
          headerTitle:
            route.params && route.params.headerTitle
              ? route.params.headerTitle
              : "Service Directory",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
          },
          headerTintColor: "#094852",
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        })}
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
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
        }}
      />
      <RootStack.Screen
        name="Service Details"
        component={ServiceDetails}
        options={({ route }) => ({
          headerTitle: route.params.category.name,

          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
        })}
      />
      <RootStack.Screen
        name="Referral Location"
        component={SelectReferralLocation}
        options={({ route }) => ({
          headerTitle: route.params.option,
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
        })}
      />
      <RootStack.Screen
        name="Nonprofit Tags"
        component={NonprofitsByTag}
        options={({ route }) => ({
          headerTitle: route.params.selectedTag,
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
        })}
      />
      <RootStack.Screen
        name="Select Client With Location"
        component={SelectClientWithLocation}
        options={({ route }) => ({
          headerTitle: `${route.params.option} Referral`,

          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
        })}
      />
      <RootStack.Screen
        name="Enrollment Form"
        component={EnrollmentForm}
        options={({ route }) => ({
          headerTitle: `${route.params.option} Enrollment Form`,

          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
        })}
      />
      <RootStack.Screen
        name="Confirm Referral"
        component={ConfirmReferral}
        options={{
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
        }}
      />
      <RootStack.Screen
        name="Recent Referral"
        component={RecentReferrals}
        options={({ route }) => {
          const { clientName } = route.params || {};
          return {
            headerTitle: clientName
              ? `${clientName}'s Referral`
              : "Recent Referrals",
            headerTintColor: "#094852",
            headerTitleAlign: "left",
            headerLeft: () => <CustomBackButton color="#094852" />,
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
          };
        }}
      />
      <RootStack.Screen
        name="Referral Sent"
        component={ReferralSent}
        options={({ navigation }) => ({
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
      <RootStack.Screen
        name="Select Client"
        component={SelectClient}
        options={{
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#094852",
          },
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        }}
      />
      <RootStack.Screen
        name="Select Referral For"
        component={SelectReferralFor}
        options={{
          headerTitle: "Select Referral",

          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#094852",
          },
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        }}
      />
      <RootStack.Screen
        name="Refer to Person"
        component={ReferToPerson}
        options={({ route }) => ({
          headerTitle: `Refer to ${route.params.teamMember}`,

          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#094852",
          },
          headerStyle: {
            backgroundColor: "#F3F8F9",
            shadowColor: "transparent",
            elevation: 0,
          },
        })}
      />
      <RootStack.Screen
        name="Refer to Service"
        component={ReferToService}
        options={({ route }) => ({
          headerTitle: `${route.params.service.name}`,

          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
          headerTransparent: true,
        })}
      />
      <RootStack.Screen
        name="Create a Note"
        component={CreateNote}
        options={({ route }) => ({
          headerTitle:
            route.params && route.params.headerTitle
              ? route.params.headerTitle
              : "New Note",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
          },

          headerTintColor: "#094852",
          headerStyle: {
            backgroundColor: "#FFFFFF",
            shadowColor: "transparent",
            elevation: 0,
          },
        })}
      />
      <RootStack.Screen
        name="Note Details"
        component={NoteDetails}
        options={({ route, navigation }) => ({
          headerTitle: `${route.params.note.title} Notes`,
          headerTitleAlign: "left",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                if (route.params.fromProfile) {
                  // Navigate back to the profile page
                  navigation.pop(2); // This takes you back to the Profile Page
                } else {
                  // Navigate to the start of the stack
                  navigation.popToTop();
                }
              }}
              style={{ marginLeft: 10 }} // Add marginLeft if needed for positioning
            >
              <Ionicons name="close" size={30} color="#094852" />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontFamily: "gabarito-semibold",
            fontSize: 24,
            color: "#171B1C",
          },

          headerTintColor: "#094852",
          headerStyle: {
            backgroundColor: "#FFFFFF",
            shadowColor: "transparent",
            elevation: 0,
          },
          headerRight: () => (
            <Menu>
              <MenuTrigger>
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  style={{ paddingRight: 10, color: "#094852" }}
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  marginTop: 30,
                  width: 150,
                  padding: 5,
                }}
              >
                <MenuOption text="Edit Note" style={styles.noteOptionEdit} />
                <MenuOption
                  text="Delete Note"
                  style={styles.noteOptionDelete}
                  onSelect={() => {
                    // Call the confirmDelete function passed via navigation params
                    route.params.confirmDelete && route.params.confirmDelete();
                  }}
                />
              </MenuOptions>
            </Menu>
          ),
        })}
      />
      <RootStack.Screen
        name="Create New Client"
        component={CreateClient}
        options={({ route }) => ({
          headerTitle: "Create New Client Profile",

          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
          headerTransparent: true,
        })}
      />
      <RootStack.Screen
        name="Client Information"
        component={ClientInformation}
        options={({ route }) => ({
          headerTitle: "Add Client Information",

          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
          headerTransparent: true,
        })}
      />
      <RootStack.Screen
        name="Add a Service"
        component={ServicePage}
        options={({ route }) => ({
          headerTitle: "Add a Service",

          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
          headerTransparent: true,
        })}
      />
      <RootStack.Screen
        name="Select a Meeting Time"
        component={AppointmentScheduler}
        options={({ route }) => ({
          headerTitle: "Select meeting time",

          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
          headerTransparent: true,
        })}
      />
      <RootStack.Screen
        name="Entities Screen"
        component={EntitiesScreen}
        options={({ route }) => ({
          headerTitle: "Select Entity",
          headerTintColor: "#094852",
          headerTitleAlign: "left",
          headerLeft: () => <CustomBackButton color="#094852" />,
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
          headerTransparent: true,
        })}
      />
    </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
  menuOption: {
    borderBottomWidth: 1,
    borderBottomColor: "#dedede",
    padding: 10,
  },

  noteOptionEdit: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#094852", // Set a specific color for Edit Note
    padding: 10,
  },

  noteOptionDelete: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#FF6347", // Set a specific color for Delete Note (e.g., a red color)
    padding: 10,
  },
});

export default RootNavigator;

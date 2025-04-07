import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/onboarding/Onboarding";
import Login from "../screens/onboarding/LoginPage";
import Register from "../screens/onboarding/RegisterPage";
import CreateOrganization from "../screens/onboarding/CreateOrganization";
import ServiceHours from "../screens/onboarding/addServiceHours";
import ServicesPage from "../screens/onboarding/addServicesPage";

const Stack = createStackNavigator();

const OnBoardingNavigator = ({ onCompleteOnboarding }) => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateOrganization"
        component={CreateOrganization}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Services"
        component={ServicesPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Service_Hours"
        component={ServiceHours}
        initialParams={{ onCompleteOnboarding }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default OnBoardingNavigator;

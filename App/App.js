import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import RootNavigator from "./routes/RootNavigator";
import * as SplashScreen from "expo-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardingNavigator from "./routes/OnboardingNavigator";
import RequestLegalAid from "./deprecated/RequestLegalAid";
import LegalQuestions from "./deprecated/LegalQuestions";
import SelectForms from "./screens/formPages/SelectForms";
import LegalFormScreen from "./screens/formPages/LegalForm";
import FoodFormScreen from "./screens/formPages/FoodForm";
import CreateUser from "./screens/adminPages/createUser";

const Stack = createStackNavigator();

const getFonts = () =>
  Font.loadAsync({
    "gabarito-bold": require("./assets/fonts/Gabarito-Bold.ttf"),
    "gabarito-medium": require("./assets/fonts/Gabarito-Medium.ttf"),
    "gabarito-regular": require("./assets/fonts/Gabarito-Regular.ttf"),
    "gabarito-semibold": require("./assets/fonts/Gabarito-SemiBold.ttf"),
    "karla-bold": require("./assets/fonts/Karla-Bold.ttf"),
    "karla-italic": require("./assets/fonts/Karla-Italic.ttf"),
    "karla-regular": require("./assets/fonts/Karla-Regular.ttf"),
    "karla-semibold": require("./assets/fonts/Karla-SemiBold.ttf"),
    "jetbrainsmono-regular": require("./assets/fonts/JetBrainsMono-Regular.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const handleCompleteOnboarding = () => {
    setOnboardingComplete(true);
  };

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await getFonts();
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Create New Client Profile"
            component={CreateUser}
            options={{headerTitleAlign: "left"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return null;
  }
}

// return (
//   <NavigationContainer>
//     {onboardingComplete ? (
//       <RootNavigator />
//     ) : (
//       <OnBoardingNavigator
//         onCompleteOnboarding={handleCompleteOnboarding}
//       />
//     )}
//   </NavigationContainer>
// );

// return (
//   <NavigationContainer>
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Select Forms"
//         component={SelectForms}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="Legal Form"
//         component={LegalFormScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="Food Form"
//         component={FoodFormScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   </NavigationContainer>
// );

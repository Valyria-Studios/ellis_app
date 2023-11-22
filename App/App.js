import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import RootNavigator from "./routes/RootNavigator";
import * as SplashScreen from "expo-splash-screen";
import Onboarding from "./screens/Onboarding";
import AppNavigator from "./routes/AppNavigator";
import Login from "./screens/LoginPage";
import Register from "./screens/RegisterPage";
import { createStackNavigator } from "@react-navigation/stack";

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
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return null;
  }
}

// <NavigationContainer>
//   <RootNavigator />
// </NavigationContainer>;

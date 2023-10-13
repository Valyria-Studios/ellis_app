import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import RootNavigator from "./routes/RootNavigator";
import * as SplashScreen from "expo-splash-screen";

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
        <RootNavigator />
      </NavigationContainer>
    );
  } else {
    return null;
  }
}

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./routes/AppNavigator"; // Import the navigation configuration

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

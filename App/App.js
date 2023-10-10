import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./routes/AppNavigator"; // Import the navigation configuration
import RootNavigator from "./routes/RootNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;

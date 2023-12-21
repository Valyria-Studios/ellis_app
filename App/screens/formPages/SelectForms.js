import React from "react";
import { View, Button } from "react-native";

const SelectForms = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Legal Form"
        onPress={() => navigation.navigate("Legal Form")}
      />
      <Button
        title="Food Form"
        onPress={() => navigation.navigate("Food Form")}
      />
    </View>
  );
};

export default SelectForms;

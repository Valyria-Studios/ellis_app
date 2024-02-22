import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import globalstyles from "../../shared/globalStyles";

const SelectReferralFor = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <View style={globalstyles.container}>
      <View>
        <Text>Refer to a person</Text>
        <Text>Options selector</Text>
      </View>
      <View>
        <Text>Refer to a service</Text>
        <View>
            <Text>Services</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  infoText: {
    fontSize: 18,
  },
});

export default SelectReferralFor;

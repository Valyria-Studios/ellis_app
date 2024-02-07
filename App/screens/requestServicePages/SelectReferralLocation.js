import React from "react";
import { View, Text, StyleSheet } from "react-native";
import globalstyles from "../../shared/globalStyles";

const SelectReferralLocation = ({ route }) => {
  const { option } = route.params;

  return (
    <View style={globalstyles.container}>
      <Text style={styles.title}>{option}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
});

export default SelectReferralLocation;

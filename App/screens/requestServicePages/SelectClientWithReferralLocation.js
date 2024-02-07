import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SelectClientWithLocation = ({ route }) => {
  // Access the selectedAmenity parameter
  const { selectedAmenity } = route.params;

  return (
    <View style={styles.container}>
      <Text>Selected Amenity Location: {selectedAmenity.location}</Text>
      <Text>Address: {selectedAmenity.address}</Text>
      {/* Display other details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SelectClientWithLocation;

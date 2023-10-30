import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

function AmenityPage({ route }) {
  const { amenity } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.centerCard}>
          <View style={styles.locationText}>
            <Text>{amenity.location}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  centerCard: {
    marginTop: 450,
  },

  locationText: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default AmenityPage;

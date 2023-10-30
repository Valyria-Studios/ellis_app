import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import getAmenityImage from "../shared/getAmenityImage";

function AmenityPage({ route }) {
  const { amenity } = route.params;
  return (
    <ImageBackground
      source={getAmenityImage(amenity.location)}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.centerCard}>
          <View style={styles.locationText}>
            <Text>{amenity.location}</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: 'cover',
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  centerCard: {
    marginTop: 450,
  },

  locationText: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default AmenityPage;

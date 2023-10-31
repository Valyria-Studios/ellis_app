import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import getAmenityImage from "../shared/getAmenityImage";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalstyles from "../shared/globalStyles";

function AmenityPage({ route }) {
  const { amenity } = route.params;
  return (
    <ImageBackground
      source={getAmenityImage(amenity.location)}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <ScrollView>
        <View style={styles.centerCard}>
          <View style={styles.mainText}>
            <View style={styles.header}>
              <Text style={styles.locationText}>{amenity.location}</Text>
              <View style={styles.iconsContainer}>
                <View style={styles.icon}>
                  <FontAwesome5 name="phone-alt" size={18} />
                </View>
                <View style={styles.icon}>
                  <MaterialCommunityIcons name="message" size={18} />
                </View>
              </View>
            </View>
            <Text style={globalstyles.cardDetails}>
              {amenity.address}
              {"\n"}
              {amenity.distance}
              {"\n"}
              {amenity.times}
            </Text>
            <View style={globalstyles.tagContainer}>
              {amenity.type && Array.isArray(amenity.type)
                ? amenity.type.map((type, index) => (
                    <View key={index} style={globalstyles.tagBackground}>
                      <Text style={globalstyles.individualTags}>{type}</Text>
                    </View>
                  ))
                : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: "cover",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255, 0.4)",
  },

  centerCard: {
    marginTop: 450,
  },

  mainText: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconsContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  icon: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
    borderWidth: 1,
  },

  locationText: {
    fontSize: 28,
    fontFamily: "gabarito-semibold",
    color: "#094851",
    marginVertical: 10,
  },
});

export default AmenityPage;

import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
              <View style={styles.iconSpacing}>
                <View style={styles.iconsContainer}>
                  <FontAwesome5
                    name="phone-alt"
                    size={18}
                    style={styles.icon}
                  />
                </View>
                <View style={styles.iconsContainer}>
                  <MaterialCommunityIcons
                    name="message"
                    size={18}
                    style={styles.icon}
                  />
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
            <View>
              <Text>{amenity.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.availabilityContainer}>
        <Text style={styles.availability}>
          {amenity.availability !== "0"
            ? `${amenity.availability} Available services`
            : `No Services Available`}
        </Text>
        <View style={styles.availabilityButtonContainer}>
          {renderButton("Refer a Client")}
          {renderButton("Check Availability")}
        </View>
      </View>
    </ImageBackground>
  );
}

function renderButton(text) {
  return (
    <TouchableOpacity style={styles.availabilityButton}>
      <Text>{text}</Text>
    </TouchableOpacity>
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
    backgroundColor: "rgba(255,255,255,0.9)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconSpacing: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  iconsContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#10798a",
    borderColor: "#10798a",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 20,
  },

  icon: {
    color: "#ffffff",
  },

  locationText: {
    fontSize: 28,
    fontFamily: "gabarito-semibold",
    color: "#094851",
    marginVertical: 10,
  },

  availabilityContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    // height: 50, // or whatever height you want
    backgroundColor: "rgba(255,255,255,1)", // you can change this
    justifyContent: "center",
    alignItems: "center",
  },

  availability: {
    margin: 10,
  },

  availabilityButtonContainer: {
    flexDirection: "row",
  },

  availabilityButton: {
    borderWidth: 2,
  },
});

export default AmenityPage;

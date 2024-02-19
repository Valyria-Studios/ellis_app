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
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import globalstyles from "../shared/globalStyles";

function AmenityPage({ route, navigation }) {
  const { amenity } = route.params;
  return (
    <ImageBackground
      source={getAmenityImage(amenity.location)}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <ScrollView style={styles.scrollView}>
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
              {amenity.operationalHours}
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
        <View style={styles.availabilityButtonContainer}>
          <TouchableOpacity activeOpacity={0.9}>
            <View style={styles.iconsContainer}>
              <MaterialCommunityIcons
                name="message"
                size={20}
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.referButton} activeOpacity={0.9} onPress={() => (navigation.navigate("Select Client", {amenity}))}>
            <MaterialIcons name="app-registration" size={18} color="#FFFFFF" />
            <Text style={styles.referButtonText}>Refer</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginTop: 400,
    marginBottom: 175,
  },

  scrollView: {
    flex: 1,
  },

  mainText: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
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
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
    borderRadius: 50,
  },

  icon: {
    color: "#10798B",
  },

  locationText: {
    fontSize: 28,
    fontFamily: "gabarito-semibold",
    color: "#094851",
    marginVertical: 10,
  },

  availabilityContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 50,
    zIndex: 10,
    width: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 8, // This will add shadow to the right of the container
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },

  availability: {
    margin: 15,
    fontFamily: "gabarito-regular",
    color: "#545e60",
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  availabilityButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  availabilityButton: {
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 30,
    margin: 5,
    marginBottom: 15,
    borderRadius: 25,
  },

  availabilityButtonText: {
    fontSize: 16,
    fontFamily: "gabarito-medium",
  },

  referButton: {
    flexDirection: "row",
    backgroundColor: "#10798a",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },

  referButtonText: {
    fontFamily: "gabarito-semibold",
    fontSize: 16,
    color: "#ffffff",
    marginLeft: 5,
  },

  checkAvailabilityButton: {
    backgroundColor: "#ffffff",
    borderColor: "#79b4be",
  },

  checkAvailabilityButtonText: {
    color: "#094851",
  },
});

export default AmenityPage;

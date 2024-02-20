import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import getAmenityImage from "../shared/getAmenityImage";
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import globalstyles from "../shared/globalStyles";
import SocialMediaLinks from "../shared/SocialMediaIcon";

function AmenityPage({ route, navigation }) {
  const { amenity } = route.params;

  const openWebsite = () => {
    Linking.openURL(`${amenity.website}`).catch((err) =>
      console.error("An error occurred", err)
    );
  };

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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Octicons
                  name="location"
                  size={20}
                  style={{ marginRight: 10, color: "#094852" }}
                />
                <Text style={globalstyles.cardDetails}>{amenity.address}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <MaterialIcons
                  name="schedule"
                  size={20}
                  style={{ marginRight: 7, color: "#094852" }}
                />
                <Text style={globalstyles.cardDetails}>
                  {amenity.operationalHours}
                </Text>
              </View>
              <View style={globalstyles.tagContainer}>
                <TouchableOpacity activeOpacity={0.7}>
                  <View style={[styles.buttonContainer, { marginRight: 10 }]}>
                    <MaterialCommunityIcons
                      name="arrow-right-top-bold"
                      size={15}
                      color="#094852"
                      style={{ paddingRight: 5 }}
                    />
                    <Text style={styles.buttonText}>Get Directions</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                  <View style={styles.buttonContainer}>
                    <MaterialCommunityIcons
                      name="phone-outline"
                      size={15}
                      color="#094852"
                      style={{ paddingRight: 5 }}
                    />
                    <Text style={styles.buttonText}>Call</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginBottom: 30 }}>
              <Text
                style={[globalstyles.details, { margin: 0, marginBottom: 10 }]}
              >
                About the organization
              </Text>
              <Text style={[globalstyles.detailsText, { marginHorizontal: 0 }]}>
                {amenity.description}
              </Text>
              <TouchableOpacity
                onPress={openWebsite}
                style={{ alignSelf: "baseline" }}
              >
                <Text style={styles.websiteText}>Website</Text>
              </TouchableOpacity>
              <SocialMediaLinks socialMedia={amenity.socialMedia} />
            </View>
            <View>
              <Text
                style={[globalstyles.details, { margin: 0, marginBottom: 10 }]}
              >
                Language
              </Text>
              <Text style={[globalstyles.detailsText, { marginHorizontal: 0 }]}>
                {amenity.languages}
              </Text>
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
          <TouchableOpacity
            style={styles.referButton}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Select Client", { amenity })}
          >
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
    marginBottom: 30,
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

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E7F2F3",
    borderRadius: 20,
  },

  buttonText: {
    fontFamily: "gabarito-regular",
    fontSize: 16,
    color: "#094852",
  },

  websiteText: {
    textDecorationLine: "underline",
    color: "#10798B",
    fontFamily: "karla-semibold",
    fontSize: 16,
    paddingBottom: 10,
  },
});

export default AmenityPage;

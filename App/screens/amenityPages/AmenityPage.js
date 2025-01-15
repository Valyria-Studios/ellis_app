// Logic for Similar Amenities needed

import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  TextInput,
} from "react-native";
import {
  Octicons,
  MaterialIcons,
  Feather,
  FontAwesome6,
} from "@expo/vector-icons";
import globalstyles from "../../shared/globalStyles";

function AmenityPage({ route, navigation }) {
  const { amenity } = route.params;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(
    route.params?.isEditMode || false
  );
  const [editedData, setEditedData] = useState({
    name: amenity?.attributes?.["Name"] || "",
    address: amenity?.attributes?.["Street address"] || "",
    phone: amenity?.attributes?.["Phone number"] || "",
    description:
      Array.isArray(amenity?.attributes?.Description) &&
      amenity?.attributes?.Description.length > 0
        ? amenity.attributes.Description.join(" ") // Combine array elements into a single string, if applicable
        : "No description available",
  });

  useEffect(() => {
    // Update state if the route's edit mode changes
    if (route.params?.isEditMode !== undefined) {
      setIsEditMode(route.params.isEditMode);
    }
  }, [route.params?.isEditMode]);

  const openWebsite = () => {
    Linking.openURL(`${amenity?.attributes["Web URL"]}`).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const handleSave = () => {
    console.log("Saving data:", editedData);
    // Logic to save data to the backend or state management
    navigation.setParams({ isEditMode: false });
  };

  const scrollViewRef = React.useRef();

  return (
    <View style={styles.container}>
      {/* ImageBackground */}
      <ImageBackground
        source={{
          uri: amenity?.attributes?.Cover.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          ),
        }}
        style={styles.container}
        onLoad={() => setImageLoaded(true)}
      >
        {/* Overlay for dimming the background */}
        <View style={styles.overlay} />

        {/* Show ActivityIndicator only until the image is loaded */}
        {!imageLoaded && (
          <ActivityIndicator
            size="large"
            color="black"
            style={styles.loadingIndicator}
          />
        )}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.centerCard}>
            <View style={styles.mainText}>
              <View style={styles.header}>
                {isEditMode ? (
                  <TextInput
                    style={[globalstyles.cardDetails, styles.editInput]}
                    value={editedData.name}
                    onChangeText={(text) =>
                      setEditedData((prev) => ({ ...prev, name: text }))
                    }
                  />
                ) : (
                  <Text style={styles.locationText}>{editedData.name}</Text>
                )}
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
                  {isEditMode ? (
                    <TextInput
                      style={[globalstyles.cardDetails, styles.editInput]}
                      value={editedData.address}
                      onChangeText={(text) =>
                        setEditedData((prev) => ({ ...prev, address: text }))
                      }
                    />
                  ) : (
                    <Text style={globalstyles.cardDetails}>
                      {editedData.address}
                    </Text>
                  )}
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
                  {isEditMode ? (
                    <TextInput
                      style={[globalstyles.cardDetails, styles.editInput]}
                      value={editedData.phone}
                      onChangeText={(text) =>
                        setEditedData((prev) => ({ ...prev, phone: text }))
                      }
                    />
                  ) : (
                    <Text style={globalstyles.cardDetails}>
                      {editedData.phone}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      const address = encodeURIComponent(
                        amenity?.attributes?.["Street address"]
                      );
                      const url = `https://www.google.com/maps/search/?api=1&query=${address}`;

                      Linking.openURL(url).catch((err) =>
                        console.error("An error occurred", err)
                      );
                    }}
                    style={[styles.buttonContainer, { marginRight: 10 }]}
                  >
                    <FontAwesome6
                      name="arrows-split-up-and-left"
                      size={18}
                      color={"#094852"}
                    />
                    <Text style={[styles.buttonText, { paddingLeft: 10 }]}>
                      Get Directions
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `tel:${amenity?.attributes?.["Phone number"]}`
                      )
                    }
                    style={styles.buttonContainer}
                  >
                    <Feather name="phone" size={18} color={"#094852"} />
                    <Text style={[styles.buttonText, { paddingLeft: 10 }]}>
                      Call
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={openWebsite}>
                    <Text
                      style={{
                        fontFamily: "karla-bold",
                        fontSize: 16,
                        color: "#10798B",
                        textDecorationLine: "underline",
                      }}
                    >
                      Website
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 10 },
                  ]}
                >
                  About the Organization
                </Text>
                {isEditMode ? (
                  <TextInput
                    style={[globalstyles.cardDetails, styles.editInput]}
                    value={editedData.description}
                    onChangeText={(text) =>
                      setEditedData((prev) => ({ ...prev, description: text }))
                    }
                    multiline
                  />
                ) : (
                  <Text
                    style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                  >
                    {editedData.description || "No description available"}
                  </Text>
                )}
              </View>

              <View style={{ marginBottom: 15 }}>
                {amenity?.attributes?.["Provided services"]?.map(
                  (serviceName, index) => {
                    // Find the matching service in providedServiceswithId by name
                    const service = amenity.providedServiceswithId.find(
                      (item) => item.name === serviceName
                    );

                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.serviceCard}
                        onPress={() => {
                          navigation.push("Referral Location", {
                            option: serviceName, // Display name from "Provided services"
                            categoryName: amenity.attributes?.["Name"], // Name of the main category/amenity
                            providedServicesId: service ? [service.id] : [], // Use the id if found, otherwise empty array
                            client: route.params?.client || null, // Pass client data if applicable
                          });
                        }}
                      >
                        <Text
                          style={[
                            globalstyles.details,
                            { margin: 0, marginBottom: 5 },
                          ]}
                        >
                          Service
                        </Text>
                        <Text style={styles.serviceCardHeader}>
                          {serviceName}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: "cover",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  loadingIndicator: {
    position: "absolute",
    top: "25%",
    left: "45%",
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

  serviceCard: {
    backgroundColor: "#F3F8F9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },

  serviceCardHeader: {
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#094852",
    marginBottom: 10,
  },

  serviceAvailabeContainer: {
    backgroundColor: "#E7F2F3",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#4094A2",
    alignSelf: "baseline",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  serviceLowContainer: {
    backgroundColor: "#FBEFDD",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ECAD53",
    alignSelf: "baseline",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  noServiceContainer: {
    backgroundColor: "#DADDDD",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#B5BABB",
    alignSelf: "baseline",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  scrollToTopButton: {
    fontFamily: "gabarito-regular",
    fontSize: 16,
    color: "#094852",
  },

  editInput: {
    borderWidth: 1, // Add a visible border
    borderColor: "#10798B", // Use a distinct color for edit mode
    backgroundColor: "#F3F8F9", // Light background color for differentiation
    borderRadius: 5, // Rounded corners for aesthetics
    padding: 8, // Inner padding for better readability
    fontSize: 16, // Match the font size with the original text
    color: "#094852", // Ensure the text color is clear
    fontFamily: "karla-regular", // Use the same font for consistency
  },
});

export default AmenityPage;
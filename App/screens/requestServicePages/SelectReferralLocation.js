import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import globalstyles from "../../shared/globalStyles";
import Card from "../../shared/Card";
import { MaterialIcons, Octicons, Feather } from "@expo/vector-icons";

const SelectReferralLocation = ({ route, navigation }) => {
  const { option, categoryName, client } = route.params;
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Amenities")
      .then((response) => response.json())
      .then((data) => {
        const filteredAmenities = data.filter((amenity) =>
          amenity.type.includes(categoryName)
        );
        setAmenities(filteredAmenities);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching amenities:", error);
        setLoading(false);
      });
  }, [categoryName]); // Dependency array to re-fetch if categoryName changes

  const handleOptionSelect = (amenity) => {
    // Check if a client is already selected
    if (client) {
      // If a client is selected, navigate to a specific page, passing the selected client and amenity
      navigation.navigate("Enrollment Form", {
        selectedClient: client,
        selectedAmenity: amenity,
        option: option,
      });
    } else {
      // If no client is selected, follow the normal flow (e.g., show details or a confirmation step)
      navigation.navigate("Select Client With Location", {
        option,
        selectedAmenity: amenity,
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[globalstyles.container, { paddingHorizontal: 5 }]}
    >
      <View>
        {client && (
          <Text style={styles.caption}>
            Recommended services based on {client.fullName} profile:
          </Text>
        )}
        {amenities.map((amenity, index) => (
          <TouchableOpacity key={index} activeOpacity={0.8}>
            <Card>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color={"#094852"}
                />
              </View>
              <View>
                <Text style={styles.title}>{amenity.location}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <Octicons name="location" size={18} color={"#094852"} />
                  <Text style={styles.amenityText}>{amenity.address}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <Feather name="clock" size={16} color={"#094852"} />
                  <Text style={styles.amenityText}>
                    {amenity.operationalHours}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View
                  style={[
                    styles.enrollmentContainer,
                    amenity.availability === "0"
                      ? styles.waitlistContainer
                      : styles.enrollmentContainer,
                  ]}
                >
                  <Text
                    style={[
                      styles.cardAvailabilityText,
                      amenity.availability === "0"
                        ? styles.waitlistText
                        : styles.enrollmentText,
                    ]}
                  >
                    {amenity.availability === "0"
                      ? "Waitlist"
                      : "Enrollment Available"}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleOptionSelect(amenity)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name="app-registration"
                      size={16}
                      color={"#094852"}
                      style={{ paddingRight: 5 }}
                    />
                    <Text style={styles.referText}>Refer</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  caption: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#094852",
    marginHorizontal: 5,
    marginVertical: 10,
    letterSpacing: -0.7,
  },

  optionText: {
    fontFamily: "gabarito-regular",
    fontSize: 12,
    color: "#465355",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  title: {
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#094852",
  },

  amenityText: {
    fontFamily: "gabarito-regular",
    color: "#094852",
    fontSize: 18,
    paddingLeft: 10,
  },

  enrollmentContainer: {
    backgroundColor: "#E7F2F3",
    borderWidth: 1,
    borderColor: "#4094A2",
    padding: 8,
    borderRadius: 15,
  },

  waitlistContainer: {
    backgroundColor: "#FBEFDD",
    borderWidth: 1,
    borderColor: "#ECAD53",
    padding: 8,
    borderRadius: 15,
  },

  enrollmentText: {
    fontFamily: "karla-regular",
    fontSize: 14,
    color: "#094852",
  },

  waitlistText: {
    fontFamily: "karla-regular",
    fontSize: 14,
    color: "#533409",
  },

  referText: {
    fontFamily: "gabarito-regular",
    fontSize: 16,
    color: "#094852",
    alignItems: "center",
  },
});

export default SelectReferralLocation;

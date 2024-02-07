import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import globalstyles from "../../shared/globalStyles";

const SelectReferralLocation = ({ route }) => {
  const { option, categoryName } = route.params;
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/Amenities")
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={globalstyles.container}>
      <FlatList
        data={amenities}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.amenityItem}>
            <Text style={styles.amenityText}>
              {item.location} - {item.address}
            </Text>
            {/* Render more details about each amenity as needed */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  amenityItem: {
    marginTop: 10,
    padding: 10,
  },
  amenityText: {
    fontSize: 16,
  },
});

export default SelectReferralLocation;

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../shared/Card";
import Amenities from "../shared/Amenities";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handlePress = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Text>Search Bar</Text>
        <Text> Icon </Text>
      </View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {[
            "All",
            "Food",
            "Shelter",
            "Hygiene",
            "Health",
            "Work & Learn",
            "Finance",
            "Other",
          ].map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handlePress(category)}
              activeOpacity={1}
            >
              <View>
                <Text
                  style={[
                    styles.scrollerItems,
                    category === selectedCategory && styles.selectedCategory,
                  ]}
                >
                  {category}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sortByContainer}>
          <Text style={styles.sortBy}>Sort by</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text style={styles.sortByItems}>Distance</Text>
            <Text style={styles.sortByItems}>Type</Text>
            <Text style={styles.sortByItems}>Availability</Text>
          </ScrollView>
        </View>
        {Amenities.map((amenity) => (
          <Card key={amenity.key}>
            <Text style={styles.cardLocation}>{amenity.location}</Text>
            <Text style={styles.cardDetails}>
              {amenity.times}
              {"\n"}
              {amenity.distance}
              {"\n"}
              {amenity.address}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  scrollerItems: {
    textAlign: "center",
    fontSize: 30,
    padding: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCategory: {
    padding: 15,
    fontWeight: "600",
    color: "#ebae52",
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#ebae52",
  },
  sortByContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sortBy: {
    fontSize: 20,
  },
  sortByItems: {
    fontSize: 20,
    color: "blue",
    padding: 20,
  },
  cardLocation: {
    fontSize: 30,
  },
  cardDetails: {
    fontSize: 20,
  },
});

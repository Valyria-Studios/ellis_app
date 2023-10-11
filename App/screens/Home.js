import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../shared/Card";
import Amenities from "../shared/Amenities";
import Fontisto from "@expo/vector-icons/Fontisto";
import Icon from "@expo/vector-icons/Ionicons";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredAmenities, setFilteredAmenities] = useState(Amenities);

  const categories = [
    "food",
    "shelter",
    "hygiene",
    "health",
    "work & learn",
    "finance",
  ];

  const handlePress = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredAmenities(Amenities);
    } else if (category === "Other") {
      const filtered = Amenities.filter(
        (amenity) =>
          !amenity.type.some((typeValue) =>
            categories.includes(typeValue.toLowerCase())
          )
      );
      setFilteredAmenities(filtered);
    } else {
      const filtered = Amenities.filter((amenity) =>
        amenity.type.some(
          (typeValue) => typeValue.toLowerCase() === category.toLowerCase()
        )
      );
      setFilteredAmenities(filtered);
    }
  };

  const handleSearchChange = (text) => {
    setSearchInput(text);
    const filtered = Amenities.filter((amenity) =>
      amenity.location.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredAmenities(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Icon
            name="search-outline"
            size={25}
            color="#616a6c"
            style={styles.searchIcon}
          />
          <TextInput
            value={searchInput}
            onChangeText={handleSearchChange}
            placeholder="Type in keyword"
            style={styles.searchBar}
          />
        </View>
        <Fontisto
          name="nav-icon-grid-a"
          size={20}
          color="#094851"
          style={styles.gridIcon}
        />
      </View>
      <View style={styles.scrollerContainer}>
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
              <View
                style={[
                  styles.scrollerItemContainer,
                  category === selectedCategory &&
                    styles.selectedCategoryContainer,
                ]}
              >
                <Text
                  style={[
                    styles.scrollerItems,
                    category === selectedCategory &&
                      styles.selectedScrollerItem,
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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.sortByContainer}>
            <Text style={styles.sortBy}>Sort by</Text>
            {["Availability", "Distance", "Open Now", "Type"].map(
              (sortItem) => (
                <View style={styles.sortByItemContainer} key={sortItem}>
                  <Text style={styles.sortByItems}>{sortItem}</Text>
                </View>
              )
            )}
          </View>
        </ScrollView>
        <View>
          <Text style={styles.directory}>Directory</Text>
        </View>
        {filteredAmenities.map((amenity) => (
          <Card key={amenity.key}>
            <Text style={styles.cardLocation}>{amenity.location}</Text>
            <Text style={styles.cardDetails}>
              {amenity.times}
              {"\n"}
              {amenity.distance}
              {"\n"}
              {amenity.address}
            </Text>
            {amenity.type && Array.isArray(amenity.type)
              ? amenity.type.map((type, index) => (
                  <Text key={index} style={styles.cardType}>
                    {type}
                  </Text>
                ))
              : null}
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f8f9",
    padding: 15,
    paddingBottom: 0,
  },

  searchIcon: {
    paddingHorizontal: 10,
  },

  searchSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 50,
    padding: 5,
    alignItems: "center",
    flex: 1,
    height: 50,
    backgroundColor: "white",
  },

  searchBar: {
    flex: 1,
    fontSize: 18,
    color: "#999fa0",
  },

  gridIcon: {
    paddingLeft: 20,
  },

  scrollerContainer: {
    paddingVertical: 10,
  },

  scrollerItemContainer: {
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 25,
    marginTop: 5,
    marginHorizontal: 5, // Added this for spacing between items
  },

  selectedCategoryContainer: {
    borderColor: "#ebae52",
    backgroundColor: "#ffffff", // Adjust this to your desired background color
  },

  scrollerItems: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    padding: 10,
    color: "#094851",
  },

  selectedScrollerItem: {
    color: "#533509",
  },

  sortByContainer: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sortBy: {
    fontSize: 20,
    color: "#171b1c",
    fontWeight: "bold",
    paddingRight: 10,
  },

  sortByItemContainer: {
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#daddde",
    backgroundColor: "#ffffff",
  },

  sortByItems: {
    fontSize: 20,
    color: "#094851",
    padding: 10,
  },

  directory: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#094851",
  },

  cardLocation: {
    fontSize: 30,
  },

  cardDetails: {
    fontSize: 20,
  },
});

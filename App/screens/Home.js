import React, { useState, useEffect } from "react";
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
import Amenities from "../api/Amenities";
import SearchComponent from "../shared/SearchHeader";
import getAmenityImage from "../shared/getAmenityImage";
import { getSortedAmenities } from "../filtering/sortByFiltering";
import globalstyles from "../shared/globalStyles";

export default function App({ navigation }) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredAmenities, setFilteredAmenities] = useState(Amenities);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);

  useEffect(() => {
    if (sortCriteria) {
      const sorted = getSortedAmenities(filteredAmenities, sortCriteria);
      setFilteredAmenities(sorted);
    } else {
      setFilteredAmenities(filteredAmenities);
    }
  }, [sortCriteria]);

  const categories = [
    "food",
    "shelter",
    "hygiene",
    "health",
    "work & learn",
    "finance",
  ];

  const applyCategoryFilter = (category) => {
    if (category === "All") {
      return Amenities;
    } else if (category === "Other") {
      return Amenities.filter(
        (amenity) =>
          !amenity.type.some((typeValue) =>
            categories.includes(typeValue.toLowerCase())
          )
      );
    } else {
      return Amenities.filter((amenity) =>
        amenity.type.some(
          (typeValue) => typeValue.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  const handlePress = (category) => {
    if (category === selectedCategoryFilter) {
      // If the clicked category is the same as the currently selected category,
      // reset to the original list and clear the selected category.
      setFilteredAmenities(Amenities);
      setSelectedCategoryFilter(null);
    } else {
      // Apply the category filter and update the selected category.
      const filteredByCategory = applyCategoryFilter(category);
      setFilteredAmenities(filteredByCategory);
      setSelectedCategoryFilter(category);
    }
    if (sortCriteria) {
      setSortCriteria(null);
    }
  };

  const handleSearchChange = (text) => {
    setSearchInput(text);
    const filtered = Amenities.filter((amenity) =>
      amenity.location.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredAmenities(filtered);
  };

  const handleSortPress = (criterion) => {
    if (sortCriteria === criterion) {
      let resetList = Amenities;
      if (selectedCategoryFilter) {
        resetList = applyCategoryFilter(selectedCategoryFilter);
      }
      setFilteredAmenities(resetList);
      setSortCriteria(null);
    } else {
      setSortCriteria(criterion);
    }
  };

  return (
    <SafeAreaView style={globalstyles.container}>
      <SearchComponent
        searchInput={searchInput}
        setSearchInput={handleSearchChange}
      />
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
                  category === selectedCategoryFilter &&
                    styles.selectedCategoryContainer,
                ]}
              >
                <Text
                  style={[
                    styles.scrollerItems,
                    category === selectedCategoryFilter &&
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
                <TouchableOpacity
                  key={sortItem}
                  onPress={() => handleSortPress(sortItem)}
                  activeOpacity={1}
                >
                  <View
                    style={[
                      styles.sortByItemContainer,
                      sortItem === sortCriteria &&
                        styles.activeSortByItemContainer,
                    ]}
                    key={sortItem}
                  >
                    <Text
                      style={[
                        styles.sortByItems,
                        sortItem === sortCriteria && styles.activeSortByItems,
                      ]}
                    >
                      {sortItem}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            )}
          </View>
        </ScrollView>
        <View>
          <Text style={styles.directory}>Directory</Text>
        </View>
        {filteredAmenities.map((amenity) => (
          <TouchableOpacity
            key={amenity.key}
            onPress={() => navigation.navigate("Amenity Page", { amenity })}
          >
            <Card key={amenity.key} image={getAmenityImage(amenity.location)}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardLocation}>{amenity.location}</Text>
                <View
                  style={[
                    styles.cardAvailabilityContainer,
                    amenity.availability === "0"
                      ? styles.noAvailability
                      : styles.cardAvailabilityContainer,
                  ]}
                >
                  <Text style={styles.cardAvailabilityText}>
                    {amenity.availability === "0"
                      ? "Unavailable"
                      : `${amenity.availability} Available`}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardDetails}>
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
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: "gabarito-medium",
    padding: 10,
    color: "#094851",
  },

  selectedScrollerItem: {
    color: "#533509",
  },

  activeSortByItemContainer: {
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#c9cdcd",
    backgroundColor: "#c9cdcd",
  },

  activeSortByItems: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#094851",
    padding: 10,
  },

  sortByContainer: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sortBy: {
    fontFamily: "gabarito-semibold",
    fontSize: 20,
    color: "#171b1c",
    paddingRight: 10,
  },

  sortByItemContainer: {
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#c9cdcd",
    backgroundColor: "#ffffff",
  },

  sortByItems: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#094851",
    padding: 10,
  },

  directory: {
    fontFamily: "gabarito-bold",
    fontSize: 40,
    color: "#094851",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardAvailabilityContainer: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#10798a",
  },

  noAvailability: {
    color: "#e4eff1",
    backgroundColor: "grey",
  },

  cardAvailabilityText: {
    fontFamily: "karla-regular",
    fontSize: 14,
    color: "#e3eff1",
  },

  cardLocation: {
    fontFamily: "gabarito-regular",
    color: "#094851",
    fontSize: 20,
    paddingBottom: 10,
  },

  cardDetails: {
    fontFamily: "karla-regular",
    color: "#202425",
    fontSize: 14,
  },
});

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
import { filterOpenNowAmenities } from "../filtering/openNowFilter";
import {
  applyFiltersAndSort,
  applyCategoryFilter,
} from "../filtering/amenityFilter";

export default function App({ navigation }) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredAmenities, setFilteredAmenities] = useState(Amenities);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);

  useEffect(() => {
    const result = applyFiltersAndSort(
      Amenities,
      searchInput,
      selectedCategoryFilter,
      sortCriteria,
      applyCategoryFilter,
      filterOpenNowAmenities,
      getSortedAmenities
    );
    setFilteredAmenities(result);
  }, [searchInput, selectedCategoryFilter, sortCriteria]);

  const handlePress = (category) => {
    if (category === selectedCategoryFilter) {
      // If the clicked category is the same as the currently selected category,
      // clear the selected category.
      setSelectedCategoryFilter(null);
    } else {
      // Update the selected category.
      setSelectedCategoryFilter(category);
    }
    // No need to call applyFiltersAndSort here because useEffect will trigger it.
  };

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  const handleSortPress = (criterion) => {
    if (sortCriteria === criterion) {
      // If the clicked sort criterion is the same as the current one,
      // clear the sort criteria.
      setSortCriteria(null);
    } else {
      // Set the new sort criteria.
      setSortCriteria(criterion);
    }
    // No need to call applyFiltersAndSort here because useEffect will trigger it.
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
        {filteredAmenities.length > 0 ? (
          filteredAmenities.map((amenity) => (
            <TouchableOpacity
              key={amenity.key}
              onPress={() => navigation.navigate("Amenity Page", { amenity })}
              activeOpacity={1}
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
                          <Text style={globalstyles.individualTags}>
                            {type}
                          </Text>
                        </View>
                      ))
                    : null}
                </View>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noAmenitesContainer}>
            <Text style={styles.noAmenitiesText}>No Amenities Available</Text>
          </View>
        )}
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

  noAmenitesContainer: {
    marginVertical: 200,
    alignItems: "center",
    justifyContent: "center",
  },

  noAmenitiesText: {
    fontSize: 30,
    fontFamily: "gabarito-regular",
    color: "#094851",
  },
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../shared/Card";
// import Amenities from "../api/Amenities";
import SearchComponent from "../shared/SearchHeader";
import getAmenityImage from "../shared/getAmenityImage";
import { getSortedAmenities } from "../filtering/sortByFiltering";
import globalstyles from "../shared/globalStyles";
import { filterOpenNowAmenities } from "../filtering/openNowFilter";
import {
  applyFiltersAndSort,
  applyCategoryFilter,
} from "../filtering/amenityFilter";
import { useNavigation } from "@react-navigation/native";

export default function Directory() {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState("Me");
  const [searchInput, setSearchInput] = useState("");
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  const tabItems = ["Me", "Valyria Studios"];

  useEffect(() => {
    fetch("http://localhost:3000/Amenities")
      .then((response) => response.json())
      .then((data) => {
        const result = applyFiltersAndSort(
          data, // Use the fetched data here
          searchInput,
          selectedCategoryFilter,
          sortCriteria,
          applyCategoryFilter,
          filterOpenNowAmenities,
          getSortedAmenities
        );
        setFilteredAmenities(result); // Update the filtered amenities
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchInput, selectedCategoryFilter, sortCriteria]);

  const handlePress = (category) => {
    setSelectedCategoryFilter((prevCategory) =>
      prevCategory === category ? "All" : category
    );
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

  const categories = [
    "All",
    "Favorite",
    "Community",
    "Food",
    "Shelter",
    "Hygiene",
    "Health",
    "Work & Learn",
    "Finance",
    "Other",
  ];

  return (
    <SafeAreaView style={globalstyles.container}>
      <ScrollView>
        <SearchComponent
          searchInput={searchInput}
          setSearchInput={handleSearchChange}
        />
        <View>
          <Text style={globalstyles.title}>Dashboard</Text>
        </View>
        <View style={styles.tabContainer}>
          {tabItems.map((sortItem) => (
            <TouchableOpacity
              key={sortItem}
              activeOpacity={1}
              onPress={() => setSelectedItem(sortItem)}
            >
              <View
                style={[
                  selectedItem === sortItem
                    ? styles.selectedItemContainer
                    : styles.serviceItemContainer,
                  { marginRight: 10 },
                ]}
              >
                <Text
                  style={
                    selectedItem === sortItem
                      ? styles.selectedServiceHeaderItems
                      : styles.serviceHeaderItems
                  }
                >
                  {sortItem}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Text style={styles.sectionHeader}>My Engagement</Text>
          <Text> Scrollable Content Card Options</Text>
        </View>
        <View>
          <Text>My Upcoming Activities</Text>
          <Text> Scrollable Content Card Options</Text>
        </View>
        <View>
          <Text>Recent Referrals</Text>
          <Text> Scrollable Content Card Options</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
  },

  tab: {
    padding: 10,
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#10798B",
  },

  serviceItemContainer: {
    marginVertical: 10,
  },

  selectedItemContainer: {
    borderBottomWidth: 2,
    borderColor: "#10798B",
    marginVertical: 10,
  },

  selectedServiceHeaderItems: {
    fontSize: 24,
    color: "#10798B",
    fontFamily: "gabarito-semibold",
  },

  serviceHeaderItems: {
    fontSize: 24,
    color: "#465355",
    fontFamily: "gabarito-semibold",
  },

  
});

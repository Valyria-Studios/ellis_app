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
import SearchComponent from "../shared/SearchHeader";
import { getSortedAmenities } from "../filtering/sortByFiltering";
import globalstyles from "../shared/globalStyles";
import { filterOpenNowAmenities } from "../filtering/openNowFilter";
import {
  applyFiltersAndSort,
  applyCategoryFilter,
} from "../filtering/amenityFilter";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

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
                  { marginRight: 15 },
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
        <View style={styles.sectionHeaderContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialIcons
              name="drag-indicator"
              size={14}
              color={"#909899"}
              style={{ marginRight: 2 }}
            />
            <Text style={styles.sectionHeader}>My Engagement</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.cards}>
              <Text>8 clients</Text>
              <Text>This Year</Text>
            </View>
            <View style={styles.cards}>
              <Text>3 Services</Text>
              <Text>This Month</Text>
            </View>
            <View style={styles.cards}>
              <Text>21 hours</Text>
              <Text>This Week</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionHeaderContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialIcons
              name="drag-indicator"
              size={14}
              color={"#909899"}
              style={{ marginRight: 2 }}
            />
            <Text style={styles.sectionHeader}>My Upcoming Activities</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.cards}>
                <View>
                  <Text>Transitional Housing DAO meeting</Text>
                </View>
                <View>
                  <Text>Location</Text>
                  <Text>Time</Text>
                </View>
              </View>
              <View style={styles.cards}>
                <View>
                  <Text>March Street Outreach in Tenderloin</Text>
                </View>
                <View>
                  <Text>Location</Text>
                  <Text>Time</Text>
                </View>
              </View>
              <View style={styles.cards}>
                <View>
                  <Text>Community Volunteers</Text>
                </View>
                <View>
                  <Text>Location</Text>
                  <Text>Time</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.sectionHeaderContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialIcons
              name="drag-indicator"
              size={14}
              color={"#909899"}
              style={{ marginRight: 2 }}
            />
            <Text style={styles.sectionHeader}>Recent Referrals</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.cards}>
                <View style={{ flexDirection: "row" }}>
                  <Text>Profile Picture</Text>
                  <Text>Client Name</Text>
                </View>
                <View>
                  <Text>Service</Text>
                  <Text>Time</Text>
                  <Text>Status</Text>
                </View>
              </View>
              <View style={styles.cards}>
                <View style={{ flexDirection: "row" }}>
                  <Text>Profile Picture</Text>
                  <Text>Client Name</Text>
                </View>
                <View>
                  <Text>Service</Text>
                  <Text>Time</Text>
                  <Text>Status</Text>
                </View>
              </View>
              <View style={styles.cards}>
                <View style={{ flexDirection: "row" }}>
                  <Text>Profile Picture</Text>
                  <Text>Client Name</Text>
                </View>
                <View>
                  <Text>Service</Text>
                  <Text>Time</Text>
                  <Text>Status</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2,
    marginVertical: 20,
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

  sectionHeader: {
    fontFamily: "gabarito-regular",
    fontSize: 12,
    color: "#465355",
    textTransform: "uppercase",
    letterSpacing: 2,
  },

  sectionHeaderContainer: {
    marginBottom: 15,
  },

  cards: {
    backgroundColor: "#ffffff",
    width: 160,
    padding: 10,
    flex: 1,
    margin: 2,
    borderRadius: 10,
    justifyContent: "space-between",
    height: 190,
  },
});

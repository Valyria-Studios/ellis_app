// Logic for each card, getting the activities to show up, getting referrals, getting engagements.

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchComponent from "../../shared/SearchHeader";
import { getSortedAmenities } from "../../filtering/sortByFiltering";
import globalstyles from "../../shared/globalStyles";
import { filterOpenNowAmenities } from "../../filtering/openNowFilter";
import {
  applyFiltersAndSort,
  applyCategoryFilter,
} from "../../filtering/amenityFilter";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Octicons } from "@expo/vector-icons";

export default function Directory() {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState("Me");
  const [searchInput, setSearchInput] = useState("");
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [clientCount, setClientCount] = useState(0);

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

  useEffect(() => {
    fetch("http://localhost:3000/Clients")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const firstClient = data[0];
          if (firstClient.engagements && firstClient.engagements.clients) {
            setClientCount(firstClient.engagements.clients.length);
          } else {
            setClientCount(0);
          }
        } else {
          setClientCount(0);
        }
      })
      .catch((error) => console.error("Error fetching client data:", error));
  }, []);

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
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity
              style={styles.cards}
              onPress={() => {
                navigation.navigate("My Clients");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Text style={styles.number}>{clientCount}</Text>
                <Text style={styles.numberText}>clients</Text>
              </View>
              <Text style={styles.cardSubText}>This Year</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cards}
              onPress={() => {
                navigation.navigate("My Services");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Text style={styles.number}>3</Text>
                <Text style={styles.numberText}>services</Text>
              </View>
              <Text style={styles.cardSubText}>This Month</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cards}
              onPress={() => {
                navigation.navigate("My Hours");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Text style={styles.number}>21</Text>
                <Text style={styles.numberText}>hours</Text>
              </View>
              <Text style={styles.cardSubText}>This Week</Text>
            </TouchableOpacity>
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
                  <Text style={styles.activityText}>
                    Transitional Housing DAO meeting
                  </Text>
                </View>
                <View>
                  <View style={styles.subTextContainer}>
                    <Octicons name="location" size={12} style={styles.icon} />
                    <Text style={styles.cardSubText}>Location</Text>
                  </View>
                  <View>
                    <View style={styles.subTextContainer}>
                      <MaterialIcons
                        name="access-time"
                        size={12}
                        style={styles.icon}
                      />
                      <Text style={styles.cardSubText}>Time</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.cards}>
                <View>
                  <Text style={styles.activityText}>
                    March Street Outreach in Tenderloin
                  </Text>
                </View>
                <View>
                  <View style={styles.subTextContainer}>
                    <Octicons name="location" size={12} style={styles.icon} />
                    <Text style={styles.cardSubText}>Location</Text>
                  </View>
                  <View>
                    <View style={styles.subTextContainer}>
                      <MaterialIcons
                        name="access-time"
                        size={12}
                        style={styles.icon}
                      />
                      <Text style={styles.cardSubText}>Time</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.cards}>
                <View>
                  <Text style={styles.activityText}>Community Volunteers</Text>
                </View>
                <View>
                  <View style={styles.subTextContainer}>
                    <Octicons name="location" size={12} style={styles.icon} />
                    <Text style={styles.cardSubText}>Location</Text>
                  </View>
                  <View>
                    <View style={styles.subTextContainer}>
                      <MaterialIcons
                        name="access-time"
                        size={12}
                        style={styles.icon}
                      />
                      <Text style={styles.cardSubText}>Time</Text>
                    </View>
                  </View>
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
            <View style={{ flexDirection: "row", paddingBottom: 50 }}>
              <View style={styles.cards}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/userImage1.jpg")}
                    style={styles.profileImage}
                  />
                  <Text style={styles.name}>Chris A.</Text>
                </View>
                <View style={styles.subContainer}>
                  <Text style={[styles.cardSubText, { fontSize: 16 }]}>
                    Shelter
                  </Text>
                  <View style={styles.subTextContainer}>
                    <MaterialIcons
                      name="access-time"
                      size={12}
                      style={styles.icon}
                    />
                    <Text style={styles.cardSubText}>Today, 6pm</Text>
                  </View>
                  <View style={styles.status}>
                    <Text style={styles.statusText}>Pending</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cards}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/userImage2.jpg")}
                    style={styles.profileImage}
                  />
                  <Text style={styles.name}>Rob B.</Text>
                </View>
                <View style={styles.subContainer}>
                  <Text style={[styles.cardSubText, { fontSize: 16 }]}>
                    Coding Class
                  </Text>
                  <View style={styles.subTextContainer}>
                    <MaterialIcons
                      name="access-time"
                      size={12}
                      style={styles.icon}
                    />
                    <Text style={styles.cardSubText}>Today, 12pm</Text>
                  </View>
                  <View style={styles.status}>
                    <Text style={styles.statusText}>Pending</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cards}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/userImage3.jpg")}
                    style={styles.profileImage}
                  />
                  <Text style={styles.name}>Julia C.</Text>
                </View>
                <View style={styles.subContainer}>
                  <Text style={[styles.cardSubText, { fontSize: 16 }]}>
                    Eviction Defense
                  </Text>
                  <View style={styles.subTextContainer}>
                    <MaterialIcons
                      name="access-time"
                      size={12}
                      style={styles.icon}
                    />
                    <Text style={styles.cardSubText}>Yesterday</Text>
                  </View>
                  <View style={styles.status}>
                    <Text style={styles.statusText}>Complete</Text>
                  </View>
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
    width: 180,
    padding: 20,
    flex: 1,
    margin: 2,
    borderRadius: 10,
    justifyContent: "space-between",
    height: 190,
  },

  number: {
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#094852",
  },

  numberText: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#094852",
    marginLeft: 5,
  },

  cardSubText: {
    fontFamily: "karla-regular",
    fontSize: 14,
    color: "#465355",
  },

  activityText: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#094852",
  },

  subTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    color: "#094852",
    paddingRight: 5,
  },

  status: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: "#E7F2F3",
    alignSelf: "baseline",
    borderColor: "#B5BABB",
  },

  statusText: {
    color: "#094852",
    fontFamily: "karla-regular",
    fontSize: 12,
  },

  subContainer: {
    flex: 0.6,
    justifyContent: "space-between",
  },

  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 50,
    marginRight: 5,
  },

  name: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#053E5A",
  },
});

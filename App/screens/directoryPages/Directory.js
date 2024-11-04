// Logic for each card, getting the activities to show up, getting referrals, getting engagements.
// LOGIC FOR WHICH ACCOUNT LOGGED IN

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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import imageMap from "../../shared/getProfileImage";
import { format, isToday, isYesterday } from "date-fns";

export default function Directory() {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState("Me");
  const [searchInput, setSearchInput] = useState("");
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [clientCount, setClientCount] = useState(0);
  const [recentReferrals, setRecentReferrals] = useState([]);
  const isFocused = useIsFocused();

  const tabItems = ["Me", "Valyria Studios"];

  const getProfileImageFromId = (adminId) => {
    // Assuming that the admin's image can be derived from their ID or mapped
    const imageKey = `userImage${adminId}`; // Example: admin with id "2" corresponds to "userImage2"
    return imageMap[imageKey] || imageMap["defaultImage"]; // Fallback to a default image if not found
  };

  const formatReferralDate = (dateString) => {
    const date = new Date(dateString);

    if (isToday(date)) {
      return `Today, ${format(date, " h:mm a")}`;
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, " h:mm a")}`;
    } else {
      return format(date, "MM/dd, h:mm a");
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetch("https://ellis-test-data.com:8000/Clients")
        .then((response) => response.json())
        .then(async (data) => {
          if (data && data.length > 0) {
            const firstClient = data[0];

            // Set client count based on engagements
            if (firstClient.engagements && firstClient.engagements.clients) {
              setClientCount(firstClient.engagements.clients.length);
            } else {
              setClientCount(0);
            }

            // Extract referrals
            if (firstClient.referrals && firstClient.referrals.length > 0) {
              const referrals = await Promise.all(
                firstClient.referrals.map(async (referral) => {
                  const clientResponse = await fetch(
                    `https://ellis-test-data.com:8000/Clients/${referral.clientId}`
                  );
                  const clientData = await clientResponse.json();

                  // Construct name with first name and first initial of last name
                  const clientName = `${
                    clientData.firstName
                  } ${clientData.lastName.charAt(0)}.`;

                  // Format the referral date
                  const formattedDate = formatReferralDate(
                    referral.dateStarted
                  );

                  return {
                    ...referral,
                    clientName,
                    image: clientData.image,
                    service: referral.option,
                    time: formattedDate, // Use the formatted date
                    status: referral.referralType,
                  };
                })
              );
              setRecentReferrals(referrals);
            } else {
              setRecentReferrals([]);
            }
          }
        })
        .catch((error) => console.error("Error fetching client data:", error));
    }
  }, [isFocused]);

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  return (
    <SafeAreaView style={globalstyles.container}>
      <View style={{ zIndex: 10 }}>
        <SearchComponent
          searchInput={searchInput}
          setSearchInput={handleSearchChange}
          showProfileImage={true}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              <View style={styles.cardSpace}>
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
              <View style={styles.cardSpace}>
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
              <View style={styles.cardSpace}>
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
              {recentReferrals.map((referral, index) => (
                <View key={index} style={styles.cards}>
                  <View style={styles.nameContainer}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={getProfileImageFromId(referral.clientId)}
                        style={styles.profileImage}
                      />
                      <Text style={styles.name}>{referral.clientName}</Text>
                    </View>
                  </View>
                  <View style={styles.subContainer}>
                    <Text style={[styles.cardSubText, styles.serviceOption]}>
                      {referral.service}
                    </Text>
                    <View
                      style={[styles.subTextContainer, styles.timeContainer]}
                    >
                      <MaterialIcons
                        name="access-time"
                        size={12}
                        style={styles.icon}
                      />
                      <Text style={styles.cardSubText}>{referral.time}</Text>
                    </View>
                    <View style={[styles.status, styles.statusContainer]}>
                      <Text style={styles.statusText}>{referral.status}</Text>
                    </View>
                  </View>
                </View>
              ))}
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
    padding: 20,
    margin: 2,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start", // Ensure items align to the start for better wrapping
  },

  cardSpace: {
    flexDirection: "row",
    alignItems: "baseline",
    paddingBottom: 70,
    width: 90,
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

  nameContainer: {
    marginBottom: 50, // Add space below the name section
  },

  activityText: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#094852",
  },

  subTextContainer: {
    flexDirection: "row",
    alignItems: "center", // Vertically center the items
    flexWrap: "nowrap", // Prevent wrapping
  },

  icon: {
    color: "#094852",
    marginRight: 5,
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

  serviceOption: {
    marginBottom: 5, // Add space below the service option text
  },

  timeContainer: {
    marginBottom: 5, // Add space below the time section
  },

  statusContainer: {
    marginTop: 5, // Ensure the status section has some space above
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

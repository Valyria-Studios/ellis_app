//Need all Options for Service Categories
// Replace asyncStorage with cloud storage

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import globalstyles from "../../shared/globalStyles";
import renderIcon from "../../shared/RenderIconFunction";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const ServiceDirectory = ({ route, navigation }) => {
  const client = route.params?.client;
  const [frequentServices, setFrequentServices] = useState([]);
  const isFocused = useIsFocused();

  const loadFrequentServices = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);
      let freqs = stores.map(([key, value]) => {
        const [categoryName, optionName, categoryIcon, catergoryLibrary] =
          key.split(":");
        return {
          option: optionName,
          categoryName: categoryName,
          icon: categoryIcon,
          catergoryLibrary: catergoryLibrary,
          count: JSON.parse(value),
        };
      });
      freqs.sort((a, b) => b.count - a.count);
      setFrequentServices(freqs.slice(0, 5));
    } catch (error) {
      console.error("Failed to load frequencies", error);
    }
  };

  // console.log("frequentServices", frequentServices)

  useEffect(() => {
    if (isFocused) {
      loadFrequentServices();
    }
  }, [isFocused]);

  //Need all Options for Service Categories
  const serviceCategories = [
    {
      name: "Food",
      icon: "clinic-medical",
      library: "FontAwesome5",
      options: [
        "Emergency Food",
        "Food Benefits",
        "Food Delivery",
        "Food Pantry",
        "Meals",
      ],
    },
    {
      name: "Health",
      icon: "brain",
      library: "FontAwesome5",
      options: [
        "Urgent Care",
        "Mental Health Urgent Care",
        "Mental Health Services",
        "Women's Health",
      ],
    },
    {
      name: "Housing",
      icon: "home",
      library: "Ionicons",
      options: ["Temporary Housing", "Permanent Supportive Housing"],
    },
    {
      name: "Hygiene",
      icon: "brain",
      library: "FontAwesome5",
      options: [],
    },
    {
      name: "Learn",
      icon: "briefcase",
      library: "Feather",
      options: [],
    },
    {
      name: "Legal",
      icon: "briefcase",
      library: "Feather",
      options: ["Civil Litigation", "Criminal Defense", "Eviction Prevention"],
    },
    {
      name: "Money",
      icon: "briefcase",
      library: "Feather",
      options: [],
    },
  ];

  return (
    <ScrollView
      style={[globalstyles.container, { paddingHorizontal: 5 }]}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View style={[globalstyles.searchSection, { marginVertical: 15 }]}>
          <View style={globalstyles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#616a6c"
              style={globalstyles.searchIcon}
            />
            <TextInput
              blurOnSubmit={true}
              style={[globalstyles.searchBar, { fontSize: 16 }]}
              // value={''}
              // onChangeText={''}
              placeholder="Search for service"
            />
          </View>
        </View>
        <View>
          <Text style={[styles.subHeader, { marginTop: 0 }]}>
            Frequently Used
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {frequentServices.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("Referral Location", {
                    option: item.option,
                    categoryName: item.categoryName,
                    client: client, // Ensure you have the client data needed, if not, it may need to be handled appropriately
                  })
                }
                style={styles.frequentContainer}
              >
                <View>
                  <Text style={styles.frequentHeader}>{item.categoryName}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  {renderIcon(
                    item.icon,
                    item.catergoryLibrary,
                    styles.frequentIcon,
                    26
                  )}
                  <Text style={styles.frequentOption}>{item.option}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Text style={styles.subHeader}>Services</Text>
        {serviceCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("Service Details", { category, client })
            }
          >
            <View key={index} style={styles.container}>
              <View
                style={[
                  globalstyles.optionsContainer,
                  { justifyContent: "space-between" },
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  {renderIcon(category.icon, category.library, styles.icon, 20)}
                  <Text style={globalstyles.optionsText}>{category.name}</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={28}
                  style={{ color: "#094852" }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    fontSize: 24,
    fontFamily: "gabarito-bold",
    marginTop: 10,
    color: "#094851",
  },

  container: {
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderColor: "#B5BABB"
  },

  icon: {
    color: "#094852",
    paddingLeft: 10,
  },

  frequentHeader: {
    fontFamily: "gabarito-regular",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#465355",
    textAlign: "left",
  },

  frequentIcon: {
    color: "#094852",
  },

  frequentContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    width: 125,
    height: 175,
    backgroundColor: '#FFFFFF',
    borderColor: '#B5BABB',
  },

  frequentOption: {
    color: "#171B1C",
    fontSize: 18,
    flexWrap: "wrap",
    flexShrink: 1,
    textAlign: "center",
    fontFamily: "gabarito-semibold",
  },
});

export default ServiceDirectory;

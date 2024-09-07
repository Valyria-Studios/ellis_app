import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import globalstyles from "../../shared/globalStyles";
import renderIcon from "../../shared/RenderIconFunction";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const ServiceDirectory = ({ route, navigation }) => {
  const client = route.params?.client;
  const [frequentServices, setFrequentServices] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [nonProfits, setNonProfits] = useState([]); // Store NonProfits data
  const [loading, setLoading] = useState(true); // Track loading state
  const isFocused = useIsFocused();

  const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hour
  const CACHE_KEY_SERVICES = "cache_services";
  const CACHE_KEY_NONPROFITS = "cache_nonprofits"; // Add cache key for NonProfits

  const fetchWithCache = async (cacheKey, url) => {
    try {
      const cachedItem = await AsyncStorage.getItem(cacheKey);
      if (cachedItem) {
        const { data, timestamp } = JSON.parse(cachedItem);
        if (Date.now() - timestamp < CACHE_EXPIRATION) {
          return data;
        }
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({ data, timestamp: Date.now() })
      );
      return data;
    } catch (error) {
      console.error("Error fetching data with cache:", error);
      throw error;
    }
  };

  const loadFrequentServices = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);

      let freqs = stores
        .map(([key, value]) => {
          // Filter out cache keys and improperly formatted keys
          if (key.startsWith("cache_")) return null;

          const [
            categoryName,
            optionName,
            categoryIcon,
            categoryLibrary,
            serviceId,
          ] = key.split(":"); // Add serviceId to the key parsing

          // Skip keys with missing or undefined values
          if (
            !categoryName ||
            !optionName ||
            categoryName === "undefined" ||
            optionName === "undefined"
          )
            return null;

          return {
            option: optionName,
            categoryName: categoryName,
            icon: categoryIcon || "default-icon", // Provide a default icon if missing
            categoryLibrary: categoryLibrary || "Ionicons", // Provide a default library if missing
            count: JSON.parse(value),
            serviceId: serviceId || null, // Include serviceId to differentiate main and sub-services
          };
        })
        .filter(Boolean); // Remove null values

      freqs.sort((a, b) => b.count - a.count);
      setFrequentServices(freqs.slice(0, 5));
    } catch (error) {
      console.error("Failed to load frequencies", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadFrequentServices();
    }
  }, [isFocused]);

  useEffect(() => {
    const loadServiceAndNonProfitsData = async () => {
      try {
        setLoading(true);
        // Fetch services
        const servicesData = await fetchWithCache(
          CACHE_KEY_SERVICES,
          "http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Services"
        );

        // Fetch NonProfits
        const nonProfitsData = await fetchWithCache(
          CACHE_KEY_NONPROFITS,
          "http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/NonProfits"
        );

        // Transform services data to match the required structure
        const transformedCategories = servicesData.map((service) => ({
          id: service.id,
          name: service.name,
          Subservices: service.Subservices.map((subservice) => ({
            id: subservice.id,
            name: subservice.name,
            valueId: subservice.valueId,
            spaceId: subservice.spaceId,
          })),
        }));

        setServiceCategories(transformedCategories);
        setNonProfits(nonProfitsData); // Store NonProfits data
      } catch (error) {
        console.error("Failed to load service categories or NonProfits", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    loadServiceAndNonProfitsData();
  }, []);

  const handleServicePress = (category) => {
    const filteredNonProfits = nonProfits.filter((nonProfit) =>
      nonProfit.providedServicesValueIds.some((valueId) =>
        category.Subservices.some(
          (subservice) => subservice.valueId === valueId
        )
      )
    );

    navigation.navigate("Service Details", {
      category,
      client,
      filteredNonProfits, // Pass filtered NonProfits to the next page
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView
      style={[globalstyles.container, { paddingHorizontal: 5, marginHorizontal: 10 }]}
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
              placeholder="Search for service"
            />
          </View>
        </View>
        <View>
          <Text style={[styles.subHeader, { marginTop: 0 }]}>
            Recently Viewed
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {frequentServices.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("Referral Location", {
                    option: item.option,
                    categoryName: item.categoryName,
                    client: client,
                    providedServicesId: item.serviceId, // Pass the stored serviceId for navigation
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
            onPress={() => handleServicePress(category)}
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
      <View style={{ marginVertical: 20 }}></View>
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
    borderColor: "#B5BABB",
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
    backgroundColor: "#FFFFFF",
    borderColor: "#B5BABB",
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

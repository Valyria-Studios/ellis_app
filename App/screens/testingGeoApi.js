import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY_NONPROFITS = "cache_nonprofits";
const CACHE_KEY_SERVICES = "cache_services";
const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hour

const EntitiesScreen = () => {
  const [entities, setEntities] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nonprofitsData = await fetchWithCache(
          CACHE_KEY_NONPROFITS,
          "https://ellis-test-data.com:8000/NonProfits"
        );
        const servicesData = await fetchWithCache(
          CACHE_KEY_SERVICES,
          "https://ellis-test-data.com:8000/Services"
        );

        setEntities(nonprofitsData);
        setServices(servicesData);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const compareServices = (providedServicesValueIds, service) => {
    return (
      providedServicesValueIds.includes(service.id) ||
      providedServicesValueIds.some((serviceId) =>
        service.Subservices.some(
          (subservice) => subservice.valueId === serviceId
        )
      )
    );
  };

  const sections = services.map((service) => {
    const matchingEntities = entities.filter((entity) =>
      compareServices(entity.providedServicesValueIds, service)
    );

    return {
      title: service.name,
      data: matchingEntities,
    };
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ marginTop: 100 }}>
      <SectionList
        sections={sections}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#f4f4f4",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default EntitiesScreen;

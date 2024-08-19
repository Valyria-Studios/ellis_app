import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
} from "react-native";

const EntitiesScreen = () => {
  const [entities, setEntities] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch NonProfits data
    const fetchNonProfits = fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/NonProfits")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      });

    // Fetch Services data
    const fetchServices = fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Services")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      });

    Promise.all([fetchNonProfits, fetchServices])
      .then(([nonProfitsData, servicesData]) => {
        setEntities(nonProfitsData);
        setServices(servicesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const compareServices = (providedServicesValueIds, service) => {
    // Check if any of the providedServicesValueIds match the service id or any of its subservices
    return (
      providedServicesValueIds.includes(service.id) ||
      providedServicesValueIds.some((serviceId) =>
        service.Subservices.some((subservice) => subservice.valueId === serviceId)
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

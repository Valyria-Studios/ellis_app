import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
} from "react-native";
import { fetchCommunityResourcesEntityIds } from "../data/serviceIdQueries/communityResources";
import { fetchFoodAssistanceEntityIds } from "../data/serviceIdQueries/foodAssistance";

const EntitiesScreen = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [communityResources, setCommunityResources] = useState([]);
  const [foodAssistance, setFoodAssistance] = useState([]);


  // First useEffect for the existing REST API call
  useEffect(() => {
    fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/NonProfits")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((result) => {
        setEntities(result); // Assuming result is the array of entities
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Community Resources
        const communityResourceEntityIds =
          await fetchCommunityResourcesEntityIds();
        const matchingCommunityEntities = entities.filter((entity) =>
          communityResourceEntityIds.includes(entity.id)
        );

        // Fetch Food Assistance
        const foodAssistanceEntityIds = await fetchFoodAssistanceEntityIds();
        const matchingFoodEntities = entities.filter((entity) =>
          foodAssistanceEntityIds.includes(entity.id)
        );

        // Update state
        setCommunityResources(matchingCommunityEntities);
        setFoodAssistance(matchingFoodEntities);
      } catch (error) {
        console.error("Error fetching entity IDs:", error);
      }
    };

    if (entities.length > 0) {
      fetchData();
    }
  }, [entities]);

  const sections = [
    { title: "Community Resources", data: communityResources },
    { title: "Food Assistance", data: foodAssistance },
    { title: "NonProfits", data: entities },
  ];

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

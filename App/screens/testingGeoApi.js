import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

const EntitiesScreen = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setEntities(result.slice(12,13)); // Assuming result is the array of entities
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

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
      <FlatList
        data={entities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            {item.triplesByEntityId?.nodes?.map((triple) => (
              <View key={triple.id} style={styles.triple}>
                <Text>
                  {triple.attribute.name}: {triple.stringValue}
                </Text>
                {triple.valueType === "image" && triple.stringValue && (
                  <Image
                    source={{
                      uri: triple.stringValue.replace(
                        "ipfs://",
                        "https://ipfs.io/ipfs/"
                      ),
                    }}
                    style={styles.image}
                  />
                )}
              </View>
            ))}
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
  triple: {
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default EntitiesScreen;

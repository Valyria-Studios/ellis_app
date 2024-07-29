// EntitiesScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { GET_ENTITIES_QUERY } from "../queries/getNonProfit";

const EntitiesScreen = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://geo-protocol.up.railway.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_ENTITIES_QUERY,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((result) => {
        if (result.errors) {
          setError(result.errors[0]);
        } else {
          setEntities(result.data.geoEntities.nodes);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  console.log(entities[0])
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
    <FlatList
      data={entities}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          {item.triplesByEntityId.nodes.map((triple) => (
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

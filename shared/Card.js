import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

export default function Card(props) {
  return (
    <ImageBackground source={props.image} style={styles.card}>
      <View style={styles.overlay} />
      <View style={styles.cardContent}>{props.children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    overflow: "hidden",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
  },

  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
});

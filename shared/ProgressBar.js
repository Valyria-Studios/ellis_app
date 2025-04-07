import React from "react";
import { View, StyleSheet } from "react-native";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    marginBottom: 20,
    height: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#10798B",
    backgroundColor: "#F3F8F9",
    borderRadius: 10,
  },
  progressBar: {
    height: "100%",
    width: "100%",
    backgroundColor: "#10798B",
    borderRadius: 10,
  },
});

export default ProgressBar;

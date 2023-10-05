import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function App() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdownItemPress = (item) => {
    console.log(`Item ${item} pressed.`);
  };

  const handleTextPress = (index) => {
    console.log(`Text ${index} pressed.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setDropdownVisible(!isDropdownVisible)}
          style={styles.dropdownButton}
        >
          <Text style={styles.text}>Applications</Text>
          <Icon
            name={isDropdownVisible ? "angle-down" : "angle-right"}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdownContainer}>
            {[
              "Food Benefits",
              "Health Insurance",
              "Cash Assistance",
              "Affordable Housing",
              "Job Placement",
              "Continuing Education",
              "Disability Assistance",
            ].map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.6}
                key={index}
                onPress={() => handleDropdownItemPress(item)}
              >
                <Text style={styles.dropdownItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {["Legal Documents", "Case Management", "Other"].map((text, index) => (
          <TouchableOpacity
            activeOpacity={0.6}
            key={index}
            onPress={() => handleTextPress(index + 1)}
            style={styles.textButton}
          >
            <Text style={styles.text}>{text}</Text>
            <Icon name="angle-right" size={30} style={styles.icon} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontWeight: "700",
    fontSize: 40,
    color: "#053e59",
    marginVertical: 10,
    marginRight: 15, // Adding spacing to the right of the text
  },
  icon: {
    color: "#053e59",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  textButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dropdownContainer: {
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  dropdownItem: {
    color: "#053e59",
    fontWeight: "600",
    fontSize: 25,
    padding: 10,
    paddingLeft: 40,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
});

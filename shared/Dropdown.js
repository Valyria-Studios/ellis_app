import React, { useEffect, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export function Dropdown({ title, status, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const fadeAnim = new Animated.Value(1); // Initial opacity for the first icon

  useEffect(() => {
    // Animate icon opacity
    Animated.timing(fadeAnim, {
      toValue: isOpen ? 0 : 1, // Animate to 0 for open (fade out), 1 for close (fade in)
      duration: 400, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [isOpen]);

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.dropDownContainer}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.3}
        style={styles.dropdownHeader}
      >
        <View>
          <Text style={styles.dropdownTitle}>{title}</Text>
          {status && (
            <Text style={styles.status}> Current Status: {status}</Text>
          )}
        </View>
        <View style={{ position: "relative" }}>
          <Animated.View style={{ position: "absolute", opacity: fadeAnim }}>
            <MaterialIcons name="keyboard-arrow-down" size={24} />
          </Animated.View>
          <Animated.View
            style={{
              position: "relative",
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          >
            <MaterialIcons name="horizontal-rule" size={24} />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.dropdownContent}>{children}</View>}
    </View>
  );
}

styles = StyleSheet.create({
  dropDownContainer: {
    marginHorizontal: 15,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },

  dropdownTitle: {
    fontSize: 18,
    fontFamily: "gabarito-regular",
    color: "#094852",
  },

  dropdownContent: {
    marginHorizontal: 20,
    marginBottom: 20,
  },

  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },

  status: {
    color: "#171B1C",
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
    paddingTop: 16,
  },
});

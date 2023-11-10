import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CustomCheckbox = ({ isChecked, onToggle }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isChecked ? 1 : 0, // Animate to opacity: 1, or 0 if not checked
      duration: 400, // Duration for the animation
      useNativeDriver: true, // Add this line
    }).start();
  }, [isChecked, fadeAnim]);

  return (
    <TouchableOpacity
      style={styles.checkbox}
      onPress={onToggle}
      activeOpacity={1}
    >
      <Animated.View style={[styles.checked, { opacity: fadeAnim }]} />
    </TouchableOpacity>
  );
};

const ChecklistItem = ({ title, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  return (
    <View style={styles.item}>
      <CustomCheckbox
        isChecked={isChecked}
        onToggle={() => setIsChecked(toggleCheckbox)}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    // additional styles
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#10798B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#10798B",
  },

  text: {
    fontFamily: "karla-regular",
    color: "#171B1C",
    fontSize: 16,
    letterSpacing: -0.16,
  },
});

export default ChecklistItem;

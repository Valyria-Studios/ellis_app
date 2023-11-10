import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomCheckbox = ({ isChecked, onToggle }) => {
  return (
    <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
      {isChecked && <View style={styles.checked} />}
    </TouchableOpacity>
  );
};

const ChecklistItem = ({ title }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.item}>
      <CustomCheckbox
        isChecked={isChecked}
        onToggle={() => setIsChecked(!isChecked)}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    // additional styles
  },
  checkbox: {
    width: 10,
    height: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "black",
  },

  text: {
    color: "red",
  },
});

export default ChecklistItem;

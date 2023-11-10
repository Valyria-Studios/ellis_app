import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomCheckbox = ({ isChecked, onToggle }) => {
  return (
    <TouchableOpacity style={styles.checkbox} onPress={onToggle} activeOpacity={1}>
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

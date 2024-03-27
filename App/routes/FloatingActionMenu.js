import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default FloatingActionMenu = (props) => {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState("Home");

  const menuItems = [
    { name: "Home", icon: "compass" },
    { name: "Relationships", icon: "person-circle-outline" },
    { name: "Messages", icon: "chatbox-outline" },
    { name: "Settings", icon: "settings-outline" },
  ];

  const handlePress = (itemName) => {
    setIsSelected(itemName);
    props.onItemSelect(itemName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Feather name="plus" size={24} color={"#094852"} />
      </TouchableOpacity>
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              item.name === isSelected && styles.selectedMenuItem,
            ]}
            onPress={() => handlePress(item.name)}
          >
            <Ionicons
              name={item.icon}
              size={24}
              style={[
                styles.icon,
                item.name === isSelected && { color: "#ffffff" },
              ]}
            />
            {isSelected === item.name && (
              <Text style={styles.menuItemText}>{item.name}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Request Services Page")}
        style={styles.buttonContainer}
        activeOpacity={1}
      >
        <MaterialCommunityIcons name="dots-grid" size={24} color={"#094852"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: "center",
  },

  menu: {
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#10798B",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // For Android elevation
  },

  menuItem: {
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedMenuItem: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#10798B",
    justifyContent: "center",
    alignItems: "center",
  },

  menuItemText: {
    color: "#FFFFFF",
    fontFamily: "gabarito-bold",
    fontSize: 18,
    marginHorizontal: 5,
  },

  icon: {
    color: "#094852",
  },

  buttonContainer: {
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#10798B",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // For Android elevation
  },
});

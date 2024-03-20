import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default FloatingActionMenu = (props) => {
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
      <View>
        <Text>button</Text>
      </View>
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              item.name === isSelected && styles.selectedMenuItem,
            ]}
            onPress={() => handlePress(item.name, item.icon)}
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
      <TouchableOpacity>
        <Text>other button</Text>
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
    backgroundColor: "#F3F8F9",
    borderColor: "#10798B",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  menuItem: {
    marginHorizontal: 5,
    marginVertical: 3,
    flexDirection: "row",
    alignItems: "center",
  },

  selectedMenuItem: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#10798B",
  },

  menuItemText: {
    color: "#FFFFFF",
    fontFamily: "gabarito-bold",
    fontSize: 18,
    marginLeft: 5,
  },

  icon: {
    color: "#094852",
  },

  fab: {
    backgroundColor: "#007AFF",
    borderRadius: 28,
    padding: 10,
    justifyContent: "baseline",
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
});

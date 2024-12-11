import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default FloatingActionMenu = (props) => {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState("Home");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const menuItems = [
    { name: "Home", icon: "compass" },
    { name: "Relationships", icon: "person-circle-outline" },
    { name: "Messages", icon: "chatbox-outline" },
    { name: "Settings", icon: "settings-outline" },
  ];

  const featherMenuItems = [
    { name: "Client", page: "Create New Client" },
    { name: "Service", page: "Add a Service" },
    { name: "Note", page: "Create a Note" },
  ];

  const handlePress = (itemName) => {
    setIsSelected(itemName);
    props.onItemSelect(itemName);
    setIsMenuVisible(false); // Close the menu
  };

  const toggleFeatherMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleNavigation = (itemName) => {
    navigation.navigate(itemName);
    setIsMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleFeatherMenu}
        style={styles.buttonContainer}
      >
        <Feather name="plus" size={24} color={"#094852"} />
      </TouchableOpacity>
      <Modal visible={isMenuVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsMenuVisible(false)}>
          <View style={styles.overlay}>
            <View style={styles.menuContainer}>
              <Text style={styles.modalHeader}>Add a new...</Text>
              {featherMenuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingHorizontal: 100,
                    paddingRight: 125,
                    paddingVertical: 10,
                  }}
                  onPress={() => handleNavigation(item.page)}
                >
                  <View style={styles.modalMenuItem}>
                    <Text style={styles.modalMenuText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },

  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    position: "absolute",
    bottom: 100,
  },

  modalMenuItem: {
    marginVertical: 5,
    marginLeft: -80,
  },

  modalHeader: {
    fontSize: 18,
    fontFamily: "gabarito-semibold",
    color: "#094852",
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
    minWidth: 20, // Set a minimum width to prevent shrinking
    flexShrink: 0, // Prevent shrinking
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

  modalMenuText: {
    color: "#030E07",
    fontFamily: "karla-regular",
    fontSize: 16,
  },

  icon: {
    color: "#094852",
    flexShrink: 0, // Prevent shrinking
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

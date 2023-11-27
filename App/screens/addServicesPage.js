import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";

const ServicesPage = () => {
  const [dropdownsOpen, setDropdownsOpen] = useState({
    firstDropdown: false,
    secondDropdown: false,
    // Add more dropdown states as needed
  });

  // Function to toggle a specific dropdown
  const toggleDropdown = (dropdownKey) => {
    setDropdownsOpen((prevState) => ({
      ...prevState,
      [dropdownKey]: !prevState[dropdownKey],
    }));
  };
  return (
    <SafeAreaView style={globalstyles.container}>
      <View style={{ margin: 40 }}></View>
      <View style={globalstyles.headerContainer}>
        <Text style={globalstyles.header}>Add your services</Text>
      </View>
      <Text style={globalstyles.subHeader}>What services do you provide?</Text>
      <View>
        <TouchableOpacity onPress={() => toggleDropdown('firstDropdown')}>
          <Text>Show Items</Text>
        </TouchableOpacity>
        {dropdownsOpen.firstDropdown && (
          <View>
            {/* List your items here */}
            <Text>Item 1</Text>
            <Text>Item 2</Text>
            <Text>Item 3</Text>
            {/* Add more items as needed */}
          </View>
        )}
        <TouchableOpacity onPress={() => toggleDropdown('secondDropdown')}>
          <Text>Show Items</Text>
        </TouchableOpacity>
        {dropdownsOpen.secondDropdown && (
          <View>
            {/* List your items here */}
            <Text>Item 1</Text>
            <Text>Item 2</Text>
            <Text>Item 3</Text>
            {/* Add more items as needed */}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ServicesPage;

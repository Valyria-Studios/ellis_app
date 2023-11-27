import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";
import Icon from "react-native-vector-icons/MaterialIcons";

const ServicesPage = () => {
  const [dropdowns, setDropdowns] = useState({
    dropdown1: false,
    dropdown2: false,
    dropdown3: false,
    dropdown4: false,
    dropdown5: false,
    dropdown6: false,
    dropdown7: false,
    dropdown8: false,
    // Add more dropdowns as needed
  });

  const toggleDropdown = (key) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  return (
    <SafeAreaView style={globalstyles.container}>
      <View style={{ margin: 40 }}></View>
      <View style={globalstyles.headerContainer}>
        <Text style={globalstyles.header}>Add your services</Text>
      </View>
      <Text style={globalstyles.subHeader}>What services do you provide?</Text>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => toggleDropdown("dropdown1")}
          style={styles.dropdownButton}
        >
          <Text style={styles.text}>Community</Text>
          <Icon
            name={
              dropdowns.dropdown1 ? "horizontal-rule" : "keyboard-arrow-right"
            }
            size={28}
            style={styles.icon}
          />
        </TouchableOpacity>
        {dropdowns.dropdown1 && (
          <View>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => toggleDropdown("dropdown2")}
          style={styles.dropdownButton}
        >
          <Text style={styles.text}>Finance</Text>
          <Icon
            name={
              dropdowns.dropdown2 ? "horizontal-rule" : "keyboard-arrow-right"
            }
            size={28}
            style={styles.icon}
          />
        </TouchableOpacity>
        {dropdowns.dropdown2 && (
          <View>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => toggleDropdown("dropdown3")}
          style={styles.dropdownButton}
        >
          <Text style={styles.text}>Food</Text>
          <Icon
            name={
              dropdowns.dropdown3 ? "horizontal-rule" : "keyboard-arrow-right"
            }
            size={28}
            style={styles.icon}
          />
        </TouchableOpacity>
        {dropdowns.dropdown3 && (
          <View>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => toggleDropdown("dropdown4")}
          style={styles.dropdownButton}
        >
          <Text style={styles.text}>Health</Text>
          <Icon
            name={
              dropdowns.dropdown4 ? "horizontal-rule" : "keyboard-arrow-right"
            }
            size={28}
            style={styles.icon}
          />
        </TouchableOpacity>
        {dropdowns.dropdown4 && (
          <View>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => toggleDropdown("dropdown5")}
          style={styles.dropdownButton}
        >
          <Text style={styles.text}>Hygiene</Text>
          <Icon
            name={
              dropdowns.dropdown5 ? "horizontal-rule" : "keyboard-arrow-right"
            }
            size={28}
            style={styles.icon}
          />
        </TouchableOpacity>
        {dropdowns.dropdown5 && (
          <View>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => toggleDropdown("dropdown6")}
          style={styles.dropdownButton}
        >
          <Text style={styles.text}>Shelter</Text>
          <Icon
            name={
              dropdowns.dropdown6 ? "horizontal-rule" : "keyboard-arrow-right"
            }
            size={28}
            style={styles.icon}
          />
        </TouchableOpacity>
        {dropdowns.dropdown6 && (
          <View>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => toggleDropdown("dropdown7")}
          style={styles.dropdownButton}
        >
          <Text style={styles.text}>Work & Learn</Text>
          <Icon
            name={
              dropdowns.dropdown7 ? "horizontal-rule" : "keyboard-arrow-right"
            }
            size={28}
            style={styles.icon}
          />
        </TouchableOpacity>
        {dropdowns.dropdown7 && (
          <View>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => toggleDropdown("dropdown8")}
          style={styles.dropdownButton}
        >
          <Text style={styles.text}>Other</Text>
          <Icon
            name={
              dropdowns.dropdown8 ? "horizontal-rule" : "keyboard-arrow-right"
            }
            size={28}
            style={styles.icon}
          />
        </TouchableOpacity>
        {dropdowns.dropdown8 && (
          <View>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: "gabarito-semibold",
    color: "#1A4674",
    marginVertical: 10,
  },
  icon: {
    color: "#1A4674",
    marginRight: 10,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
});

export default ServicesPage;

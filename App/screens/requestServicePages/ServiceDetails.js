// Need to replace AsyncStorage with cloud storage
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import renderIcon from "../../shared/RenderIconFunction";
import globalstyles from "../../shared/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServiceDetails = ({ route, navigation }) => {
  const { category, client } = route.params;

  const updateUsageFrequency = async (optionName, categoryName, categoryIcon, catergoryLibrary) => {
    const key = `${categoryName}:${optionName}:${categoryIcon}:${catergoryLibrary}`; // Create a unique key for each option within its category
    console.log("key", key)
    try {
      const currentCount = await AsyncStorage.getItem(key);
      const newCount = currentCount ? JSON.parse(currentCount) + 1 : 1;
      await AsyncStorage.setItem(key, JSON.stringify(newCount));
    } catch (error) {
      console.error("Failed to update frequency count", error);
    }
  };

  return (
    <View
      style={[globalstyles.container, { paddingTop: 15, paddingHorizontal: 5 }]}
    >
      {category.options &&
        category.options.map((option, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={styles.container}
            onPress={() => {
              updateUsageFrequency(option, category.name, category.icon, category.library);
              navigation.navigate("Referral Location", {
                option,
                categoryName: category.name,
                client,
              });
            }}
          >
            <View
              style={[
                globalstyles.optionsContainer,
                { flexDirection: "row", justifyContent: "flex-start" },
              ]}
            >
              {renderIcon(category.icon, category.library, styles.icon, 20)}
              <Text style={globalstyles.optionsText}>{option}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  icon: {
    color: "#094852",
    paddingLeft: 10,
  },
});

export default ServiceDetails;

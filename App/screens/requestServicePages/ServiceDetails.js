// Need to replace AsyncStorage with cloud storage
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import renderIcon from "../../shared/RenderIconFunction";
import globalstyles from "../../shared/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServiceDetails = ({ route, navigation }) => {
  const { category, client } = route.params;

  const updateUsageFrequency = async (optionName) => {
    try {
      const currentCount = await AsyncStorage.getItem(optionName);
      const newCount = currentCount ? JSON.parse(currentCount) + 1 : 1;
      await AsyncStorage.setItem(optionName, JSON.stringify(newCount));
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
              updateUsageFrequency(option);
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
              {renderIcon(category.icon, category.library, styles.icon)}
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

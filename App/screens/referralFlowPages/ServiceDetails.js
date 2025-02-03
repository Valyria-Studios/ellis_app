import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderIcon from "../../shared/RenderIconFunction";
import globalstyles from "../../shared/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";

const ServiceDetails = ({ route, navigation }) => {
  const { category, client, filteredNonProfits } = route.params;
  const [serviceIds, setServiceIds] = useState([]);

  useEffect(() => {
    if (category.Subservices) {
      const valueIds = category.Subservices.map(
        (subservice) => subservice.valueId
      );
      const combinedIds = [category.id, ...valueIds]; // Include the main category id
      setServiceIds(combinedIds);
    }
  }, [category]);

  const incrementServiceFrequency = async (
    categoryName,
    optionName,
    icon,
    library,
    serviceId
  ) => {
    try {
      // Ensure all parts of the key are defined and default values are set if necessary
      const safeCategoryName = categoryName || "Unknown Category";
      const safeOptionName = optionName || "Unknown Option";
      const safeIcon = icon || "default-icon";
      const safeLibrary = library || "Ionicons";
      const safeServiceId = serviceId || "unknown-id"; // Include serviceId in the key

      const key = `${safeCategoryName}:${safeOptionName}:${safeIcon}:${safeLibrary}:${safeServiceId}`;
      const value = await AsyncStorage.getItem(key);
      const count = value ? JSON.parse(value) + 1 : 1; // Increment count or initialize to 1
      await AsyncStorage.setItem(key, JSON.stringify(count));
    } catch (error) {
      console.error("Error updating service frequency:", error);
    }
  };

  const handleMainServicePress = () => {
    incrementServiceFrequency(
      category.name, // Main category name
      category.name, // Option name (same as the category name for the main service)
      category.icon,
      category.library,
      category.id // Pass the main service ID
    );

    navigation.navigate("Referral Location", {
      option: category.name,
      categoryName: category.name,
      client,
      providedServicesId: category.id, // Pass the main service ID
      filteredNonProfits, // Pass all filtered NonProfits
    });
  };

  const handleSubservicePress = (subservice) => {
    incrementServiceFrequency(
      category.name,
      subservice.name,
      category.icon,
      category.library,
      subservice.valueId // Pass the subservice ID
    );

    // Update the filter to use providedServiceswithId
    const filteredBySubservice = filteredNonProfits.filter((nonProfit) =>
      nonProfit.providedServiceswithId.some(
        (service) => service.id === subservice.valueId
      )
    );

    navigation.navigate("Referral Location", {
      option: subservice.name,
      categoryName: category.name,
      client,
      providedServicesId: subservice.valueId, // Pass the subservice ID
      filteredNonProfits: filteredBySubservice, // Pass the filtered NonProfits
    });
  };

  return (
    <View
      style={[globalstyles.container, { paddingTop: 15, paddingHorizontal: 5 }]}
    >
      {/* Option for the main service */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={handleMainServicePress}
      >
        <View
          style={[
            globalstyles.optionsContainer,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            {renderIcon(category.icon, category.library, styles.icon, 20)}
            <Text style={globalstyles.optionsText}>{category.name}</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={28}
            style={{ color: "#094852" }}
          />
        </View>
      </TouchableOpacity>

      {category.Subservices &&
        category.Subservices.filter((subservice) =>
          filteredNonProfits.some((nonProfit) =>
            nonProfit.providedServiceswithId.some(
              (service) => service.id === subservice.valueId
            )
          )
        ).map((subservice, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={styles.container}
            onPress={() => handleSubservicePress(subservice)}
          >
            <View
              style={[
                globalstyles.optionsContainer,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                {renderIcon(category.icon, category.library, styles.icon, 20)}
                <Text style={globalstyles.optionsText}>{subservice.name}</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                style={{ color: "#094852" }}
              />
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

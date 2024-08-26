import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import renderIcon from "../../shared/RenderIconFunction";
import globalstyles from "../../shared/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";

const ServiceDetails = ({ route, navigation }) => {
  const { category, client } = route.params;
  const [serviceIds, setServiceIds] = useState([])

  useEffect(() => {
    if (category.Subservices) {
      const valueIds = category.Subservices.map(
        (subservice) => subservice.valueId
      );
      const combinedIds = [category.id, ...valueIds]; // Include the main category id
      console.log("Combined valueIds including main category id:", combinedIds);
      setServiceIds(combinedIds)
      console.log(serviceIds)
    }
  }, [category]);

  return (
    <View
      style={[globalstyles.container, { paddingTop: 15, paddingHorizontal: 5 }]}
    >
      {/* Option for the main service */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={() => {
          navigation.navigate("Referral Location", {
            option: category.name,
            categoryName: category.name,
            client,
            providedServicesId: serviceIds, // Pass the main service ID
          });
        }}
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
        category.Subservices.map((subservice, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={styles.container}
            onPress={() => {
              navigation.navigate("Referral Location", {
                option: subservice.name,
                categoryName: category.name,
                client,
                providedServicesId: serviceIds,
              });
            }}
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

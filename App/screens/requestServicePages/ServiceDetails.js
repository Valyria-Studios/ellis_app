import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import renderIcon from "../../shared/RenderIconFunction";
import globalstyles from "../../shared/globalStyles";

const ServiceDetails = ({ route }) => {
  const { category } = route.params;

  return (
    <View style={[globalstyles.container, { paddingTop: 15 }]}>
      {category.options &&
        category.options.map((option, index) => (
          <View key={index}>
            <TouchableOpacity style={styles.container}>
              <View
                style={[
                  globalstyles.optionsContainer,
                  { flexDirection: "row", justifyContent: "flex-start" },
                ]}
              >
                {renderIcon(category.icon, category.library, styles.icon)}
                {/* Use the same icon as the category */}
                <Text style={globalstyles.optionsText}>{option}</Text>
              </View>
            </TouchableOpacity>
          </View>
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
  },
});

export default ServiceDetails;

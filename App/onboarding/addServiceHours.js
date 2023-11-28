import React from "react";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";

const ServiceHours = ({ route }) => {
  const { selectedOptions } = route.params;

  return (
    <SafeAreaView style={globalstyles.container}>
      <ScrollView>
        <View style={{ margin: 40 }} />
        <View style={globalstyles.headerContainer}>
          <Text style={globalstyles.header}>Add service hours</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={globalstyles.subHeader}>Add your service hours</Text>
        </View>
        {/* Display the selected options here */}
        {Object.entries(selectedOptions).map(([category, options]) => (
          <View key={category}>
            <Text>{category}</Text>
            {options.map((option, index) => (
              <Text key={index}>{option}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceHours;

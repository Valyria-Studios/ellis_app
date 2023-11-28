import React from "react";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ServiceHours = ({ route }) => {
  const { selectedOptions } = route.params;

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Service Hours Page</Text>
          {/* Display the selected options here */}
          {Object.entries(selectedOptions).map(([category, options]) => (
            <View key={category}>
              <Text>{category}</Text>
              {options.map((option, index) => (
                <Text key={index}>{option}</Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceHours;

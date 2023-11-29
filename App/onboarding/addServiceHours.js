import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";

const ServiceHours = ({ route }) => {
  const { selectedOptions } = route.params;
  const [serviceName, setServiceName] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  return (
    <SafeAreaView style={[globalstyles.container, {marginHorizontal: 5}]}>
      <ScrollView>
        <View style={{ margin: 40 }} />
        <View style={globalstyles.headerContainer}>
          <Text style={globalstyles.header}>Add service hours</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={globalstyles.subHeader}>Add your service hours</Text>
        </View>
        {/* Display the selected options here */}
        {Object.entries(selectedOptions)
          .filter(([category, options]) => options.length > 0)
          .map(([category, options]) =>
            options.map((option, index) => (
              <View
                key={`${category}-${index}`}
                style={styles.servicesContainer}
              >
                <Text
                  style={styles.servicesText}
                >{`${category} > ${option}`}</Text>
                <TextInput
                  style={[globalstyles.textInput, {height: 45, paddingVertical: 0}]}
                  placeholder={"Service name (optional)"}
                  value={serviceName}
                  onChange={setServiceName}
                  // You can add more props to TextInput as needed
                />
                <TextInput
                  style={[globalstyles.textInput, {height: 45}]}
                  placeholder={"Location"}
                  value={serviceLocation}
                  onChange={setServiceLocation}
                  // You can add more props to TextInput as needed
                />
                <TextInput
                  style={[globalstyles.textInput, {height: 45, paddingVertical: 0}]}
                  placeholder={"Opening Hours"}
                  value={openingHours}
                  onChange={setOpeningHours}
                  // You can add more props to TextInput as needed
                />
                <TextInput
                  style={[globalstyles.textInput, {height: 45, paddingVertical: 0}]}
                  placeholder={"Closing Hours"}
                  value={closingHours}
                  onChange={setClosingHours}
                  // You can add more props to TextInput as needed
                />
                <TextInput
                  style={[globalstyles.textInput, {height: 45, paddingVertical: 0}]}
                  placeholder={"Service description (optional)"}
                  value={serviceDescription}
                  onChange={setServiceDescription}
                  // You can add more props to TextInput as needed
                />
              </View>
            ))
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    borderWidth: 1,
    justifyContent: "center",
  },

  servicesText: {
    color: "#030E07",
    fontSize: 24,
    fontFamily: "gabarito-medium",
  },

});

export default ServiceHours;

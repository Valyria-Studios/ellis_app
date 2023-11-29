import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
    <SafeAreaView style={[globalstyles.container, { marginHorizontal: 5 }]}>
      <ScrollView>
        <View style={{ margin: 40 }} />
        <View style={globalstyles.headerContainer}>
          <Text style={globalstyles.header}>Add service hours</Text>
        </View>
        <View style={{ marginBottom: 5 }}>
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
                  style={[
                    globalstyles.textInput,
                    { height: 45, marginVertical: 5 },
                  ]}
                  placeholder={"Service name (optional)"}
                  value={serviceName}
                  onChange={setServiceName}
                  // You can add more props to TextInput as needed
                />
                <TextInput
                  style={[
                    globalstyles.textInput,
                    { height: 45, marginVertical: 5 },
                  ]}
                  placeholder={"Location"}
                  value={serviceLocation}
                  onChange={setServiceLocation}
                  // You can add more props to TextInput as needed
                />
                <TextInput
                  style={[
                    globalstyles.textInput,
                    { height: 45, marginVertical: 5 },
                  ]}
                  placeholder={"Opening Hours"}
                  value={openingHours}
                  onChange={setOpeningHours}
                  // You can add more props to TextInput as needed
                />
                <TextInput
                  style={[
                    globalstyles.textInput,
                    { height: 45, marginVertical: 5 },
                  ]}
                  placeholder={"Closing Hours"}
                  value={closingHours}
                  onChange={setClosingHours}
                  // You can add more props to TextInput as needed
                />
                <TextInput
                  style={[
                    globalstyles.textInput,
                    { height: 45, marginVertical: 5 },
                  ]}
                  placeholder={"Service description (optional)"}
                  value={serviceDescription}
                  onChange={setServiceDescription}
                  // You can add more props to TextInput as needed
                />
                <View style={{ marginVertical: 5 }}>
                  <TouchableOpacity style={globalstyles.buttonContainer}>
                    <Text style={globalstyles.buttonText}>
                      {" "}
                      Add another location
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 15 }}>
                  <TouchableOpacity style={globalstyles.buttonContainer}>
                    <Text style={globalstyles.buttonText}>
                      Add another {category.toLowerCase()} service
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        <TouchableOpacity
          // disabled={!serviceLocation || !openingHours || !closingHours}
          style={[
            globalstyles.buttonContainer,
            { backgroundColor: "#10798B", marginTop: 20, marginBottom: 10 },
          ]}
        >
          <Text style={[globalstyles.buttonText, { color: "#fff" }]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalstyles.buttonContainer}>
          <Text style={globalstyles.buttonText}>I'll do this later</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    justifyContent: "center",
    marginVertical: 10,
  },

  servicesText: {
    color: "#030E07",
    fontSize: 24,
    fontFamily: "gabarito-medium",
    marginBottom: 5,
  },
});

export default ServiceHours;

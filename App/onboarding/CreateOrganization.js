import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";

const CreateOrganization = ({ route, navigation }) => {
  const { userId } = route.params;

  const handleSubmit = async () => {
    const organizationData = {
      organizationName: organization,
      address,
      phoneNumber,
      website,
      serviceHours,
    };

    try {
      const response = await fetch(`http://localhost:3000/Accounts/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organization: organizationData }),
      });
      // Handle successful addition

      if (response.ok) {
        const responseJson = await response.json();
        const userId = responseJson.id;
        navigation.navigate("Services", { userId: userId });
      } else {
        console.error("HTTP error: " + response.status);
      }
    } catch (error) {
      console.error("Error sending data to API", error);
    }
  };

  const [organization, setOrganization] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [serviceHours, setServiceHours] = useState("");
  const [inputs, setInputs] = useState([]);

  const inputFields = [
    { placeholder: "Address", value: address, onChangeText: setAddress },
    {
      placeholder: "Phone Number",
      value: phoneNumber,
      onChangeText: setPhoneNumber,
    },
    { placeholder: "Website", value: website, onChangeText: setWebsite },
    {
      placeholder: "Set Default Service Hours",
      value: serviceHours,
      onChangeText: setServiceHours,
    },
  ];

  const addNewInput = () => {
    setInputs([...inputs, ""]); // Add a new empty string for each new input
  };

  const textInputComponents = inputs.map((input, index) => (
    <View>
      <Text style={styles.subheader2}>Location {index + 1}</Text>
      {inputFields.map((feild, index) => (
        <TextInput
          key={index}
          style = {globalstyles.textInput}
          placeholder={feild.placeholder}
          value={feild.value}
          onChangeText={feild.onChangeText}
        />
      ))}
    </View>
  ));

  return (
    <ScrollView>
      <SafeAreaView style={globalstyles.container}>
        <View style={{ margin: 40 }} />
        <View style={globalstyles.headerContainer}>
          <Text style={globalstyles.header}>Set up your Organization</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={[globalstyles.subHeader, { marginBottom: 20 }]}>
            Add your organization details
          </Text>
          <TextInput
            placeholder="Organization Name"
            style={globalstyles.textInput}
            value={organization}
            onChangeText={setOrganization}
          />
          <View>
            <Text style={styles.subheader2}>Main Location</Text>
            {inputFields.map((field, index) => (
              <TextInput
                key={index}
                style={globalstyles.textInput}
                placeholder={field.placeholder}
                value={field.value}
                onChangeText={field.onChangeText}
              />
            ))}
            {textInputComponents}
            <TouchableOpacity
              style={[globalstyles.buttonContainer, { marginTop: 5 }]}
              activeOpacity={0.6}
              onPress={addNewInput}
            >
              <Text style={globalstyles.buttonText}>Add Another Location</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={[
              globalstyles.buttonContainer,
              { backgroundColor: "#10798B", marginTop: 20 },
            ]}
            onPress={handleSubmit}
          >
            <Text style={[globalstyles.buttonText, { color: "#fff" }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subheader2: {
    color: "#030E07",
    fontSize: 18,
    fontFamily: "gabarito-regular",
    paddingTop: 20,
    paddingBottom: 5,
  },
});

export default CreateOrganization;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

  return (
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
          <TextInput
            placeholder="Address"
            style={globalstyles.textInput}
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            placeholder="Phone Number"
            style={globalstyles.textInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            placeholder="Website"
            style={globalstyles.textInput}
            value={website}
            onChangeText={setWebsite}
          />
          <TextInput
            placeholder="Set Default Service Hours"
            style={globalstyles.textInput}
            value={serviceHours}
            onChangeText={setServiceHours}
          />
          <TouchableOpacity
            style={[globalstyles.buttonContainer, { marginTop: 5 }]}
            activeOpacity={0.6}
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
          <Text style={[globalstyles.buttonText, { color: "#fff" }]}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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

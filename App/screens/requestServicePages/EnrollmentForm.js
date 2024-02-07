import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import globalstyles from "../../shared/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";

const EnrollmentForm = () => {
  const [referralType, setReferralType] = useState();
  const [nameVerified, setNameVerified] = useState();
  const [addressVerified, setAddressVerified] = useState();
  const [patronProfile, setPatronProfile] = useState();
  const [consent, setConsent] = useState();

  return (
    <ScrollView
      style={globalstyles.container}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text>Referral Type</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setReferralType(value)}
            items={[
              {
                label: "Current Participant — Add Alternate",
                value: "Add",
              },
              { label: "Current Participant — Update Info", value: "Update" },
              {
                label: "Current Participant — Transfer Location",
                value: "Transfer",
              },
              // Add more options as needed
            ]}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              placeholder: styles.input,
              iconContainer: {
                top: "50%",
                right: 10,
                transform: [{ translateY: -12 }], // Adjust based on your icon size
              },
            }}
            placeholder={{ label: "New Applicant", value: "New" }}
            useNativeAndroidPickerStyle={false}
            Icon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#094852"
              />
            )}
          />
        </View>
      </View>
      <View>
        <Text>Required Verification</Text>
        <Text>Name verified by ID?</Text>
        <Text>Dropdown options</Text>
        <Text>Address verified by ID or mail?</Text>
        <Text>Dropdown options</Text>
      </View>
      <View>
        <Text>Patron Profile</Text>
        <Text>Dropdown Options</Text>
        <Text>Dropdown Options</Text>
        <Text>Dropdown Options</Text>
        <Text>Dropdown Options</Text>
      </View>
      <View>
        <Text>Consent</Text>
        <Text>Dropdown Options</Text>
        <Text>Dropdown Options</Text>
      </View>
      <View>
        <Text>Notes</Text>
        <TextInput />
      </View>
      <TouchableOpacity
        style={[
          globalstyles.buttonContainer,
          { backgroundColor: "#10798B", marginTop: 20 },
        ]}
        activeOpacity={0.6}
      >
        <Text style={[globalstyles.buttonText, { color: "#fff" }]}>
          Create Referral
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#B5BABB",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },

  input: {
    fontFamily: "gabarito-regular",
    color: "#030E07",
    fontSize: 18,
  },
});

export default EnrollmentForm;

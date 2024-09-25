// NEED ALL OPTIONS FOR EACH PICKER

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Picker from "react-native-picker-select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import globalstyles from "../../shared/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const EnrollmentForm = ({ route, navigation }) => {
  const { selectedClient, option, selectedService } = route.params;
  const [referralType, setReferralType] = useState("New");
  const [nameVerified, setNameVerified] = useState();
  const [addressVerified, setAddressVerified] = useState();
  const [basicProfileInformation, setBasicProfileInformation] = useState();
  const [householdInformation, setHouseholdInformation] = useState();
  const [demographicInformation, setDemographicInformation] = useState();
  const [alternateInformation, setAlternateInformation] = useState();
  const [communicationConsent, setCommunicationConsent] = useState();
  const [notes, setNotes] = useState("");
  const [certification, setCertification] = useState();
  const [patronProfile, setPatronProfile] = useState();
  const [consent, setConsent] = useState();

  return (
    <SafeAreaView style={[globalstyles.container]}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled" // Ensures taps work even when the keyboard is open
        enableOnAndroid={true} // Enables behavior on Android
        extraHeight={150} // Adjust this value for space between the input and keyboard
      >
        <View>
          <View>
            <Text style={styles.captionText}>
              Leave the field below blank to leave the form for the organization
              to fill out.
            </Text>
          </View>
          <Text style={styles.header}>Referral Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              value={referralType}
              onValueChange={(value) => setReferralType(value)}
              items={[
                { label: "Current Participant — Add Alternate", value: "Add" },
                { label: "Current Participant — Update Info", value: "Update" },
                {
                  label: "Current Participant — Transfer Location",
                  value: "Transfer",
                },
              ]}
              style={pickerSelectStyles}
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
          <Text style={styles.header}>Required Verification</Text>
          <Text style={styles.subheader}>Name verified by ID?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              value={nameVerified}
              onValueChange={(value) => setNameVerified(value)}
              items={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Select an option", value: null }}
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
          <Text style={styles.subheader}>Address verified by ID or mail?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              value={addressVerified}
              onValueChange={(value) => setAddressVerified(value)}
              items={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Select an option", value: null }}
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
          <Text style={styles.header}>Patron Profile</Text>
          <View style={styles.pickerContainer}>
            <Picker
              value={basicProfileInformation}
              onValueChange={(value) => setBasicProfileInformation(value)}
              items={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Basic Profile Information", value: null }}
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
          <View style={styles.pickerContainer}>
            <Picker
              value={householdInformation}
              onValueChange={(value) => setHouseholdInformation(value)}
              items={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Household Information", value: null }}
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
          <View style={styles.pickerContainer}>
            <Picker
              value={demographicInformation}
              onValueChange={(value) => setDemographicInformation(value)}
              items={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Demographic Information", value: null }}
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
          <View style={styles.pickerContainer}>
            <Picker
              value={alternateInformation}
              onValueChange={(value) => setAlternateInformation(value)}
              items={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Alternate Information", value: null }}
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
          <Text style={styles.header}>Consent</Text>
          <View style={styles.pickerContainer}>
            <Picker
              value={communicationConsent}
              onValueChange={(value) => setCommunicationConsent(value)}
              items={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Communication Consent", value: null }}
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
          <View style={styles.pickerContainer}>
            <Picker
              value={certification}
              onValueChange={(value) => setCertification(value)}
              items={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Certification", value: null }}
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
          <Text style={styles.header}>Notes</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"Enter notes here"}
            value={notes}
            onChangeText={setNotes}
            multiline={true}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <SafeAreaView>
            <TouchableOpacity
              style={[
                globalstyles.buttonContainer,
                {
                  backgroundColor: "#10798B",
                  borderColor: "#FFFFFF",
                  marginTop: 20,
                  marginBottom: 5,
                  margin: 0,
                },
              ]}
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate("Confirm Referral", {
                  selectedClient: selectedClient,
                  option: option,
                  selectedService: selectedService,
                  referralType: referralType,
                  nameVerified: nameVerified,
                  addressVerified: addressVerified,
                  basicProfileInformation: basicProfileInformation,
                  householdInformation: householdInformation,
                  demographicInformation: demographicInformation,
                  alternateInformation: alternateInformation,
                  communicationConsent: communicationConsent,
                  certification: certification,
                  notes: notes,
                })
              }
            >
              <Text style={[globalstyles.buttonText, { color: "#fff" }]}>
                Create Referral
              </Text>
            </TouchableOpacity>
            <Text style={styles.skipText}>Skip</Text>
          </SafeAreaView>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  captionText: {
    marginTop: 15,
    marginBottom: 10,
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#094852",
  },

  header: {
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#094852",
    marginVertical: 10,
  },

  subheader: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#171B1C",
    marginBottom: 5,
  },

  textInput: {
    height: 100,
    borderColor: "#B5BABB",
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: "#FFFFFF",
  },

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

  skipText: {
    fontFamily: "karla-semibold",
    fontSize: 16,
    alignSelf: "center",
    color: "#094852",
    textDecorationLine: "underline",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: styles.input,
  inputAndroid: styles.input,
  placeholder: styles.input,
  iconContainer: {
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
  },
});

export default EnrollmentForm;

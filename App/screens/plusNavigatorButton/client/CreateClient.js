// LOGIC FOR PUSHING PAGE

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import globalstyles from "../../../shared/globalStyles";
import Icon from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const CreateClient = ({ navigation }) => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [amenityOptions, setAmenityOptions] = useState({});
  const [isUnhoused, setIsUnhoused] = useState(false);
  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
  const [consentForManagement, setConsentForManagement] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/Amenities") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((amenity) => ({
          label: amenity.location,
          value: amenity.location,
          key: amenity.key,
        }));
        setAmenityOptions(options);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle change in picker selection
  const handleValueChange = (value) => {
    setSelectedAmenity(value);
    // Additional logic for when a new amenity is selected can go here
  };

  const handleSubmit = () => {
    const clientData = {
      firstName: firstName || "",
      middleName: middleName || "",
      lastName: lastName || "",
      fullName: `${firstName} ${middleName} ${lastName}`.trim(),
      birthday: birthday || "",
      phoneNumber: phoneNumber || "",
      email: email || "",
      age: age || "",
      demographics: {
        gender: "",
        primaryLanguage: "",
      },
      address: address || "",
      status: "Current",
      recency: "yesterday",
      services: [], // Assuming no services are provided initially
      providers: "",
      image: "",
      team: {
        admins: [],
        members: [],
      },
      notes: {
        feedback: "",
      },
      engagements: {
        hours: {
          title: "",
          time: 0,
          date: "",
          rating: "",
        },
        services: {
          title: "",
          time: 0,
          date: "",
          rating: "",
        },
        clients: [],
      },
      id: "",
    };

    fetch("http://localhost:3000/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigation.navigate("Client Information", { selectedAmenity });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <SafeAreaView style={[globalstyles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 60 }}>
          <Text style={styles.addClient}>You are adding a new client for</Text>
          <View style={[globalstyles.optionContainer, { marginTop: 10 }]}>
            <View>
              <RNPickerSelect
                key={amenityOptions.key}
                items={amenityOptions}
                onValueChange={handleValueChange}
                value={selectedAmenity}
                placeholder={{ label: "Select an amenity", value: null }}
                style={{
                  input: globalstyles.input,
                  placeholder: globalstyles.placeholder,
                }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
            <View>
              <Icon name="keyboard-arrow-right" size={24} color="#094852" />
            </View>
          </View>
          <View>
            <Text style={styles.header}>Basic Information</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Middle Name"
                value={middleName}
                onChangeText={setMiddleName}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Contact Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Contact Email Address"
                value={email}
                onChangeText={setEmail}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  style={[styles.textInput, { flex: 1, marginRight: 5 }]}
                  placeholder="Date of Birth (optional)"
                  value={birthday}
                  onChangeText={setBirthday}
                />
                <TextInput
                  style={[styles.textInput, { flex: 1, marginLeft: 5 }]}
                  placeholder="Age"
                  value={age}
                  onChangeText={setAge}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  style={[styles.textInput, { flex: 1, marginRight: 5 }]}
                  placeholder="Address (optional)"
                  value={address}
                  onChangeText={setAddress}
                />
                <TextInput
                  style={[styles.textInput, { flex: 1, marginLeft: 5 }]}
                  placeholder="Neighborhood"
                  value={neighborhood}
                  onChangeText={setNeighborhood}
                />
              </View>
              <View style={styles.agreeContainer}>
                <TouchableOpacity
                  style={[
                    styles.agreeCircle,
                    isUnhoused && styles.checkedAgreeCircle,
                  ]}
                  onPress={() => setIsUnhoused(!isUnhoused)}
                  activeOpacity={0.8}
                />
                <Text style={styles.agreeText}>
                  Client is currently unhoused
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.header}>Client Consent</Text>
            <View style={styles.agreeContainer}>
              <TouchableOpacity
                style={[
                  styles.agreeCircle,
                  privacyPolicyAgreed && styles.checkedAgreeCircle,
                ]}
                onPress={() => setPrivacyPolicyAgreed(!privacyPolicyAgreed)}
                activeOpacity={0.8}
              />
              <Text style={styles.agreeText}>
                I have been made aware of Ellis' Privacy Policy and Terms of Use
              </Text>
            </View>
            <View style={styles.agreeContainer}>
              <TouchableOpacity
                style={[
                  styles.agreeCircle,
                  consentForManagement && styles.checkedAgreeCircle,
                ]}
                onPress={() => setConsentForManagement(!consentForManagement)}
                activeOpacity={0.8}
              />
              <Text style={styles.agreeText}>
                I consent to [Name of staff creating client profile] managing my
                account for me
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                globalstyles.buttonContainer,
                { backgroundColor: "#10798B", marginTop: 20 },
              ]}
              activeOpacity={0.8}
            >
              <Text style={[globalstyles.buttonText, { color: "#fff" }]}>
                Create Client Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addClient: {
    fontSize: 16,
    fontFamily: "karla-regular",
    letterSpacing: 0.16,
  },
  header: {
    color: "#062411",
    fontSize: 24,
    fontFamily: "gabarito-semibold",
    marginTop: 32,
  },
  textInputContainer: {
    paddingTop: 10,
  },
  textInput: {
    marginVertical: 5,
    height: 48,
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
    backgroundColor: "#fff",
    borderColor: "#B5BABB",
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
  },
  agreeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  agreeCircle: {
    borderColor: "#10798B",
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 50,
  },

  checkedAgreeCircle: {
    borderColor: "#10798B",
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#10798B",
  },

  agreeText: {
    color: "#030E07",
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
    paddingLeft: 10,
  },
});

export default CreateClient;

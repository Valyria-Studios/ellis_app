// Logic for Houehold, Demographic, and Alternate Information Needed
// Logic for STATUS in referral

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import globalstyles from "../../shared/globalStyles";
import Card from "../../shared/Card";
import imageMap from "../../shared/getProfileImage";
import { SafeAreaView } from "react-native-safe-area-context";

const ConfirmReferral = ({ route, navigation }) => {
  const {
    selectedClient,
    selectedService,
    option,
    amenity,
    service,
    referralType,
    nameVerified,
    addressVerified,
    basicProfileInformation,
    householdInformation,
    demographicInformation,
    alternateInformation,
    communicationConsent,
    certification,
    notes,
  } = route.params;

  console.log(selectedService.name);

  const handleConfirmReferral = async () => {
    const dateStarted = new Date().toISOString();

    try {
      // Fetch the client data
      const clientResponse = await fetch(
        `https://ellis-test-data.com:8000/Clients/${selectedClient.id}`
      );
      const client = await clientResponse.json();

      const senderResponse = await fetch(
        `https://ellis-test-data.com:8000/Clients/${
          selectedClient.referralSenderId || "1"
        }`
      );
      const sender = await senderResponse.json(); // Get the sender's full data

      // Construct the referral data
      const referralData = {
        clientId: selectedClient.id,
        referralSenderId: sender.id || "1",
        organization: selectedService.name,
        dateStarted,
        option,
        amenity,
        service,
        referralType,
        nameVerified,
        addressVerified,
        basicProfileInformation,
        householdInformation,
        demographicInformation,
        alternateInformation,
        communicationConsent,
        certification,
        notes,
      };

      // Send referral data to the NonProfits-Referrals endpoint
      await fetch(`https://ellis-test-data.com:8000/NonProfits-Referrals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedService.id,
          referral: referralData,
        }),
      });

      // Update backend referral logs for both client and sender
      client.referrals.push(referralData);
      sender.referrals.push(referralData);

      await fetch(
        `https://ellis-test-data.com:8000/Clients/${selectedClient.id}/referrals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(referralData),
        }
      );

      await fetch(
        `https://ellis-test-data.com:8000/Clients/${sender.id}/referrals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(referralData),
        }
      );

      // **Send to the /Data endpoint like in the Search Header**
      const dataToSend = {
        search: "Used Referral Flow",
        Organization: selectedService.name,
        iterations: 1,
        id: `${selectedService.id}`,
      };

      await fetch("https://ellis-test-data.com:8000/Data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      // Navigate to the Referral Sent page
      navigation.navigate("Referral Sent", {
        selectedClient: selectedClient,
        referralSender: sender.fullName,
        referralSenderImage: sender.image,
        dateStarted: dateStarted,
        option: option,
      });
    } catch (error) {
      console.error("Error submitting referral or sending data:", error);
    }
  };

  return (
    <ScrollView style={globalstyles.container}>
      <Text style={styles.header}>Please confirm patron information.</Text>
      <View style={styles.cardContainer}>
        <Card>
          <View>
            <Text style={styles.cardHeader}>Basic Profile Information</Text>
          </View>
          <View style={[globalstyles.detailsContainer, { marginBottom: 15 }]}>
            <Image
              source={imageMap[selectedClient.image]}
              style={[
                globalstyles.profileImage,
                {
                  width: 80,
                  height: 80,
                  borderWidth: 1,
                  borderColor: "black",
                },
              ]}
            />
            <View>
              <Text
                style={[
                  globalstyles.details,
                  { marginTop: 0, marginBottom: 5 },
                ]}
              >
                Age
              </Text>
              <Text style={globalstyles.detailsText}>{selectedClient.age}</Text>
            </View>
            <View>
              <Text
                style={[
                  globalstyles.details,
                  { marginTop: 0, marginBottom: 5 },
                ]}
              >
                Location
              </Text>
              <Text style={globalstyles.detailsText}>
                {selectedClient.address}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  globalstyles.details,
                  { marginTop: 0, marginBottom: 5 },
                ]}
              >
                Gender
              </Text>
              <Text style={globalstyles.detailsText}>
                {selectedClient.demographics.gender}
              </Text>
            </View>
          </View>
          <View
            style={[
              globalstyles.detailsContainer,
              { justifyContent: "space-between", marginBottom: 15 },
            ]}
          >
            <View>
              <Text style={[globalstyles.details, { margin: 0 }]}>
                First Name
              </Text>
              <Text
                style={[
                  globalstyles.detailsText,
                  { marginBottom: 0, marginHorizontal: 0 },
                ]}
              >
                {selectedClient.firstName}
              </Text>
            </View>
            <View>
              <Text style={[globalstyles.details, { margin: 0 }]}>
                Middle Name
              </Text>
              <Text
                style={[
                  globalstyles.detailsText,
                  { marginBottom: 0, marginHorizontal: 0 },
                ]}
              >
                {selectedClient.middleName}
              </Text>
            </View>
            <View>
              <Text style={[globalstyles.details, { margin: 0 }]}>
                Last Name
              </Text>
              <Text
                style={[
                  globalstyles.detailsText,
                  { marginBottom: 0, marginHorizontal: 0 },
                ]}
              >
                {selectedClient.lastName}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={[
                globalstyles.detailsContainer,
                {
                  flexDirection: "column",
                  marginBottom: 15,
                },
              ]}
            >
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
                >
                  Birth Date
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  {selectedClient.dob}
                </Text>
              </View>
              <View>
                <Text
                  style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
                >
                  Primary Phone
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  {selectedClient.phoneNumber}
                </Text>
              </View>
            </View>
            <View
              style={[
                globalstyles.detailsContainer,
                {
                  flexDirection: "column",
                  marginBottom: 15,
                },
              ]}
            >
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
                >
                  Primary Language
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  {selectedClient.demographics.primaryLanguage}
                </Text>
              </View>
              <View>
                <Text
                  style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
                >
                  Email
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  {selectedClient.email}
                </Text>
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <View>
            <Text style={styles.cardHeader}>Household Information</Text>
          </View>
          <View style={[globalstyles.detailsContainer, {}]}>
            <View
              style={[
                globalstyles.detailsContainer,
                {
                  flexDirection: "column",
                },
              ]}
            >
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Residential Address
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  {selectedClient.address}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  # of households at the address
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  20
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  # of People in Applicant's Household
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  3
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Mailing Address
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  Same as residential
                </Text>
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <View>
            <Text style={styles.cardHeader}>Demographic Information</Text>
          </View>
          <View style={[globalstyles.detailsContainer, {}]}>
            <View
              style={[
                globalstyles.detailsContainer,
                {
                  flexDirection: "column",
                },
              ]}
            >
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Race or Ethnicity
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  Asian; Black, African American; Hispanic, Latino/a or Spanish
                  Origin; Native Hawaiian or Pacific Islander
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Sexual orientation
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  Questioning/Unsure
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Households have
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  A veteran; a disabled person. 3 children under 18; a single
                  parent
                </Text>
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <View>
            <Text style={styles.cardHeader}>Alternate Information</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ justifyContent: "space-between" }}>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  First Name
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  {selectedClient.firstName}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Birth Date
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  {selectedClient.dob}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Primary{"\n"}Language
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  {selectedClient.demographics.primaryLanguage}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "space-between" }}>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Middle Name
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  {selectedClient.middleName}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Primary{"\n"}Phone
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  {selectedClient.phoneNumber}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "space-between", width: 120 }}>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Last Name
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  {selectedClient.lastName}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Gender
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  {selectedClient.demographics.gender}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 5, color: "#909899" },
                  ]}
                >
                  Email
                </Text>
                <Text
                  style={[globalstyles.detailsText, { marginHorizontal: 0 }]}
                >
                  {selectedClient.email}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
      <SafeAreaView style={{ marginTop: 0, paddingTop: 0 }}>
        <TouchableOpacity
          style={[
            globalstyles.buttonContainer,
            {
              backgroundColor: "#10798B",
              borderColor: "#FFFFFF",
              marginBottom: 5,
              margin: 0,
            },
          ]}
          activeOpacity={0.6}
          onPress={handleConfirmReferral}
        >
          <Text style={[globalstyles.buttonText, { color: "#fff" }]}>
            Confirm Referral
          </Text>
        </TouchableOpacity>
        <Text style={styles.saveDraft}>Save Draft</Text>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: -10,
  },
  header: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#094852",
    marginBottom: 10,
  },

  cardHeader: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#030E07",
    marginBottom: 10,
  },

  saveDraft: {
    fontFamily: "karla-semibold",
    fontSize: 16,
    alignSelf: "center",
    color: "#094852",
    textDecorationLine: "underline",
  },
});

export default ConfirmReferral;

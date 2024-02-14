// Logic for Houehold, Demographic, and Alternate Information Needed

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

const ConfirmReferral = ({ route, navigation }) => {
  const {
    selectedClient,
    option,
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

  return (
    <ScrollView style={globalstyles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Please confirm patron information.</Text>
        <View style={styles.basicProfileInformationContainer}>
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
                <Text style={globalstyles.detailsText}>
                  {selectedClient.age}
                </Text>
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
                  {selectedClient.location}
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
                  {selectedClient.gender}
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
                    style={[
                      globalstyles.details,
                      { margin: 0, marginBottom: 5 },
                    ]}
                  >
                    Birth Date
                  </Text>
                  <Text
                    style={[
                      globalstyles.detailsText,
                      { marginBottom: 0, marginHorizontal: 0 },
                    ]}
                  >
                    {selectedClient.birthday}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      globalstyles.details,
                      { margin: 0, marginBottom: 5 },
                    ]}
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
                    style={[
                      globalstyles.details,
                      { margin: 0, marginBottom: 5 },
                    ]}
                  >
                    Primary Language
                  </Text>
                  <Text
                    style={[
                      globalstyles.detailsText,
                      { marginBottom: 0, marginHorizontal: 0 },
                    ]}
                  >
                    {selectedClient.primaryLanguage}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      globalstyles.details,
                      { margin: 0, marginBottom: 5 },
                    ]}
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
                    Asian; Black, African American; Hispanic, Latino/a or
                    Spanish Origin; Native Hawaiian or Pacific Islander
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
        </View>
        <Text style={styles.info}>
          Demographic Information: {demographicInformation}
        </Text>
        <Text style={styles.info}>
          Alternate Information: {alternateInformation}
        </Text>
      </View>
      <TouchableOpacity
        style={[globalstyles.buttonContainer, styles.button]}
        onPress={() => navigation.navigate("Referral Sent")}
      >
        <Text style={globalstyles.buttonText}>Confirm Referral</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
  },

  basicProfileInformationContainer: {
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

  info: {
    fontSize: 18,
    marginBottom: 5,
  },

  button: {
    marginHorizontal: 50,
    marginTop: 20,
  },
});

export default ConfirmReferral;

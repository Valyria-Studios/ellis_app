import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import globalstyles from "../../shared/globalStyles";
import Card from "../../shared/Card";

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
            <Text style={styles.info}>Basic Profile Information: {selectedClient.name}</Text>
          </Card>
        </View>
        <Text style={styles.info}>
          Household Information: {householdInformation}
        </Text>
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
  subheader: {
    fontSize: 20,
    fontWeight: "600",
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

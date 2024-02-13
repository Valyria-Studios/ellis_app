import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import globalstyles from "../../shared/globalStyles";

const ConfirmReferral = ({ route, navigation }) => {
  const { client, option, referralType, nameVerified, addressVerified, basicProfileInformation, householdInformation, demographicInformation, alternateInformation, communicationConsent, certification, notes } = route.params;

  return (
    <ScrollView style={globalstyles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Confirmation</Text>
        <Text style={styles.subheader}>Referral Type: {referralType}</Text>
        <Text style={styles.info}>Name Verified: {nameVerified}</Text>
        <Text style={styles.info}>Address Verified: {addressVerified}</Text>
        <Text style={styles.info}>Basic Profile Information: {basicProfileInformation}</Text>
        <Text style={styles.info}>Household Information: {householdInformation}</Text>
        <Text style={styles.info}>Demographic Information: {demographicInformation}</Text>
        <Text style={styles.info}>Alternate Information: {alternateInformation}</Text>
        <Text style={styles.info}>Communication Consent: {communicationConsent}</Text>
        <Text style={styles.info}>Certification: {certification}</Text>
        <Text style={styles.info}>Notes: {notes}</Text>
      </View>
      <TouchableOpacity
        style={[globalstyles.buttonContainer, styles.button]}
        onPress={() => navigation.navigate("Home")} // Adjust as needed
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subheader: {
    fontSize: 20,
    fontWeight: '600',
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

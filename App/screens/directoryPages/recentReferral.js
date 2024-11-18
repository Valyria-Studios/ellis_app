import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import globalstyles from "../../shared/globalStyles";
import { format } from "date-fns";

const RecentReferrals = ({ route }) => {
  const { clientId, referral } = route.params;
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend using the clientId
    fetch(`https://ellis-test-data.com:8000/Clients/${clientId}`)
      .then((response) => response.json())
      .then((data) => {
        setClientData(data);
      })
      .catch((error) => console.error("Error fetching client data:", error));
  }, [clientId]);

  // Format dateStarted
  const formattedDate = referral.dateStarted
    ? format(new Date(referral.dateStarted), "MMMM dd, yyyy")
    : "";

  return (
    <View style={globalstyles.container}>
      {clientData ? (
        <View style={styles.contentContainer}>
          <Text style={styles.infoText}>
            Referral Type: {referral.referralType}
          </Text>
          <Text style={styles.infoText}>
            Organization: {referral.organization}
          </Text>
          <Text style={styles.infoText}>Service: {referral.option}</Text>
          <Text style={styles.infoText}>Date Started: {formattedDate}</Text>
          <Text style={styles.infoText}>Notes: {referral.notes}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentContainer: {
    // padding: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default RecentReferrals;

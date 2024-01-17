import React from "react";
import { View, Text, StyleSheet } from "react-native";
import globalstyles from "../../shared/globalStyles";

function AdminPage() {
  return (
    <View style={[globalstyles.container, { paddingTop: 10 }]}>
      <Text style={styles.header}>Current Admins</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontFamily: "gabarito-regular",
    color: "#030E07",
  },
});

export default AdminPage;

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";

const ServicesPage = () => {
  return (
    <SafeAreaView style={globalstyles.container}>
      <View style={{ margin: 40 }}></View>
      <View style={globalstyles.headerContainer}>
        <Text style={globalstyles.header}>Add your services</Text>
      </View>
      <Text style={globalstyles.subHeader}>What services do you provide?</Text>
      <View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ServicesPage;

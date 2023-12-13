import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import globalstyles from "../shared/globalStyles";
import Icon from "@expo/vector-icons/Ionicons";

const RequestService = () => {
  return (
    <View style={globalstyles.container}>
      <Text style={[globalstyles.title, { fontSize: 36 }]}>
        Service Requests
      </Text>
      <View style={[globalstyles.searchSection, { marginVertical: 15 }]}>
        <View style={globalstyles.searchContainer}>
          <Icon
            name="search-outline"
            size={20}
            color="#616a6c"
            style={globalstyles.searchIcon}
          />
          <TextInput
            blurOnSubmit={true}
            style={[globalstyles.searchBar, { fontSize: 16 }]}
            // value={''}
            // onChangeText={''}
            placeholder="Search for service"
          />
        </View>
      </View>
      <View>
        <Text style={[globalstyles.title, {fontSize: 24, marginTop: 5}]}>Frequently Used</Text>
        {/* some code for showing a list of frequents */}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({});

export default RequestService;

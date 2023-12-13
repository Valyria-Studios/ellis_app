import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import globalstyles from "../shared/globalStyles";
import Icon from "@expo/vector-icons/Ionicons";

const RequestService = () => {
  const serviceCategories = [
    { name: "Food", options: ["Emergency Food", "Groceries (Food Pantry)"] },
    {
      name: "Health",
      options: [
        "Urgent Care",
        "Mental Health Urgent Care",
        "Mental Health Services",
        "Women's Health",
      ],
    },
    {
      name: "Housing",
      options: ["Temporary Housing", "Permanent Supportive Housing"],
    },
    {
      name: "Legal",
      options: ["Civil Defense", "Criminal Defense", "Evicition Prevention"],
    },
  ];

  return (
    <ScrollView style={globalstyles.container}>
      <View>
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
          <Text style={styles.subHeader}>Frequently Used</Text>
          {/* some code for showing a list of frequents */}
        </View>
        {serviceCategories.map((category, index) => (
          <View key={index}>
            <Text style={styles.subHeader}>{category.name}</Text>
            {category.options.map((options, idx) => (
              <TouchableOpacity key={idx} style={styles.container}>
                <View style={[globalstyles.optionsContainer, {padding: 20}]}>
                  <Text style={globalstyles.optionsText}>{options}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    fontSize: 24,
    fontFamily: "gabarito-bold",
    marginTop: 10,
    color: "#094851",
  },

  container: {
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
});

export default RequestService;

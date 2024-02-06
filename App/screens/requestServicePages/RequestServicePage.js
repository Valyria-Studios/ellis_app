import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import globalstyles from "../../shared/globalStyles";
import renderIcon from "../../shared/RenderIconFunction";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const RequestService = ({ navigation }) => {
  const serviceCategories = [
    {
      name: "Food",
      icon: "clinic-medical",
      library: "FontAwesome5",
      options: ["Emergency Food", "Groceries (Food Pantry)"],
    },
    {
      name: "Health",
      icon: "brain",
      library: "FontAwesome5",
      options: [
        { name: "Urgent Care" },
        {
          name: "Mental Health Urgent Care",
          icon: "clinic-medical",
          library: "FontAwesome5",
        },
        {
          name: "Mental Health Services",
          icon: "brain",
          library: "FontAwesome5",
        },
        { name: "Women's Health", icon: "md-female", library: "Ionicons" },
      ],
    },
    {
      name: "Housing",
      icon: "home",
      library: "Ionicons",
      options: [
        {
          name: "Temporary Housing",
          icon: "home-search-outline",
          library: "MaterialCommunityIcons",
        },
        {
          name: "Permanent Supportive Housing",
          icon: "home",
          library: "FontAwesome5",
        },
      ],
    },
    {
      name: "Hygiene",
      icon: "brain",
      library: "FontAwesome5",
    },
    {
      name: "Learn",
      icon: "briefcase",
      library: "Feather",
    },
    {
      name: "Legal",
      icon: "briefcase",
      library: "Feather",
      options: [
        { name: "Civil Litigation", icon: "groups", library: "MaterialIcons" },
        {
          name: "Criminal Defense",
          icon: "briefcase-outline",
          library: "MaterialCommunityIcons",
        },
        {
          name: "Evicition Prevention",
          icon: "bed-king-outline",
          library: "MaterialCommunityIcons",
        },
      ],
    },
    {
      name: "Money",
      icon: "briefcase",
      library: "Feather",
    },
  ];

  return (
    <ScrollView
      style={globalstyles.container}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={[globalstyles.title, { fontSize: 36 }]}>
          Service Requests
        </Text>
        <View style={[globalstyles.searchSection, { marginVertical: 15 }]}>
          <View style={globalstyles.searchContainer}>
            <Ionicons
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
        <Text style={styles.subHeader}>Services</Text>
        {serviceCategories.map((category, index) => (
          <View key={index} style={styles.container}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Service Details", { category })
              }
            >
              <View
                style={[
                  globalstyles.optionsContainer,
                  { justifyContent: "space-between" },
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  {renderIcon(category.icon, category.library, styles.icon)}
                  <Text style={globalstyles.optionsText}>{category.name}</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={30}
                  style={{ color: "#094852" }}
                />
              </View>
            </TouchableOpacity>
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

  icon: {
    color: "#094852",
  },
});

export default RequestService;

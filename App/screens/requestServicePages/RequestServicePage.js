//Need all Options for Service Categories

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
  //Need all Options for Service Categories
  const serviceCategories = [
    {
      name: "Food",
      icon: "clinic-medical",
      library: "FontAwesome5",
      options: [
        "Emergency Food",
        "Food Benefits",
        "Food Delivery",
        "Food Pantry",
        "Meals",
      ],
    },
    {
      name: "Health",
      icon: "brain",
      library: "FontAwesome5",
      options: [
        "Urgent Care",
        "Mental Health Urgent Care",
        "Mental Health Services",
        "Women's Health",
      ],
    },
    {
      name: "Housing",
      icon: "home",
      library: "Ionicons",
      options: ["Temporary Housing", "Permanent Supportive Housing"],
    },
    {
      name: "Hygiene",
      icon: "brain",
      library: "FontAwesome5",
      options: [],
    },
    {
      name: "Learn",
      icon: "briefcase",
      library: "Feather",
      options: [],
    },
    {
      name: "Legal",
      icon: "briefcase",
      library: "Feather",
      options: ["Civil Litigation", "Criminal Defense", "Eviction Prevention"],
    },
    {
      name: "Money",
      icon: "briefcase",
      library: "Feather",
      options: [],
    },
  ];

  return (
    <ScrollView
      style={[globalstyles.container, { paddingHorizontal: 5 }]}
      showsVerticalScrollIndicator={false}
    >
      <View>
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
          <Text style={[styles.subHeader, { marginTop: 0 }]}>
            Frequently Used
          </Text>
          {/* some code for showing a list of frequents */}
        </View>
        <Text style={styles.subHeader}>Services</Text>
        {serviceCategories.map((category, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Service Details", { category })}
          >
            <View key={index} style={styles.container}>
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
            </View>
          </TouchableOpacity>
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
    paddingLeft: 10,
  },
});

export default RequestService;

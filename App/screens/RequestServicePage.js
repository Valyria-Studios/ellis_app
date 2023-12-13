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
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const RequestService = () => {
  const serviceCategories = [
    {
      name: "Food",
      options: [
        { name: "Emergency Food", icon: "bento", library: "MaterialIcons" },
        {
          name: "Groceries (Food Pantry)",
          icon: "local-grocery-store",
          library: "MaterialIcons",
        },
      ],
    },
    {
      name: "Health",
      options: [
        { name: "Urgent Care", icon: "star-of-life", library: "FontAwesome5" },
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
      name: "Legal",
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
  ];

  const renderIcon = (iconName, library) => {
    switch (library) {
      case "Ionicons":
        return <Ionicons name={iconName} size={20} style={styles.icon} />;
      case "MaterialIcons":
        return <MaterialIcons name={iconName} size={20} style={styles.icon} />;
      case "FontAwesome5":
        return <FontAwesome5 name={iconName} size={20} style={styles.icon} />;
      case "MaterialCommunityIcons":
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            style={styles.icon}
          />
        );
      default:
        return null;
    }
  };

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
        {serviceCategories.map((category, index) => (
          <View key={index}>
            <Text style={styles.subHeader}>{category.name}</Text>
            {category.options.map((options, idx) => (
              <View style={{ marginHorizontal: 10 }}>
                <TouchableOpacity key={idx} style={styles.container}>
                  <View
                    style={[
                      globalstyles.optionsContainer,
                      { paddingVertical: 16, justifyContent: "flex-start" },
                    ]}
                  >
                    {renderIcon(options.icon, options.library)}
                    <Text style={globalstyles.optionsText}>{options.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
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

  icon: {
    color: "#094852",
  },
});

export default RequestService;

import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import globalstyles from "../../../shared/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";

const ClientInformation = ({ navigation }) => {
  const [selectedValues, setSelectedValues] = useState({
    pronouns: null,
    language: null,
    ethnicity: null,
    sexual_orientation: null,
  });

  const demographicInfo = [
    {
      name: "Select Gender Pronouns",
      key: "pronouns",
      options: [
        "He/Him/His",
        "She/Her/Hers",
        "They/Them/Theirs",
        "Prefer not to say",
      ],
    },
    {
      name: "Select Language",
      key: "language",
      options: ["English", "Spanish", "French", "Mandarin"],
    },
    {
      name: "Select your Ethnicity",
      key: "ethnicity",
      options: [
        "American Indian or Alaskan Native",
        "Black or African American",
        "Hispanic, Latino, or Spanish",
        "Middle Eastern or North African",
        "Native Hawaiian/Other Pacific Islander",
        "White",
      ],
    },
    {
      name: "Select your Sexual Orientation/Identity",
      key: "sexual_orientation",
      options: [
        "Bisexual",
        "Gay/Lesbian/Same-Gender Loving",
        "Questioning/Unsure",
        "Straight/Heterosexual",
        "Not Listed",
        "Decline to Answer",
      ],
    },
  ];

  const createOptions = (options) => {
    return options.map((option) => ({ label: option, value: option }));
  };

  const handleValueChange = (value, key) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <SafeAreaView style={globalstyles.container}>
      <View style={{ marginTop: 60 }} />
      <Text style={styles.subHeader}>Demographic Information</Text>
      {demographicInfo.map((category, index) => (
        <View key={index} style={styles.container}>
          <View
            style={[
              globalstyles.optionsContainer,
              { justifyContent: "space-between", borderWidth: 0 },
            ]}
          >
            <View>
              <RNPickerSelect
                key={index}
                onValueChange={(value) =>
                  handleValueChange(value, category.key)
                }
                items={createOptions(category.options)}
                placeholder={{ label: `${category.name}`, value: null }}
                style={{
                  input: globalstyles.input,
                  placeholder: globalstyles.placeholder,
                }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
            <View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                style={[styles.icon, { color: "#094852" }]}
              />
            </View>
          </View>
        </View>
      ))}
      <View>
        <TouchableOpacity
          style={[globalstyles.buttonContainer, { marginTop: 20 }]}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Request Services Page", {
              headerTitle: "Make a Referral",
            })
          } // Use navigation prop to navigate
        >
          <Text style={[globalstyles.buttonText]}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    fontSize: 18,
    fontFamily: "gabarito-semibold",
    marginTop: 10,
    color: "#030E07",
  },

  container: {
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#fff",
  },

  icon: {
    color: "#094852",
    paddingLeft: 10,
  },
});

export default ClientInformation;

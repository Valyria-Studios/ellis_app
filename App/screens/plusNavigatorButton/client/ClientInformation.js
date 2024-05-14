import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
    military: null,
    criminalJustice: null,
    difficultyEnglish: null,
    disability: null,
    fosterCare: null,
    singleParent: null,
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

  const yesNoQuestions = [
    {
      name: "Are you currently in the military or a veteran?",
      key: "military",
    },
    {
      name: "Have you had contact with the criminal justice system?",
      key: "criminalJustice",
    },
    {
      name: "Do you have difficulty understanding English?",
      key: "difficultyEnglish",
    },
    { name: "Do you have a disability?", key: "disability" },
    {
      name: "Are you in or have you aged out of the foster care system?",
      key: "fosterCare",
    },
    { name: "Are you a single parent?", key: "singleParent" },
  ];

  const createOptions = (options) => {
    return options.map((option) => ({ label: option, value: option }));
  };

  const handleYesNoChange = (key, value) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleValueChange = (value, key) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <SafeAreaView style={globalstyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        {yesNoQuestions.map((question, index) => (
          <View key={index} style={styles.yesNoContainer}>
            <Text style={globalstyles.input}>{question.name}</Text>
            <View style={styles.yesNoButtons}>
              <Text style={styles.yesNoText}>Yes</Text>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedValues[question.key] === "yes" &&
                    styles.selectedRadioButton,
                ]}
                onPress={() => handleYesNoChange(question.key, "yes")}
              >
                {selectedValues[question.key] === "yes" && (
                  <View style={styles.radioButtonInner} />
                )}
              </TouchableOpacity>
              <Text style={styles.yesNoText}>No</Text>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedValues[question.key] === "no" &&
                    styles.selectedRadioButton,
                ]}
                onPress={() => handleYesNoChange(question.key, "no")}
              >
                {selectedValues[question.key] === "no" && (
                  <View style={styles.radioButtonInner} />
                )}
              </TouchableOpacity>
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
      </ScrollView>
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

  yesNoContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 15,
    // backgroundColor: "#fff",
  },
  yesNoText: {
    fontSize: 16,
    color: "#030E07",
    marginHorizontal: 10,
  },
  yesNoButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  selectedRadioButton: {
    borderColor: "#094852",
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#094852",
  },
  icon: {
    color: "#094852",
    paddingLeft: 10,
  },
});

export default ClientInformation;

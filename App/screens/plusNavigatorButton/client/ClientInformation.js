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
  });

  const demographicInfo = [
    {
      name: "Select Gender Pronouns",
      options: [
        { label: "He/Him/His", value: "He/Him/His" },
        { label: "She/Her/Hers", value: "She/Her/Hers" },
        { label: "They/Them/Theirs", value: "They/Them/Theirs" },
        { label: "Prefer not to say", value: "Prefer not to say" },
      ],
    },
    {
      name: "Select Language",
      options: [
        { label: "English", value: "English" },
        { label: "Spanish", value: "Spanish" },
        { label: "French", value: "French" },
        { label: "Mandarin", value: "Mandarin" },
      ],
    },
  ];

  const handleValueChange = (value, index) => {
    const key = index === 0 ? "pronouns" : "language";
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
                onValueChange={(value) => handleValueChange(value, index)}
                items={category.options}
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

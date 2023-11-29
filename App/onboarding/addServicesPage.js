import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";
import Icon from "react-native-vector-icons/MaterialIcons";

const ServicesPage = ({ route, navigation }) => {
  const { userId } = route.params;

  const [dropdowns, setDropdowns] = useState({
    Community: false,
    Finance: false,
    Food: false,
    Health: false,
    Hygiene: false,
    Shelter: false,
    Work_Learn: false,
    Other: false,
    // Add more dropdowns as needed
  });

  const [selectedOptions, setSelectedOptions] = useState({
    Community: [],
    Finance: [],
    Food: [],
    Health: [],
    Hygiene: [],
    Shelter: [],
    Work_Learn: [],
    Other: [],
    // ... other dropdowns
  });

  const handleSelect = (option, category) => {
    setSelectedOptions((prevOptions) => {
      const categoryOptions = prevOptions[category] || [];

      if (categoryOptions.includes(option)) {
        return {
          ...prevOptions,
          [category]: categoryOptions.filter((item) => item !== option),
        };
      } else {
        return {
          ...prevOptions,
          [category]: [...categoryOptions, option],
        };
      }
    });
  };

  const communityOptions = ["item 1", "item 2", "item 3", "item 4"];
  const financeOptions = ["item 1", "item 2", "item 3", "item 4"];
  const foodOptions = ["item 1", "item 2", "item 3", "item 4"];
  const healthOptions = ["item 1", "item 2", "item 3", "item 4"];
  const hygieneOptions = ["item 1", "item 2", "item 3", "item 4"];
  const shelterOptions = ["item 1", "item 2", "item 3", "item 4"];
  const work_learnOptions = ["item 1", "item 2", "item 3", "item 4"];
  const otherOptions = ["item 1", "item 2", "item 3", "item 4"];

  const toggleDropdown = (key) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  return (
    <SafeAreaView style={globalstyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 40 }}></View>
        <View style={globalstyles.headerContainer}>
          <Text style={globalstyles.header}>Add your services</Text>
        </View>
        <Text style={globalstyles.subHeader}>
          What services do you provide?
        </Text>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => toggleDropdown("Community")}
            style={styles.dropdownButton}
          >
            <Text style={styles.text}>Community</Text>
            <Icon
              name={
                dropdowns.Community ? "horizontal-rule" : "keyboard-arrow-right"
              }
              size={28}
              style={styles.icon}
            />
          </TouchableOpacity>
          {dropdowns.Community && (
            <View style={{ paddingHorizontal: 40, marginVertical: 5 }}>
              {communityOptions.map((option, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onPress={() => handleSelect(option, "Community")}
                  style={styles.optionsContainer}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.Community.includes(option) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOptions.Community.includes(option) && (
                    <Icon name="check" size={20} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => toggleDropdown("Finance")}
            style={styles.dropdownButton}
          >
            <Text style={styles.text}>Finance</Text>
            <Icon
              name={
                dropdowns.Finance ? "horizontal-rule" : "keyboard-arrow-right"
              }
              size={28}
              style={styles.icon}
            />
          </TouchableOpacity>
          {dropdowns.Finance && (
            <View style={{ paddingHorizontal: 40, marginVertical: 5 }}>
              {financeOptions.map((option, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onPress={() => handleSelect(option, "Finance")}
                  style={styles.optionsContainer}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.Finance.includes(option) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOptions.Finance.includes(option) && (
                    <Icon name="check" size={20} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => toggleDropdown("Food")}
            style={styles.dropdownButton}
          >
            <Text style={styles.text}>Food</Text>
            <Icon
              name={dropdowns.Food ? "horizontal-rule" : "keyboard-arrow-right"}
              size={28}
              style={styles.icon}
            />
          </TouchableOpacity>
          {dropdowns.Food && (
            <View style={{ paddingHorizontal: 40, marginVertical: 5 }}>
              {foodOptions.map((option, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onPress={() => handleSelect(option, "Food")}
                  style={styles.optionsContainer}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.Food.includes(option) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOptions.Food.includes(option) && (
                    <Icon name="check" size={20} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => toggleDropdown("Health")}
            style={styles.dropdownButton}
          >
            <Text style={styles.text}>Health</Text>
            <Icon
              name={
                dropdowns.Health ? "horizontal-rule" : "keyboard-arrow-right"
              }
              size={28}
              style={styles.icon}
            />
          </TouchableOpacity>
          {dropdowns.Health && (
            <View style={{ paddingHorizontal: 40, marginVertical: 5 }}>
              {healthOptions.map((option, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onPress={() => handleSelect(option, "Health")}
                  style={styles.optionsContainer}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.Health.includes(option) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOptions.Health.includes(option) && (
                    <Icon name="check" size={20} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => toggleDropdown("Hygiene")}
            style={styles.dropdownButton}
          >
            <Text style={styles.text}>Hygiene</Text>
            <Icon
              name={
                dropdowns.Hygiene ? "horizontal-rule" : "keyboard-arrow-right"
              }
              size={28}
              style={styles.icon}
            />
          </TouchableOpacity>
          {dropdowns.Hygiene && (
            <View style={{ paddingHorizontal: 40, marginVertical: 5 }}>
              {hygieneOptions.map((option, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onPress={() => handleSelect(option, "Hygiene")}
                  style={styles.optionsContainer}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.Hygiene.includes(option) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOptions.Hygiene.includes(option) && (
                    <Icon name="check" size={20} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => toggleDropdown("Shelter")}
            style={styles.dropdownButton}
          >
            <Text style={styles.text}>Shelter</Text>
            <Icon
              name={
                dropdowns.Shelter ? "horizontal-rule" : "keyboard-arrow-right"
              }
              size={28}
              style={styles.icon}
            />
          </TouchableOpacity>
          {dropdowns.Shelter && (
            <View style={{ paddingHorizontal: 40, marginVertical: 5 }}>
              {shelterOptions.map((option, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onPress={() => handleSelect(option, "Shelter")}
                  style={styles.optionsContainer}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.Shelter.includes(option) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOptions.Shelter.includes(option) && (
                    <Icon name="check" size={20} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => toggleDropdown("Work_Learn")}
            style={styles.dropdownButton}
          >
            <Text style={styles.text}>Work & Learn</Text>
            <Icon
              name={
                dropdowns.Work_Learn
                  ? "horizontal-rule"
                  : "keyboard-arrow-right"
              }
              size={28}
              style={styles.icon}
            />
          </TouchableOpacity>
          {dropdowns.Work_Learn && (
            <View style={{ paddingHorizontal: 40, marginVertical: 5 }}>
              {work_learnOptions.map((option, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onPress={() => handleSelect(option, "Work_Learn")}
                  style={styles.optionsContainer}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.Work_Learn.includes(option) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOptions.Work_Learn.includes(option) && (
                    <Icon name="check" size={20} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => toggleDropdown("Other")}
            style={styles.dropdownButton}
          >
            <Text style={styles.text}>Other</Text>
            <Icon
              name={
                dropdowns.Other ? "horizontal-rule" : "keyboard-arrow-right"
              }
              size={28}
              style={styles.icon}
            />
          </TouchableOpacity>
          {dropdowns.Other && (
            <View style={{ paddingHorizontal: 40, marginVertical: 5 }}>
              {otherOptions.map((option, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onPress={() => handleSelect(option, "Other")}
                  style={styles.optionsContainer}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.Other.includes(option) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOptions.Other.includes(option) && (
                    <Icon name="check" size={18} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[
            globalstyles.buttonContainer,
            { backgroundColor: "#10798B", marginTop: 20 },
          ]}
          onPress={() =>
            navigation.push("Service_Hours", {
              selectedOptions,
              userId,
            })
          }
        >
          <Text style={[globalstyles.buttonText, { color: "#fff" }]}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: "gabarito-semibold",
    color: "#094852",
    marginVertical: 10,
  },

  icon: {
    color: "#094852",
    marginRight: 10,
  },

  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
  },

  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionText: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    color: "#202423",
    fontSize: 16,
    fontFamily: "karla-regular",
    letterSpacing: -0.16,
  },

  selectedOptionText: {
    fontFamily: "karla-bold",
  },

  checkIcon: {
    color: "#202423",
  },
});

export default ServicesPage;

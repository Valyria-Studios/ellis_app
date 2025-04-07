import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import globalstyles from "../../shared/globalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";

const SelectReferralFor = ({ route, navigation }) => {
  const { selectedClient, amenity } = route.params;
  const [selectedTeamMember, setSelectedTeamMember] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [pickerKeyStaff, setPickerKeyStaff] = useState(0); // Key for staff picker

  // Combine admins and members for the picker
  const teamOptions = [
    ...amenity.team.admins.map((admin) => ({ label: admin, value: admin })),
    ...amenity.team.members.map((member) => ({ label: member, value: member })),
  ];

  const handleTeamMemberSelect = (value) => {
    if (selectedTeamMember === value) {
      setSelectedTeamMember(""); // Deselect if the same member is selected again
    } else {
      setSelectedTeamMember(value);
      setSelectedService(null); // Reset service selection
    }
  };

  const handleServiceSelect = (service) => {
    if (selectedService === service) {
      setSelectedService(null); // Deselect if the same service is selected again
    } else {
      setSelectedService(service);
      setSelectedTeamMember(""); // Reset team member selection
      setPickerKeyStaff((prevKey) => prevKey + 1); // Reset staff picker to placeholder
    }
  };

  const handleNextPress = () => {
    if (selectedTeamMember) {
      // Navigate to a person detail page if a team member is selected
      navigation.navigate("Refer to Person", {
        teamMember: selectedTeamMember,
        selectedClient: selectedClient,
      });
    } else if (selectedService) {
      // Navigate to a service detail page if a service is selected
      navigation.navigate("Refer to Service", {
        service: selectedService,
        selectedClient: selectedClient,
        amenity: amenity
      });
    } else {
      // Optionally handle the case where neither is selected
      Alert.alert(
        "Selection Required", // Title
        "Please select a person or a service before proceeding.", // Message
        [
          { text: "OK" }, // Button
        ]
      );
    }
  };
  return (
    <SafeAreaView style={[globalstyles.container, { marginTop: -30 }]}>
      <View>
        <Text style={styles.header}>Refer to a person</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            key={pickerKeyStaff}
            onValueChange={(value) => handleTeamMemberSelect(value)}
            items={teamOptions}
            style={pickerSelectStyles}
            placeholder={{ label: "Select Staff Member", value: null }}
            Icon={() => (
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#094852"
                style={{ marginRight: -10 }}
              />
            )}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>Refer to a service</Text>
        <Text style={styles.caption}>
          The client you're referring is eligible for these services:
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {amenity.services.map((service, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => handleServiceSelect(service)}
              >
                <View
                  style={
                    selectedService === service
                      ? styles.selectedServiceCard
                      : styles.serviceCard
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        globalstyles.details,
                        { margin: 0, marginBottom: 10 },
                      ]}
                    >
                      {service.type}
                    </Text>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={26}
                      color="#094852"
                      style={{ marginRight: 0 }}
                    />
                  </View>
                  <Text style={styles.serviceCardHeader}>{service.name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <MaterialIcons
                      name="schedule"
                      size={20}
                      style={{ marginRight: 7, color: "#094852" }}
                    />
                    <Text style={globalstyles.cardDetails}>
                      {service.daysOpen}, {service.operationalHours}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {service.availability > 0 ? (
                      service.availability <= 10 ? (
                        <View style={styles.serviceLowContainer}>
                          <Text
                            style={{
                              color: "#533409",
                              fontFamily: "karla-regular",
                              fontSize: 14,
                            }}
                          >
                            Low Availability
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.serviceAvailabeContainer}>
                          <Text
                            style={{
                              color: "#094852",
                              fontFamily: "karla-regular",
                              fontSize: 14,
                            }}
                          >
                            Enrollment Available
                          </Text>
                        </View>
                      )
                    ) : (
                      <View style={styles.noServiceContainer}>
                        <Text
                          style={{
                            color: "#465355",
                            fontFamily: "karla-regular",
                            fontSize: 14,
                          }}
                        >
                          No Enrolloment Available
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 10,
                      }}
                    >
                      <MaterialIcons
                        name="app-registration"
                        size={16}
                        color={"#094852"}
                        style={{ paddingRight: 5 }}
                      />
                      <Text style={styles.referText}>Refer</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={[
          globalstyles.buttonContainer,
          { backgroundColor: "#10798B", marginTop: 0 },
        ]}
        activeOpacity={0.6}
        onPress={handleNextPress}
      >
        <Text style={[globalstyles.buttonText, { color: "#fff" }]}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#094852",
    marginBottom: 15,
  },

  caption: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#094852",
    letterSpacing: -0.16,
    marginBottom: 15,
  },

  serviceCard: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  selectedServiceCard: {
    borderWidth: 2,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  serviceCardHeader: {
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#094852",
    marginBottom: 10,
  },

  serviceAvailabeContainer: {
    backgroundColor: "#E7F2F3",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#4094A2",
    alignSelf: "baseline",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  serviceLowContainer: {
    backgroundColor: "#FBEFDD",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ECAD53",
    alignSelf: "baseline",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  noServiceContainer: {
    backgroundColor: "#DADDDD",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#B5BABB",
    alignSelf: "baseline",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  infoText: {
    fontSize: 18,
  },
  input: {
    fontFamily: "gabarito-regular",
    color: "#030E07",
    fontSize: 18,
  },
  pickerContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  referText: {
    fontFamily: "gabarito-regular",
    fontSize: 16,
    color: "#094852",
    alignItems: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: styles.input,
  inputAndroid: styles.input,
  placeholder: styles.input,
  iconContainer: {
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
  },
});

export default SelectReferralFor;

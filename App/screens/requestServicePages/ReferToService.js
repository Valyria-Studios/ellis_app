import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import globalstyles from "../../shared/globalStyles";
import Card from "../../shared/Card";
import imageMap from "../../shared/getProfileImage";
import { ScrollView } from "react-native-gesture-handler";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";

const ReferToService = ({ route, navigation }) => {
  const { selectedClient, service, amenity } = route.params;
  const insets = useSafeAreaInsets();
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [pickingEndTime, setPickingEndTime] = useState(false);
  const [timeSelectionText, setTimeSelectionText] = useState("Select time");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate) => {
    const today = new Date();
    const isToday =
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear();

    setDate(
      isToday
        ? "Today"
        : `${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
    );
    hideDatePicker();
  };

  const handleTimeConfirm = (selectedTime) => {
    const formattedStartTime = `${
      selectedTime.getHours() % 12 || 12
    }:${selectedTime.getMinutes().toString().padStart(2, "0")} ${
      selectedTime.getHours() >= 12 ? "PM" : "AM"
    }`;
    const endTime = new Date(selectedTime.getTime() + 60 * 60 * 1000); // Adds 1 hour to the selected time
    const formattedEndTime = `${endTime.getHours() % 12 || 12}:${endTime
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${endTime.getHours() >= 12 ? "PM" : "AM"}`;

    if (!pickingEndTime) {
      setStartTime(formattedStartTime);
      setEndTime(formattedEndTime); // Automatically set end time to 1 hour later
      setTimeSelectionText(`${formattedStartTime} - ${formattedEndTime}`);
      setPickingEndTime(true); // Prepare for end time selection if needed
    } else {
      // Logic for manually selecting an end time, if applicable
      setEndTime(formattedEndTime);
      setTimeSelectionText(`${startTime} - ${formattedEndTime}`);
      setPickingEndTime(false); // Reset for next time range selection
    }
    hideTimePicker();
  };

  return (
    <SafeAreaView style={[globalstyles.container, { paddingTop: insets.top }]}>
      <ScrollView scrollEnabled={false}>
        <Text style={styles.header}>Basic Profile Information</Text>
        <View style={styles.cardContainer}>
          <Card>
            <View style={[globalstyles.detailsContainer, { marginBottom: 15 }]}>
              <Image
                source={imageMap[selectedClient.image]}
                style={[
                  globalstyles.profileImage,
                  {
                    width: 80,
                    height: 80,
                    borderWidth: 1,
                    borderColor: "black",
                  },
                ]}
              />
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { marginTop: 0, marginBottom: 5 },
                  ]}
                >
                  Age
                </Text>
                <Text style={globalstyles.detailsText}>
                  {selectedClient.age}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { marginTop: 0, marginBottom: 5 },
                  ]}
                >
                  Location
                </Text>
                <Text style={globalstyles.detailsText}>
                  {selectedClient.location}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { marginTop: 0, marginBottom: 5 },
                  ]}
                >
                  Gender
                </Text>
                <Text style={globalstyles.detailsText}>
                  {selectedClient.gender}
                </Text>
              </View>
            </View>
            <View
              style={[
                globalstyles.detailsContainer,
                { justifyContent: "space-between", marginBottom: 15 },
              ]}
            >
              <View>
                <Text style={[globalstyles.details, { margin: 0 }]}>
                  First Name
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  {selectedClient.firstName}
                </Text>
              </View>
              <View>
                <Text style={[globalstyles.details, { margin: 0 }]}>
                  Middle Name
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  {selectedClient.middleName}
                </Text>
              </View>
              <View>
                <Text style={[globalstyles.details, { margin: 0 }]}>
                  Last Name
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  {selectedClient.lastName}
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={[
                  globalstyles.detailsContainer,
                  {
                    flexDirection: "column",
                    marginBottom: 15,
                  },
                ]}
              >
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={[
                      globalstyles.details,
                      { margin: 0, marginBottom: 5 },
                    ]}
                  >
                    Birth Date
                  </Text>
                  <Text
                    style={[
                      globalstyles.detailsText,
                      { marginBottom: 0, marginHorizontal: 0 },
                    ]}
                  >
                    {selectedClient.birthday}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      globalstyles.details,
                      { margin: 0, marginBottom: 5 },
                    ]}
                  >
                    Primary Phone
                  </Text>
                  <Text
                    style={[
                      globalstyles.detailsText,
                      { marginBottom: 0, marginHorizontal: 0 },
                    ]}
                  >
                    {selectedClient.phoneNumber}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  globalstyles.detailsContainer,
                  {
                    flexDirection: "column",
                    marginBottom: 15,
                  },
                ]}
              >
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={[
                      globalstyles.details,
                      { margin: 0, marginBottom: 5 },
                    ]}
                  >
                    Primary Language
                  </Text>
                  <Text
                    style={[
                      globalstyles.detailsText,
                      { marginBottom: 0, marginHorizontal: 0 },
                    ]}
                  >
                    {selectedClient.primaryLanguage}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      globalstyles.details,
                      { margin: 0, marginBottom: 5 },
                    ]}
                  >
                    Email
                  </Text>
                  <Text
                    style={[
                      globalstyles.detailsText,
                      { marginBottom: 0, marginHorizontal: 0 },
                    ]}
                  >
                    {selectedClient.email}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Estimated Arrival Time</Text>
          <View style={styles.dateContainer}>
            <View style={{ flex: 0.5, marginLeft: 10, marginVertical: 5 }}>
              <TouchableOpacity onPress={showDatePicker}>
                <View>
                  <Text
                    style={[
                      globalstyles.details,
                      { margin: 0, marginBottom: 0 },
                    ]}
                  >
                    date
                  </Text>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                  />
                  <Text>{date || "Select a Date"}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                marginVertical: 4,
                borderColor: "#B5BABB",
              }}
            />
            <View style={{ flex: 0.5, marginLeft: 10, marginVertical: 5 }}>
              <TouchableOpacity onPress={showTimePicker}>
                <View>
                  <Text
                    style={[
                      globalstyles.details,
                      { margin: 0, marginBottom: 0 },
                    ]}
                  >
                    Time Range
                  </Text>
                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                    minuteInterval={5}
                  />
                  <Text>{timeSelectionText}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <Text style={[styles.header, { marginTop: 10 }]}>
            Consent to share profile with {amenity.location}
          </Text>
          <TouchableOpacity>
            <View style={styles.consentContainer}>
              <View style={{ padding: 15 }}>
                <Text style={styles.input}>Communication Consent</Text>
                <Text style={styles.completion}>Complete</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.header}>Notes</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"Input reason for referral"}
            value={notes}
            onChangeText={setNotes}
            multiline={true}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={[
              globalstyles.buttonContainer,
              {
                backgroundColor: "#10798B",
                borderColor: "#FFFFFF",
                marginBottom: 5,
                marginTop: 40,
                margin: 0,
              },
            ]}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Confirm Referral", {selectedClient: selectedClient, amenity, service})}
          >
            <Text style={[globalstyles.buttonText, { color: "#fff" }]}>
              Create Referral
            </Text>
          </TouchableOpacity>
          <Text style={styles.skipText}>Skip</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: -10,
    marginBottom: 15,
  },

  header: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#094852",
    marginBottom: 5,
  },

  headerContainer: {
    marginBottom: 10,
  },

  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E2E4E8",
    backgroundColor: "#FFFFFF",
  },

  consentContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#B5BABB",
    borderRadius: 10,
  },

  completion: {
    color: "#3F8B10",
    fontFamily: "karla-regular",
    fontSize: 14,
  },

  input: {
    fontFamily: "gabarito-regular",
    color: "#030E07",
    fontSize: 18,
    marginBottom: 3,
  },

  textInput: {
    height: 100,
    borderColor: "#B5BABB",
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: "#FFFFFF",
  },

  skipText: {
    fontFamily: "karla-semibold",
    fontSize: 16,
    alignSelf: "center",
    color: "#094852",
    textDecorationLine: "underline",
  },
});

export default ReferToService;

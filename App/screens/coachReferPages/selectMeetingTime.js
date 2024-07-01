// LOGIC FOR AVAILABLE TIMES AND DATES

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import globalstyles from "../../shared/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";

export default function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState("");

  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Mock data for available times per selected date
  const availableTimes = {
    "2024-06-27": [
      "09:00 AM",
      "10:00 AM",
      "10:00 AM",
      "10:00 AM",
      "10:00 AM",
      "10:00 AM",
      "11:00 AM",
    ],
    "2024-06-28": ["01:00 PM", "02:00 PM"],
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString); // Format: 'YYYY-MM-DD'
  };

  return (
    <SafeAreaView style={[globalstyles.container, { paddingTop: 50 }]}>
      <Calendar
        minDate={today}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "blue",
          },
        }}
      />
      {selectedDate !== "" && (
        <>
          {availableTimes[selectedDate] ? (
            <View style={styles.timesContainer}>
              {availableTimes[selectedDate].map((time, index) => (
                <View key={index} style={styles.timeSlot}>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noTimesText}>
              No available times for this date.
            </Text>
          )}
        </>
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.additionalText}>Additional Notes</Text>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} placeholder="Add attendees" />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, { height: 100 }]}
              placeholder="Enter notes here"
              multiline={true}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  info: {
    marginTop: 20,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
  },
  timesContainer: {
    marginVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#B5BABB",
    borderRadius: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 18,
    fontFamily: "gabarito-regular",
  },
  noTimesText: {
    fontSize: 16,
    color: "#ff0000",
    marginTop: 20,
    textAlign: "center",
  },
  additionalText: {
    marginTop: 15,
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#094852",
  },
  textInputContainer: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#B5BABB",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  textInput: {
    padding: 10,
    flex: 1,
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#909899",
  },
});

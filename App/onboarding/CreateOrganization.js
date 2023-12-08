import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../shared/globalStyles";
import Icon from "@expo/vector-icons/MaterialIcons";

const CreateOrganization = ({ route, navigation }) => {
  const { userId } = route.params;
  const [locations, setLocations] = useState([
    { address: "", phoneNumber: "", website: "", serviceHours: "" },
  ]);
  const [organization, setOrganization] = useState("");
  const [errors, setErrors] = useState({});

  const isValidUrl = (urlString) => {
    const regex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return regex.test(urlString);
  };

  const isValidServiceHours = (hoursString) => {
    const regex = /^(\d{1,2}:\d{2}\s?[ap]m\s?-\s?\d{1,2}:\d{2}\s?[ap]m)$/;
    return regex.test(hoursString);
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    if (organization.trim() === "") {
      newErrors.organization = "Organization name is required";
      isValid = false;
    }

    locations.forEach((location, index) => {
      Object.keys(location).forEach((key) => {
        if (location[key].trim() === "") {
          let errorMessage = `${formatPlaceholder(key)} is required`;
          newErrors[`location_${index}_${key}`] = errorMessage;
          isValid = false;
        }

        if (location.serviceHours.trim() === "") {
          // Check if serviceHours is empty
          newErrors[`location_${index}_serviceHours`] =
            "Service Hours are required";
          isValid = false;
        } else if (!isValidServiceHours(location.serviceHours)) {
          // Validate serviceHours format
          newErrors[`location_${index}_serviceHours`] =
            "Please enter service hours in the format '9:00 am - 5:00 pm'";
          isValid = false;
        }

        if (location.phoneNumber) {
          const cleanedPhoneNumber = location.phoneNumber.replace(
            /[()-\s]/g,
            ""
          );
          if (cleanedPhoneNumber.length !== 10) {
            newErrors[`location_${index}_phoneNumber`] =
              "Please enter a valid phone number";
            isValid = false;
          }
        }

        if (location.website && !isValidUrl(location.website)) {
          newErrors[`location_${index}_website`] =
            "Please enter a valid website URL";
          isValid = false;
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    const formattedLocations = locations.map((location) => ({
      ...location,
      phoneNumber: location.phoneNumber
        ? formatPhoneNumber(location.phoneNumber)
        : "",
      serviceHours: location.serviceHours
        ? formatServiceHours(location.serviceHours)
        : "",
    }));
    const organizationData = {
      organizationName: organization,
      formattedLocations,
    };

    if (!validateFields()) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/Accounts/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organization: organizationData }),
      });
      // Handle successful addition

      if (response.ok) {
        const responseJson = await response.json();
        const userId = responseJson.id;
        navigation.navigate("Services", { userId: userId });
      } else {
        console.error("HTTP error: " + response.status);
      }
    } catch (error) {
      console.error("Error sending data to API", error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newLocations = [...locations];
    newLocations[index][field] = value;
    setLocations(newLocations);

    if (field === "phoneNumber") {
      // Allow only numeric input
      if (!/^[\d()-]*$/.test(value)) {
        return; // Don't update the state if the input is not numeric
      }
    }
  };

  const addNewLocation = () => {
    setLocations([
      ...locations,
      { address: "", phoneNumber: "", website: "", serviceHours: "" },
    ]);
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Remove non-numeric characters
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    // Check if the input is of correct length
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      // Format the number (123) 456-7890
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phoneNumber;
  };

  const formatServiceHours = (hoursString) => {
    if (!isValidServiceHours(hoursString)) {
      return hoursString; // or handle invalid format as needed
    }

    // Extract the parts of the time
    const match = hoursString.match(
      /^(\d{1,2}:\d{2})\s?([ap]m)\s?-?\s?(\d{1,2}:\d{2})\s?([ap]m)$/
    );
    if (match) {
      // Reformat to "9:00 am - 5:00 pm"
      return `${match[1]} ${match[2]} - ${match[3]} ${match[4]}`;
    }

    return hoursString; // Return the original string if the regex does not match
  };

  const formatPlaceholder = (field) => {
    switch (field) {
      case "address":
        return "Address";
      case "phoneNumber":
        return "Phone Number";
      case "website":
        return "Website";
      case "serviceHours":
        return "Service Hours (e.g. 9:00 am - 5:00 pm)";
    }
  };

  const removeLocation = (index) => {
    setLocations(locations.filter((_, locIndex) => locIndex !== index));
  };

  const renderLocationInputs = () => {
    return locations.map((location, locationIndex) => (
      <View key={locationIndex}>
        <View style={styles.locationHeaderContainer}>
          <Text style={styles.subheader2}>
            {locationIndex === 0
              ? "Main Location"
              : `Location ${locationIndex + 1}`}
          </Text>
          {locationIndex !== 0 && (
            <TouchableOpacity
              onPress={() => removeLocation(locationIndex)}
              activeOpacity={0.5}
            >
              <Icon
                name="highlight-remove"
                size={20}
                style={styles.removeIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        {Object.keys(location).map(
          (field, fieldIndex) =>
            field !== "organization" && (
              <View key={fieldIndex}>
                <TextInput
                  key={fieldIndex}
                  style={globalstyles.textInput}
                  placeholder={formatPlaceholder(field)}
                  value={location[field]}
                  onChangeText={(value) =>
                    handleInputChange(locationIndex, field, value)
                  }
                  keyboardType={field === "phoneNumber" ? "numeric" : "default"}
                  autoCapitalize={field === "website" ? "none" : "sentences"}
                />
                {errors[`location_${locationIndex}_${field}`] && (
                  <Text style={styles.errorText}>
                    {errors[`location_${locationIndex}_${field}`]}
                  </Text>
                )}
              </View>
            )
        )}
      </View>
    ));
  };

  return (
    <ScrollView style={globalstyles.container}>
      <SafeAreaView>
        <View style={{ margin: 40 }} />
        <View style={globalstyles.headerContainer}>
          <Text style={globalstyles.header}>Set up your Organization</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={[globalstyles.subHeader, { marginBottom: 20 }]}>
            Add your organization details
          </Text>
          <TextInput
            placeholder="Organization Name"
            style={globalstyles.textInput}
            value={organization}
            onChangeText={setOrganization}
          />
          {errors.organization && (
            <Text style={styles.errorText}>{errors.organization}</Text>
          )}
          <View>
            {renderLocationInputs()}
            <TouchableOpacity
              style={[globalstyles.buttonContainer, { marginTop: 5 }]}
              activeOpacity={0.6}
              onPress={addNewLocation}
            >
              <Text style={globalstyles.buttonText}>Add Another Location</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={[
              globalstyles.buttonContainer,
              { backgroundColor: "#10798B", marginTop: 20 },
            ]}
            onPress={handleSubmit}
          >
            <Text style={[globalstyles.buttonText, { color: "#fff" }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  locationHeaderContainer: {
    paddingTop: 20,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subheader2: {
    color: "#030E07",
    fontSize: 18,
    fontFamily: "gabarito-regular",
    alignItems: "center",
  },
  removeIcon: {
    marginRight: 5,
    color: "#030E07",
  },

  errorText: {
    color: "red",
    marginHorizontal: 15,
    marginVertical: 5,
    fontSize: 12,
  },
});

export default CreateOrganization;

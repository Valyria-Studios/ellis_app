import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyles from "../../shared/globalStyles";

const ServiceHours = ({ route }) => {
  const { selectedOptions } = route.params;
  const { userId } = route.params;
  const { onCompleteOnboarding } = route.params;
  const [servicesData, setServicesData] = useState({});

  const handleServiceDataChange = (category, option, field, value) => {
    setServicesData((prevData) => ({
      ...prevData,
      [`${category}-${option}`]: {
        ...prevData[`${category}-${option}`],
        [field]: value,
      },
    }));
  };

  const postServiceData = async (allServiceDetails) => {
    try {
      const response = await fetch(`http://localhost:3000/Accounts/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Include other headers as required, like authorization tokens
        },
        body: JSON.stringify({ serviceDetails: allServiceDetails }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
  };

  const handleSubmit = () => {
    let allServiceDetails = {};

    // Loop over each category and option
    Object.entries(servicesData).forEach(([key, value]) => {
      const [category, option] = key.split("-");

      // Initialize the category object if not already present
      if (!allServiceDetails[category]) {
        allServiceDetails[category] = {};
      }

      // Add the option data to the category
      allServiceDetails[category][option] = value;
    });

    postServiceData(allServiceDetails);
    onCompleteOnboarding();
  };

  const formatCategoryName = (category) => {
    const nameMap = {
      Work_Learn: "Work & Learn",
    };
    return nameMap[category] || category;
  };

  const categoriesWithSelectionCount = Object.values(selectedOptions).filter(
    (options) => options.length > 0
  ).length;

  return (
    <SafeAreaView style={[globalstyles.container, { marginHorizontal: 5 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 40 }} />
        <View style={globalstyles.headerContainer}>
          <Text style={globalstyles.header}>Add service hours</Text>
        </View>
        <View style={{ marginBottom: 5 }}>
          <Text style={globalstyles.subHeader}>Add your service hours</Text>
        </View>
        {/* Display the selected options here */}
        {Object.entries(selectedOptions)
          .filter(([category, options]) => options.length > 0)
          .map(([category, options]) =>
            options.map((option, index) => (
              <View
                key={`${category}-${index}`}
                style={styles.servicesContainer}
              >
                <Text style={styles.servicesText}>{`${formatCategoryName(
                  category
                )} > ${option}`}</Text>
                <TextInput
                  style={[
                    globalstyles.textInput,
                    { height: 45, marginVertical: 5 },
                  ]}
                  placeholder={"Service name (optional)"}
                  value={
                    servicesData[`${category}-${option}`]?.serviceName || ""
                  }
                  onChangeText={(text) =>
                    handleServiceDataChange(
                      category,
                      option,
                      "serviceName",
                      text
                    )
                  }
                />
                <TextInput
                  style={[
                    globalstyles.textInput,
                    { height: 45, marginVertical: 5 },
                  ]}
                  placeholder={"Location"}
                  value={
                    servicesData[`${category}-${option}`]?.serviceLocation || ""
                  }
                  onChangeText={(text) =>
                    handleServiceDataChange(
                      category,
                      option,
                      "serviceLocation",
                      text
                    )
                  }
                />
                <TextInput
                  style={[
                    globalstyles.textInput,
                    { height: 45, marginVertical: 5 },
                  ]}
                  placeholder={"Opening Hours"}
                  value={
                    servicesData[`${category}-${option}`]?.openingHours || ""
                  }
                  onChangeText={(text) =>
                    handleServiceDataChange(
                      category,
                      option,
                      "openingHours",
                      text
                    )
                  }
                />
                <TextInput
                  style={[
                    globalstyles.textInput,
                    { height: 45, marginVertical: 5 },
                  ]}
                  placeholder={"Closing Hours"}
                  value={
                    servicesData[`${category}-${option}`]?.closingHours || ""
                  }
                  onChangeText={(text) =>
                    handleServiceDataChange(
                      category,
                      option,
                      "closingHours",
                      text
                    )
                  }
                />
                <TextInput
                  style={[
                    globalstyles.textInput,
                    { height: 45, marginVertical: 5 },
                  ]}
                  placeholder={"Service descriptoin (optional)"}
                  value={
                    servicesData[`${category}-${option}`]?.serviceDescription ||
                    ""
                  }
                  onChangeText={(text) =>
                    handleServiceDataChange(
                      category,
                      option,
                      "serviceDescription",
                      text
                    )
                  }
                />
                <View style={{ marginVertical: 5 }}>
                  <TouchableOpacity style={globalstyles.buttonContainer}>
                    <Text style={globalstyles.buttonText}>
                      Add another location
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 15 }}>
                  <TouchableOpacity style={globalstyles.buttonContainer}>
                    <Text style={globalstyles.buttonText}>
                      Add another {formatCategoryName(category).toLowerCase()}{" "}
                      service
                    </Text>
                  </TouchableOpacity>
                </View>
                {categoriesWithSelectionCount > 1 && (
                  <View style={styles.divderline} />
                )}
              </View>
            ))
          )}
        <TouchableOpacity
          // disabled={!serviceLocation || !openingHours || !closingHours}
          style={[
            globalstyles.buttonContainer,
            { backgroundColor: "#10798B", marginTop: 20, marginBottom: 10 },
          ]}
          onPress={handleSubmit}
        >
          <Text style={[globalstyles.buttonText, { color: "#fff" }]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalstyles.buttonContainer}>
          <Text style={globalstyles.buttonText}>I'll do this later</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    justifyContent: "center",
    marginVertical: 10,
  },

  servicesText: {
    color: "#030E07",
    fontSize: 24,
    fontFamily: "gabarito-medium",
    marginBottom: 5,
  },

  divderline: {
    marginTop: 20,
    height: 1,
    backgroundColor: "#909899",
  },
});

export default ServiceHours;

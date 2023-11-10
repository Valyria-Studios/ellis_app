import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import ChecklistItem from "../shared/CheckBox";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import globalstyles from "../shared/globalStyles";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Dropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const fadeAnim = new Animated.Value(1); // Initial opacity for the first icon

  useEffect(() => {
    // Animate icon opacity
    Animated.timing(fadeAnim, {
      toValue: isOpen ? 0 : 1, // Animate to 0 for open (fade out), 1 for close (fade in)
      duration: 400, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [isOpen]);

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.dropDownContainer}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.3}
        style={styles.dropdownHeader}
      >
        <Text style={styles.dropdownTitle}>{title}</Text>
        <View style={{ position: "relative" }}>
          <Animated.View style={{ position: "absolute", opacity: fadeAnim }}>
            <MaterialIcons name="keyboard-arrow-down" size={24} />
          </Animated.View>
          <Animated.View
            style={{
              position: "relative",
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          >
            <MaterialIcons name="horizontal-rule" size={24} />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.dropdownContent}>{children}</View>}
    </View>
  );
}

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
};

function ProfilePage({ route }) {
  const { client } = route.params;
  const [selectedItem, setSelectedItem] = useState("Services");
  const [checkedItems, setCheckedItems] = useState(0);
  const totalItems = 9; // Total number of ChecklistItems

  // Callback for when a checklist item is toggled
  const handleChecklistToggle = (isChecked) => {
    setCheckedItems((prevCount) => (isChecked ? prevCount + 1 : prevCount - 1));
  };
  const progress = (checkedItems / totalItems) * 100;

  const servicesContent = (
    <View>
      <Dropdown title="Housing">
        <ChecklistItem
          title="Shelter"
          onToggle={() => handleChecklistToggle(true)}
        />
        <ChecklistItem
          title="Applications"
          onToggle={() => handleChecklistToggle(true)}
        />
        <ChecklistItem
          title="Community Shelters"
          onToggle={() => handleChecklistToggle(true)}
        />
      </Dropdown>
      <Dropdown title="Legal Assistance">
        <ChecklistItem
          title="Legal"
          onToggle={() => handleChecklistToggle(true)}
        />
        <ChecklistItem
          title="Documents"
          onToggle={() => handleChecklistToggle(true)}
        />
        <ChecklistItem
          title="Applications"
          onToggle={() => handleChecklistToggle(true)}
        />
      </Dropdown>
      <Dropdown title="Job Placement">
        <ChecklistItem
          title="Applications"
          onToggle={() => handleChecklistToggle(true)}
        />
        <ChecklistItem
          title="Jobs Hiring"
          onToggle={() => handleChecklistToggle(true)}
        />
        <ChecklistItem
          title="Certifications"
          onToggle={() => handleChecklistToggle(true)}
        />
      </Dropdown>
    </View>
  );
  const notesContent = <Text>notes</Text>;

  return (
    <ImageBackground source={client.image} style={styles.container}>
      <View style={styles.overlay} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.centerCard}>
          <View style={styles.mainText}>
            <View style={styles.header}>
              <Text style={styles.clientName}>{client.name}</Text>
              <View style={styles.iconSpacing}>
                <View style={styles.iconsContainer}>
                  <MaterialCommunityIcons
                    name="message"
                    size={18}
                    style={styles.icon}
                  />
                </View>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.details}>Age</Text>
                <Text style={styles.detailsText}>{client.age}</Text>
              </View>
              <View>
                <Text style={styles.details}>Location</Text>
                <Text style={styles.detailsText}>{client.location}</Text>
              </View>
            </View>
            <View style={globalstyles.tagContainer}>
              {client.services && Array.isArray(client.services)
                ? client.services.map((service, index) => (
                    <View key={index} style={globalstyles.tagBackground}>
                      <Text style={globalstyles.individualTags}>{service}</Text>
                    </View>
                  ))
                : null}
            </View>
            <View>
              <Text>Progress Bar goes here</Text>
              <ProgressBar progress={progress} />
            </View>
          </View>
        </View>
        <View style={styles.serviceContainer}>
          <View style={styles.serviceHeader}>
            {["Services", "Notes"].map((sortItem) => (
              <TouchableOpacity
                key={sortItem}
                activeOpacity={1}
                onPress={() => setSelectedItem(sortItem)}
              >
                <View
                  style={
                    selectedItem === sortItem
                      ? styles.selectedItemContainer
                      : styles.serviceItemContainer
                  }
                >
                  <Text style={styles.serviceHeaderItems}>{sortItem}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.something}>
            {selectedItem === "Services" ? servicesContent : notesContent}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 20,
    width: "100%",
    backgroundColor: "red",
    borderRadius: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "green",
    borderRadius: 10,
  },
  container: {
    resizeMode: "cover",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255, 0.4)",
  },

  centerCard: {
    marginTop: 350,
    zIndex: 2,
  },

  scrollView: {
    flex: 1,
  },

  mainText: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 8, // This will add shadow to the right of the container
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconSpacing: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  iconsContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#10798a",
    borderColor: "#10798a",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 20,
  },

  icon: {
    color: "#ffffff",
  },

  detailsContainer: {
    flex: 1,
    flexDirection: "row",
  },

  details: {
    color: "#465355",
    margin: 10,
    fontFamily: "gabarito-regular",
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 2.4,
    textTransform: "uppercase",
  },

  detailsText: {
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
    fontWeight: 400,
    color: "#171B1C",
    marginBottom: 10,
    marginHorizontal: 10,
  },

  clientName: {
    fontSize: 30,
    fontFamily: "gabarito-semibold",
    color: "#094852",
    marginVertical: 10,
  },

  serviceContainer: {
    zIndex: 1,
    paddingTop: 30,
    top: -10,
    flex: 1,
    backgroundColor: "#f3f8f9",
    paddingBottom: 20,
  },

  serviceHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },

  serviceItemContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
  },

  selectedItemContainer: {
    borderBottomWidth: 2,
    borderColor: "#10798a",
    marginVertical: 10,
    marginHorizontal: 15,
  },

  serviceHeaderItems: {
    fontSize: 24,
    color: "#094852",
    fontFamily: "gabarito-medium",
  },

  servicesContainers: {
    borderWidth: 1,
  },

  dropDownContainer: {
    marginHorizontal: 15,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },

  dropdownTitle: {
    fontSize: 18,
    fontFamily: "gabarito-regular",
    color: "#094852",
  },

  dropdownContent: {
    marginHorizontal: 20,
    marginBottom: 20,
  },

  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default ProfilePage;

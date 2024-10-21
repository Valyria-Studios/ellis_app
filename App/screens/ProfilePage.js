// NEED PROFILE PICTURES OF TEAM MEMBERS
// NEED TO ADD LOGIC FOR GETTING ROLE, ORGANIZATION, DATE ADDED, AND INTERACTIONS
// RETREVIAL LOGIC FOR ACTIVITY CONTENT
// SHOW PAST ACTIVITY IN ACTIVITY TAB LOGIC
// SHOW LOGIC FOR DATE SUBMITTED IN FORM CONTENT
// RENDER IMAGE OF SUBMITTED BY IN FORM CONTENT
// RENDER STATUS LOGIC
// SHOW STATUS OF REQUESTS UNDER TITLE OF OPTION

import React, { useEffect, useState, useCallback } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  UIManager,
  Platform,
  Image,
} from "react-native";
import { Dropdown } from "../shared/Dropdown";
import ChecklistItem from "../shared/CheckBox";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Ionicons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import globalstyles from "../shared/globalStyles";
import imageMap from "../shared/getProfileImage";
import ProgressBar from "../shared/ProgressBar";
import RNPickerSelect from "react-native-picker-select";
import { useFocusEffect } from "@react-navigation/native";
import { format, isToday, isYesterday } from "date-fns";
import Card from "../shared/Card";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const dropdownItems = ["Housing", "Legal Assistance", "Job Placement"];
const checklistItems = [
  "Basic Information",
  "Submit Request",
  "Follow Up",
  "Housing Granted",
];
const tabItems = ["Activity", "Request", "Team", "Forms", "Notes"];
const housingStatusItems = [
  { label: "Submit Request", value: "Application Submitted" },
  { label: "Follow up", value: "Following Up" },
  { label: "Housing Granted", value: "Housing Granted" },
];
const legalAssistanceStatusItems = [
  { label: "Change Request", value: "Referral Submitted" },
  { label: "Follow up", value: "Following Up" },
  { label: "Legal Assistance Granted", value: "Assistance Granted" },
];
const jobPlacementStatusItems = [
  { label: "Application Request", value: "Interview Scheduled" },
  { label: "Follow up", value: "Following Up" },
  { label: "Job Found", value: "Job Offered" },
];

const totalItems = dropdownItems.length * checklistItems.length; // Total number of ChecklistItems

function ProfilePage({ route, navigation }) {
  const { client } = route.params;
  const [selectedItem, setSelectedItem] = useState("Activity");
  const [checkedItems, setCheckedItems] = useState(0);
  const [notes, setNotes] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [housingStatus, setHousingStatus] = useState(null);
  const [legalAssistanceStatus, setLegalAssistanceStatus] = useState(null);
  const [jobPlacementStatus, setJobPlacementStatus] = useState(null);
  const [clientData, setClientData] = useState(route.params.client);
  const [forms, setForms] = useState([]); // Placeholder for forms data state
  const [referrals, setReferrals] = useState([]); // State to store referrals

  useFocusEffect(
    useCallback(() => {
      const fetchClientData = async () => {
        if (!clientData.id) return;

        try {
          // Fetch client notes
          const notesResponse = await fetch(
            `http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients/${clientData.id}/notes`
          );
          const notesJson = await notesResponse.json();
          setNotes(notesJson);

          // Fetch client referrals
          const referralsResponse = await fetch(
            `http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients/${clientData.id}/referrals`
          );
          const referralsJson = await referralsResponse.json();

          // Fetch the referredBy name for each referral if referralSenderId exists
          const updatedReferrals = await Promise.all(
            referralsJson.map(async (referral) => {
              try {
                // Check if referralSenderId exists
                if (!referral.referralSenderId) {
                  return {
                    ...referral,
                    referredBy: "Unknown",
                    organization: referral.organization || "Unknown",
                    dateStarted: referral.dateStarted || "Invalid Date",
                  };
                }

                // Fetch the referral sender (referredBy) information based on referralSenderId
                const senderResponse = await fetch(
                  `http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients/${referral.referralSenderId}`
                );
                const senderJson = await senderResponse.json();

                // Return the updated referral with the correct referredBy name
                return {
                  ...referral,
                  referredBy: senderJson.fullName || "Unknown",
                  organization: referral.organization || "Unknown",
                  dateStarted: referral.dateStarted || "Invalid Date",
                };
              } catch (error) {
                console.error(
                  `Error fetching referredBy for referralSenderId ${referral.referralSenderId}:`,
                  error
                );
                return {
                  ...referral,
                  referredBy: "Unknown",
                  organization: referral.organization || "Unknown",
                  dateStarted: referral.dateStarted || "Invalid Date",
                };
              }
            })
          );

          setReferrals(updatedReferrals);

          // Fetch client data for updated information
          const updatedClientDataResponse = await fetch(
            `http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients/${clientData.id}`
          );
          const updatedClientData = await updatedClientDataResponse.json();
          setClientData(updatedClientData);

          // Fetch forms if needed
          const formsResponse = await fetch(
            `http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Forms`
          );
          const formsJson = await formsResponse.json();
          setForms(formsJson);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchClientData();
    }, [clientData.id])
  );

  const getProfileImageFromId = (adminId) => {
    // Assuming that the admin's image can be derived from their ID or mapped
    const imageKey = `userImage${adminId}`; // Example: admin with id "2" corresponds to "userImage2"
    return imageMap[imageKey] || imageMap["defaultImage"]; // Fallback to a default image if not found
  };

  const formatReferralDate = (dateString) => {
    if (dateString === "Invalid Date") {
      return "Date not available"; // Handle invalid dates
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Date not available"; // Handle invalid dates
    }

    if (isToday(date)) {
      return `Today, ${format(date, "p")}`;
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, "p")}`;
    } else {
      return `${format(date, "MMM d, p")}`;
    }
  };

  // Filter forms for the current profile
  const filteredForms = forms.filter((form) => form.for === client.fullName);

  const onNotePress = (noteId) => {
    setSelectedNote(notes[noteId]);
  };

  const handleBackToNotes = () => {
    setSelectedNote(null);
  };

  // Callback for when a checklist item is toggled
  const handleChecklistToggle = (isItemChecked) => {
    setCheckedItems((prevCount) =>
      isItemChecked ? prevCount + 1 : prevCount - 1
    );
  };
  const progress = (checkedItems / totalItems) * 100;

  const activityContent = (
    <View>
      {referrals.length > 0 ? (
        referrals.map((referral, index) => (
          <Card key={index}>
            <View style={{ flex: 1, marginBottom: 5 }}>
              <Text style={styles.tabHeader}>{referral.option}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ justifyContent: "space-between" }}>
                <View>
                  <Text style={styles.time}>
                    {formatReferralDate(referral.dateStarted)}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.time, { color: "#465355" }]}>
                    Status: {referral.status}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, textAlign: "right", marginBottom: 5 },
                  ]}
                >
                  Provided By
                </Text>
                <View style={styles.peopleContainer}>
                  <Image
                    source={getProfileImageFromId(referral.referralSenderId)} // Use the image derived from admin.id
                    style={{ width: 30, height: 30, borderRadius: 20 }} // Adjust styling as needed
                  />
                  <Text
                    style={[globalstyles.detailsText, styles.referredByText]}
                  >
                    {referral.referredBy}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.time,
                    { color: "#465355", textAlign: "right" },
                  ]}
                >
                  {referral.organization}
                </Text>
              </View>
            </View>
          </Card>
        ))
      ) : (
        <Text>No activities yet!</Text>
      )}
    </View>
  );

  const formContent = (
    <Card>
      <View>
        {filteredForms.map((form, index) => (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text style={styles.tabHeader}>{form.name}</Text>
              <View
                style={[
                  styles.manageTextContainer,
                  { backgroundColor: "#E7F2F3", borderColor: "#10798B" },
                ]}
              >
                <Text style={[styles.manageText, { color: "#094852" }]}>
                  {form.status}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={[
                    globalstyles.details,
                    { margin: 0, marginBottom: 1, marginRight: 10 },
                  ]}
                >
                  Date Submitted
                </Text>
                <Text>{form.date}</Text>
              </View>
              <View>
                <Text
                  style={[globalstyles.details, { margin: 0, marginBottom: 1 }]}
                >
                  Submitted By
                </Text>
                <View style={styles.peopleContainer}>
                  <Ionicons
                    name="person-circle-outline"
                    size={24}
                    style={{ marginRight: 5 }}
                  />
                  <Text
                    style={[
                      globalstyles.detailsText,
                      {
                        marginHorizontal: 0,
                        marginBottom: 0,
                        flexShrink: 1,
                      },
                    ]}
                  >
                    {form.submittedBy}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );

  const teamContent = (
    // NEED PROFILE PICTURES OF TEAM MEMBERS
    // NEED TO ADD LOGIC FOR GETTING ROLE, ORGANIZATION, DATE ADDED, AND INTERACTIONS
    // WHAT DO THE THREE VERTICAL DOTS DO?
    <View style={{ marginVertical: 5 }}>
      {clientData.team.admins.map((admin, index) => (
        <View style={styles.teamContentContainer} key={index}>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={styles.profileImage}>
              <Image
                source={getProfileImageFromId(admin.id)} // Use the image derived from admin.id
                style={{ width: 40, height: 40, borderRadius: 20 }} // Adjust styling as needed
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text key={index} style={styles.teamMember}>
                {admin.name} {/* Display the admin's name */}
              </Text>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-vertical"
                  size={20}
                  color={"#094852"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <MaterialIcons
                  name="business"
                  size={20}
                  style={{ marginRight: 3, color: "#094852" }}
                />
                <Text style={styles.teamDetails}>organization</Text>
              </View>
              <Text style={[styles.details, { margin: 0 }]}>Date Started</Text>
              <Text style={styles.teamDetails}>*Enter Date Started*</Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <MaterialIcons
                  name="person"
                  size={20}
                  style={{ marginRight: 3, color: "#094852" }}
                />
                <Text style={styles.teamDetails}>*ROLE TYPE GOES HERE*</Text>
              </View>
              <Text style={[styles.details, { margin: 0 }]}>Interactions</Text>
              <Text style={styles.teamDetails}>*Number of Interactions*</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const requestContent = (
    <View>
      {dropdownItems.map((dropdownItem) => {
        let statusText;
        if (dropdownItem === "Housing") {
          statusText = housingStatus;
        } else if (dropdownItem === "Legal Assistance") {
          statusText = legalAssistanceStatus;
        } else if (dropdownItem === "Job Placement") {
          statusText = jobPlacementStatus;
        }
        return (
          <Dropdown title={dropdownItem} key={dropdownItem} status={statusText}>
            <View>
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity
                  style={[globalstyles.buttonContainer, { marginBottom: 10 }]}
                >
                  <Text style={globalstyles.buttonText}>
                    {`Browse more ${dropdownItem.toLowerCase()} options`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalstyles.buttonContainer}>
                  <Text style={globalstyles.buttonText}>Follow up</Text>
                </TouchableOpacity>
              </View>
              <View>
                {dropdownItem === "Housing" && (
                  <RNPickerSelect
                    items={housingStatusItems}
                    onValueChange={(value) => setHousingStatus(value)}
                    value={housingStatus}
                    placeholder={{
                      label: "Manually Update Status",
                      value: null,
                    }}
                    style={{
                      viewContainer: styles.pickerstyle,
                      inputIOS: styles.input,
                      inputAndroid: styles.input,
                      placeholder: styles.placeholder,
                      iconContainer: {
                        top: "50%", // Center icon vertically
                        transform: [{ translateY: -14 }], // Adjust this value to fine-tune the vertical positioning
                      },
                    }}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => (
                      <MaterialIcons
                        name="keyboard-arrow-down"
                        size={30}
                        color="#094852"
                      />
                    )}
                  />
                )}
                {dropdownItem === "Legal Assistance" && (
                  <RNPickerSelect
                    items={legalAssistanceStatusItems} // You should define this array similar to housingStatusItems
                    onValueChange={(value) => setLegalAssistanceStatus(value)}
                    value={legalAssistanceStatus}
                    placeholder={{
                      label: "Manually Update Status",
                      value: null,
                    }}
                    style={{
                      viewContainer: styles.pickerstyle,
                      inputIOS: styles.input,
                      inputAndroid: styles.input,
                      placeholder: styles.placeholder,
                      iconContainer: {
                        top: "50%", // Center icon vertically
                        transform: [{ translateY: -14 }], // Adjust this value to fine-tune the vertical positioning
                      },
                    }}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => (
                      <MaterialIcons
                        name="keyboard-arrow-down"
                        size={30}
                        color="#094852"
                      />
                    )}
                  />
                )}
                {dropdownItem === "Job Placement" && (
                  <RNPickerSelect
                    items={jobPlacementStatusItems} // You should define this array similar to housingStatusItems
                    onValueChange={(value) => setJobPlacementStatus(value)}
                    value={jobPlacementStatus}
                    placeholder={{
                      label: "Manually Update Status",
                      value: null,
                    }}
                    style={{
                      viewContainer: styles.pickerstyle,
                      inputIOS: styles.input,
                      inputAndroid: styles.input,
                      placeholder: styles.placeholder,
                      iconContainer: {
                        top: "50%", // Center icon vertically
                        transform: [{ translateY: -14 }], // Adjust this value to fine-tune the vertical positioning
                      },
                    }}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => (
                      <MaterialIcons
                        name="keyboard-arrow-down"
                        size={30}
                        color="#094852"
                      />
                    )}
                  />
                )}
              </View>
            </View>
          </Dropdown>
        );
      })}
    </View>
  );
  const notesContent = (
    <View style={{ padding: 10 }}>
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Create a Note", {
              headerTitle: `New Note for ${client.fullName}`,
              clientName: client.fullName,
              fromProfile: true, // Add this flag
            })
          }
          style={[
            globalstyles.buttonContainer,
            { backgroundColor: "#FFFFFF", borderRadius: 15, shadowOpacity: 0 },
          ]}
          activeOpacity={0.6}
        >
          <Text style={[globalstyles.buttonText]}>New Note</Text>
        </TouchableOpacity>
      </View>
      {selectedNote ? (
        <View>
          <TouchableOpacity
            onPress={handleBackToNotes}
            style={{ marginBottom: 10 }}
          >
            {/* Using an icon for back button, you can customize this */}
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </TouchableOpacity>
          {/* Note details */}
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold" }}>{selectedNote.title}</Text>
            <Text>{selectedNote.dateCreated}</Text>
            <Text>{selectedNote.content}</Text>
          </View>
        </View>
      ) : // List all notes if none is selected
      notes.length > 0 ? (
        notes.map((note, index) => (
          <TouchableOpacity
            key={index}
            style={[
              globalstyles.optionsContainer,
              { marginVertical: 2, borderWidth: 0 },
            ]}
            onPress={() => onNotePress(index)}
          >
            <View>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteDate}>{note.dateCreated}</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              style={{ color: "#094852" }}
            />
          </TouchableOpacity>
        ))
      ) : (
        <Text>No notes available for this profile.</Text>
      )}
    </View>
  );

  let content;
  switch (selectedItem) {
    case "Activity":
      content = activityContent;
      break;
    case "Request":
      content = requestContent;
      break;
    case "Team":
      content = teamContent;
      break;
    case "Forms":
      content = formContent;
      break;
    case "Notes":
      content = notesContent;
      break;
    default:
      content = <Text>Default Content</Text>; // Default case
  }

  return (
    // RENDER STATUS LOGIC
    <ScrollView style={styles.scrollView}>
      <View style={styles.mainText}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "space-evenly",
          }}
        >
          <View>
            <Image
              source={imageMap[client.image]}
              style={[
                globalstyles.profileImage,
                { width: 80, height: 80, marginRight: 0 },
              ]}
            />
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={globalstyles.details}>Age</Text>
                <Text style={globalstyles.detailsText}>{client.age}</Text>
              </View>
              <View>
                <Text style={globalstyles.details}>Location</Text>
                <Text style={globalstyles.detailsText}>{client.address}</Text>
              </View>
              <View>
                <Text style={globalstyles.details}>Status</Text>
                <Text style={globalstyles.detailsText}>Unhoused</Text>
              </View>
            </View>
            <View style={styles.manageAccountContainer}>
              <View style={styles.manageTextContainer}>
                <Text style={styles.manageText}>You manage this account</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile Admin Settings", {
                    client: client,
                  })
                }
              >
                <Text
                  style={{
                    fontFamily: "gabarito-regular",
                    fontSize: 14,
                    letterSpacing: 0.14,
                    color: "#094852",
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text
              style={[globalstyles.details, { margin: 0, marginBottom: 10 }]}
            >
              Activities
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              // marginHorizontal: 5,
            }}
          >
            {client.services && Array.isArray(client.services)
              ? client.services.map((service, index) => (
                  <View key={index} style={globalstyles.tagBackground}>
                    <Text style={globalstyles.individualTags}>{service}</Text>
                  </View>
                ))
              : null}
          </View>
        </View>
        <View>
          <Text
            style={[
              globalstyles.details,
              { margin: 0, marginTop: 15, marginBottom: 10 },
            ]}
          >
            Service Progress
          </Text>
          <ProgressBar progress={progress} />
        </View>
      </View>
      <View style={styles.serviceContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.serviceHeader}>
            {tabItems.map((sortItem) => (
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
                  <Text
                    style={
                      selectedItem === sortItem
                        ? styles.selectedServiceHeaderItems
                        : styles.serviceHeaderItems
                    }
                  >
                    {sortItem}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={{ marginHorizontal: 5 }}>{content}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F3F8F9",
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

  manageAccountContainer: {
    marginVertical: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },

  manageTextContainer: {
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 15,
    padding: 10,
    borderColor: "#533409",
    backgroundColor: "#F7DEBA",
  },

  manageText: {
    fontFamily: "karla-regular",
    fontSize: 14,
    color: "#533409",
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

  selectedServiceHeaderItems: {
    fontSize: 24,
    color: "#094852",
    fontFamily: "gabarito-medium",
  },

  serviceHeaderItems: {
    fontSize: 24,
    color: "#465355",
    fontFamily: "gabarito-medium",
  },

  servicesContainers: {
    borderWidth: 1,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    // additional styles
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#10798B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#10798B",
  },

  text: {
    fontFamily: "karla-regular",
    color: "#171B1C",
    fontSize: 16,
    letterSpacing: -0.16,
  },

  noteTitle: {
    fontFamily: "gabarito-semibold",
    fontSize: 18,
    paddingBottom: 5,
    color: "#094852",
  },

  noteDate: {
    fontFamily: "karla-regular",
    fontSize: 14,
    color: "#465355",
  },

  teamContentContainer: {
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  teamMember: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#053E5A",
  },

  teamDetails: {
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
    color: "#171B1C",
  },

  pickerstyle: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#B5BABB",
  },

  input: {
    fontSize: 16,
    fontFamily: "karla-regular",
    color: "#094852",
  },

  placeholder: {
    fontSize: 16,
    color: "#094852",
    fontFamily: "karla-regular",
  },

  tabHeader: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#053E5A",
  },

  peopleContainer: {
    alignSelf: "baseline",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#E7F2F3",
    padding: 5,
    paddingLeft: 8,
    marginBottom: 5,
  },

  referredByText: {
    flexShrink: 1,
    flexWrap: "wrap", // This ensures the text wraps to the next line when it exceeds container width
    marginBottom: 0,
  },

  time: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#465355",
  },
});

export default ProfilePage;

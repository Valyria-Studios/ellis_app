import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Card from "../../shared/Card";
import imageMap from "../../shared/getProfileImage";
import globalstyles from "../../shared/globalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const ReferToPerson = ({ route, navigation }) => {
  const { teamMember, selectedClient } = route.params;
  const [reason, setReason] = useState("");

  return (
    <ScrollView style={globalstyles.container} scrollEnabled={false}>
      <View style={styles.cardContainer}>
        <Card>
          <View>
            <Text style={styles.cardHeader}>Basic Profile Information</Text>
          </View>
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
              <Text style={globalstyles.detailsText}>{selectedClient.age}</Text>
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
                  style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
                >
                  Birth Date
                </Text>
                <Text
                  style={[
                    globalstyles.detailsText,
                    { marginBottom: 0, marginHorizontal: 0 },
                  ]}
                >
                  {selectedClient.dob}
                </Text>
              </View>
              <View>
                <Text
                  style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
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
                  style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
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
                  style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
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
        <View>
          <Text style={styles.header}>Reason for referral</Text>
          <Text style={styles.caption}>
            Why are you referring this client to this staff member?
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={"Input reason for referral"}
            value={reason}
            onChangeText={setReason}
            multiline={true}
          />
        </View>
        <SafeAreaView style={{ bottom: -170 }}>
          <TouchableOpacity
            style={[
              globalstyles.buttonContainer,
              {
                backgroundColor: "#10798B",
                borderColor: "#FFFFFF",
                marginTop: 20,
                marginBottom: 5,
                margin: 0,
              },
            ]}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate("Referral Sent", {
                reason,
                teamMember,
                selectedClient,
              })
            }
          >
            <Text style={[globalstyles.buttonText, { color: "#fff" }]}>
              Send
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: -10,
  },
  cardHeader: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#030E07",
    marginBottom: 10,
  },

  header: {
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#094852",
    marginVertical: 10,
  },

  caption: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#465355",
    marginBottom: 10,
  },

  textInput: {
    height: 100,
    borderColor: "#B5BABB",
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default ReferToPerson;

// Logic for Referred by, Status, Started and Completed needed

import { View, Text, StyleSheet, Image } from "react-native";
import Card from "../../shared/Card";
import imageMap from "../../shared/getProfileImage";
import globalstyles from "../../shared/globalStyles";

const ReferralSent = ({ route }) => {
  const { selectedClient, options } = route.params;
  return (
    <View style={globalstyles.container}>
      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: -10,
            marginBottom: 15,
          }}
        >
          <View style={{ flexShrink: 1, marginRight: 10 }}>
            <Text
              style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
            >
              For
            </Text>
            <View style={styles.peopleContainer}>
              <Image
                source={imageMap[selectedClient.image]}
                style={[
                  globalstyles.profileImage,
                  {
                    width: 24,
                    height: 24,
                    borderWidth: 1,
                    borderColor: "#ffffff",
                  },
                ]}
              />
              <Text
                style={[
                  globalstyles.detailsText,
                  styles.people,
                  { marginHorizontal: 0, marginBottom: 0 },
                ]}
              >
                {selectedClient.fullName}
              </Text>
            </View>
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text
              style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
            >
              Referred by
            </Text>
            <View style={styles.peopleContainer}>
              <Image
                source={imageMap[selectedClient.image]}
                style={[
                  globalstyles.profileImage,
                  {
                    width: 24,
                    height: 24,
                    borderWidth: 1,
                    borderColor: "#ffffff",
                  },
                ]}
              />
              <Text
                style={[
                  globalstyles.detailsText,
                  styles.people,
                  { marginHorizontal: 0, marginBottom: 0 },
                ]}
              >
                Some Person
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text
              style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
            >
              Status
            </Text>
            <View style={styles.submit}>
              <Text style={styles.submitText}>Submitted</Text>
            </View>
          </View>
          <View>
            <Text
              style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
            >
              Started
            </Text>
            <Text
              style={[
                globalstyles.detailsText,
                { marginBottom: 0, marginHorizontal: 0 },
              ]}
            >
              12/08/2023
            </Text>
          </View>
          <View>
            <Text
              style={[globalstyles.details, { margin: 0, marginBottom: 5 }]}
            >
              Completed
            </Text>
            <Text
              style={[
                globalstyles.detailsText,
                { marginBottom: 0, marginHorizontal: 0 },
              ]}
            >
              --
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  people: {
    flexShrink: 1,
  },

  peopleContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#E7F2F3",
    padding: 5,
  },

  submit: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#E7F2F3",
    borderWidth: 1,
    borderColor: "#4094A2",
    justifyContent: "center",
  },

  submitText: {
    color: "#094852",
    fontFamily: "karla-regular",
    fontSize: 14,
  },
});

export default ReferralSent;

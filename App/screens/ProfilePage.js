import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalstyles from "../shared/globalStyles";

function ProfilePage({ route }) {
  const { client } = route.params;
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
            </View>
          </View>
        </View>
        <View style={styles.serviceContainer}>
          <Text> hello </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 400,    
  },

  scrollView: {
    flex: 1,
  },

  mainText: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
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
    backgroundColor: 'red',
  },
});

export default ProfilePage;

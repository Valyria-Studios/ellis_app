import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Card from "../../shared/Card";
import globalstyles from "../../shared/globalStyles";
import { Feather, Octicons, Ionicons } from "@expo/vector-icons";
import imageMap from "../../shared/getProfileImage";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectClientWithLocation = ({ route }) => {
  const { option, selectedAmenity } = route.params;
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/Clients");
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setClients(data);
        setFilteredClients(data); // Initially, no filter is applied
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchClients();
  }, []);

  useEffect(() => {
    // Filter clients based on the search query
    const filtered =
      searchQuery.trim() === ""
        ? []
        : clients.filter((client) =>
            client.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

    setFilteredClients(filtered);
  }, [searchQuery, clients]);

  return (
    <View
      style={[
        globalstyles.container,
        {
          paddingHorizontal: 5,
          justifyContent: "space-between",
          paddingTop: 10,
        },
      ]}
    >
      <View>
        <Card>
          <Text style={styles.optionText}>{option}</Text>
          <View>
            <Text style={styles.title}>{selectedAmenity.location}</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
              }}
            >
              <Octicons name="location" size={18} color={"#094852"} />
              <Text style={styles.amenityText}>{selectedAmenity.address}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
              }}
            >
              <Feather name="clock" size={16} color={"#094852"} />
              <Text style={styles.amenityText}>
                {selectedAmenity.operationalHours}
              </Text>
            </View>
          </View>
        </Card>
        <Text style={styles.questionText}>Who is this referral for?</Text>
        <View
          style={[
            globalstyles.searchContainer,
            {
              flex: 0,
              padding: 5,
              borderRadius: 10,
              borderColor: "#10798B",
              marginTop: 10,
            },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={25}
            color="#465355"
            style={[globalstyles.searchIcon, { borderColor: "#465355" }]}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Type name to pull up existing client"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View
          style={[
            searchQuery.trim() !== ""
              ? styles.floatingListContainer
              : { display: "none" },
          ]}
        >
          <FlatList
            data={filteredClients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.clientItem}
                onPress={() => console.log("Client selected:", item.name)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={imageMap[item.image]}
                    style={styles.profileImage}
                  />
                  <Text style={styles.clientName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divderLines} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divderLines} />
        </View>
        <TouchableOpacity
          style={[globalstyles.buttonContainer, { borderRadius: 10 }]}
          activeOpacity={0.6}
        >
          <View>
            <Text style={globalstyles.buttonText}>Create new client</Text>
          </View>
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        <TouchableOpacity
          style={[
            globalstyles.buttonContainer,
            { backgroundColor: "#10798B", marginTop: 20 },
          ]}
          activeOpacity={0.6}
        >
          <Text style={[globalstyles.buttonText, { color: "#fff" }]}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  optionText: {
    fontFamily: "gabarito-regular",
    fontSize: 12,
    color: "#465355",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  title: {
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#094852",
    marginTop: 5,
  },

  amenityText: {
    fontFamily: "gabarito-regular",
    color: "#094852",
    fontSize: 18,
    paddingLeft: 10,
  },

  questionText: {
    fontFamily: "gabarito-semibold",
    fontSize: 24,
    color: "#171B1C",
    marginTop: 15,
  },
  clientItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  clientName: {
    fontSize: 18,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 15,
  },

  searchBar: {
    marginVertical: 10,
    fontSize: 18,
    color: "#909899",
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 45,
    marginVertical: 20,
  },

  divderLines: {
    flex: 1,
    height: 1,
    backgroundColor: "#909899",
  },

  dividerText: {
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#909899",
    fontFamily: "gabarito-regular",
    fontWeight: 400,
    letterSpacing: 2.4,
    textTransform: "uppercase",
  },

  // Add to your StyleSheet to style the floating FlatList container
  floatingListContainer: {
    position: "absolute",
    top: 270, // Adjust this value based on the search bar's height + marginTop
    left: 0,
    right: 0,
    backgroundColor: "white", // or any color that matches your theme
    zIndex: 1, // Ensure it overlays other content
    marginHorizontal: 10,
  },
});

export default SelectClientWithLocation;

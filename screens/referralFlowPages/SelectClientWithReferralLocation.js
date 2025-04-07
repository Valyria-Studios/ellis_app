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

const SelectClientWithLocation = ({ route, navigation }) => {
  const { option, selectedService } = route.params;
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://ellis-test-data.com:8000/Clients"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setClients(data);
        setFilteredClients(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const filtered =
      searchQuery.trim() === ""
        ? []
        : clients.filter((client) =>
            client.fullName.toLowerCase().includes(searchQuery.toLowerCase())
          );

    setFilteredClients(filtered);
  }, [searchQuery, clients]);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setSearchQuery("");
  };

  const clearSelection = () => {
    setSelectedClient(null);
    setSearchQuery("");
  };

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
            <Text style={styles.title}>{selectedService.name}</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
              }}
            >
              <Octicons name="location" size={18} color={"#094852"} />
              <Text style={styles.amenityText}>
                {selectedService.attributes?.["Street address"]?.trim() ||
                  "Street address not available"}
              </Text>
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
                {selectedService.attributes?.["Working hours"] ||
                  "Operational hours not available"}
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
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchBar}
              placeholder={
                selectedClient ? "" : "Type name to pull up existing client"
              }
              value={searchQuery}
              onChangeText={setSearchQuery}
              editable={!selectedClient}
            />

            {selectedClient && (
              <View style={styles.selectedClientContainer}>
                <Text style={styles.selectedClientName}>
                  {selectedClient.fullName}
                </Text>
                <TouchableOpacity
                  onPress={clearSelection}
                  style={styles.removeButton}
                >
                  <Feather name="x" size={20} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>
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
                onPress={() => handleSelectClient(item)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={imageMap[item.image]}
                    style={styles.profileImage}
                  />
                  <Text style={styles.clientName}>{item.fullName}</Text>
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
          onPress={() => navigation.navigate("Create New Client")}
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
          onPress={() =>
            navigation.navigate("Enrollment Form", {
              selectedClient: selectedClient,
              selectedService: selectedService,
              option,
            })
          }
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

  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
  },

  selectedClientContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedClientName: {
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
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

  floatingListContainer: {
    position: "absolute",
    top: 260,
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 1,
    marginHorizontal: 10,
  },
});

export default SelectClientWithLocation;

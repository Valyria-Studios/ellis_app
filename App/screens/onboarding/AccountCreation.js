import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { authSupabase } from "../../api/supabaseClient";
import { useUser } from "../../context/userContext";

const AccountCreation = () => {
  const { user, fetchUserProfile } = useUser();

  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);

  // dropdown state
  const [orgList, setOrgList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNonprofits = async () => {
      const { data, error } = await authSupabase
        .from("nonprofits")
        .select("id, name");

      if (error) {
        console.error("Failed to fetch nonprofits:", error);
        return;
      }

      console.log(data);

      const formatted = data.map((np) => ({
        label: np.name,
        value: np.id, // Or use `np.id` if storing ID instead
      }));

      setOrgList(formatted);
    };

    fetchNonprofits();
  }, []);

  const handleAccountCreation = async () => {
    setLoading(true);

    if (!name || !organization) {
      Alert.alert("Error", "All fields are required.");
      setLoading(false);
      return;
    }

    try {
      if (!user || !user.id) {
        Alert.alert("Error", "User not authenticated.");
        setLoading(false);
        return;
      }

      const { error } = await authSupabase.from("users").upsert([
        {
          user_id: user.id,
          email: user.email,
          name,
          organization,
          clients: [],
          servicedetails: [],
        },
      ]);

      if (error) throw error;

      await fetchUserProfile(user.id);
      Alert.alert("Success", "Account setup complete!");
    } catch (error) {
      console.error("Account Creation Error:", error);
      Alert.alert("Error", error.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 40 }} />
      <Text style={styles.header}>Complete Your Profile</Text>
      <Text style={styles.subHeader}>
        Enter your name and organization details to complete your registration.
      </Text>

      <TextInput
        placeholder="Full Name"
        style={styles.textInput}
        value={name}
        onChangeText={setName}
      />

      <DropDownPicker
        open={open}
        value={organization}
        items={orgList}
        setOpen={setOpen}
        setValue={setOrganization}
        setItems={setOrgList}
        searchable={true}
        placeholder="Select Organization"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAccountCreation}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Complete Setup"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8F9",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  textInput: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  dropdown: {
    backgroundColor: "white",
    borderColor: "#ddd",
    marginBottom: 15,
  },
  dropdownContainer: {
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#10798B",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AccountCreation;

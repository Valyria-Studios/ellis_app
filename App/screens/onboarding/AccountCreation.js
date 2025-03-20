import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authSupabase } from "../../api/supabaseClient"; // Import Supabase client
import { useUser } from "../../context/userContext";

const AccountCreation = () => {
  const { user, fetchUserProfile } = useUser();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle account creation
  const handleAccountCreation = async () => {
    setLoading(true);

    if (!name || !organization) {
      Alert.alert("Error", "All fields are required.");
      setLoading(false);
      return;
    }

    try {
      if (!user || !user.id) {
        Alert.alert("Error", "User not authenticated. Please log in again.");
        setLoading(false);
        return;
      }

      console.log("Authenticated User:", user);
      console.log("User ID:", user.id);

      // ✅ Insert user profile
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

      // ✅ Fetch updated profile
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
      <View style={{ margin: 40 }}></View>
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
      <TextInput
        placeholder="Organization"
        style={styles.textInput}
        value={organization}
        onChangeText={setOrganization}
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

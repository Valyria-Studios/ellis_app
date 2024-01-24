import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AdminManagementScreen = ({ route, navigation }) => {
  const { client } = route.params;
  const [currentClient, setCurrentClient] = useState(client); // Use the passed client

  const handleMoveToMembers = async (adminName) => {
    // Update the admins and members lists
    const updatedAdmins = currentClient.team.admins.filter(
      (admin) => admin !== adminName
    );
    const updatedMembers = [...currentClient.team.members, adminName];

    try {
      const response = await fetch(
        `http://localhost:3000/Clients/${currentClient.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...currentClient,
            team: {
              admins: updatedAdmins,
              members: updatedMembers,
            },
          }),
        }
      );

      if (response.ok) {
        // Update local state
        const newClientData = {
          ...currentClient,
          team: {
            admins: updatedAdmins,
            members: updatedMembers,
          },
        };
        setCurrentClient(newClientData);
      } else {
        throw new Error("Failed to update data on the server");
      }
    } catch (error) {
      console.error("Error updating team data:", error);
    }
  };
  return (
    <View style={styles.container}>
      {currentClient.team.admins.map((admin, index) => (
        <View key={index} style={styles.adminRow}>
          <Text style={styles.adminText}>{admin}</Text>
          <TouchableOpacity
            onPress={() => handleMoveToMembers(admin)}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // styles
  },
  adminRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // more styles
  },
  adminText: {
    // styles
  },
  removeText: {
    color: "red",
    // more styles
  },
});

export default AdminManagementScreen;

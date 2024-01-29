import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import globalstyles from "../shared/globalStyles";

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
    <View style={globalstyles.container}>
      <Text style={styles.header}>Current Admins</Text>
      {currentClient.team.admins.map((admin, index) => (
        <View key={index} style={styles.adminRow}>
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              paddingVertical: 10,
              backgroundColor: "#E7F2F3",
            }}
          >
            <Text style={styles.adminText}>{admin}</Text>
          </View>
          <View
            style={{
              paddingLeft: 10,
              paddingVertical: 11,
              backgroundColor: "#F3F8F9",
            }}
          >
            <TouchableOpacity onPress={() => handleMoveToMembers(admin)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "gabarito-regular",
    fontSize: 18,
    color: "#030E07",
    marginBottom: 5,
  },
  adminRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // more styles
  },
  adminText: {
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
    color: "#171B1C",
    paddingLeft: 5,
  },
  removeText: {
    color: "#094852",
    // more styles
  },
});

export default AdminManagementScreen;

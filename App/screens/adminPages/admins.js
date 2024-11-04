import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import globalstyles from "../../shared/globalStyles";
import { ScrollView } from "react-native-gesture-handler";

function AdminPage() {
  const [amenities, setAmenities] = useState([]); // State to hold the list of amenities

  useEffect(() => {
    fetch("https://ellis-test-data.com:8000/Amenities")
      .then((response) => response.json())
      .then((data) => {
        setAmenities(data); // Store the amenities data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleMoveToMembers = async (adminName, amenityId) => {
    // Find the specific amenity
    const amenityToUpdate = amenities.find(
      (amenity) => amenity.id === amenityId
    );

    if (!amenityToUpdate) {
      console.error("Amenity not found");
      return;
    }

    // Update the admins and members lists
    const updatedAdmins = amenityToUpdate.team.admins.filter(
      (admin) => admin !== adminName
    );
    const updatedMembers = [...amenityToUpdate.team.members, adminName];

    try {
      const response = await fetch(
        `https://ellis-test-data.com:8000/Amenities/${amenityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...amenityToUpdate,
            team: {
              admins: updatedAdmins,
              members: updatedMembers,
            },
          }),
        }
      );

      if (response.ok) {
        // Update local state
        setAmenities((prevAmenities) =>
          prevAmenities.map((amenity) =>
            amenity.id === amenityId
              ? {
                  ...amenity,
                  team: { admins: updatedAdmins, members: updatedMembers },
                }
              : amenity
          )
        );
      } else {
        throw new Error("Failed to update data on the server");
      }
    } catch (error) {
      console.error("Error updating team data:", error);
    }
  };

  const handleAddAdmin = async (memberName, amenityId) => {
    // Find the specific amenity
    const amenityToUpdate = amenities.find(
      (amenity) => amenity.id === amenityId
    );

    if (!amenityToUpdate) {
      console.error("Amenity not found");
      return;
    }

    // Check if member is already an admin
    if (amenityToUpdate.team.admins.includes(memberName)) {
      alert("This member is already an admin.");
      return;
    }

    // Update the admins and members lists
    const updatedAdmins = [...amenityToUpdate.team.admins, memberName];
    const updatedMembers = amenityToUpdate.team.members.filter(
      (member) => member !== memberName
    );

    try {
      const response = await fetch(
        `https://ellis-test-data.com:8000/Amenities/${amenityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...amenityToUpdate,
            team: {
              admins: updatedAdmins,
              members: updatedMembers,
            },
          }),
        }
      );

      if (response.ok) {
        // Update local state
        setAmenities((prevAmenities) =>
          prevAmenities.map((amenity) =>
            amenity.id === amenityId
              ? {
                  ...amenity,
                  team: { admins: updatedAdmins, members: updatedMembers },
                }
              : amenity
          )
        );
      } else {
        throw new Error("Failed to update data on the server");
      }
    } catch (error) {
      console.error("Error updating team data:", error);
    }
  };

  return (
    <ScrollView>
      <View style={[globalstyles.container, { paddingTop: 10 }]}>
        {amenities.map((amenity) => (
          <View key={amenity.id}>
            <Text style={styles.header}>{amenity.location} Admins</Text>
            {amenity.team.admins.map((admin, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.adminName}>{admin}</Text>
                <Button
                  title="Remove"
                  onPress={() => handleMoveToMembers(admin, amenity.id)}
                />
              </View>
            ))}
          </View>
        ))}
        <Text style={globalstyles.header}>Add Admins</Text>
        {amenities.map((amenity) => (
          <View key={amenity.id}>
            {amenity.team.members.map((member, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.memberName}>{member}</Text>
                <Button
                  title="Add as Admin"
                  onPress={() => handleAddAdmin(member, amenity.id)}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontFamily: "gabarito-semibold",
    color: "#030E07",
  },
  adminName: {
    fontSize: 16,
    color: "#000",
  },
  memberName: {
    fontSize: 16,
    color: "#000",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default AdminPage;

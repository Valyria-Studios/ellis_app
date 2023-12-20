import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import globalstyles from "../../shared/globalStyles";

const OrgProfile = () => {
  const [account, setAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableAddress, setEditableAddress] = useState("");
  const [editablePhoneNumber, setEditablePhoneNumber] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/Accounts")
      .then((response) => response.json())
      .then((data) => {
        const firstAccount = data[0];
        setAccount(firstAccount);
        setEditableAddress(
          firstAccount.organization.formattedLocations[0].address
        );
        setEditablePhoneNumber(
          firstAccount.organization.formattedLocations[0].phoneNumber
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updateAccountDetails = async () => {
    try {
      const updatedAccount = {
        ...account,
        organization: {
          ...account.organization,
          formattedLocations: [
            {
              ...account.organization.formattedLocations[0],
              address: editableAddress,
              phoneNumber: editablePhoneNumber,
            },
          ],
        },
      };

      const response = await fetch(
        `http://localhost:3000/Accounts/${account.id}`,
        {
          method: "PUT", // or 'POST', depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAccount),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setAccount(data); // Update the local state with the response
      alert("Account updated successfully.");
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account.");
    }
  };

  const handleEditSave = () => {
    if (isEditing) {
      updateAccountDetails();
    }
    setIsEditing(!isEditing);
  };

  return (
    <ScrollView style={globalstyles.container}>
      <TouchableOpacity onPress={handleEditSave} style={styles.editButton}>
        <Text>{isEditing ? "Save" : "Edit"}</Text>
      </TouchableOpacity>

      {/* ... other views ... */}

      <View style={{ marginVertical: 10 }}>
        <Text>Address</Text>
        <TextInput
          editable={isEditing}
          onChangeText={setEditableAddress}
          value={editableAddress}
          style={isEditing ? styles.editable : styles.nonEditable}
        />
        <Text>Phone Number</Text>
        <TextInput
          editable={isEditing}
          onChangeText={setEditablePhoneNumber}
          value={editablePhoneNumber}
          style={isEditing ? styles.editable : styles.nonEditable}
        />
        <Text>Website</Text>
        <Text>Social Media</Text>
        <Text>Tags</Text>
      </View>
      <View>
        <Text>Services</Text>
        <View>
          <Text>Cards for each Service</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  editButton: { alignItems: "flex-end", padding: 10 },
  editable: { borderWidth: 1, borderColor: "gray", padding: 5, margin: 5 },
  nonEditable: { padding: 5, margin: 5 },
});

export default OrgProfile;

// import React, { useState, useEffect } from "react";
// import { Text, View, ScrollView } from "react-native";
// import globalstyles from "../../shared/globalStyles";

// const OrgProfile = () => {
//   const [account, setAccount] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:3000/Accounts")
//       .then((response) => response.json())
//       .then((data) => {
//         setAccount(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <ScrollView style={globalstyles.container}>
//       <View>
//         <Text style={[globalstyles.title, { fontSize: 30 }]}>hello</Text>
//       </View>
//       <View style={{ marginVertical: 10 }}>
//         <Text>Some Image</Text>
//       </View>
//       <View style={{ marginVertical: 10 }}>
//         <Text>Address</Text>
//         <Text>Phone Number</Text>

//       </View>

//     </ScrollView>
//   );
// };

// export default OrgProfile;

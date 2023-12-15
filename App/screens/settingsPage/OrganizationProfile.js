import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import globalstyles from "../../shared/globalStyles";

const OrgProfile = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/Accounts")
      .then((response) => response.json())
      .then((data) => {
        setAccount(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={globalstyles.container}>
      <View>
        <Text style={[globalstyles.title, { fontSize: 30 }]}>hello</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text>Some Image</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text>Address</Text>
        <Text>Phone Number</Text>
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

export default OrgProfile;

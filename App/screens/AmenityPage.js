import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function AmenityPage({ route }) {
  const { amenity } = route.params;
  return (
    <View>
      <Text>{amenity.location}</Text>
    </View>
  );
}

export default AmenityPage;

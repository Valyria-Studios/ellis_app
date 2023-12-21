import React, { useState } from "react";
import { View, Button, Text, SafeAreaView } from "react-native";
import ChecklistItem from "../shared/CheckBox";

function RequestLegalAid({ navigation }) {
  const [selectedCategories, setSelectedCategories] = useState({
    food: false,
    legal: false,
    home: false,
  });

  const handleSelectCategory = (category) => {
    setSelectedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <SafeAreaView>
      <View>
        <ChecklistItem
          value={selectedCategories.food}
          onToggle={() => handleSelectCategory("food")}
        />
        <Text>Food</Text>

        <ChecklistItem
          value={selectedCategories.legal}
          onToggle={() => handleSelectCategory("legal")}
        />
        <Text>Legal</Text>

        <ChecklistItem
          value={selectedCategories.home}
          onToggle={() => handleSelectCategory("home")}
        />
        <Text>Home</Text>

        <Button
          title="Go to Questions"
          onPress={() =>
            navigation.navigate("Questions", { selectedCategories })
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default RequestLegalAid;

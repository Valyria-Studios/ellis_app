import React, { useState } from "react";
import { View, Button, Text, CheckBox } from "react-native";

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
    <View>
      <CheckBox
        value={selectedCategories.food}
        onValueChange={() => handleSelectCategory("food")}
      />
      <Text>Food</Text>

      <CheckBox
        value={selectedCategories.legal}
        onValueChange={() => handleSelectCategory("legal")}
      />
      <Text>Legal</Text>

      <CheckBox
        value={selectedCategories.home}
        onValueChange={() => handleSelectCategory("home")}
      />
      <Text>Home</Text>

      <Button
        title="Go to Questions"
        onPress={() => navigation.navigate("Questions", { selectedCategories })}
      />
    </View>
  );
}

export default RequestLegalAid;

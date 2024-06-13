// RENDER PROFILE PAGE DEPENDING ON THE USER, PROBABLY A CONTEXT THING

import React, { useState, useEffect } from "react";
import { View, TextInput, Image } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import globalstyles from "../shared/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchComponent = ({ searchInput, setSearchInput }) => {
  const navigation = useNavigation();
  const [client, setClient] = useState();

  const handlePress = () => {
    navigation.navigate("Profile Page", { client: client[0] });
  };

  useEffect(() => {
    fetch("http://ec2-54-227-106-154.compute-1.amazonaws.com:8000/Clients")
      .then((response) => response.json())
      .then((data) => {
        setClient(data);
      });
  }, []);

  return (
    <View style={globalstyles.searchSection}>
      <View style={globalstyles.searchContainer}>
        <Icon
          name="search-outline"
          size={25}
          color="#616a6c"
          style={globalstyles.searchIcon}
        />
        <TextInput
          blurOnSubmit={true}
          style={globalstyles.searchBar}
          value={searchInput}
          onChangeText={setSearchInput}
          placeholder="Type in keyword"
        />
      </View>
      <TouchableOpacity activeOpacity={1} onPress={handlePress}>
        <Image
          source={require("../assets/images/userImage1.jpg")}
          style={[
            globalstyles.profileImage,
            { marginLeft: 10, width: 45, height: 45 },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchComponent;

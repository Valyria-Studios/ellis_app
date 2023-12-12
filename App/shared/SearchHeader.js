import React from "react";
import { View, TextInput } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import globalstyles from "../shared/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchComponent = ({ searchInput, setSearchInput }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Request Services Page");
  };

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
        <Fontisto
          name="nav-icon-grid-a"
          size={20}
          color="#094851"
          style={globalstyles.gridIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchComponent;

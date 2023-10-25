import React from "react";
import { View, TextInput } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import globalstyles from "../shared/globalStyles";

const SearchComponent = ({ searchInput, setSearchInput }) => {
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
      <Fontisto
        name="nav-icon-grid-a"
        size={20}
        color="#094851"
        style={globalstyles.gridIcon}
      />
    </View>
  );
};

export default SearchComponent;

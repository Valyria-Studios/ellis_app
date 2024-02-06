import React from "react";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

const renderIcon = (iconName, library, style) => {
  switch (library) {
    case "Ionicons":
      return <Ionicons name={iconName} size={20} style={style} />;
    case "MaterialIcons":
      return <MaterialIcons name={iconName} size={20} style={style} />;
    case "FontAwesome5":
      return <FontAwesome5 name={iconName} size={20} style={style} />;
    case "Feather":
      return <Feather name={iconName} size={20} style={style} />;
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons name={iconName} size={20} style={style} />;
    default:
      return null;
  }
};

export default renderIcon;

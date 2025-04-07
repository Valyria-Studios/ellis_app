import React from "react";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

const renderIcon = (iconName, library, style, size) => {
  switch (library) {
    case "Ionicons":
      return <Ionicons name={iconName} size={size} style={style} />;
    case "MaterialIcons":
      return <MaterialIcons name={iconName} size={size} style={style} />;
    case "FontAwesome5":
      return <FontAwesome5 name={iconName} size={size} style={style} />;
    case "Feather":
      return <Feather name={iconName} size={size} style={style} />;
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons name={iconName} size={size} style={style} />;
    default:
      return null;
  }
};

export default renderIcon;

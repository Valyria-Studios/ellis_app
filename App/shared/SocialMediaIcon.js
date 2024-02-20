import React from "react";
import { View, TouchableOpacity, Linking } from "react-native";
import {
  FontAwesome,
  Entypo,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

const getSocialMediaIcon = (socialMediaName) => {
  switch (socialMediaName) {
    case "Instagram":
      return { icon: "instagram-with-circle", library: Entypo, size: 24 };
    case "Snapchat":
      return { icon: "snapchat", library: FontAwesome, size: 24 };
    case "Facebook":
      return { icon: "facebook", library: FontAwesome5, size: 24 };
    case "TikTok":
      // Assuming TikTok icon is in MaterialCommunityIcons for example
      return { icon: "tiktok", library: FontAwesome5, size: 20 };
    case "X":
      return { icon: "twitter-with-circle", library: Entypo, size: 24 };
    case "LinkedIn":
      return { icon: "linkedin-with-circle", library: Entypo, size: 24 };
    // Add more cases as needed
    default:
      return { icon: "question-circle", library: FontAwesome, size: 24 };
  }
};
const SocialMediaLinks = ({ socialMedia }) => {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Object.entries(socialMedia).map(([key, value], index) => {
        const { icon, library: IconComponent, size } = getSocialMediaIcon(key);
        const iconStyle = index === 0 ? {marginRight: 10} : {marginHorizontal: 10}
        return (
          <TouchableOpacity
            key={key}
            onPress={() => openLink(value)}
            style={iconStyle}
          >
            <IconComponent name={icon} size={size} color="#1A3E2F" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SocialMediaLinks;

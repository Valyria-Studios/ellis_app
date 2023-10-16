function getAmenityImage(location) {
  switch (location) {
    case "school":
      return require("../assets/images/location1.jpg");
    case "fitness":
      return require("../assets/images/location2.jpg");
    case "plaza":
      return require("../assets/images/location3.jpg");
    case "haircuts":
      return require("../assets/images/location4.jpg");
    case "restaurant":
      return require("../assets/images/location5.jpg");
    case "sleeping":
      return require("../assets/images/location6.jpg");
    case "nail salon":
      return require("../assets/images/location7.jpg");
    case "night school":
      return require("../assets/images/location8.jpg");
    default:
      return null; // or return a default image if you have one
  }
}

export default getAmenityImage;

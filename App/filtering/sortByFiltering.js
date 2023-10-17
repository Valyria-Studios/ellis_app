export const getSortedAmenities = (amenities, sortCriteria) => {
  let sortedAmenities = [...amenities]; // create a copy to avoid modifying the original
  switch (sortCriteria) {
    case "Distance":
      return sortedAmenities.sort((a, b) => {
        const distanceA = convertToFeet(a.distance);
        const distanceB = convertToFeet(b.distance);
        return distanceA - distanceB;
      });
    // Add other sorting criteria as needed
    default:
      return amenities; // if no criteria or unknown, return original order
  }
};

const convertToFeet = (distanceStr) => {
  const [value, unit] = distanceStr.split(" ");
  const number = parseFloat(value);

  if (unit === "mile" || unit === "miles") {
    return number * 5280; // 1 mile = 5280 feet
  } else if (unit === "feet" || unit === "foot") {
    return number;
  } else {
    console.warn(`Unknown distance unit: ${unit}`);
    return 0;
  }
};

const parseTime = (timeString) => {
  const [time, period] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period.toLowerCase() === "pm" && hours < 12) {
    hours += 12;
  } else if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0; // Convert 12 am to 00 hours
  }
  return { hours, minutes };
};

const isAmenityOpenNow = (amenity, currentTime = new Date()) => {
  // Handle 24 hours differently
  if (amenity.operationalHours === "24 Hours") {
    return true;
  }

  const opening = parseTime(amenity.openingHour);
  const closing = parseTime(amenity.closingHour);

  let openingTime = new Date(currentTime);
  let closingTime = new Date(currentTime);

  openingTime.setHours(opening.hours, opening.minutes, 0, 0);
  closingTime.setHours(closing.hours, closing.minutes, 0, 0);

  // If closing time is less than opening time, it means the closing time is on the next day
  if (closingTime < openingTime) {
    closingTime.setDate(closingTime.getDate() + 1);
  }

  return currentTime >= openingTime && currentTime < closingTime;
};

// Function to filter amenities that are open now
const filterOpenNowAmenities = (amenitiesList) => {
  return amenitiesList.filter(amenity => isAmenityOpenNow(amenity));
};

export { isAmenityOpenNow, filterOpenNowAmenities };

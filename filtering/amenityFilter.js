// amenityFilters.js

// Exporting categories as they are needed by the applyCategoryFilter function
export const categories = [
  "food",
  "shelter",
  "hygiene",
  "health",
  "work & learn",
  "finance",
];

export const applyFiltersAndSort = (
  Amenities,
  searchInput,
  selectedCategoryFilter,
  sortCriteria,
  applyCategoryFilter,
  filterOpenNowAmenities,
  getSortedAmenities
) => {
  let result = Amenities;

  // Apply Search Filter
  if (searchInput) {
    result = result.filter((amenity) =>
      amenity.location.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  // Apply Category Filter
  if (selectedCategoryFilter) {
    result = applyCategoryFilter(selectedCategoryFilter, result);
  }

  // Apply Open Now Filter
  if (sortCriteria === "Open Now") {
    result = filterOpenNowAmenities(result);
  }

  // Apply Sort Criteria
  if (sortCriteria) {
    result = getSortedAmenities(result, sortCriteria);
  }

  return result;
};

export const applyCategoryFilter = (category, amenities) => {
  if (category === "All") {
    return amenities;
  } else if (category === "Other") {
    return amenities.filter(
      (amenity) =>
        !amenity.type.some((typeValue) =>
          categories.includes(typeValue.toLowerCase())
        )
    );
  } else {
    return amenities.filter((amenity) =>
      amenity.type.some(
        (typeValue) => typeValue.toLowerCase() === category.toLowerCase()
      )
    );
  }
};

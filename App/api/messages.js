export const fetchMessages = async () => {
  // Simulate an API call
  // In a real scenario, replace this with an actual API fetch.
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: "Steve Binnquist",
          message: "Lorem ipsum...",
          timestamp: "Just Now",
          //   image: "path_to_image.jpg",
        },
        {
          name: "Kent McCormick",
          message: "Lorem ipsum dolor sit amet...",
          timestamp: "3:35pm",
          // image: require("./path_to_image.jpg"),
        },
        // ... other entries ...
      ]);
    }, 2000);
  });
};

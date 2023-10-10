export const fetchChats = async () => {
  // Simulate an API call
  // In a real scenario, replace this with an actual API fetch.
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: "Steve Binnquist",
          message: "Lorem ipsum...",
          timestamp: "Just Now",
          image: require("../assets/userImage1.jpg"),
        },
        {
          name: "Kent McCormick",
          message: "Lorem ipsum dolor sit amet...",
          timestamp: "3:35pm",
          image: require("../assets/userImage2.jpg"),
        },
        {
          name: "Robert Trace",
          message: "Lorem ipsum dolor sit amet...",
          timestamp: "2:00pm",
          image: require("../assets/userImage3.jpg"),
        },
        {
          name: "Timothy Horton",
          message: "Lorem ipsum dolor sit amet...",
          timestamp: "Yesterday",
          image: require("../assets/userImage4.jpg"),
        },
        {
          name: "Andrew Stilt",
          message: "Lorem ipsum dolor sit amet...",
          timestamp: "6:00am",
          image: require("../assets/userImage5.jpg"),
        },
        {
          name: "Travis Stalker",
          message: "Lorem ipsum dolor sit amet...",
          timestamp: "3:35pm",
          image: require("../assets/userImage6.jpg"),
        },
        {
          name: "Henry Mince",
          message: "Lorem ipsum dolor sit amet...",
          timestamp: "3:35pm",
          image: require("../assets/userImage7.jpg"),
        },
        {
          name: "Tracy Toggler",
          message: "Lorem ipsum dolor sit amet...",
          timestamp: "3:35pm",
          image: require("../assets/userImage8.jpg"),
        },
        // ... other entries ...
      ]);
    });
  });
};

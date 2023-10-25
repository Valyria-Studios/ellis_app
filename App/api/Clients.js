//should be replaced with an API fetch

const Clients = [
  {
    name: "John Smith",
    status: "Current", //should be dependent on progress bar and if they are working with providers
    recency: "last week", //should be rendered and updated from backend
    services: [
      "Haircut",
      "Financial Aid",
      "Celebrate Recovery",
      "Food",
      "Sleep",
    ], //should be dependent on the services they signed up for
    providers: "Receiving service from 5 providers", //should be dynamically rendered depending on status
    image: require("../assets/images/userImage1.jpg"),
    key: "1",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Tim Langston",
    status: "Past", //should be dependent on progress bar and if they are working with providers
    recency: "Jan 2024", //should be rendered and updated from backend depending on current date
    services: [
      "Haircut",
      "Financial Aid",
      "Celebrate Recovery",
      "Housing Documentation",
    ], //should be dependent on the services they signed up for
    providers: "Received 16 services from 5 providers", //should be dynamically rendered depending on status
    image: require("../assets/images/userImage2.jpg"),

    key: "2",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Oscar Simmons",
    status: "Requested", //should be dependent on progress bar and if they are working with providers
    recency: "yesterday", //should be rendered and updated from backend
    services: ["Haircut", "Financial Aid", "Celebrate Recovery"], //should be dependent on the services they signed up for
    providers: "", //should be dynamically rendered depending on status
    image: require("../assets/images/userImage3.jpg"),
    key: "3",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Jackie Smith",
    status: "Past", //should be dependent on progress bar and if they are working with providers
    recency: "Mar 2024", //should be rendered and updated from backend
    services: ["Haircut", "Financial Aid", "Celebrate Recovery"], //should be dependent on the services they signed up for
    providers: "Received 3 servies from 1 provider", //should be dynamically rendered depending on status
    image: require("../assets/images/userImage4.jpg"),
    key: "4",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Timothy Sanders",
    status: "Requested", //should be dependent on progress bar and if they are working with providers
    recency: "6 hours ago", //should be rendered and updated from backend
    services: ["Haircut", "Financial Aid", "Celebrate Recovery"], //should be dependent on the services they signed up for
    providers: "", //should be dynamically rendered depending on status
    image: require("../assets/images/userImage5.jpg"),
    key: "5",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Simon Baits",
    status: "Current", //should be dependent on progress bar and if they are working with providers
    recency: "yesterday", //should be rendered and updated from backend
    services: ["Haircut", "Financial Aid", "Celebrate Recovery"], //should be dependent on the services they signed up for
    providers: "Receiving service from 2 providers", //should be dynamically rendered depending on status
    image: require("../assets/images/userImage6.jpg"),
    key: "6",

    // progressbar: 'some code to relate services and completion'
  },
];

export default Clients;

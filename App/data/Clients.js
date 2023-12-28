//should be replaced with an API fetch

const Clients = [
  {
    name: "John Smith",
    age: "20",
    location: "here",
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
    image: "userImage1",
    key: "1",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Tim Langston",
    age: "34",
    location: "over there",
    status: "Past", //should be dependent on progress bar and if they are working with providers
    recency: "Jan 2024", //should be rendered and updated from backend depending on current date
    services: [
      "Haircut",
      "Financial Aid",
      "Celebrate Recovery",
      "Housing Documentation",
    ], //should be dependent on the services they signed up for
    providers: "Received 16 services from 5 providers", //should be dynamically rendered depending on status
    image: "userImage2",

    key: "2",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Oscar Simmons",
    age: "40",
    location: "home",
    status: "Requested", //should be dependent on progress bar and if they are working with providers
    recency: "yesterday", //should be rendered and updated from backend
    services: ["Haircut", "Financial Aid", "Celebrate Recovery"], //should be dependent on the services they signed up for
    providers: "", //should be dynamically rendered depending on status
    image: "userImage3",
    key: "3",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Jackie Smith",
    age: "25",
    location: "where",
    status: "Past", //should be dependent on progress bar and if they are working with providers
    recency: "Mar 2024", //should be rendered and updated from backend
    services: ["Haircut", "Financial Aid", "Celebrate Recovery"], //should be dependent on the services they signed up for
    providers: "Received 3 servies from 1 provider", //should be dynamically rendered depending on status
    image: "userImage4",
    key: "4",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Timothy Sanders",
    age: "54",
    location: "under",
    status: "Requested", //should be dependent on progress bar and if they are working with providers
    recency: "6 hours ago", //should be rendered and updated from backend
    services: ["Haircut", "Financial Aid", "Celebrate Recovery"], //should be dependent on the services they signed up for
    providers: "", //should be dynamically rendered depending on status
    image: "userImage5",
    key: "5",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Simon Baits",
    age: "32",
    location: "there",
    status: "Current", //should be dependent on progress bar and if they are working with providers
    recency: "yesterday", //should be rendered and updated from backend
    services: ["Haircut", "Financial Aid", "Celebrate Recovery"], //should be dependent on the services they signed up for
    providers: "Receiving service from 2 providers", //should be dynamically rendered depending on status
    image: "userImage6",
    key: "6",

    // progressbar: 'some code to relate services and completion'
  },
];

export default Clients;

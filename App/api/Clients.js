//should be replaced with an API fetch

const Clients = [
  {
    name: "John Smith",
    status: "Current", //should be dependent on progress bar and if they are working with providers
    recency: "last week", //should be rendered and updated from backend
    services: ["haircut", "financial aid", "celebrate recovery"], //should be dependent on the services they signed up for
    providers: "Receiving service from 5 providers", //should be dynamically rendered depending on status
    image: require("../assets/images/userImage1.jpg"),
    key: "1",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Tim Langston",
    status: "Past", //should be dependent on progress bar and if they are working with providers
    recency: "Jan 2024", //should be rendered and updated from backend depending on current date
    services: ["haircut", "financial aid", "celebrate recovery"], //should be dependent on the services they signed up for
    providers: "Received 16 services from 5 providers", //should be dynamically rendered depending on status
    image: require("../assets/images/userImage2.jpg"),

    key: "2",

    // progressbar: 'some code to relate services and completion'
  },
  {
    name: "Oscar Simmons",
    status: "Requested", //should be dependent on progress bar and if they are working with providers
    recency: "yesterday", //should be rendered and updated from backend
    services: ["haircut", "financial aid", "celebrate recovery"], //should be dependent on the services they signed up for
    providers: "", //should be dynamically rendered depending on status
    image: require("../assets/images/userImage3.jpg"),
    key: "3",

    // progressbar: 'some code to relate services and completion'
  },
];

export default Clients;

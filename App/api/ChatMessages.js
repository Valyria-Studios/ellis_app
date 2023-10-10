// Mock function to simulate fetching messages from an API
export default mockFetchMessages = () => {
  return new Promise((resolve, reject) => {
    // Simulate a delay of 2 seconds using setTimeout
    setTimeout(() => {
      resolve([
        { type: "received", text: "'Twas brillig, and the slithy toves..." },
        { type: "sent", text: "Beware the Jabberwock, my son!" },
        { type: "sent", text: "The jaws that bite, the claws that catch!" },
        { type: "received", text: "He took his vorpal sword in hand..." },
        { type: "sent", text: "So rested he by the Tumtum tree..." },
      ]);
    });
  });
};

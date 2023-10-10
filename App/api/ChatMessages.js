// Mock function to simulate fetching messages from an API
const mockFetchMessages = (chatIdentifier) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Sample chat data
      const chatData = {
        "Steve Binnquist": [
          { type: "received", text: "Hey there!" },
          { type: "sent", text: "Hello Steve!" },
          // ... additional messages ...
        ],
        "Kent McCormick": [
          { type: "received", text: "'Twas brillig, and the slithy toves..." },
          { type: "sent", text: "Beware the Jabberwock, my son!" },
          // ... additional messages ...
        ],
        "Robert Trace": [
          { type: "received", text: "'Twas brillig, and the slithy toves..." },
          { type: "sent", text: "Beware the Jabberwock, my son!" },
          // ... additional messages ...
        ],
        "Timothy Horton": [
          { type: "received", text: "'Twas brillig, and the slithy toves..." },
          { type: "sent", text: "Beware the Jabberwock, my son!" },
          // ... additional messages ...
        ],
        "Andrew Stilt": [
          { type: "received", text: "'Twas brillig, and the slithy toves..." },
          { type: "sent", text: "Beware the Jabberwock, my son!" },
          // ... additional messages ...
        ],
        "Travis Stalker": [
          { type: "received", text: "'Twas brillig, and the slithy toves..." },
          { type: "sent", text: "Beware the Jabberwock, my son!" },
          // ... additional messages ...
        ],
        "Henry Mince": [
          { type: "received", text: "'Twas brillig, and the slithy toves..." },
          { type: "sent", text: "Beware the Jabberwock, my son!" },
          // ... additional messages ...
        ],
        "Tracy Toggler": [
          { type: "received", text: "'Twas brillig, and the slithy toves..." },
          { type: "sent", text: "Beware the Jabberwock, my son!" },
          // ... additional messages ...
        ],
      };

      resolve(chatData[chatIdentifier] || []);
    });
  });
};

export default mockFetchMessages;

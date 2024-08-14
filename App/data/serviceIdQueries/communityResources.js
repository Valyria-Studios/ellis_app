// fetchEntityIds.js
export const fetchCommunityResourcesEntityIds = async () => {
  const query = `
      query {
        triples(
          filter: {
            and: [
              { attributeId: { equalTo: "7884e9e9-0853-44a9-b30f-2b46790bef1a" } }
              {
                valueId: {
                  in: [
                    "aa4a50b7-9826-4097-9a57-38d84882ccc0"
                    "24ee7604-e267-42d9-b5ff-483452c559b1"
                    "3e21e53b-dbe4-4278-83f5-c824354ef8ee"
                    "7fa21028-3aac-48f5-bec7-cbf7d6a925a8"
                    "939aa5ac-7f5b-4658-88dc-cf9f475d5c43"
                  ]
                }
              }
            ]
          }
        ) {
          totalCount
          edges {
            node {
              entityId
              entity {
                name
              }
              attributeId
              entityValue {
                id
                name
              }
            }
          }
        }
      }
    `;

  try {
    const response = await fetch(
      "https://geo-protocol.up.railway.app/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const result = await response.json();
    const triples = result.data.triples.edges;

    // Extract unique entityIds
    const entityIds = [
      ...new Set(triples.map((triple) => triple.node.entityId)),
    ];
    return entityIds;
  } catch (error) {
    console.error("GraphQL Fetch error:", error);
    throw error;
  }
};

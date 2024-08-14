export const fetchFoodAssistanceEntityIds = async () => {
  const query = `
      query {
        triples(
          filter: {
            and: [
              { attributeId: { equalTo: "7884e9e9-0853-44a9-b30f-2b46790bef1a" } }
              {
                valueId: {
                  in: [
                    "05ef5dc2-9689-4df5-adcc-b8275b1455ac",
                    "0a216f80-73aa-458c-a30e-9ea70c9b561d",
                    "8615a52b-6362-453c-a0bb-fb5866c8c9bb",
                    "86d77487-5c56-4b46-b1ff-420089a889ee",
                    "a5f90cc4-6921-41a6-befa-826276592fd8",
                    "ddaf4099-a09e-45bb-8557-aa45270a8708"
                  ]
                }
              }
            ]
          }
        ) {
          totalCount
          edges {
            node {
              entity {
                name
              }
              entityId
              attributeId
              entityValue {
                id
                name
              }
            }
          }
        }
        subservices: triples(
          filter: {
            and: [
              { attributeId: { equalTo: "f2a6a7bb-a0e8-4119-9f57-ddf6bd4c8d27" } }
              { entityId: { equalTo: "05ef5dc2-9689-4df5-adcc-b8275b1455ac" } }
            ]
          }
        ) {
          totalCount
          edges {
            node {
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

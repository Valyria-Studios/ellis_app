// queries.js
export const GET_ENTITIES_QUERY = `
  query MyQuery {
    geoEntities(
      filter: {
        and: {
          geoEntityTypesByEntityId: {
            some: { typeId: { equalTo: "b3b03c90-9b6d-487c-b2e2-a7d685f120eb" } }
          }
          triplesByEntityId: {
            some: {
              spaceId: { equalTo: "0x843010627854BaA37070fC86535ff19C3Beb33A6" }
              isStale: { equalTo: false }
            }
          }
        }
        triplesByEntityId: {
          some: {
            attributeId: { equalTo: "5e4911b8-2093-411e-a445-bc2124d7f8e3" }
            entityValueId: { equalTo: "21b17a8b-238d-4f34-8cca-7bd55cfa23c8" }
            isStale: { equalTo: false }
          }
        }
      }
      offset: 0
      orderBy: UPDATED_AT_DESC
    ) {
      totalCount
      nodes {
        id
        name
        triplesByEntityId(filter: { isStale: { equalTo: false } }) {
          nodes {
            id
            attribute {
              id
              name
            }
            entity {
              id
              name
            }
            entityValue {
              id
              name
            }
            numberValue
            stringValue
            valueType
            valueId
            isProtected
            space {
              id
            }
          }
        }
      }
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listAllAddress = /* GraphQL */ `
  query ListAllAddress {
    listAllAddress {
      id
      streetAddress
      city
      zipCode
      createdAt
      updatedAt
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      id
      streetAddress
      city
      zipCode
      createdAt
      updatedAt
    }
  }
`;
export const listAddresss = /* GraphQL */ `
  query ListAddresss(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        streetAddress
        city
        zipCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const addressByCity = /* GraphQL */ `
  query AddressByCity(
    $city: String
    $sortDirection: ModelSortDirection
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    AddressByCity(
      city: $city
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        streetAddress
        city
        zipCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getAllPaginatedData = `
query MyQuery {
  listAllAddress {
    city
    createdAt
    id
    streetAddress
    updatedAt
    zipCode
  }
}
`

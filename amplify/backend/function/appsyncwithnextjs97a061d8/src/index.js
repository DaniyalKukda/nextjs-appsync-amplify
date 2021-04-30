
const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const getAllObjects = gql`
query MyQuery {
    listAddresss(filter: {and: {city: {attributeExists: true, attributeType: string}, id: {attributeExists: true, attributeType: string}}}) {
      nextToken
      items {
        city
        createdAt
        id
        streetAddress
        zipCode
        updatedAt
      }
    }
  }
  
`

function paginated_fetch(
    query,
    previousResponse = []
  ) {
    return axios({
        url: "https://5bgs3u5cg5hldjj7bxtsnbmamu.appsync-api.us-east-2.amazonaws.com/graphql",
        method: 'post',
        headers: {
          'x-api-key': "da2-p2ukastb5zb3pado4mqfo3eeyq"
        },
        data: {
          query: print(query),
        }
      }).then(newResponse => {
        const response = [...previousResponse, ...newResponse.data.data.listAddresss.items]; // Combine the two arrays
        if (newResponse.data.data.listAddresss.nextToken) {
            const paginatedQuery = gql`
            query MyQuery {
                listAddresss(filter: {and: {city: {attributeExists: true, attributeType: string}, id: {attributeExists: true, attributeType: string}}}, limit: 1, nextToken: ${newResponse.data.data.listAddresss.nextToken}) {
                    nextToken
                    items {
                      city
                      createdAt
                      id
                      streetAddress
                      zipCode
                      updatedAt
                    }
                  }
              }
              
            `
          return paginated_fetch(paginatedQuery , newResponse.data.data.listAddresss.items);
        }
  
        return response;
      })
  }

exports.handler = async (event) => {
  const response = await paginated_fetch(getAllObjects);
  return response
};

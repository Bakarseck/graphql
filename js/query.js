const graphqlQuery = {
  query: `query GetInfo($objectName: String!) {
      infos:   user {
        profile
        login
        attrs
        firstName
        lastName
        auditRatio
        totalDown
        totalUp
        updatedAt
        events(
          where: {eventId: {_eq: 56}}
        ){
          level
        }
      }
      startproject: group(where: {object: {name: {_eq: $objectName}}}) {
          captainLogin
          path
          status
          members {
            userLogin
          }
      }       
      xp_view: transaction(where: {type: {_eq: "xp"}, path:{_like: "%div-01%", _nlike:"%piscine-js%", _nilike:"%checkpoint%" }}) {
            amount
            path
          }
      skill:   transaction(
        distinct_on: [type]
        where: {type: {_like: "%skill%"}}) {
        amount
        type
      }
      xp: transaction_aggregate(
        where: {type: {_eq: "xp"}, event: {object: {type: {_eq: "module"}}}}
      ) {
        aggregate{
          sum{
            amount
          }
        }
      }    
  }`,
  variables: {
      objectName: "graphql",
  }
};



export { graphqlQuery };

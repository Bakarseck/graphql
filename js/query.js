const graphqlQuery = {
    query: `query GetInfo($objectName: String!, $auditorId: Int!) {
        infos: user {
            profile
            login
            firstName
            lastName
            auditRatio
            createdAt
            totalDown
            totalUp
            updatedAt
        }
        startproject: group(where: {object: {name: {_eq: $objectName}}}) {
            captainLogin
            path
            status
            members {
              userLogin
            }
        }
        audits: audit(where: {auditorId: {_eq: $auditorId}}) {
            id
            groupId
            attrs
            grade
            auditorId
            version
            group {
              captainLogin
              object {
                name
                type
              }
              members {
                userLogin
              }
            }
        }        
        xp_view: transaction(where: {type: {_eq: "xp"}, path:{_like: "%div-01%", _nlike:"%piscine-js%", _nilike:"%checkpoint%" }}) {
              amount
              path
            }
        skill: transaction(where: {type: {_like: "skill%"}}) {
          type
          amount
        }      
    }`,
    variables: {
        objectName: "lem-in",
        auditorId: "3361",
    }
};



export { graphqlQuery };

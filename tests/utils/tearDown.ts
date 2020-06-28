const AWS = require('aws-sdk')

const an_authenticated_user = async (user: any) => {
  const cognito = new AWS.CognitoIdentityServiceProvider()
  
  let req = {
    UserPoolId: process.env.cognito_user_pool_id,
    Username: user.username
  }
  await cognito.adminDeleteUser(req).promise()
  
  console.log(`[${user.username}] - user deleted`)
}

export { 
  an_authenticated_user,
}

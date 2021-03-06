/* eslint-disable @typescript-eslint/no-var-requires */
const AWS = require('aws-sdk');
const chance = require('chance').Chance();

interface User {
  username: string,
  firstName: string,
  lastName: string,
  idToken: string,
}
// needs number, special char, upper and lower case
const randomPassword = () => `${chance.string({ length: 8 })}B!gM0uth`;

const anAuthenticatedUser = async (): Promise<User> => {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  // we already had this variable defined in serverless.yml for the get-index handler.
  const userpoolId = process.env.cognito_user_pool_id;
  // we need this value from the environement but we don't need it in ANY of our functions!
  const clientId = process.env.cognito_server_client_id;

  const firstName = chance.first({ nationality: 'en' });
  const lastName = chance.last({ nationality: 'en' });
  const suffix = chance.string({ length: 8, pool: 'abcdefghijklmnopqrstuvwxyz' });
  const username = `test-${firstName}-${lastName}-${suffix}`;
  const password = randomPassword();
  const email = `${firstName}-${lastName}@big-mouth.com`;

  const createReq = {
    UserPoolId: userpoolId,
    Username: email,
    MessageAction: 'SUPPRESS',
    TemporaryPassword: password,
    UserAttributes: [
      { Name: 'given_name', Value: firstName },
      { Name: 'family_name', Value: lastName },
      { Name: 'email', Value: email },
    ],
  };

  // using admin privalages to create a user manually
  await cognito.adminCreateUser(createReq).promise();

  console.log(`[${username}] - user is created`);

  const req = {
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    UserPoolId: userpoolId,
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };
  const resp = await cognito.adminInitiateAuth(req).promise();

  console.log(`[${username}] - initialised auth flow`);

  const challengeReq = {
    UserPoolId: userpoolId,
    ClientId: clientId,
    ChallengeName: resp.ChallengeName,
    Session: resp.Session,
    ChallengeResponses: {
      USERNAME: email,
      NEW_PASSWORD: randomPassword(),
    },
  };
  const challengeResp = await cognito.adminRespondToAuthChallenge(challengeReq).promise();

  console.log(`[${username}] - responded to auth challenge`);

  return {
    username,
    firstName,
    lastName,
    idToken: challengeResp.AuthenticationResult.IdToken,
  };
};

export {
  // eslint-disable-next-line import/prefer-default-export
  anAuthenticatedUser,
};

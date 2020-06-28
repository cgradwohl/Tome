"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const chance = require('chance').Chance();
// needs number, special char, upper and lower case
const random_password = () => `${chance.string({ length: 8 })}B!gM0uth`;
exports.an_authenticated_user = async (cognito_user_pool_id, cognito_server_client_id) => {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    // we already had this variable defined in serverless.yml for the get-index handler.
    // const userpoolId = process.env.cognito_user_pool_id
    const userpoolId = cognito_user_pool_id;
    // we need this value from the environement but we don't need it in ANY of our functions!
    // const clientId = process.env.cognito_server_client_id
    const clientId = cognito_server_client_id;
    const firstName = chance.first({ nationality: "en" });
    const lastName = chance.last({ nationality: "en" });
    const suffix = chance.string({ length: 8, pool: "abcdefghijklmnopqrstuvwxyz" });
    const username = `test-${firstName}-${lastName}-${suffix}`;
    const password = random_password();
    const email = `${firstName}-${lastName}@big-mouth.com`;
    const createReq = {
        UserPoolId: userpoolId,
        Username: email,
        MessageAction: 'SUPPRESS',
        TemporaryPassword: password,
        UserAttributes: [
            { Name: "given_name", Value: firstName },
            { Name: "family_name", Value: lastName },
            { Name: "email", Value: email }
        ]
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
            PASSWORD: password
        }
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
            NEW_PASSWORD: random_password()
        }
    };
    const challengeResp = await cognito.adminRespondToAuthChallenge(challengeReq).promise();
    console.log(`[${username}] - responded to auth challenge`);
    return {
        username,
        firstName,
        lastName,
        idToken: challengeResp.AuthenticationResult.IdToken
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l2ZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnaXZlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM5QixNQUFNLE1BQU0sR0FBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7QUFFMUMsbURBQW1EO0FBQ25ELE1BQU0sZUFBZSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQyxVQUFVLENBQUE7QUFFekQsUUFBQSxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsb0JBQTRCLEVBQUUsd0JBQWdDLEVBQUUsRUFBRTtJQUM1RyxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxDQUFBO0lBQ3hELG9GQUFvRjtJQUNwRixzREFBc0Q7SUFDdEQsTUFBTSxVQUFVLEdBQUcsb0JBQW9CLENBQUE7SUFDdkMseUZBQXlGO0lBQ3pGLHdEQUF3RDtJQUN4RCxNQUFNLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQTtJQUV6QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDckQsTUFBTSxRQUFRLEdBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3BELE1BQU0sTUFBTSxHQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSw0QkFBNEIsRUFBQyxDQUFDLENBQUE7SUFDaEYsTUFBTSxRQUFRLEdBQUksUUFBUSxTQUFTLElBQUksUUFBUSxJQUFJLE1BQU0sRUFBRSxDQUFBO0lBQzNELE1BQU0sUUFBUSxHQUFJLGVBQWUsRUFBRSxDQUFBO0lBQ25DLE1BQU0sS0FBSyxHQUFPLEdBQUcsU0FBUyxJQUFJLFFBQVEsZ0JBQWdCLENBQUE7SUFFMUQsTUFBTSxTQUFTLEdBQUc7UUFDaEIsVUFBVSxFQUFVLFVBQVU7UUFDOUIsUUFBUSxFQUFZLEtBQUs7UUFDekIsYUFBYSxFQUFPLFVBQVU7UUFDOUIsaUJBQWlCLEVBQUcsUUFBUTtRQUM1QixjQUFjLEVBQU07WUFDbEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFHLEtBQUssRUFBRSxTQUFTLEVBQUU7WUFDekMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7WUFDeEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFRLEtBQUssRUFBRSxLQUFLLEVBQUU7U0FDdEM7S0FDRixDQUFBO0lBRUQsbURBQW1EO0lBQ25ELE1BQU0sT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUVsRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxxQkFBcUIsQ0FBQyxDQUFBO0lBRTlDLE1BQU0sR0FBRyxHQUFHO1FBQ1YsUUFBUSxFQUFVLG1CQUFtQjtRQUNyQyxVQUFVLEVBQVEsVUFBVTtRQUM1QixRQUFRLEVBQVUsUUFBUTtRQUMxQixjQUFjLEVBQUk7WUFDaEIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsUUFBUTtTQUNuQjtLQUNGLENBQUE7SUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUUzRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSwyQkFBMkIsQ0FBQyxDQUFBO0lBRXBELE1BQU0sWUFBWSxHQUFHO1FBQ25CLFVBQVUsRUFBWSxVQUFVO1FBQ2hDLFFBQVEsRUFBYyxRQUFRO1FBQzlCLGFBQWEsRUFBUyxJQUFJLENBQUMsYUFBYTtRQUN4QyxPQUFPLEVBQWUsSUFBSSxDQUFDLE9BQU87UUFDbEMsa0JBQWtCLEVBQUk7WUFDcEIsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsZUFBZSxFQUFFO1NBQ2hDO0tBQ0YsQ0FBQTtJQUNELE1BQU0sYUFBYSxHQUFHLE1BQU0sT0FBTyxDQUFDLDJCQUEyQixDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRXZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLGlDQUFpQyxDQUFDLENBQUE7SUFFMUQsT0FBTztRQUNMLFFBQVE7UUFDUixTQUFTO1FBQ1QsUUFBUTtRQUNSLE9BQU8sRUFBRSxhQUFhLENBQUMsb0JBQW9CLENBQUMsT0FBTztLQUNwRCxDQUFBO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpXG5jb25zdCBjaGFuY2UgID0gcmVxdWlyZSgnY2hhbmNlJykuQ2hhbmNlKClcblxuLy8gbmVlZHMgbnVtYmVyLCBzcGVjaWFsIGNoYXIsIHVwcGVyIGFuZCBsb3dlciBjYXNlXG5jb25zdCByYW5kb21fcGFzc3dvcmQgPSAoKSA9PiBgJHtjaGFuY2Uuc3RyaW5nKHsgbGVuZ3RoOiA4fSl9QiFnTTB1dGhgXG5cbmV4cG9ydCBjb25zdCBhbl9hdXRoZW50aWNhdGVkX3VzZXIgPSBhc3luYyAoY29nbml0b191c2VyX3Bvb2xfaWQ6IHN0cmluZywgY29nbml0b19zZXJ2ZXJfY2xpZW50X2lkOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgY29nbml0byA9IG5ldyBBV1MuQ29nbml0b0lkZW50aXR5U2VydmljZVByb3ZpZGVyKClcbiAgLy8gd2UgYWxyZWFkeSBoYWQgdGhpcyB2YXJpYWJsZSBkZWZpbmVkIGluIHNlcnZlcmxlc3MueW1sIGZvciB0aGUgZ2V0LWluZGV4IGhhbmRsZXIuXG4gIC8vIGNvbnN0IHVzZXJwb29sSWQgPSBwcm9jZXNzLmVudi5jb2duaXRvX3VzZXJfcG9vbF9pZFxuICBjb25zdCB1c2VycG9vbElkID0gY29nbml0b191c2VyX3Bvb2xfaWRcbiAgLy8gd2UgbmVlZCB0aGlzIHZhbHVlIGZyb20gdGhlIGVudmlyb25lbWVudCBidXQgd2UgZG9uJ3QgbmVlZCBpdCBpbiBBTlkgb2Ygb3VyIGZ1bmN0aW9ucyFcbiAgLy8gY29uc3QgY2xpZW50SWQgPSBwcm9jZXNzLmVudi5jb2duaXRvX3NlcnZlcl9jbGllbnRfaWRcbiAgY29uc3QgY2xpZW50SWQgPSBjb2duaXRvX3NlcnZlcl9jbGllbnRfaWRcblxuICBjb25zdCBmaXJzdE5hbWUgPSBjaGFuY2UuZmlyc3QoeyBuYXRpb25hbGl0eTogXCJlblwiIH0pXG4gIGNvbnN0IGxhc3ROYW1lICA9IGNoYW5jZS5sYXN0KHsgbmF0aW9uYWxpdHk6IFwiZW5cIiB9KVxuICBjb25zdCBzdWZmaXggICAgPSBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDgsIHBvb2w6IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIn0pXG4gIGNvbnN0IHVzZXJuYW1lICA9IGB0ZXN0LSR7Zmlyc3ROYW1lfS0ke2xhc3ROYW1lfS0ke3N1ZmZpeH1gXG4gIGNvbnN0IHBhc3N3b3JkICA9IHJhbmRvbV9wYXNzd29yZCgpXG4gIGNvbnN0IGVtYWlsICAgICA9IGAke2ZpcnN0TmFtZX0tJHtsYXN0TmFtZX1AYmlnLW1vdXRoLmNvbWBcblxuICBjb25zdCBjcmVhdGVSZXEgPSB7XG4gICAgVXNlclBvb2xJZCAgICAgICAgOiB1c2VycG9vbElkLFxuICAgIFVzZXJuYW1lICAgICAgICAgIDogZW1haWwsXG4gICAgTWVzc2FnZUFjdGlvbiAgICAgOiAnU1VQUFJFU1MnLFxuICAgIFRlbXBvcmFyeVBhc3N3b3JkIDogcGFzc3dvcmQsXG4gICAgVXNlckF0dHJpYnV0ZXMgICAgOiBbXG4gICAgICB7IE5hbWU6IFwiZ2l2ZW5fbmFtZVwiLCAgVmFsdWU6IGZpcnN0TmFtZSB9LFxuICAgICAgeyBOYW1lOiBcImZhbWlseV9uYW1lXCIsIFZhbHVlOiBsYXN0TmFtZSB9LFxuICAgICAgeyBOYW1lOiBcImVtYWlsXCIsICAgICAgIFZhbHVlOiBlbWFpbCB9XG4gICAgXVxuICB9XG5cbiAgLy8gdXNpbmcgYWRtaW4gcHJpdmFsYWdlcyB0byBjcmVhdGUgYSB1c2VyIG1hbnVhbGx5XG4gIGF3YWl0IGNvZ25pdG8uYWRtaW5DcmVhdGVVc2VyKGNyZWF0ZVJlcSkucHJvbWlzZSgpXG5cbiAgY29uc29sZS5sb2coYFske3VzZXJuYW1lfV0gLSB1c2VyIGlzIGNyZWF0ZWRgKVxuICBcbiAgY29uc3QgcmVxID0ge1xuICAgIEF1dGhGbG93ICAgICAgICA6ICdBRE1JTl9OT19TUlBfQVVUSCcsXG4gICAgVXNlclBvb2xJZCAgICAgIDogdXNlcnBvb2xJZCxcbiAgICBDbGllbnRJZCAgICAgICAgOiBjbGllbnRJZCxcbiAgICBBdXRoUGFyYW1ldGVycyAgOiB7XG4gICAgICBVU0VSTkFNRTogZW1haWwsXG4gICAgICBQQVNTV09SRDogcGFzc3dvcmRcbiAgICB9XG4gIH1cbiAgY29uc3QgcmVzcCA9IGF3YWl0IGNvZ25pdG8uYWRtaW5Jbml0aWF0ZUF1dGgocmVxKS5wcm9taXNlKClcblxuICBjb25zb2xlLmxvZyhgWyR7dXNlcm5hbWV9XSAtIGluaXRpYWxpc2VkIGF1dGggZmxvd2ApXG5cbiAgY29uc3QgY2hhbGxlbmdlUmVxID0ge1xuICAgIFVzZXJQb29sSWQgICAgICAgICAgOiB1c2VycG9vbElkLFxuICAgIENsaWVudElkICAgICAgICAgICAgOiBjbGllbnRJZCxcbiAgICBDaGFsbGVuZ2VOYW1lICAgICAgIDogcmVzcC5DaGFsbGVuZ2VOYW1lLFxuICAgIFNlc3Npb24gICAgICAgICAgICAgOiByZXNwLlNlc3Npb24sXG4gICAgQ2hhbGxlbmdlUmVzcG9uc2VzICA6IHtcbiAgICAgIFVTRVJOQU1FOiBlbWFpbCxcbiAgICAgIE5FV19QQVNTV09SRDogcmFuZG9tX3Bhc3N3b3JkKClcbiAgICB9XG4gIH1cbiAgY29uc3QgY2hhbGxlbmdlUmVzcCA9IGF3YWl0IGNvZ25pdG8uYWRtaW5SZXNwb25kVG9BdXRoQ2hhbGxlbmdlKGNoYWxsZW5nZVJlcSkucHJvbWlzZSgpXG4gIFxuICBjb25zb2xlLmxvZyhgWyR7dXNlcm5hbWV9XSAtIHJlc3BvbmRlZCB0byBhdXRoIGNoYWxsZW5nZWApXG5cbiAgcmV0dXJuIHtcbiAgICB1c2VybmFtZSxcbiAgICBmaXJzdE5hbWUsXG4gICAgbGFzdE5hbWUsXG4gICAgaWRUb2tlbjogY2hhbGxlbmdlUmVzcC5BdXRoZW50aWNhdGlvblJlc3VsdC5JZFRva2VuXG4gIH1cbn1cbiJdfQ==
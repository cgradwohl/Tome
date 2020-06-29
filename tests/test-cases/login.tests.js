"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const chance = require('chance').Chance();
const utils_1 = require("../utils");
describe('Login', () => {
    beforeAll(async () => {
        utils_1.init();
    });
    describe('Given a valid username an password', () => {
        it('should successfully return the user', async () => {
            // use the client to login!
            const cognito = new AWS.CognitoIdentityServiceProvider();
            // we already had this variable defined in serverless.yml for the get-index handler.
            const userpoolId = process.env.cognito_user_pool_id;
            // we need this value from the environement but we don't need it in ANY of our functions!
            const clientId = process.env.cognito_server_client_id;
            const firstName = chance.first({ nationality: "en" });
            const lastName = chance.last({ nationality: "en" });
            const suffix = chance.string({ length: 8, pool: "abcdefghijklmnopqrstuvwxyz" });
            const username = `test-${firstName}-${lastName}-${suffix}`;
            const password = `${chance.string({ length: 8 })}B!gM0uth`;
            const email = `${firstName}-${lastName}@big-mouth.com`;
            const createReq = {
                UserPoolId: userpoolId,
                Username: username,
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
            // TODO:
            // if we are in integration test mode, then we simply invoke the login function.
            // if we are in e2e test mode, then we need to call the deployed /login endpoint
            const response = await utils_1.when.we_invoke_login(user);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4udGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFMUMsb0NBQXNDO0FBRXRDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3JCLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNuQixZQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsRUFBRTtRQUNsRCxFQUFFLENBQUMscUNBQXFDLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDbkQsMkJBQTJCO1lBQzNCLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLDhCQUE4QixFQUFFLENBQUE7WUFDeEQsb0ZBQW9GO1lBQ3BGLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUE7WUFDbkQseUZBQXlGO1lBQ3pGLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUE7WUFFckQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDO1lBQ2hGLE1BQU0sUUFBUSxHQUFHLFFBQVEsU0FBUyxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUMzRCxNQUFNLFFBQVEsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQzNELE1BQU0sS0FBSyxHQUFHLEdBQUcsU0FBUyxJQUFJLFFBQVEsZ0JBQWdCLENBQUM7WUFFdkQsTUFBTSxTQUFTLEdBQUc7Z0JBQ2hCLFVBQVUsRUFBVSxVQUFVO2dCQUM5QixRQUFRLEVBQVksUUFBUTtnQkFDNUIsYUFBYSxFQUFPLFVBQVU7Z0JBQzlCLGlCQUFpQixFQUFHLFFBQVE7Z0JBQzVCLGNBQWMsRUFBTTtvQkFDbEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFHLEtBQUssRUFBRSxTQUFTLEVBQUU7b0JBQ3pDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUN4QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQVEsS0FBSyxFQUFFLEtBQUssRUFBRTtpQkFDdEM7YUFDRixDQUFBO1lBRUQsbURBQW1EO1lBQ25ELE1BQU0sT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUVsRCxRQUFRO1lBQ1IsZ0ZBQWdGO1lBQ2hGLGdGQUFnRjtZQUNoRixNQUFNLFFBQVEsR0FBRyxNQUFNLFlBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUVKLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuY29uc3QgY2hhbmNlID0gcmVxdWlyZSgnY2hhbmNlJykuQ2hhbmNlKCk7XG5cbmltcG9ydCB7IGluaXQsIHdoZW4gfSBmcm9tICcuLi91dGlscyc7XG5cbmRlc2NyaWJlKCdMb2dpbicsICgpID0+IHtcbiAgYmVmb3JlQWxsKGFzeW5jICgpID0+IHtcbiAgICBpbml0KCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdHaXZlbiBhIHZhbGlkIHVzZXJuYW1lIGFuIHBhc3N3b3JkJywgKCkgPT4geyBcbiAgICBpdCgnc2hvdWxkIHN1Y2Nlc3NmdWxseSByZXR1cm4gdGhlIHVzZXInLCBhc3luYyAoKSA9PiB7IFxuICAgICAgLy8gdXNlIHRoZSBjbGllbnQgdG8gbG9naW4hXG4gICAgICBjb25zdCBjb2duaXRvID0gbmV3IEFXUy5Db2duaXRvSWRlbnRpdHlTZXJ2aWNlUHJvdmlkZXIoKVxuICAgICAgLy8gd2UgYWxyZWFkeSBoYWQgdGhpcyB2YXJpYWJsZSBkZWZpbmVkIGluIHNlcnZlcmxlc3MueW1sIGZvciB0aGUgZ2V0LWluZGV4IGhhbmRsZXIuXG4gICAgICBjb25zdCB1c2VycG9vbElkID0gcHJvY2Vzcy5lbnYuY29nbml0b191c2VyX3Bvb2xfaWRcbiAgICAgIC8vIHdlIG5lZWQgdGhpcyB2YWx1ZSBmcm9tIHRoZSBlbnZpcm9uZW1lbnQgYnV0IHdlIGRvbid0IG5lZWQgaXQgaW4gQU5ZIG9mIG91ciBmdW5jdGlvbnMhXG4gICAgICBjb25zdCBjbGllbnRJZCA9IHByb2Nlc3MuZW52LmNvZ25pdG9fc2VydmVyX2NsaWVudF9pZFxuXG4gICAgICBjb25zdCBmaXJzdE5hbWUgPSBjaGFuY2UuZmlyc3QoeyBuYXRpb25hbGl0eTogXCJlblwiIH0pO1xuICAgICAgY29uc3QgbGFzdE5hbWUgPSBjaGFuY2UubGFzdCh7IG5hdGlvbmFsaXR5OiBcImVuXCIgfSk7XG4gICAgICBjb25zdCBzdWZmaXggPSBjaGFuY2Uuc3RyaW5nKHsgbGVuZ3RoOiA4LCBwb29sOiBcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIgfSk7XG4gICAgICBjb25zdCB1c2VybmFtZSA9IGB0ZXN0LSR7Zmlyc3ROYW1lfS0ke2xhc3ROYW1lfS0ke3N1ZmZpeH1gO1xuICAgICAgY29uc3QgcGFzc3dvcmQgPSBgJHtjaGFuY2Uuc3RyaW5nKHsgbGVuZ3RoOiA4IH0pfUIhZ00wdXRoYDtcbiAgICAgIGNvbnN0IGVtYWlsID0gYCR7Zmlyc3ROYW1lfS0ke2xhc3ROYW1lfUBiaWctbW91dGguY29tYDtcblxuICAgICAgY29uc3QgY3JlYXRlUmVxID0ge1xuICAgICAgICBVc2VyUG9vbElkICAgICAgICA6IHVzZXJwb29sSWQsXG4gICAgICAgIFVzZXJuYW1lICAgICAgICAgIDogdXNlcm5hbWUsXG4gICAgICAgIE1lc3NhZ2VBY3Rpb24gICAgIDogJ1NVUFBSRVNTJyxcbiAgICAgICAgVGVtcG9yYXJ5UGFzc3dvcmQgOiBwYXNzd29yZCxcbiAgICAgICAgVXNlckF0dHJpYnV0ZXMgICAgOiBbXG4gICAgICAgICAgeyBOYW1lOiBcImdpdmVuX25hbWVcIiwgIFZhbHVlOiBmaXJzdE5hbWUgfSxcbiAgICAgICAgICB7IE5hbWU6IFwiZmFtaWx5X25hbWVcIiwgVmFsdWU6IGxhc3ROYW1lIH0sXG4gICAgICAgICAgeyBOYW1lOiBcImVtYWlsXCIsICAgICAgIFZhbHVlOiBlbWFpbCB9XG4gICAgICAgIF1cbiAgICAgIH1cblxuICAgICAgLy8gdXNpbmcgYWRtaW4gcHJpdmFsYWdlcyB0byBjcmVhdGUgYSB1c2VyIG1hbnVhbGx5XG4gICAgICBhd2FpdCBjb2duaXRvLmFkbWluQ3JlYXRlVXNlcihjcmVhdGVSZXEpLnByb21pc2UoKVxuICBcbiAgICAgIC8vIFRPRE86XG4gICAgICAvLyBpZiB3ZSBhcmUgaW4gaW50ZWdyYXRpb24gdGVzdCBtb2RlLCB0aGVuIHdlIHNpbXBseSBpbnZva2UgdGhlIGxvZ2luIGZ1bmN0aW9uLlxuICAgICAgLy8gaWYgd2UgYXJlIGluIGUyZSB0ZXN0IG1vZGUsIHRoZW4gd2UgbmVlZCB0byBjYWxsIHRoZSBkZXBsb3llZCAvbG9naW4gZW5kcG9pbnRcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgd2hlbi53ZV9pbnZva2VfbG9naW4odXNlcik7XG4gICAgfSlcbiAgfSlcbiAgXG59KTsiXX0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const chance = require('chance').Chance();
const utils_1 = require("../utils");
describe('Register', () => {
    beforeAll(async () => {
        utils_1.init();
    });
    describe('Given valid user data', () => {
        it('should successfully register a new user with Cognito', async () => {
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
            // TODO:
            // if we are in integration test mode, then we simply invoke the register function.
            // if we are in e2e test mode, then we need to call the deployed /register endpoint
            const response = await utils_1.when.we_invoke_register(createReq);
        });
        it('should successfully add thhe new user to our DynamoDB Table', () => { });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIudGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3Rlci50ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFMUMsb0NBQXNDO0FBRXRDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO0lBQ3hCLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNuQixZQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsRUFBRTtRQUNyQyxFQUFFLENBQUMsc0RBQXNELEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDcEUsMkJBQTJCO1lBQzNCLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLDhCQUE4QixFQUFFLENBQUE7WUFDeEQsb0ZBQW9GO1lBQ3BGLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUE7WUFDbkQseUZBQXlGO1lBQ3pGLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUE7WUFFckQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDO1lBQ2hGLE1BQU0sUUFBUSxHQUFHLFFBQVEsU0FBUyxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUMzRCxNQUFNLFFBQVEsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQzNELE1BQU0sS0FBSyxHQUFHLEdBQUcsU0FBUyxJQUFJLFFBQVEsZ0JBQWdCLENBQUM7WUFFdkQsTUFBTSxTQUFTLEdBQUc7Z0JBQ2hCLFVBQVUsRUFBVSxVQUFVO2dCQUM5QixRQUFRLEVBQVksUUFBUTtnQkFDNUIsYUFBYSxFQUFPLFVBQVU7Z0JBQzlCLGlCQUFpQixFQUFHLFFBQVE7Z0JBQzVCLGNBQWMsRUFBTTtvQkFDbEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFHLEtBQUssRUFBRSxTQUFTLEVBQUU7b0JBQ3pDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUN4QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQVEsS0FBSyxFQUFFLEtBQUssRUFBRTtpQkFDdEM7YUFDRixDQUFBO1lBRUQsUUFBUTtZQUNSLG1GQUFtRjtZQUNuRixtRkFBbUY7WUFDbkYsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUE7UUFFRixFQUFFLENBQUMsNkRBQTZELEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDOUUsQ0FBQyxDQUFDLENBQUE7QUFFSixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFXUyA9IHJlcXVpcmUoJ2F3cy1zZGsnKTtcbmNvbnN0IGNoYW5jZSA9IHJlcXVpcmUoJ2NoYW5jZScpLkNoYW5jZSgpO1xuXG5pbXBvcnQgeyBpbml0LCB3aGVuIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5kZXNjcmliZSgnUmVnaXN0ZXInLCAoKSA9PiB7XG4gIGJlZm9yZUFsbChhc3luYyAoKSA9PiB7XG4gICAgaW5pdCgpO1xuICB9KTtcblxuICBkZXNjcmliZSgnR2l2ZW4gdmFsaWQgdXNlciBkYXRhJywgKCkgPT4geyBcbiAgICBpdCgnc2hvdWxkIHN1Y2Nlc3NmdWxseSByZWdpc3RlciBhIG5ldyB1c2VyIHdpdGggQ29nbml0bycsIGFzeW5jICgpID0+IHsgXG4gICAgICAvLyB1c2UgdGhlIGNsaWVudCB0byBsb2dpbiFcbiAgICAgIGNvbnN0IGNvZ25pdG8gPSBuZXcgQVdTLkNvZ25pdG9JZGVudGl0eVNlcnZpY2VQcm92aWRlcigpXG4gICAgICAvLyB3ZSBhbHJlYWR5IGhhZCB0aGlzIHZhcmlhYmxlIGRlZmluZWQgaW4gc2VydmVybGVzcy55bWwgZm9yIHRoZSBnZXQtaW5kZXggaGFuZGxlci5cbiAgICAgIGNvbnN0IHVzZXJwb29sSWQgPSBwcm9jZXNzLmVudi5jb2duaXRvX3VzZXJfcG9vbF9pZFxuICAgICAgLy8gd2UgbmVlZCB0aGlzIHZhbHVlIGZyb20gdGhlIGVudmlyb25lbWVudCBidXQgd2UgZG9uJ3QgbmVlZCBpdCBpbiBBTlkgb2Ygb3VyIGZ1bmN0aW9ucyFcbiAgICAgIGNvbnN0IGNsaWVudElkID0gcHJvY2Vzcy5lbnYuY29nbml0b19zZXJ2ZXJfY2xpZW50X2lkXG5cbiAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGNoYW5jZS5maXJzdCh7IG5hdGlvbmFsaXR5OiBcImVuXCIgfSk7XG4gICAgICBjb25zdCBsYXN0TmFtZSA9IGNoYW5jZS5sYXN0KHsgbmF0aW9uYWxpdHk6IFwiZW5cIiB9KTtcbiAgICAgIGNvbnN0IHN1ZmZpeCA9IGNoYW5jZS5zdHJpbmcoeyBsZW5ndGg6IDgsIHBvb2w6IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIiB9KTtcbiAgICAgIGNvbnN0IHVzZXJuYW1lID0gYHRlc3QtJHtmaXJzdE5hbWV9LSR7bGFzdE5hbWV9LSR7c3VmZml4fWA7XG4gICAgICBjb25zdCBwYXNzd29yZCA9IGAke2NoYW5jZS5zdHJpbmcoeyBsZW5ndGg6IDggfSl9QiFnTTB1dGhgO1xuICAgICAgY29uc3QgZW1haWwgPSBgJHtmaXJzdE5hbWV9LSR7bGFzdE5hbWV9QGJpZy1tb3V0aC5jb21gO1xuXG4gICAgICBjb25zdCBjcmVhdGVSZXEgPSB7XG4gICAgICAgIFVzZXJQb29sSWQgICAgICAgIDogdXNlcnBvb2xJZCxcbiAgICAgICAgVXNlcm5hbWUgICAgICAgICAgOiB1c2VybmFtZSxcbiAgICAgICAgTWVzc2FnZUFjdGlvbiAgICAgOiAnU1VQUFJFU1MnLFxuICAgICAgICBUZW1wb3JhcnlQYXNzd29yZCA6IHBhc3N3b3JkLFxuICAgICAgICBVc2VyQXR0cmlidXRlcyAgICA6IFtcbiAgICAgICAgICB7IE5hbWU6IFwiZ2l2ZW5fbmFtZVwiLCAgVmFsdWU6IGZpcnN0TmFtZSB9LFxuICAgICAgICAgIHsgTmFtZTogXCJmYW1pbHlfbmFtZVwiLCBWYWx1ZTogbGFzdE5hbWUgfSxcbiAgICAgICAgICB7IE5hbWU6IFwiZW1haWxcIiwgICAgICAgVmFsdWU6IGVtYWlsIH1cbiAgICAgICAgXVxuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOlxuICAgICAgLy8gaWYgd2UgYXJlIGluIGludGVncmF0aW9uIHRlc3QgbW9kZSwgdGhlbiB3ZSBzaW1wbHkgaW52b2tlIHRoZSByZWdpc3RlciBmdW5jdGlvbi5cbiAgICAgIC8vIGlmIHdlIGFyZSBpbiBlMmUgdGVzdCBtb2RlLCB0aGVuIHdlIG5lZWQgdG8gY2FsbCB0aGUgZGVwbG95ZWQgL3JlZ2lzdGVyIGVuZHBvaW50XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHdoZW4ud2VfaW52b2tlX3JlZ2lzdGVyKGNyZWF0ZVJlcSk7XG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgc3VjY2Vzc2Z1bGx5IGFkZCB0aGhlIG5ldyB1c2VyIHRvIG91ciBEeW5hbW9EQiBUYWJsZScsICgpID0+IHsgfSlcbiAgfSlcbiAgXG59KTsiXX0=
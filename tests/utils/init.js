"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const { promisify } = require('util');
const awscred = require('awscred'); // resolves the AWS credentials using the awscred module and puts the access key and secret into the environment variables.
// require('dotenv').config() // loading the environment variables from the .env file
let initialized = false;
exports.default = async () => {
    if (initialized) {
        return;
    }
    // awscred resolves AWS credentials using, in order: environment variables,
    // INI files, and HTTP calls
    // 1. the `serverless-export-env` plugin export our env variables to a file called .env for us
    // 2. require('dotenv').config() loads those environment variables into the execution procress
    // 3. awscred reads those variables from the environment process and resolves them for us.
    const { credentials, region } = await promisify(awscred.load)();
    console.log('creds', credentials);
    console.log('REGION', region);
    process.env.AWS_ACCESS_KEY_ID = credentials.accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = credentials.secretAccessKey;
    process.env.AWS_REGION = region;
    // necessary to cater for when you're authenticated as an IAM role (instead of an IAM user).
    if (credentials.sessionToken) {
        process.env.AWS_SESSION_TOKEN = credentials.sessionToken;
    }
    console.log('AWS credential loaded');
    initialized = true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBdUQ7QUFDdkQsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQywySEFBMkg7QUFDL0oscUZBQXFGO0FBRXJGLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUV4QixrQkFBZSxLQUFLLElBQUksRUFBRTtJQUN4QixJQUFJLFdBQVcsRUFBRTtRQUNmLE9BQU87S0FDUjtJQUVELDJFQUEyRTtJQUMzRSw0QkFBNEI7SUFDNUIsOEZBQThGO0lBQzlGLDhGQUE4RjtJQUM5RiwwRkFBMEY7SUFDMUYsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUVoRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUVsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7SUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDO0lBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztJQUVoQyw0RkFBNEY7SUFDNUYsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztLQUMxRDtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUVyQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXMgKi9cbmNvbnN0IHsgcHJvbWlzaWZ5IH0gPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCBhd3NjcmVkID0gcmVxdWlyZSgnYXdzY3JlZCcpOyAvLyByZXNvbHZlcyB0aGUgQVdTIGNyZWRlbnRpYWxzIHVzaW5nIHRoZSBhd3NjcmVkIG1vZHVsZSBhbmQgcHV0cyB0aGUgYWNjZXNzIGtleSBhbmQgc2VjcmV0IGludG8gdGhlIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbi8vIHJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpIC8vIGxvYWRpbmcgdGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBmcm9tIHRoZSAuZW52IGZpbGVcblxubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICgpID0+IHtcbiAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gYXdzY3JlZCByZXNvbHZlcyBBV1MgY3JlZGVudGlhbHMgdXNpbmcsIGluIG9yZGVyOiBlbnZpcm9ubWVudCB2YXJpYWJsZXMsXG4gIC8vIElOSSBmaWxlcywgYW5kIEhUVFAgY2FsbHNcbiAgLy8gMS4gdGhlIGBzZXJ2ZXJsZXNzLWV4cG9ydC1lbnZgIHBsdWdpbiBleHBvcnQgb3VyIGVudiB2YXJpYWJsZXMgdG8gYSBmaWxlIGNhbGxlZCAuZW52IGZvciB1c1xuICAvLyAyLiByZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKSBsb2FkcyB0aG9zZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgaW50byB0aGUgZXhlY3V0aW9uIHByb2NyZXNzXG4gIC8vIDMuIGF3c2NyZWQgcmVhZHMgdGhvc2UgdmFyaWFibGVzIGZyb20gdGhlIGVudmlyb25tZW50IHByb2Nlc3MgYW5kIHJlc29sdmVzIHRoZW0gZm9yIHVzLlxuICBjb25zdCB7IGNyZWRlbnRpYWxzLCByZWdpb24gfSA9IGF3YWl0IHByb21pc2lmeShhd3NjcmVkLmxvYWQpKCk7XG5cbiAgY29uc29sZS5sb2coJ2NyZWRzJywgY3JlZGVudGlhbHMpO1xuXG4gIGNvbnNvbGUubG9nKCdSRUdJT04nLCByZWdpb24pO1xuXG4gIHByb2Nlc3MuZW52LkFXU19BQ0NFU1NfS0VZX0lEID0gY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQ7XG4gIHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSA9IGNyZWRlbnRpYWxzLnNlY3JldEFjY2Vzc0tleTtcbiAgcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTiA9IHJlZ2lvbjtcblxuICAvLyBuZWNlc3NhcnkgdG8gY2F0ZXIgZm9yIHdoZW4geW91J3JlIGF1dGhlbnRpY2F0ZWQgYXMgYW4gSUFNIHJvbGUgKGluc3RlYWQgb2YgYW4gSUFNIHVzZXIpLlxuICBpZiAoY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuKSB7XG4gICAgcHJvY2Vzcy5lbnYuQVdTX1NFU1NJT05fVE9LRU4gPSBjcmVkZW50aWFscy5zZXNzaW9uVG9rZW47XG4gIH1cblxuICBjb25zb2xlLmxvZygnQVdTIGNyZWRlbnRpYWwgbG9hZGVkJyk7XG5cbiAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xufTtcbiJdfQ==
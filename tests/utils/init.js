"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { promisify } = require('util');
const awscred = require('awscred'); //resolves the AWS credentials using the awscred module and puts the access key and secret into the environment variables.
// require('dotenv').config() // loading the environment variables from the .env file
let initialized = false;
exports.init = async () => {
    if (initialized) {
        return;
    }
    // awscred resolves AWS credentials using, in order: environment variables, INI files, and HTTP calls
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDLDBIQUEwSDtBQUM3SixxRkFBcUY7QUFFckYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFBO0FBRVYsUUFBQSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDN0IsSUFBSSxXQUFXLEVBQUU7UUFDZixPQUFNO0tBQ1A7SUFFRCxxR0FBcUc7SUFDckcsOEZBQThGO0lBQzlGLDhGQUE4RjtJQUM5RiwwRkFBMEY7SUFDMUYsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtJQUUvRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUVsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFPLFdBQVcsQ0FBQyxXQUFXLENBQUE7SUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFjLE1BQU0sQ0FBQTtJQUUxQyw0RkFBNEY7SUFDNUYsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQTtLQUN6RDtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtJQUVwQyxXQUFXLEdBQUcsSUFBSSxDQUFBO0FBQ3BCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgcHJvbWlzaWZ5IH0gPSByZXF1aXJlKCd1dGlsJylcbmNvbnN0IGF3c2NyZWQgPSByZXF1aXJlKCdhd3NjcmVkJykgLy9yZXNvbHZlcyB0aGUgQVdTIGNyZWRlbnRpYWxzIHVzaW5nIHRoZSBhd3NjcmVkIG1vZHVsZSBhbmQgcHV0cyB0aGUgYWNjZXNzIGtleSBhbmQgc2VjcmV0IGludG8gdGhlIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbi8vIHJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpIC8vIGxvYWRpbmcgdGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBmcm9tIHRoZSAuZW52IGZpbGVcblxubGV0IGluaXRpYWxpemVkID0gZmFsc2VcblxuZXhwb3J0IGNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVyblxuICB9XG4gIFxuICAvLyBhd3NjcmVkIHJlc29sdmVzIEFXUyBjcmVkZW50aWFscyB1c2luZywgaW4gb3JkZXI6IGVudmlyb25tZW50IHZhcmlhYmxlcywgSU5JIGZpbGVzLCBhbmQgSFRUUCBjYWxsc1xuICAvLyAxLiB0aGUgYHNlcnZlcmxlc3MtZXhwb3J0LWVudmAgcGx1Z2luIGV4cG9ydCBvdXIgZW52IHZhcmlhYmxlcyB0byBhIGZpbGUgY2FsbGVkIC5lbnYgZm9yIHVzXG4gIC8vIDIuIHJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpIGxvYWRzIHRob3NlIGVudmlyb25tZW50IHZhcmlhYmxlcyBpbnRvIHRoZSBleGVjdXRpb24gcHJvY3Jlc3NcbiAgLy8gMy4gYXdzY3JlZCByZWFkcyB0aG9zZSB2YXJpYWJsZXMgZnJvbSB0aGUgZW52aXJvbm1lbnQgcHJvY2VzcyBhbmQgcmVzb2x2ZXMgdGhlbSBmb3IgdXMuXG4gIGNvbnN0IHsgY3JlZGVudGlhbHMsIHJlZ2lvbiB9ID0gYXdhaXQgcHJvbWlzaWZ5KGF3c2NyZWQubG9hZCkoKVxuXG4gIGNvbnNvbGUubG9nKCdjcmVkcycsIGNyZWRlbnRpYWxzKTtcblxuICBjb25zb2xlLmxvZygnUkVHSU9OJywgcmVnaW9uKTtcbiAgXG4gIHByb2Nlc3MuZW52LkFXU19BQ0NFU1NfS0VZX0lEICAgICA9IGNyZWRlbnRpYWxzLmFjY2Vzc0tleUlkXG4gIHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSA9IGNyZWRlbnRpYWxzLnNlY3JldEFjY2Vzc0tleVxuICBwcm9jZXNzLmVudi5BV1NfUkVHSU9OICAgICAgICAgICAgPSByZWdpb25cblxuICAvLyBuZWNlc3NhcnkgdG8gY2F0ZXIgZm9yIHdoZW4geW91J3JlIGF1dGhlbnRpY2F0ZWQgYXMgYW4gSUFNIHJvbGUgKGluc3RlYWQgb2YgYW4gSUFNIHVzZXIpLlxuICBpZiAoY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuKSB7XG4gICAgcHJvY2Vzcy5lbnYuQVdTX1NFU1NJT05fVE9LRU4gPSBjcmVkZW50aWFscy5zZXNzaW9uVG9rZW5cbiAgfVxuXG4gIGNvbnNvbGUubG9nKCdBV1MgY3JlZGVudGlhbCBsb2FkZWQnKVxuXG4gIGluaXRpYWxpemVkID0gdHJ1ZVxufVxuIl19
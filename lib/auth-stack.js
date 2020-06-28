"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_apigateway_1 = require("@aws-cdk/aws-apigateway");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const core_1 = require("@aws-cdk/core");
const aws_cognito_1 = require("@aws-cdk/aws-cognito");
class AuthStack extends core_1.Stack {
    constructor(app, id) {
        super(app, id);
        // Cognito User Pool with Email Sign-in Type.
        const userPool = new aws_cognito_1.UserPool(this, 'userPool', {
            signInAliases: {
                email: true
            }
        });
        // Function that returns 201 with "Hello world!"
        const helloWorldFunction = new aws_lambda_1.Function(this, 'helloWorldFunction', {
            code: new aws_lambda_1.AssetCode('lambdas'),
            handler: 'helloworld.handler',
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
            environment: {
                USER_POOL_ID: userPool.userPoolId,
            }
        });
        // Rest API backed by the helloWorldFunction
        const helloWorldLambdaRestApi = new aws_apigateway_1.LambdaRestApi(this, 'helloWorldLambdaRestApi', {
            restApiName: 'Hello World API',
            handler: helloWorldFunction,
            proxy: false,
        });
        // Authorizer for the Hello World API that uses the
        // Cognito User pool to Authorize users.
        const authorizer = new aws_apigateway_1.CfnAuthorizer(this, 'cfnAuth', {
            restApiId: helloWorldLambdaRestApi.restApiId,
            name: 'HelloWorldAPIAuthorizer',
            type: 'COGNITO_USER_POOLS',
            identitySource: 'method.request.header.Authorization',
            providerArns: [userPool.userPoolArn],
        });
        // Hello Resource API for the REST API. 
        const hello = helloWorldLambdaRestApi.root.addResource('HELLO');
        // GET method for the HELLO API resource. It uses Cognito for
        // authorization and the auathorizer defined above.
        hello.addMethod('GET', new aws_apigateway_1.LambdaIntegration(helloWorldFunction), {
            authorizationType: aws_apigateway_1.AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: authorizer.ref
            }
        });
        new core_1.CfnOutput(this, "UserPoolIdOutput", {
            description: "UserPool ID",
            value: userPool.userPoolId
        });
    }
}
exports.AuthStack = AuthStack;
const app = new core_1.App();
new AuthStack(app, 'AuthStack');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0REFBNkc7QUFDN0csb0RBQW1FO0FBQ25FLHdDQUFzRDtBQUN0RCxzREFBK0M7QUFFL0MsTUFBYSxTQUFVLFNBQVEsWUFBSztJQUNsQyxZQUFZLEdBQVEsRUFBRSxFQUFVO1FBQzlCLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFZiw2Q0FBNkM7UUFDN0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxzQkFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDOUMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixDQUFDLENBQUE7UUFFRixnREFBZ0Q7UUFDaEQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ2xFLElBQUksRUFBRSxJQUFJLHNCQUFTLENBQUMsU0FBUyxDQUFDO1lBQzlCLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixXQUFXLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFLFFBQVEsQ0FBQyxVQUFVO2FBQ2xDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsNENBQTRDO1FBQzVDLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSw4QkFBYSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUNqRixXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7UUFFSCxtREFBbUQ7UUFDbkQsd0NBQXdDO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLElBQUksOEJBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ3BELFNBQVMsRUFBRSx1QkFBdUIsQ0FBQyxTQUFTO1lBQzVDLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsSUFBSSxFQUFFLG9CQUFvQjtZQUMxQixjQUFjLEVBQUUscUNBQXFDO1lBQ3JELFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7U0FDckMsQ0FBQyxDQUFBO1FBRUYsd0NBQXdDO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFaEUsNkRBQTZEO1FBQzdELG1EQUFtRDtRQUNuRCxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLGtDQUFpQixDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDaEUsaUJBQWlCLEVBQUUsa0NBQWlCLENBQUMsT0FBTztZQUM1QyxVQUFVLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFLFVBQVUsQ0FBQyxHQUFHO2FBQzdCO1NBRUYsQ0FBQyxDQUFBO1FBRUYsSUFBSSxnQkFBUyxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUN0QyxXQUFXLEVBQUUsYUFBYTtZQUMxQixLQUFLLEVBQUUsUUFBUSxDQUFDLFVBQVU7U0FDM0IsQ0FBQyxDQUFDO0lBRUwsQ0FBQztDQUNGO0FBekRELDhCQXlEQztBQUdELE1BQU0sR0FBRyxHQUFHLElBQUksVUFBRyxFQUFFLENBQUM7QUFDdEIsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2hDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExhbWJkYVJlc3RBcGksIENmbkF1dGhvcml6ZXIsIExhbWJkYUludGVncmF0aW9uLCBBdXRob3JpemF0aW9uVHlwZSB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCB7IEFzc2V0Q29kZSwgRnVuY3Rpb24sIFJ1bnRpbWUgfSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCB7IEFwcCwgU3RhY2ssIENmbk91dHB1dCB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgVXNlclBvb2wgfSBmcm9tICdAYXdzLWNkay9hd3MtY29nbml0bydcblxuZXhwb3J0IGNsYXNzIEF1dGhTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihhcHAsIGlkKTtcblxuICAgIC8vIENvZ25pdG8gVXNlciBQb29sIHdpdGggRW1haWwgU2lnbi1pbiBUeXBlLlxuICAgIGNvbnN0IHVzZXJQb29sID0gbmV3IFVzZXJQb29sKHRoaXMsICd1c2VyUG9vbCcsIHtcbiAgICAgIHNpZ25JbkFsaWFzZXM6IHtcbiAgICAgICAgZW1haWw6IHRydWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gRnVuY3Rpb24gdGhhdCByZXR1cm5zIDIwMSB3aXRoIFwiSGVsbG8gd29ybGQhXCJcbiAgICBjb25zdCBoZWxsb1dvcmxkRnVuY3Rpb24gPSBuZXcgRnVuY3Rpb24odGhpcywgJ2hlbGxvV29ybGRGdW5jdGlvbicsIHtcbiAgICAgIGNvZGU6IG5ldyBBc3NldENvZGUoJ2xhbWJkYXMnKSxcbiAgICAgIGhhbmRsZXI6ICdoZWxsb3dvcmxkLmhhbmRsZXInLFxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFVTRVJfUE9PTF9JRDogdXNlclBvb2wudXNlclBvb2xJZCxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJlc3QgQVBJIGJhY2tlZCBieSB0aGUgaGVsbG9Xb3JsZEZ1bmN0aW9uXG4gICAgY29uc3QgaGVsbG9Xb3JsZExhbWJkYVJlc3RBcGkgPSBuZXcgTGFtYmRhUmVzdEFwaSh0aGlzLCAnaGVsbG9Xb3JsZExhbWJkYVJlc3RBcGknLCB7XG4gICAgICByZXN0QXBpTmFtZTogJ0hlbGxvIFdvcmxkIEFQSScsXG4gICAgICBoYW5kbGVyOiBoZWxsb1dvcmxkRnVuY3Rpb24sXG4gICAgICBwcm94eTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICAvLyBBdXRob3JpemVyIGZvciB0aGUgSGVsbG8gV29ybGQgQVBJIHRoYXQgdXNlcyB0aGVcbiAgICAvLyBDb2duaXRvIFVzZXIgcG9vbCB0byBBdXRob3JpemUgdXNlcnMuXG4gICAgY29uc3QgYXV0aG9yaXplciA9IG5ldyBDZm5BdXRob3JpemVyKHRoaXMsICdjZm5BdXRoJywge1xuICAgICAgcmVzdEFwaUlkOiBoZWxsb1dvcmxkTGFtYmRhUmVzdEFwaS5yZXN0QXBpSWQsXG4gICAgICBuYW1lOiAnSGVsbG9Xb3JsZEFQSUF1dGhvcml6ZXInLFxuICAgICAgdHlwZTogJ0NPR05JVE9fVVNFUl9QT09MUycsXG4gICAgICBpZGVudGl0eVNvdXJjZTogJ21ldGhvZC5yZXF1ZXN0LmhlYWRlci5BdXRob3JpemF0aW9uJyxcbiAgICAgIHByb3ZpZGVyQXJuczogW3VzZXJQb29sLnVzZXJQb29sQXJuXSxcbiAgICB9KVxuXG4gICAgLy8gSGVsbG8gUmVzb3VyY2UgQVBJIGZvciB0aGUgUkVTVCBBUEkuIFxuICAgIGNvbnN0IGhlbGxvID0gaGVsbG9Xb3JsZExhbWJkYVJlc3RBcGkucm9vdC5hZGRSZXNvdXJjZSgnSEVMTE8nKTtcblxuICAgIC8vIEdFVCBtZXRob2QgZm9yIHRoZSBIRUxMTyBBUEkgcmVzb3VyY2UuIEl0IHVzZXMgQ29nbml0byBmb3JcbiAgICAvLyBhdXRob3JpemF0aW9uIGFuZCB0aGUgYXVhdGhvcml6ZXIgZGVmaW5lZCBhYm92ZS5cbiAgICBoZWxsby5hZGRNZXRob2QoJ0dFVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihoZWxsb1dvcmxkRnVuY3Rpb24pLCB7XG4gICAgICBhdXRob3JpemF0aW9uVHlwZTogQXV0aG9yaXphdGlvblR5cGUuQ09HTklUTyxcbiAgICAgIGF1dGhvcml6ZXI6IHtcbiAgICAgICAgYXV0aG9yaXplcklkOiBhdXRob3JpemVyLnJlZlxuICAgICAgfVxuICAgICAgXG4gICAgfSlcblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJVc2VyUG9vbElkT3V0cHV0XCIsIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZXJQb29sIElEXCIsXG4gICAgICB2YWx1ZTogdXNlclBvb2wudXNlclBvb2xJZFxuICAgIH0pO1xuICAgIFxuICB9XG59XG5cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xubmV3IEF1dGhTdGFjayhhcHAsICdBdXRoU3RhY2snKTtcbmFwcC5zeW50aCgpOyJdfQ==
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_apigateway_1 = require("@aws-cdk/aws-apigateway");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const core_1 = require("@aws-cdk/core");
const aws_cognito_1 = require("@aws-cdk/aws-cognito");
class AuthStack extends core_1.Stack {
    constructor(app, id) {
        super(app, id);
        // Function that returns 201 with "Hello world!"
        const helloWorldFunction = new aws_lambda_1.Function(this, 'helloWorldFunction', {
            code: new aws_lambda_1.AssetCode('lambdas'),
            handler: 'helloworld.handler',
            runtime: aws_lambda_1.Runtime.NODEJS_12_X
        });
        // Rest API backed by the helloWorldFunction
        const helloWorldLambdaRestApi = new aws_apigateway_1.LambdaRestApi(this, 'helloWorldLambdaRestApi', {
            restApiName: 'Hello World API',
            handler: helloWorldFunction,
            proxy: false,
        });
        // Cognito User Pool with Email Sign-in Type.
        const userPool = new aws_cognito_1.UserPool(this, 'userPool', {
            signInAliases: {
                email: true
            }
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
    }
}
exports.AuthStack = AuthStack;
const app = new core_1.App();
new AuthStack(app, 'AuthStack');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0REFBNkc7QUFDN0csb0RBQW1FO0FBQ25FLHdDQUEyQztBQUMzQyxzREFBK0M7QUFFL0MsTUFBYSxTQUFVLFNBQVEsWUFBSztJQUNsQyxZQUFZLEdBQVEsRUFBRSxFQUFVO1FBQzlCLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFZixnREFBZ0Q7UUFDaEQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ2xFLElBQUksRUFBRSxJQUFJLHNCQUFTLENBQUMsU0FBUyxDQUFDO1lBQzlCLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztTQUM3QixDQUFDLENBQUM7UUFFSCw0Q0FBNEM7UUFDNUMsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQ2pGLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztRQUVILDZDQUE2QztRQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLHNCQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUM5QyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLENBQUMsQ0FBQTtRQUVGLG1EQUFtRDtRQUNuRCx3Q0FBd0M7UUFDeEMsTUFBTSxVQUFVLEdBQUcsSUFBSSw4QkFBYSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDcEQsU0FBUyxFQUFFLHVCQUF1QixDQUFDLFNBQVM7WUFDNUMsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixJQUFJLEVBQUUsb0JBQW9CO1lBQzFCLGNBQWMsRUFBRSxxQ0FBcUM7WUFDckQsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUNyQyxDQUFDLENBQUE7UUFFRix3Q0FBd0M7UUFDeEMsTUFBTSxLQUFLLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVoRSw2REFBNkQ7UUFDN0QsbURBQW1EO1FBQ25ELEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksa0NBQWlCLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNoRSxpQkFBaUIsRUFBRSxrQ0FBaUIsQ0FBQyxPQUFPO1lBQzVDLFVBQVUsRUFBRTtnQkFDVixZQUFZLEVBQUUsVUFBVSxDQUFDLEdBQUc7YUFDN0I7U0FFRixDQUFDLENBQUE7SUFFSixDQUFDO0NBQ0Y7QUFqREQsOEJBaURDO0FBR0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDaEMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGFtYmRhUmVzdEFwaSwgQ2ZuQXV0aG9yaXplciwgTGFtYmRhSW50ZWdyYXRpb24sIEF1dGhvcml6YXRpb25UeXBlIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0IHsgQXNzZXRDb2RlLCBGdW5jdGlvbiwgUnVudGltZSB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgQXBwLCBTdGFjayB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgVXNlclBvb2wgfSBmcm9tICdAYXdzLWNkay9hd3MtY29nbml0bydcblxuZXhwb3J0IGNsYXNzIEF1dGhTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihhcHAsIGlkKTtcblxuICAgIC8vIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyAyMDEgd2l0aCBcIkhlbGxvIHdvcmxkIVwiXG4gICAgY29uc3QgaGVsbG9Xb3JsZEZ1bmN0aW9uID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdoZWxsb1dvcmxkRnVuY3Rpb24nLCB7XG4gICAgICBjb2RlOiBuZXcgQXNzZXRDb2RlKCdsYW1iZGFzJyksXG4gICAgICBoYW5kbGVyOiAnaGVsbG93b3JsZC5oYW5kbGVyJyxcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzEyX1hcbiAgICB9KTtcblxuICAgIC8vIFJlc3QgQVBJIGJhY2tlZCBieSB0aGUgaGVsbG9Xb3JsZEZ1bmN0aW9uXG4gICAgY29uc3QgaGVsbG9Xb3JsZExhbWJkYVJlc3RBcGkgPSBuZXcgTGFtYmRhUmVzdEFwaSh0aGlzLCAnaGVsbG9Xb3JsZExhbWJkYVJlc3RBcGknLCB7XG4gICAgICByZXN0QXBpTmFtZTogJ0hlbGxvIFdvcmxkIEFQSScsXG4gICAgICBoYW5kbGVyOiBoZWxsb1dvcmxkRnVuY3Rpb24sXG4gICAgICBwcm94eTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICAvLyBDb2duaXRvIFVzZXIgUG9vbCB3aXRoIEVtYWlsIFNpZ24taW4gVHlwZS5cbiAgICBjb25zdCB1c2VyUG9vbCA9IG5ldyBVc2VyUG9vbCh0aGlzLCAndXNlclBvb2wnLCB7XG4gICAgICBzaWduSW5BbGlhc2VzOiB7XG4gICAgICAgIGVtYWlsOiB0cnVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEF1dGhvcml6ZXIgZm9yIHRoZSBIZWxsbyBXb3JsZCBBUEkgdGhhdCB1c2VzIHRoZVxuICAgIC8vIENvZ25pdG8gVXNlciBwb29sIHRvIEF1dGhvcml6ZSB1c2Vycy5cbiAgICBjb25zdCBhdXRob3JpemVyID0gbmV3IENmbkF1dGhvcml6ZXIodGhpcywgJ2NmbkF1dGgnLCB7XG4gICAgICByZXN0QXBpSWQ6IGhlbGxvV29ybGRMYW1iZGFSZXN0QXBpLnJlc3RBcGlJZCxcbiAgICAgIG5hbWU6ICdIZWxsb1dvcmxkQVBJQXV0aG9yaXplcicsXG4gICAgICB0eXBlOiAnQ09HTklUT19VU0VSX1BPT0xTJyxcbiAgICAgIGlkZW50aXR5U291cmNlOiAnbWV0aG9kLnJlcXVlc3QuaGVhZGVyLkF1dGhvcml6YXRpb24nLFxuICAgICAgcHJvdmlkZXJBcm5zOiBbdXNlclBvb2wudXNlclBvb2xBcm5dLFxuICAgIH0pXG5cbiAgICAvLyBIZWxsbyBSZXNvdXJjZSBBUEkgZm9yIHRoZSBSRVNUIEFQSS4gXG4gICAgY29uc3QgaGVsbG8gPSBoZWxsb1dvcmxkTGFtYmRhUmVzdEFwaS5yb290LmFkZFJlc291cmNlKCdIRUxMTycpO1xuXG4gICAgLy8gR0VUIG1ldGhvZCBmb3IgdGhlIEhFTExPIEFQSSByZXNvdXJjZS4gSXQgdXNlcyBDb2duaXRvIGZvclxuICAgIC8vIGF1dGhvcml6YXRpb24gYW5kIHRoZSBhdWF0aG9yaXplciBkZWZpbmVkIGFib3ZlLlxuICAgIGhlbGxvLmFkZE1ldGhvZCgnR0VUJywgbmV3IExhbWJkYUludGVncmF0aW9uKGhlbGxvV29ybGRGdW5jdGlvbiksIHtcbiAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBBdXRob3JpemF0aW9uVHlwZS5DT0dOSVRPLFxuICAgICAgYXV0aG9yaXplcjoge1xuICAgICAgICBhdXRob3JpemVySWQ6IGF1dGhvcml6ZXIucmVmXG4gICAgICB9XG4gICAgICBcbiAgICB9KVxuICAgIFxuICB9XG59XG5cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xubmV3IEF1dGhTdGFjayhhcHAsICdBdXRoU3RhY2snKTtcbmFwcC5zeW50aCgpOyJdfQ==
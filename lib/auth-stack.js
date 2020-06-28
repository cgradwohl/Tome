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
        const userPool = new aws_cognito_1.UserPool(this, 'TomeUserPool', {
            signInAliases: {
                email: true
            }
        });
        const userPoolClient = new aws_cognito_1.UserPoolClient(this, 'TomeUserPoolClient', {
            userPoolClientName: 'testClient',
            userPool: userPool,
            authFlows: {
                adminUserPassword: true,
                refreshToken: true,
            },
            preventUserExistenceErrors: true
        });
        // Function that returns 201 with "Hello world!"
        const helloWorldFunction = new aws_lambda_1.Function(this, 'helloWorldFunction', {
            code: new aws_lambda_1.AssetCode('lambdas'),
            handler: 'helloworld.handler',
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
            // this is the only way I have been able to get the pool id
            environment: {
                USER_POOL_ID: userPool.userPoolId,
            }
        });
        const loginFunction = new aws_lambda_1.Function(this, 'login', {
            code: new aws_lambda_1.AssetCode('lambdas'),
            handler: 'login.handler',
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
            environment: {
                USER_POOL_ID: userPool.userPoolId,
                USER_POOL_CLIENT_ID: userPoolClient.userPoolClientId,
            }
        });
        // Rest API backed by the helloWorldFunction
        const helloWorldLambdaRestApi = new aws_apigateway_1.LambdaRestApi(this, 'helloWorldLambdaRestApi', {
            restApiName: 'Hello World API',
            handler: helloWorldFunction,
            proxy: false,
        });
        const loginLambdaRestApi = new aws_apigateway_1.LambdaRestApi(this, 'loginLambdaRestApi', {
            restApiName: 'Login API',
            handler: loginFunction,
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
        const login = loginLambdaRestApi.root.addResource('login');
        // GET method for the HELLO API resource. It uses Cognito for
        // authorization and the auathorizer defined above.
        hello.addMethod('GET', new aws_apigateway_1.LambdaIntegration(helloWorldFunction), {
            authorizationType: aws_apigateway_1.AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: authorizer.ref
            }
        });
        login.addMethod('POST', new aws_apigateway_1.LambdaIntegration(loginFunction));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0REFBNkc7QUFDN0csb0RBQW1FO0FBQ25FLHdDQUFzRDtBQUN0RCxzREFBK0Q7QUFFL0QsTUFBYSxTQUFVLFNBQVEsWUFBSztJQUNsQyxZQUFZLEdBQVEsRUFBRSxFQUFVO1FBQzlCLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFZiw2Q0FBNkM7UUFDN0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxzQkFBUSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDbEQsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLGNBQWMsR0FBRyxJQUFJLDRCQUFjLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ3BFLGtCQUFrQixFQUFFLFlBQVk7WUFDaEMsUUFBUSxFQUFFLFFBQVE7WUFDbEIsU0FBUyxFQUFFO2dCQUNULGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLFlBQVksRUFBRSxJQUFJO2FBQ25CO1lBQ0QsMEJBQTBCLEVBQUUsSUFBSTtTQUNqQyxDQUFDLENBQUM7UUFFSCxnREFBZ0Q7UUFDaEQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ2xFLElBQUksRUFBRSxJQUFJLHNCQUFTLENBQUMsU0FBUyxDQUFDO1lBQzlCLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QiwyREFBMkQ7WUFDM0QsV0FBVyxFQUFFO2dCQUNYLFlBQVksRUFBRSxRQUFRLENBQUMsVUFBVTthQUNsQztTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sYUFBYSxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ2hELElBQUksRUFBRSxJQUFJLHNCQUFTLENBQUMsU0FBUyxDQUFDO1lBQzlCLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsV0FBVyxFQUFFO2dCQUNYLFlBQVksRUFBRSxRQUFRLENBQUMsVUFBVTtnQkFDakMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLGdCQUFnQjthQUNyRDtTQUNGLENBQUMsQ0FBQTtRQUVGLDRDQUE0QztRQUM1QyxNQUFNLHVCQUF1QixHQUFHLElBQUksOEJBQWEsQ0FBQyxJQUFJLEVBQUUseUJBQXlCLEVBQUU7WUFDakYsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ3ZFLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFBO1FBRUYsbURBQW1EO1FBQ25ELHdDQUF3QztRQUN4QyxNQUFNLFVBQVUsR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNwRCxTQUFTLEVBQUUsdUJBQXVCLENBQUMsU0FBUztZQUM1QyxJQUFJLEVBQUUseUJBQXlCO1lBQy9CLElBQUksRUFBRSxvQkFBb0I7WUFDMUIsY0FBYyxFQUFFLHFDQUFxQztZQUNyRCxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1NBQ3JDLENBQUMsQ0FBQTtRQUVGLHdDQUF3QztRQUN4QyxNQUFNLEtBQUssR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWhFLE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFM0QsNkRBQTZEO1FBQzdELG1EQUFtRDtRQUNuRCxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLGtDQUFpQixDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDaEUsaUJBQWlCLEVBQUUsa0NBQWlCLENBQUMsT0FBTztZQUM1QyxVQUFVLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFLFVBQVUsQ0FBQyxHQUFHO2FBQzdCO1NBRUYsQ0FBQyxDQUFBO1FBRUYsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxrQ0FBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO1FBRTdELElBQUksZ0JBQVMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDdEMsV0FBVyxFQUFFLGFBQWE7WUFDMUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxVQUFVO1NBQzNCLENBQUMsQ0FBQztJQUVMLENBQUM7Q0FDRjtBQXhGRCw4QkF3RkM7QUFHRCxNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQUcsRUFBRSxDQUFDO0FBQ3RCLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNoQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYW1iZGFSZXN0QXBpLCBDZm5BdXRob3JpemVyLCBMYW1iZGFJbnRlZ3JhdGlvbiwgQXV0aG9yaXphdGlvblR5cGUgfSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBBc3NldENvZGUsIEZ1bmN0aW9uLCBSdW50aW1lIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBBcHAsIFN0YWNrLCBDZm5PdXRwdXQgfSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IFVzZXJQb29sLCBVc2VyUG9vbENsaWVudCB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2duaXRvJ1xuXG5leHBvcnQgY2xhc3MgQXV0aFN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKGFwcCwgaWQpO1xuXG4gICAgLy8gQ29nbml0byBVc2VyIFBvb2wgd2l0aCBFbWFpbCBTaWduLWluIFR5cGUuXG4gICAgY29uc3QgdXNlclBvb2wgPSBuZXcgVXNlclBvb2wodGhpcywgJ1RvbWVVc2VyUG9vbCcsIHtcbiAgICAgIHNpZ25JbkFsaWFzZXM6IHtcbiAgICAgICAgZW1haWw6IHRydWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgdXNlclBvb2xDbGllbnQgPSBuZXcgVXNlclBvb2xDbGllbnQodGhpcywgJ1RvbWVVc2VyUG9vbENsaWVudCcsIHtcbiAgICAgIHVzZXJQb29sQ2xpZW50TmFtZTogJ3Rlc3RDbGllbnQnLFxuICAgICAgdXNlclBvb2w6IHVzZXJQb29sLFxuICAgICAgYXV0aEZsb3dzOiB7XG4gICAgICAgIGFkbWluVXNlclBhc3N3b3JkOiB0cnVlLFxuICAgICAgICByZWZyZXNoVG9rZW46IHRydWUsXG4gICAgICB9LFxuICAgICAgcHJldmVudFVzZXJFeGlzdGVuY2VFcnJvcnM6IHRydWVcbiAgICB9KTtcblxuICAgIC8vIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyAyMDEgd2l0aCBcIkhlbGxvIHdvcmxkIVwiXG4gICAgY29uc3QgaGVsbG9Xb3JsZEZ1bmN0aW9uID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdoZWxsb1dvcmxkRnVuY3Rpb24nLCB7XG4gICAgICBjb2RlOiBuZXcgQXNzZXRDb2RlKCdsYW1iZGFzJyksXG4gICAgICBoYW5kbGVyOiAnaGVsbG93b3JsZC5oYW5kbGVyJyxcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICAvLyB0aGlzIGlzIHRoZSBvbmx5IHdheSBJIGhhdmUgYmVlbiBhYmxlIHRvIGdldCB0aGUgcG9vbCBpZFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVVNFUl9QT09MX0lEOiB1c2VyUG9vbC51c2VyUG9vbElkLFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbG9naW5GdW5jdGlvbiA9IG5ldyBGdW5jdGlvbih0aGlzLCAnbG9naW4nLCB7XG4gICAgICBjb2RlOiBuZXcgQXNzZXRDb2RlKCdsYW1iZGFzJyksXG4gICAgICBoYW5kbGVyOiAnbG9naW4uaGFuZGxlcicsXG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVVNFUl9QT09MX0lEOiB1c2VyUG9vbC51c2VyUG9vbElkLFxuICAgICAgICBVU0VSX1BPT0xfQ0xJRU5UX0lEOiB1c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkLCBcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gUmVzdCBBUEkgYmFja2VkIGJ5IHRoZSBoZWxsb1dvcmxkRnVuY3Rpb25cbiAgICBjb25zdCBoZWxsb1dvcmxkTGFtYmRhUmVzdEFwaSA9IG5ldyBMYW1iZGFSZXN0QXBpKHRoaXMsICdoZWxsb1dvcmxkTGFtYmRhUmVzdEFwaScsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiAnSGVsbG8gV29ybGQgQVBJJyxcbiAgICAgIGhhbmRsZXI6IGhlbGxvV29ybGRGdW5jdGlvbixcbiAgICAgIHByb3h5OiBmYWxzZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGxvZ2luTGFtYmRhUmVzdEFwaSA9IG5ldyBMYW1iZGFSZXN0QXBpKHRoaXMsICdsb2dpbkxhbWJkYVJlc3RBcGknLCB7XG4gICAgICByZXN0QXBpTmFtZTogJ0xvZ2luIEFQSScsXG4gICAgICBoYW5kbGVyOiBsb2dpbkZ1bmN0aW9uLFxuICAgICAgcHJveHk6IGZhbHNlLFxuICAgIH0pXG5cbiAgICAvLyBBdXRob3JpemVyIGZvciB0aGUgSGVsbG8gV29ybGQgQVBJIHRoYXQgdXNlcyB0aGVcbiAgICAvLyBDb2duaXRvIFVzZXIgcG9vbCB0byBBdXRob3JpemUgdXNlcnMuXG4gICAgY29uc3QgYXV0aG9yaXplciA9IG5ldyBDZm5BdXRob3JpemVyKHRoaXMsICdjZm5BdXRoJywge1xuICAgICAgcmVzdEFwaUlkOiBoZWxsb1dvcmxkTGFtYmRhUmVzdEFwaS5yZXN0QXBpSWQsXG4gICAgICBuYW1lOiAnSGVsbG9Xb3JsZEFQSUF1dGhvcml6ZXInLFxuICAgICAgdHlwZTogJ0NPR05JVE9fVVNFUl9QT09MUycsXG4gICAgICBpZGVudGl0eVNvdXJjZTogJ21ldGhvZC5yZXF1ZXN0LmhlYWRlci5BdXRob3JpemF0aW9uJyxcbiAgICAgIHByb3ZpZGVyQXJuczogW3VzZXJQb29sLnVzZXJQb29sQXJuXSxcbiAgICB9KVxuXG4gICAgLy8gSGVsbG8gUmVzb3VyY2UgQVBJIGZvciB0aGUgUkVTVCBBUEkuIFxuICAgIGNvbnN0IGhlbGxvID0gaGVsbG9Xb3JsZExhbWJkYVJlc3RBcGkucm9vdC5hZGRSZXNvdXJjZSgnSEVMTE8nKTtcblxuICAgIGNvbnN0IGxvZ2luID0gbG9naW5MYW1iZGFSZXN0QXBpLnJvb3QuYWRkUmVzb3VyY2UoJ2xvZ2luJyk7XG5cbiAgICAvLyBHRVQgbWV0aG9kIGZvciB0aGUgSEVMTE8gQVBJIHJlc291cmNlLiBJdCB1c2VzIENvZ25pdG8gZm9yXG4gICAgLy8gYXV0aG9yaXphdGlvbiBhbmQgdGhlIGF1YXRob3JpemVyIGRlZmluZWQgYWJvdmUuXG4gICAgaGVsbG8uYWRkTWV0aG9kKCdHRVQnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oaGVsbG9Xb3JsZEZ1bmN0aW9uKSwge1xuICAgICAgYXV0aG9yaXphdGlvblR5cGU6IEF1dGhvcml6YXRpb25UeXBlLkNPR05JVE8sXG4gICAgICBhdXRob3JpemVyOiB7XG4gICAgICAgIGF1dGhvcml6ZXJJZDogYXV0aG9yaXplci5yZWZcbiAgICAgIH1cbiAgICAgIFxuICAgIH0pXG5cbiAgICBsb2dpbi5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24obG9naW5GdW5jdGlvbikpXG5cbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiVXNlclBvb2xJZE91dHB1dFwiLCB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJVc2VyUG9vbCBJRFwiLFxuICAgICAgdmFsdWU6IHVzZXJQb29sLnVzZXJQb29sSWRcbiAgICB9KTtcbiAgICBcbiAgfVxufVxuXG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbm5ldyBBdXRoU3RhY2soYXBwLCAnQXV0aFN0YWNrJyk7XG5hcHAuc3ludGgoKTsiXX0=
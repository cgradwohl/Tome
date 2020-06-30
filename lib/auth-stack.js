"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_apigateway_1 = require("@aws-cdk/aws-apigateway");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const core_1 = require("@aws-cdk/core");
const aws_cognito_1 = require("@aws-cdk/aws-cognito");
const aws_iam_1 = require("@aws-cdk/aws-iam");
class AuthStack extends core_1.Stack {
    constructor(app, id) {
        super(app, id);
        const preAuthTrigger = new aws_lambda_1.Function(this, 'preAuthTrigger', {
            code: new aws_lambda_1.AssetCode('lambdas'),
            handler: 'preAuthTrigger.handler',
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
        });
        const postAuthTrigger = new aws_lambda_1.Function(this, 'postAuthTrigger', {
            code: new aws_lambda_1.AssetCode('lambdas'),
            handler: 'postAuthTrigger.handler',
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
        });
        // Cognito User Pool with Email Sign-in Type.
        this.userPool = new aws_cognito_1.UserPool(this, 'TomeUserPool', {
            signInAliases: {
                email: true,
            },
            lambdaTriggers: {
                preAuthentication: preAuthTrigger,
                postAuthentication: postAuthTrigger,
            },
        });
        const cfnUserPool = this.userPool.node.defaultChild;
        cfnUserPool.policies = {
            passwordPolicy: {
                minimumLength: 8,
                requireLowercase: false,
                requireNumbers: false,
                requireUppercase: false,
                requireSymbols: false,
            },
        };
        this.cfnUserPool = cfnUserPool;
        this.userPoolClient = new aws_cognito_1.UserPoolClient(this, 'TomeUserPoolClient', {
            generateSecret: false,
            userPool: this.userPool,
            authFlows: {
                adminUserPassword: true,
                refreshToken: true,
            },
            userPoolClientName: 'Tome User Pool Client',
            preventUserExistenceErrors: true,
        });
        this.identityPool = new aws_cognito_1.CfnIdentityPool(this, 'TomeIdentityPool', {
            allowUnauthenticatedIdentities: false,
            cognitoIdentityProviders: [{
                    clientId: this.userPoolClient.userPoolClientId,
                    providerName: this.userPool.userPoolProviderName,
                }],
        });
        const unauthenticatedRole = new aws_iam_1.Role(this, 'CognitoDefaultUnauthenticatedRole', {
            assumedBy: new aws_iam_1.FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: { 'cognito-identity.amazonaws.com:aud': this.identityPool.ref },
                'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'unauthenticated' },
            }, 'sts:AssumeRoleWithWebIdentity'),
        });
        unauthenticatedRole.addToPolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
            actions: [
                'mobileanalytics:PutEvents',
                'cognito-sync:*',
            ],
            resources: ['*'],
        }));
        const authenticatedRole = new aws_iam_1.Role(this, 'CognitoDefaultAuthenticatedRole', {
            assumedBy: new aws_iam_1.FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: { 'cognito-identity.amazonaws.com:aud': this.identityPool.ref },
                'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'authenticated' },
            }, 'sts:AssumeRoleWithWebIdentity'),
        });
        authenticatedRole.addToPolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
            actions: [
                'mobileanalytics:PutEvents',
                'cognito-sync:*',
                'cognito-identity:*',
            ],
            resources: ['*'],
        }));
        const defaultPolicy = new aws_cognito_1.CfnIdentityPoolRoleAttachment(this, 'DefaultValid', {
            identityPoolId: this.identityPool.ref,
            roles: {
                unauthenticated: unauthenticatedRole.roleArn,
                authenticated: authenticatedRole.roleArn,
            },
        });
        // Function that returns 201 with "Hello world!"
        const helloWorldFunction = new aws_lambda_1.Function(this, 'helloWorldFunction', {
            code: new aws_lambda_1.AssetCode('lambdas'),
            handler: 'helloworld.handler',
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
        });
        // Rest API backed by the helloWorldFunction
        // Defines an API Gateway REST API with AWS Lambda proxy integration
        this.apiGateway = new aws_apigateway_1.LambdaRestApi(this, 'TomeApiGateway', {
            restApiName: 'Tome Rest API Gateway',
            handler: helloWorldFunction,
            proxy: false,
        });
        // Authorizer for the Hello World API that uses the
        // Cognito User pool to Authorize users.
        // AWS::ApiGateway::Authorizer
        this.authorizer = new aws_apigateway_1.CfnAuthorizer(this, 'cfnAuth', {
            restApiId: this.apiGateway.restApiId,
            name: 'HelloWorldAPIAuthorizer',
            type: 'COGNITO_USER_POOLS',
            identitySource: 'method.request.header.Authorization',
            providerArns: [this.userPool.userPoolArn],
        });
        // Hello Resource API for the REST API.
        const hello = this.apiGateway.root.addResource('HELLO');
        // GET method for the HELLO API resource. It uses Cognito for
        // authorization and the auathorizer defined above.
        hello.addMethod('GET', new aws_apigateway_1.LambdaIntegration(helloWorldFunction), {
            authorizationType: aws_apigateway_1.AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: this.authorizer.ref,
            },
        });
        const userPoolOutput = new core_1.CfnOutput(this, 'UserPoolIdOutput', {
            description: 'UserPool ID',
            value: this.userPool.userPoolId,
        });
    }
}
exports.default = AuthStack;
const app = new core_1.App();
// eslint-disable-next-line no-new
new AuthStack(app, 'AuthStack');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0REFFaUM7QUFDakMsb0RBQW1FO0FBQ25FLHdDQUFzRDtBQUN0RCxzREFFOEI7QUFFOUIsOENBRTBCO0FBRTFCLE1BQXFCLFNBQVUsU0FBUSxZQUFLO0lBYTFDLFlBQVksR0FBUSxFQUFFLEVBQVU7UUFDOUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVmLE1BQU0sY0FBYyxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDMUQsSUFBSSxFQUFFLElBQUksc0JBQVMsQ0FBQyxTQUFTLENBQUM7WUFDOUIsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1NBQzdCLENBQUMsQ0FBQztRQUVILE1BQU0sZUFBZSxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDNUQsSUFBSSxFQUFFLElBQUksc0JBQVMsQ0FBQyxTQUFTLENBQUM7WUFDOUIsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1NBQzdCLENBQUMsQ0FBQztRQUVILDZDQUE2QztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ2pELGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsSUFBSTthQUNaO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLGlCQUFpQixFQUFFLGNBQWM7Z0JBQ2pDLGtCQUFrQixFQUFFLGVBQWU7YUFDcEM7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUEyQixDQUFDO1FBQ25FLFdBQVcsQ0FBQyxRQUFRLEdBQUc7WUFDckIsY0FB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QUFFO1lBQzdELFdBQVcsRUFBRSxhQUFhO1lBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBM0pELDRCQTJKQztBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksVUFBRyxFQUFFLENBQUM7QUFDdEIsa0NBQWtDO0FBQ2xDLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNoQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBMYW1iZGFSZXN0QXBpLCBDZm5BdXRob3JpemVyLCBMYW1iZGFJbnRlZ3JhdGlvbiwgQXV0aG9yaXphdGlvblR5cGUsXG59IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCB7IEFzc2V0Q29kZSwgRnVuY3Rpb24sIFJ1bnRpbWUgfSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCB7IEFwcCwgU3RhY2ssIENmbk91dHB1dCB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHtcbiAgVXNlclBvb2wsIFVzZXJQb29sQ2xpZW50LCBDZm5Vc2VyUG9vbCwgQ2ZuSWRlbnRpdHlQb29sLCBDZm5JZGVudGl0eVBvb2xSb2xlQXR0YWNobWVudCxcbn0gZnJvbSAnQGF3cy1jZGsvYXdzLWNvZ25pdG8nO1xuXG5pbXBvcnQge1xuICBGZWRlcmF0ZWRQcmluY2lwYWwsIFBvbGljeVN0YXRlbWVudCwgUm9sZSwgRWZmZWN0LFxufSBmcm9tICdAYXdzLWNkay9hd3MtaWFtJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0aFN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBhcGlHYXRld2F5OiBMYW1iZGFSZXN0QXBpO1xuXG4gIGF1dGhvcml6ZXI6IENmbkF1dGhvcml6ZXI7XG5cbiAgdXNlclBvb2w6IFVzZXJQb29sO1xuXG4gIHVzZXJQb29sQ2xpZW50OiBVc2VyUG9vbENsaWVudDtcblxuICBpZGVudGl0eVBvb2w6IENmbklkZW50aXR5UG9vbDtcblxuICBjZm5Vc2VyUG9vbDogQ2ZuVXNlclBvb2w7XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihhcHAsIGlkKTtcblxuICAgIGNvbnN0IHByZUF1dGhUcmlnZ2VyID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdwcmVBdXRoVHJpZ2dlcicsIHtcbiAgICAgIGNvZGU6IG5ldyBBc3NldENvZGUoJ2xhbWJkYXMnKSxcbiAgICAgIGhhbmRsZXI6ICdwcmVBdXRoVHJpZ2dlci5oYW5kbGVyJyxcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwb3N0QXV0aFRyaWdnZXIgPSBuZXcgRnVuY3Rpb24odGhpcywgJ3Bvc3RBdXRoVHJpZ2dlcicsIHtcbiAgICAgIGNvZGU6IG5ldyBBc3NldENvZGUoJ2xhbWJkYXMnKSxcbiAgICAgIGhhbmRsZXI6ICdwb3N0QXV0aFRyaWdnZXIuaGFuZGxlcicsXG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xMl9YLFxuICAgIH0pO1xuXG4gICAgLy8gQ29nbml0byBVc2VyIFBvb2wgd2l0aCBFbWFpbCBTaWduLWluIFR5cGUuXG4gICAgdGhpcy51c2VyUG9vbCA9IG5ldyBVc2VyUG9vbCh0aGlzLCAnVG9tZVVzZXJQb29sJywge1xuICAgICAgc2lnbkluQWxpYXNlczoge1xuICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBsYW1iZGFUcmlnZ2Vyczoge1xuICAgICAgICBwcmVBdXRoZW50aWNhdGlvbjogcHJlQXV0aFRyaWdnZXIsXG4gICAgICAgIHBvc3RBdXRoZW50aWNhdGlvbjogcG9zdEF1dGhUcmlnZ2VyLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNmblVzZXJQb29sID0gdGhpcy51c2VyUG9vbC5ub2RlLmRlZmF1bHRDaGlsZCBhcyBDZm5Vc2VyUG9vbDtcbiAgICBjZm5Vc2VyUG9vbC5wb2xpY2llcyA9IHtcbiAgICAgIHBhc3N3b3JkUG9saWN5OiB7XG4gICAgICAgIG1pbmltdW1MZW5ndGg6IDgsXG4gICAgICAgIHJlcXVpcmVMb3dlcmNhc2U6IGZhbHNlLFxuICAgICAgICByZXF1aXJlTnVtYmVyczogZmFsc2UsXG4gICAgICAgIHJlcXVpcmVVcHBlcmNhc2U6IGZhbHNlLFxuICAgICAgICByZXF1aXJlU3ltYm9sczogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICB0aGlzLmNmblVzZXJQb29sID0gY2ZuVXNlclBvb2w7XG5cbiAgICB0aGlzLnVzZXJQb29sQ2xpZW50ID0gbmV3IFVzZXJQb29sQ2xpZW50KHRoaXMsICdUb21lVXNlclBvb2xDbGllbnQnLCB7XG4gICAgICBnZW5lcmF0ZVNlY3JldDogZmFsc2UsXG4gICAgICB1c2VyUG9vbDogdGhpcy51c2VyUG9vbCxcbiAgICAgIGF1dGhGbG93czoge1xuICAgICAgICBhZG1pblVzZXJQYXNzd29yZDogdHJ1ZSxcbiAgICAgICAgcmVmcmVzaFRva2VuOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHVzZXJQb29sQ2xpZW50TmFtZTogJ1RvbWUgVXNlciBQb29sIENsaWVudCcsXG4gICAgICBwcmV2ZW50VXNlckV4aXN0ZW5jZUVycm9yczogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHRoaXMuaWRlbnRpdHlQb29sID0gbmV3IENmbklkZW50aXR5UG9vbCh0aGlzLCAnVG9tZUlkZW50aXR5UG9vbCcsIHtcbiAgICAgIGFsbG93VW5hdXRoZW50aWNhdGVkSWRlbnRpdGllczogZmFsc2UsXG4gICAgICBjb2duaXRvSWRlbnRpdHlQcm92aWRlcnM6IFt7XG4gICAgICAgIGNsaWVudElkOiB0aGlzLnVzZXJQb29sQ2xpZW50LnVzZXJQb29sQ2xpZW50SWQsXG4gICAgICAgIHByb3ZpZGVyTmFtZTogdGhpcy51c2VyUG9vbC51c2VyUG9vbFByb3ZpZGVyTmFtZSxcbiAgICAgIH1dLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdW5hdXRoZW50aWNhdGVkUm9sZSA9IG5ldyBSb2xlKHRoaXMsICdDb2duaXRvRGVmYXVsdFVuYXV0aGVudGljYXRlZFJvbGUnLCB7XG4gICAgICBhc3N1bWVkQnk6IG5ldyBGZWRlcmF0ZWRQcmluY2lwYWwoJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbScsIHtcbiAgICAgICAgU3RyaW5nRXF1YWxzOiB7ICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206YXVkJzogdGhpcy5pZGVudGl0eVBvb2wucmVmIH0sXG4gICAgICAgICdGb3JBbnlWYWx1ZTpTdHJpbmdMaWtlJzogeyAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tOmFtcic6ICd1bmF1dGhlbnRpY2F0ZWQnIH0sXG4gICAgICB9LCAnc3RzOkFzc3VtZVJvbGVXaXRoV2ViSWRlbnRpdHknKSxcbiAgICB9KTtcblxuICAgIHVuYXV0aGVudGljYXRlZFJvbGUuYWRkVG9Qb2xpY3kobmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICBlZmZlY3Q6IEVmZmVjdC5BTExPVyxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgJ21vYmlsZWFuYWx5dGljczpQdXRFdmVudHMnLFxuICAgICAgICAnY29nbml0by1zeW5jOionLFxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgfSkpO1xuXG4gICAgY29uc3QgYXV0aGVudGljYXRlZFJvbGUgPSBuZXcgUm9sZSh0aGlzLCAnQ29nbml0b0RlZmF1bHRBdXRoZW50aWNhdGVkUm9sZScsIHtcbiAgICAgIGFzc3VtZWRCeTogbmV3IEZlZGVyYXRlZFByaW5jaXBhbCgnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tJywge1xuICAgICAgICBTdHJpbmdFcXVhbHM6IHsgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbTphdWQnOiB0aGlzLmlkZW50aXR5UG9vbC5yZWYgfSxcbiAgICAgICAgJ0ZvckFueVZhbHVlOlN0cmluZ0xpa2UnOiB7ICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206YW1yJzogJ2F1dGhlbnRpY2F0ZWQnIH0sXG4gICAgICB9LCAnc3RzOkFzc3VtZVJvbGVXaXRoV2ViSWRlbnRpdHknKSxcbiAgICB9KTtcblxuICAgIGF1dGhlbnRpY2F0ZWRSb2xlLmFkZFRvUG9saWN5KG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdtb2JpbGVhbmFseXRpY3M6UHV0RXZlbnRzJyxcbiAgICAgICAgJ2NvZ25pdG8tc3luYzoqJyxcbiAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHk6KicsXG4gICAgICBdLFxuICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICB9KSk7XG5cbiAgICBjb25zdCBkZWZhdWx0UG9saWN5ID0gbmV3IENmbklkZW50aXR5UG9vbFJvbGVBdHRhY2htZW50KHRoaXMsICdEZWZhdWx0VmFsaWQnLCB7XG4gICAgICBpZGVudGl0eVBvb2xJZDogdGhpcy5pZGVudGl0eVBvb2wucmVmLFxuICAgICAgcm9sZXM6IHtcbiAgICAgICAgdW5hdXRoZW50aWNhdGVkOiB1bmF1dGhlbnRpY2F0ZWRSb2xlLnJvbGVBcm4sXG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IGF1dGhlbnRpY2F0ZWRSb2xlLnJvbGVBcm4sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gRnVuY3Rpb24gdGhhdCByZXR1cm5zIDIwMSB3aXRoIFwiSGVsbG8gd29ybGQhXCJcbiAgICBjb25zdCBoZWxsb1dvcmxkRnVuY3Rpb24gPSBuZXcgRnVuY3Rpb24odGhpcywgJ2hlbGxvV29ybGRGdW5jdGlvbicsIHtcbiAgICAgIGNvZGU6IG5ldyBBc3NldENvZGUoJ2xhbWJkYXMnKSxcbiAgICAgIGhhbmRsZXI6ICdoZWxsb3dvcmxkLmhhbmRsZXInLFxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICB9KTtcblxuICAgIC8vIFJlc3QgQVBJIGJhY2tlZCBieSB0aGUgaGVsbG9Xb3JsZEZ1bmN0aW9uXG4gICAgLy8gRGVmaW5lcyBhbiBBUEkgR2F0ZXdheSBSRVNUIEFQSSB3aXRoIEFXUyBMYW1iZGEgcHJveHkgaW50ZWdyYXRpb25cbiAgICB0aGlzLmFwaUdhdGV3YXkgPSBuZXcgTGFtYmRhUmVzdEFwaSh0aGlzLCAnVG9tZUFwaUdhdGV3YXknLCB7XG4gICAgICByZXN0QXBpTmFtZTogJ1RvbWUgUmVzdCBBUEkgR2F0ZXdheScsXG4gICAgICBoYW5kbGVyOiBoZWxsb1dvcmxkRnVuY3Rpb24sIC8vIE5PVEU6IGhhbmRsZXIgaXMgdGhlIGRlZmF1bHQgTGFtYmRhIGZ1bmN0aW9uIHRoYXQgaGFuZGxlcyBhbGwgcmVxdWVzdHMgZnJvbSB0aGlzIEFQSSB1bmxlc3Mgc29tZXRoaW5nIGVsc2UgaXMgZGVmaW5lZCBieSBhZGRNZXRob2QoKVxuICAgICAgcHJveHk6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgLy8gQXV0aG9yaXplciBmb3IgdGhlIEhlbGxvIFdvcmxkIEFQSSB0aGF0IHVzZXMgdGhlXG4gICAgLy8gQ29nbml0byBVc2VyIHBvb2wgdG8gQXV0aG9yaXplIHVzZXJzLlxuICAgIC8vIEFXUzo6QXBpR2F0ZXdheTo6QXV0aG9yaXplclxuICAgIHRoaXMuYXV0aG9yaXplciA9IG5ldyBDZm5BdXRob3JpemVyKHRoaXMsICdjZm5BdXRoJywge1xuICAgICAgcmVzdEFwaUlkOiB0aGlzLmFwaUdhdGV3YXkucmVzdEFwaUlkLFxuICAgICAgbmFtZTogJ0hlbGxvV29ybGRBUElBdXRob3JpemVyJyxcbiAgICAgIHR5cGU6ICdDT0dOSVRPX1VTRVJfUE9PTFMnLFxuICAgICAgaWRlbnRpdHlTb3VyY2U6ICdtZXRob2QucmVxdWVzdC5oZWFkZXIuQXV0aG9yaXphdGlvbicsXG4gICAgICBwcm92aWRlckFybnM6IFt0aGlzLnVzZXJQb29sLnVzZXJQb29sQXJuXSxcbiAgICB9KTtcblxuICAgIC8vIEhlbGxvIFJlc291cmNlIEFQSSBmb3IgdGhlIFJFU1QgQVBJLlxuICAgIGNvbnN0IGhlbGxvID0gdGhpcy5hcGlHYXRld2F5LnJvb3QuYWRkUmVzb3VyY2UoJ0hFTExPJyk7XG5cbiAgICAvLyBHRVQgbWV0aG9kIGZvciB0aGUgSEVMTE8gQVBJIHJlc291cmNlLiBJdCB1c2VzIENvZ25pdG8gZm9yXG4gICAgLy8gYXV0aG9yaXphdGlvbiBhbmQgdGhlIGF1YXRob3JpemVyIGRlZmluZWQgYWJvdmUuXG4gICAgaGVsbG8uYWRkTWV0aG9kKCdHRVQnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oaGVsbG9Xb3JsZEZ1bmN0aW9uKSwge1xuICAgICAgYXV0aG9yaXphdGlvblR5cGU6IEF1dGhvcml6YXRpb25UeXBlLkNPR05JVE8sXG4gICAgICBhdXRob3JpemVyOiB7XG4gICAgICAgIGF1dGhvcml6ZXJJZDogdGhpcy5hdXRob3JpemVyLnJlZixcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCB1c2VyUG9vbE91dHB1dCA9IG5ldyBDZm5PdXRwdXQodGhpcywgJ1VzZXJQb29sSWRPdXRwdXQnLCB7XG4gICAgICBkZXNjcmlwdGlvbjogJ1VzZXJQb29sIElEJyxcbiAgICAgIHZhbHVlOiB0aGlzLnVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ld1xubmV3IEF1dGhTdGFjayhhcHAsICdBdXRoU3RhY2snKTtcbmFwcC5zeW50aCgpO1xuIl19
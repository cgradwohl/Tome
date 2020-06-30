"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const aws_cognito_1 = require("@aws-cdk/aws-cognito");
class TomeStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // Auth:
        // Cognito User Pool
        // note this is from the construct library and not a CFN Construct
        this.userPool = new aws_cognito_1.UserPool(this, 'TomeUserPool', {
            signInAliases: {
                email: true,
            },
            signInCaseSensitive: false,
            autoVerify: {
                email: true,
            },
            passwordPolicy: {
                minLength: 8,
                requireLowercase: true,
                requireDigits: true,
                requireUppercase: true,
                requireSymbols: true,
            },
            standardAttributes: {
                givenName: {
                    mutable: true,
                    required: true,
                },
                familyName: {
                    mutable: true,
                    required: true,
                },
                email: {
                    mutable: true,
                    required: true,
                },
            },
        });
        this.userPoolClient = new aws_cognito_1.UserPoolClient(this, 'TomeTestUserPoolClient', {
            userPoolClientName: 'testClient',
            userPool: this.userPool,
            authFlows: {
                adminUserPassword: true,
                refreshToken: true,
            },
            preventUserExistenceErrors: true,
        });
        // Lambda
        // DynamoDB Table
        // User Data: Profile, Library, Group Meta, Queue, Tome
        // API Gateway
        // Cognito Authorizer
        // Lambda w/ read access to DDD
        // DynamoDB Table
        // TODO: folder structure (infra vs application code .... or are they the same?   :))
    }
}
exports.default = TomeStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9tZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvbWUtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBcUM7QUFDckMsc0RBQWdFO0FBRWhFLE1BQXFCLFNBQVUsU0FBUSxHQUFHLENBQUMsS0FBSztJQUs5QyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZDQUE2QztRQUU3QyxRQUFRO1FBQ1Isb0JBQW9CO1FBQ3BCLGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ2pELGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsSUFBSTthQUNaO1lBQ0QsbUJBQW1CLEVBQUUsS0FBSztZQUMxQixVQUFVLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7YUFDWjtZQUNELGNBQWMsRUFBRTtnQkFDZCxTQUFTLEVBQUUsQ0FBQztnQkFDWixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsY0FBYyxFQUFFLElBQUk7YUFDckI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDbEIsU0FBUyxFQUFFO29CQUNULE9BQU8sRUFBRSxJQUFJO29CQUNiLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixPQUFPLEVBQUUsSUFBSTtvQkFDYixRQUFRLEVBQUUsSUFBSTtpQkFDZjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsT0FBTyxFQUFFLElBQUk7b0JBQ2IsUUFBUSxFQUFFLElBQUk7aUJBQ2Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSw0QkFBYyxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUN2RSxrQkFBa0IsRUFBRSxZQUFZO1lBQ2hDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsaUJBQWlCLEVBQUUsSUFBSTtnQkFDdkIsWUFBWSxFQUFFLElBQUk7YUFDbkI7WUFDRCwwQkFBMEIsRUFBRSxJQUFJO1NBQ2pDLENBQUMsQ0FBQztRQUVILFNBQVM7UUFDVCxpQkFBaUI7UUFFakIsdURBQXVEO1FBQ3ZELGNBQWM7UUFDZCxxQkFBcUI7UUFDckIsK0JBQStCO1FBQy9CLGlCQUFpQjtRQUVqQixxRkFBcUY7SUFDdkYsQ0FBQztDQUNGO0FBakVELDRCQWlFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IFVzZXJQb29sLCBVc2VyUG9vbENsaWVudCB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2duaXRvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9tZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgdXNlclBvb2w6IFVzZXJQb29sO1xuXG4gIHVzZXJQb29sQ2xpZW50OiBVc2VyUG9vbENsaWVudDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gVGhlIGNvZGUgdGhhdCBkZWZpbmVzIHlvdXIgc3RhY2sgZ29lcyBoZXJlXG5cbiAgICAvLyBBdXRoOlxuICAgIC8vIENvZ25pdG8gVXNlciBQb29sXG4gICAgLy8gbm90ZSB0aGlzIGlzIGZyb20gdGhlIGNvbnN0cnVjdCBsaWJyYXJ5IGFuZCBub3QgYSBDRk4gQ29uc3RydWN0XG4gICAgdGhpcy51c2VyUG9vbCA9IG5ldyBVc2VyUG9vbCh0aGlzLCAnVG9tZVVzZXJQb29sJywge1xuICAgICAgc2lnbkluQWxpYXNlczoge1xuICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBzaWduSW5DYXNlU2Vuc2l0aXZlOiBmYWxzZSxcbiAgICAgIGF1dG9WZXJpZnk6IHtcbiAgICAgICAgZW1haWw6IHRydWUsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmRQb2xpY3k6IHtcbiAgICAgICAgbWluTGVuZ3RoOiA4LFxuICAgICAgICByZXF1aXJlTG93ZXJjYXNlOiB0cnVlLFxuICAgICAgICByZXF1aXJlRGlnaXRzOiB0cnVlLFxuICAgICAgICByZXF1aXJlVXBwZXJjYXNlOiB0cnVlLFxuICAgICAgICByZXF1aXJlU3ltYm9sczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBzdGFuZGFyZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgZ2l2ZW5OYW1lOiB7XG4gICAgICAgICAgbXV0YWJsZTogdHJ1ZSxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZmFtaWx5TmFtZToge1xuICAgICAgICAgIG11dGFibGU6IHRydWUsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgbXV0YWJsZTogdHJ1ZSxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnVzZXJQb29sQ2xpZW50ID0gbmV3IFVzZXJQb29sQ2xpZW50KHRoaXMsICdUb21lVGVzdFVzZXJQb29sQ2xpZW50Jywge1xuICAgICAgdXNlclBvb2xDbGllbnROYW1lOiAndGVzdENsaWVudCcsXG4gICAgICB1c2VyUG9vbDogdGhpcy51c2VyUG9vbCxcbiAgICAgIGF1dGhGbG93czoge1xuICAgICAgICBhZG1pblVzZXJQYXNzd29yZDogdHJ1ZSxcbiAgICAgICAgcmVmcmVzaFRva2VuOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHByZXZlbnRVc2VyRXhpc3RlbmNlRXJyb3JzOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgLy8gTGFtYmRhXG4gICAgLy8gRHluYW1vREIgVGFibGVcblxuICAgIC8vIFVzZXIgRGF0YTogUHJvZmlsZSwgTGlicmFyeSwgR3JvdXAgTWV0YSwgUXVldWUsIFRvbWVcbiAgICAvLyBBUEkgR2F0ZXdheVxuICAgIC8vIENvZ25pdG8gQXV0aG9yaXplclxuICAgIC8vIExhbWJkYSB3LyByZWFkIGFjY2VzcyB0byBERERcbiAgICAvLyBEeW5hbW9EQiBUYWJsZVxuXG4gICAgLy8gVE9ETzogZm9sZGVyIHN0cnVjdHVyZSAoaW5mcmEgdnMgYXBwbGljYXRpb24gY29kZSAuLi4uIG9yIGFyZSB0aGV5IHRoZSBzYW1lPyAgIDopKVxuICB9XG59XG4iXX0=
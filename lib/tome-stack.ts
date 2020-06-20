import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
export class TomeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Auth:
    // Cognito User Pool
    // note this is from the construct library and not a CFN Construct
    const userPool = new cognito.UserPool(this, 'TomeUserPool', {
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
        requireSymbols: true
      },
      standardAttributes: {
        givenName: {
          mutable: true,
          required: true
        },
        familyName: {
          mutable: true,
          required: true
        },
        email: {
          mutable: true,
          required: true
        }
      }
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

import * as cdk from '@aws-cdk/core';

export class TomeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Auth:
    // Cognito User Pool
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

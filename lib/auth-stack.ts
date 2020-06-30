import {
  LambdaRestApi, CfnAuthorizer, LambdaIntegration, AuthorizationType,
} from '@aws-cdk/aws-apigateway';
import { AssetCode, Function, Runtime } from '@aws-cdk/aws-lambda';
import { App, Stack, CfnOutput } from '@aws-cdk/core';
import {
  UserPool, UserPoolClient, CfnUserPool, CfnIdentityPool, CfnIdentityPoolRoleAttachment,
} from '@aws-cdk/aws-cognito';

import {
  FederatedPrincipal, PolicyStatement, Role, Effect,
} from '@aws-cdk/aws-iam';

export default class AuthStack extends Stack {
  apiGateway: LambdaRestApi;

  authorizer: CfnAuthorizer;

  userPool: UserPool;

  userPoolClient: UserPoolClient;

  identityPool: CfnIdentityPool;

  cfnUserPool: CfnUserPool;

  constructor(app: App, id: string) {
    super(app, id);

    const preAuthTrigger = new Function(this, 'preAuthTrigger', {
      code: new AssetCode('lambdas'),
      handler: 'preAuthTrigger.handler',
      runtime: Runtime.NODEJS_12_X,
    });

    const postAuthTrigger = new Function(this, 'postAuthTrigger', {
      code: new AssetCode('lambdas'),
      handler: 'postAuthTrigger.handler',
      runtime: Runtime.NODEJS_12_X,
    });

    // Cognito User Pool with Email Sign-in Type.
    this.userPool = new UserPool(this, 'TomeUserPool', {
      signInAliases: {
        email: true,
      },
      lambdaTriggers: {
        preAuthentication: preAuthTrigger,
        postAuthentication: postAuthTrigger,
      },
    });

    const cfnUserPool = this.userPool.node.defaultChild as CfnUserPool;
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

    this.userPoolClient = new UserPoolClient(this, 'TomeUserPoolClient', {
      generateSecret: false,
      userPool: this.userPool,
      authFlows: {
        adminUserPassword: true,
        refreshToken: true,
      },
      userPoolClientName: 'Tome User Pool Client',
      preventUserExistenceErrors: true,
    });

    this.identityPool = new CfnIdentityPool(this, 'TomeIdentityPool', {
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [{
        clientId: this.userPoolClient.userPoolClientId,
        providerName: this.userPool.userPoolProviderName,
      }],
    });

    const unauthenticatedRole = new Role(this, 'CognitoDefaultUnauthenticatedRole', {
      assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
        StringEquals: { 'cognito-identity.amazonaws.com:aud': this.identityPool.ref },
        'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'unauthenticated' },
      }, 'sts:AssumeRoleWithWebIdentity'),
    });

    unauthenticatedRole.addToPolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'mobileanalytics:PutEvents',
        'cognito-sync:*',
      ],
      resources: ['*'],
    }));

    const authenticatedRole = new Role(this, 'CognitoDefaultAuthenticatedRole', {
      assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
        StringEquals: { 'cognito-identity.amazonaws.com:aud': this.identityPool.ref },
        'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'authenticated' },
      }, 'sts:AssumeRoleWithWebIdentity'),
    });

    authenticatedRole.addToPolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'mobileanalytics:PutEvents',
        'cognito-sync:*',
        'cognito-identity:*',
      ],
      resources: ['*'],
    }));

    const defaultPolicy = new CfnIdentityPoolRoleAttachment(this, 'DefaultValid', {
      identityPoolId: this.identityPool.ref,
      roles: {
        unauthenticated: unauthenticatedRole.roleArn,
        authenticated: authenticatedRole.roleArn,
      },
    });

    // Function that returns 201 with "Hello world!"
    const helloWorldFunction = new Function(this, 'helloWorldFunction', {
      code: new AssetCode('lambdas'),
      handler: 'helloworld.handler',
      runtime: Runtime.NODEJS_12_X,
    });

    // Rest API backed by the helloWorldFunction
    // Defines an API Gateway REST API with AWS Lambda proxy integration
    this.apiGateway = new LambdaRestApi(this, 'TomeApiGateway', {
      restApiName: 'Tome Rest API Gateway',
      handler: helloWorldFunction, // NOTE: handler is the default Lambda function that handles all requests from this API unless something else is defined by addMethod()
      proxy: false,
    });

    // Authorizer for the Hello World API that uses the
    // Cognito User pool to Authorize users.
    // AWS::ApiGateway::Authorizer
    this.authorizer = new CfnAuthorizer(this, 'cfnAuth', {
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
    hello.addMethod('GET', new LambdaIntegration(helloWorldFunction), {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: this.authorizer.ref,
      },
    });

    const userPoolOutput = new CfnOutput(this, 'UserPoolIdOutput', {
      description: 'UserPool ID',
      value: this.userPool.userPoolId,
    });
  }
}

const app = new App();
// eslint-disable-next-line no-new
new AuthStack(app, 'AuthStack');
app.synth();

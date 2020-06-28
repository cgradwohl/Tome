import { LambdaRestApi, CfnAuthorizer, LambdaIntegration, AuthorizationType } from '@aws-cdk/aws-apigateway';
import { AssetCode, Function, Runtime } from '@aws-cdk/aws-lambda';
import { App, Stack, CfnOutput } from '@aws-cdk/core';
import { UserPool, UserPoolClient } from '@aws-cdk/aws-cognito'

export class AuthStack extends Stack {
  constructor(app: App, id: string) {
    super(app, id);

    // Cognito User Pool with Email Sign-in Type.
    const userPool = new UserPool(this, 'TomeUserPool', {
      signInAliases: {
        email: true
      }
    })

    const userPoolClient = new UserPoolClient(this, 'TomeUserPoolClient', {
      userPoolClientName: 'testClient',
      userPool: userPool,
      authFlows: {
        adminUserPassword: true,
        refreshToken: true,
      },
      preventUserExistenceErrors: true
    });

    // Function that returns 201 with "Hello world!"
    const helloWorldFunction = new Function(this, 'helloWorldFunction', {
      code: new AssetCode('lambdas'),
      handler: 'helloworld.handler',
      runtime: Runtime.NODEJS_12_X,
      // this is the only way I have been able to get the pool id
      environment: {
        USER_POOL_ID: userPool.userPoolId,
      }
    });

    const loginFunction = new Function(this, 'login', {
      code: new AssetCode('lambdas'),
      handler: 'login.handler',
      runtime: Runtime.NODEJS_12_X,
      environment: {
        USER_POOL_ID: userPool.userPoolId,
        USER_POOL_CLIENT_ID: userPoolClient.userPoolClientId, 
      }
    })

    // Rest API backed by the helloWorldFunction
    const helloWorldLambdaRestApi = new LambdaRestApi(this, 'helloWorldLambdaRestApi', {
      restApiName: 'Hello World API',
      handler: helloWorldFunction,
      proxy: false,
    });

    const loginLambdaRestApi = new LambdaRestApi(this, 'loginLambdaRestApi', {
      restApiName: 'Login API',
      handler: loginFunction,
      proxy: false,
    })

    // Authorizer for the Hello World API that uses the
    // Cognito User pool to Authorize users.
    const authorizer = new CfnAuthorizer(this, 'cfnAuth', {
      restApiId: helloWorldLambdaRestApi.restApiId,
      name: 'HelloWorldAPIAuthorizer',
      type: 'COGNITO_USER_POOLS',
      identitySource: 'method.request.header.Authorization',
      providerArns: [userPool.userPoolArn],
    })

    // Hello Resource API for the REST API. 
    const hello = helloWorldLambdaRestApi.root.addResource('HELLO');

    const login = loginLambdaRestApi.root.addResource('login');

    // GET method for the HELLO API resource. It uses Cognito for
    // authorization and the auathorizer defined above.
    hello.addMethod('GET', new LambdaIntegration(helloWorldFunction), {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.ref
      }
      
    })

    login.addMethod('POST', new LambdaIntegration(loginFunction))

    new CfnOutput(this, "UserPoolIdOutput", {
      description: "UserPool ID",
      value: userPool.userPoolId
    });
    
  }
}


const app = new App();
new AuthStack(app, 'AuthStack');
app.synth();
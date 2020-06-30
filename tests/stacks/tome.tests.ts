import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import TomeStack from '../../lib/tome-stack';

import { init, given, tearDown } from '../utils';

// console.log = jest.fn()

describe('Cognito User Pool', () => {
  let user: { username: any; firstName: any; lastName: any; };

  beforeAll(async () => {
    await init();
  });

  it('should return a new authed user', async () => {
    // TODO: pull in these values dynamically
    // I like this generate config idea :) ... see below:
    // THIS APPROACH should replace the need to have aws-cred
    // https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/cdk.ts#L384
    // https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/generateConfig.ts#L17
    const app = new cdk.App();
    const tome = new TomeStack(app, 'TomeStack');

    const { userPoolId } = tome.userPool;
    const { userPoolClientId } = tome.userPoolClient;

    console.log('POOL', tome.userPool.userPoolId);

    user = await given.anAuthenticatedUser();

    expect(user.username).toBeDefined();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
  });

  afterAll(async () => {
    await tearDown.an_authenticated_user(user);
  });
});

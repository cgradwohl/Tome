import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import { App, Fn } from '@aws-cdk/core';

import { AuthStack } from '../lib/auth-stack';

const { init } = require('./utils/init');

const app = new App();
const authStack = new AuthStack(app, 'TestAuthStack');



describe('auth-stack', () => {
  beforeAll(async () => {
    console.log('YOOOO');
    await init();
  })
  
  // it('should work', () => {
  //   expect(SynthUtils.toCloudFormation(authStack)).toMatchSnapshot();
  // });

  it('should deploy user pool', () => { 
    expect(authStack).toHaveResource('AWS::Cognito::UserPool', {
      AutoVerifiedAttributes: [
        "email"
      ],
      AdminCreateUserConfig: {
        AllowAdminCreateUserOnly: true,
      },
      AccountRecoverySetting: {
        RecoveryMechanisms: [
          {
            Name: "verified_phone_number",
            Priority: 1,
          },
          {
            Name: "verified_email",
            Priority: 2,
          },
        ],
      },
    });
  })
});
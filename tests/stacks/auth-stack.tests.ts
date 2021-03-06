import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import { App, Fn } from '@aws-cdk/core';

import AuthStack from '../../lib/auth-stack';

const app = new App();
const authStack = new AuthStack(app, 'TestAuthStack');

describe('auth-stack', () => {
  it('should generate expected cloud formation template', () => {
    expect(SynthUtils.toCloudFormation(authStack)).toMatchSnapshot();
  });

  it('should deploy a user pool', () => {
    expect(authStack).toHaveResource('AWS::Cognito::UserPool', {
      AutoVerifiedAttributes: [
        'email',
      ],
      AdminCreateUserConfig: {
        AllowAdminCreateUserOnly: true,
      },
      AccountRecoverySetting: {
        RecoveryMechanisms: [
          {
            Name: 'verified_phone_number',
            Priority: 1,
          },
          {
            Name: 'verified_email',
            Priority: 2,
          },
        ],
      },
    });
  });

  it('should deploy a user pool client', () => { expect('todo').toEqual('todo'); });
});

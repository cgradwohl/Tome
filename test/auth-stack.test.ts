import { SynthUtils } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';

import { AuthStack } from '../lib/auth-stack';

describe('auth-stack', () => {
  it('should work', () => {
    const app = new App();

    const authStack = new AuthStack(app, 'TestAuthStack');

    expect(SynthUtils.toCloudFormation(authStack)).toMatchSnapshot();
  });
});
import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Tome from '../lib/tome-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Tome.TomeStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});

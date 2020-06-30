#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import AuthStack from '../lib/auth-stack';

const app = new cdk.App();
// eslint-disable-next-line no-new
new AuthStack(app, 'AuthStack');

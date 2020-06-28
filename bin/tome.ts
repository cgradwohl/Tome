#!/usr/bin/env node
import '../tests/node_modules/source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AuthStack } from '../lib/auth-stack';

const app = new cdk.App();
new AuthStack(app, 'AuthStack');

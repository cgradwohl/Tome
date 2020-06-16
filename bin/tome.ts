#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TomeStack } from '../lib/tome-stack';

const app = new cdk.App();
new TomeStack(app, 'TomeStack');

#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StatelessStack } from '../infrastructure/toolchain/stateless-stack';
import { toolchainEnvironment } from 'test-platform-cdk-constructs/deployment-stack-pipeline';

const app = new cdk.App();

const deployMode = app.node.tryGetContext('deployMode');
if (!deployMode) {
  throw new Error("deployMode is required in context ('-c deployMode=stateless')");
}

if (deployMode === 'stateless') {
  new StatelessStack(app, 'StatelessStack', {
    env: toolchainEnvironment,
  });

} else {
  throw new Error("Invalid 'deployMode` set in the context");
}

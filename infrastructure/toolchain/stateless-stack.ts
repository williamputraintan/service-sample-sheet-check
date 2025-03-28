import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DeploymentStackPipeline } from 'test-platform-cdk-constructs/deployment-stack-pipeline';
import { SampleSheetCheckerStack } from '../stage/stack';
import { getSampleSheetCheckerProps } from '../stage/config';

export class StatelessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new DeploymentStackPipeline(this, 'DeploymentStackPipeline', {
      githubBranch: 'main',
      githubRepo: 'orcabus/template-service-base',
      stackName: 'DeployStack',
      stack: SampleSheetCheckerStack,
      stackConfig: {
        beta: getSampleSheetCheckerProps('BETA'),
        gamma: getSampleSheetCheckerProps('GAMMA'),
        prod: getSampleSheetCheckerProps('PROD'),
      },
      pipelineName: 'DeploymentPipeline',
      cdkSynthCmd: ['pnpm i'],
    });
  }
}

import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { SampleSheetCheckerStackProps } from './stack';
import { RemovalPolicy } from 'aws-cdk-lib';
type StageName = 'BETA' | 'GAMMA' | 'PROD';

const logsApiGatewayConfig = {
  BETA: {
    retention: RetentionDays.TWO_WEEKS,
    removalPolicy: RemovalPolicy.DESTROY,
  },
  GAMMA: {
    retention: RetentionDays.TWO_WEEKS,
    removalPolicy: RemovalPolicy.DESTROY,
  },
  PROD: {
    retention: RetentionDays.TWO_WEEKS,
    removalPolicy: RemovalPolicy.DESTROY,
  },
};

const corsAllowOrigins = {
  BETA: ['https://orcaui.dev.umccr.org'],
  GAMMA: ['https://orcaui.stg.umccr.org'],
  PROD: ['https://orcaui.prod.umccr.org', 'https://orcaui.umccr.org'],
};

export const getSampleSheetCheckerProps = (stage: StageName): SampleSheetCheckerStackProps => {
  const metadataDomainNameDict: Record<StageName, string> = {
    BETA: 'metadata.dev.umccr.org',
    GAMMA: 'metadata.stg.umccr.org',
    PROD: 'metadata.prod.umccr.org',
  };

  return {
    apiGatewayConstructProps: {
      region: 'ap-southeast-2',
      cognitoUserPoolIdParameterName: '/data_portal/client/cog_user_pool_id',
      cognitoClientIdParameterNameArray: [
        '/data_portal/client/data2/cog_app_client_id_stage', // portal - TokenServiceStack
        '/orcaui/cog_app_client_id_stage', // orcaui - https://github.com/umccr/orca-ui
      ],
      corsAllowOrigins: corsAllowOrigins[stage],
      apiGwLogsConfig: logsApiGatewayConfig[stage],
      apiName: 'SSCheck',
      customDomainNamePrefix: 'sscheck-orcabus',
    },
    metadataDomainName: metadataDomainNameDict[stage],
  };
};

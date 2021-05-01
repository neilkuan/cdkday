import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { UserTable } from './user/table';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const handler = new NodejsFunction(this, 'createUser', {
      entry: __dirname + '/create-user.ts',
    });
    const users = new UserTable(this, 'UserTable');
    users.bind(handler);
    new CfnOutput(this, 'invokeLambda', {
      value: `aws lambda invoke --function-name ${handler.functionName} \
      --invocation-type Event --payload file://test.json \
      response.json --cli-binary-format raw-in-base64-out`,
    });
  }
}
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'cdk-v2-dev', { env: devEnv });

app.synth();
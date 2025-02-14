import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data, generateGardenFunction } from './data/resource';

import {
  aws_iam as iam
} from 'aws-cdk-lib'


const backend = defineBackend({
  auth,
  data,
  generateGardenFunction
});

backend.stack.tags.setTag('Project', 'garden-planner');

backend.addOutput({custom: {rootStackName: backend.stack.stackName}});

//Add permissions to the lambda functions to invoke the model
[
  backend.generateGardenFunction.resources.lambda,
  // backend.generateGardenPlanStepsFunction.resources.lambda
].forEach((resource) => {
  resource.addToRolePolicy(
    new iam.PolicyStatement({
      actions: ["bedrock:InvokeModel*"],
      resources: [
          `arn:aws:bedrock:${backend.stack.region}:${backend.stack.account}:inference-profile/*`,
          `arn:aws:bedrock:us-*::foundation-model/*`,
      ],
  }),
  )
})

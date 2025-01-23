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

backend.generateGardenFunction.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    actions: ['bedrock:InvokeModel'],
    resources: ['*']
  })
)

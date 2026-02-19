/**
 * Resolver for retrieveAndGenerate query
 * Calls Amazon Bedrock Knowledge Base RetrieveAndGenerate API
 */

import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
} from '@aws-sdk/client-bedrock-agent-runtime';

const KNOWLEDGE_BASE_ID = process.env.KNOWLEDGE_BASE_ID || 'ADKJBIWTSD';
const REGION = process.env.AWS_REGION || 'us-east-1';
const MODEL_ARN = `arn:aws:bedrock:${REGION}::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0`;

const client = new BedrockAgentRuntimeClient({ region: REGION });

export function request(ctx) {
  return {};
}

export async function response(ctx) {
  const { query } = ctx.args;

  try {
    const command = new RetrieveAndGenerateCommand({
      input: {
        text: query,
      },
      retrieveAndGenerateConfiguration: {
        type: 'KNOWLEDGE_BASE',
        knowledgeBaseConfiguration: {
          knowledgeBaseId: KNOWLEDGE_BASE_ID,
          modelArn: MODEL_ARN,
          retrievalConfiguration: {
            vectorSearchConfiguration: {
              numberOfResults: 5,
            },
          },
        },
      },
    });

    const response = await client.send(command);

    // Extract sources from citations
    const sources = [];
    if (response.citations && response.citations.length > 0) {
      response.citations.forEach((citation) => {
        citation.retrievedReferences?.forEach((ref) => {
          if (ref.location?.s3Location?.uri && ref.content?.text) {
            sources.push({
              uri: ref.location.s3Location.uri,
              score: ref.metadata?.score || 0,
              text: ref.content.text.substring(0, 500), // Limit text length
            });
          }
        });
      });
    }

    return {
      answer: response.output?.text || 'No answer generated',
      sources: JSON.stringify(sources),
    };
  } catch (error) {
    console.error('RetrieveAndGenerate error:', error);
    throw new Error(`Failed to retrieve and generate: ${error.message}`);
  }
}

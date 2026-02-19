import { Construct } from 'constructs';
import {
  aws_bedrock as bedrock,
  aws_s3 as s3,
  aws_iam as iam,
  aws_lambda as lambda,
  CfnOutput,
  Duration,
  CustomResource,
} from 'aws-cdk-lib';
import { Provider } from 'aws-cdk-lib/custom-resources';

// Import S3 Vectors L1 constructs
import { CfnVectorBucket, CfnIndex } from 'aws-cdk-lib/aws-s3vectors';

export interface KnowledgeBaseProps {
  /**
   * S3 bucket for document storage
   */
  documentBucket: s3.IBucket;

  /**
   * Name prefix for resources
   */
  namePrefix: string;

  /**
   * AWS region
   */
  region: string;

  /**
   * AWS account ID
   */
  accountId: string;
}

/**
 * Creates an Amazon Bedrock Knowledge Base with S3 Vectors
 * 
 * S3 Vectors provides:
 * - Native vector storage in S3
 * - Up to 2 billion vectors per index
 * - Sub-100ms query latencies
 * - Up to 90% cost reduction vs traditional vector databases
 */
export class KnowledgeBaseConstruct extends Construct {
  public readonly knowledgeBase: bedrock.CfnKnowledgeBase;
  public readonly dataSource: bedrock.CfnDataSource;
  public readonly knowledgeBaseId: string;
  public readonly dataSourceId: string;

  constructor(scope: Construct, id: string, props: KnowledgeBaseProps) {
    super(scope, id);

    // Create IAM role for Knowledge Base
    const knowledgeBaseRole = new iam.Role(this, 'KnowledgeBaseRole', {
      assumedBy: new iam.ServicePrincipal('bedrock.amazonaws.com', {
        conditions: {
          StringEquals: {
            'aws:SourceAccount': props.accountId,
          },
          ArnLike: {
            'aws:SourceArn': `arn:aws:bedrock:${props.region}:${props.accountId}:knowledge-base/*`,
          },
        },
      }),
      description: 'Role for Bedrock Knowledge Base to access S3 and S3 Vectors',
    });

    // Grant S3 read permissions for source documents
    props.documentBucket.grantRead(knowledgeBaseRole);

    // Create S3 Vector Bucket for vector storage
    const vectorBucket = new CfnVectorBucket(this, 'VectorBucket', {
      // VectorBucket doesn't require explicit properties - it's auto-configured
    });

    // Create S3 Vector Index
    // Configure nonFilterableMetadataKeys to avoid 2KB filterable metadata limit
    // AMAZON_BEDROCK_TEXT_CHUNK contains the actual chunk text and can be large
    // AMAZON_BEDROCK_METADATA contains additional metadata that can also be large
    const vectorIndex = new CfnIndex(this, 'VectorIndex', {
      vectorBucketArn: vectorBucket.attrVectorBucketArn,
      dataType: 'float32',
      dimension: 1024, // Titan Text Embeddings V2 dimension
      distanceMetric: 'cosine',
      metadataConfiguration: {
        nonFilterableMetadataKeys: [
          'AMAZON_BEDROCK_TEXT_CHUNK', // Move large text content to non-filterable
          'AMAZON_BEDROCK_METADATA',   // Move additional metadata to non-filterable
        ],
      },
    });

    // Grant S3 Vectors permissions to Knowledge Base role
    // Permissions must be granted on both the vector bucket and the index
    const s3VectorsPolicy = new iam.Policy(this, 'S3VectorsPolicy', {
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            's3vectors:PutVectors',
            's3vectors:GetVectors',
            's3vectors:DeleteVectors',
            's3vectors:QueryVectors',
            's3vectors:GetIndex',
            's3vectors:ListIndexes',
          ],
          resources: [
            vectorBucket.attrVectorBucketArn,
            `${vectorBucket.attrVectorBucketArn}/*`,
            vectorIndex.ref,
          ],
        }),
      ],
    });

    s3VectorsPolicy.attachToRole(knowledgeBaseRole);

    // Grant Bedrock model invocation for embeddings and parsing
    knowledgeBaseRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['bedrock:InvokeModel'],
        resources: [
          `arn:aws:bedrock:${props.region}::foundation-model/amazon.titan-embed-text-v2:0`,
          `arn:aws:bedrock:${props.region}::foundation-model/amazon.titan-embed-text-v1`,
          `arn:aws:bedrock:${props.region}::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0`,
          `arn:aws:bedrock:${props.region}::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0`,
        ],
      })
    );

    // Create a custom resource to wait for IAM propagation
    // IAM policies can take up to 10 seconds to propagate globally
    const iamWaiterFunction = new lambda.Function(this, 'IamWaiterFunction', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'index.handler',
      timeout: Duration.seconds(120),
      code: lambda.Code.fromInline(`
from time import sleep
import json

def handler(event, context):
    request_type = event['RequestType']
    
    if request_type in ['Create', 'Update']:
        # Wait 15 seconds for IAM policy propagation
        # AWS recommends waiting 10-15 seconds for IAM changes to propagate
        sleep(15)
    
    return {
        'PhysicalResourceId': 'iam-propagation-waiter',
        'Data': {
            'WaitTime': '15',
            'Status': 'Complete'
        }
    }
      `),
    });

    const iamWaiterProvider = new Provider(this, 'IamWaiterProvider', {
      onEventHandler: iamWaiterFunction,
    });

    const iamWaiter = new CustomResource(this, 'IamWaiter', {
      serviceToken: iamWaiterProvider.serviceToken,
      properties: {
        // Change this value to force re-execution during updates
        Timestamp: Date.now().toString(),
      },
    });

    // Ensure the waiter runs after the IAM policy is attached
    iamWaiter.node.addDependency(s3VectorsPolicy);
    iamWaiter.node.addDependency(knowledgeBaseRole);

    // Create S3 bucket for multimodal storage (extracted images, audio, video)
    const multimodalBucket = new s3.Bucket(this, 'MultimodalBucket', {
      bucketName: `${props.namePrefix}-multimodal-storage`.toLowerCase().substring(0, 63),
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ['*'], // In production, restrict to your domain
          allowedHeaders: ['*'],
          maxAge: 3000,
        },
      ],
    });

    // Grant read/write permissions for multimodal storage
    multimodalBucket.grantReadWrite(knowledgeBaseRole);

    // Create the Knowledge Base with S3 Vectors
    // Note: Adding timestamp suffix to allow updates that require replacement
    const kbNameSuffix = '-v5'; // Increment when index config changes
    this.knowledgeBase = new bedrock.CfnKnowledgeBase(this, 'KnowledgeBase', {
      name: `${props.namePrefix}-kb${kbNameSuffix}`.substring(0, 64),
      description: 'RAG Knowledge Base with S3 Vectors and Multimodal Parsing',
      roleArn: knowledgeBaseRole.roleArn,
      knowledgeBaseConfiguration: {
        type: 'VECTOR',
        vectorKnowledgeBaseConfiguration: {
          embeddingModelArn: `arn:aws:bedrock:${props.region}::foundation-model/amazon.titan-embed-text-v2:0`,
          embeddingModelConfiguration: {
            bedrockEmbeddingModelConfiguration: {
              dimensions: 1024, // Titan Text Embeddings V2 dimension
              embeddingDataType: 'FLOAT32',
            },
          },
          supplementalDataStorageConfiguration: {
            supplementalDataStorageLocations: [
              {
                supplementalDataStorageLocationType: 'S3',
                s3Location: {
                  uri: `s3://${multimodalBucket.bucketName}/`,
                },
              },
            ],
          },
        },
      },
      storageConfiguration: {
        type: 'S3_VECTORS',
        s3VectorsConfiguration: {
          vectorBucketArn: vectorBucket.attrVectorBucketArn,
          indexArn: vectorIndex.ref,
        },
      },
    });

    // Ensure vector index, S3 Vectors policy, and IAM propagation wait are complete before knowledge base
    this.knowledgeBase.addDependency(vectorIndex);
    this.knowledgeBase.node.addDependency(s3VectorsPolicy);
    this.knowledgeBase.node.addDependency(iamWaiter);

    // Create S3 data source with multimodal parsing
    // Note: Adding timestamp suffix to allow updates that require replacement
    const dsNameSuffix = '-v2'; // Increment when data source config changes
    this.dataSource = new bedrock.CfnDataSource(this, 'DataSource', {
      name: `${props.namePrefix}-s3-ds${dsNameSuffix}`.substring(0, 64),
      description: 'S3 data source for Knowledge Base with multimodal parsing',
      knowledgeBaseId: this.knowledgeBase.attrKnowledgeBaseId,
      dataSourceConfiguration: {
        type: 'S3',
        s3Configuration: {
          bucketArn: props.documentBucket.bucketArn,
          inclusionPrefixes: ['documents/'], // Only index files in documents/ prefix
        },
      },
      vectorIngestionConfiguration: {
        chunkingConfiguration: {
          chunkingStrategy: 'SEMANTIC',
          semanticChunkingConfiguration: {
            maxTokens: 300,
            bufferSize: 1,
            breakpointPercentileThreshold: 95,
          },
        },
        parsingConfiguration: {
          parsingStrategy: 'BEDROCK_FOUNDATION_MODEL',
          bedrockFoundationModelConfiguration: {
            modelArn: `arn:aws:bedrock:${props.region}::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0`,
            parsingPrompt: {
              parsingPromptText: `Extract all text content from this document. For any charts, graphs, or images, describe what they show and extract any numeric data, labels, or key information visible in the image. Be specific about values shown in charts.`,
            },
          },
        },
      },
    });

    this.knowledgeBaseId = this.knowledgeBase.attrKnowledgeBaseId;
    this.dataSourceId = this.dataSource.attrDataSourceId;

    // Outputs
    new CfnOutput(this, 'KnowledgeBaseId', {
      value: this.knowledgeBaseId,
      description: 'Bedrock Knowledge Base ID',
    });

    new CfnOutput(this, 'DataSourceId', {
      value: this.dataSourceId,
      description: 'Knowledge Base Data Source ID',
    });

    new CfnOutput(this, 'VectorBucketArn', {
      value: vectorBucket.attrVectorBucketArn,
      description: 'S3 Vector Bucket ARN',
    });

    new CfnOutput(this, 'VectorIndexArn', {
      value: vectorIndex.ref,
      description: 'S3 Vector Index ARN',
    });

    new CfnOutput(this, 'StorageType', {
      value: 'S3_VECTORS',
      description: 'Vector storage type',
    });

    new CfnOutput(this, 'MultimodalBucketName', {
      value: multimodalBucket.bucketName,
      description: 'S3 bucket for multimodal storage (extracted images, audio, video)',
    });
  }
}

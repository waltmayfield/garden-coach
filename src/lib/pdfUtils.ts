/**
 * Utilities for working with PDF documents in RAG sources
 */

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { fetchAuthSession } from 'aws-amplify/auth';

/**
 * Generate a presigned URL for an S3 object
 * Handles both s3:// URIs and direct S3 paths
 */
export async function generatePresignedUrl(s3Uri: string): Promise<string | null> {
  try {
    // Parse S3 URI: s3://bucket-name/path/to/file.pdf
    const match = s3Uri.match(/^s3:\/\/([^/]+)\/(.+)$/);
    if (!match) {
      console.error('Invalid S3 URI format:', s3Uri);
      return null;
    }

    const [, bucket, key] = match;
    
    // Get AWS credentials from Amplify
    const session = await fetchAuthSession();
    const credentials = session.credentials;
    
    if (!credentials) {
      throw new Error('No AWS credentials available');
    }

    // Create S3 client with credentials
    const s3Client = new S3Client({
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
      },
    });

    // Generate presigned URL
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 1 hour
    });

    return url;
  } catch (error) {
    console.error('Failed to generate presigned URL:', error);
    return null;
  }
}

/**
 * Extract bucket and key from S3 URI
 */
export function parseS3Uri(s3Uri: string): { bucket: string; key: string } | null {
  const match = s3Uri.match(/^s3:\/\/([^/]+)\/(.+)$/);
  if (!match) return null;
  
  const [, bucket, key] = match;
  return { bucket, key };
}

/**
 * Check if a file is a PDF based on URI or MIME type
 */
export function isPdfFile(uri?: string, mimeType?: string): boolean {
  if (mimeType === 'application/pdf') return true;
  if (uri?.toLowerCase().endsWith('.pdf')) return true;
  return false;
}

/**
 * Extract filename from S3 URI
 */
export function getFilenameFromS3Uri(s3Uri: string): string {
  const parts = s3Uri.split('/');
  return parts[parts.length - 1] || 'document.pdf';
}

/**
 * Search for text in PDF and return page number
 * This is a placeholder - actual implementation would use PDF.js
 */
export async function findTextInPdf(
  pdfUrl: string,
  searchText: string
): Promise<number | null> {
  // This would require PDF.js to be loaded
  // For now, return null to indicate page search is not available
  // Implementation would:
  // 1. Load PDF with PDF.js
  // 2. Extract text from each page
  // 3. Search for the chunk text
  console.log('PDF search not yet implemented for:', pdfUrl, searchText);
  // 4. Return the page number
  return null;
}

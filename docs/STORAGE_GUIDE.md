# Storage Guide - Digital Operations Agent

This guide explains how to use AWS Amplify Storage in the Digital Operations Agent application.

## Overview

Storage is configured using Amazon S3 with four access patterns:
- **public/**: Files accessible to all users (read-only for guests, full access for authenticated)
- **protected/{user_id}/**: Owner can write/delete, all authenticated users can read
- **private/{user_id}/**: Only the owner can access
- **uploads/{user_id}/**: Authenticated users can manage their own uploads

## Configuration

Storage is defined in `amplify/storage/resource.ts` and uses entity-based authorization with Cognito identity IDs.

## Frontend Usage

### 1. Install Dependencies

The storage client is already included with `aws-amplify`.

### 2. Upload Files

```typescript
import { uploadData } from 'aws-amplify/storage';

// Upload to public folder
const uploadToPublic = async (file: File) => {
  try {
    const result = await uploadData({
      path: `public/${file.name}`,
      data: file,
      options: {
        contentType: file.type
      }
    }).result;
    console.log('Upload success:', result);
    return result;
  } catch (error) {
    console.error('Upload error:', error);
  }
};

// Upload to private folder (user-specific)
const uploadToPrivate = async (file: File) => {
  try {
    const result = await uploadData({
      path: ({ identityId }) => `private/${identityId}/${file.name}`,
      data: file,
      options: {
        contentType: file.type
      }
    }).result;
    console.log('Upload success:', result);
    return result;
  } catch (error) {
    console.error('Upload error:', error);
  }
};

// Upload with progress tracking
const uploadWithProgress = async (file: File) => {
  const upload = uploadData({
    path: ({ identityId }) => `uploads/${identityId}/${file.name}`,
    data: file,
    options: {
      onProgress: ({ transferredBytes, totalBytes }) => {
        if (totalBytes) {
          const progress = Math.round((transferredBytes / totalBytes) * 100);
          console.log(`Upload progress: ${progress}%`);
        }
      }
    }
  });

  try {
    const result = await upload.result;
    console.log('Upload complete:', result);
    return result;
  } catch (error) {
    console.error('Upload error:', error);
  }
};
```

### 3. Download Files

```typescript
import { getUrl, downloadData } from 'aws-amplify/storage';

// Get a presigned URL (for images, videos, etc.)
const getFileUrl = async (path: string) => {
  try {
    const result = await getUrl({
      path,
      options: {
        expiresIn: 3600 // URL expires in 1 hour
      }
    });
    return result.url.toString();
  } catch (error) {
    console.error('Get URL error:', error);
  }
};

// Download file data
const downloadFile = async (path: string) => {
  try {
    const result = await downloadData({
      path
    }).result;
    
    // Convert to blob for display or download
    const blob = await result.body.blob();
    return blob;
  } catch (error) {
    console.error('Download error:', error);
  }
};
```

### 4. List Files

```typescript
import { list } from 'aws-amplify/storage';

// List files in a folder
const listFiles = async (prefix: string) => {
  try {
    const result = await list({
      path: prefix,
      options: {
        listAll: true // Get all results (not paginated)
      }
    });
    console.log('Files:', result.items);
    return result.items;
  } catch (error) {
    console.error('List error:', error);
  }
};

// List user's private files
const listUserFiles = async () => {
  try {
    const result = await list({
      path: ({ identityId }) => `private/${identityId}/`,
      options: {
        listAll: true
      }
    });
    return result.items;
  } catch (error) {
    console.error('List error:', error);
  }
};
```

### 5. Delete Files

```typescript
import { remove } from 'aws-amplify/storage';

// Delete a file
const deleteFile = async (path: string) => {
  try {
    await remove({ path });
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Delete error:', error);
  }
};

// Delete user's private file
const deleteUserFile = async (filename: string) => {
  try {
    await remove({
      path: ({ identityId }) => `private/${identityId}/${filename}`
    });
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Delete error:', error);
  }
};
```

### 6. Copy Files

```typescript
import { copy } from 'aws-amplify/storage';

// Copy a file
const copyFile = async (sourcePath: string, destinationPath: string) => {
  try {
    const result = await copy({
      source: { path: sourcePath },
      destination: { path: destinationPath }
    });
    console.log('File copied:', result);
    return result;
  } catch (error) {
    console.error('Copy error:', error);
  }
};
```

## React Component Example

```typescript
'use client';

import { useState } from 'react';
import { uploadData, getUrl } from 'aws-amplify/storage';

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      // Upload to user's private folder
      const result = await uploadData({
        path: ({ identityId }) => `private/${identityId}/${file.name}`,
        data: file,
        options: {
          contentType: file.type,
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              const progress = Math.round((transferredBytes / totalBytes) * 100);
              console.log(`Progress: ${progress}%`);
            }
          }
        }
      }).result;

      // Get URL for the uploaded file
      const urlResult = await getUrl({
        path: result.path,
        options: { expiresIn: 3600 }
      });

      setUploadedUrl(urlResult.url.toString());
      alert('Upload successful!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadedUrl && (
        <div className="mt-4">
          <p>File uploaded successfully!</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      )}
    </div>
  );
}
```

## Access Patterns

### Public Files
- **Path**: `public/*`
- **Guest users**: Read only
- **Authenticated users**: Read, write, delete
- **Use case**: Shared resources, public assets

### Protected Files
- **Path**: `protected/{entity_id}/*`
- **Owner**: Read, write, delete
- **Other authenticated users**: Read only
- **Use case**: User profiles, shared documents

### Private Files
- **Path**: `private/{entity_id}/*`
- **Owner**: Read, write, delete
- **Other users**: No access
- **Use case**: Personal documents, sensitive data

### Uploads
- **Path**: `uploads/{entity_id}/*`
- **Owner**: Read, write, delete
- **Other users**: No access
- **Use case**: User-uploaded content, temporary files

## Best Practices

1. **Always specify content type** when uploading files for proper browser handling
2. **Use progress callbacks** for large file uploads to provide user feedback
3. **Handle errors gracefully** with try-catch blocks
4. **Set appropriate expiration times** for presigned URLs based on your use case
5. **Clean up unused files** to manage storage costs
6. **Use the correct path pattern** for your access requirements
7. **Validate file types and sizes** on the client before uploading

## Integration with AI Agent

The AI agent can interact with storage through GraphQL mutations. You may want to:

1. Store AI-generated reports or visualizations
2. Allow users to upload documents for analysis
3. Save conversation artifacts (images, PDFs, etc.)
4. Store map layer data or GeoJSON files

## Deployment

After adding storage:

```bash
# Deploy to sandbox
npm run sandbox

# Or deploy to production
git add .
git commit -m "Add storage configuration"
git push
```

The S3 bucket will be automatically created and configured with the specified access rules.

## Troubleshooting

### Upload fails with "Access Denied"
- Verify user is authenticated
- Check the path matches the access rules
- Ensure the user has the correct permissions

### Cannot download file
- Verify the file exists using `list()`
- Check the path is correct
- Ensure user has read permissions for that path

### URL expires too quickly
- Increase the `expiresIn` value in `getUrl()` options
- Default is 900 seconds (15 minutes)

## Additional Resources

- [AWS Amplify Storage Documentation](https://docs.amplify.aws/react/build-a-backend/storage/)
- [Storage Authorization Rules](https://docs.amplify.aws/react/build-a-backend/storage/authorization/)
- [Amazon S3 Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/best-practices.html)

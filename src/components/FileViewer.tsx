'use client';

import { useState, useEffect } from 'react';
import { getUrl } from 'aws-amplify/storage';
import { Amplify } from 'aws-amplify';
import outputs from '@/../amplify_outputs.json';
import { Loader2 } from 'lucide-react';

interface FileViewerProps {
  s3Key: string;
}

export function FileViewer({ s3Key }: FileViewerProps) {
  const [fileContent, setFileContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFile() {
      try {
        setFileContent('');
        setError(null);
        setIsLoading(true);

        const s3KeyDecoded = s3Key.split('/').map((item: string) => decodeURIComponent(item)).join('/');

        // Configure Amplify with storage configuration
        Amplify.configure(outputs, { ssr: true });

        // Get a signed URL using Amplify Storage
        const { url: signedUrl } = await getUrl({ path: s3KeyDecoded });

        const response = await fetch(signedUrl);
        const content = await response.text();
        setFileContent(content);
      } catch (err) {
        console.error('Error loading file:', err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }

    if (s3Key) {
      fetchFile();
    }
  }, [s3Key]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading File</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col">
      <iframe
        className="h-full w-full border-none flex-1 overflow-auto"
        srcDoc={fileContent}
        onLoad={() => setIsLoading(false)}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-2" />
          <p className="text-gray-600">Loading document...</p>
        </div>
      )}
    </div>
  );
}

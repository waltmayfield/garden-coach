'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePresignedUrl, getFilenameFromS3Uri } from '@/lib/pdfUtils';

interface PdfViewerProps {
  s3Uri: string;
  filename?: string;
  searchText?: string;
  onClose: () => void;
}

export const PdfViewer = ({ s3Uri, filename, searchText, onClose }: PdfViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const displayFilename = filename || getFilenameFromS3Uri(s3Uri);

  useEffect(() => {
    async function loadPdf() {
      try {
        setIsLoading(true);
        setError(null);
        
        const url = await generatePresignedUrl(s3Uri);
        if (!url) {
          throw new Error('Failed to generate PDF URL');
        }
        
        setPdfUrl(url);
      } catch (err) {
        console.error('Failed to load PDF:', err);
        setError(err instanceof Error ? err.message : 'Failed to load PDF');
      } finally {
        setIsLoading(false);
      }
    }

    loadPdf();
  }, [s3Uri]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{displayFilename}</h3>
            {searchText && (
              <span className="text-sm text-gray-500 truncate">
                Searching for: &ldquo;{searchText.substring(0, 50)}...&rdquo;
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {pdfUrl && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(pdfUrl, '_blank')}
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = pdfUrl;
                    a.download = displayFilename;
                    a.click();
                  }}
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading PDF...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="text-red-600 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2">Failed to Load PDF</h4>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={onClose}>Close</Button>
              </div>
            </div>
          )}

          {pdfUrl && !isLoading && !error && (
            <iframe
              src={`${pdfUrl}#search=${encodeURIComponent(searchText || '')}`}
              className="w-full h-full border-0"
              title={displayFilename}
            />
          )}
        </div>

        {/* Footer with instructions */}
        {pdfUrl && !isLoading && !error && searchText && (
          <div className="p-3 border-t bg-blue-50 text-sm text-blue-800">
            <p>
              💡 Tip: Use Ctrl+F (Cmd+F on Mac) to search for the highlighted text within the PDF
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

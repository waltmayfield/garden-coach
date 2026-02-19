'use client';

import { useState } from 'react';

interface MessageImageProps {
  url?: string;
  mediaType?: string;
  filename?: string;
  className?: string;
}

export const MessageImage = ({
  url,
  mediaType,
  filename,
  className,
}: MessageImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!url) {
    return null;
  }

  // Check if it's an image
  const isImage = mediaType?.startsWith('image/') ?? true;

  if (!isImage) {
    // For non-image files, show a file attachment
    return (
      <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 max-w-sm">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {filename || 'Attachment'}
          </p>
          {mediaType && (
            <p className="text-xs text-gray-500">{mediaType}</p>
          )}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Open
        </a>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          position: 'relative',
          maxWidth: '28rem',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb',
          cursor: hasError ? 'default' : 'pointer',
          overflow: 'hidden',
        }}
        className={className}
        onClick={() => !hasError && setIsExpanded(true)}
        onMouseEnter={(e) => {
          if (!hasError) {
            e.currentTarget.style.borderColor = '#d1d5db';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e5e7eb';
        }}
      >
        {/* Error state */}
        {hasError ? (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              backgroundColor: '#f9fafb',
              minHeight: '200px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <svg
                style={{ width: '3rem', height: '3rem', color: '#9ca3af', margin: '0 auto 0.5rem' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Failed to load image</p>
            </div>
          </div>
        ) : (
          <div style={{ position: 'relative', backgroundColor: '#ffffff' }}>
            {/* Image */}
            <img
              src={url}
              alt={filename || 'Image attachment'}
              style={{ 
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'contain',
              }}
              onError={() => {
                console.error('Image failed to load:', url?.substring(0, 100));
                setHasError(true);
              }}
              onLoad={(e) => {
                const img = e.currentTarget;
                console.log('Image loaded successfully', {
                  naturalWidth: img.naturalWidth,
                  naturalHeight: img.naturalHeight,
                  displayWidth: img.width,
                  displayHeight: img.height,
                });
              }}
            />
          </div>
        )}
      </div>

      {/* Expanded modal */}
      {isExpanded && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setIsExpanded(false)}
        >
          <button
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              color: 'white',
              zIndex: 10,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setIsExpanded(false)}
            aria-label="Close"
          >
            <svg
              style={{ width: '2rem', height: '2rem' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={url}
            alt={filename || 'Image attachment'}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

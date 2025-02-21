import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageViewerProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

export function ImageViewer({ isOpen, imageUrl, onClose }: ImageViewerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
         onClick={onClose}>
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <button
          className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors"
          onClick={onClose}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative max-w-7xl max-h-full">
          <Image
            src={imageUrl}
            alt="Defect detail"
            width={1920}
            height={1080}
            className="object-contain max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
} 
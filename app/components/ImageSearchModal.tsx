'use client';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Image, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageSearchModal = ({ isOpen, onClose }: ImageSearchModalProps) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        setIsLoading(true); // Show the loader

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            setTimeout(() => {
              router.push(`/images?image=${encodeURIComponent(data.url)}`);
            }, 2000); // Add 2-second delay before navigation
          } else {
            console.error('File upload failed');
          }
        } catch (error) {
          console.error('Error during file upload');
        } 
      }
    },
    [router]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
  });

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        router.push(`/images?image=${encodeURIComponent(imageUrl)}`);
        setIsLoading(false);
      }, 2000); // Add 2-second delay before navigation
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Spinner/Loader Modal */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
        </div>
      )}

      {/* Main Modal */}
{!isLoading && (

<div className="fixed left-1/2 transform -translate-x-1/2 top-[180px] mt-[75px] lg:top-[225px] w-[92%] lg:w-[584px] z-40">
  <div className="bg-[#303134] rounded-2xl mt-[100px] lg:mt-[130px] p-3 lg:p-4">
    <div className="flex items-center justify-between mb-3 lg:mb-4">
      <h2 className="text-white text-[14px] lg:text-[16px] font-semibold flex-1 text-center">
        Search any image with Google Lens
      </h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-200 transition-colors ml-3 lg:ml-4"
      >
        <X className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
    </div>
    <div
      {...getRootProps()}
      className={`border border-dotted rounded-xl ${
        isDragActive ? 'border-blue-500' : 'border-gray-600'
      } rounded-lg cursor-pointer transition-colors bg-[#202124] p-4 lg:p-6`}
    >
      {/* Content inside child div */}
      <input {...getInputProps()} />
      <div className="flex items-center justify-center gap-2 mb-4 lg:mb-6 min-h-[100px] lg:min-h-[140px]">
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5 lg:w-6 lg:h-6 text-[#8ab4f8]" />
          <span className="text-gray-400 text-sm lg:text-base">
            Drag an image here or{' '}
            <span className="text-[#8ab4f8] hover:underline">upload a file</span>
          </span>
        </div>
      </div>
      <div className="relative mb-4 lg:mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#202124] px-3 lg:px-4 text-xs lg:text-sm text-gray-400 uppercase">
            OR
          </span>
        </div>
      </div>
      <form onSubmit={handleUrlSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Paste image link"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="flex-1 px-3 lg:px-4 py-1.5 lg:py-2 bg-[#303134] border border-gray-600 rounded-full text-white text-sm lg:text-base placeholder-gray-400 focus:outline-none focus:border-[#8ab4f8]"
        />
        <button
          type="submit"
          className="px-4 lg:px-6 py-1.5 lg:py-2 bg-[#303134] text-[#8ab4f8] text-sm lg:text-base rounded-full hover:bg-[#404144] transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  </div>
</div>

)}
    </>
  );
};

export default ImageSearchModal;

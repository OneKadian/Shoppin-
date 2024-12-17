'use client'
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ImageSearchModal from './components/ImageSearchModal';
import LanguageOptions from './components/LanguageOptions';

const Index = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center -mt-32">
        <div className="c"></div>
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png"
          alt="Google"
          className="w-[272px] h-[92px] mb-8"
        />
        
        <SearchBar onCameraClick={() => setIsImageModalOpen(true)} />
        <LanguageOptions />
        
        <ImageSearchModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
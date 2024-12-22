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
      
      {/* <main className="flex-1 flex flex-col items-center justify-center -mt-32"> */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 -mt-32">


        {/* <div className="h-max w-max mb-12 flex justify-center fixed flex-col"> */}
        <div className="h-max w-max mb-12 flex justify-center fixed flex-col z-10">

          <div className='flex justify-center'>
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png"
          alt="Google"
          className="w-[272px] h-[92px] mb-4 "
          // className="w-[272px] h-[92px] mb-8"

        />
          </div>

        <div className="flex justify-center items-center">
        <SearchBar onCameraClick={() => setIsImageModalOpen(true)} />
          </div>
        <LanguageOptions />
        
        <ImageSearchModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
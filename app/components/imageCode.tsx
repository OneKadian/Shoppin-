'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Upload, Grid, Menu, Camera, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ImageSearchResult } from '../types/image-search';
import Image from 'next/image';
import Google from '../../public/Google_2015_logo.svg.png';
import Link from 'next/link';
import { gsap } from 'gsap';
import { CgMenuGridO } from "react-icons/cg";

interface SearchResult {
  position: number;
  title: string;
  link: string;
  redirect_link: string;
  displayed_link: string;
  favicon: string;
  snippet: string;
  snippet_highlighted_words: string[];
  source: string;
  thumbnail?: string; // Optional since some results may not have thumbnails
}

interface ResultsState {
  results: SearchResult[];
}


const Images = () => {
  const router = useRouter();
    const starsContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [imageSource, setImageSource] = useState<string>('');
  const [activeButton, setActiveButton] = useState<'search' | 'text' | 'translate'>('search');
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [Results, setResults] = useState<ResultsState>({ results: [] });
  const [isResultsLoading, setIsResultsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

   const createStar = () => {
    if (!starsContainerRef.current) return;
    
    const star = document.createElement('figure');
    star.className = 'star absolute w-[1px] h-[1px] rounded-full bg-white';
    star.style.boxShadow = '0px 0px 1px 1px rgba(255, 255, 255, 0.4)';
    star.style.top = `${100 * Math.random()}%`;
    star.style.left = `${100 * Math.random()}%`;
    starsContainerRef.current.appendChild(star);
    return star;
  };
  const createStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const star = createStar();
      if (star) stars.push(star);
    }
    return stars;
  };
  const animateStars = (stars: HTMLElement[]) => {
    stars.forEach((star) => {
      gsap.to(star, {
        opacity: Math.random(),
        duration: Math.random() * 0.5 + 0.5,
        onComplete: () => animateStars([star])
      });
    });
  };
  // Fetch and process the reverse image search results
useEffect(() => {
  const imageSourceParam = searchParams.get('image');

  if (!imageSourceParam) {
    router.push('/');
    return;
  }

  setImageSource(imageSourceParam);

  // Stars will now be created in the image onLoad callback instead of here
  // This ensures they appear after the image is loaded

  const fetchReverseImageSearch = async () => {
    try {
      setIsResultsLoading(true);

      const response = await fetch('/api/reverse-image-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: imageSourceParam }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      // Map API results to match the `SearchResult` interface
      const transformedResults: SearchResult[] = data.results.map(
        (result: Partial<SearchResult>, index: number) => ({
          position: result.position || index + 1,
          title: result.title || `Similar Image ${index + 1}`,
          link: result.link || '',
          redirect_link: result.redirect_link || '',
          displayed_link: result.displayed_link || '',
          favicon: result.favicon || '',
          snippet: result.snippet || '',
          snippet_highlighted_words: result.snippet_highlighted_words || [],
          source: result.source || 'Unknown',
          thumbnail: result.thumbnail,
        })
      );

      setResults({ results: transformedResults });
    } catch (error) {
      console.error('Error fetching reverse image search results:', error);
    } finally {
      setIsResultsLoading(false);
      // Don't remove stars here anymore as we want them to persist
    }
  };

  fetchReverseImageSearch();

  // Cleanup: Clear all stars on unmount using innerHTML for better cleanup
  return () => {
    if (starsContainerRef.current) {
      starsContainerRef.current.innerHTML = '';
    }
  };
}, [router, searchParams]);


   const handleCardClick = (link: string) => {
    window.open(link, '_blank');
  };


    const ResultCard = ({ result }: { result: SearchResult }) => (
    <Card 
      className="bg-[#303134] border-none cursor-pointer hover:bg-[#3c4043] transition-colors duration-200"
      onClick={() => handleCardClick(result.link)}
    >
      <div className="p-4 space-y-3">
        <div className="w-full h-40 bg-[#202124] rounded-lg overflow-hidden">
          <img
            src={result.thumbnail || result.favicon} 
            // src={result.thumbnail } 
            alt={result.title}
            className="w-full h-full object-contain"
            // width={100}
            // height={100}
          />
        </div>
        <h3 className="text-white font-medium line-clamp-2">{result.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{result.snippet}</p>
      </div>
    </Card>
  );

  if (!imageSource) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#202124] text-white">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-6">
            {/* <Menu className="w-6 h-6 text-gray-600 cursor-pointer" /> */}
            <Link href="/">
              <Image
                src={Google}
                alt="Google"
                className="h-8 w-22"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-gray-100"
            >
              <Upload className="w-5 h-5 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-gray-100"
            >
              <Grid className="w-5 h-5 text-gray-800" />
              {/* <CgMenuGridO className="w-6 h-6 text-gray-800" /> */}
            </Button>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
              <Link href="https://maple-cheese-7fb.notion.site/So-you-re-just-a-chill-guy-who-clicked-1626e8906fa58042a7bed685f12e7de1">
              A
              
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
<div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
  {/* Left Half - Image Editor */}
  <div className="w-full h-1/2 lg:w-1/2 lg:h-full lg:border-r lg:border-gray-700 p-6">
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Find image source button */}
      <Button
        variant="outline"
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-[#303134] hover:bg-[#303134]/80 border-none"
      >
        <Search className="w-4 h-4 mr-2" />
        Find image source
      </Button>

      {/* Original cropper */}
      <div className="relative w-full h-full flex items-center justify-center mt-8 lg:mt-1">
        {isImageLoading && (
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mb-4" />
        )}
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          className={`max-h-[80%] max-w-[90%] ${
            isImageLoading ? "hidden" : "block"
          }`}
        >
          {isResultsLoading && (
            <div
              ref={starsContainerRef}
              className="absolute inset-0 pointer-events-none z-10"
            />
          )}
          <img
            src={imageSource}
            alt="Uploaded"
            className="max-w-[90%] max-h-[80%] object-contain"
            onLoad={() => {
              setIsImageLoading(false);
              if (starsContainerRef.current) {
                const stars = createStars(200);
                animateStars(stars);
              }
            }}
          />
        </ReactCrop>
      </div>

      {/* Action buttons */}
      <div className="action-buttons-group flex items-center rounded-xl" >
        <button
          className={`action-button ${
            activeButton === "search" ? "active" : "inactive"
          }`}
          onClick={() => setActiveButton("search")}
        >
          Search
        </button>
        <button
          className={`action-button ${
            activeButton === "text" ? "active" : "inactive"
          }`}
          onClick={() => setActiveButton("text")}
        >
          Text
        </button>
        <button
          className={`action-button ${
            activeButton === "translate" ? "active" : "inactive"
          }`}
          onClick={() => setActiveButton("translate")}
        >
          Translate
        </button>
      </div>
    </div>
  </div>

  {/* Right Half - Results */}
  <div className="w-full h-1/2 lg:w-1/2 lg:h-full flex flex-col bg-white text-black">
    {isLoading ? (
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-black border-t-transparent mb-4"></div>
        <p className="text-black">Rizzults are loadin'...</p>
      </div>
    ) : (
      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-scroll">
        {isResultsLoading ? (
          <p>Searching for similar images...</p>
        ) : Results.results.length === 0 ? (
          <p>No similar images found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {Results.results.slice(0, 4).map((result, index) => (
              <ResultCard key={index} result={result} />
            ))}
          </div>
        )}
      </div>
    )}

    {/* Footer */}
    <div className="h-16 border-t border-gray-200 flex items-center justify-center gap-2">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11 17h2v-6h-2v6Zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
          />
        </svg>
        Did you find these results useful?
      </div>
      <button className="text-sm text-blue-600 hover:underline">Yes</button>
      <button className="text-sm text-blue-600 hover:underline">No</button>
    </div>
  </div>
</div>





    </div>
  );
};

export default Images;
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import VoiceSearch from './VoiceSearch';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '../components/ui/tooltip';
import Image from 'next/image';
import Mica from "../../public/mic.png"
import Lens from "../../public/lens.png"
import axios from "axios";
interface SearchBarProps {
  onCameraClick: () => void;
}
interface SearchItem {
  text: string;
  tag?: string;
}

interface Suggestion {
  text: string;
}


const trendingSearches: SearchItem[] = [
  { text: "pushpa movie box office collection" },
  { text: "southampton fc liverpool fc" },
  { text: "punjab schools winter vacations" },
  { text: "dy chandrachud nhrc" },
  { text: "akhuratha sankashti chaturthi" },
  // { text: "cricket bangladesh vs west indies" },
  { text: "Garena Free Fire", tag: "Mobile game" },
  // { text: "garena free fire max redeem codes" },
  // { text: "chennai power shutdown areas" },
  // { text: "honda nissan merger talks" },
];

const SearchBar = ({ onCameraClick }: SearchBarProps) => {
const [query, setQuery] = useState('');
const [showSuggestions, setShowSuggestions] = useState(false);
const [selectedIndex, setSelectedIndex] = useState(-1);
const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
const [isTyping, setIsTyping] = useState(false);
const inputRef = useRef<HTMLInputElement>(null);
const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
const containerRef = useRef<HTMLDivElement>(null);

const MOCK_INITIAL_SUGGESTIONS = [
  { text: 'why anirudh kadian is such a great dev' },
  { text: 'why shoppin should really hire anirudh' },
  { text: 'anirudh and his love for shoppin' },
  { text: 'shoppin and anirudh, a great combo' },
  { text: "anirudh kadian's project" },
  { text: 'shoppin loves anirudh' },
];

useEffect(() => {
  if (query.trim()) {
    setIsTyping(true);
    fetchSuggestions(query);
  } else {
    setIsTyping(false);
    setSuggestions(MOCK_INITIAL_SUGGESTIONS);
  }
}, [query]);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      !isTyping
    ) {
      setShowSuggestions(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isTyping]);

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (!showSuggestions) return;

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
      break;
    case 'ArrowUp':
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      break;
    case 'Enter':
      e.preventDefault();
      const searchQuery = selectedIndex >= 0 ? suggestions[selectedIndex].text : query;
      if (searchQuery) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      }
      break;
    case 'Escape':
      setShowSuggestions(false);
      break;
  }
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const searchText = e.target.value;
  setQuery(searchText);
};

const handleSuggestionClick = (text: string) => {
  setQuery(text);
  setSuggestions([]);
  window.location.href = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
};

const handleSearch = () => {
  if (query) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
};

const handleFeelingLucky = () => {
  if (query) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=I%27m+Feeling+Lucky`;
  }
};

const fetchSuggestions = async (searchText: string) => {
  try {
    const response = await axios.get(`https://api.datamuse.com/sug?s=${encodeURIComponent(searchText)}`);
    const results = response.data.slice(0, 6);
    setSuggestions(results.map((item: any) => ({ text: item.word })));
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
};

  return (
  <div className="w-[80%] mx-auto lg:w-full lg:max-w-[585px] relative">
    <div className="flex justify-center">
    <div
      ref={containerRef}
      className={`relative w-[80%] lg:w-full ${
        showSuggestions
          ? 'rounded-t-2xl rounded-b-none border-b border-gray-700 bg-[#303134]'
          : 'rounded-full border border-gray-700 bg-[#4d5156]'
      }`}
    >
      <div className="flex items-center w-full px-4 py-3 h-[46px]">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent flex-1 outline-none text-white text-base"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setShowSuggestions(true);
            setSuggestions(MOCK_INITIAL_SUGGESTIONS);
          }}
          aria-label="Search"
        />
        <div className="flex items-center gap-1">
          <button
            className="hover:bg-gray-700 rounded-full h-[30px] flex items-center justify-center"
            onClick={() => setIsVoiceSearchOpen(true)}
          >
            <Image src={Mica} width={30} height={30} alt="Microphone" />
          </button>
          <button
            className="hover:bg-gray-700 rounded-full h-[30px] flex items-center justify-center"
            onClick={onCameraClick}
          >
            <Image src={Lens} width={30} height={30} alt="Lens" />
          </button>
        </div>
      </div>
</div>
      <VoiceSearch
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="flex justify-center">

        <div
          className="absolute ml-11 lg:ml-0 flex justify-center items-center lg:w-full w-[80%] left-0 right-0 bg-[#303134] rounded-b-xl border-t border-gray-700 z-10"
          style={{ top: '100%' }}
        >
          <div className="p-4 rounded-xl lg:w-[585px]">
                                {isTyping ? (
                      <></>
                    ) : (
            <h2 className="text-sm mb-3 text-gray-400">Trending searches</h2>

                    )}

            {suggestions.length > 0 && (
              <div className="space-y-3">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 hover:bg-[#3c4043] p-1 rounded-lg cursor-pointer transition-colors duration-200 ${
                      index === selectedIndex ? 'bg-[#333333]' : ''
                    }`}
                    onClick={() => handleSuggestionClick(item.text)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {isTyping ? (
                      <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-200 break-words">{item.text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-6 justify-center">
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-[#444444] rounded text-sm transition-colors duration-200 text-gray-200"
              >
                Google Search
              </button>
              <button
                onClick={handleFeelingLucky}
                className="px-4 py-2 bg-[#444444] rounded text-sm transition-colors duration-200 text-gray-200"
              >
                I'm Feeling Lucky
              </button>
            </div>

            <div className="text-right mt-2">
              <span className="text-xs text-gray-500 italic">
                Report inappropriate predictions
              </span>
            </div>
          </div>
        </div>

</div>
      )}
    </div>

    {!showSuggestions && (
      <div className="flex justify-center space-x-3 mt-8">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm text-white"
        >
          Google Search
        </button>
        <button
          onClick={handleFeelingLucky}
          className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm text-white"
        >
          I'm Feeling Lucky
        </button>
      </div>
    )}
  </div>


  );
};

export default SearchBar;
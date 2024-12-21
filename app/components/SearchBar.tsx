'use client'
import React, {useState, useEffect, useRef} from 'react';
import { Search , TrendingUp,  ArrowUp, Mic } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import Mica from "../../public/mic.png"
import Lens from "../../public/lens.png"
import Image from 'next/image';
import VoiceSearch from './VoiceSearch';


interface SearchBarProps {
  onCameraClick: () => void;
}

interface SearchItem {
  text: string;
  tag?: string;
}

const trendingSearches: SearchItem[] = [
  { text: "pushpa movie box office collection" },
  { text: "southampton fc liverpool fc" },
  { text: "punjab schools winter vacations" },
  { text: "dy chandrachud nhrc" },
  { text: "akhuratha sankashti chaturthi" },
  { text: "cricket bangladesh vs west indies" },
  { text: "Garena Free Fire", tag: "Mobile game" },
  { text: "garena free fire max redeem codes" },
  { text: "chennai power shutdown areas" },
  { text: "honda nissan merger talks" },
];

const SearchBar = ({ onCameraClick }: SearchBarProps) => {
  const [query, setQuery] = useState('');
    const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
      const containerRef = useRef(null);


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };


        const MOCK_SUGGESTIONS = [
        `${query} news`,
        `${query} weather`,
        `${query} images`,
        `${query} videos`,
        `${query} maps`
      ];

  useEffect(() => {
    if (query.trim()) {
      const filtered = MOCK_SUGGESTIONS.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

        if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [query, isFocused]);

    // Click outside handler
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
  //       setIsFocused(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        const searchQuery = selectedIndex >= 0 ? suggestions[selectedIndex] : query;
        if (searchQuery) {
          window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(suggestion)}`;
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

//   return (
// <div className="w-full max-w-[584px] mx-auto relative">
//   <TooltipProvider>
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <div className="search-bar  rounded-full flex items-center px-4 py-3 mb-8 border border-gray-700 h-[46px]">
//           <Search className="w-5 h-5 text-gray-400 mr-3" />
//           <input
//             ref={inputRef}
//             type="text"
//             className="bg-transparent flex-1 outline-none text-white text-base"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={handleKeyDown}
//             aria-label="Search"
//           />
//           <div className="flex items-center gap-1">
//             <button className="hover:bg-gray-700 rounded-full h-[30px] flex items-center justify-center" onClick={() => {}}>
//               <Image src={Mic} width={30} height={30} alt="Microphone" />
//             </button>
//             <button className="hover:bg-gray-700 rounded-full h-[30px] flex items-center justify-center" onClick={onCameraClick}>
//               <Image src={Lens} width={30} height={30} alt="Lens" />
//             </button>
//           </div>
//         </div>
//       </TooltipTrigger>
//       <TooltipContent>
//         <p>Search</p>
//       </TooltipContent>
//     </Tooltip>
//   </TooltipProvider>

//   {/* {showSuggestions && suggestions.length > 0 && (
//     <div className="flex justify-center rounded-t-lg">
// <div 
//   ref={dropdownRef}
//   className="absolute w-[95%] bg-[#2f3133] rounded-t-lg shadow-lg mt-[-22px] overflow-hidden z-50"
// >

//       <div className="py-4 rounded-t-lg">
//         {suggestions.map((suggestion, index) => (
//           <div
//             key={suggestion}
//             className={`flex items-center px-4 py-2 cursor-pointer ${
//               index === selectedIndex ? 'bg-[#3c4043]' : 'hover:bg-[#3c4043]'
//             }`}
//             onClick={() => handleSuggestionClick(suggestion)}
//             onMouseEnter={() => setSelectedIndex(index)}
//           >
//             <ArrowUp className="w-4 h-4 text-gray-400 mr-4 transform -rotate-90" />
//             <span className="text-white">{suggestion}</span>
//           </div>
//         ))}
//       </div>
      
//       <div className="border-t border-gray-700 p-4 flex rounded-b-lg justify-center space-x-3">
//         <button 
//           onClick={handleSearch}
//           className="px-4 py-2 bg-[#3c4043] hover:bg-[#3c4043] rounded text-sm text-white"
//         >
//           Google Search
//         </button>
//         <button 
//           onClick={handleFeelingLucky}
//           className="px-4 py-2 bg-[#3c4043] hover:bg-[#3c4043] rounded text-sm text-white"
//         >
//           I'm Feeling Lucky
//         </button>
//       </div>
//     </div>
//     </div>
//   )} */}

//   {showSuggestions && suggestions.length > 0 && (
//   <div className="relative">
//     <div
//       ref={dropdownRef}
//       className="absolute top-full w-[95%] bg-[#2f3133] shadow-lg rounded-b-lg border-t border-gray-700 overflow-hidden z-50"
//     >
//       <div className="py-2">
//         {suggestions.map((suggestion, index) => (
//           <div
//             key={suggestion}
//             className={`flex items-center px-4 py-2 cursor-pointer ${
//               index === selectedIndex ? 'bg-[#3c4043]' : 'hover:bg-[#3c4043]'
//             }`}
//             onClick={() => handleSuggestionClick(suggestion)}
//             onMouseEnter={() => setSelectedIndex(index)}
//           >
//             <ArrowUp className="w-4 h-4 text-gray-400 mr-4 transform -rotate-90" />
//             <span className="text-white">{suggestion}</span>
//           </div>
//         ))}
//       </div>

//       <div className="border-t border-gray-700 p-4 flex justify-center space-x-3 rounded-b-lg">
//         <button
//           onClick={handleSearch}
//           className="px-4 py-2 bg-[#3c4043] hover:bg-[#4a4f54] rounded text-sm text-white"
//         >
//           Google Search
//         </button>
//         <button
//           onClick={handleFeelingLucky}
//           className="px-4 py-2 bg-[#3c4043] hover:bg-[#4a4f54] rounded text-sm text-white"
//         >
//           I'm Feeling Lucky
//         </button>
//       </div>
//     </div>
//   </div>
// )}

  
//   {!showSuggestions && (
//     <div className="flex justify-center space-x-3">
//       <button 
//         onClick={handleSearch}
//         className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm text-white"
//       >
//         Google Search
//       </button>
//       <button 
//         onClick={handleFeelingLucky}
//         className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm text-white"
//       >
//         I'm Feeling Lucky
//       </button>
//     </div>
//   )}
// </div>

//   );

return (
 <div className="w-full max-w-[584px] mx-auto relative">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="search-bar  rounded-full flex items-center px-4 py-3 mb-8 border border-gray-700 h-[46px]">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent flex-1 outline-none text-white text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search"
          />
          <div className="flex items-center gap-1">
            <button className="hover:bg-gray-700 rounded-full h-[30px] flex items-center justify-center"
            onClick={() => setIsVoiceSearchOpen(true)}
            >
              <Image src={Mica} width={30} height={30} alt="Microphone" />
            </button>
            <button className="hover:bg-gray-700 rounded-full h-[30px] flex items-center justify-center" onClick={onCameraClick}>
              <Image src={Lens} width={30} height={30} alt="Lens" />
            </button>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Search</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

        <VoiceSearch 
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
      />

  {/* {showSuggestions && suggestions.length > 0 && (
    <div className="flex justify-center rounded-t-lg">
<div 
  ref={dropdownRef}
  className="absolute w-[95%] bg-[#2f3133] rounded-t-lg shadow-lg mt-[-22px] overflow-hidden z-50"
>

      <div className="py-4 rounded-t-lg">
        {suggestions.map((suggestion, index) => (
          <div
            key={suggestion}
            className={`flex items-center px-4 py-2 cursor-pointer ${
              index === selectedIndex ? 'bg-[#3c4043]' : 'hover:bg-[#3c4043]'
            }`}
            onClick={() => handleSuggestionClick(suggestion)}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <ArrowUp className="w-4 h-4 text-gray-400 mr-4 transform -rotate-90" />
            <span className="text-white">{suggestion}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-700 p-4 flex rounded-b-lg justify-center space-x-3">
        <button 
          onClick={handleSearch}
          className="px-4 py-2 bg-[#3c4043] hover:bg-[#3c4043] rounded text-sm text-white"
        >
          Google Search
        </button>
        <button 
          onClick={handleFeelingLucky}
          className="px-4 py-2 bg-[#3c4043] hover:bg-[#3c4043] rounded text-sm text-white"
        >
          I'm Feeling Lucky
        </button>
      </div>
    </div>
    </div>
  )} */}

  {showSuggestions && suggestions.length > 0 && (
  <div className="relative">
    <div
      ref={dropdownRef}
      className="absolute top-full w-[100%] bg-[#2f3133] shadow-lg rounded-b-lg border-t border-gray-700 overflow-hidden z-50"
    >
      <div className="py-2">
        {suggestions.map((suggestion, index) => (
          <div
            key={suggestion}
            className={`flex items-center px-4 py-2 cursor-pointer ${
              index === selectedIndex ? 'bg-[#3c4043]' : 'hover:bg-[#3c4043]'
            }`}
            onClick={() => handleSuggestionClick(suggestion)}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <ArrowUp className="w-4 h-4 text-gray-400 mr-4 transform -rotate-90" />
            <span className="text-white">{suggestion}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 p-4 flex justify-center space-x-3 rounded-b-lg">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-[#3c4043] hover:bg-[#4a4f54] rounded text-sm text-white"
        >
          Google Search
        </button>
        <button
          onClick={handleFeelingLucky}
          className="px-4 py-2 bg-[#3c4043] hover:bg-[#4a4f54] rounded text-sm text-white"
        >
          I'm Feeling Lucky
        </button>
      </div>
    </div>
  </div>
)}

  
  {!showSuggestions && (
    <div className="flex justify-center space-x-3">
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
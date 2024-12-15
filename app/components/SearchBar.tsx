import React from 'react';
import { Search } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

interface SearchBarProps {
  onCameraClick: () => void;
}

const SearchBar = ({ onCameraClick }: SearchBarProps) => {
  return (
    <div className="w-full max-w-[584px] mx-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="search-bar rounded-full flex items-center px-4 py-3 mb-8 border border-gray-700 h-[46px]">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                className="bg-transparent flex-1 outline-none text-white text-base"
                aria-label="Search"
              />
              <button className="p-2 hover:bg-gray-700 rounded-full" onClick={() => {}}>
                <svg className="w-6 h-6" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(646.3034,236.3789)">
                    <path className="st6" fill="#1E88E5" d="M-571.3-147.3c7.9,0,14.2-6.4,14.2-14.2l0-33.2c0-7.9-6.4-14.2-14.2-14.2c-7.9,0-14.2,6.4-14.2,14.2v33.2C-585.5-153.7-579.1-147.3-571.3-147.3"/>
                  </g>
                  <g transform="translate(645.4803,233.1492)">
                    <path className="st5" fill="#4CAF50" d="M-575.2-125.5L-575.2-125.5v14.9h9.5v-14.8c-1.5,0.2-3.1,0.2-4.7,0.2C-572.1-125.1-573.6-125.2-575.2-125.5"/>
                  </g>
                  <g transform="translate(643.3809,235.9115)">
                    <path className="st9" fill="#FBC02D" d="M-585.2-144.1c-4.2-4.3-6.9-9.5-6.9-16.6h-9.5c0,9.5,3.7,17.3,9.7,23.3l0.1-0.1c0,0,0,0-0.1-0.1L-585.2-144.1z"/>
                  </g>
                  <g transform="translate(650.4081,238.79)">
                    <path className="st7" fill="#E53935" d="M-551.7-163.6c0,11.9-10.5,23.6-23.7,23.6c-6.6,0-12.5-2.7-16.8-7l-0.1,0.1l-6.6,6.6c0,0,0,0,0.1,0.1c4.9,4.9,11.4,8.2,18.7,9.3c1.6,0.2,3.2,0.4,4.8,0.4c1.6,0,3.2,0,4.7-0.2c16.1-2.3,28.4-16.1,28.4-32.7H-551.7z"/>
                  </g>
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-full ml-2" onClick={onCameraClick}>
                <svg className="w-6 h-6" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FBC02D" d="M94.3,43.6c6.6,0,12.1,5.4,12.1,12.1v9.7h12.1v-9.7c0-13.3-10.8-24.2-24.2-24.2h-9.7v12.1H94.3z"/>
                  <path fill="#E53935" d="M43.6,55.7c0-6.6,5.4-12.1,12.1-12.1h9.7V31.5h-9.7c-13.3,0-24.2,10.8-24.2,24.2v9.7h12.1V55.7z"/>
                  <path fill="#1A73E8" d="M55.7,106.4c-6.6,0-12.1-5.4-12.1-12.1v-9.7H31.5v9.7c0,13.3,10.8,24.2,24.2,24.2h9.7v-12.1L55.7,106.4L55.7,106.4z"/>
                  <circle fill="#1E88E5" cx="75" cy="75" r="16.9"/>
                  <circle fill="#4CAF50" cx="104" cy="104" r="9.7"/>
                </svg>
              </button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <div className="flex justify-center space-x-3">
        <button className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm">
          Google Search
        </button>
        <button className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm">
          I'm Feeling Lucky
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
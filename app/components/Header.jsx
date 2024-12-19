import React from "react";
import { Beaker } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { HiBeaker } from "react-icons/hi";
import { CgMenuGridO } from "react-icons/cg";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      {/* Left side navigation */}
      <div className="flex items-center space-x-4 ml-2">
        <a href="#" className="nav-link text-sm">
          About
        </a>
        <a href="#" className="nav-link text-sm">
          Store
        </a>
      </div>

      {/* Right side navigation */}
      <div className="flex items-center space-x-3">
        <a href="#" className="nav-link text-sm">
          Gmail
        </a>
        <a href="/images" className="nav-link text-sm">
          Images
        </a>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 rounded-full">
          <HiBeaker className="w-5 h-5 text-gray-300" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 rounded-full">
          <CgMenuGridO className="w-6 h-6 text-gray-300" />
        </button>
        <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
          A
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Beaker } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { HiBeaker } from "react-icons/hi";
import { CgMenuGridO } from "react-icons/cg";
import Link from "next/link";

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
        <Link
          className="cursor-pointer"
          href="https://maple-cheese-7fb.notion.site/So-you-re-just-a-chill-guy-who-clicked-1626e8906fa58042a7bed685f12e7de1?pvs=4"
        >
          <button className="w-8 h-8 cursor-pointer rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
            <a href="https://maple-cheese-7fb.notion.site/So-you-re-just-a-chill-guy-who-clicked-1626e8906fa58042a7bed685f12e7de1?pvs=4">
              A
            </a>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

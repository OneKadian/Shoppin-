import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={`fixed bottom-0 w-full bg-[#171717] text-sm ${className}`}>
      <div className="px-6 py-3 border-b border-gray-700">
        <span className="text-white">India</span>
      </div>
      <div className="px-6 py-3 flex flex-col text-white sm:flex-row justify-between">
        <div className="flex space-x-6 mb-2 sm:mb-0">
          <a href="#" className="nav-link">Advertising</a>
          <a href="#" className="nav-link">Business</a>
          <a href="#" className="nav-link">How Search works</a>
        </div>
        <div className="flex space-x-6 text-white">
          <a href="#" className="nav-link">Privacy</a>
          <a href="#" className="nav-link">Terms</a>
          <a href="#" className="nav-link">Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
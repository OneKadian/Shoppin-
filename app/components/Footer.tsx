import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-[#171717] text-sm">
      <div className="px-6 py-3 border-b border-gray-700">
        <span className="text-gray-400">India</span>
      </div>
      <div className="px-6 py-3 flex flex-col sm:flex-row justify-between">
        <div className="flex space-x-6 mb-2 sm:mb-0">
          <a href="#" className="nav-link">Advertising</a>
          <a href="#" className="nav-link">Business</a>
          <a href="#" className="nav-link">How Search works</a>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="nav-link">Privacy</a>
          <a href="#" className="nav-link">Terms</a>
          <a href="#" className="nav-link">Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
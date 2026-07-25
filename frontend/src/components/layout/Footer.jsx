import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#334155] border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-12">
          <p className="text-[#f8fafc] text-[12px] font-normal leading-none">
            &copy; {currentYear} IDP Education. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

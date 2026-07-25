import React from 'react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] relative z-10 w-full">
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex justify-start items-center h-[60px]">
          <div className="flex-shrink-0 flex items-center">
            <img src="/idplogo.png" alt="IDP Education" className="h-[40px] w-auto" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

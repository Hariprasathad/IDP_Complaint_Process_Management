import React from 'react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] relative z-10 w-full flex justify-center">
      <div className="w-full max-w-[800px] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center h-[76px]">
          <div className="flex-shrink-0 flex items-center">
            <img src="/idplogo.png" alt="IDP Education" className="h-[46px] w-auto" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

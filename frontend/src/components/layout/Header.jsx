import React from 'react';

const Header = () => {
  return (
    <header className="bg-white relative z-10 w-full">
      <div className="w-full max-w-[824px] mx-auto px-[40px]">
        <div className="flex justify-start items-center h-[72px]">
          <div className="flex-shrink-0 flex items-center">
            <img src="/idplogo.png" alt="IDP Education" className="h-[40px] w-auto" />
          </div>
        </div>
      </div>
      {/* Subtle gradient shadow below header */}
      <div className="absolute left-0 right-0 bottom-[-8px] h-[8px] pointer-events-none bg-gradient-to-b from-black/[0.04] to-transparent" />
    </header>
  );
};

export default Header;

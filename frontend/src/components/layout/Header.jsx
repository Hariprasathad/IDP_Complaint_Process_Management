import React from 'react';

const Header = () => {
  return (
    <header className="bg-white relative z-10 w-full">
      <div className="w-full">
        <img src="/idplogo.png" alt="IDP Education" className="h-[40px] w-auto mt-[14px] ml-[34px] mb-[14px]" />
      </div>
      {/* Subtle gradient shadow below header */}
      <div className="absolute left-0 right-0 bottom-[-8px] h-[8px] pointer-events-none bg-gradient-to-b from-black/[0.04] to-transparent" />
    </header>
  );
};

export default Header;

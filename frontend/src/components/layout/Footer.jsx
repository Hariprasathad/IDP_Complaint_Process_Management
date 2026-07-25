import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-[#333F48] p-[15px] mt-auto">
      <p className="text-center text-[14px] leading-[21px] font-normal tracking-normal text-white">
        &copy; {currentYear} IDP Education. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

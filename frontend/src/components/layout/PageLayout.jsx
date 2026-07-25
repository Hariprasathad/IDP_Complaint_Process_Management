import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Main Content Area */}
      <main className="flex flex-col items-center pt-6 pb-6 px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-[800px] overflow-hidden">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;

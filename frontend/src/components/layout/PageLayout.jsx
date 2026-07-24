import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[800px] overflow-hidden">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;

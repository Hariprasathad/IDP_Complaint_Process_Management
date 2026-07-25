import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Main Content Area */}
      <main className="flex flex-col items-center">
        <div className="w-full">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;

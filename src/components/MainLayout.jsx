import React from 'react';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-brandCream text-gray-800 flex flex-col font-sans">
      {/* Page Content Goes Here */}
      <div className="flex-1">
        {children}
      </div>

      {/* Truly Global Footer */}
      <Footer />
    </div>
  );
}
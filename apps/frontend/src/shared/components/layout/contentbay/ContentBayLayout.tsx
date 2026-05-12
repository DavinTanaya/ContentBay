import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../ui/contentbay/Navbar';
import Footer from '../../ui/contentbay/Footer';

const ContentBayLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default ContentBayLayout;

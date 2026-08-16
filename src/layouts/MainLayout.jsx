import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AiFloatingChat from '../components/AiFloatingChat';
import LoginModal from '../components/LoginModal';

export default function MainLayout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div class="bg-background text-on-surface font-body-md antialiased flex flex-col min-h-screen">
      <Header onOpenLogin={() => setIsLoginOpen(true)} />
      <main class="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6">
        <Outlet />
      </main>
      <Footer onOpenLogin={() => setIsLoginOpen(true)} />
      <AiFloatingChat />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

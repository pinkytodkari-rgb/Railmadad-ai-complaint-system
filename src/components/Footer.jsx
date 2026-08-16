import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenLogin }) {
  return (
    <footer class="bg-surface-container-highest border-t border-outline-variant mt-auto w-full">
      <div class="w-full py-8 px-4 md:px-8 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex flex-col gap-1 text-center md:text-left">
          <div class="font-black uppercase text-primary tracking-wider text-sm">
            Ministry of Railways
          </div>
          <div class="text-xs text-on-surface-variant">
            © 2024 Indian Railways - RailMadad AI Grievance Redressal. All Rights Reserved.
          </div>
        </div>

        <nav class="flex flex-wrap gap-4 text-xs">
          <Link to="/" class="text-primary font-bold hover:underline">Home</Link>
          <a href="#" class="text-on-surface-variant hover:text-primary hover:underline">FAQs</a>
          <button onClick={onOpenLogin} class="text-on-surface-variant hover:text-primary hover:underline">
            Railway Admin Login
          </button>
          <button onClick={onOpenLogin} class="text-on-surface-variant hover:text-primary hover:underline">
            Staff Portal Login
          </button>
          <a href="#" class="text-on-surface-variant hover:text-primary hover:underline">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
}

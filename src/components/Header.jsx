import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ onOpenLogin }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <header class="bg-primary text-on-primary border-b border-outline-variant shadow-sm w-full sticky top-0 z-50">
      {/* Top Utility Bar */}
      <div class="border-b border-on-primary/20 w-full bg-black/10">
        <div class="flex justify-between items-center w-full px-4 md:px-8 max-w-[1280px] mx-auto h-10 text-xs">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1 opacity-90 font-medium">
              <span class="material-symbols-outlined text-[15px]">phone_in_talk</span>
              Emergency: 139
            </span>
            <span class="hidden md:inline opacity-75">
              A Grievance Redressal Mechanism • Indian Railways
            </span>
          </div>

          <div class="flex items-center gap-4">
            <button class="hover:opacity-80 transition-opacity">Language</button>

            {user ? (
              <div class="flex items-center gap-3">
                <span class="bg-primary-container text-on-primary-container px-2 py-0.5 rounded text-[11px] font-bold">
                  {user.role}
                </span>
                <span class="hidden sm:inline font-medium">{user.name}</span>
                <button
                  onClick={logout}
                  class="text-xs bg-on-primary/10 hover:bg-on-primary/20 px-2 py-0.5 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                class="bg-on-primary text-primary px-3 py-1 rounded font-semibold hover:bg-on-primary/90 transition-colors"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div class="flex justify-between items-center w-full px-4 md:px-8 max-w-[1280px] mx-auto h-16">
        {/* Logo */}
        <Link to="/" class="flex items-center gap-3 text-2xl font-bold text-on-primary tracking-tight">
          <span class="material-symbols-outlined text-3xl">train</span>
          RailMadad
        </Link>

        {/* Nav Links */}
        <nav class="hidden md:flex h-full items-end gap-1">
          <Link
            to="/passenger/train-complaint"
            class={`h-full px-4 flex items-center font-semibold text-sm transition-colors ${
              isActive('/passenger/train-complaint')
                ? 'text-on-primary border-b-2 border-on-primary bg-primary-container/30'
                : 'text-on-primary/80 hover:text-on-primary hover:bg-primary-container/20'
            }`}
          >
            Train Complaints
          </Link>
          <Link
            to="/passenger/train-complaint"
            class={`h-full px-4 flex items-center font-semibold text-sm transition-colors ${
              isActive('/passenger/station-complaint')
                ? 'text-on-primary border-b-2 border-on-primary bg-primary-container/30'
                : 'text-on-primary/80 hover:text-on-primary hover:bg-primary-container/20'
            }`}
          >
            Station Complaints
          </Link>
          <Link
            to="/"
            class="h-full px-4 flex items-center text-on-primary/80 hover:text-on-primary font-semibold text-sm hover:bg-primary-container/20 transition-colors"
          >
            Rail Anubhav
          </Link>
          <Link
            to="/passenger/track"
            class={`h-full px-4 flex items-center font-semibold text-sm transition-colors ${
              isActive('/passenger/track')
                ? 'text-on-primary border-b-2 border-on-primary bg-primary-container/30'
                : 'text-on-primary/80 hover:text-on-primary hover:bg-primary-container/20'
            }`}
          >
            Track Concern
          </Link>
        </nav>

        {/* Actions */}
        <div class="flex items-center gap-2">
          {user?.role === 'STAFF' && (
            <Link to="/staff" class="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:opacity-90">
              <span class="material-symbols-outlined text-[16px]">badge</span>
              Staff Portal
            </Link>
          )}
          {user?.role === 'ADMIN' && (
            <Link to="/admin" class="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:opacity-90">
              <span class="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              Admin Portal
            </Link>
          )}

          <button class="p-2 hover:bg-primary-container/20 rounded-full transition-colors text-on-primary/80 hover:text-on-primary">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button class="p-2 hover:bg-primary-container/20 rounded-full transition-colors text-on-primary/80 hover:text-on-primary">
            <span class="material-symbols-outlined">help</span>
          </button>
        </div>
      </div>
    </header>
  );
}

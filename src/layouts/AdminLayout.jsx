import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USER_AVATAR } from '../data/mockData';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div class="bg-background text-on-surface font-body-md h-screen w-full flex overflow-hidden">
      {/* SideNavBar Component */}
      <aside class="hidden md:flex fixed left-0 top-0 h-full w-64 border-r border-outline-variant flex-col p-4 gap-2 bg-surface-container-low z-20">
        {/* Header */}
        <div class="flex items-center gap-3 mb-4 p-1">
          <img
            src={USER_AVATAR}
            alt="Admin Profile"
            class="w-11 h-11 rounded-full object-cover shadow-xs border border-outline-variant"
          />
          <div>
            <h1 class="font-bold text-base text-primary">Admin Portal</h1>
            <p class="text-xs text-on-surface-variant">Ministry of Railways</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav class="flex flex-col gap-1 flex-1 text-sm">
          <Link
            to="/admin"
            class={`flex items-center gap-3 p-2.5 rounded-lg font-semibold transition-all ${
              isActive('/admin')
                ? 'bg-primary-container text-on-primary-container font-bold translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span class="material-symbols-outlined">dashboard</span>
            <span>MIS Dashboard</span>
          </Link>

          <Link
            to="/admin/recurring-issues"
            class={`flex items-center gap-3 p-2.5 rounded-lg font-semibold transition-all ${
              isActive('/admin/recurring-issues')
                ? 'bg-primary-container text-on-primary-container font-bold translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span class="material-symbols-outlined">troubleshoot</span>
            <span>Recurring Issues</span>
          </Link>

          <Link
            to="/admin/resources"
            class={`flex items-center gap-3 p-2.5 rounded-lg font-semibold transition-all ${
              isActive('/admin/resources')
                ? 'bg-primary-container text-on-primary-container font-bold translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span class="material-symbols-outlined">dataset</span>
            <span>Resource Allocation</span>
          </Link>

          <Link
            to="/admin/heatmap"
            class={`flex items-center gap-3 p-2.5 rounded-lg font-semibold transition-all ${
              isActive('/admin/heatmap')
                ? 'bg-primary-container text-on-primary-container font-bold translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span class="material-symbols-outlined">map</span>
            <span>Complaint Heatmap</span>
          </Link>

          <Link
            to="/admin/sentiment"
            class={`flex items-center gap-3 p-2.5 rounded-lg font-semibold transition-all ${
              isActive('/admin/sentiment')
                ? 'bg-primary-container text-on-primary-container font-bold translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span class="material-symbols-outlined">psychology_alt</span>
            <span>Sentiment Analysis</span>
          </Link>

          <Link
            to="/staff"
            class="flex items-center gap-3 p-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg text-xs mt-4 border-t border-outline-variant/40 pt-3"
          >
            <span class="material-symbols-outlined">swap_horiz</span>
            Switch to Staff Portal
          </Link>
        </nav>

        {/* Footer Links */}
        <div class="mt-auto flex flex-col gap-1 border-t border-outline-variant pt-3">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            class="text-on-surface-variant hover:bg-surface-variant rounded-lg p-2.5 flex items-center gap-3 text-sm transition-all w-full text-left"
          >
            <span class="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main class="md:ml-64 flex-1 flex flex-col h-full overflow-y-auto bg-background">
        <header class="w-full flex justify-between items-center py-4 px-6 border-b border-outline-variant bg-surface sticky top-0 z-10 shadow-xs">
          <div>
            <h2 class="font-bold text-xl text-on-surface tracking-tight">RailMadad MIS Administration</h2>
            <p class="text-xs text-on-surface-variant">Real-time system analytics and operational insights</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="hidden sm:block text-right">
              <p class="font-semibold text-sm text-on-surface">{user?.name || 'System Admin'}</p>
              <p class="text-xs text-status-resolved flex items-center gap-1 justify-end font-medium">
                <span class="w-2 h-2 rounded-full bg-status-resolved block"></span> Online
              </p>
            </div>
            <img
              src={USER_AVATAR}
              alt="Admin Avatar"
              class="w-10 h-10 rounded-full border border-outline-variant object-cover shadow-xs"
            />
          </div>
        </header>

        <div class="p-6 max-w-[1280px] mx-auto w-full flex flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

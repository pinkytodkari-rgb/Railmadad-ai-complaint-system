import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USER_AVATAR } from '../data/mockData';

export default function StaffLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div class="bg-background text-on-surface font-body-md h-screen flex overflow-hidden">
      {/* SideNavBar Component */}
      <nav class="fixed left-0 top-0 h-full w-64 border-r border-outline-variant bg-surface-container-low text-primary z-50 flex flex-col p-4 gap-2">
        <div class="flex items-center gap-3 px-2 py-3 border-b border-outline-variant mb-2">
          <span class="material-symbols-outlined text-3xl font-bold text-primary">train</span>
          <div>
            <div class="font-bold text-base text-primary">Staff Operations</div>
            <div class="text-xs text-on-surface-variant">Ministry of Railways</div>
          </div>
        </div>

        <div class="flex flex-col gap-1 flex-1">
          <Link
            to="/staff"
            class={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
              isActive('/staff')
                ? 'bg-primary-container text-on-primary-container font-bold translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span class="material-symbols-outlined">dashboard</span>
            Operations Dashboard
          </Link>

          <Link
            to="/staff/incidents/INC-104"
            class={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
              isActive('/staff/incidents/INC-104')
                ? 'bg-primary-container text-on-primary-container font-bold translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span class="material-symbols-outlined">report_problem</span>
            Incident INC-104
          </Link>

          <Link
            to="/staff/tasks"
            class={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
              isActive('/staff/tasks')
                ? 'bg-primary-container text-on-primary-container font-bold translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span class="material-symbols-outlined">assignment</span>
            Assigned Tasks
          </Link>

          <Link
            to="/staff/training"
            class={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
              isActive('/staff/training')
                ? 'bg-primary-container text-on-primary-container font-bold translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span class="material-symbols-outlined">model_training</span>
            Staff Training Quiz
          </Link>

          <Link
            to="/passenger/train-complaint"
            class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg text-sm mt-4 border-t border-outline-variant/40 pt-3"
          >
            <span class="material-symbols-outlined">swap_horiz</span>
            Switch to Passenger UI
          </Link>
        </div>

        <div class="mt-auto flex flex-col gap-1 pt-3 border-t border-outline-variant">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg text-sm transition-all w-full text-left"
          >
            <span class="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main class="ml-64 flex-1 flex flex-col h-full overflow-y-auto">
        <header class="bg-surface border-b border-outline-variant px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-xs">
          <div>
            <h1 class="font-bold text-xl text-on-surface">RailMadad Field Operations</h1>
            <p class="text-xs text-on-surface-variant">Real-time incident tracking & intervention feasibility</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-right">
              <div class="font-semibold text-sm text-on-surface">{user?.name || 'Ramesh Kumar'}</div>
              <div class="text-xs text-on-surface-variant">Coach Maintenance Officer • Surat Depot</div>
            </div>
            <img
              src={USER_AVATAR}
              alt="Staff Avatar"
              class="w-10 h-10 rounded-full object-cover border border-outline-variant shadow-xs"
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

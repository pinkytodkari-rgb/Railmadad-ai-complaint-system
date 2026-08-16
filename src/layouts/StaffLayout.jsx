import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USER_AVATAR } from '../data/mockData';

export default function StaffLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex overflow-x-hidden">

      {/* Mobile background overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* =========================
          STAFF SIDEBAR
      ========================== */}
      <nav
        className={`
          fixed left-0 top-0 h-full
          w-[280px] max-w-[85vw]
          border-r border-outline-variant
          bg-surface-container-low
          text-primary
          z-50
          flex flex-col
          p-4 gap-2
          transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >

        {/* Staff branding */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-outline-variant mb-2">

          <span className="material-symbols-outlined text-3xl font-bold text-primary">
            train
          </span>

          <div className="min-w-0">
            <div className="font-bold text-base text-primary">
              Staff Operations
            </div>

            <div className="text-xs text-on-surface-variant">
              Ministry of Railways
            </div>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={closeMobileMenu}
            className="ml-auto md:hidden p-2 rounded-lg hover:bg-surface-variant"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">
              close
            </span>
          </button>

        </div>

        {/* Navigation links */}
        <div className="flex flex-col gap-1 flex-1">

          {/* Dashboard */}
          <Link
            to="/staff"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-sm transition-all ${isActive('/staff')
                ? 'bg-primary-container text-on-primary-container font-bold md:translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
              }`}
          >
            <span className="material-symbols-outlined">
              dashboard
            </span>

            <span>Operations Dashboard</span>
          </Link>

          {/* Incident */}
          <Link
            to="/staff/incidents/INC-104"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-sm transition-all ${isActive('/staff/incidents/INC-104')
                ? 'bg-primary-container text-on-primary-container font-bold md:translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
              }`}
          >
            <span className="material-symbols-outlined">
              report_problem
            </span>

            <span>Incident INC-104</span>
          </Link>

          {/* Tasks */}
          <Link
            to="/staff/tasks"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-sm transition-all ${isActive('/staff/tasks')
                ? 'bg-primary-container text-on-primary-container font-bold md:translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
              }`}
          >
            <span className="material-symbols-outlined">
              assignment
            </span>

            <span>Assigned Tasks</span>
          </Link>

          {/* Training */}
          <Link
            to="/staff/training"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-sm transition-all ${isActive('/staff/training')
                ? 'bg-primary-container text-on-primary-container font-bold md:translate-x-1 shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-variant'
              }`}
          >
            <span className="material-symbols-outlined">
              model_training
            </span>

            <span>Staff Training Quiz</span>
          </Link>

          {/* Switch to Passenger */}
          <Link
            to="/passenger/train-complaint"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg text-sm mt-4 border-t border-outline-variant/40 pt-4"
          >
            <span className="material-symbols-outlined">
              swap_horiz
            </span>

            <span>Switch to Passenger UI</span>
          </Link>

        </div>

        {/* Logout */}
        <div className="mt-auto flex flex-col gap-1 pt-3 border-t border-outline-variant">

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg text-sm transition-all w-full text-left"
          >
            <span className="material-symbols-outlined">
              logout
            </span>

            <span>Logout</span>
          </button>

        </div>

      </nav>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <main className="ml-0 md:ml-[280px] flex-1 min-w-0 min-h-screen flex flex-col overflow-x-hidden">

        {/* =========================
            TOP HEADER
        ========================== */}
        <header className="bg-surface border-b border-outline-variant px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sticky top-0 z-30 shadow-xs">

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden shrink-0 p-2 rounded-lg hover:bg-surface-variant"
            aria-label="Open staff menu"
          >
            <span className="material-symbols-outlined">
              menu
            </span>
          </button>

          {/* Page title */}
          <div className="flex-1 min-w-0">

            <h1 className="font-bold text-lg sm:text-xl text-on-surface truncate">
              RailMadad Field Operations
            </h1>

            <p className="text-xs text-on-surface-variant hidden sm:block">
              Real-time incident tracking & intervention feasibility
            </p>

          </div>

          {/* User information */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            <div className="text-right hidden sm:block max-w-[220px]">

              <div className="font-semibold text-sm text-on-surface truncate">
                {user?.name || 'Ramesh Kumar'}
              </div>

              <div className="text-xs text-on-surface-variant truncate">
                Coach Maintenance Officer • Surat Depot
              </div>

            </div>

            <img
              src={USER_AVATAR}
              alt="Staff Avatar"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-outline-variant shadow-xs shrink-0"
            />

          </div>

        </header>

        {/* =========================
            PAGE CONTENT
        ========================== */}
        <div className="p-3 sm:p-4 md:p-6 w-full max-w-[1280px] mx-auto min-w-0 flex flex-col gap-4 md:gap-6">

          <Outlet />

        </div>

      </main>

    </div>
  );
}
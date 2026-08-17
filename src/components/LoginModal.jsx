import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelectRole = (role) => {
    login(role);
    onClose();
    if (role === 'PASSENGER') navigate('/passenger/train-complaint');
    if (role === 'STAFF') navigate('/staff');
    if (role === 'ADMIN') navigate('/admin');
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div class="bg-surface rounded-xl shadow-2xl w-full max-w-md border border-outline-variant overflow-hidden flex flex-col">
        {/* Header */}
        <div class="flex justify-between items-center p-4 border-b border-outline-variant bg-surface-container-low">
          <h2 class="font-bold text-lg text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">login</span>
            Select Login Role
          </h2>
          <button onClick={onClose} class="text-on-surface-variant hover:text-on-surface">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Roles List */}
        <div class="p-6 flex flex-col gap-3">
          <p class="text-xs text-on-surface-variant text-center mb-1">
            Choose a profile role to access the interactive prototype flow:
          </p>

          <button
            onClick={() => handleSelectRole('PASSENGER')}
            class="flex items-center gap-4 p-4 border border-outline-variant rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
          >
            <div class="w-11 h-11 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span class="material-symbols-outlined">person</span>
            </div>
            <div>
              <div class="font-semibold text-sm text-on-surface">Passenger Portal</div>
              <div class="text-xs text-on-surface-variant">Lodge grievances, track status and get resolution updates</div>
            </div>
            <span class="material-symbols-outlined ml-auto text-outline-variant group-hover:text-primary">chevron_right</span>
          </button>

          <button
            onClick={() => handleSelectRole('STAFF')}
            class="flex items-center gap-4 p-4 border border-outline-variant rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
          >
            <div class="w-11 h-11 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span class="material-symbols-outlined">badge</span>
            </div>
            <div>
              <div class="font-semibold text-sm text-on-surface">Railway Staff Operations</div>
              <div class="text-xs text-on-surface-variant">Field staff, dwell feasibility, action logs</div>
            </div>
            <span class="material-symbols-outlined ml-auto text-outline-variant group-hover:text-primary">chevron_right</span>
          </button>

          <button
            onClick={() => handleSelectRole('ADMIN')}
            class="flex items-center gap-4 p-4 border border-outline-variant rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
          >
            <div class="w-11 h-11 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span class="material-symbols-outlined">admin_panel_settings</span>
            </div>
            <div>
              <div class="font-semibold text-sm text-on-surface">Railway Admin Analytics</div>
              <div class="text-xs text-on-surface-variant">MIS reports, heatmaps, recurring trend analysis</div>
            </div>
            <span class="material-symbols-outlined ml-auto text-outline-variant group-hover:text-primary">chevron_right</span>
          </button>
        </div>

        <div class="bg-surface-container-low px-6 py-3 border-t border-outline-variant text-center text-xs text-on-surface-variant">
          Demo Prototype mode • No password required
        </div>
      </div>
    </div>
  );
}

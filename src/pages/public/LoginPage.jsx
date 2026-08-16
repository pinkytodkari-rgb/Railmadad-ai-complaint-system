import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('PASSENGER');
  const [idInput, setIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(selectedRole, { id: idInput || (selectedRole === 'STAFF' ? 'STAFF001' : selectedRole === 'ADMIN' ? 'ADMIN001' : 'demo@passenger.com') });

    if (selectedRole === 'PASSENGER') navigate('/passenger/train-complaint');
    if (selectedRole === 'STAFF') navigate('/staff');
    if (selectedRole === 'ADMIN') navigate('/admin');
  };

  return (
    <div class="flex flex-col items-center justify-center py-6 w-full max-w-5xl mx-auto">
      {/* Header Section */}
      <div class="text-center mb-8 max-w-2xl">
        <h1 class="font-extrabold text-3xl text-primary mb-2">Select Login Type</h1>
        <p class="text-sm text-on-surface-variant">
          Welcome to RailMadad. Please select your user profile to access the appropriate dashboard and services.
        </p>
      </div>

      {/* Role Selection Cards Container */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
        {/* Passenger Card */}
        <button
          type="button"
          onClick={() => {
            setSelectedRole('PASSENGER');
            setIdInput('demo@passenger.com');
          }}
          class={`flex flex-col items-center p-6 bg-surface border rounded-xl shadow-xs transition-all text-center group ${
            selectedRole === 'PASSENGER'
              ? 'border-primary ring-2 ring-primary ring-offset-2 bg-primary/5'
              : 'border-outline-variant hover:border-primary'
          }`}
        >
          <div class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-3 group-hover:bg-primary-container transition-colors">
            <span class="material-symbols-outlined text-3xl text-primary group-hover:text-on-primary-container">person</span>
          </div>
          <h2 class="font-bold text-lg text-on-surface mb-1">Passenger</h2>
          <p class="text-xs text-on-surface-variant">For citizens to lodge grievances, track status, and seek assistance.</p>
        </button>

        {/* Railway Staff Card */}
        <button
          type="button"
          onClick={() => {
            setSelectedRole('STAFF');
            setIdInput('STAFF001');
          }}
          class={`flex flex-col items-center p-6 bg-surface border rounded-xl shadow-xs transition-all text-center group ${
            selectedRole === 'STAFF'
              ? 'border-primary ring-2 ring-primary ring-offset-2 bg-primary/5'
              : 'border-outline-variant hover:border-primary'
          }`}
        >
          <div class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-3 group-hover:bg-primary-container transition-colors">
            <span class="material-symbols-outlined text-3xl text-primary group-hover:text-on-primary-container">badge</span>
          </div>
          <h2 class="font-bold text-lg text-on-surface mb-1">Railway Staff</h2>
          <p class="text-xs text-on-surface-variant">For field staff to resolve assigned complaints and update status.</p>
        </button>

        {/* Railway Admin Card */}
        <button
          type="button"
          onClick={() => {
            setSelectedRole('ADMIN');
            setIdInput('ADMIN001');
          }}
          class={`flex flex-col items-center p-6 bg-surface border rounded-xl shadow-xs transition-all text-center group ${
            selectedRole === 'ADMIN'
              ? 'border-primary ring-2 ring-primary ring-offset-2 bg-primary/5'
              : 'border-outline-variant hover:border-primary'
          }`}
        >
          <div class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-3 group-hover:bg-primary-container transition-colors">
            <span class="material-symbols-outlined text-3xl text-primary group-hover:text-on-primary-container">admin_panel_settings</span>
          </div>
          <h2 class="font-bold text-lg text-on-surface mb-1">Railway Admin</h2>
          <p class="text-xs text-on-surface-variant">For supervisors to view MIS reports, AI insights, and system settings.</p>
        </button>
      </div>

      {/* Dynamic Login Form Area */}
      <div class="w-full max-w-md bg-surface border border-outline-variant rounded-xl shadow-xs p-6">
        <h3 class="font-bold text-lg text-on-surface mb-4 text-center border-b border-outline-variant pb-2">
          {selectedRole === 'PASSENGER' && 'Passenger Login'}
          {selectedRole === 'STAFF' && 'Railway Staff Login'}
          {selectedRole === 'ADMIN' && 'Railway Admin Login'}
        </h3>

        <form onSubmit={handleLoginSubmit} class="space-y-4">
          <div>
            <label class="text-xs font-semibold text-on-surface block mb-1">
              {selectedRole === 'PASSENGER' ? 'Mobile Number / Email ID' : selectedRole === 'STAFF' ? 'Staff Employee ID' : 'Admin Login ID'}
            </label>
            <input
              type="text"
              required
              value={idInput || (selectedRole === 'STAFF' ? 'STAFF001' : selectedRole === 'ADMIN' ? 'ADMIN001' : 'demo@passenger.com')}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder="Enter ID"
              class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label class="text-xs font-semibold text-on-surface block mb-1">Password / OTP</label>
            <input
              type="password"
              value={passwordInput || '••••••••'}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label class="text-xs font-semibold text-on-surface block mb-1">Security Code (CAPTCHA)</label>
            <div class="flex gap-2 items-center">
              <div class="bg-surface-container-highest border border-outline-variant rounded-lg h-9 w-28 flex items-center justify-center font-mono font-bold tracking-widest text-on-surface select-none">
                <span>X92KQ</span>
              </div>
              <input
                type="text"
                defaultValue="X92KQ"
                class="flex-1 bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              class="w-full bg-primary text-on-primary font-bold text-xs py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-xs"
            >
              Login to {selectedRole} Portal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

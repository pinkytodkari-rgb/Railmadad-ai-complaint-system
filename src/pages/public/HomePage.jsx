import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function HomePage() {
  const [pnrInput, setPnrInput] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    login('PASSENGER');
    navigate('/passenger/track');
  };

  return (
    <div class="flex flex-col gap-10">
      {/* Hero Section */}
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
        <div class="flex flex-col justify-center gap-4">
          <h1 class="font-extrabold text-3xl md:text-4xl text-on-surface leading-tight">
            Intelligent Grievance Resolution
          </h1>
          <p class="text-base text-on-surface-variant max-w-md">
            Report issues quickly and let our intelligent system route them to the correct department for faster resolution.
          </p>
          <div class="flex items-center gap-2 mt-2 p-3 bg-ai-accent border border-ai-stroke rounded-lg text-[#1565C0]">
            <span class="material-symbols-outlined">smart_toy</span>
            <span class="font-medium text-xs md:text-sm">
              AI-assisted complaint understanding, prioritization and smart routing.
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Train Complaint Card */}
          <Link
            to="/passenger/train-complaint"
            class="group relative block p-6 bg-surface border border-[#E0E0E0] rounded-xl shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col items-center text-center gap-4 hover:border-primary"
          >
            <div class="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary relative z-10">
              <span class="material-symbols-outlined text-3xl">train</span>
            </div>
            <h2 class="font-bold text-xl text-on-surface relative z-10">Train Complaint</h2>
            <p class="text-xs text-on-surface-variant relative z-10">
              Report issues related to amenities, cleanliness, or staff on board.
            </p>
          </Link>

          {/* Station Complaint Card */}
          <Link
            to="/passenger/train-complaint"
            class="group relative block p-6 bg-surface border border-[#E0E0E0] rounded-xl shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col items-center text-center gap-4 hover:border-primary"
          >
            <div class="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary relative z-10">
              <span class="material-symbols-outlined text-3xl">domain</span>
            </div>
            <h2 class="font-bold text-xl text-on-surface relative z-10">Station Complaint</h2>
            <p class="text-xs text-on-surface-variant relative z-10">
              Report issues related to station facilities, ticketing, or security.
            </p>
          </Link>
        </div>
      </section>

      {/* Secondary Actions Bento Grid */}
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Track Concern */}
        <div class="bg-surface border border-[#E0E0E0] rounded-xl shadow-xs p-6 flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-2xl">search</span>
            <h3 class="font-bold text-lg text-on-surface">Track your Concern</h3>
          </div>
          <p class="text-xs text-on-surface-variant">Enter your Reference Number (PNR/Mobile) to check live status.</p>
          <form onSubmit={handleTrackSubmit} class="flex flex-col gap-3 mt-auto">
            <input
              type="text"
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value)}
              placeholder="e.g. RM-10482 or PNR"
              class="w-full text-xs border border-outline-variant rounded-lg px-3 py-2.5 bg-background-alt focus:ring-1 focus:ring-primary outline-none"
            />
            <button
              type="submit"
              class="w-full bg-primary text-on-primary font-semibold text-xs py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-xs"
            >
              Check Status
            </button>
          </form>
        </div>

        {/* Suggestions */}
        <div class="bg-surface border border-[#E0E0E0] rounded-xl shadow-xs p-6 flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-2xl">lightbulb</span>
            <h3 class="font-bold text-lg text-on-surface">Your Suggestions</h3>
          </div>
          <p class="text-xs text-on-surface-variant">Help us improve Indian Railways. Share your ideas and feedback.</p>
          <Link
            to="/passenger/train-complaint"
            class="mt-auto w-full border border-primary text-primary font-semibold text-xs py-2.5 rounded-lg flex justify-center items-center hover:bg-primary/5 transition-colors"
          >
            Submit Suggestion
          </Link>
        </div>

        {/* FAQs */}
        <div class="bg-surface border border-[#E0E0E0] rounded-xl shadow-xs p-6 flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-2xl">help_outline</span>
            <h3 class="font-bold text-lg text-on-surface">Frequently Asked Questions</h3>
          </div>
          <ul class="text-xs text-on-surface-variant flex flex-col gap-2.5 mb-2">
            <li>
              <a href="#" class="hover:text-primary flex items-center justify-between">
                How to register a complaint? <span class="material-symbols-outlined text-sm">chevron_right</span>
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-primary flex items-center justify-between">
                What is Rail Anubhav? <span class="material-symbols-outlined text-sm">chevron_right</span>
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-primary flex items-center justify-between">
                Escalation matrix details <span class="material-symbols-outlined text-sm">chevron_right</span>
              </a>
            </li>
          </ul>
          <a href="#" class="mt-auto w-full text-center text-primary font-semibold text-xs hover:underline">
            View All FAQs
          </a>
        </div>
      </section>
    </div>
  );
}

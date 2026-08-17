import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaint } from '../../context/ComplaintContext';

export default function TrainComplaintPage() {
  const [activeTab, setActiveTab] = useState('PNR'); // PNR or UTS
  const { complaint, loadDemoComplaint, setComplaint } = useComplaint();
  const navigate = useNavigate();

  const handleAnalyzeSubmit = (e) => {
    e.preventDefault();
    navigate('/passenger/ai-analysis');
  };

  return (
    <div class="w-full flex flex-col gap-6">
      {/* Header & Demo Trigger */}
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <h1 class="font-extrabold text-2xl md:text-3xl text-on-surface">Train Complaint</h1>
          <p class="text-xs md:text-sm text-on-surface-variant mt-1">
            Register a grievance related to your ongoing or upcoming train journey.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDemoComplaint}
          class="flex items-center gap-2 font-bold text-xs text-ai-stroke bg-ai-accent hover:bg-blue-100 px-4 py-2.5 rounded-lg border border-ai-stroke transition-all shadow-xs"
        >
          <span class="material-symbols-outlined text-[18px]">magic_button</span>
          Load Demo Complaint
        </button>
      </div>

      <form onSubmit={handleAnalyzeSubmit} class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column */}
        <div class="lg:col-span-8 flex flex-col gap-6">
          {/* Section 1: Journey Identification */}
          <section class="glass-card rounded-xl p-6 shadow-xs">
            <h2 class="font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">train</span>
              Journey Identification
            </h2>

            {/* PNR / UTS Tabs */}
            <div class="flex bg-surface-container-high rounded-lg p-1 mb-4 w-fit">
              <button
                type="button"
                onClick={() => setActiveTab('PNR')}
                class={`text-xs font-semibold px-6 py-2 rounded-md transition-all ${
                  activeTab === 'PNR'
                    ? 'bg-surface shadow-xs text-on-surface'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                PNR (Reserved)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('UTS')}
                class={`text-xs font-semibold px-6 py-2 rounded-md transition-all ${
                  activeTab === 'UTS'
                    ? 'bg-surface shadow-xs text-on-surface'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                UTS (Unreserved / Local)
              </button>
            </div>

            {activeTab === 'PNR' ? (
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-on-surface-variant">PNR Number *</label>
                  <input
                    type="text"
                    required
                    value={complaint.pnr}
                    onChange={(e) => setComplaint((prev) => ({ ...prev, pnr: e.target.value }))}
                    placeholder="10 digit PNR"
                    class="text-xs bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2.5 focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-on-surface-variant">Train No. & Name</label>
                  <input
                    type="text"
                    value={complaint.train}
                    readOnly
                    class="text-xs bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2.5 font-medium text-on-surface"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-on-surface-variant">Coach & Berth</label>
                  <input
                    type="text"
                    value={`Coach ${complaint.coach} • Berth ${complaint.berth}`}
                    readOnly
                    class="text-xs bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2.5 font-medium text-on-surface"
                  />
                </div>
              </div>
            ) : (
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-on-surface-variant">UTS Ticket Number / Mobile *</label>
                  <input
                    type="text"
                    placeholder="Enter UTS ticket number"
                    class="text-xs bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2.5 outline-none"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-on-surface-variant">Coach (Passenger Provided)</label>
                  <input
                    type="text"
                    placeholder="e.g. General Coach / Unreserved"
                    class="text-xs bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2.5 outline-none"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Section 2: Complaint Details */}
          <section class="glass-card rounded-xl p-6 shadow-xs">
            <h2 class="font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">edit_document</span>
              Complaint Details
            </h2>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold text-on-surface-variant">Description *</label>
              <textarea
                rows="4"
                required
                value={complaint.description}
                onChange={(e) => setComplaint((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Please describe your concern in detail..."
                class="text-xs bg-surface-container-lowest border border-outline-variant rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
              ></textarea>
            </div>
          </section>

          {/* Section 3: Evidence */}
          <section class="glass-card rounded-xl p-6 shadow-xs">
            <h2 class="font-bold text-lg text-on-surface mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">attachment</span>
              Add Supporting Evidence
            </h2>
            <p class="text-xs text-on-surface-variant mb-4">
              Submit any available evidence (Text, Photo, Audio, or Video).
            </p>

            <div class="flex flex-wrap gap-3 mb-4">
              <button
                type="button"
                onClick={loadDemoComplaint}
                class="flex items-center gap-2 text-xs font-semibold border border-outline-variant text-on-surface hover:bg-surface-variant px-4 py-2 rounded-lg bg-surface-container-lowest transition-colors"
              >
                <span class="material-symbols-outlined text-primary">photo_camera</span> Photo
              </button>
              <button
                type="button"
                class="flex items-center gap-2 text-xs font-semibold border border-outline-variant text-on-surface-variant hover:bg-surface-variant px-4 py-2 rounded-lg bg-surface-container-lowest transition-colors"
              >
                <span class="material-symbols-outlined">videocam</span> Video
              </button>
              <button
                type="button"
                class="flex items-center gap-2 text-xs font-semibold border border-outline-variant text-on-surface-variant hover:bg-surface-variant px-4 py-2 rounded-lg bg-surface-container-lowest transition-colors"
              >
                <span class="material-symbols-outlined">mic</span> Audio
              </button>
            </div>

            {/* Submitted Evidence Box */}
            {complaint.evidence.imageSubmitted && (
              <div class="p-3 border border-outline-variant rounded-lg bg-surface flex items-start gap-4">
                <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant">
                  <img
                    src={complaint.evidence.imageUrl}
                    alt="Water Leakage Evidence"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-grow">
                  <div class="flex justify-between items-start">
                    <span class="font-semibold text-xs text-on-surface">{complaint.evidence.imageName}</span>
                    <span class="text-[10px] bg-status-resolved/10 text-status-resolved px-2 py-0.5 rounded font-bold">
                      Attached ✓
                    </span>
                  </div>
                  <span class="text-xs text-on-surface-variant block mt-1">{complaint.evidence.imageSize}</span>
                  <div class="text-[11px] text-ai-stroke mt-2 font-medium flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">check_circle</span>
                    Image reviewed: Liquid leakage confirmed
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Primary Action Button */}
          <div class="flex justify-end">
            <button
              type="submit"
              class="font-bold text-sm bg-primary text-on-primary px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center gap-2"
            >
              <span class="material-symbols-outlined icon-fill">send</span>
              Submit &amp; Register Complaint
            </button>
          </div>
        </div>

        {/* Right Info Box */}
        <div class="lg:col-span-4">
          <div class="bg-ai-accent/30 border border-ai-stroke/40 rounded-xl p-5 flex flex-col gap-4">
            <div class="flex items-center gap-2 text-ai-stroke font-bold text-sm">
              <span class="material-symbols-outlined icon-fill">auto_awesome</span>
              Complaint Processing
            </div>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              When you submit your complaint, RailMadad will:
            </p>
            <ul class="text-xs text-on-surface flex flex-col gap-2">
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-status-resolved text-sm">check_circle</span>
                Classify defect category & urgency
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-status-resolved text-sm">check_circle</span>
                Verify text/photo consistency
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-status-resolved text-sm">check_circle</span>
                Detect coach cluster complaints
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-status-resolved text-sm">check_circle</span>
                Smart-route directly to Surat Depot staff
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

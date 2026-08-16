import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaint } from '../../context/ComplaintContext';

export default function AiAnalysisPage() {
  const { complaint } = useComplaint();
  const navigate = useNavigate();

  const handleConfirmAndTrack = () => {
    navigate('/passenger/track');
  };

  return (
    <div class="w-full flex flex-col gap-6">
      {/* Header Section */}
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <h1 class="font-extrabold text-2xl md:text-3xl text-on-surface">AI Analysis Report</h1>
          <p class="text-xs md:text-sm text-on-surface-variant mt-1">
            Incident Reference: <span class="font-bold text-primary">{complaint.incidentId}</span> • Complaint ID: {complaint.complaintId}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full bg-ai-accent text-ai-stroke font-bold text-xs border border-ai-stroke/40 flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">psychology</span>
            AI Processed
          </span>
          <span class="px-3 py-1 rounded-full bg-status-emergency/10 text-status-emergency font-bold text-xs border border-status-emergency/30 flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">warning</span>
            High Urgency
          </span>
        </div>
      </div>

      {/* Grid Layout */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div class="lg:col-span-8 flex flex-col gap-6">
          {/* Detected Issue Card */}
          <div class="bg-surface rounded-xl p-6 border border-outline-variant shadow-xs relative overflow-hidden">
            <div class="absolute top-4 right-4 flex flex-col items-end">
              <span class="font-black text-2xl text-ai-stroke">{complaint.confidence}%</span>
              <span class="text-[11px] text-on-surface-variant font-medium">Confidence Score</span>
            </div>

            <h3 class="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Detected Issue</h3>
            <div class="font-black text-2xl text-on-surface mb-4">{complaint.issue}</div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/40">
              <div>
                <p class="text-xs text-on-surface-variant font-medium">Primary Department Category</p>
                <p class="text-sm font-bold text-on-surface flex items-center gap-2 mt-1">
                  <span class="material-symbols-outlined text-primary text-[18px]">build</span>
                  {complaint.category}
                </p>
              </div>
              <div>
                <p class="text-xs text-on-surface-variant font-medium">Affected Area</p>
                <p class="text-sm font-bold text-on-surface flex items-center gap-2 mt-1">
                  <span class="material-symbols-outlined text-primary text-[18px]">water_drop</span>
                  Upper Panel / Window Berth 42
                </p>
              </div>
            </div>
          </div>

          {/* Evidence Consistency Check */}
          <div class="bg-ai-accent/20 rounded-xl p-6 border border-ai-stroke shadow-xs relative">
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-ai-stroke rounded-l-xl"></div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-lg text-on-surface flex items-center gap-2">
                <span class="material-symbols-outlined text-ai-stroke">fact_check</span>
                Evidence Consistency Check
              </h3>
              <div class="px-3 py-1 bg-status-resolved/10 text-status-resolved rounded-full font-bold text-xs border border-status-resolved/30 flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">check_circle</span>
                {complaint.consistency.overall}
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Text Check */}
              <div class="bg-surface rounded-lg p-3 border border-outline-variant flex flex-col gap-1">
                <span class="text-[11px] font-semibold text-on-surface-variant">Passenger Text</span>
                <div class="flex items-center gap-1.5 text-status-resolved font-bold text-xs">
                  <span class="material-symbols-outlined text-base">check</span>
                  {complaint.consistency.passengerText}
                </div>
                <p class="text-xs text-on-surface mt-1 italic">
                  "{complaint.description.slice(0, 60)}..."
                </p>
              </div>

              {/* Image Check */}
              <div class="bg-surface rounded-lg p-3 border border-outline-variant flex flex-col gap-1">
                <span class="text-[11px] font-semibold text-on-surface-variant">Image Analysis</span>
                <div class="flex items-center gap-1.5 text-status-resolved font-bold text-xs">
                  <span class="material-symbols-outlined text-base">check</span>
                  {complaint.consistency.imageAnalysis}
                </div>
                <div class="h-10 w-16 bg-surface-variant rounded mt-1 overflow-hidden border border-outline-variant">
                  <img
                    src={complaint.evidence.imageUrl}
                    alt="Leakage preview"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Railway Context Check */}
              <div class="bg-surface rounded-lg p-3 border border-outline-variant flex flex-col gap-1">
                <span class="text-[11px] font-semibold text-on-surface-variant">Railway Context</span>
                <div class="flex items-center gap-1.5 text-status-resolved font-bold text-xs">
                  <span class="material-symbols-outlined text-base">verified</span>
                  {complaint.consistency.railwayContext}
                </div>
                <p class="text-[11px] text-on-surface mt-1">
                  {complaint.consistency.contextDetail}
                </p>
              </div>
            </div>
          </div>

          {/* Railway Context Card */}
          <div class="bg-surface rounded-xl p-6 border border-outline-variant shadow-xs flex flex-col sm:flex-row gap-6 items-center">
            <div class="flex-1">
              <h3 class="font-bold text-lg text-on-surface mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">train</span>
                Verified Railway Context
              </h3>
              <div class="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                <div>
                  <p class="text-on-surface-variant">Train</p>
                  <p class="font-bold text-on-surface">{complaint.train}</p>
                </div>
                <div>
                  <p class="text-on-surface-variant">Coach & Berth</p>
                  <p class="font-bold text-on-surface">Coach {complaint.coach} • Berth {complaint.berth}</p>
                </div>
                <div class="col-span-2">
                  <p class="text-on-surface-variant">Current Location Status</p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="w-2.5 h-2.5 rounded-full bg-status-resolved animate-pulse"></span>
                    <p class="font-medium text-on-surface">{complaint.currentLocation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Related Complaints & Routing */}
        <div class="lg:col-span-4 flex flex-col gap-6">
          {/* Cluster Alert */}
          <div class="bg-surface rounded-xl p-5 border border-outline-variant shadow-xs">
            <h3 class="font-bold text-base text-on-surface mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary">groups</span>
              Cluster Alert Detected
            </h3>
            <p class="text-xs text-on-surface mb-3">
              <strong class="text-secondary">{complaint.relatedComplaints.length} other passengers</strong> reported Water Leakage in Coach S5 within the last 14 minutes.
            </p>
            <div class="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant flex items-center justify-between text-xs">
              <span class="text-on-surface-variant">Incident Linked:</span>
              <span class="font-bold text-primary underline">{complaint.incidentId}</span>
            </div>
          </div>

          {/* Smart Routing Action */}
          <div class="bg-surface rounded-xl p-6 border border-primary/30 shadow-md border-t-4 border-t-primary flex flex-col gap-4">
            <div>
              <h3 class="font-bold text-lg text-on-surface mb-1">Smart Routing</h3>
              <p class="text-xs text-on-surface-variant">
                Forwarded to: <br/>
                <strong class="text-on-surface font-bold text-sm">{complaint.smartRouting.recommendedDepartment}</strong>
              </p>
            </div>

            <button
              onClick={handleConfirmAndTrack}
              class="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold text-sm py-3.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">send</span>
              Confirm & Track Complaint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

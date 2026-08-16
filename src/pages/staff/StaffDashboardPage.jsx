import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useComplaint } from '../../context/ComplaintContext';

export default function StaffDashboardPage() {
  const { complaint, acceptTask } = useComplaint();
  const navigate = useNavigate();

  return (
    <div class="flex flex-col gap-6">
      {/* Operational Summary Cards */}
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-surface rounded-xl border border-outline-variant p-5 flex items-center justify-between shadow-xs">
          <div>
            <div class="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              High Priority Cases
            </div>
            <div class="font-black text-3xl text-status-emergency">12</div>
          </div>
          <div class="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl icon-fill">warning</span>
          </div>
        </div>

        <div class="bg-surface rounded-xl border border-outline-variant p-5 flex items-center justify-between shadow-xs">
          <div>
            <div class="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Active Incidents
            </div>
            <div class="font-black text-3xl text-status-pending">8</div>
          </div>
          <div class="w-12 h-12 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl icon-fill">sync</span>
          </div>
        </div>

        <div class="bg-surface rounded-xl border border-outline-variant p-5 flex items-center justify-between shadow-xs">
          <div>
            <div class="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Assigned Tasks
            </div>
            <div class="font-black text-3xl text-primary">15</div>
          </div>
          <div class="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl icon-fill">assignment</span>
          </div>
        </div>
      </section>

      {/* Main Layout Grid */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Incident card */}
        <div class="lg:col-span-2 flex flex-col gap-6">
          <div class="bg-surface rounded-xl border border-outline-variant shadow-xs overflow-hidden">
            <div class="bg-surface-container-low px-6 py-3 border-b border-outline-variant flex justify-between items-center">
              <h2 class="font-bold text-base text-on-surface">Main Active Incident</h2>
              <span class="bg-status-emergency text-white px-3 py-0.5 rounded-full text-xs font-bold">
                {complaint.incidentId}
              </span>
            </div>

            <div class="p-6 flex flex-col gap-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-bold text-xl text-on-surface mb-1">{complaint.issue} in Coach {complaint.coach}</h3>
                  <p class="text-xs text-on-surface-variant font-medium">
                    Train {complaint.train} • Berth {complaint.berth} • {complaint.currentLocation}
                  </p>
                </div>
                <div class="bg-surface-variant px-3 py-1 rounded text-xs font-bold text-on-surface flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">groups</span>
                  {complaint.clusterCount} linked reports
                </div>
              </div>

              {/* Linked Reports preview */}
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {complaint.relatedComplaints.slice(0, 2).map((report, idx) => (
                  <div key={idx} class="border border-outline-variant/60 rounded-lg p-3 bg-background text-xs">
                    <div class="text-[11px] text-on-surface-variant mb-1 font-semibold">
                      Report {idx + 1} • Berth {report.berth} • {report.time}
                    </div>
                    <p class="text-on-surface italic">"{report.text}"</p>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div class="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to="/staff/incidents/INC-104"
                  class="flex-1 bg-primary text-on-primary py-3 px-4 rounded-lg text-xs font-bold text-center hover:bg-primary/90 transition-colors shadow-xs"
                >
                  View Full Incident & Execute Repair
                </Link>
                {complaint.staffAssignment.status === 'Assigned' && (
                  <button
                    onClick={acceptTask}
                    class="flex-1 bg-tertiary-fixed text-on-tertiary-fixed py-3 px-4 rounded-lg text-xs font-bold text-center hover:opacity-90 transition-colors"
                  >
                    Accept Task Directly
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Intervention Feasibility Card */}
        <div class="flex flex-col gap-6">
          <div class="bg-surface rounded-xl border border-outline-variant shadow-xs overflow-hidden">
            <div class="bg-surface-container-low px-6 py-3 border-b border-outline-variant">
              <h2 class="font-bold text-xs uppercase tracking-wider text-on-surface">Opportunity-Aware Feasibility</h2>
            </div>
            <div class="p-6 flex flex-col gap-3 text-xs">
              <div class="font-bold text-sm text-on-surface">
                {complaint.staffAssignment.station} Station
              </div>
              <div class="flex justify-between items-center text-on-surface-variant">
                <span>Station Dwell Time:</span>
                <strong class="text-on-surface">{complaint.staffAssignment.dwellMinutes} mins</strong>
              </div>
              <div class="flex justify-between items-center text-on-surface-variant">
                <span>Est. Repair Intervention:</span>
                <strong class="text-on-surface">{complaint.staffAssignment.estimatedInterventionMinutes} mins</strong>
              </div>

              <div class="bg-tertiary-fixed/40 border border-tertiary-fixed-dim/60 text-on-tertiary-fixed p-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 mt-2">
                <span class="w-2.5 h-2.5 rounded-full bg-status-resolved block"></span>
                {complaint.staffAssignment.feasibility}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

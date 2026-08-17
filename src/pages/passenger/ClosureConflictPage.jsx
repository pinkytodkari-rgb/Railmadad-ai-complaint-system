import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaint } from '../../context/ComplaintContext';

export default function ClosureConflictPage() {
  const { complaint, submitPassengerFeedback } = useComplaint();
  const navigate = useNavigate();

  const handleEscalate = () => {
    alert("Complaint RM-10482 escalated directly to Zonal RailMadad Supervisor for priority reinspection.");
    navigate('/passenger/track');
  };

  return (
    <div class="w-full max-w-4xl mx-auto flex flex-col gap-6 py-4">
      {/* Alert Header */}
      <div class="bg-status-emergency/10 border border-status-emergency/40 rounded-xl p-6 flex items-start gap-4 shadow-xs">
        <div class="w-12 h-12 rounded-full bg-status-emergency text-white flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-2xl">warning</span>
        </div>
        <div>
          <h1 class="font-extrabold text-2xl text-status-emergency">Closure Conflict Detected</h1>
          <p class="text-xs text-on-surface mt-1 leading-relaxed">
            There is a disagreement between the field staff's resolution report and your live feedback. The system has automatically prevented closure and updated status to <strong>REOPENED</strong>.
          </p>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Staff Claim */}
        <div class="bg-surface border border-outline-variant rounded-xl p-5 shadow-xs flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-outline-variant/50 pb-2">
            <span class="font-bold text-sm text-on-surface">Staff Resolution Claim</span>
            <span class="text-xs bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded font-medium">
              Surat Depot
            </span>
          </div>
          <div class="text-xs text-on-surface leading-relaxed">
            "Inspected AC vent & pipe joint in Coach S5. Tightened seal and dried berth 42. Area verified clear."
          </div>
          <div class="text-[11px] text-on-surface-variant">
            Submitted by: Officer Ramesh Kumar • 11:18 AM
          </div>
          {complaint.resolution.afterPhotoUrl && (
            <div class="mt-2 border border-outline-variant rounded overflow-hidden h-36">
              <img src={complaint.resolution.afterPhotoUrl} alt="Staff evidence" class="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Passenger Claim */}
        <div class="bg-surface border border-status-emergency/30 rounded-xl p-5 shadow-xs flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-outline-variant/50 pb-2">
            <span class="font-bold text-sm text-status-emergency">Passenger Feedback</span>
            <span class="text-xs bg-error-container text-on-error-container px-2 py-0.5 rounded font-bold">
              Issue Still Exists
            </span>
          </div>
          <div class="text-xs text-on-surface leading-relaxed">
            "Water is still leaking continuously from the upper panel onto berth 42. The area is wet and unusable."
          </div>
          <div class="text-[11px] text-on-surface-variant">
            Reported by: Citizen Passenger (Seat 42)
          </div>
          <div class="mt-auto p-3 bg-surface-container-low rounded-lg border border-outline-variant text-xs flex items-center gap-2 text-status-emergency font-bold">
            <span class="material-symbols-outlined text-base">update</span>
            Status: REOPENED (Priority Elevated)
          </div>
        </div>
      </div>

      {/* Escalation Options */}
      <div class="bg-surface border border-outline-variant rounded-xl p-6 shadow-xs flex flex-col gap-4">
        <h3 class="font-bold text-base text-on-surface">Escalation Options</h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => {
              submitPassengerFeedback('REOPENED');
              navigate('/passenger/track');
            }}
            class="bg-primary text-on-primary font-bold text-xs p-3.5 rounded-lg hover:bg-primary/90 transition-all flex flex-col items-center gap-1 text-center"
          >
            <span class="material-symbols-outlined text-xl">replay</span>
            Reopen Incident
          </button>

          <button
            onClick={handleEscalate}
            class="bg-status-emergency text-white font-bold text-xs p-3.5 rounded-lg hover:bg-status-emergency/90 transition-all flex flex-col items-center gap-1 text-center"
          >
            <span class="material-symbols-outlined text-xl">publish</span>
            Escalate to Zonal Admin
          </button>

          <button
            onClick={() => {
              alert("Reinspection team notified for Vadodara Station (Next Stop).");
              navigate('/passenger/track');
            }}
            class="bg-surface border-2 border-primary text-primary font-bold text-xs p-3.5 rounded-lg hover:bg-primary/5 transition-all flex flex-col items-center gap-1 text-center"
          >
            <span class="material-symbols-outlined text-xl">near_me</span>
            Reinspection Next Station
          </button>
        </div>
      </div>
    </div>
  );
}

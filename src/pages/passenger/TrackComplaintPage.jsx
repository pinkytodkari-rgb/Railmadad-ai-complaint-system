import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaint } from '../../context/ComplaintContext';

export default function TrackComplaintPage() {
  const { complaint, submitPassengerFeedback } = useComplaint();
  const navigate = useNavigate();

  const handleResolvedClick = () => {
    submitPassengerFeedback('RESOLVED');
  };

  const handleStillExistsClick = () => {
    submitPassengerFeedback('REOPENED');
    navigate('/passenger/closure-conflict');
  };

  return (
    <div class="w-full flex flex-col gap-6">
      {/* Header Section */}
      <div class="flex flex-col gap-1 border-b border-outline-variant/60 pb-4">
        <div class="flex justify-between items-center">
          <h1 class="font-extrabold text-2xl md:text-3xl text-primary">Track Your Concern</h1>
          <span class="bg-surface-variant text-on-surface-variant font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Ref: {complaint.complaintId}
          </span>
        </div>
        <p class="text-xs md:text-sm text-on-surface-variant">
          View real-time status and AI resolution verification of your registered grievance.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details & Resolution (2 cols) */}
        <div class="lg:col-span-2 flex flex-col gap-6">
          {/* Complaint Details Card */}
          <div class="bg-surface border border-outline-variant rounded-xl shadow-xs overflow-hidden">
            <div class="bg-surface-container-low px-6 py-3 border-b border-outline-variant flex justify-between items-center">
              <h2 class="font-bold text-base text-on-surface">Complaint Overview</h2>
              <span class="text-xs text-status-emergency font-bold">Incident {complaint.incidentId}</span>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="flex flex-col gap-1">
                <span class="text-on-surface-variant">Issue Category</span>
                <span class="font-bold text-sm text-on-surface">{complaint.issue}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-on-surface-variant">Location</span>
                <span class="font-bold text-sm text-on-surface">Train {complaint.train}, Coach {complaint.coach} (Berth {complaint.berth})</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-on-surface-variant">Assigned Department</span>
                <span class="font-medium text-on-surface">{complaint.smartRouting.recommendedDepartment}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-on-surface-variant">Assigned Staff</span>
                <span class="font-medium text-on-surface">{complaint.staffAssignment.officerName} ({complaint.staffAssignment.station})</span>
              </div>
            </div>
          </div>

          {/* AI Initial Analysis Summary */}
          <div class="bg-ai-accent/30 border border-ai-stroke rounded-xl p-5 relative overflow-hidden flex flex-col gap-2">
            <div class="absolute top-0 left-0 w-1.5 h-full bg-ai-stroke"></div>
            <div class="flex items-center gap-2 text-ai-stroke font-bold text-xs uppercase tracking-wider">
              <span class="material-symbols-outlined text-base">psychology</span>
              AI Initial Analysis Summary
            </div>
            <p class="text-xs text-on-surface leading-relaxed">
              Automated routing identified this as an infrastructure issue within the rolling stock. Priority escalated to <strong>High</strong> due to potential passenger discomfort during transit. Feasibility computed for Surat Station stop.
            </p>
          </div>

          {/* Resolution Notification Card */}
          <div class="bg-surface border border-primary/30 rounded-xl shadow-xs overflow-hidden">
            <div class="bg-surface-container-low px-6 py-3 border-b border-outline-variant flex justify-between items-center">
              <h2 class="font-bold text-base text-on-surface">Resolution Update</h2>
              {complaint.staffAssignment.status === 'Resolved' && (
                <span class="bg-status-resolved text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  Staff Submitted Resolution
                </span>
              )}
            </div>

            <div class="p-6 flex flex-col gap-4">
              {complaint.staffAssignment.status === 'Resolved' || complaint.resolution.submitted ? (
                <>
                  <div class="bg-status-resolved/10 p-4 rounded-xl flex items-start gap-3 border border-status-resolved/30">
                    <span class="material-symbols-outlined text-status-resolved mt-0.5">check_circle</span>
                    <div class="text-xs text-on-surface">
                      <strong class="font-bold text-sm block mb-1">Staff reported addressed.</strong>
                      Coach Maintenance Officer Ramesh Kumar has inspected Coach S5 at Surat station and reported that the water leakage pipe joint was repaired and floor dried.
                    </div>
                  </div>

                  {complaint.resolution.afterPhotoUrl && (
                    <div class="grid grid-cols-2 gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/60 text-xs">
                      <div>
                        <span class="font-semibold text-on-surface-variant block mb-1">Before Action</span>
                        <img src={complaint.evidence.imageUrl} alt="Before" class="w-full h-24 object-cover rounded border" />
                      </div>
                      <div>
                        <span class="font-semibold text-on-surface-variant block mb-1">After Repair Evidence</span>
                        <img src={complaint.resolution.afterPhotoUrl} alt="After" class="w-full h-24 object-cover rounded border" />
                      </div>
                    </div>
                  )}

                  {complaint.passengerFeedbackStatus === 'RESOLVED' ? (
                    <div class="p-4 bg-status-resolved text-white rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2">
                      <span class="material-symbols-outlined">verified</span>
                      Thank you! You confirmed this issue is resolved. Complaint Closed.
                    </div>
                  ) : (
                    <div class="flex flex-col gap-3 pt-2">
                      <p class="text-xs font-semibold text-on-surface-variant text-center">
                        Please confirm if the issue is resolved to your satisfaction:
                      </p>
                      <div class="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={handleResolvedClick}
                          class="flex items-center justify-center gap-2 bg-status-resolved text-white font-bold text-xs px-6 py-3 rounded-lg hover:bg-status-resolved/90 transition-colors shadow-xs"
                        >
                          <span class="material-symbols-outlined text-lg">check_circle</span>
                          Issue Resolved
                        </button>
                        <button
                          onClick={handleStillExistsClick}
                          class="flex items-center justify-center gap-2 bg-surface border-2 border-status-emergency text-status-emergency font-bold text-xs px-6 py-3 rounded-lg hover:bg-error-container/20 transition-colors"
                        >
                          <span class="material-symbols-outlined text-lg">cancel</span>
                          Issue Still Exists
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div class="bg-surface-variant/40 p-4 rounded-xl flex items-start gap-3 border border-outline-variant/40">
                  <span class="material-symbols-outlined text-status-pending mt-0.5">sync</span>
                  <div class="text-xs text-on-surface">
                    <strong class="font-bold text-sm block mb-1">Maintenance Team In Action</strong>
                    Staff Ramesh Kumar (Surat Station) is executing repair during the 12-minute station stop. Verification update will appear here shortly.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline (1 col) */}
        <div class="bg-surface border border-outline-variant rounded-xl shadow-xs p-6 flex flex-col h-full">
          <h2 class="font-bold text-lg text-on-surface mb-6">Status Timeline</h2>
          <div class="relative flex-grow pl-2">
            <div class="absolute left-[19px] top-2 bottom-6 w-[2px] bg-outline-variant/60"></div>
            <ul class="flex flex-col gap-6 relative z-10 text-xs">
              {complaint.timeline.map((step, idx) => (
                <li key={idx} class={`flex gap-3 ${!step.completed && !step.pending ? 'opacity-40' : ''}`}>
                  <div
                    class={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 -mt-0.5 ${
                      step.completed
                        ? 'bg-status-resolved text-white'
                        : step.pending
                        ? 'bg-status-pending text-on-surface ring-4 ring-status-pending/20 animate-pulse'
                        : 'bg-surface-variant text-on-surface-variant border border-outline'
                    }`}
                  >
                    {step.completed ? (
                      <span class="material-symbols-outlined text-[14px]">check</span>
                    ) : (
                      <div class="w-2 h-2 rounded-full bg-surface"></div>
                    )}
                  </div>
                  <div class="flex flex-col">
                    <span class={`font-bold ${step.pending ? 'text-status-pending' : 'text-on-surface'}`}>
                      {step.title}
                    </span>
                    <span class="text-on-surface-variant text-[11px]">{step.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

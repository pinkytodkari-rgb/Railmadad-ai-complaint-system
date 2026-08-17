import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaint } from '../../context/ComplaintContext';
import { REPAIRED_IMAGE } from '../../data/mockData';

export default function IncidentDetailPage() {
  const { complaint, acceptTask, submitResolution } = useComplaint();
  const navigate = useNavigate();

  const [actionTaken, setActionTaken] = useState('Repair');
  const [notes, setNotes] = useState('Tightened drainage pipe connection joint above upper panel berth 42 and cleaned puddle area.');
  const [checklist, setChecklist] = useState({
    areaInspected: true,
    sourceIdentified: true,
    repairDone: true,
    areaCleaned: true,
    passengerInformed: true
  });
  const [afterImageUploaded, setAfterImageUploaded] = useState(true);

  const handleSubmitResolutionForm = (e) => {
    e.preventDefault();
    submitResolution({
      actionTaken,
      notes,
      checklist: Object.keys(checklist).filter((k) => checklist[k]),
      afterPhotoUrl: REPAIRED_IMAGE
    });
    alert("Resolution evidence submitted! Verification status set to 87% Confidence.");
    navigate('/staff');
  };

  return (
    <div class="w-full flex flex-col gap-6">
      {/* Header */}
      <div class="flex justify-between items-center border-b border-outline-variant/60 pb-4">
        <div>
          <h1 class="font-bold text-2xl text-on-surface">Incident Details & Action Log</h1>
          <p class="text-xs text-on-surface-variant">Reference ID: <strong class="text-primary">{complaint.incidentId}</strong></p>
        </div>
        <span class="bg-status-emergency text-white px-3 py-1 rounded-full font-bold text-xs">
          High Priority Flag
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Reports & Action Form */}
        <div class="lg:col-span-8 flex flex-col gap-6">
          {/* Incident Detail Box */}
          <div class="bg-surface rounded-xl border border-outline-variant p-6 shadow-xs flex flex-col gap-4">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="font-extrabold text-xl text-on-surface">{complaint.issue}</h2>
                <p class="text-xs text-on-surface-variant font-medium mt-0.5">
                  Train {complaint.train} • Coach {complaint.coach} • Berth {complaint.berth}
                </p>
              </div>
              <div class="bg-primary-container/20 text-primary px-3 py-1 rounded text-xs font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">groups</span>
                {complaint.clusterCount} Passenger Reports Linked
              </div>
            </div>

            {/* Linked Reports List */}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {complaint.relatedComplaints.map((report, idx) => (
                <div key={idx} class="border border-outline-variant/60 rounded-lg p-3 bg-background text-xs">
                  <div class="text-[11px] font-bold text-primary mb-1">
                    Report {idx + 1} (Berth {report.berth}) • {report.time}
                  </div>
                  <p class="text-on-surface italic">"{report.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Execution Form */}
          <form onSubmit={handleSubmitResolutionForm} class="bg-surface rounded-xl border border-outline-variant p-6 shadow-xs flex flex-col gap-5">
            <h3 class="font-bold text-lg text-on-surface flex items-center gap-2 border-b border-outline-variant/40 pb-3">
              <span class="material-symbols-outlined text-primary">build</span>
              Staff Resolution Action Log
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-semibold text-on-surface-variant">Action Category *</label>
                <select
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  class="text-xs bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2.5 outline-none font-medium"
                >
                  <option value="Inspection">Inspection</option>
                  <option value="Repair">Repair / Sealing</option>
                  <option value="Cleaning">Cleaning & Drying</option>
                  <option value="Temporary Fix">Temporary Fix</option>
                  <option value="Replacement">Component Replacement</option>
                  <option value="Escalated">Escalated to Workshop</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-xs font-semibold text-on-surface-variant">Task Status</label>
                <input
                  type="text"
                  value={complaint.staffAssignment.status}
                  readOnly
                  class="text-xs bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2.5 font-bold text-primary"
                />
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold text-on-surface-variant">Action Notes & Findings *</label>
              <textarea
                rows="3"
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe resolution work performed..."
                class="text-xs bg-surface-container-lowest border border-outline-variant rounded-lg p-3 outline-none"
              ></textarea>
            </div>

            {/* Verification Checklist */}
            <div class="flex flex-col gap-2 pt-2">
              <label class="text-xs font-bold text-on-surface">Inspection & Safety Checklist:</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.areaInspected}
                    onChange={(e) => setChecklist({ ...checklist, areaInspected: e.target.checked })}
                    class="rounded text-primary focus:ring-primary"
                  />
                  Area & panel inspected
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.sourceIdentified}
                    onChange={(e) => setChecklist({ ...checklist, sourceIdentified: e.target.checked })}
                    class="rounded text-primary focus:ring-primary"
                  />
                  Leakage source identified
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.repairDone}
                    onChange={(e) => setChecklist({ ...checklist, repairDone: e.target.checked })}
                    class="rounded text-primary focus:ring-primary"
                  />
                  Required repair performed
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.areaCleaned}
                    onChange={(e) => setChecklist({ ...checklist, areaCleaned: e.target.checked })}
                    class="rounded text-primary focus:ring-primary"
                  />
                  Floor & berth area dried
                </label>
              </div>
            </div>

            {/* Resolution Evidence Upload (Before vs After) */}
            <div class="border-t border-outline-variant/40 pt-4 flex flex-col gap-3">
              <label class="text-xs font-bold text-on-surface">Resolution Verification Evidence (Before vs After)</label>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-3 border border-outline-variant rounded-lg bg-surface-container-low text-xs">
                  <span class="font-bold text-on-surface-variant block mb-2">Original Evidence (Before)</span>
                  <img src={complaint.evidence.imageUrl} alt="Before" class="w-full h-32 object-cover rounded border" />
                </div>

                <div class="p-3 border border-outline-variant rounded-lg bg-surface-container-low text-xs">
                  <span class="font-bold text-on-surface-variant block mb-2">Resolution Evidence (After Photo)</span>
                  {afterImageUploaded ? (
                    <div class="relative h-32 rounded overflow-hidden border">
                      <img src={REPAIRED_IMAGE} alt="After" class="w-full h-full object-cover" />
                      <span class="absolute top-2 right-2 bg-status-resolved text-white text-[10px] px-2 py-0.5 rounded font-bold">
                        Uploaded ✓
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAfterImageUploaded(true)}
                      class="w-full h-32 border-2 border-dashed border-outline-variant rounded flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:border-primary"
                    >
                      <span class="material-symbols-outlined">add_a_photo</span>
                      Upload After Photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div class="flex justify-end gap-3 pt-2">
              {complaint.staffAssignment.status === 'Assigned' && (
                <button
                  type="button"
                  onClick={acceptTask}
                  class="bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs px-6 py-3 rounded-lg hover:opacity-90 transition-colors"
                >
                  Accept Task
                </button>
              )}
              <button
                type="submit"
                class="bg-primary text-on-primary font-bold text-xs px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-xs"
              >
                Submit Action & Verify Resolution
              </button>
            </div>
          </form>
        </div>

        {/* Right Column (4 cols): Verification & Feasibility */}
        <div class="lg:col-span-4 flex flex-col gap-6">
          {/* Opportunity-Aware Feasibility */}
          <div class="bg-surface rounded-xl border border-outline-variant shadow-xs overflow-hidden">
            <div class="bg-surface-container-low px-5 py-3 border-b border-outline-variant">
              <h3 class="font-bold text-xs uppercase tracking-wider text-on-surface">Intervention Feasibility</h3>
            </div>
            <div class="p-5 flex flex-col gap-3 text-xs">
              <div class="font-bold text-sm text-on-surface">
                {complaint.staffAssignment.station} Station
              </div>
              <div class="text-on-surface-variant">
                Station Dwell Time: <strong class="text-on-surface">{complaint.staffAssignment.dwellMinutes} minutes</strong>
              </div>
              <div class="text-on-surface-variant">
                Estimated Repair: <strong class="text-on-surface">{complaint.staffAssignment.estimatedInterventionMinutes} minutes</strong>
              </div>
              <div class="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2">
                <span class="w-2 h-2 rounded-full bg-status-resolved block"></span>
                FEASIBLE BEFORE DEPARTURE
              </div>
            </div>
          </div>

          {/* Resolution Verification Card */}
          <div class="bg-ai-accent/30 border border-ai-stroke rounded-xl p-5 shadow-xs flex flex-col gap-3">
            <div class="flex items-center gap-2 text-ai-stroke font-bold text-xs">
              <span class="material-symbols-outlined text-base">verified</span>
              Resolution Verification Checklist
            </div>
            <ul class="text-xs text-on-surface flex flex-col gap-1.5">
              <li class="flex items-center gap-1.5 text-status-resolved font-medium">
                <span class="material-symbols-outlined text-sm">check</span> Affected area identified
              </li>
              <li class="flex items-center gap-1.5 text-status-resolved font-medium">
                <span class="material-symbols-outlined text-sm">check</span> Before/After evidence paired
              </li>
              <li class="flex items-center gap-1.5 text-status-resolved font-medium">
                <span class="material-symbols-outlined text-sm">check</span> Staff action log recorded
              </li>
            </ul>
            <div class="pt-2 border-t border-ai-stroke/30 flex justify-between items-center text-xs">
              <span class="text-on-surface-variant font-medium">Verification Score:</span>
              <span class="font-bold text-sm text-ai-stroke">87% Confidence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

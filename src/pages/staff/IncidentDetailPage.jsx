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

      {/* Action Workflow Progress Track */}
      <div class="bg-surface rounded-xl border border-outline-variant p-5 shadow-xs">
        <h2 class="font-bold text-xs uppercase tracking-wider text-on-surface-variant mb-4">Incident Action Flow</h2>
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
          {[
            { label: 'Incident Assigned', icon: 'assignment', done: true },
            { label: 'Action Feasible', icon: 'check_circle', done: true },
            { label: 'Repair Completed', icon: 'build', done: complaint.staffAssignment.status === 'Resolved' },
            { label: 'Evidence Submitted', icon: 'add_a_photo', done: complaint.staffAssignment.status === 'Resolved' },
            { label: 'Resolution Verified', icon: 'verified', done: complaint.staffAssignment.status === 'Resolved' }
          ].map((step, idx, arr) => (
            <React.Fragment key={idx}>
              <div class="flex items-center gap-2.5">
                <div class={`w-9 h-9 rounded-full flex items-center justify-center border font-bold text-sm ${
                  step.done 
                    ? 'bg-status-resolved text-white border-status-resolved' 
                    : 'bg-surface-container text-on-surface-variant border-outline-variant'
                }`}>
                  <span class="material-symbols-outlined text-[18px]">{step.icon}</span>
                </div>
                <div class="flex flex-col">
                  <span class={`text-xs font-bold ${step.done ? 'text-status-resolved' : 'text-on-surface-variant'}`}>{step.label}</span>
                  <span class="text-[9px] text-on-surface-variant uppercase tracking-wider">{step.done ? 'Completed' : 'Pending'}</span>
                </div>
              </div>
              {idx < arr.length - 1 && (
                <div class={`hidden md:block flex-1 h-[2px] mx-4 ${arr[idx+1].done ? 'bg-status-resolved' : 'bg-outline-variant/60'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Reports & Action Form */}
        <div class="lg:col-span-8 flex flex-col gap-6">
          {/* Incident Detail Box */}
          <div class="bg-surface rounded-xl border border-outline-variant p-6 shadow-xs flex flex-col gap-6">
            {/* Visual Complaint-to-Incident Flow mapping */}
            <div class="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl border border-outline-variant/40">
              <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-lg justify-between">
                
                {/* 4 Passenger Complaints Box */}
                <div class="w-full sm:flex-1 bg-surface border border-outline-variant p-3.5 rounded-lg flex flex-col items-center justify-center text-center shadow-xs">
                  <span class="material-symbols-outlined text-secondary text-2xl mb-1">groups</span>
                  <span class="text-sm font-black text-on-surface">4 Passenger Complaints</span>
                  <span class="text-[9px] text-on-surface-variant uppercase tracking-wider mt-0.5">Reported in Coach S5</span>
                </div>

                {/* Connection Arrow */}
                <div class="flex flex-col items-center text-on-surface-variant rotate-90 sm:rotate-0">
                  <span class="material-symbols-outlined text-2xl font-bold text-primary">arrow_forward</span>
                  <span class="text-[9px] font-bold uppercase tracking-wider text-primary mt-1 hidden sm:inline">Unified</span>
                </div>

                {/* 1 Unified Incident Box */}
                <div class="w-full sm:flex-1 bg-primary/5 border border-primary/30 p-3.5 rounded-lg flex flex-col items-center justify-center text-center shadow-xs">
                  <span class="material-symbols-outlined text-primary text-2xl mb-1">link</span>
                  <span class="text-sm font-black text-primary">1 Unified Incident</span>
                  <span class="text-xs font-extrabold text-white bg-primary px-2.5 py-0.5 rounded-full mt-1.5 tracking-wider">{complaint.incidentId}</span>
                </div>

              </div>
            </div>

            {/* Incident Details Summary Bar */}
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 border-y border-outline-variant/60 py-4 text-xs">
              <div class="flex flex-col">
                <span class="text-on-surface-variant font-medium uppercase tracking-wider text-[9px]">Defect Type</span>
                <span class="font-black text-sm text-on-surface mt-0.5">{complaint.issue}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-on-surface-variant font-medium uppercase tracking-wider text-[9px]">Train No.</span>
                <span class="font-black text-sm text-on-surface mt-0.5">Train 12951</span>
              </div>
              <div class="flex flex-col">
                <span class="text-on-surface-variant font-medium uppercase tracking-wider text-[9px]">Coach &amp; Berth</span>
                <span class="font-black text-sm text-on-surface mt-0.5">Coach {complaint.coach} / Berth {complaint.berth}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-on-surface-variant font-medium uppercase tracking-wider text-[9px]">Impact</span>
                <span class="font-black text-sm text-on-surface mt-0.5">4 Affected Passengers</span>
              </div>
              <div class="flex flex-col">
                <span class="text-on-surface-variant font-medium uppercase tracking-wider text-[9px]">Priority</span>
                <span class="font-black text-sm text-status-emergency mt-0.5">High Priority</span>
              </div>
            </div>

            {/* Related Passenger Complaint Cards */}
            <div class="flex flex-col gap-3">
              <h3 class="font-bold text-xs uppercase tracking-wider text-on-surface-variant">Linked Passenger Reports</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {complaint.relatedComplaints.map((report, idx) => (
                  <div key={idx} class="border border-outline-variant/60 rounded-xl p-3.5 bg-background text-xs hover:border-primary/50 transition-all flex flex-col gap-2 shadow-2xs">
                    <div class="flex justify-between items-center border-b border-outline-variant/40 pb-1.5">
                      <span class="font-black text-primary text-[10px]">Report #{idx + 1}</span>
                      <span class="text-[10px] bg-surface-variant px-2 py-0.5 rounded font-bold text-on-surface-variant">Berth {report.berth}</span>
                    </div>
                    <p class="text-on-surface italic leading-relaxed">"{report.text}"</p>
                    <span class="text-[9px] text-on-surface-variant mt-auto font-medium align-self-end">{report.time}</span>
                  </div>
                ))}
              </div>
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
            <div class="border-t border-outline-variant/40 pt-5 flex flex-col gap-4">
              <h4 class="text-xs font-black uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-base">collections</span>
                Resolution Evidence (Before vs After Comparison)
              </h4>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Before Image */}
                <div class="p-3.5 border border-outline-variant/60 rounded-xl bg-surface-container-low text-xs flex flex-col gap-2 shadow-2xs relative">
                  <span class="absolute top-3 right-3 bg-status-emergency text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-2xs">
                    Before Action
                  </span>
                  <span class="font-bold text-on-surface-variant">Original Evidence (Water Leakage)</span>
                  <div class="h-40 rounded-lg overflow-hidden border border-outline-variant">
                    <img src={complaint.evidence.imageUrl} alt="Before" class="w-full h-full object-cover" />
                  </div>
                </div>

                {/* After Image */}
                <div class="p-3.5 border border-outline-variant/60 rounded-xl bg-surface-container-low text-xs flex flex-col gap-2 shadow-2xs relative">
                  <span class={`absolute top-3 right-3 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-2xs ${
                    afterImageUploaded ? 'bg-status-resolved text-white' : 'bg-status-pending/20 text-status-pending'
                  }`}>
                    {afterImageUploaded ? 'After Repair (Verified)' : 'Pending Upload'}
                  </span>
                  <span class="font-bold text-on-surface-variant">Resolution Evidence (After Photo)</span>
                  {afterImageUploaded ? (
                    <div class="relative h-40 rounded-lg overflow-hidden border border-outline-variant">
                      <img src={REPAIRED_IMAGE} alt="After" class="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAfterImageUploaded(true)}
                      class="w-full h-40 border-2 border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center gap-2 text-on-surface-variant hover:border-primary transition-all hover:bg-surface"
                    >
                      <span class="material-symbols-outlined text-3xl">add_a_photo</span>
                      <span class="font-bold text-[11px]">Upload After Photo</span>
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
          {/* Feasibility Assessment Box */}
          <div class="bg-surface rounded-xl border border-outline-variant shadow-xs overflow-hidden">
            <div class="bg-surface-container-low px-5 py-3.5 border-b border-outline-variant flex justify-between items-center">
              <h3 class="font-bold text-xs uppercase tracking-wider text-on-surface">Feasibility Assessment</h3>
              <span class="bg-status-resolved/15 text-status-resolved border border-status-resolved/30 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                FEASIBLE
              </span>
            </div>
            
            <div class="p-5 flex flex-col gap-4 text-xs">
              <div class="flex flex-col gap-1 border-b border-outline-variant/40 pb-3">
                <span class="text-on-surface-variant uppercase tracking-wider text-[9px] font-medium">Assigned Team</span>
                <span class="font-black text-sm text-on-surface">Water &amp; Sanitation / Coach Maintenance</span>
              </div>
              
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-surface-container-low border border-outline-variant/60 p-3 rounded-lg flex flex-col">
                  <span class="text-on-surface-variant uppercase tracking-wider text-[9px] font-medium">Next Station</span>
                  <strong class="text-base text-on-surface font-black mt-1">Surat</strong>
                </div>
                <div class="bg-surface-container-low border border-outline-variant/60 p-3 rounded-lg flex flex-col">
                  <span class="text-on-surface-variant uppercase tracking-wider text-[9px] font-medium">Dwell Time</span>
                  <strong class="text-base text-on-surface font-black mt-1">12 min</strong>
                </div>
              </div>

              <div class="bg-surface-container-low border border-outline-variant/60 p-3 rounded-lg flex justify-between items-center">
                <span class="text-on-surface-variant uppercase tracking-wider text-[9px] font-medium">Estimated Action Time</span>
                <strong class="text-sm text-primary font-black">8 min</strong>
              </div>

              <div class="bg-status-resolved/10 text-status-resolved p-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-base">verified</span>
                ACTION FEASIBLE BEFORE DEPARTURE
              </div>
            </div>
          </div>

          {/* Verification Status Card */}
          <div class={`border rounded-xl p-5 shadow-xs flex flex-col gap-4 transition-all ${
            complaint.staffAssignment.status === 'Resolved'
              ? 'bg-status-resolved/10 border-status-resolved/30 text-status-resolved'
              : 'bg-surface border-outline-variant text-on-surface'
          }`}>
            <div class="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div class="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <span class="material-symbols-outlined text-lg">verified</span>
                Resolution Status
              </div>
              <span class={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                complaint.staffAssignment.status === 'Resolved'
                  ? 'bg-status-resolved text-white'
                  : 'bg-status-pending/20 text-status-pending'
              }`}>
                {complaint.staffAssignment.status === 'Resolved' ? 'VERIFIED' : 'PENDING'}
              </span>
            </div>

            <div class="text-xs flex flex-col gap-3">
              <div class="flex items-start gap-2.5">
                <span class="material-symbols-outlined text-base mt-0.5">task_alt</span>
                <div>
                  <strong class="font-bold block">Assigned Job</strong>
                  <span class="text-on-surface-variant leading-relaxed">Tighten drainage pipe connection joint in Coach S5 and dry floor area near berth 42.</span>
                </div>
              </div>
              
              {complaint.staffAssignment.status === 'Resolved' && (
                <div class="mt-2 bg-status-resolved/15 border border-status-resolved/30 p-3 rounded-lg flex items-center gap-2">
                  <span class="material-symbols-outlined text-xl">check_circle</span>
                  <div>
                    <span class="font-black text-xs block">Resolution Logged &amp; Verified</span>
                    <span class="text-[10px] opacity-90 block mt-0.5">Checked at Surat Station. Before vs After evidence matching verified.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

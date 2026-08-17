import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaint } from '../../context/ComplaintContext';

// ─── Detail row used inside the summary card ────────────────────────────────
function DetailRow({ icon, label, value, valueClass = '' }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-outline-variant/40 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="material-symbols-outlined text-[16px] text-primary">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-0.5">{label}</p>
        <p className={`text-sm font-bold text-on-surface leading-snug ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
}

// ─── Status badge ────────────────────────────────────────────────────────────
function StatusBadge({ label, color }) {
  const colors = {
    green:  'bg-status-resolved/10 text-status-resolved border-status-resolved/30',
    red:    'bg-status-emergency/10 text-status-emergency border-status-emergency/30',
    amber:  'bg-status-pending/10 text-status-pending border-status-pending/30',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-extrabold text-xs ${colors[color] ?? colors.green}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AiAnalysisPage() {
  const { complaint } = useComplaint();
  const navigate = useNavigate();
  const handleConfirmAndTrack = () => navigate('/passenger/track');

  const submittedEvidence = [
    complaint.evidence.textSubmitted  && 'Text',
    complaint.evidence.imageSubmitted && 'Image',
    complaint.evidence.audioSubmitted && 'Audio',
    complaint.evidence.videoSubmitted && 'Video',
  ].filter(Boolean);

  return (
    <div className="w-full flex flex-col gap-0">

      {/* ── Hero Header ─────────────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-[#0d2b4e] via-[#133a66] to-[#1a4f8a] rounded-2xl p-6 mb-5 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-32 h-24 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]">task_alt</span>
              </div>
              <span className="text-[11px] font-extrabold tracking-[0.15em] text-blue-200/80 uppercase">
                Complaint Assessment
              </span>
            </div>
            <h1 className="font-black text-2xl md:text-3xl text-white leading-tight">Assessment Complete</h1>
            <p className="text-sm text-blue-200/70 mt-1">
              Ref:&nbsp;<span className="text-white font-bold">{complaint.incidentId}</span>
              &nbsp;•&nbsp;<span className="font-semibold">{complaint.complaintId}</span>
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-center min-w-[76px]">
              <p className="font-black text-2xl text-white leading-none">
                {[complaint.evidence.textSubmitted, complaint.evidence.imageSubmitted,
                  complaint.evidence.audioSubmitted, complaint.evidence.videoSubmitted].filter(Boolean).length}
              </p>
              <p className="text-[10px] text-blue-200/70 font-semibold mt-0.5">Evidence</p>
            </div>
            <div className="bg-red-900/40 border border-red-400/30 rounded-xl px-4 py-2.5 text-center min-w-[76px]">
              <p className="font-black text-sm text-red-200 leading-none pt-1">HIGH</p>
              <p className="text-[10px] text-red-300/70 font-semibold mt-0.5">Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Grid ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── LEFT — Complaint Summary Card ────────────────────────────────── */}
        <div className="lg:col-span-8 flex flex-col gap-5">

          {/* Confirmation banner */}
          <div className="bg-status-resolved/8 border border-status-resolved/30 rounded-2xl px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-status-resolved/15 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-status-resolved text-[20px]">check_circle</span>
            </div>
            <p className="text-sm font-semibold text-on-surface">
              Your complaint has been assessed and routed to the appropriate team.
            </p>
          </div>

          {/* Summary details */}
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-xs overflow-hidden">
            <div className="bg-surface-container-low px-5 py-3 border-b border-outline-variant">
              <h2 className="font-bold text-sm uppercase tracking-wider text-on-surface">Complaint Summary</h2>
            </div>
            <div className="px-5 divide-y divide-outline-variant/40">
              <DetailRow icon="report_problem"   label="Issue Identified"    value={complaint.issue} />
              <DetailRow icon="train"             label="Train"               value={complaint.train} />
              {complaint.coach && (
                <DetailRow icon="directions_railway" label="Coach"           value={`Coach ${complaint.coach}${complaint.berth ? ` · Berth ${complaint.berth}` : ''}`} />
              )}
              <DetailRow
                icon="attach_file"
                label="Evidence Submitted"
                value={submittedEvidence.length > 0 ? submittedEvidence.join(' + ') : 'None'}
              />
              <div className="flex items-start gap-3 py-3 border-b border-outline-variant/40 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">fact_check</span>
                </div>
                <div className="flex-1 flex items-center justify-between min-w-0 flex-wrap gap-2 pt-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Evidence Status</p>
                  <StatusBadge
                    label={complaint.consistency.overall}
                    color={complaint.consistency.overall === 'SUPPORTED' ? 'green' : complaint.consistency.overall === 'CONTRADICTED' ? 'red' : 'amber'}
                  />
                </div>
              </div>
              <div className="flex items-start gap-3 py-3 border-b border-outline-variant/40 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">priority_high</span>
                </div>
                <div className="flex-1 flex items-center justify-between min-w-0 flex-wrap gap-2 pt-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Priority</p>
                  <StatusBadge label="High" color="red" />
                </div>
              </div>
              <DetailRow icon="groups"     label="Related Complaints"  value={`${complaint.clusterCount} other reports linked to this incident`} />
              <DetailRow icon="tag"        label="Incident Reference"  value={complaint.incidentId} />
              <DetailRow icon="build"      label="Assigned Team"       value={complaint.smartRouting.recommendedDepartment} />
            </div>
          </div>

        </div>

        {/* ── RIGHT — Routing + CTA (unchanged) ───────────────────────────── */}
        <div className="lg:col-span-4 flex flex-col gap-5">

          {/* Assigned dept card */}
          <div className="bg-surface rounded-2xl p-5 border border-outline-variant shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[17px] text-primary">hub</span>
              </div>
              <div>
                <p className="text-xs font-extrabold text-on-surface">Assigned Team</p>
                <p className="text-[10px] text-on-surface-variant">Complaint has been forwarded</p>
              </div>
            </div>
            <p className="text-sm font-bold text-on-surface mb-3">{complaint.smartRouting.recommendedDepartment}</p>
            <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between text-xs border border-outline-variant">
              <span className="text-on-surface-variant">Incident Linked</span>
              <span className="font-bold text-primary">{complaint.incidentId}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] text-status-resolved font-semibold">
                {complaint.smartRouting.forwardedStatus} · {complaint.smartRouting.forwardedTime}
              </span>
            </div>
          </div>

          {/* Related complaints notice */}
          <div className="bg-surface rounded-2xl p-5 border border-outline-variant shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[17px] text-secondary">groups</span>
              </div>
              <div>
                <p className="text-xs font-extrabold text-on-surface">Related Reports</p>
                <p className="text-[10px] text-on-surface-variant">Similar complaints nearby</p>
              </div>
            </div>
            <p className="text-xs text-on-surface">
              <strong className="text-secondary">{complaint.relatedComplaints.length} other passengers</strong>
              &nbsp;reported the same issue in this coach within the last 15&nbsp;minutes. Your complaint has been linked to the same incident.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-primary to-[#3d0c0e] rounded-2xl p-5 flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-extrabold tracking-widest text-red-200/70 uppercase mb-1">Next Step</p>
              <p className="text-white font-bold text-sm leading-snug">
                Confirm your complaint and track real-time resolution progress.
              </p>
            </div>
            <button
              id="confirm-and-track-btn"
              onClick={handleConfirmAndTrack}
              className="w-full bg-white hover:bg-red-50 text-primary font-extrabold text-sm py-3.5 rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              Confirm &amp; Track Complaint
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

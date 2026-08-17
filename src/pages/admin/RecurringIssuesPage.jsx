import React, { useState } from 'react';
import { useComplaint } from '../../context/ComplaintContext';

export default function RecurringIssuesPage() {
  const { analytics } = useComplaint();
  const [directiveDispatched, setDirectiveDispatched] = useState(false);

  const handleDispatch = () => {
    setDirectiveDispatched(true);
    alert("Preventive Inspection Directive #DIR-2024-89 dispatched to Northern Zone Workshop for Coach S5 fleet inspection!");
  };

  return (
    <div class="w-full flex flex-col gap-6">
      <div class="flex justify-between items-center border-b border-outline-variant/60 pb-4">
        <div>
          <h1 class="font-bold text-2xl text-on-surface">Recurring Issue Detection</h1>
          <p class="text-xs text-on-surface-variant">Identified patterns across rolling stock &amp; zonal maintenance logs</p>
        </div>
        <span class="bg-status-emergency text-white font-bold text-xs px-3 py-1 rounded-full">
          Critical Cluster Found
        </span>
      </div>

      <div class="bg-ai-accent/30 border border-ai-stroke rounded-xl p-6 shadow-xs flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-ai-stroke/30 pb-4">
          <div>
            <span class="text-[11px] font-bold text-ai-stroke uppercase tracking-wider block mb-1">
              Detected Pattern #REP-104
            </span>
            <h2 class="font-extrabold text-2xl text-on-surface">{analytics.recurringIssue.issue}</h2>
          </div>
          <div class="text-right">
            <span class="text-xs font-bold text-on-surface-variant">Confidence Score</span>
            <div class="font-black text-2xl text-ai-stroke">{analytics.recurringIssue.aiConfidence}%</div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div class="bg-surface p-3.5 rounded-lg border border-outline-variant">
            <span class="text-on-surface-variant block mb-1">Affected Coach Class</span>
            <strong class="font-bold text-sm text-on-surface">{analytics.recurringIssue.coachClass}</strong>
          </div>
          <div class="bg-surface p-3.5 rounded-lg border border-outline-variant">
            <span class="text-on-surface-variant block mb-1">Incidents (Last 30 Days)</span>
            <strong class="font-bold text-sm text-status-emergency">{analytics.recurringIssue.incidentCount} Reports</strong>
          </div>
          <div class="bg-surface p-3.5 rounded-lg border border-outline-variant">
            <span class="text-on-surface-variant block mb-1">Trajectory Trend</span>
            <strong class="font-bold text-sm text-status-emergency flex items-center gap-1">
              <span class="material-symbols-outlined text-base">trending_up</span> {analytics.recurringIssue.trend}
            </strong>
          </div>
          <div class="bg-surface p-3.5 rounded-lg border border-outline-variant">
            <span class="text-on-surface-variant block mb-1">Scope</span>
            <strong class="font-bold text-sm text-on-surface">{analytics.recurringIssue.trainZone}</strong>
          </div>
        </div>

        <div class="bg-tertiary-fixed/30 border border-tertiary-fixed-dim/60 text-on-tertiary-fixed p-4 rounded-xl flex items-start gap-3">
          <span class="material-symbols-outlined text-xl text-primary mt-0.5">build_circle</span>
          <div class="text-xs">
            <strong class="font-bold text-sm text-on-surface block mb-1">Preventive Maintenance Recommendation:</strong>
            "{analytics.recurringIssue.recommendation}"
          </div>
        </div>

        <div class="flex justify-end pt-2">
          {directiveDispatched ? (
            <div class="bg-status-resolved text-white font-bold text-xs px-6 py-3 rounded-lg flex items-center gap-2">
              <span class="material-symbols-outlined">check_circle</span>
              Directive Dispatched to Workshop
            </div>
          ) : (
            <button
              onClick={handleDispatch}
              class="bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs px-8 py-3 rounded-lg shadow-xs transition-all flex items-center gap-2"
            >
              <span class="material-symbols-outlined">send</span>
              Dispatch Workshop Directive
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useComplaint } from '../../context/ComplaintContext';
import { HEATMAP_IMAGE } from '../../data/mockData';

export default function AdminDashboardPage() {
  const { analytics } = useComplaint();

  return (
    <div class="flex flex-col gap-6">
      {/* Overview Metrics Grid */}
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* AI Classification Accuracy */}
        <div class="bg-surface border border-outline-variant rounded-xl p-5 shadow-xs flex flex-col gap-1 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1.5 h-full bg-ai-stroke"></div>
          <div class="flex justify-between items-center text-on-surface-variant">
            <span class="text-xs font-bold uppercase tracking-wider">AI Classification Accuracy</span>
            <div class="w-8 h-8 rounded-full bg-ai-accent flex items-center justify-center">
              <span class="material-symbols-outlined text-ai-stroke text-base">psychology</span>
            </div>
          </div>
          <div class="font-black text-3xl text-on-surface mt-2">{analytics.classificationAccuracy}</div>
          <div class="text-xs text-status-resolved flex items-center gap-1 font-semibold mt-1">
            <span class="material-symbols-outlined text-sm">trending_up</span> +1.2% from last week
          </div>
        </div>

        {/* Routing Accuracy */}
        <div class="bg-surface border border-outline-variant rounded-xl p-5 shadow-xs flex flex-col gap-1 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <div class="flex justify-between items-center text-on-surface-variant">
            <span class="text-xs font-bold uppercase tracking-wider">Smart Routing Accuracy</span>
            <div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-base">route</span>
            </div>
          </div>
          <div class="font-black text-3xl text-on-surface mt-2">{analytics.routingAccuracy}</div>
          <div class="text-xs text-status-resolved flex items-center gap-1 font-semibold mt-1">
            <span class="material-symbols-outlined text-sm">trending_up</span> +0.8% from last week
          </div>
        </div>

        {/* Avg Resolution Time */}
        <div class="bg-surface border border-outline-variant rounded-xl p-5 shadow-xs flex flex-col gap-1 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
          <div class="flex justify-between items-center text-on-surface-variant">
            <span class="text-xs font-bold uppercase tracking-wider">Avg Resolution Time</span>
            <div class="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-secondary text-base">timer</span>
            </div>
          </div>
          <div class="font-black text-3xl text-on-surface mt-2">{analytics.avgResolutionTime}</div>
          <div class="text-xs text-status-resolved flex items-center gap-1 font-semibold mt-1">
            <span class="material-symbols-outlined text-sm">trending_down</span> -2m from last week (Improved)
          </div>
        </div>
      </section>

      {/* Bento Grid: Heatmap + Sentiment */}
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Overview (2 cols) */}
        <div class="lg:col-span-2 bg-surface border border-outline-variant rounded-xl shadow-xs flex flex-col overflow-hidden">
          <div class="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
            <div>
              <h3 class="font-bold text-lg text-on-surface">Railway Complaint Heatmap</h3>
              <p class="text-xs text-on-surface-variant">Live geographic distribution across railway zones</p>
            </div>
            <Link to="/admin/heatmap" class="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View Full Map <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div class="relative h-[320px] w-full bg-[#EAE8E7] flex items-center justify-center overflow-hidden">
            <img src={HEATMAP_IMAGE} alt="Heatmap" class="w-full h-full object-cover mix-blend-multiply opacity-90" />
            <div class="absolute bottom-4 left-4 bg-surface/95 backdrop-blur-xs border border-outline-variant rounded-lg p-3 shadow-xs text-xs">
              <div class="font-bold mb-1">Density Legend</div>
              <div class="flex items-center gap-2 text-[11px] mb-1">
                <span class="w-2.5 h-2.5 rounded-full bg-status-emergency"></span> High Volume (&gt;500/hr)
              </div>
              <div class="flex items-center gap-2 text-[11px] mb-1">
                <span class="w-2.5 h-2.5 rounded-full bg-status-pending"></span> Moderate (100-500/hr)
              </div>
              <div class="flex items-center gap-2 text-[11px]">
                <span class="w-2.5 h-2.5 rounded-full bg-status-resolved"></span> Stable (&lt;100/hr)
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment Analysis Panel */}
        <div class="bg-surface border border-outline-variant rounded-xl shadow-xs p-5 flex flex-col">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-bold text-lg text-on-surface">Sentiment Analysis</h3>
              <p class="text-xs text-on-surface-variant">NLP evaluation of passenger reports</p>
            </div>
            <span class="material-symbols-outlined text-ai-stroke">psychology_alt</span>
          </div>

          {/* Donut Chart Simulation */}
          <div class="relative flex-1 flex items-center justify-center py-6">
            <div
              class="w-40 h-40 rounded-full relative overflow-hidden flex items-center justify-center"
              style={{ background: 'conic-gradient(#2E7D32 0% 72%, #C62828 72% 82%, #887271 82% 100%)' }}
            >
              <div class="w-28 h-28 bg-surface rounded-full flex flex-col items-center justify-center shadow-inner">
                <span class="font-black text-2xl text-status-resolved">72%</span>
                <span class="text-[11px] text-on-surface-variant font-bold">Positive</span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div class="flex flex-col gap-2 pt-3 border-t border-outline-variant text-xs">
            <div class="flex justify-between items-center">
              <span class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-sm bg-status-resolved"></span> Positive Feedback
              </span>
              <strong class="font-bold">72%</strong>
            </div>
            <div class="flex justify-between items-center">
              <span class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-sm bg-status-emergency"></span> Negative Feedback
              </span>
              <strong class="font-bold">10%</strong>
            </div>
            <div class="flex justify-between items-center">
              <span class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-sm bg-outline"></span> Neutral
              </span>
              <strong class="font-bold">18%</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Recurring Issue Detection Banner */}
      <section>
        <div class="bg-ai-accent border border-ai-stroke rounded-xl p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
          <div class="flex items-start gap-4 flex-1 z-10">
            <div class="w-12 h-12 rounded-full bg-surface flex items-center justify-center shadow-xs shrink-0 border border-ai-stroke/40">
              <span class="material-symbols-outlined text-ai-stroke text-2xl">troubleshoot</span>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-bold text-lg text-on-surface">Recurring Issue Detection</h3>
                <span class="px-2.5 py-0.5 rounded-full bg-status-emergency text-white text-[10px] font-bold">
                  Critical Trend
                </span>
              </div>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-3">
                NLP analysis has identified a <strong class="text-on-surface">Water Leakage Trend</strong> isolated to <strong class="text-on-surface">Coach S5</strong> across Northern Zone outbound trains. <strong>12 independent incidents</strong> reported in the last 30 days.
              </p>
              <div class="text-xs text-tertiary-container bg-tertiary-fixed/40 px-3 py-1.5 rounded-lg border border-tertiary-fixed-dim/50 font-medium inline-flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">build_circle</span>
                Recommended: Preventive inspection & sealant replacement for all S5 class coaches.
              </div>
            </div>
          </div>

          <div class="shrink-0 z-10 w-full md:w-auto">
            <Link
              to="/admin/recurring-issues"
              class="w-full md:w-auto bg-surface text-ai-stroke border-2 border-ai-stroke font-bold text-xs py-3 px-6 rounded-lg hover:bg-ai-stroke hover:text-white transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              Dispatch Directive <span class="material-symbols-outlined text-sm">send</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { useComplaint } from '../../context/ComplaintContext';

export default function SentimentPage() {
  const { analytics } = useComplaint();

  return (
    <div class="w-full flex flex-col gap-6">
      <div class="flex justify-between items-center border-b border-outline-variant/60 pb-4">
        <div>
          <h1 class="font-bold text-2xl text-on-surface">Passenger Sentiment Analysis</h1>
          <p class="text-xs text-on-surface-variant">Sentiment evaluation across 10,000+ passenger feedback submissions</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <div class="bg-surface rounded-xl border border-outline-variant p-5 shadow-xs flex justify-between items-center">
          <div>
            <span class="text-xs text-on-surface-variant font-bold uppercase tracking-wider block mb-1">Positive Sentiment</span>
            <div class="font-black text-3xl text-status-resolved">{analytics.sentiment.positive}%</div>
          </div>
          <div class="w-12 h-12 rounded-full bg-status-resolved/10 text-status-resolved flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">sentiment_very_satisfied</span>
          </div>
        </div>

        <div class="bg-surface rounded-xl border border-outline-variant p-5 shadow-xs flex justify-between items-center">
          <div>
            <span class="text-xs text-on-surface-variant font-bold uppercase tracking-wider block mb-1">Neutral Sentiment</span>
            <div class="font-black text-3xl text-on-surface">{analytics.sentiment.neutral}%</div>
          </div>
          <div class="w-12 h-12 rounded-full bg-surface-variant text-on-surface flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">sentiment_neutral</span>
          </div>
        </div>

        <div class="bg-surface rounded-xl border border-outline-variant p-5 shadow-xs flex justify-between items-center">
          <div>
            <span class="text-xs text-on-surface-variant font-bold uppercase tracking-wider block mb-1">Negative Sentiment</span>
            <div class="font-black text-3xl text-status-emergency">{analytics.sentiment.negative}%</div>
          </div>
          <div class="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">sentiment_very_dissatisfied</span>
          </div>
        </div>
      </div>

      {/* Feedback Insights Box */}
      <div class="bg-ai-accent/30 border border-ai-stroke rounded-xl p-6 shadow-xs flex items-start gap-4">
        <span class="material-symbols-outlined text-ai-stroke text-2xl">psychology_alt</span>
        <div class="text-xs text-on-surface leading-relaxed">
          <strong class="font-bold text-sm block mb-1">Feedback Insight Summary:</strong>
          "{analytics.sentiment.summary}"
        </div>
      </div>
    </div>
  );
}

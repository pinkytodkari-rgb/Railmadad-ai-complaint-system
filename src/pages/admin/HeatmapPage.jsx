import React, { useState } from 'react';
import { HEATMAP_IMAGE } from '../../data/mockData';

export default function HeatmapPage() {
  const [filterZone, setFilterZone] = useState('All');

  return (
    <div class="w-full flex flex-col gap-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <h1 class="font-bold text-2xl text-on-surface">Geographic Complaint Heatmap</h1>
          <p class="text-xs text-on-surface-variant">Live spatial density of grievances across Indian Railways networks</p>
        </div>

        {/* Filter controls */}
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-on-surface-variant">Filter Zone:</span>
          <select
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
            class="text-xs bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-medium outline-none"
          >
            <option value="All">All Railway Zones</option>
            <option value="Western">Western Railway (WR)</option>
            <option value="Northern">Northern Railway (NR)</option>
            <option value="Central">Central Railway (CR)</option>
            <option value="Southern">Southern Railway (SR)</option>
          </select>
        </div>
      </div>

      {/* Main Heatmap Canvas */}
      <div class="bg-surface border border-outline-variant rounded-xl shadow-xs overflow-hidden flex flex-col">
        <div class="p-4 bg-surface-container-low border-b border-outline-variant flex justify-between items-center text-xs">
          <div class="flex items-center gap-2 font-bold text-on-surface">
            <span class="material-symbols-outlined text-primary">map</span>
            Live Density Visualization • Zone: {filterZone}
          </div>
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-status-emergency"></span> Hotspots</span>
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-status-pending"></span> Medium</span>
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-status-resolved"></span> Low</span>
          </div>
        </div>

        <div class="relative h-[480px] w-full bg-[#EAE8E7] flex items-center justify-center overflow-hidden">
          <img src={HEATMAP_IMAGE} alt="Indian Railways Geographic Heatmap" class="w-full h-full object-cover mix-blend-multiply opacity-95" />

          {/* Interactive hotspot markers */}
          <div class="absolute top-1/3 left-1/3 group cursor-pointer">
            <div class="w-6 h-6 rounded-full bg-status-emergency/80 animate-ping absolute"></div>
            <div class="w-6 h-6 rounded-full bg-status-emergency text-white flex items-center justify-center text-[10px] font-bold relative z-10 shadow-md">
              S5
            </div>
            <div class="hidden group-hover:block absolute bottom-8 left-1/2 -translate-x-1/2 bg-surface p-2 rounded shadow-lg border text-[11px] whitespace-nowrap z-20">
              <strong>Surat Sector Cluster</strong><br/>INC-104 Water Leakage (4 reports)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

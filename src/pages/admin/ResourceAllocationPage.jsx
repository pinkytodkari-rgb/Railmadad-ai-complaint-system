import React, { useState } from 'react';
import { useComplaint } from '../../context/ComplaintContext';

export default function ResourceAllocationPage() {
  const { analytics } = useComplaint();
  const [rebalanced, setRebalanced] = useState(false);

  const handleRebalance = () => {
    setRebalanced(true);
    alert("Workload Balancing executed: 2 staff re-assigned from Housekeeping to Water & Sanitation.");
  };

  return (
    <div class="w-full flex flex-col gap-6">
      <div class="flex justify-between items-center border-b border-outline-variant/60 pb-4">
        <div>
          <h1 class="font-bold text-2xl text-on-surface">Departmental Resource Allocation</h1>
          <p class="text-xs text-on-surface-variant">Live workload balancing across railway response teams</p>
        </div>
        <button
          onClick={handleRebalance}
          class="bg-primary text-on-primary font-bold text-xs px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <span class="material-symbols-outlined text-base">auto_fix_high</span>
          {rebalanced ? 'Rebalanced ✓' : 'Execute Rebalancing'}
        </button>
      </div>

      {/* Recommendation Banner */}
      <div class="bg-ai-accent/40 border border-ai-stroke rounded-xl p-5 shadow-xs flex items-start gap-4 text-xs">
        <span class="material-symbols-outlined text-ai-stroke text-2xl">tips_and_updates</span>
        <div class="flex-grow">
          <strong class="font-bold text-sm text-on-surface block mb-1">Recommended Allocation:</strong>
          "Additional Water & Sanitation staff are recommended for the current leakage incident cluster in Coach S5 along the Western/Northern Corridor."
        </div>
      </div>

      {/* Table */}
      <div class="bg-surface rounded-xl border border-outline-variant shadow-xs overflow-hidden">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-surface-container-low border-b border-outline-variant text-on-surface font-bold">
              <th class="p-4">Department</th>
              <th class="p-4">Active Complaints</th>
              <th class="p-4">Available Staff</th>
              <th class="p-4">High Priority</th>
              <th class="p-4">Workload Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40 text-on-surface">
            {analytics.departmentResources.map((dept, idx) => (
              <tr key={idx} class="hover:bg-surface-container-low/50">
                <td class="p-4 font-bold text-sm">{dept.department}</td>
                <td class="p-4 font-semibold">{dept.active}</td>
                <td class="p-4 font-semibold">{rebalanced && dept.department === 'Water & Sanitation' ? dept.staffAvailable + 2 : dept.staffAvailable}</td>
                <td class="p-4 text-status-emergency font-bold">{dept.highPriority}</td>
                <td class="p-4">
                  {dept.department === 'Water & Sanitation' ? (
                    <span class="bg-status-emergency/10 text-status-emergency px-2.5 py-1 rounded font-bold">
                      {rebalanced ? 'Balanced ✓' : 'High Load (Action Needed)'}
                    </span>
                  ) : (
                    <span class="bg-status-resolved/10 text-status-resolved px-2.5 py-1 rounded font-bold">
                      Optimal
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

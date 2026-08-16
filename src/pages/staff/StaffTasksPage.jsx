import React from 'react';
import { Link } from 'react-router-dom';
import { useComplaint } from '../../context/ComplaintContext';

export default function StaffTasksPage() {
  const { complaint } = useComplaint();

  const tasks = [
    {
      id: "T204",
      incidentId: complaint.incidentId,
      train: complaint.train,
      coach: complaint.coach,
      issue: complaint.issue,
      priority: complaint.priority,
      status: complaint.staffAssignment.status,
      dwell: complaint.staffAssignment.dwellMinutes,
      station: complaint.staffAssignment.station
    },
    {
      id: "T205",
      incidentId: "INC-108",
      train: "12952 (Rajdhani Return)",
      coach: "B3",
      issue: "Electrical Socket Repair",
      priority: "Medium",
      status: "Assigned",
      dwell: 15,
      station: "Surat"
    },
    {
      id: "T206",
      incidentId: "INC-112",
      train: "19020 (Dehradun Exp)",
      coach: "S2",
      issue: "Washbasin Cleaning",
      priority: "Normal",
      status: "Assigned",
      dwell: 10,
      station: "Surat"
    }
  ];

  return (
    <div class="w-full flex flex-col gap-6">
      <div class="flex justify-between items-center border-b border-outline-variant/60 pb-4">
        <div>
          <h1 class="font-bold text-2xl text-on-surface">Assigned Field Tasks</h1>
          <p class="text-xs text-on-surface-variant">Active work queue for Surat Depot Maintenance Team</p>
        </div>
        <span class="bg-primary-container text-on-primary-container text-xs font-bold px-3 py-1 rounded-full">
          3 Pending Tasks
        </span>
      </div>

      <div class="flex flex-col gap-4">
        {tasks.map((task) => (
          <div key={task.id} class="bg-surface rounded-xl border border-outline-variant p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex flex-col gap-1 text-xs">
              <div class="flex items-center gap-2">
                <span class="font-bold text-base text-on-surface">Task #{task.id}</span>
                <span class="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded font-bold">
                  {task.incidentId}
                </span>
                <span class={`px-2 py-0.5 rounded font-bold ${
                  task.priority === 'High' ? 'bg-status-emergency/10 text-status-emergency' : 'bg-status-pending/10 text-status-pending'
                }`}>
                  {task.priority} Priority
                </span>
              </div>
              <p class="text-sm font-semibold text-on-surface">{task.issue} in {task.coach}</p>
              <p class="text-on-surface-variant">{task.train} • Station {task.station} ({task.dwell} min dwell time)</p>
            </div>

            <div class="flex items-center gap-3 w-full sm:w-auto">
              {task.id === 'T204' ? (
                <Link
                  to="/staff/incidents/INC-104"
                  class="w-full sm:w-auto bg-primary text-on-primary font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-center"
                >
                  Execute Task #{task.id}
                </Link>
              ) : (
                <button
                  onClick={() => alert(`Task #${task.id} opened for station inspection.`)}
                  class="w-full sm:w-auto border border-primary text-primary font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-primary/5 transition-colors text-center"
                >
                  Inspect Task
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

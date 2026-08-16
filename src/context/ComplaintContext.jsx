import React, { createContext, useContext, useState } from 'react';
import { INITIAL_COMPLAINT_DATA, INITIAL_ANALYTICS_DATA, REPAIRED_IMAGE } from '../data/mockData';

const ComplaintContext = createContext();

export function ComplaintProvider({ children }) {
  const [complaint, setComplaint] = useState(INITIAL_COMPLAINT_DATA);
  const [analytics, setAnalytics] = useState(INITIAL_ANALYTICS_DATA);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Incident INC-104 assigned to Surat Maintenance Depot.", time: "10:59 AM", read: false }
  ]);

  // Load Demo Complaint handler for Passenger Form
  const loadDemoComplaint = () => {
    setComplaint((prev) => ({
      ...prev,
      pnr: "4123987650",
      description: "Water is leaking near the upper panel of window seat 42 in coach S5. It is causing the seat to get completely wet and unusable. Please send maintenance staff immediately.",
      evidence: {
        ...prev.evidence,
        textSubmitted: true,
        imageSubmitted: true
      }
    }));
  };

  // Staff accepts task
  const acceptTask = () => {
    setComplaint((prev) => ({
      ...prev,
      staffAssignment: {
        ...prev.staffAssignment,
        status: "Accepted"
      },
      timeline: prev.timeline.map((step) =>
        step.title === "Action In Progress"
          ? { ...step, time: "Action Accepted by Officer Ramesh Kumar" }
          : step
      )
    }));
    setNotifications((prev) => [
      { id: Date.now(), text: "Staff Ramesh Kumar has accepted task for INC-104.", time: "Just now", read: false },
      ...prev
    ]);
  };

  // Staff submits action and resolution evidence
  const submitResolution = ({ actionTaken, notes, checklist, afterPhotoUrl }) => {
    setComplaint((prev) => ({
      ...prev,
      staffAssignment: {
        ...prev.staffAssignment,
        status: "Resolved"
      },
      resolution: {
        actionTaken,
        notes,
        checklist,
        afterPhotoUrl: afterPhotoUrl || REPAIRED_IMAGE,
        resolutionConfidence: 87,
        submitted: true,
        submittedTime: "11:18 AM"
      },
      timeline: prev.timeline.map((step) => {
        if (step.title === "Action In Progress") return { ...step, completed: true, time: "Completed at Surat" };
        if (step.title === "Resolution Verification") return { ...step, completed: true, time: "AI Verified (87% confidence)" };
        return step;
      })
    }));

    setNotifications((prev) => [
      { id: Date.now(), text: "Railway staff has reported that your complaint RM-10482 has been addressed.", time: "Just now", read: false },
      ...prev
    ]);
  };

  // Passenger gives feedback on resolution
  const submitPassengerFeedback = (status) => {
    setComplaint((prev) => ({
      ...prev,
      passengerFeedbackStatus: status, // 'RESOLVED' or 'REOPENED'
      timeline: prev.timeline.map((step) => {
        if (step.title === "Closed") {
          return {
            ...step,
            completed: status === 'RESOLVED',
            time: status === 'RESOLVED' ? 'Closed by Passenger' : 'REOPENED due to conflict'
          };
        }
        return step;
      })
    }));

    if (status === 'REOPENED') {
      setNotifications((prev) => [
        { id: Date.now(), text: "Closure Conflict Detected! Complaint RM-10482 reopened for reinspection.", time: "Just now", read: false },
        ...prev
      ]);
    } else {
      setNotifications((prev) => [
        { id: Date.now(), text: "Thank you! Complaint RM-10482 successfully resolved and closed.", time: "Just now", read: false },
        ...prev
      ]);
    }
  };

  return (
    <ComplaintContext.Provider
      value={{
        complaint,
        analytics,
        notifications,
        loadDemoComplaint,
        acceptTask,
        submitResolution,
        submitPassengerFeedback,
        setComplaint
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaint() {
  return useContext(ComplaintContext);
}

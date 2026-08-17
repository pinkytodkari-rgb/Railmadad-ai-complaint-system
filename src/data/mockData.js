export const WATER_LEAKAGE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuAwlIj5XUWbOF_b5Rsx1Ur_A_xIPfLw6FnYQHywI9a82aj_kw_Y5IAXdk7QiCARfYKXWvMXosRTxitxFRLl-iN5X9niOj4R7csmLlAgOwzZE4xe_k-3PBZUNTUblwkIhy8iWlXotjrRMqvlDUMdtvqj8QwPSEVDeyfKhnm9w_Q853v50lpNkp_h2Au-nz68aVlarWps9KsQkApgRkW5MXnLlWmJzRxAbS9qxK9hhxtNdj48Aikmlp5vsw";
export const REPAIRED_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBum6i0DWiA8GuaKqZI5214ya7BkQL2p3HDjnRFBBTeIaDiUlVgkIKCnV4kP5wBUCyQb8lF_TuJYq50ME6gZEU4V8k8SMQZwA6FUyB4pxHfIhUceNkPy5gToEzUJxATxDF3BvXgoEU9UNKpFxTc9kT3TI9RIHZQsxbOFHRcMNjxZjGF64M4U3a3PLTOO5oMbLjxmDCq4eUAApPcw0bTxHLXs6yHIDEJp2jldryeI6VsGWu8Drd08FbXTQ";
export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBFirN8TqxLVcGWJETEjMESCGK1UPOSAfhl5vqSlQ5RqSw1ewHJr5SDA4GIKVpL3sR-fpZXpEecD6xLjJ3irJlCcmoHKzmopzTH2pxXuRifyATSRFXqYhMycU3rxuGoH4w9IG1hEDpyUz_FL-MusJTDYatXxDRBzrwvM7Nmo7e7K-apzGuGaNe91EeNUWlfS_Mta6hAmKbOwv5a_ewDTZ0EunHvgNFFodQ5V2qLEHPHgcgK9ltnMO4N7A";
export const HEATMAP_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCcOvCZ19XeozCvMg-ZY503yJYKgfD0wYiT7U4Rs4WWpMzSHr_F9M7gJBCT7_6F97DLaUM5UEGPMnrdOfeuoah4V0ARg51-UFfu4I-ltvOnP1ua1CV9EzVmaS2wZuVYvCgkkH88mQ7RYy0tGp2twSeXBiEnxOwwubSI1UeT2NHYUu-qgiYf8UCZE91X2okL7BK8wTrqPqNXmZkzRQAqJwPc6ulNI0mktAW3Hl67OIEwpKWPQW1QtACnbw";

export const INITIAL_COMPLAINT_DATA = {
  complaintId: "RM-10482",
  incidentId: "INC-104",
  pnr: "4123987650",
  train: "12951 Rajdhani Express",
  coach: "S5",
  berth: "42",
  journeyRoute: "Mumbai Central (MMCT) → New Delhi (NDLS)",
  currentLocation: "Approaching Surat (Next stop in 12 mins)",
  issue: "Water Leakage",
  category: "Water & Sanitation / Coach Maintenance",
  urgency: "High",
  priority: "High",
  confidence: 91,
  claimDetected: "Water leaking near upper panel of window berth 42 in Coach S5",
  extractedEntities: [
    { label: "Train", value: "12951 Rajdhani Express", icon: "train" },
    { label: "Coach", value: "S5", icon: "directions_railway" },
    { label: "Issue", value: "Water Leakage", icon: "water_damage" },
    { label: "Berth", value: "Berth 42", icon: "airline_seat_recline_normal" },
    { label: "Location", value: "Upper Panel / Window", icon: "location_on" }
  ],
  description: "Water is leaking near the upper panel of window seat 42 in coach S5. It is causing the seat to get completely wet and unusable. Please send maintenance staff immediately.",
  evidence: {
    textSubmitted: true,
    imageSubmitted: true,
    audioSubmitted: false,
    videoSubmitted: false,
    imageUrl: WATER_LEAKAGE_IMAGE,
    imageName: "leakage_s5_seat42.jpg",
    imageSize: "2.4 MB"
  },
  consistency: {
    passengerText: "Supported",
    passengerTextDetail: '"Constant dripping from the ceiling near berth 42..."',
    imageAnalysis: "Supported",
    railwayContext: "Verified",
    contextDetail: "Coach layout confirms plumbing & drainage lines exist above berth 42.",
    overall: "SUPPORTED",
    overallConfidence: 91
  },
  relatedComplaints: [
    { id: "RM-10478", berth: "40", time: "10:45 AM", text: "Water is dripping continuously onto the lower berth from the AC vent." },
    { id: "RM-10480", berth: "44", time: "10:52 AM", text: "My luggage is getting wet. Please send someone urgently to S5." },
    { id: "RM-10481", berth: "41", time: "10:56 AM", text: "Wet floor and leakage near washbasin corridor." }
  ],
  clusterCount: 4,
  smartRouting: {
    recommendedDepartment: "Water & Sanitation / Coach Maintenance",
    priority: "High Priority",
    forwardedStatus: "Forwarded",
    forwardedTime: "10:59 AM"
  },
  timeline: [
    { title: "Complaint Registered", time: "Oct 24, 14:30 IST", completed: true },
    { title: "Analysis Completed", time: "Oct 24, 14:31 IST", completed: true },
    { title: "Evidence Validated", time: "Oct 24, 14:32 IST", completed: true },
    { title: "Incident Linked (INC-104)", time: "Oct 24, 14:35 IST", completed: true },
    { title: "Routed to Department", time: "Oct 24, 14:40 IST", completed: true },
    { title: "Staff Assigned", time: "Oct 24, 15:10 IST", completed: true },
    { title: "Action In Progress", time: "Active", completed: false, pending: true },
    { title: "Resolution Verification", time: "Pending", completed: false },
    { title: "Closed", time: "Pending", completed: false }
  ],
  staffAssignment: {
    officerName: "Ramesh Kumar",
    role: "Coach Maintenance Officer",
    staffId: "STAFF001",
    station: "Surat",
    dwellMinutes: 12,
    estimatedInterventionMinutes: 8,
    feasibility: "FEASIBLE BEFORE DEPARTURE",
    status: "Assigned" // Assigned -> Accepted -> In Progress -> Resolved
  },
  resolution: {
    actionTaken: "",
    notes: "",
    checklist: [],
    afterPhotoUrl: null,
    resolutionConfidence: 87,
    submitted: false
  },
  passengerFeedbackStatus: null // null | 'RESOLVED' | 'REOPENED'
};

export const INITIAL_ANALYTICS_DATA = {
  classificationAccuracy: "94.2%",
  routingAccuracy: "92.8%",
  avgResolutionTime: "18m",
  totalTickets: 14820,
  departmentResources: [
    { department: "Water & Sanitation", active: 8, staffAvailable: 4, highPriority: 3 },
    { department: "Electrical", active: 5, staffAvailable: 2, highPriority: 1 },
    { department: "Housekeeping", active: 11, staffAvailable: 7, highPriority: 2 },
    { department: "Medical Assistance", active: 3, staffAvailable: 2, highPriority: 1 }
  ],
  sentiment: {
    positive: 72,
    negative: 10,
    neutral: 18,
    summary: "Negative feedback is concentrated around delayed resolution and recurring coach-maintenance complaints."
  },
  recurringIssue: {
    issue: "Water Leakage Trend",
    coachClass: "Coach S5",
    trainZone: "Northern Zone Outbound Trains",
    incidentCount: 12,
    timeframe: "Last 30 days",
    trend: "Increasing",
    recommendation: "Schedule preventive inspection & sealant replacement for all S5 class coaches.",
    aiConfidence: 96
  }
};

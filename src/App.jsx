import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ComplaintProvider } from './context/ComplaintContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import StaffLayout from './layouts/StaffLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';

// Passenger Pages
import TrainComplaintPage from './pages/passenger/TrainComplaintPage';
import AiAnalysisPage from './pages/passenger/AiAnalysisPage';
import TrackComplaintPage from './pages/passenger/TrackComplaintPage';
import ClosureConflictPage from './pages/passenger/ClosureConflictPage';

// Staff Pages
import StaffDashboardPage from './pages/staff/StaffDashboardPage';
import IncidentDetailPage from './pages/staff/IncidentDetailPage';
import StaffTasksPage from './pages/staff/StaffTasksPage';
import StaffTrainingPage from './pages/staff/StaffTrainingPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import RecurringIssuesPage from './pages/admin/RecurringIssuesPage';
import ResourceAllocationPage from './pages/admin/ResourceAllocationPage';
import HeatmapPage from './pages/admin/HeatmapPage';
import SentimentPage from './pages/admin/SentimentPage';

// Protected Route Guard
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <ComplaintProvider>
        <Router>
          <Routes>
            {/* Public Layout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<LoginPage />} />
              <Route path="login" element={<LoginPage />} />

              {/* Passenger Protected Routes */}
              <Route
                path="passenger/train-complaint"
                element={
                  <ProtectedRoute allowedRoles={['PASSENGER', 'STAFF', 'ADMIN']}>
                    <TrainComplaintPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="passenger/ai-analysis"
                element={
                  <ProtectedRoute allowedRoles={['PASSENGER', 'STAFF', 'ADMIN']}>
                    <AiAnalysisPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="passenger/track"
                element={
                  <ProtectedRoute allowedRoles={['PASSENGER', 'STAFF', 'ADMIN']}>
                    <TrackComplaintPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="passenger/closure-conflict"
                element={
                  <ProtectedRoute allowedRoles={['PASSENGER', 'STAFF', 'ADMIN']}>
                    <ClosureConflictPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Staff Protected Portal */}
            <Route
              path="/staff"
              element={
                <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                  <StaffLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<StaffDashboardPage />} />
              <Route path="incidents/INC-104" element={<IncidentDetailPage />} />
              <Route path="tasks" element={<StaffTasksPage />} />
              <Route path="training" element={<StaffTrainingPage />} />
            </Route>

            {/* Admin Protected Portal */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="recurring-issues" element={<RecurringIssuesPage />} />
              <Route path="resources" element={<ResourceAllocationPage />} />
              <Route path="heatmap" element={<HeatmapPage />} />
              <Route path="sentiment" element={<SentimentPage />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ComplaintProvider>
    </AuthProvider>
  );
}

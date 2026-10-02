import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DemoSwitcher } from "./components/dashboard/DemoSwitcher";
import { LoginModal } from "./components/auth/LoginModal";
import { LandingPage } from "./components/public/LandingPage";
import { PrincipalDashboard } from "./components/dashboard/kepala-sekolah/PrincipalDashboard";
import { TeacherDashboard } from "./components/dashboard/guru/TeacherDashboard";
import { ParentDashboard } from "./components/dashboard/orang-tua/ParentDashboard";

function AppContent() {
  const { activeView } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1-Click Multi-Role Demo Switcher */}
      <DemoSwitcher />

      {/* Main View Router */}
      <div className="flex-1 flex flex-col">
        {activeView === "LANDING" && <LandingPage />}
        {activeView === "DASHBOARD_KEPALA_SEKOLAH" && <PrincipalDashboard />}
        {activeView === "DASHBOARD_GURU" && <TeacherDashboard />}
        {activeView === "DASHBOARD_ORANG_TUA" && <ParentDashboard />}
      </div>

      {/* Global Role-Based Login Modal */}
      <LoginModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

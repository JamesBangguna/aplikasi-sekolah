import React from "react";
import { useAuth, AppView } from "../../context/AuthContext";
import { UserRole } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import {
  Globe,
  ShieldCheck,
  GraduationCap,
  Users,
  Sun,
  Moon,
  LogOut,
  Sparkles,
} from "lucide-react";

export function DemoSwitcher() {
  const { activeView, setActiveView, user, loginDemo, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-slate-900 text-white text-xs px-3 py-1.5 border-b border-slate-800 shadow-sm relative z-50 flex flex-wrap items-center justify-between gap-2">
      {/* Left: Indicator */}
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-semibold text-amber-400 hidden sm:inline">
          SIADIK Multi-Role Sandbox:
        </span>
        <span className="text-slate-300">
          {activeView === "LANDING"
            ? "Landing Page Publik"
            : `Dashboard ${user?.role ? user.role.replace("_", " ") : ""}`}
        </span>
      </div>

      {/* Middle: 1-Click Role Switcher */}
      <div className="flex items-center gap-1 overflow-x-auto py-0.5">
        <button
          onClick={() => setActiveView("LANDING")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
            activeView === "LANDING"
              ? "bg-blue-600 text-white font-bold shadow-xs"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Landing Page</span>
        </button>

        <button
          onClick={() => loginDemo("KEPALA_SEKOLAH")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
            activeView === "DASHBOARD_KEPALA_SEKOLAH"
              ? "bg-blue-600 text-white font-bold shadow-xs"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
          <span>Kepala Sekolah</span>
        </button>

        <button
          onClick={() => loginDemo("GURU")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
            activeView === "DASHBOARD_GURU"
              ? "bg-emerald-600 text-white font-bold shadow-xs"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
          <span>Guru</span>
        </button>

        <button
          onClick={() => loginDemo("ORANG_TUA")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
            activeView === "DASHBOARD_ORANG_TUA"
              ? "bg-amber-600 text-white font-bold shadow-xs"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          <Users className="w-3.5 h-3.5 text-amber-300" />
          <span>Orang Tua</span>
        </button>
      </div>

      {/* Right: Quick Settings */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          title="Toggle Light / Dark Mode"
          className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5" />
          )}
        </button>

        {user && (
          <button
            onClick={logout}
            title="Keluar / Logout"
            className="flex items-center gap-1 text-slate-400 hover:text-red-400 text-[11px] px-1.5 py-0.5 rounded hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden md:inline">Keluar</span>
          </button>
        )}
      </div>
    </div>
  );
}

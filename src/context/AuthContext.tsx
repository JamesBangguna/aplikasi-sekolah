import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "../types";
import { DEMO_USERS } from "../data/mockData";

export type AppView =
  | "LANDING"
  | "LOGIN"
  | "DASHBOARD_KEPALA_SEKOLAH"
  | "DASHBOARD_GURU"
  | "DASHBOARD_ORANG_TUA";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  login: (role: UserRole, email?: string, password?: string) => boolean;
  loginDemo: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  targetRoleForLogin: UserRole | null;
  setTargetRoleForLogin: (role: UserRole | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("garuda_auth_user");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const [activeView, setActiveViewState] = useState<AppView>(() => {
    // Check initial hash or fallback
    const hash = window.location.hash.replace("#", "");
    if (hash === "kepala-sekolah") return "DASHBOARD_KEPALA_SEKOLAH";
    if (hash === "guru") return "DASHBOARD_GURU";
    if (hash === "orang-tua") return "DASHBOARD_ORANG_TUA";
    if (hash === "login") return "LOGIN";
    return "LANDING";
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [targetRoleForLogin, setTargetRoleForLogin] = useState<UserRole | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("garuda_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("garuda_auth_user");
    }
  }, [user]);

  const setActiveView = (view: AppView) => {
    setActiveViewState(view);
    if (view === "DASHBOARD_KEPALA_SEKOLAH") window.location.hash = "kepala-sekolah";
    else if (view === "DASHBOARD_GURU") window.location.hash = "guru";
    else if (view === "DASHBOARD_ORANG_TUA") window.location.hash = "orang-tua";
    else if (view === "LOGIN") window.location.hash = "login";
    else window.location.hash = "";
  };

  const loginDemo = (role: UserRole) => {
    const demoUser = DEMO_USERS[role];
    if (demoUser) {
      setUser(demoUser);
      setIsLoginModalOpen(false);
      if (role === "KEPALA_SEKOLAH") setActiveView("DASHBOARD_KEPALA_SEKOLAH");
      else if (role === "GURU") setActiveView("DASHBOARD_GURU");
      else if (role === "ORANG_TUA") setActiveView("DASHBOARD_ORANG_TUA");
    }
  };

  const login = (role: UserRole, email?: string, _password?: string): boolean => {
    // If credentials provided, simulate successful validation
    const base = DEMO_USERS[role];
    const newUser: User = {
      ...base,
      email: email && email.includes("@") ? email : base.email,
    };
    setUser(newUser);
    setIsLoginModalOpen(false);

    if (role === "KEPALA_SEKOLAH") setActiveView("DASHBOARD_KEPALA_SEKOLAH");
    else if (role === "GURU") setActiveView("DASHBOARD_GURU");
    else if (role === "ORANG_TUA") setActiveView("DASHBOARD_ORANG_TUA");
    return true;
  };

  const logout = () => {
    setUser(null);
    setActiveView("LANDING");
  };

  const switchRole = (role: UserRole) => {
    loginDemo(role);
  };

  const requestPasswordReset = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      message: `Tautan instruksi reset kata sandi telah berhasil dikirim ke alamat email: ${email}. Silakan periksa kotak masuk atau folder spam Anda.`,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        activeView,
        setActiveView,
        login,
        loginDemo,
        logout,
        switchRole,
        requestPasswordReset,
        isLoginModalOpen,
        setIsLoginModalOpen,
        targetRoleForLogin,
        setTargetRoleForLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

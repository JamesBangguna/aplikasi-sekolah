import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { SCHOOL_INFO } from "../../data/mockData";
import { Button } from "../ui/button";
import {
  GraduationCap,
  Moon,
  Sun,
  Menu,
  X,
  LogIn,
  ChevronDown,
  ShieldCheck,
  Users,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UserRole } from "../../types";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, setIsLoginModalOpen, setTargetRoleForLogin, setActiveView, logout } =
    useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openLoginFor = (role: UserRole) => {
    setPortalDropdownOpen(false);
    setMobileMenuOpen(false);
    setTargetRoleForLogin(role);
    setIsLoginModalOpen(true);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-sm border-b border-slate-200/70 dark:border-slate-800/80 py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => {
              setActiveView("LANDING");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-800 to-amber-500 p-0.5 shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="block font-bold text-base sm:text-lg leading-tight tracking-tight text-slate-900 dark:text-white">
                SMA Garuda Nusantara
              </span>
              <span className="block text-[11px] font-medium text-amber-600 dark:text-amber-400">
                Unggul & Berkarakter Global
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => scrollToSection("beranda")}
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection("tentang")}
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Tentang
            </button>
            <button
              onClick={() => scrollToSection("program")}
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Program
            </button>
            <button
              onClick={() => scrollToSection("testimoni")}
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Testimoni
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Kontak
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* If logged in, show Dashboard shortcut */}
            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="gold"
                  onClick={() => {
                    if (user.role === "KEPALA_SEKOLAH")
                      setActiveView("DASHBOARD_KEPALA_SEKOLAH");
                    else if (user.role === "GURU")
                      setActiveView("DASHBOARD_GURU");
                    else setActiveView("DASHBOARD_ORANG_TUA");
                  }}
                  className="font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Buka Dashboard
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={logout}
                  className="hidden sm:inline-flex"
                >
                  Keluar
                </Button>
              </div>
            ) : (
              /* Portal Login Dropdown */
              <div className="relative">
                <Button
                  size="sm"
                  onClick={() => setPortalDropdownOpen((prev) => !prev)}
                  className="bg-gradient-to-r from-blue-700 to-blue-900 text-white hover:from-blue-800 hover:to-blue-950 shadow-md shadow-blue-900/20 font-medium"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  Masuk Portal
                  <ChevronDown className="w-3.5 h-3.5 ml-1" />
                </Button>

                <AnimatePresence>
                  {portalDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50"
                    >
                      <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Pilih Portal Akses:
                      </div>

                      <button
                        onClick={() => openLoginFor("KEPALA_SEKOLAH")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-800 dark:text-slate-100 group"
                      >
                        <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-900 dark:text-white">
                            Kepala Sekolah
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Supervisi & Administrasi
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => openLoginFor("GURU")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-800 dark:text-slate-100 group"
                      >
                        <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-900 dark:text-white">
                            Guru & Pendidik
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Kelas, Nilai & Modul Ajar
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => openLoginFor("ORANG_TUA")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-800 dark:text-slate-100 group"
                      >
                        <div className="p-1.5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-900 dark:text-white">
                            Orang Tua Siswa
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Absensi & Rapor Digital
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Open mobile menu"
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3"
          >
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <button
                onClick={() => scrollToSection("beranda")}
                className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection("tentang")}
                className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                Tentang Sekolah & Sejarah
              </button>
              <button
                onClick={() => scrollToSection("program")}
                className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                Program Unggulan
              </button>
              <button
                onClick={() => scrollToSection("testimoni")}
                className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                Testimoni
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                Tanya Jawab (FAQ)
              </button>
              <button
                onClick={() => scrollToSection("kontak")}
                className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                Hubungi Kami
              </button>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
                Pilih Login Portal:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openLoginFor("KEPALA_SEKOLAH")}
                  className="text-xs"
                >
                  Kepsek
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openLoginFor("GURU")}
                  className="text-xs"
                >
                  Guru
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openLoginFor("ORANG_TUA")}
                  className="text-xs"
                >
                  Orang Tua
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function useAuthTheme() {
  return useTheme();
}

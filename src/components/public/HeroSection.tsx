import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { SCHOOL_INFO } from "../../data/mockData";
import {
  ArrowRight,
  MessageCircle,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function HeroSection() {
  const { setIsLoginModalOpen, setTargetRoleForLogin } = useAuth();

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Halo Panitia PPDB ${SCHOOL_INFO.name}, saya ingin menanyakan informasi pendaftaran siswa baru dan program unggulan tahun ajaran ini. Terima kasih!`
    );
    window.open(`https://wa.me/${SCHOOL_INFO.whatsapp}?text=${text}`, "_blank");
  };

  const handlePpdbClick = () => {
    const contactEl = document.getElementById("kontak");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="beranda"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Dynamic Animated Gradient Blobs in Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-600/15 via-blue-400/10 to-amber-500/15 blur-3xl rounded-full opacity-70 animate-pulse" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-700/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        {/* Subtle grid line pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Staggered Hero Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 text-blue-800 dark:text-blue-300 text-xs font-semibold shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{SCHOOL_INFO.accreditation}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-slate-500 dark:text-slate-400 font-normal">PPDB 2026/2027 Dibuka</span>
            </motion.div>

            {/* Main Headline with staggered text animation */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Membentuk Pemimpin{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-amber-500 bg-clip-text text-transparent">
                Masa Depan
              </span>{" "}
              Berkarakter & Berdaya Saing Global
            </h1>

            {/* Sub-headline / Value proposition */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Selamat datang di <strong>{SCHOOL_INFO.name}</strong>. Memadukan
              keunggulan riset sains teknologi, kurikulum merdeka terintegrasi,
              literasi bahasa internasional, serta ekosistem monitoring siswa
              real-time untuk orang tua dan guru.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                size="lg"
                onClick={handlePpdbClick}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-lg shadow-blue-700/25 text-sm sm:text-base font-semibold group cursor-pointer"
              >
                Daftar Sekarang (PPDB Online)
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto border-emerald-600/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-sm sm:text-base font-semibold cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                Hubungi Kami via WhatsApp
              </Button>
            </div>

            {/* Key Value Points */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-200/80 dark:border-slate-800 max-w-xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  99.4%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Lolos PTN & Univ Global
                </div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  128+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Medali Olimpiade & Sains
                </div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  1:12
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Rasio Guru & Siswa Ideal
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Card with Parallax feel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Back Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600 to-amber-500 opacity-20 blur-xl" />

            <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-6">
              {/* Card Header Profile */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-800 to-amber-500 flex items-center justify-center text-white shadow-md">
                    <GraduationCap className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Ekosistem Digital SIADIK
                    </h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Sistem Aktif Real-time
                    </p>
                  </div>
                </div>
                <Badge variant="gold">Akreditasi A</Badge>
              </div>

              {/* Interactive Mock Dashboard Preview Cards */}
              <div className="space-y-3">
                {/* Item 1: Student Attendance Alert */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                      HADIR
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">
                        Presensi Digital Gerbang Siswa
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Check-in 06.45 WIB • Langsung Notif ke WA Orang Tua
                      </div>
                    </div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </div>

                {/* Item 2: Grade Insight */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
                      92.4
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">
                        Rata-rata Nilai Akademik
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Fisika & Matematika Tingkat Lanjut
                      </div>
                    </div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                </div>

                {/* Item 3: Direct Role Portals */}
                <div className="pt-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Akses Langsung 3 Peran:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setTargetRoleForLogin("KEPALA_SEKOLAH");
                        setIsLoginModalOpen(true);
                      }}
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-center transition-all bg-white dark:bg-slate-900 cursor-pointer"
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Kepsek
                      </div>
                      <div className="text-[10px] text-slate-400">Supervisi</div>
                    </button>

                    <button
                      onClick={() => {
                        setTargetRoleForLogin("GURU");
                        setIsLoginModalOpen(true);
                      }}
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-center transition-all bg-white dark:bg-slate-900 cursor-pointer"
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Guru
                      </div>
                      <div className="text-[10px] text-slate-400">Kelas & RPP</div>
                    </button>

                    <button
                      onClick={() => {
                        setTargetRoleForLogin("ORANG_TUA");
                        setIsLoginModalOpen(true);
                      }}
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 text-center transition-all bg-white dark:bg-slate-900 cursor-pointer"
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Orang Tua
                      </div>
                      <div className="text-[10px] text-slate-400">Pantau Anak</div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-4 rounded-xl text-white flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-amber-400">
                    Akun Demo Siap Uji
                  </div>
                  <div className="text-xs text-slate-200">
                    Uji coba portal tanpa perlu registrasi ulang
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="gold"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-xs"
                >
                  Coba Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

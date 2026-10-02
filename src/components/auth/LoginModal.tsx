import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Users,
  KeyRound,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export function LoginModal() {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    targetRoleForLogin,
    login,
    loginDemo,
    requestPasswordReset,
  } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>(
    targetRoleForLogin || "KEPALA_SEKOLAH"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetStatus, setResetStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync when targetRoleForLogin opens
  React.useEffect(() => {
    if (targetRoleForLogin) {
      setSelectedRole(targetRoleForLogin);
    }
  }, [targetRoleForLogin]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole, email || undefined, password || undefined);
      setIsLoading(false);
    }, 400);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setIsLoading(true);
    const res = await requestPasswordReset(forgotEmail);
    setIsLoading(false);
    setResetStatus(res.message);
  };

  const roleConfigs = [
    {
      role: "KEPALA_SEKOLAH" as UserRole,
      title: "Kepala Sekolah",
      desc: "Manajemen data sekolah, supervisi guru, laporan akademik & statistik",
      icon: ShieldCheck,
      color: "border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300",
      accent: "blue",
    },
    {
      role: "GURU" as UserRole,
      title: "Guru / Pendidik",
      desc: "Jadwal mengajar, presensi digital, tugas, nilai & modul ajar (RPP)",
      icon: GraduationCap,
      color: "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300",
      accent: "emerald",
    },
    {
      role: "ORANG_TUA" as UserRole,
      title: "Orang Tua Siswa",
      desc: "Pantau absensi real-time, nilai & rapor digital anak, chat wali kelas",
      icon: Users,
      color: "border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300",
      accent: "amber",
    },
  ];

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onClose={() => {
        setIsLoginModalOpen(false);
        setIsForgotPassword(false);
        setResetStatus(null);
      }}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Modal Header Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5" />
            Portal Terpadu SIADIK Garuda
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isForgotPassword ? "Pemulihan Kata Sandi" : "Masuk ke Sistem Akademik"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isForgotPassword
              ? "Masukkan email terdaftar untuk menerima instruksi reset kata sandi"
              : "Pilih peran akses Anda dan masuk dengan kredensial resmi sekolah"}
          </p>
        </div>

        {!isForgotPassword ? (
          <>
            {/* Role Selection Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pilih Peran Akun:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {roleConfigs.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedRole === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setSelectedRole(item.role)}
                      className={`relative flex flex-col items-center sm:items-start text-center sm:text-left p-3 rounded-xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 text-blue-600 dark:text-blue-400">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      )}
                      <div
                        className={`p-2 rounded-lg mb-2 ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="font-semibold text-xs text-slate-900 dark:text-white">
                        {item.title}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick 1-Click Demo Login Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/40 dark:border-amber-700/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
                  <UserCheck className="w-4 h-4" />
                  Mode Coba Instan (1-Klik)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Masuk sebagai <strong>{selectedRole.replace("_", " ")}</strong> tanpa perlu ketik sandi.
                </p>
              </div>
              <Button
                type="button"
                variant="gold"
                size="sm"
                onClick={() => loginDemo(selectedRole)}
                className="w-full sm:w-auto font-semibold shrink-0"
              >
                Masuk Cepat Sebagai Demo
              </Button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-xs text-slate-400 uppercase tracking-wider">
                atau masuk manual
              </span>
            </div>

            {/* Manual Credential Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Terdaftar / NIP / NISN
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder={
                      selectedRole === "KEPALA_SEKOLAH"
                        ? "kepsek@smagarudanusantara.sch.id"
                        : selectedRole === "GURU"
                        ? "bambang.sudiro@smagarudanusantara.sch.id"
                        : "nur.hasanah@gmail.com"
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline"
                  >
                    Lupa Sandi?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 flex items-center justify-center gap-2"
              >
                {isLoading ? "Memproses Autentikasi..." : "Masuk ke Dashboard"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </>
        ) : (
          /* Forgot Password View */
          <form onSubmit={handleResetSubmit} className="space-y-4">
            {resetStatus ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm space-y-2">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Email Terkirim
                </div>
                <p>{resetStatus}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setResetStatus(null);
                  }}
                  className="mt-3"
                >
                  Kembali ke Halaman Masuk
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Akun Sekolah
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Kami akan mengirimkan instruksi pemulihan ke email ini.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsForgotPassword(false)}
                    className="w-1/2"
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isLoading} className="w-1/2">
                    {isLoading ? "Mengirim..." : "Kirim Tautan Reset"}
                  </Button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </Modal>
  );
}

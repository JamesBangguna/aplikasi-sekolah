import React, { useState } from "react";
import { DashboardLayout } from "../DashboardLayout";
import { NotificationsModal } from "../NotificationsModal";
import {
  StudentChildProfile,
  StudentGradeItem,
  FeeBill,
  SchoolNotification,
} from "../../../types";
import {
  MOCK_CHILD_PROFILE,
  MOCK_CHILD_GRADES,
  MOCK_FEE_BILLS,
  INITIAL_NOTIFICATIONS,
  SCHOOL_INFO,
} from "../../../data/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Modal } from "../../ui/modal";
import {
  LayoutDashboard,
  Calendar,
  Award,
  CreditCard,
  MessageCircle,
  FileCheck2,
  Clock,
  Send,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  User,
  Phone,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // State data
  const [child, setChild] = useState<StudentChildProfile>(MOCK_CHILD_PROFILE);
  const [grades, setGrades] = useState<StudentGradeItem[]>(MOCK_CHILD_GRADES);
  const [bills, setBills] = useState<FeeBill[]>(MOCK_FEE_BILLS);
  const [notifications, setNotifications] = useState<SchoolNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isIzinModalOpen, setIsIzinModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedBillForPay, setSelectedBillForPay] = useState<FeeBill | null>(null);
  const [isRaporPrintOpen, setIsRaporPrintOpen] = useState(false);

  // Izin Form State
  const [izinForm, setIzinForm] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "Sakit" as "Sakit" | "Izin Keperluan Keluarga" | "Dispensasi Lomba",
    reason: "",
  });
  const [izinSubmitted, setIzinSubmitted] = useState(false);

  const unreadNotifs = notifications.filter(
    (n) => !n.read && (n.roleTarget === "ORANG_TUA" || !n.roleTarget)
  ).length;

  const navItems = [
    { id: "overview", label: "Dashboard Siswa", icon: LayoutDashboard },
    { id: "kehadiran", label: "Presensi & Izin Online", icon: Calendar },
    { id: "rapor", label: "Rapor & Nilai Belajar", icon: Award },
    { id: "jadwal", label: "Jadwal Belajar", icon: Clock },
    { id: "keuangan", label: "SPP & Pembayaran", icon: CreditCard, badge: bills.filter(b => b.status === "Belum Lunas").length },
    { id: "konsultasi", label: "Kontak Guru & BK", icon: MessageCircle },
  ];

  const handlePayBill = () => {
    if (!selectedBillForPay) return;
    setBills(
      bills.map((b) =>
        b.id === selectedBillForPay.id
          ? { ...b, status: "Lunas", paidDate: "12 Sep 2026 (QRIS / VA)" }
          : b
      )
    );
    setIsPayModalOpen(false);
  };

  const handleSendIzin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!izinForm.reason) return;
    setIzinSubmitted(true);
    setTimeout(() => {
      setIsIzinModalOpen(false);
      setIzinSubmitted(false);
      setIzinForm({
        date: new Date().toISOString().split("T")[0],
        type: "Sakit",
        reason: "",
      });
      alert(
        "Permohonan izin berhasil diajukan ke Wali Kelas & Tata Usaha. Status sedang diverifikasi."
      );
    }, 1200);
  };

  // Jadwal Mingguan Anak
  const weeklySchedule = [
    {
      day: "Senin",
      lessons: [
        { time: "07.00 - 08.30", subject: "Upacara & Literasi", teacher: "Tim Kesiswaan" },
        { time: "08.30 - 10.00", subject: "Fisika Lanjutan", teacher: "Bambang Sudiro, M.Pd." },
        { time: "10.15 - 11.45", subject: "Matematika Tingkat Lanjut", teacher: "Ratna Sari, M.Sc." },
        { time: "12.30 - 14.00", subject: "Bahasa Inggris Cambridge", teacher: "John Henderson, B.Ed." },
      ],
    },
    {
      day: "Selasa",
      lessons: [
        { time: "07.00 - 08.30", subject: "Kimia Organik", teacher: "Dr. Hendro Prasetyo" },
        { time: "08.30 - 10.00", subject: "Biologi Molekuler", teacher: "Siti Nurhaliza, S.Pd." },
        { time: "10.15 - 11.45", subject: "Informatika & Coding AI", teacher: "Rian Pratama, M.Kom." },
        { time: "12.30 - 14.00", subject: "Pendidikan Pancasila", teacher: "Agus Santoso, S.Pd." },
      ],
    },
    {
      day: "Rabu",
      lessons: [
        { time: "07.00 - 08.30", subject: "Bahasa Indonesia Ilmiah", teacher: "Dra. Sri Wahyuni" },
        { time: "08.30 - 10.00", subject: "Matematika Tingkat Lanjut", teacher: "Ratna Sari, M.Sc." },
        { time: "10.15 - 12.00", subject: "Praktikum Laboratorium Terpadu", teacher: "Tim Laboran" },
      ],
    },
    {
      day: "Kamis",
      lessons: [
        { time: "07.00 - 08.30", subject: "Fisika Modern", teacher: "Bambang Sudiro, M.Pd." },
        { time: "08.30 - 10.00", subject: "Pendidikan Agama & Budi Pekerti", teacher: "Ust. Fahrurrazi, M.Ag." },
        { time: "10.15 - 11.45", subject: "Ekonomi & Riset Bisnis", teacher: "Maya Lestari, SE." },
      ],
    },
    {
      day: "Jumat",
      lessons: [
        { time: "07.00 - 08.00", subject: "Senam Pagi & Kebersihan Lingkungan", teacher: "Pembina OSIS" },
        { time: "08.00 - 09.30", subject: "Pendidikan Jasmani & Kebugaran", teacher: "Yusuf Hakim, S.Pd." },
        { time: "09.45 - 11.00", subject: "Bimbingan Konseling & Karir", teacher: "Dewi Lestari, S.Psi." },
      ],
    },
  ];

  return (
    <DashboardLayout
      title="Portal Orang Tua Siswa"
      subtitle={`Selamat datang, Ibu Dewi Sartika. Memantau progres studi & kehadiran ${child.name}.`}
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      unreadNotificationsCount={unreadNotifs}
      onOpenNotifications={() => setIsNotifModalOpen(true)}
    >
      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
        notifications={notifications}
        currentRole="ORANG_TUA"
        onMarkAllAsRead={() =>
          setNotifications(notifications.map((n) => ({ ...n, read: true })))
        }
        onMarkSingleAsRead={(id) =>
          setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
          )
        }
      />

      {/* 1. OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Child Identity Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img
                src={child.avatar}
                alt={child.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="font-mono text-xs bg-white/20 px-2 py-0.5 rounded-full text-amber-300">
                    NISN: {child.nisn}
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/30">
                    {child.attendanceToday}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight">{child.name}</h2>
                <p className="text-xs text-slate-300">
                  Kelas: <strong>{child.className}</strong> • Wali Kelas:{" "}
                  <strong>{child.homeroomTeacher}</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xs text-center border border-white/10">
                <div className="text-xs text-slate-300">Prestasi Kelas</div>
                <div className="text-lg font-black text-amber-400 mt-0.5">
                  {child.classRank}
                </div>
              </div>

              <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xs text-center border border-white/10">
                <div className="text-xs text-slate-300">Rata-rata Nilai</div>
                <div className="text-lg font-black text-white mt-0.5">
                  {child.gpa} / 100
                </div>
              </div>

              <Button
                variant="gold"
                size="sm"
                onClick={() => setIsIzinModalOpen(true)}
                className="font-bold"
              >
                Ajukan Surat Izin
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Tingkat Kehadiran</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    98.5%
                  </h3>
                  <p className="text-xs text-emerald-600 mt-1 font-medium">
                    Hadir 64 dari 65 hari efektif
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Status Pembayaran SPP</p>
                  <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    Lunas (September)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Jatuh tempo berikut: 10 Okt 2026</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  <CreditCard className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Tugas Terkumpul</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    100%
                  </h3>
                  <p className="text-xs text-blue-600 mt-1">Tidak ada tunggakan tugas</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  <BookOpen className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Ekstrakurikuler</p>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    KIR & Robotika
                  </h3>
                  <p className="text-xs text-amber-600 mt-1">Juara 1 OSN Fisika 2026</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                  <Award className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Grades Comparison Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base sm:text-lg">
                  Perbandingan Nilai Siswa vs Rata-rata Kelas
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Hasil evaluasi sumatif tengah semester tahun ajaran 2026/2027
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("rapor")}
                className="text-xs"
              >
                Lihat Rapor Lengkap
              </Button>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={grades}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                  <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[60, 100]} stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#2563eb" name="Nilai Ananda" radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="classAverage"
                    fill="#cbd5e1"
                    name="Rata-rata Kelas"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 2. KEHADIRAN & IZIN TAB */}
      {activeTab === "kehadiran" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Rekapitulasi Presensi & Pengajuan Izin</CardTitle>
                <p className="text-xs text-slate-500">
                  Data kehadiran tersinkronisasi otomatis dengan mesin RFID gerbang sekolah.
                </p>
              </div>
              <Button
                size="sm"
                variant="gold"
                onClick={() => setIsIzinModalOpen(true)}
                className="text-xs"
              >
                Ajukan Surat Izin / Sakit
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Presensi Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    64 Hari
                  </div>
                  <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 mt-1">
                    Hadir Tepat Waktu
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                    1 Hari
                  </div>
                  <div className="text-xs font-semibold text-amber-900 dark:text-amber-200 mt-1">
                    Sakit (Ada Surat Dokter)
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                    0 Hari
                  </div>
                  <div className="text-xs font-semibold text-blue-900 dark:text-blue-200 mt-1">
                    Izin Keperluan
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                  <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
                    0 Hari
                  </div>
                  <div className="text-xs font-semibold text-rose-900 dark:text-rose-200 mt-1">
                    Tanpa Keterangan (Alpa)
                  </div>
                </div>
              </div>

              {/* Attendance Log Table */}
              <div>
                <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 mb-2">
                  Riwayat 5 Hari Terakhir:
                </h4>
                <div className="border rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <tr>
                        <th className="p-3">Hari & Tanggal</th>
                        <th className="p-3">Jam Masuk (RFID)</th>
                        <th className="p-3">Jam Pulang</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      <tr>
                        <td className="p-3 font-medium">Senin, 12 Sep 2026</td>
                        <td className="p-3 font-mono text-emerald-600">06.45 WIB</td>
                        <td className="p-3 text-slate-400">- (Sedang KBM)</td>
                        <td className="p-3">
                          <Badge variant="success">Hadir</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Jumat, 9 Sep 2026</td>
                        <td className="p-3 font-mono text-emerald-600">06.40 WIB</td>
                        <td className="p-3 font-mono">11.35 WIB</td>
                        <td className="p-3">
                          <Badge variant="success">Hadir</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Kamis, 8 Sep 2026</td>
                        <td className="p-3 font-mono text-emerald-600">06.48 WIB</td>
                        <td className="p-3 font-mono">15.15 WIB</td>
                        <td className="p-3">
                          <Badge variant="success">Hadir</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Rabu, 7 Sep 2026</td>
                        <td className="p-3 text-slate-400">-</td>
                        <td className="p-3 text-slate-400">-</td>
                        <td className="p-3">
                          <Badge variant="warning">Sakit (Terverifikasi)</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Selasa, 6 Sep 2026</td>
                        <td className="p-3 font-mono text-emerald-600">06.42 WIB</td>
                        <td className="p-3 font-mono">15.20 WIB</td>
                        <td className="p-3">
                          <Badge variant="success">Hadir</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 3. RAPOR & NILAI TAB */}
      {activeTab === "rapor" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Rapor Akademik Siswa</CardTitle>
                <p className="text-xs text-slate-500">
                  Semester Ganjil 2026/2027 • Kurikulum Merdeka (Fase F)
                </p>
              </div>
              <Button
                size="sm"
                variant="gold"
                onClick={() => setIsRaporPrintOpen(true)}
                className="text-xs"
              >
                <Printer className="w-3.5 h-3.5 mr-1" /> Cetak / Unduh Rapor PDF
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Mata Pelajaran</th>
                      <th className="p-3">Nilai Akhir</th>
                      <th className="p-3">Predikat</th>
                      <th className="p-3">Rata-rata Kelas</th>
                      <th className="p-3">Capaian Kompetensi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {grades.map((g, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                        <td className="p-3 font-bold text-slate-900 dark:text-white">
                          {g.subject}
                        </td>
                        <td className="p-3 font-black text-sm text-blue-600 dark:text-blue-400">
                          {g.score}
                        </td>
                        <td className="p-3">
                          <Badge variant="success">{g.predicate}</Badge>
                        </td>
                        <td className="p-3 text-slate-500">{g.classAverage}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300 text-[11px] max-w-sm">
                          {g.feedback}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Catatan Wali Kelas */}
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-1 text-xs">
                <h4 className="font-bold text-blue-900 dark:text-blue-200">
                  Catatan Perkembangan dari Wali Kelas:
                </h4>
                <p className="text-blue-800 dark:text-blue-300 italic">
                  "{child.homeroomNotes}"
                </p>
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold pt-1">
                  — Bambang Sudiro, M.Pd. (Wali Kelas XII MIPA 1)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 4. JADWAL TAB */}
      {activeTab === "jadwal" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Pelajaran Kelas XII MIPA 1</CardTitle>
              <p className="text-xs text-slate-500">
                Pekan Aktif Belajar Semester Ganjil 2026/2027
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weeklySchedule.map((ws, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
                  >
                    <div className="font-bold text-sm text-blue-600 dark:text-blue-400 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span>{ws.day}</span>
                      <Badge variant="secondary">{ws.lessons.length} Sesi</Badge>
                    </div>
                    <div className="space-y-2.5">
                      {ws.lessons.map((ls, idx) => (
                        <div key={idx} className="text-xs space-y-0.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                            <span>{ls.time}</span>
                          </div>
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {ls.subject}
                          </div>
                          <div className="text-[11px] text-slate-500">{ls.teacher}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 5. KEUANGAN & SPP TAB */}
      {activeTab === "keuangan" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Status Keuangan & Pembayaran Sekolah</CardTitle>
                <p className="text-xs text-slate-500">
                  Tagihan SPP bulanan, praktikum, dan bukti pelunasan digital.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bills.map((bill) => (
                  <div
                    key={bill.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={bill.status === "Lunas" ? "success" : "warning"}
                        >
                          {bill.status}
                        </Badge>
                        <span className="text-[11px] text-slate-400">{bill.category}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white pt-1">
                        {bill.title}
                      </h4>
                      <p className="text-lg font-black text-slate-900 dark:text-white">
                        Rp {bill.amount.toLocaleString("id-ID")}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Jatuh Tempo: {bill.dueDate}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      {bill.status === "Lunas" ? (
                        <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Lunas: {bill.paidDate}
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="gold"
                          className="w-full text-xs"
                          onClick={() => {
                            setSelectedBillForPay(bill);
                            setIsPayModalOpen(true);
                          }}
                        >
                          <CreditCard className="w-3.5 h-3.5 mr-1" /> Bayar Sekarang (VA/QRIS)
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 6. KONSULTASI GURU & BK TAB */}
      {activeTab === "konsultasi" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Layanan Konsultasi Pendidik & Guru BK</CardTitle>
              <p className="text-xs text-slate-500">
                Hubungi secara langsung wali kelas atau guru bimbingan konseling untuk memantau bakat dan karir siswa.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wali Kelas Card */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base">
                      BS
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {child.homeroomTeacher}
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Wali Kelas XII MIPA 1 & Guru Fisika
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Jam Konsultasi: 14.00 - 16.30 WIB
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Bapak/Ibu dapat berkonsultasi mengenai kedisiplinan, target nilai perguruan tinggi negeri (SNBP), serta keaktifan belajar ananda.
                  </p>

                  <Button
                    size="sm"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Halo Bapak Bambang Sudiro, saya Dewi Sartika (Orang tua dari Muhammad Ilham Pratama - XII MIPA 1). Saya ingin berkonsultasi mengenai perkembangan studi ananda.`
                      );
                      window.open(`https://wa.me/${SCHOOL_INFO.whatsapp}?text=${text}`, "_blank");
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" /> Hubungi Wali Kelas via WhatsApp
                  </Button>
                </div>

                {/* Guru BK Card */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-base">
                      DL
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Dewi Lestari, S.Psi.
                      </h4>
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                        Konselor BK & Minat Bakat Siswa
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Jam Konsultasi: 09.00 - 15.00 WIB
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Konsultasi peminatan jurusan kuliah, tes psikologi, bimbingan beasiswa, dan pendampingan kesehatan mental siswa.
                  </p>

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs font-semibold"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Halo Ibu Dewi Lestari (Konselor BK), saya orang tua dari Muhammad Ilham Pratama ingin berkonsultasi mengenai minat program studi perguruan tinggi ananda.`
                      );
                      window.open(`https://wa.me/${SCHOOL_INFO.whatsapp}?text=${text}`, "_blank");
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5 text-purple-600" /> Hubungi Konselor BK
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal: Pengajuan Surat Izin Online */}
      <Modal
        isOpen={isIzinModalOpen}
        onClose={() => setIsIzinModalOpen(false)}
        title="Pengajuan Izin / Sakit Online"
        description={`Ajukan keterangan ketidakhadiran resmi untuk ${child.name}.`}
      >
        <form onSubmit={handleSendIzin} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold block mb-1">Tanggal Izin *</label>
            <input
              type="date"
              required
              value={izinForm.date}
              onChange={(e) => setIzinForm({ ...izinForm, date: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Jenis Keterangan *</label>
            <select
              value={izinForm.type}
              onChange={(e) =>
                setIzinForm({
                  ...izinForm,
                  type: e.target.value as "Sakit" | "Izin Keperluan Keluarga" | "Dispensasi Lomba",
                })
              }
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
            >
              <option>Sakit</option>
              <option>Izin Keperluan Keluarga</option>
              <option>Dispensasi Lomba</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1">Alasan / Penjelasan Lengkap *</label>
            <textarea
              rows={3}
              required
              value={izinForm.reason}
              onChange={(e) => setIzinForm({ ...izinForm, reason: e.target.value })}
              placeholder="Jelaskan kondisi sakit atau keperluan mendesak..."
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Upload Bukti / Surat Dokter (Opsional)</label>
            <input
              type="file"
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsIzinModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" size="sm" variant="gold">
              Kirim Surat Izin
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Pembayaran SPP Online */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title="Pembayaran Tagihan Sekolah"
        description={`Tagihan: ${selectedBillForPay?.title}`}
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
            <p className="text-slate-500">Jumlah yang harus dibayar:</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Rp {selectedBillForPay?.amount.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="space-y-2">
            <label className="font-semibold block">Pilih Metode Pembayaran:</label>
            <div className="p-3 border rounded-xl flex items-center justify-between bg-blue-50/50 dark:bg-blue-950/20 border-blue-200">
              <div>
                <div className="font-bold">Virtual Account Mandiri / BCA</div>
                <div className="text-[11px] font-mono text-slate-500">
                  8801 0029 4819 0291
                </div>
              </div>
              <Badge variant="default">Otomatis</Badge>
            </div>
            <div className="p-3 border rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold">QRIS (Gopay, OVO, ShopeePay, Bank)</div>
                <div className="text-[11px] text-slate-500">Scan QR instan</div>
              </div>
              <Badge variant="secondary">Instan</Badge>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPayModalOpen(false)}
            >
              Batal
            </Button>
            <Button size="sm" variant="gold" onClick={handlePayBill}>
              Konfirmasi & Bayar Sekarang
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Cetak Rapor Digital */}
      <Modal
        isOpen={isRaporPrintOpen}
        onClose={() => setIsRaporPrintOpen(false)}
        title="Pratinjau Rapor Digital Siswa"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
            <h3 className="text-lg font-black uppercase text-slate-900">
              {SCHOOL_INFO.name}
            </h3>
            <p className="text-xs text-slate-600">
              LAPORAN HASIL BELAJAR PESERTA DIDIK (RAPOR ELEKTRONIK)
            </p>
            <p className="text-[11px] text-slate-500">Tahun Pelajaran 2026/2027 • Semester 1</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs py-2 bg-slate-50 p-3 rounded-lg text-slate-800">
            <div>
              <p>Nama Siswa: <strong>{child.name}</strong></p>
              <p>NISN: <strong>{child.nisn}</strong></p>
            </div>
            <div>
              <p>Kelas: <strong>{child.className}</strong></p>
              <p>Wali Kelas: <strong>{child.homeroomTeacher}</strong></p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border">
              <thead className="bg-slate-100 font-bold border-b text-slate-700">
                <tr>
                  <th className="p-2 border-r">Mata Pelajaran</th>
                  <th className="p-2 border-r text-center">Nilai</th>
                  <th className="p-2 border-r text-center">Predikat</th>
                  <th className="p-2">Capaian Kompetensi</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-700">
                {grades.map((g, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border-r font-semibold">{g.subject}</td>
                    <td className="p-2 border-r text-center font-bold">{g.score}</td>
                    <td className="p-2 border-r text-center">{g.predicate}</td>
                    <td className="p-2 text-[11px]">{g.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex justify-between text-xs text-slate-700">
            <div>
              <p>Mengetahui,</p>
              <p className="font-semibold">Orang Tua / Wali,</p>
              <div className="h-12" />
              <p className="font-bold underline">Dewi Sartika</p>
            </div>
            <div className="text-right">
              <p>Jakarta, 12 September 2026</p>
              <p className="font-semibold">Wali Kelas,</p>
              <div className="h-12" />
              <p className="font-bold underline">{child.homeroomTeacher}</p>
              <p className="text-[10px] text-slate-500">NIP. 19820719 200604 1 012</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <Button variant="outline" size="sm" onClick={() => setIsRaporPrintOpen(false)}>
              Tutup
            </Button>
            <Button size="sm" variant="gold" onClick={() => window.print()}>
              <Printer className="w-3.5 h-3.5 mr-1" /> Cetak Rapor
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

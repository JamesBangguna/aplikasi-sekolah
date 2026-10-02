import React, { useState } from "react";
import { DashboardLayout } from "../DashboardLayout";
import { NotificationsModal } from "../NotificationsModal";
import {
  Student,
  Teacher,
  Staff,
  SchoolClass,
  SchoolAnnouncement,
  SchoolNotification,
} from "../../../types";
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_STAFF,
  INITIAL_CLASSES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
  SCHOOL_INFO,
} from "../../../data/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Modal } from "../../ui/modal";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  FileSpreadsheet,
  Award,
  Bell,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Download,
  Printer,
  TrendingUp,
  UserCheck,
  Building,
  Star,
  Megaphone,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

export function PrincipalDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // State for data
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [staffList, setStaffList] = useState<Staff[]>(INITIAL_STAFF);
  const [announcements, setAnnouncements] = useState<SchoolAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [notifications, setNotifications] = useState<SchoolNotification[]>(INITIAL_NOTIFICATIONS);

  // Search & Filters
  const [studentSearch, setStudentSearch] = useState("");
  const [teacherSearch, setTeacherSearch] = useState("");

  // Modal states
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedTeacherForFeedback, setSelectedTeacherForFeedback] = useState<Teacher | null>(null);
  const [teacherFeedbackNote, setTeacherFeedbackNote] = useState("");

  // New student form state
  const [newStudent, setNewStudent] = useState({
    name: "",
    nisn: "",
    className: "XII MIPA 1",
    gender: "L" as "L" | "P",
    parentName: "",
    parentPhone: "",
    averageScore: 85,
  });

  // New announcement form state
  const [newAnn, setNewAnn] = useState({
    title: "",
    target: "Semua" as "Semua" | "Guru" | "Orang Tua" | "Siswa",
    priority: "Penting" as "Biasa" | "Penting" | "Mendesak",
    content: "",
  });

  const unreadNotifs = notifications.filter(
    (n) => !n.read && (n.roleTarget === "KEPALA_SEKOLAH" || !n.roleTarget)
  ).length;

  // Chart data
  const attendanceTrend = [
    { day: "Senin", hadir: 98.6, sakit: 1.0, izin: 0.4 },
    { day: "Selasa", hadir: 98.2, sakit: 1.2, izin: 0.6 },
    { day: "Rabu", hadir: 99.0, sakit: 0.8, izin: 0.2 },
    { day: "Kamis", hadir: 97.8, sakit: 1.5, izin: 0.7 },
    { day: "Jumat", hadir: 98.4, sakit: 1.1, izin: 0.5 },
  ];

  const gradeDistribution = [
    { grade: "Kelas X", rataRata: 85.8, kelulusan: 100 },
    { grade: "Kelas XI", rataRata: 88.2, kelulusan: 100 },
    { grade: "Kelas XII", rataRata: 91.5, kelulusan: 100 },
  ];

  // Navigation Items
  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "data-sekolah", label: "Manajemen Data Sekolah", icon: Users, badge: students.length },
    { id: "kinerja-guru", label: "Supervisi Kinerja Guru", icon: Award, badge: teachers.length },
    { id: "tenaga-pendidik", label: "Tenaga Kependidikan", icon: Briefcase },
    { id: "administrasi", label: "Jadwal & Pengumuman", icon: Calendar },
    { id: "laporan", label: "Laporan & Dokumen Ekspor", icon: FileSpreadsheet },
  ];

  // Handlers
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.nisn) return;
    const item: Student = {
      id: `std-${Date.now()}`,
      nisn: newStudent.nisn,
      name: newStudent.name,
      classId: "cls-1",
      className: newStudent.className,
      gender: newStudent.gender,
      parentName: newStudent.parentName || "Orang Tua Siswa",
      parentPhone: newStudent.parentPhone || "+62 812-0000-0000",
      attendanceRate: 100,
      averageScore: Number(newStudent.averageScore) || 85,
      status: "Aktif",
    };
    setStudents([item, ...students]);
    setIsAddStudentOpen(false);
    setNewStudent({
      name: "",
      nisn: "",
      className: "XII MIPA 1",
      gender: "L",
      parentName: "",
      parentPhone: "",
      averageScore: 85,
    });
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data siswa ini?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnn.title || !newAnn.content) return;
    const item: SchoolAnnouncement = {
      id: `ann-${Date.now()}`,
      title: newAnn.title,
      target: newAnn.target,
      priority: newAnn.priority,
      content: newAnn.content,
      date: "Hari ini",
      author: "Kepala Sekolah",
    };
    setAnnouncements([item, ...announcements]);
    setIsAddAnnouncementOpen(false);
    setNewAnn({
      title: "",
      target: "Semua",
      priority: "Penting",
      content: "",
    });
  };

  const handleSaveTeacherFeedback = () => {
    if (!selectedTeacherForFeedback) return;
    setTeachers(
      teachers.map((t) =>
        t.id === selectedTeacherForFeedback.id
          ? { ...t, notes: teacherFeedbackNote }
          : t
      )
    );
    setSelectedTeacherForFeedback(null);
  };

  const exportStudentsToCSV = () => {
    const headers = "NISN,Nama Siswa,Kelas,Gender,Nama Orang Tua,Presensi %,Nilai Rata-rata\n";
    const rows = students
      .map(
        (s) =>
          `"${s.nisn}","${s.name}","${s.className}","${s.gender}","${s.parentName}",${s.attendanceRate},${s.averageScore}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Data_Siswa_${SCHOOL_INFO.name.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout
      title="Dashboard Kepala Sekolah"
      subtitle={`Selamat bertugas, ${SCHOOL_INFO.principal}. Pantau dan kelola seluruh indikator operasional serta akademik sekolah.`}
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
        currentRole="KEPALA_SEKOLAH"
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
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Total Siswa Terdaftar
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    1,248 Siswa
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" /> +12% dibanding semester lalu
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  <Users className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Total Guru & Staff
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    94 Personil
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    68 Guru Sertifikasi • 26 Staff
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  <Award className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Presensi Siswa Hari Ini
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    98.4%
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    Tercatat 1,228 Hadir • 20 Sakit/Izin
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                  <UserCheck className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Rata-rata Nilai Akademik
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    89.2 (A)
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Target Akreditasi Internasional
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recharts Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: Kehadiran Mingguan */}
            <Card className="lg:col-span-7">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Tren Presensi Siswa Pekan Ini (%)
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Data absensi digital gerbang RFID & presensi kelas
                </p>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceTrend}>
                    <defs>
                      <linearGradient id="colorHadir" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                    <YAxis domain={[95, 100]} stroke="#94a3b8" fontSize={12} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="hadir"
                      stroke="#2563eb"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorHadir)"
                      name="Persentase Hadir (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Chart 2: Capaian Nilai per Jenjang */}
            <Card className="lg:col-span-5">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Rata-rata Capaian Nilai per Tingkat
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Distribusi nilai rata-rata asesmen sumatif
                </p>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                    <XAxis dataKey="grade" stroke="#94a3b8" fontSize={12} />
                    <YAxis domain={[70, 100]} stroke="#94a3b8" fontSize={12} />
                    <Tooltip />
                    <Bar
                      dataKey="rataRata"
                      fill="#f59e0b"
                      radius={[6, 6, 0, 0]}
                      name="Rata-rata Nilai"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Supervisi & Pengumuman Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Guru Status */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">Guru Perlu Supervisi Pekan Ini</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("kinerja-guru")}
                  className="text-xs"
                >
                  Lihat Semua
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {teachers.slice(0, 3).map((tch) => (
                  <div
                    key={tch.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                        {tch.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-slate-900 dark:text-white">
                          {tch.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {tch.subject} • Rating: {tch.supervisionRating} ⭐
                        </div>
                      </div>
                    </div>
                    <Badge variant="success">Aktif</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Announcements Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">Pengumuman Sekolah Aktif</CardTitle>
                <Button
                  size="sm"
                  onClick={() => setIsAddAnnouncementOpen(true)}
                  className="text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Buat Pengumuman
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {announcements.slice(0, 3).map((ann) => (
                  <div
                    key={ann.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-1">
                        {ann.title}
                      </h4>
                      <Badge
                        variant={
                          ann.priority === "Mendesak"
                            ? "destructive"
                            : ann.priority === "Penting"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {ann.priority}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {ann.content}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 2. MANAJEMEN DATA SEKOLAH TAB */}
      {activeTab === "data-sekolah" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Data Siswa Aktif</CardTitle>
                <p className="text-xs text-slate-500">
                  Kelola profil siswa, NISN, status, dan data kontak orang tua.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportStudentsToCSV}
                  className="text-xs"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Ekspor CSV
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsAddStudentOpen(true)}
                  className="text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Tambah Siswa Baru
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {/* Search Bar */}
              <div className="mb-4 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari siswa berdasarkan nama atau NISN..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">NISN</th>
                      <th className="p-3">Nama Siswa</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3">Wali Murid</th>
                      <th className="p-3">Kehadiran</th>
                      <th className="p-3">Nilai Rata-rata</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {students
                      .filter(
                        (s) =>
                          s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          s.nisn.includes(studentSearch)
                      )
                      .map((s) => (
                        <tr
                          key={s.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="p-3 font-mono text-slate-500">{s.nisn}</td>
                          <td className="p-3 font-bold text-slate-900 dark:text-white">
                            {s.name}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
                              {s.className}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600 dark:text-slate-400">
                            {s.parentName}
                            <span className="block text-[10px] text-slate-400">
                              {s.parentPhone}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              {s.attendanceRate}%
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {s.averageScore}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteStudent(s.id)}
                              className="p-1.5 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                              title="Hapus Siswa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 3. KINERJA GURU TAB */}
      {activeTab === "kinerja-guru" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Supervisi & Evaluasi Kinerja Tenaga Pendidik</CardTitle>
                <p className="text-xs text-slate-500">
                  Pantau jam mengajar, keaktifan modul RPP, rating supervisi, dan beri masukan kepala sekolah.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">NIP & Nama Guru</th>
                      <th className="p-3">Mata Pelajaran</th>
                      <th className="p-3">Kelas Binaan</th>
                      <th className="p-3">Presensi Mengajar</th>
                      <th className="p-3">Skor Supervisi</th>
                      <th className="p-3">Catatan Kepala Sekolah</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {teachers.map((tch) => (
                      <tr key={tch.id} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                        <td className="p-3">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {tch.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {tch.nip}
                          </div>
                        </td>
                        <td className="p-3 font-medium text-slate-700 dark:text-slate-300">
                          {tch.subject}
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {tch.assignedClasses.map((c) => (
                              <span
                                key={c}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 font-semibold text-emerald-600">
                          {tch.attendanceRate}%
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1 font-bold text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{tch.supervisionRating} / 5.0</span>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            Skor: {tch.performanceScore}/100
                          </span>
                        </td>
                        <td className="p-3 max-w-xs text-[11px] text-slate-500 dark:text-slate-400 italic">
                          "{tch.notes}"
                        </td>
                        <td className="p-3 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedTeacherForFeedback(tch);
                              setTeacherFeedbackNote(tch.notes);
                            }}
                            className="text-xs"
                          >
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            Beri Catatan
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 4. TENAGA KEPENDIDIKAN TAB */}
      {activeTab === "tenaga-pendidik" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenaga Kependidikan & Staff Operasional</CardTitle>
              <p className="text-xs text-slate-500">
                Pemantauan tugas harian staf Tata Usaha, Laboran, Pustakawan, dan Keamanan.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {staffList.map((stf) => (
                  <div
                    key={stf.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {stf.name}
                        </h4>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                          {stf.role}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          NIP: {stf.nip}
                        </p>
                      </div>
                      <Badge variant="success">{stf.attendanceToday}</Badge>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Penyelesaian Tugas Harian</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {stf.taskProgress}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${stf.taskProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 5. ADMINISTRASI TAB */}
      {activeTab === "administrasi" && (
        <div className="space-y-6">
          {/* Announcements Manager */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Kelola Pengumuman Sekolah</CardTitle>
                <p className="text-xs text-slate-500">
                  Siarkan informasi resmi ke portal Guru, Siswa, dan Orang Tua.
                </p>
              </div>
              <Button size="sm" onClick={() => setIsAddAnnouncementOpen(true)}>
                <Plus className="w-3.5 h-3.5 mr-1" />
                Buat Pengumuman
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{ann.date}</span>
                      <Badge variant="secondary">Target: {ann.target}</Badge>
                      <Badge
                        variant={
                          ann.priority === "Mendesak"
                            ? "destructive"
                            : ann.priority === "Penting"
                            ? "warning"
                            : "default"
                        }
                      >
                        {ann.priority}
                      </Badge>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {ann.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {ann.content}
                    </p>
                  </div>
                  <div className="text-xs text-slate-400 sm:text-right shrink-0">
                    Dipublikasikan oleh: <strong>{ann.author}</strong>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* 6. LAPORAN & EKSPOR TAB */}
      {activeTab === "laporan" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pusat Unduhan & Laporan Eksekutif</CardTitle>
              <p className="text-xs text-slate-500">
                Unduh rekapitulasi data akademik, presensi kehadiran, atau cetak dokumen resmi berkop surat sekolah.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Rekapitulasi Data Siswa
                  </h4>
                  <p className="text-xs text-slate-500">
                    Daftar seluruh siswa aktif lengkap dengan NISN, kelas, dan kontak wali.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={exportStudentsToCSV}
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Unduh Format CSV / Excel
                  </Button>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Printer className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Laporan Kinerja Akademik Resmi
                  </h4>
                  <p className="text-xs text-slate-500">
                    Dokumen resmi siap cetak / PDF berkop surat sekolah untuk dinas pendidikan.
                  </p>
                  <Button
                    size="sm"
                    variant="gold"
                    className="w-full text-xs"
                    onClick={() => setIsPrintModalOpen(true)}
                  >
                    <Printer className="w-3.5 h-3.5 mr-1" /> Pratinjau & Cetak Dokumen
                  </Button>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Rekapitulasi Supervisi Guru
                  </h4>
                  <p className="text-xs text-slate-500">
                    Hasil evaluasi berkala guru, kehadiran mengajar, dan feedback kepala sekolah.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => {
                      alert("Laporan Supervisi Guru berhasil digenerate ke format spreadsheet.");
                    }}
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Ekspor Hasil Supervisi
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal: Tambah Siswa Baru */}
      <Modal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        title="Tambah Siswa Baru"
        description="Masukkan data siswa baru ke dalam pangkalan data sekolah."
      >
        <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold block mb-1">Nama Lengkap Siswa *</label>
            <input
              type="text"
              required
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              placeholder="Contoh: Muhammad Ilham"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">NISN *</label>
              <input
                type="text"
                required
                value={newStudent.nisn}
                onChange={(e) => setNewStudent({ ...newStudent, nisn: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
                placeholder="0068492099"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Kelas</label>
              <select
                value={newStudent.className}
                onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              >
                <option>XII MIPA 1</option>
                <option>XII MIPA 2</option>
                <option>XII IPS 1</option>
                <option>XI MIPA 1</option>
                <option>X-A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">Nama Orang Tua / Wali</label>
              <input
                type="text"
                value={newStudent.parentName}
                onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
                placeholder="Nama Orang Tua"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">No. WhatsApp Orang Tua</label>
              <input
                type="text"
                value={newStudent.parentPhone}
                onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
                placeholder="+62 812-..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddStudentOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" size="sm">
              Simpan Data Siswa
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Tambah Pengumuman */}
      <Modal
        isOpen={isAddAnnouncementOpen}
        onClose={() => setIsAddAnnouncementOpen(false)}
        title="Buat Pengumuman Sekolah"
        description="Informasi ini akan langsung tampil di dashboard target yang dipilih."
      >
        <form onSubmit={handleAddAnnouncement} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold block mb-1">Judul Pengumuman *</label>
            <input
              type="text"
              required
              value={newAnn.title}
              onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              placeholder="Contoh: Jadwal Pelaksanaan Ujian ASTS"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">Target Audiens</label>
              <select
                value={newAnn.target}
                onChange={(e) =>
                  setNewAnn({
                    ...newAnn,
                    target: e.target.value as "Semua" | "Guru" | "Orang Tua" | "Siswa",
                  })
                }
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              >
                <option>Semua</option>
                <option>Guru</option>
                <option>Orang Tua</option>
                <option>Siswa</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-1">Tingkat Prioritas</label>
              <select
                value={newAnn.priority}
                onChange={(e) =>
                  setNewAnn({
                    ...newAnn,
                    priority: e.target.value as "Biasa" | "Penting" | "Mendesak",
                  })
                }
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              >
                <option>Biasa</option>
                <option>Penting</option>
                <option>Mendesak</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Isi Pesan Pengumuman *</label>
            <textarea
              rows={4}
              required
              value={newAnn.content}
              onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              placeholder="Tulis rincian pengumuman resmi di sini..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddAnnouncementOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" size="sm">
              Publikasikan
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Feedback Supervisi Guru */}
      <Modal
        isOpen={!!selectedTeacherForFeedback}
        onClose={() => setSelectedTeacherForFeedback(null)}
        title="Catatan Supervisi Kepala Sekolah"
        description={`Beri catatan pembinaan atau apresiasi untuk ${selectedTeacherForFeedback?.name}.`}
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Catatan Evaluasi / Rekomendasi:</label>
            <textarea
              rows={4}
              value={teacherFeedbackNote}
              onChange={(e) => setTeacherFeedbackNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700 text-xs"
              placeholder="Tulis catatan supervisi..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedTeacherForFeedback(null)}
            >
              Batal
            </Button>
            <Button size="sm" onClick={handleSaveTeacherFeedback}>
              Simpan Catatan
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Print Pratinjau Dokumen Resmi Kop Surat */}
      <Modal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="Pratinjau Dokumen Resmi Sekolah"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          {/* Official Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 uppercase">
              {SCHOOL_INFO.name}
            </h2>
            <p className="text-[11px] text-slate-600">
              {SCHOOL_INFO.accreditation} • NSS: 301016001001 • NPSN: 20108899
            </p>
            <p className="text-[10px] text-slate-500">
              {SCHOOL_INFO.address} | Telp: {SCHOOL_INFO.phone} | Web: www.smagarudanusantara.sch.id
            </p>
          </div>

          <div className="text-center py-2">
            <h3 className="font-bold text-sm uppercase underline text-slate-900">
              LAPORAN KINERJA AKADEMIK DAN REKAPITULASI SEKOLAH
            </h3>
            <p className="text-xs text-slate-500">Tahun Ajaran 2026/2027 - Semester Ganjil</p>
          </div>

          <div className="text-xs space-y-2 text-slate-700">
            <p>Berdasarkan evaluasi terpadu sistem akademik SIADIK, dilaporkan bahwa:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Jumlah siswa aktif semester ini adalah 1,248 siswa terbagi dalam 36 rombongan belajar.</li>
              <li>Tingkat kehadiran kumulatif siswa mencapai 98.4%.</li>
              <li>Rata-rata nilai capaian asesmen sumatif sekolah adalah 89.2 dengan predikat Amat Baik (A).</li>
              <li>Seluruh modul ajar dan RPP guru telah terverifikasi 100% sesuai panduan Kurikulum Merdeka.</li>
            </ul>
          </div>

          <div className="pt-8 flex justify-end">
            <div className="text-center text-xs">
              <p>Jakarta, 12 September 2026</p>
              <p className="font-semibold mt-1">Kepala Sekolah,</p>
              <div className="h-16 flex items-center justify-center font-serif text-slate-400 italic">
                (Tanda Tangan & Cap Digital)
              </div>
              <p className="font-bold underline text-slate-900">{SCHOOL_INFO.principal}</p>
              <p className="text-[10px] text-slate-500">NIP. 19680512 199303 1 004</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" size="sm" onClick={() => setIsPrintModalOpen(false)}>
              Tutup
            </Button>
            <Button
              size="sm"
              variant="gold"
              onClick={() => {
                window.print();
              }}
            >
              <Printer className="w-3.5 h-3.5 mr-1" /> Cetak / Simpan PDF
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

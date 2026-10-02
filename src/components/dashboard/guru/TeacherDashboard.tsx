import React, { useState } from "react";
import { DashboardLayout } from "../DashboardLayout";
import { NotificationsModal } from "../NotificationsModal";
import {
  TeachingSchedule,
  LearningMaterial,
  Assignment,
  Student,
  RppItem,
  SchoolNotification,
} from "../../../types";
import {
  TODAY_TEACHING_SCHEDULE,
  INITIAL_MATERIALS,
  INITIAL_ASSIGNMENTS,
  INITIAL_STUDENTS,
  INITIAL_RPP,
  INITIAL_NOTIFICATIONS,
  SCHOOL_INFO,
} from "../../../data/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Modal } from "../../ui/modal";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CheckSquare,
  FileText,
  Clock,
  Plus,
  Trash2,
  Edit,
  Download,
  Upload,
  MessageCircle,
  Sparkles,
  Send,
  Video,
  FileCode,
  Link2,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // State data
  const [materials, setMaterials] = useState<LearningMaterial[]>(INITIAL_MATERIALS);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [rppList, setRppList] = useState<RppItem[]>(INITIAL_RPP);
  const [notifications, setNotifications] = useState<SchoolNotification[]>(INITIAL_NOTIFICATIONS);

  // Class selection state
  const [selectedClass, setSelectedClass] = useState("XII MIPA 1");

  // Presensi State: mapping studentId -> 'H' | 'S' | 'I' | 'A'
  const [attendanceMap, setAttendanceMap] = useState<Record<string, "H" | "S" | "I" | "A">>({
    "std-1": "H",
    "std-2": "H",
    "std-3": "H",
    "std-4": "H",
    "std-5": "H",
  });
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // Student Score edit modal
  const [selectedStudentForScore, setSelectedStudentForScore] = useState<Student | null>(null);
  const [tempScore, setTempScore] = useState<number>(90);

  // Modals
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [isBroadcastWaOpen, setIsBroadcastWaOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");

  // Material Form state
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    subject: "Fisika",
    className: "XII MIPA 1",
    type: "PDF" as "PDF" | "Video" | "Link" | "Dokumen",
    sizeOrDuration: "3.5 MB",
    url: "#",
  });

  // Assignment Form state
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "Fisika",
    className: "XII MIPA 1",
    dueDate: "25 Sep 2026, 23.59 WIB",
    description: "",
  });

  const unreadNotifs = notifications.filter(
    (n) => !n.read && (n.roleTarget === "GURU" || !n.roleTarget)
  ).length;

  // Nav Items
  const navItems = [
    { id: "overview", label: "Dashboard Guru", icon: LayoutDashboard },
    { id: "bahan-ajar", label: "Bahan Ajar & Materi", icon: BookOpen, badge: materials.length },
    { id: "manajemen-kelas", label: "Manajemen Kelas & Nilai", icon: Users },
    { id: "presensi", label: "Presensi Digital", icon: CheckSquare },
    { id: "tugas-penilaian", label: "Tugas & Penilaian", icon: Clock, badge: 1 },
    { id: "administrasi-rpp", label: "Modul Ajar (RPP)", icon: FileText },
    { id: "komunikasi", label: "Komunikasi Orang Tua", icon: MessageCircle },
  ];

  // Presensi Handler
  const handleAttendanceChange = (studentId: string, status: "H" | "S" | "I" | "A") => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const saveAttendance = () => {
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 3000);
  };

  const handleBroadcastWhatsApp = () => {
    const text = encodeURIComponent(
      `*PENGUMUMAN WALI KELAS XII MIPA 1 - ${SCHOOL_INFO.name}*\n` +
        `Oleh: Bambang Sudiro, M.Pd.\n\n` +
        `${broadcastMessage || "Diberitahukan kepada Bapak/Ibu orang tua siswa bahwa presensi harian telah diperbarui di sistem SIADIK. Harap periksa status tugas anak di dashboard masing-masing."}\n\n` +
        `Salam hormat,\nWali Kelas XII MIPA 1`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setIsBroadcastWaOpen(false);
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterial.title) return;
    const item: LearningMaterial = {
      id: `mat-${Date.now()}`,
      title: newMaterial.title,
      subject: newMaterial.subject,
      className: newMaterial.className,
      type: newMaterial.type,
      sizeOrDuration: newMaterial.sizeOrDuration,
      uploadDate: "Hari ini",
      downloads: 0,
      url: "#",
    };
    setMaterials([item, ...materials]);
    setIsAddMaterialOpen(false);
    setNewMaterial({
      title: "",
      subject: "Fisika",
      className: "XII MIPA 1",
      type: "PDF",
      sizeOrDuration: "3.5 MB",
      url: "#",
    });
  };

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignment.title) return;
    const item: Assignment = {
      id: `asg-${Date.now()}`,
      title: newAssignment.title,
      subject: newAssignment.subject,
      className: newAssignment.className,
      dueDate: newAssignment.dueDate,
      totalSubmissions: 0,
      gradedSubmissions: 0,
      totalStudents: 36,
      status: "Aktif",
      description: newAssignment.description,
    };
    setAssignments([item, ...assignments]);
    setIsAddAssignmentOpen(false);
    setNewAssignment({
      title: "",
      subject: "Fisika",
      className: "XII MIPA 1",
      dueDate: "25 Sep 2026, 23.59 WIB",
      description: "",
    });
  };

  const handleSaveScore = () => {
    if (!selectedStudentForScore) return;
    setStudents(
      students.map((s) =>
        s.id === selectedStudentForScore.id ? { ...s, averageScore: tempScore } : s
      )
    );
    setSelectedStudentForScore(null);
  };

  return (
    <DashboardLayout
      title="Portal Guru & Administrasi Pengajaran"
      subtitle="Bambang Sudiro, M.Pd. • Guru Fisika & Wali Kelas XII MIPA 1 • NIP: 19820719 200604 1 012"
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
        currentRole="GURU"
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
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Jadwal Mengajar Hari Ini
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    3 Sesi (6 JP)
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Sesi 1: XII MIPA 1 (Sedang Aktif)
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  <Clock className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Kelas Binaan & Diampu
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    3 Rombel
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Total 108 Siswa</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  <Users className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Tugas Perlu Dinilai
                  </p>
                  <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    4 Submission
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Praktikum Spektrum Cahaya</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                  <CheckSquare className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Modul Ajar RPP
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    100% Siap
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    Terverifikasi Kurikulum
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  <FileText className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Today & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Jadwal Mengajar */}
            <Card className="lg:col-span-8">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base">Jadwal Mengajar Hari Ini</CardTitle>
                  <p className="text-xs text-slate-500">
                    Senin, 12 September 2026 • Semester Ganjil
                  </p>
                </div>
                <Badge variant="gold">Aktif</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {TODAY_TEACHING_SCHEDULE.map((sch) => (
                  <div
                    key={sch.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      sch.status === "Sedang Berlangsung"
                        ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800"
                        : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg text-xs font-bold shrink-0 ${
                          sch.status === "Sedang Berlangsung"
                            ? "bg-blue-600 text-white animate-pulse"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {sch.time}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {sch.className}
                          </span>
                          <span className="text-xs text-slate-500">• {sch.room}</span>
                        </div>
                        <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mt-0.5">
                          {sch.subject}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={sch.status === "Sedang Berlangsung" ? "default" : "outline"}
                        onClick={() => setActiveTab("presensi")}
                        className="text-xs w-full sm:w-auto"
                      >
                        <CheckSquare className="w-3.5 h-3.5 mr-1" />
                        Buka Presensi Kelas
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Shortcuts */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle className="text-base">Aksi Cepat Pendidik</CardTitle>
                <p className="text-xs text-slate-500">Pintasan administrasi kelas</p>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <Button
                  className="w-full justify-start text-xs font-semibold"
                  onClick={() => setIsAddMaterialOpen(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Modul / Bahan Ajar Baru
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-xs font-semibold"
                  onClick={() => setIsAddAssignmentOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Tugas / Ujian Online
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-xs font-semibold border-emerald-600/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                  onClick={() => setIsBroadcastWaOpen(true)}
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
                  Siarkan Pesan ke Grup Wali Murid
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 2. BAHAN AJAR TAB */}
      {activeTab === "bahan-ajar" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Bahan Ajar & Materi Pembelajaran</CardTitle>
                <p className="text-xs text-slate-500">
                  Kelola modul PDF, video praktikum, dan simulasi interaktif siswa.
                </p>
              </div>
              <Button size="sm" onClick={() => setIsAddMaterialOpen(true)}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Upload Materi Baru
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map((mat) => (
                  <div
                    key={mat.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shrink-0">
                        {mat.type === "PDF" ? (
                          <FileText className="w-5 h-5" />
                        ) : mat.type === "Video" ? (
                          <Video className="w-5 h-5" />
                        ) : (
                          <Link2 className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{mat.className}</Badge>
                          <span className="text-[10px] text-slate-400">{mat.uploadDate}</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                          {mat.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Tipe: {mat.type} • Ukuran: {mat.sizeOrDuration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <span className="text-slate-400">{mat.downloads}x diakses siswa</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => alert(`Membuka berkas: ${mat.title}`)}
                        className="text-xs h-8"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" /> Unduh / Buka
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 3. MANAJEMEN KELAS & NILAI TAB */}
      {activeTab === "manajemen-kelas" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Daftar Siswa & Rekap Nilai Akademik</CardTitle>
                <p className="text-xs text-slate-500">
                  Input nilai ulangan, tugas praktikum, UTS, dan catatan sikap siswa.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Pilih Kelas:</span>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                >
                  <option>XII MIPA 1</option>
                  <option>XII MIPA 2</option>
                  <option>XI MIPA 1</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">NISN</th>
                      <th className="p-3">Nama Siswa</th>
                      <th className="p-3">Tugas (30%)</th>
                      <th className="p-3">UTS (30%)</th>
                      <th className="p-3">UAS (40%)</th>
                      <th className="p-3">Nilai Akhir</th>
                      <th className="p-3">Predikat</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {students
                      .filter((s) => s.className === selectedClass)
                      .map((s) => {
                        const predikat =
                          s.averageScore >= 90
                            ? "A"
                            : s.averageScore >= 80
                            ? "B"
                            : "C";
                        return (
                          <tr
                            key={s.id}
                            className="hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
                          >
                            <td className="p-3 font-mono text-slate-400">{s.nisn}</td>
                            <td className="p-3 font-bold text-slate-900 dark:text-white">
                              {s.name}
                            </td>
                            <td className="p-3 font-medium">92</td>
                            <td className="p-3 font-medium">90</td>
                            <td className="p-3 font-medium">94</td>
                            <td className="p-3 font-bold text-blue-600 dark:text-blue-400 text-sm">
                              {s.averageScore}
                            </td>
                            <td className="p-3">
                              <Badge
                                variant={
                                  predikat === "A"
                                    ? "success"
                                    : predikat === "B"
                                    ? "default"
                                    : "warning"
                                }
                              >
                                {predikat} (Sangat Baik)
                              </Badge>
                            </td>
                            <td className="p-3 text-right">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedStudentForScore(s);
                                  setTempScore(s.averageScore);
                                }}
                                className="text-xs h-7"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit Nilai
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 4. PRESENSI DIGITAL TAB */}
      {activeTab === "presensi" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Presensi Pertemuan Kelas: {selectedClass}</CardTitle>
                <p className="text-xs text-slate-500">
                  Pertemuan Ke-6: Praktikum Spektrum Gelombang Elektromagnetik
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={saveAttendance}
                  className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Simpan Presensi Hari Ini
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {attendanceSaved && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Presensi digital berhasil disimpan dan disinkronkan ke dashboard orang tua.
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Nama Siswa</th>
                      <th className="p-3">Status Hadir (H)</th>
                      <th className="p-3">Sakit (S)</th>
                      <th className="p-3">Izin (I)</th>
                      <th className="p-3">Alpa (A)</th>
                      <th className="p-3">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {students
                      .filter((s) => s.className === selectedClass)
                      .map((s) => {
                        const currentStatus = attendanceMap[s.id] || "H";
                        return (
                          <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                            <td className="p-3 font-semibold text-slate-900 dark:text-white">
                              {s.name}
                            </td>
                            <td className="p-3">
                              <input
                                type="radio"
                                name={`att-${s.id}`}
                                checked={currentStatus === "H"}
                                onChange={() => handleAttendanceChange(s.id, "H")}
                                className="w-4 h-4 text-emerald-600"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="radio"
                                name={`att-${s.id}`}
                                checked={currentStatus === "S"}
                                onChange={() => handleAttendanceChange(s.id, "S")}
                                className="w-4 h-4 text-amber-500"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="radio"
                                name={`att-${s.id}`}
                                checked={currentStatus === "I"}
                                onChange={() => handleAttendanceChange(s.id, "I")}
                                className="w-4 h-4 text-blue-500"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="radio"
                                name={`att-${s.id}`}
                                checked={currentStatus === "A"}
                                onChange={() => handleAttendanceChange(s.id, "A")}
                                className="w-4 h-4 text-red-500"
                              />
                            </td>
                            <td className="p-3 text-slate-500 text-[11px]">
                              {currentStatus === "H"
                                ? "Tepat Waktu (06.45 WIB)"
                                : "Menunggu konfirmasi surat"}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 5. TUGAS & PENILAIAN TAB */}
      {activeTab === "tugas-penilaian" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Kelola Tugas & Penilaian Online</CardTitle>
                <p className="text-xs text-slate-500">
                  Buat kuis HOTS, laporan praktikum, dan periksa tugas yang dikumpulkan siswa.
                </p>
              </div>
              <Button size="sm" onClick={() => setIsAddAssignmentOpen(true)}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Buat Tugas Baru
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{asg.className}</Badge>
                        <Badge
                          variant={
                            asg.status === "Perlu Dinilai"
                              ? "warning"
                              : asg.status === "Aktif"
                              ? "default"
                              : "success"
                          }
                        >
                          {asg.status}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                        {asg.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Batas Waktu: {asg.dueDate}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {asg.totalSubmissions} dari {asg.totalStudents} Siswa Mengumpulkan
                      </div>
                      <div className="text-[11px] text-emerald-600">
                        {asg.gradedSubmissions} Sudah Dinilai
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                    {asg.description}
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert(`Membuka submission untuk ${asg.title}`)}
                      className="text-xs"
                    >
                      Lihat & Nilai Submission
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* 6. MODUL AJAR (RPP) TAB */}
      {activeTab === "administrasi-rpp" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Administrasi Modul Ajar (RPP Digital)</CardTitle>
                <p className="text-xs text-slate-500">
                  Kurikulum Merdeka • Fase F • Mata Pelajaran Fisika Lanjutan
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {rppList.map((rpp) => (
                <div
                  key={rpp.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{rpp.grade}</Badge>
                      <Badge variant="success">{rpp.status}</Badge>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {rpp.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Alokasi Waktu: {rpp.alokasiWaktu} • Semester: {rpp.semester}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => alert(`Mengunduh perangkat ajar: ${rpp.title}`)}
                    className="text-xs shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Unduh Modul
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* 7. KOMUNIKASI ORANG TUA TAB */}
      {activeTab === "komunikasi" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Komunikasi Terpadu Wali Murid</CardTitle>
              <p className="text-xs text-slate-500">
                Kirim pengumuman langsung ke grup WhatsApp wali murid kelas XII MIPA 1.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
                    Siaran WhatsApp Wali Murid Kelas XII MIPA 1
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
                    Kirim pesan cepat ke grup paguyuban orang tua mengenai ujian, kehadiran, atau pengumuman penting.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="gold"
                  onClick={() => setIsBroadcastWaOpen(true)}
                  className="shrink-0"
                >
                  <MessageCircle className="w-4 h-4 mr-1.5" /> Buat Siaran WA
                </Button>
              </div>

              <div className="space-y-2 text-xs">
                <h5 className="font-bold text-slate-700 dark:text-slate-300">
                  Daftar Kontak Wali Murid Binaan:
                </h5>
                <div className="divide-y divide-slate-200 dark:divide-slate-800 border rounded-xl overflow-hidden">
                  {students
                    .filter((s) => s.className === "XII MIPA 1")
                    .map((s) => (
                      <div
                        key={s.id}
                        className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850"
                      >
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {s.parentName}
                          </span>
                          <span className="text-slate-500 ml-2">
                            (Orang tua dari: {s.name})
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const text = encodeURIComponent(
                              `Halo Bapak/Ibu ${s.parentName}, saya Bambang Sudiro (Wali Kelas ${s.name}) ingin menyampaikan informasi perkembangan belajar ananda.`
                            );
                            window.open(`https://wa.me/?text=${text}`, "_blank");
                          }}
                          className="text-xs h-7"
                        >
                          <Send className="w-3 h-3 mr-1 text-emerald-600" /> Chat WA
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal: Tambah Bahan Ajar */}
      <Modal
        isOpen={isAddMaterialOpen}
        onClose={() => setIsAddMaterialOpen(false)}
        title="Upload Bahan Ajar Baru"
        description="Unggah materi pembelajaran untuk dapat diakses dan dipelajari siswa."
      >
        <form onSubmit={handleAddMaterial} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold block mb-1">Judul Materi *</label>
            <input
              type="text"
              required
              value={newMaterial.title}
              onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              placeholder="Contoh: Modul Fisika Kuantum Partikel"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">Kelas Target</label>
              <select
                value={newMaterial.className}
                onChange={(e) => setNewMaterial({ ...newMaterial, className: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              >
                <option>XII MIPA 1</option>
                <option>XII MIPA 2</option>
                <option>XI MIPA 1</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-1">Tipe Media</label>
              <select
                value={newMaterial.type}
                onChange={(e) =>
                  setNewMaterial({
                    ...newMaterial,
                    type: e.target.value as "PDF" | "Video" | "Link" | "Dokumen",
                  })
                }
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              >
                <option>PDF</option>
                <option>Video</option>
                <option>Link</option>
                <option>Dokumen</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Pilih File / Link Web</label>
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
              onClick={() => setIsAddMaterialOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" size="sm">
              Upload Bahan Ajar
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Buat Tugas Baru */}
      <Modal
        isOpen={isAddAssignmentOpen}
        onClose={() => setIsAddAssignmentOpen(false)}
        title="Buat Tugas Baru"
        description="Berikan tugas terstruktur atau tugas praktikum kepada siswa."
      >
        <form onSubmit={handleAddAssignment} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold block mb-1">Judul Tugas *</label>
            <input
              type="text"
              required
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              placeholder="Contoh: Laporan Praktikum Polarisasi Cahaya"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">Kelas Target</label>
              <select
                value={newAssignment.className}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, className: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              >
                <option>XII MIPA 1</option>
                <option>XII MIPA 2</option>
                <option>XI MIPA 1</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-1">Tenggat Waktu (Deadline)</label>
              <input
                type="text"
                value={newAssignment.dueDate}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, dueDate: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Petunjuk Pengerjaan</label>
            <textarea
              rows={3}
              value={newAssignment.description}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
              placeholder="Jelaskan format pengumpulan, syarat teknis..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddAssignmentOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" size="sm">
              Terbitkan Tugas
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit Nilai Siswa */}
      <Modal
        isOpen={!!selectedStudentForScore}
        onClose={() => setSelectedStudentForScore(null)}
        title="Input & Perbarui Nilai Siswa"
        description={`Siswa: ${selectedStudentForScore?.name} (${selectedStudentForScore?.className})`}
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Nilai Rata-rata Akhir (0 - 100):</label>
            <input
              type="number"
              min={0}
              max={100}
              value={tempScore}
              onChange={(e) => setTempScore(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700 text-sm font-bold"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedStudentForScore(null)}
            >
              Batal
            </Button>
            <Button size="sm" onClick={handleSaveScore}>
              Simpan Nilai
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Broadcast WhatsApp Orang Tua */}
      <Modal
        isOpen={isBroadcastWaOpen}
        onClose={() => setIsBroadcastWaOpen(false)}
        title="Siaran Pesan WhatsApp ke Wali Murid"
        description="Pesan ini akan otomatis disiapkan untuk disebarkan ke grup wali murid kelas XII MIPA 1."
      >
        <div className="space-y-3 text-xs">
          <div>
            <label className="font-semibold block mb-1">Pesan Siaran:</label>
            <textarea
              rows={4}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Tulis informasi untuk orang tua siswa (contoh: jadwal pertemuan wali murid, batas pengumpulan tugas fisika)..."
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsBroadcastWaOpen(false)}
            >
              Batal
            </Button>
            <Button size="sm" variant="gold" onClick={handleBroadcastWhatsApp}>
              <Send className="w-3.5 h-3.5 mr-1" /> Buka WhatsApp & Kirim
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

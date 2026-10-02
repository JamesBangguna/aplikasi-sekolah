export type UserRole = "KEPALA_SEKOLAH" | "GURU" | "ORANG_TUA";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title?: string; // e.g. "Kepala Sekolah", "Guru Fisika & Wali Kelas XII MIPA 1", "Orang Tua Siswa"
  phone: string;
  extraInfo?: {
    nip?: string;
    studentName?: string;
    studentClass?: string;
    studentNisn?: string;
  };
}

export interface Student {
  id: string;
  nisn: string;
  name: string;
  classId: string;
  className: string;
  gender: "L" | "P";
  parentName: string;
  parentPhone: string;
  attendanceRate: number; // percentage
  averageScore: number;
  status: "Aktif" | "Cuti" | "Alumni";
}

export interface Teacher {
  id: string;
  nip: string;
  name: string;
  subject: string;
  assignedClasses: string[];
  attendanceRate: number;
  performanceScore: number; // e.g. 94 / 100
  supervisionRating: number; // 1 - 5
  notes: string;
  email: string;
  phone: string;
  status: "Aktif" | "Tugas Luar" | "Cuti";
}

export interface Staff {
  id: string;
  nip: string;
  name: string;
  role: "Tata Usaha" | "Laboran" | "Pustakawan" | "Security" | "IT Support";
  shift: "Pagi" | "Siang" | "Normal";
  attendanceToday: "Hadir" | "Izin" | "Sakit" | "Tugas Luar";
  taskProgress: number; // %
}

export interface SchoolClass {
  id: string;
  name: string;
  grade: "X" | "XI" | "XII";
  major: "MIPA" | "IPS" | "Bahasa";
  homeroomTeacher: string;
  totalStudents: number;
  room: string;
}

export interface TeachingSchedule {
  id: string;
  day: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";
  time: string;
  className: string;
  subject: string;
  room: string;
  status: "Selesai" | "Sedang Berlangsung" | "Akan Datang";
}

export interface LearningMaterial {
  id: string;
  title: string;
  subject: string;
  className: string;
  type: "PDF" | "Video" | "Link" | "Dokumen";
  sizeOrDuration: string;
  uploadDate: string;
  downloads: number;
  url: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  totalSubmissions: number;
  gradedSubmissions: number;
  totalStudents: number;
  status: "Aktif" | "Perlu Dinilai" | "Selesai";
  description: string;
}

export interface StudentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: "Dinilai" | "Belum Dinilai" | "Terlambat";
  score?: number;
  feedback?: string;
  fileUrl?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  status: "Hadir" | "Sakit" | "Izin" | "Alpa";
  note?: string;
}

export interface GradeItem {
  id: string;
  subject: string;
  teacher: string;
  kkm: number;
  tugas: number;
  uts: number;
  uas: number;
  nilaiAkhir: number;
  predikat: "A" | "B" | "C" | "D";
  catatan: string;
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  date: string;
  target: "Semua" | "Guru" | "Orang Tua" | "Siswa";
  priority: "Biasa" | "Penting" | "Mendesak";
  content: string;
  author: string;
}

export interface SchoolNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "izin" | "nilai" | "kehadiran" | "akademik" | "keuangan";
  read: boolean;
  roleTarget: UserRole;
}

export interface RppItem {
  id: string;
  title: string;
  subject: string;
  grade: string;
  semester: "Ganjil" | "Genap";
  status: "Terverifikasi" | "Draft" | "Perlu Revisi";
  alokasiWaktu: string;
}

export interface StudentChildProfile {
  id: string;
  name: string;
  nisn: string;
  className: string;
  avatar: string;
  homeroomTeacher: string;
  attendanceToday: string;
  classRank: string;
  gpa: number;
  homeroomNotes: string;
}

export interface StudentGradeItem {
  subject: string;
  score: number;
  predicate: string;
  classAverage: number;
  feedback: string;
}

export interface FeeBill {
  id: string;
  title: string;
  category: string;
  amount: number;
  dueDate: string;
  status: "Lunas" | "Belum Lunas";
  paidDate?: string;
}


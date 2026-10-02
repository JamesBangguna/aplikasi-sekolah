import React from "react";
import { SCHOOL_INFO } from "../../data/mockData";
import { GraduationCap, Mail, Phone, MapPin, Instagram, Youtube, Facebook, ArrowUp } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function Footer() {
  const { setTargetRoleForLogin, setIsLoginModalOpen } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-amber-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-white block">
                  {SCHOOL_INFO.name}
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  {SCHOOL_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Lembaga pendidikan unggulan terakreditasi A berwawasan global yang membina potensi intelektual, kecakapan riset, dan keluhuran budi pekerti calon pemimpin bangsa.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com`}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400/60 hover:text-amber-400 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://youtube.com`}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400/60 hover:text-amber-400 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://facebook.com`}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400/60 hover:text-amber-400 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Tautan Cepat
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => scrollToSection("beranda")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("tentang")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Tentang & Sejarah
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("program")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Program Unggulan
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimoni")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Testimoni
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Tanya Jawab (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("kontak")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Kontak & Lokasi
                </button>
              </li>
            </ul>
          </div>

          {/* Portal Login Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Portal Akademik
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setTargetRoleForLogin("KEPALA_SEKOLAH");
                    setIsLoginModalOpen(true);
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  Portal Kepala Sekolah
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTargetRoleForLogin("GURU");
                    setIsLoginModalOpen(true);
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  Portal Guru & Modul Ajar
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTargetRoleForLogin("ORANG_TUA");
                    setIsLoginModalOpen(true);
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  Portal Monitoring Orang Tua
                </button>
              </li>
              <li>
                <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full inline-block mt-1">
                  Server Online • SIADIK v2.6
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Sekretariat
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WA: {SCHOOL_INFO.whatsappFormatted}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{SCHOOL_INFO.email}</span>
              </p>
              <p className="text-slate-500 pt-1">
                Jam Operasional: {SCHOOL_INFO.operatingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {SCHOOL_INFO.name}. Hak Cipta Dilindungi Undang-Undang.
          </div>

          <div className="flex items-center gap-4">
            <span>Sistem Informasi Akademik & PPDB Digital</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

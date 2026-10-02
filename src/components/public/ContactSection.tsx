import React, { useState } from "react";
import { SCHOOL_INFO } from "../../data/mockData";
import { Button } from "../ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    category: "Informasi PPDB",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Nama lengkap wajib diisi";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Masukkan alamat email yang valid";
    }
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 8) {
      errs.whatsapp = "Nomor WhatsApp aktif wajib diisi";
    }
    if (!formData.message.trim() || formData.message.length < 5) {
      errs.message = "Pesan minimal 5 karakter";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);

    // Format pre-filled WhatsApp message
    const waText = encodeURIComponent(
      `*Halo Admin PPDB & Informasi ${SCHOOL_INFO.name}*\n\n` +
        `Saya ingin berkonsultasi:\n` +
        `• *Nama*: ${formData.name}\n` +
        `• *Email*: ${formData.email}\n` +
        `• *No. WA*: ${formData.whatsapp}\n` +
        `• *Kategori*: ${formData.category}\n\n` +
        `*Pesan / Pertanyaan*:\n"${formData.message}"\n\n` +
        `Mohon informasi lebih lanjut. Terima kasih!`
    );

    const waUrl = `https://wa.me/${SCHOOL_INFO.whatsapp}?text=${waText}`;

    // Open WhatsApp in a new tab
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 600);
  };

  return (
    <section id="kontak" className="py-20 sm:py-28 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: School Contact & Map info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Pusat Komunikasi
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
                Hubungi Kami & Kunjungi Kampus
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base mt-3 leading-relaxed">
                Tim administrasi dan sekretariat PPDB kami siap melayani konsultasi pendaftaran, tur kampus, dan program beasiswa setiap hari kerja.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Alamat Kampus</div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">{SCHOOL_INFO.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">WhatsApp & Telepon Resmi</div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                    WhatsApp: {SCHOOL_INFO.whatsappFormatted} <br />
                    Kantor: {SCHOOL_INFO.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Jam Operasional Layanan</div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">{SCHOOL_INFO.operatingHours}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form with WhatsApp Integration */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Kirim Pertanyaan / Form Minat PPDB
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Isi formulir di bawah ini. Sistem akan langsung mengarahkan Anda ke percakapan WhatsApp resmi kami dengan pesan otomatis terstruktur.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                    Formulir Berhasil Dikirim!
                  </h4>
                  <p className="text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
                    Jendela WhatsApp sedang dibuka. Jika jendela chat belum terbuka secara otomatis, silakan klik tombol di bawah ini:
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="gold"
                      onClick={() => {
                        const waText = encodeURIComponent(
                          `Halo ${SCHOOL_INFO.name}, saya ${formData.name} ingin menanyakan ${formData.category}.`
                        );
                        window.open(`https://wa.me/${SCHOOL_INFO.whatsapp}?text=${waText}`, "_blank");
                      }}
                      className="font-semibold"
                    >
                      Buka WhatsApp Sekarang <ExternalLink className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Nama Lengkap Calon Siswa / Orang Tua *
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Hendra Wijaya"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                          errors.name
                            ? "border-red-500 focus:ring-red-400"
                            : "border-slate-200 dark:border-slate-700 focus:ring-blue-500"
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Alamat Email Aktif *
                      </label>
                      <input
                        type="email"
                        placeholder="nama@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                          errors.email
                            ? "border-red-500 focus:ring-red-400"
                            : "border-slate-200 dark:border-slate-700 focus:ring-blue-500"
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        No. WhatsApp (Aktif) *
                      </label>
                      <input
                        type="tel"
                        placeholder="081234567890"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                          errors.whatsapp
                            ? "border-red-500 focus:ring-red-400"
                            : "border-slate-200 dark:border-slate-700 focus:ring-blue-500"
                        }`}
                      />
                      {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Kategori Konsultasi
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Informasi PPDB 2026/2027</option>
                        <option>Beasiswa Prestasi & Sains</option>
                        <option>Kurikulum & Asrama (Boarding)</option>
                        <option>Konsultasi Biaya & Administrasi</option>
                        <option>Kemitraan & Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Pesan / Pertanyaan Anda *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tuliskan pertanyaan atau kebutuhan konsultasi Anda secara lengkap..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                        errors.message
                          ? "border-red-500 focus:ring-red-400"
                          : "border-slate-200 dark:border-slate-700 focus:ring-blue-500"
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
                  >
                    <Send className="w-4 h-4" />
                    Kirim & Buka Chat WhatsApp Otomatis
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

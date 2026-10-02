import React, { useState } from "react";
import { SCHOOL_INFO } from "../../data/mockData";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const sendWa = (textToSend?: string) => {
    const text = encodeURIComponent(
      textToSend ||
        `Halo Sekretariat ${SCHOOL_INFO.name}, saya ingin berkonsultasi mengenai informasi sekolah dan pendaftaran.`
    );
    window.open(`https://wa.me/${SCHOOL_INFO.whatsapp}?text=${text}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Bubble Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            className="mb-3 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm leading-tight">
                    WhatsApp Resmi Sekolah
                  </div>
                  <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Online • Respon Cepat
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-950 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                Halo! Ada yang bisa kami bantu seputar pendaftaran siswa baru, beasiswa, atau sistem pemantauan belajar siswa?
              </div>

              {/* Quick Prompt Pills */}
              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() =>
                    sendWa("Halo, saya ingin menanyakan jadwal dan alur pendaftaran PPDB.")
                  }
                  className="w-full text-left p-2 rounded-lg border border-emerald-500/30 hover:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 transition-colors"
                >
                  📅 Tanya Jadwal PPDB & Syarat Masuk
                </button>
                <button
                  onClick={() =>
                    sendWa("Halo, saya ingin menanyakan ketersediaan beasiswa prestasi.")
                  }
                  className="w-full text-left p-2 rounded-lg border border-emerald-500/30 hover:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 transition-colors"
                >
                  🏆 Tanya Beasiswa Jalur Prestasi / OSN
                </button>
              </div>

              {/* Custom Input */}
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ketik pesan Anda..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customMsg.trim()) {
                      sendWa(customMsg);
                    }
                  }}
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  onClick={() => sendWa(customMsg || undefined)}
                  className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Hubungi kami di WhatsApp"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="text-sm font-semibold hidden sm:inline-block">
          Chat WhatsApp
        </span>
      </button>
    </div>
  );
}

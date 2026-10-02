import React from "react";
import { motion } from "motion/react";
import { SCHOOL_PROGRAMS } from "../../data/mockData";
import { Atom, Globe2, Briefcase, HeartHandshake, CheckCircle, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

export function ProgramsSection() {
  const icons = [Atom, Briefcase, Globe2, HeartHandshake];

  const handleConsultClick = (progTitle: string) => {
    const contactEl = document.getElementById("kontak");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="program" className="py-20 sm:py-28 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Kurikulum & Minat Bakat
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Program Pendidikan Unggulan
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Didesain khusus untuk menggali potensi unik setiap siswa melalui pendekatan diferensiasi belajar dan fasilitas mutakhir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCHOOL_PROGRAMS.map((prog, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 p-6 flex flex-col justify-between hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${prog.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 mb-2">
                    {prog.badge}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {prog.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Kurikulum Terpadu
                  </span>
                  <button
                    onClick={() => handleConsultClick(prog.title)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    Konsultasi <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

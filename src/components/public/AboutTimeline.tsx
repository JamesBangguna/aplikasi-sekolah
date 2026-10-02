import React from "react";
import { motion } from "motion/react";
import { SCHOOL_INFO, SCHOOL_TIMELINE } from "../../data/mockData";
import { CheckCircle2, Target, Compass, Sparkles, Building2, Globe, HeartHandshake } from "lucide-react";

export function AboutTimeline() {
  return (
    <section id="tentang" className="py-20 sm:py-28 bg-slate-50/50 dark:bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Dedikasi Pendidikan Berkualitas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Sejarah & Perjalanan Menuju Keunggulan
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Sejak didirikan pada tahun {SCHOOL_INFO.establishedYear}, {SCHOOL_INFO.name} terus bertransformasi menjadi barometer pendidikan modern di Indonesia.
          </p>
        </div>

        {/* Visi Misi Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-5 shadow-md shadow-blue-600/30">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Visi Sekolah
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              "Menjadi pusat keunggulan pendidikan terdepan di Asia Tenggara yang mencetak generasi berkarakter luhur, cerdas holistik, berjiwa entrepreneur, dan adaptif terhadap kemajuan sains & teknologi global."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mb-5 shadow-md shadow-amber-500/30">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Misi Strategis
            </h3>
            <ul className="space-y-2.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Menyelenggarakan pembelajaran berbasis riset, logika kritis, dan pemanfaatan teknologi digital mutakhir.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Menanamkan adab, integritas moral, kepemimpinan profetik, serta kecintaan mendalam pada budaya bangsa.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Membangun jejaring kolaborasi akademik internasional dengan universitas top dunia.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Interactive Journey Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Milestone & Jejak Prestasi
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Perjalanan dedikasi kami membangun ekosistem pendidikan berstandar dunia
            </p>
          </div>

          <div className="relative border-l-2 border-blue-200 dark:border-blue-900/60 ml-4 md:ml-32 space-y-12 pb-4">
            {SCHOOL_TIMELINE.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-6 md:pl-10 group"
              >
                {/* Year Marker Badge on the left for md screens */}
                <div className="hidden md:flex absolute -left-32 top-0.5 w-24 text-right justify-end">
                  <span className="text-base font-extrabold text-blue-700 dark:text-amber-400">
                    {item.year}
                  </span>
                </div>

                {/* Bullet Node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-blue-600 dark:border-amber-400 group-hover:scale-125 transition-transform" />

                {/* Content Box */}
                <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="md:hidden inline-block mb-1 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-amber-300 text-xs font-bold">
                    {item.year}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

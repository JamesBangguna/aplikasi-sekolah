import React from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { MarqueeSection } from "./MarqueeSection";
import { AboutTimeline } from "./AboutTimeline";
import { ProgramsSection } from "./ProgramsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { FaqSection } from "./FaqSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutTimeline />
        <ProgramsSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

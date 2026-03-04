import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import PersonalStatement from "@/components/sections/PersonalStatement";
import Philosophy from "@/components/sections/Philosophy";
import Experience from "@/components/sections/Experience";
import SkillsExpertise from "@/components/sections/SkillsExpertise";
import Works from "@/components/sections/Works";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navigation />
      <div className="relative z-10 flex flex-col">
        <Hero />
        <PersonalStatement />
        <Philosophy />
        <Experience />
        <SkillsExpertise />
        <Works />
        <Testimonials />
        <Contact />
      </div>
    </main>
  );
}

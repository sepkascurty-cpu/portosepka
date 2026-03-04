"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Shield, Cpu, Globe, Brain } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PersonalStatement = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main text animation
      gsap.from(".statement-text p", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".statement-text",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Card animation
      gsap.from(cardRef.current, {
        opacity: 0,
        x: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Hover effect for card
      const card = cardRef.current;
      if (card) {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const xc = rect.width / 2;
          const yc = rect.height / 2;
          
          const dx = x - xc;
          const dy = y - yc;
          
          gsap.to(card, {
            rotationY: dx / 10,
            rotationX: -dy / 10,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen py-32 bg-[#080808] overflow-hidden flex items-center border-y border-white/5"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-guardian-sky/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-jesko-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="statement-text space-y-8 z-10">
          <div className="space-y-4">
            <span className="text-jesko-accent font-mono text-xs tracking-[0.3em] uppercase block">Personal Vision</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              ENGINEERING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-guardian-sky to-white">TRUSTED ARCHITECTURE</span>
            </h2>
          </div>

          <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
            <p>
              I am building my path at the intersection of <span className="text-white font-medium italic">Cyber Security</span>, 
              <span className="text-white font-medium italic">Web3</span>, 
              <span className="text-white font-medium italic">Artificial Intelligence</span>, and modern IT systems.
            </p>
            
            <p>
              In Cyber Security, I focus on understanding how systems fail and how they are defended. 
              I study SIEM fundamentals, IDS/IPS detection, SOC workflows, and incident response processes. 
              I analyze attack patterns using MITRE ATT&CK and apply structured defense principles like Zero Trust and Least Privilege.
            </p>

            <p className="text-guardian-sky font-medium">
              I develop awareness of Red Team techniques and Blue Team operations —
              not to attack, but to engineer stronger defensive architecture.
            </p>

            <p>
              In Web3, I explore smart contract security, on-chain transaction analysis, wallet security, and decentralized system risks.
            </p>

            <p>
              In AI and IT infrastructure, I am interested in anomaly detection, automation in security operations, and secure system design.
            </p>

            <p className="text-white/80 border-l-2 border-jesko-accent pl-6 py-2 italic font-serif">
              "I am not chasing trends. I am building structured knowledge in security, decentralized systems, and intelligent technology — step by step, with long-term focus."
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex justify-center perspective-1000">
          <div 
            ref={cardRef}
            className="group relative w-80 md:w-96 aspect-[3/4] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-guardian-sky/20"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Image container */}
            <div className="absolute inset-0 z-0 scale-105 group-hover:scale-110 transition-transform duration-700">
              <Image 
                src="/profile.jpg" 
                alt="Sepka Rahmadhani" 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 z-10 translate-z-20">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white tracking-tight">Sepka Rahmadhani</h3>
                <p className="text-guardian-sky font-mono text-xs uppercase tracking-widest">Security Researcher • Web3 Builder</p>
              </div>
              
              <div className="mt-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <Shield size={18} className="text-guardian-sky" />
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <Globe size={18} className="text-white/60" />
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <Brain size={18} className="text-jesko-accent" />
                </div>
              </div>
            </div>

            {/* Animated border/glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-guardian-sky/20 to-jesko-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalStatement;

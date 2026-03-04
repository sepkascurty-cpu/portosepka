"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Globe, Brain, Cpu, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  {
    category: "Cyber Security",
    icon: Shield,
    color: "text-guardian-sky",
    items: [
      "SIEM Fundamentals & Log Analysis",
      "IDS/IPS Concepts",
      "SOC Workflow Understanding",
      "MITRE ATT&CK Mapping",
      "Threat Modeling Basics",
      "Incident Response Awareness",
      "Zero Trust & Least Privilege Principles"
    ]
  },
  {
    category: "Web3 & Blockchain",
    icon: Globe,
    color: "text-jesko-accent",
    items: [
      "Smart Contract Security Fundamentals",
      "Wallet & Key Management Awareness",
      "On-chain Transaction Analysis",
      "DeFi Risk Surface Understanding",
      "Basic Blockchain Architecture"
    ]
  },
  {
    category: "Artificial Intelligence",
    icon: Brain,
    color: "text-white",
    items: [
      "AI for Anomaly Detection",
      "Behavioral Pattern Analysis",
      "Automation in Security Operations",
      "Basic Machine Learning Concepts"
    ]
  },
  {
    category: "IT & Infrastructure",
    icon: Cpu,
    color: "text-gray-400",
    items: [
      "Network Fundamentals (TCP/IP, Segmentation)",
      "Authentication & Access Control",
      "System Hardening Concepts",
      "Basic Cloud Security Awareness",
      "Secure Configuration Principles"
    ]
  }
];

const logos = [
  "Splunk", "CrowdStrike", "SentinelOne", "Metamask", "Ethereum", "Solidity", 
  "Python", "TensorFlow", "PyTorch", "AWS", "Azure", "Docker", "Kubernetes"
];

const LogoLoop = ({ isMounted }: { isMounted: boolean }) => {
  const loopRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isMounted) return;

    let ctx = gsap.context(() => {
      const loop = loopRef.current;
      if (!loop) return;

      const totalWidth = loop.scrollWidth / 2;
      
      gsap.to(loop, {
        x: -totalWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }, loopRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <div className={`relative w-full overflow-hidden py-10 border-y border-white/5 bg-white/[0.01] transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      
      <div ref={loopRef} className="flex whitespace-nowrap gap-16 items-center">
        {[...logos, ...logos].map((logo, i) => (
          <span 
            key={i} 
            className="text-gray-500 font-mono text-xl tracking-tighter uppercase opacity-50 hover:opacity-100 hover:text-white transition-all cursor-default"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsExpertise = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Initialize cards to be slightly visible to avoid blank screen
      gsap.set(".skill-card", { opacity: 0, y: 30 });

      gsap.to(".skill-card", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skill-grid",
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => ScrollTrigger.refresh(),
        },
      });

      // Global refresh
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section 
      ref={containerRef} 
      id="skills" 
      className={`relative py-32 bg-[#050505] overflow-hidden border-b border-white/5 transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 space-y-4">
          <span className="text-jesko-accent font-mono text-xs tracking-[0.3em] uppercase block">Technical Stack</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            SKILLS & <span className="text-guardian-sky">EXPERTISE</span>
          </h2>
        </div>

        <div className="skill-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {skills.map((skill, i) => (
            <div 
              key={i} 
              className="skill-card group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 hover:bg-white/[0.04]"
            >
              <skill.icon className={`w-8 h-8 ${skill.color} mb-6 transition-transform group-hover:scale-110 duration-500`} />
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">{skill.category}</h3>
              <ul className="space-y-4">
                {skill.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${skill.color} opacity-40`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <LogoLoop isMounted={isMounted} />
    </section>
  );
};

export default SkillsExpertise;

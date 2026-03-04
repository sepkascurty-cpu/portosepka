"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink, Shield, Layers, Box, Terminal } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        title: "Network Lab Simulation",
        role: "Lead Security Architect",
        description: "A virtualized network environment for simulating attack vectors and defense strategies. Includes configured firewalls, IDS/IPS, and honeypots.",
        tech: ["Cisco Packet Tracer", "GNS3", "Python", "Snort"],
        icon: Shield,
        color: "from-guardian-dark/20 to-transparent"
    },
    {
        title: "VulnWeb Testing Suite",
        role: "Full Stack Security Engineer",
        description: "Custom-built vulnerable web application for practicing OWASP Top 10 exploitation and remediation techniques.",
        tech: ["React", "Express", "Docker", "Burp Suite"],
        icon: Layers,
        color: "from-guardian-deep/20 to-transparent"
    },
    {
        title: "Smart Contract Auditor",
        role: "Blockchain Researcher",
        description: "Automated analysis tool for detecting common reentrancy and overflow vulnerabilities in Solidity smart contracts.",
        tech: ["Solidity", "Hardhat", "TypeScript", "Ethers.js"],
        icon: Box,
        color: "from-guardian-slate/20 to-transparent"
    }
];

const Projects = () => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
                gsap.set(card, { opacity: 0, scale: 0.95, y: 30 });
                gsap.to(card, {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                });
            });

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="projects" className="relative py-32 bg-[#050505] px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-24">
                <div className="space-y-4">
                    <span className="text-jesko-accent font-mono text-xs tracking-[0.3em] uppercase">The Portfolio</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white">FEATURED WORK</h2>
                </div>
                <div className="space-y-12">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card group relative opacity-100 will-change-transform">
                            <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl -z-10`} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl hover:border-white/10 transition-colors">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <project.icon className="w-10 h-10 text-guardian-sky" />
                                            <span className="text-jesko-accent font-mono text-xs tracking-widest uppercase">{project.role}</span>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h3>
                                        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">{project.description}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-gray-400">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40 group-hover:scale-[1.02] transition-transform duration-700">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                        <Terminal className="w-24 h-24 text-white" />
                                    </div>
                                    <div className="absolute bottom-6 right-6 flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        <button className="p-3 rounded-full bg-white text-black hover:bg-jesko-accent hover:text-black transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors">
                                            <Github className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

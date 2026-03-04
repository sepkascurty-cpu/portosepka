"use client";

import { useLayoutEffect, useRef } from "react";
import { Shield, Lock, Globe, Brain, Database } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
    { icon: Shield, title: "Cyber Security Fundamentals", desc: "Mastery in core principles: CIA triad, network security, and cryptographic foundations.", color: "from-guardian-dark to-guardian-sky" },
    { icon: Lock, title: "Threat Modeling", desc: "Identifying and mitigating potential vulnerabilities before they can be exploited.", color: "from-[#0A4174] to-[#7BBDE8]" },
    { icon: Globe, title: "Web App Security", desc: "Specialized in OWASP top 10, penetration testing, and secure SDLC practices.", color: "from-guardian-deep to-guardian-slate" },
    { icon: Brain, title: "AI System Security", desc: "Securing machine learning pipelines and protecting AI models from adversarial attacks.", color: "from-guardian-dark to-jesko-accent" },
    { icon: Database, title: "Blockchain Security Awareness", desc: "Analyzing smart contracts and decentralized protocols for systemic risks.", color: "from-guardian-slate to-white" }
];

const Expertise = () => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".capability-card");
            cards.forEach((card, i) => {
                gsap.set(card, { opacity: 0, y: 40, scale: 0.98 });
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    delay: i * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    }
                });
            });

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="expertise" className="relative py-32 px-4 bg-[#050505]">
            <div className="max-w-6xl mx-auto space-y-20">
                <div className="text-center space-y-4">
                    <span className="text-jesko-accent font-mono text-xs tracking-[0.3em] uppercase">The Framework</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white">CORE CAPABILITIES</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 capability-card-grid">
                    {capabilities.map((item, index) => (
                        <div key={index} className="capability-card group opacity-100 will-change-transform">
                            <div className="h-full p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-jesko-accent/40 transition-all duration-500 relative overflow-hidden">
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />
                                <item.icon className="w-10 h-10 text-guardian-sky mb-6 group-hover:text-jesko-accent group-hover:scale-110 transition-all duration-500" />
                                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">{item.desc}</p>
                                <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-8 h-[1px] bg-jesko-accent" />
                                    <span className="text-[10px] font-mono text-jesko-accent uppercase tracking-widest">Mastery Level A1</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;

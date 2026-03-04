"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Brain, Cpu, BarChart3 } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
    { icon: Shield, title: "Cyber Security", desc: "Foundational digital defense and cryptographic standards." },
    { icon: Brain, title: "AI Systems", desc: "Ensuring robustness and integrity in neural architectures." },
    { icon: Cpu, title: "Blockchain", desc: "Auditing decentralized logic and distributed infrastructure." },
    { icon: BarChart3, title: "Strategic Risk Analysis", desc: "Structured deconstruction of complex systemic vulnerabilities." }
];

const CapabilitiesGrid = () => {
    const containerRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".cap-card");
            cards.forEach((card, i) => {
                gsap.set(card, { opacity: 0, y: 40, scale: 0.98 });
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    delay: i * 0.15,
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

    const handleMouseEnter = (index: number) => {
        gsap.to(cardRefs.current[index], {
            scale: 1.05,
            rotateX: -5,
            rotateY: 5,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (index: number) => {
        gsap.to(cardRefs.current[index], {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            boxShadow: "0 0px 0px rgba(0,0,0,0)",
            duration: 0.4,
            ease: "power2.out"
        });
    };

    return (
        <section ref={containerRef} className="relative py-32 bg-[#E8DCC8] px-8 md:px-24">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="space-y-4 text-center md:text-left">
                    <span className="text-[#0F172A]/40 font-mono text-[10px] tracking-[0.5em] uppercase">Core Pillars</span>
                    <h2 className="text-4xl md:text-7xl font-black text-[#0F172A] tracking-tighter">CAPABILITIES</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 cap-grid perspective-[1000px]">
                    {capabilities.map((cap, i) => (
                        <div
                            key={i}
                            ref={el => { cardRefs.current[i] = el; }}
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={() => handleMouseLeave(i)}
                            className="cap-card group relative p-12 bg-white/40 border border-[#0F172A]/5 rounded-sm transition-shadow duration-300 backdrop-blur-sm cursor-pointer opacity-100 will-change-transform"
                        >
                            <div className="space-y-8 relative z-10">
                                <div className="w-16 h-16 rounded-full bg-[#0F172A] flex items-center justify-center text-[#E8DCC8]">
                                    <cap.icon className="w-8 h-8" />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-3xl font-bold text-[#0F172A] tracking-tighter uppercase">{cap.title}</h4>
                                    <p className="text-lg text-[#0F172A]/60 leading-relaxed font-light">{cap.desc}</p>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#0F172A]/20" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-12 left-12 font-mono text-[8px] text-[#0F172A]/20 tracking-[0.5em] uppercase">
                SCENE_05 / CAPABILITIES_MATRIX
            </div>
        </section>
    );
};

export default CapabilitiesGrid;

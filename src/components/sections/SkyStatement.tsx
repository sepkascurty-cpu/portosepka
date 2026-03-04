"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SkyStatement = () => {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const skills = [
        {
            category: "Cyber Security",
            items: ["Threat Modeling", "Infrastructure Hardening", "Risk Assessment", "Security Architecture Design"]
        },
        {
            category: "Artificial Intelligence",
            items: ["Secure Automation", "AI Monitoring Systems", "Intelligent Detection Concepts", "Data Protection Integration"]
        },
        {
            category: "Web3 & Blockchain",
            items: ["Blockchain Fundamentals", "Smart Contract Ecosystem", "Crypto Infrastructure Awareness", "Decentralized System Research"]
        }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (textRef.current) {
                gsap.set(textRef.current, { opacity: 0, y: 30, scale: 0.98 });
                gsap.to(textRef.current, {
                    opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out",
                    scrollTrigger: { trigger: textRef.current, start: "top 85%", toggleActions: "play none none none" }
                });
            }

            const columns = gsap.utils.toArray<HTMLElement>(".skill-col");
            columns.forEach((col, i) => {
                gsap.set(col, { opacity: 0, y: 20, scale: 0.99 });
                gsap.to(col, {
                    opacity: 1, y: 0, scale: 1, duration: 1.2, delay: i * 0.2, ease: "power3.out",
                    scrollTrigger: { trigger: col, start: "top 85%", toggleActions: "play none none none" }
                });
            });

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="manifesto"
            className="relative py-[10vh] px-8 md:px-20 lg:px-28 overflow-hidden"
        >
            {/* Subtle vertical divider above */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.04))" }} />

            {/* Subtle radial ambient */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 30% at 50% 30%, rgba(255,255,255,0.01) 0%, transparent 70%)" }} />

            <div ref={textRef} className="max-w-4xl mb-16 opacity-100 will-change-transform">
                <h2 className="text-3xl md:text-6xl font-black leading-tight mb-8 uppercase tracking-tighter" style={{ color: "rgba(255,255,255,0.88)" }}>
                    Security is structure. <br />
                    Intelligence is leverage.
                </h2>
                <div className="max-w-2xl space-y-4">
                    <p className="text-base md:text-lg font-light" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                        My approach is not about restriction. It is about designing systems
                        that remain stable under growth and change.
                    </p>
                </div>
            </div>

            <div className="skill-grid grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
                {skills.map((skill, idx) => (
                    <div key={idx} className="skill-col space-y-5 opacity-100 will-change-transform">
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-[1px]" style={{ background: "rgba(255,255,255,0.1)" }} />
                            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                                {skill.category}
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {skill.items.map((item, i) => (
                                <li key={i} className="text-sm md:text-base font-light cursor-default transition-colors duration-300 hover:text-[#4A8B88]" style={{ color: "rgba(255,255,255,0.55)" }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="absolute top-8 left-8 md:left-20 text-[9px] font-mono tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>
                SCENE_03 / STRATEGIC_DECLARATION
            </div>
        </section>
    );
};

export default SkyStatement;

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Cpu, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const domains = [
    { icon: Brain, title: "AI Trust Engineering", desc: "Embedding security at the model layer. We build AI that is robust against influence, data poisoning, and adversarial manipulation.", label: "Next-Gen Defense" },
    { icon: Cpu, title: "Web3 Infrastructure", desc: "Hardening the decentralized web. Smart contract auditing and protocol security for the future of finance and ownership.", label: "Decentralized Trust" }
];

const Web3Section = () => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const rows = gsap.utils.toArray<HTMLElement>(".domain-row");
            rows.forEach((row, i) => {
                gsap.set(row, { x: 50, opacity: 0, scale: 0.98 });
                gsap.to(row, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: row,
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
        <section ref={containerRef} id="web3" className="relative py-32 bg-[#050505] px-4 overflow-hidden border-y border-white/5">
            <div className="max-w-6xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-4">
                        <span className="text-jesko-accent font-mono text-xs tracking-[0.3em] uppercase">The Intersection</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white">LINKED DOMAINS</h2>
                    </div>
                    <p className="text-gray-400 max-w-md text-lg italic border-r border-jesko-accent pr-6">
                        &quot;Security meets Web3 & AI: The convergence of intelligence and decentralization.&quot;
                    </p>
                </div>
                <div className="space-y-4">
                    {domains.map((domain, index) => (
                        <div key={index} className="domain-row group opacity-100 will-change-transform">
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 md:p-16 rounded-[2.5rem] md:rounded-[40px] bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700">
                                <div className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-black border border-white/10 group-hover:border-jesko-accent/50 transition-colors shadow-2xl shrink-0">
                                    <domain.icon className="w-10 h-10 text-guardian-sky group-hover:text-jesko-accent transition-colors" />
                                </div>
                                <div className="flex-1 space-y-4 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <h3 className="text-3xl font-bold text-white tracking-tight">{domain.title}</h3>
                                        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-jesko-accent uppercase tracking-widest w-fit mx-auto md:mx-0">{domain.label}</span>
                                    </div>
                                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl group-hover:text-gray-400 transition-colors">{domain.desc}</p>
                                </div>
                                <div className="hidden lg:block">
                                    <ShieldCheck className="w-16 h-16 text-white/5 group-hover:text-jesko-accent/20 transition-colors duration-700" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-jesko-accent/10 to-transparent -rotate-12 pointer-events-none" />
        </section>
    );
};

export default Web3Section;

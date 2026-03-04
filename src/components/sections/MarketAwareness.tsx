"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Terminal, Cpu, Database, Cloud, Network, Search, Lock } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const tools = [
    { icon: Shield, name: "Burp Suite", category: "AppSec" },
    { icon: Terminal, name: "Nmap", category: "Network" },
    { icon: Search, name: "Wireshark", category: "Analysis" },
    { icon: Database, name: "Metasploit", category: "Exploitation" },
    { icon: Cpu, name: "Hardhat", category: "Web3" },
    { icon: Lock, name: "OpenZeppelin", category: "Security" },
    { icon: Network, name: "Docker", category: "Infra" },
    { icon: Cloud, name: "Logstash", category: "Monitoring" }
];

const MarketAwareness = () => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const icons = gsap.utils.toArray<HTMLElement>(".tool-icon");
            icons.forEach((icon, i) => {
                gsap.set(icon, { scale: 0.5, opacity: 0, y: 20 });
                gsap.to(icon, {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: (i % 4) * 0.1 + Math.floor(i / 4) * 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: icon,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    }
                });
            });

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="market" className="relative py-32 bg-[#050505] px-4 overflow-hidden">
            <div className="max-w-4xl mx-auto space-y-20">
                <div className="text-center space-y-4">
                    <span className="text-jesko-accent font-mono text-xs tracking-[0.3em] uppercase">The Arsenal</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white">TECH & TOOLING</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 tool-grid">
                    {tools.map((tool, index) => (
                        <div key={index} className="tool-icon group flex flex-col items-center gap-4 opacity-100 will-change-transform">
                            <div className="w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center group-hover:border-jesko-accent/40 group-hover:bg-white/[0.02] transition-all duration-500 shadow-2xl relative">
                                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-jesko-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                <tool.icon className="w-8 h-8 text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                            <div className="text-center">
                                <span className="block text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">{tool.name}</span>
                                <span className="block text-[10px] font-mono text-jesko-accent tracking-widest uppercase">{tool.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketAwareness;

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const AboutPhilosophy = () => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const elements = gsap.utils.toArray<HTMLElement>(".phil-item");
            elements.forEach((el, i) => {
                gsap.set(el, { opacity: 0, y: 30, scale: 0.99 });
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    delay: i * 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    }
                });
            });

            gsap.to(".abstract-blob", {
                rotate: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-32 md:py-48 bg-[#080808] px-8 md:px-24 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                    <div className="space-y-4 phil-item opacity-100 will-change-transform">
                        <span className="text-accent-cyan font-mono text-[10px] tracking-[0.5em] uppercase opacity-50">Philosophy</span>
                        <h2 className="text-3xl md:text-5xl font-black text-off-white leading-tight">
                            Engineering <br /> Through Systems.
                        </h2>
                    </div>
                    <div className="space-y-8 text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl">
                        <p className="phil-item opacity-100 will-change-transform">Sepka Rahmadhani is a systems-focused technologist with primary expertise in <span className="text-off-white">Cyber Security</span>.</p>
                        <p className="phil-item opacity-100 will-change-transform">His work explores secure architectures across AI systems, decentralized technologies, and blockchain ecosystems.</p>
                        <p className="phil-item opacity-100 will-change-transform">He applies structured thinking, risk awareness, and long-term strategy to digital infrastructure.</p>
                    </div>
                    <div className="pt-8 flex items-center gap-6 phil-item opacity-100 will-change-transform">
                        <div className="w-12 h-px bg-accent-cyan/30" />
                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40">Tone: Engineered / Calm</span>
                    </div>
                </div>
                <div className="relative flex items-center justify-center">
                    <div className="w-64 h-64 md:w-96 md:h-96 border border-white/5 rounded-full abstract-blob flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-4 border border-accent-cyan/10 rounded-full" />
                        <div className="absolute inset-16 border border-white/5 rounded-full" />
                        <div className="w-32 h-32 bg-accent-cyan/5 blur-[80px] rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPhilosophy;

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const blocks = gsap.utils.toArray<HTMLElement>(".story-block");
            blocks.forEach((block, i) => {
                gsap.set(block, { opacity: 0, y: 30, scale: 0.99 });
                gsap.to(block, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    delay: i * 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: block,
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
        <section ref={containerRef} id="about" className="relative py-32 px-4 bg-[#050505] overflow-hidden">
            <div className="max-w-4xl mx-auto space-y-24">
                <div className="story-block space-y-6 opacity-100 will-change-transform">
                    <span className="text-jesko-accent font-mono text-xs tracking-[0.3em] uppercase">The Identity</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        I am Sepka Rahmadhani, a sentinel in the digital frontier, crafting
                        <span className="text-guardian-sky"> resilient architectures</span> that withstand the evolving landscape of cyber threats.
                    </h2>
                </div>
                <div className="story-block space-y-6 border-l border-white/10 pl-8 md:pl-12 opacity-100 will-change-transform">
                    <span className="text-jesko-accent font-mono text-xs tracking-[0.3em] uppercase">The Mission</span>
                    <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                        My expertise bridges the gap between traditional security fundamentals and the cutting edge of
                        <span className="text-white"> AI and Web3 infrastructure</span>. I dissect complex threat models to build
                        impenetrable systems.
                    </p>
                </div>
                <div className="story-block space-y-6 text-right opacity-100 will-change-transform">
                    <span className="text-jesko-accent font-mono text-xs tracking-[0.3em] uppercase">The Purpose</span>
                    <h3 className="text-3xl md:text-4xl font-semibold text-white/90">
                        In a world where intelligence is automated and finance is decentralized,
                        <span className="text-guardian-sky italic"> trust must be engineered.</span>
                    </h3>
                </div>
            </div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-guardian-dark/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
};

export default About;

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const FlyBySection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const objectRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1.2,
                }
            });

            // Fly-by object
            tl.fromTo(objectRef.current,
                { x: "-150%", y: "150%", rotate: -45, scale: 0.5 },
                { x: "150%", y: "-150%", rotate: -45, scale: 1.5, duration: 2, ease: "none" }
            );

            // Text reveals - Bulletproof scrub
            // We use safe starting opacity (0.2) and per-element logic if needed,
            // but for a scrub timeline like this, fromTo is okay as long as context reverts it.
            tl.fromTo(".reveal-item",
                { opacity: 0.2, x: -30, scale: 0.98 },
                { opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.3, ease: "power2.out" },
                0.5
            );

            // Motion blur
            tl.to(objectRef.current, {
                filter: "blur(4px)",
                duration: 0.2,
                repeat: 1,
                yoyo: true
            }, 0.8);

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[150vh] bg-charcoal-black flex flex-col justify-center px-8 md:px-24 overflow-hidden border-y border-white/5">
            <div
                ref={objectRef}
                className="absolute w-64 h-1 bg-gradient-to-r from-transparent via-accent-cyan to-transparent z-10 pointer-events-none blur-[1px] opacity-100"
                style={{ boxShadow: "0 0 40px rgba(0,229,255,0.4)" }}
            />

            <div className="max-w-4xl space-y-24 relative z-20">
                <div className="reveal-item space-y-2 opacity-100 will-change-transform">
                    <span className="text-accent-cyan font-mono text-[10px] tracking-[0.4em] uppercase">Phase 01</span>
                    <h3 className="text-4xl md:text-6xl font-black text-off-white">Cyber Security <br /> as foundation.</h3>
                </div>
                <div className="reveal-item space-y-2 ml-auto text-right opacity-100 will-change-transform">
                    <span className="text-accent-cyan font-mono text-[10px] tracking-[0.4em] uppercase">Phase 02</span>
                    <h3 className="text-4xl md:text-6xl font-black text-gray-500">AI as <br /> amplification.</h3>
                </div>
                <div className="reveal-item space-y-2 opacity-100 will-change-transform">
                    <span className="text-accent-cyan font-mono text-[10px] tracking-[0.4em] uppercase">Phase 03</span>
                    <h3 className="text-4xl md:text-6xl font-black text-off-white">Web3 as <br /> infrastructure.</h3>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-charcoal-black via-transparent to-charcoal-black pointer-events-none" />
        </section>
    );
};

export default FlyBySection;

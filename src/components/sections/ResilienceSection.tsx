"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ResilienceSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const objectRef = useRef<HTMLDivElement>(null);
    const leftBlockRef = useRef<HTMLDivElement>(null);
    const rightBlockRef = useRef<HTMLDivElement>(null);
    const accentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            tl.to(objectRef.current, {
                rotationY: 5,
                scale: 1.15,
                ease: "none",
            }, 0)
            .to(accentRef.current, {
                opacity: 0.6,
                boxShadow: "0 0 40px rgba(74,139,136,0.3), 0 0 80px rgba(74,139,136,0.15)",
                duration: 0.5,
            }, 0);

            tl.fromTo(leftBlockRef.current,
                { x: -120, scale: 0.95 },
                { x: 0, scale: 1, duration: 1, ease: "power2.out" },
                0.2
            )
            .fromTo(rightBlockRef.current,
                { x: 120, scale: 0.95 },
                { x: 0, scale: 1, duration: 1, ease: "power2.out" },
                0.4
            );

            gsap.to(accentRef.current, {
                boxShadow: "0 0 30px rgba(74,139,136,0.25), 0 0 60px rgba(74,139,136,0.1)",
                opacity: 0.5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="resilience"
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Subtle radial glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)" }} />

            {/* Architectural Core */}
            <div className="relative z-10 flex flex-col items-center justify-center perspective-[1500px]">
                <div
                    ref={objectRef}
                    className="relative w-40 h-[500px] md:w-56 md:h-[650px] flex items-center justify-center [transform-style:preserve-3d] [transform:rotateY(-5deg)_scale(0.95)]"
                >
                    {/* Matte dark shell */}
                    <div className="absolute inset-0 rounded-[40px] z-10" style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "inset 0 2px 30px rgba(0,0,0,0.3), 0 40px 100px rgba(0,0,0,0.2)",
                    }} />
                    {/* Accent energy line */}
                    <div
                        ref={accentRef}
                        className="absolute w-[2px] h-4/5 z-0 blur-[1px]"
                        style={{
                            background: "linear-gradient(to bottom, transparent, #4A8B88, transparent)",
                            boxShadow: "0 0 15px rgba(74,139,136,0.3)",
                            opacity: 0.3,
                        }}
                    />
                    <div className="absolute inset-y-8 left-6 w-[1px] z-20" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <div className="absolute inset-y-8 right-6 w-[1px] z-20" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <div className="absolute inset-x-10 top-12 h-[1px] z-20" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <div className="absolute inset-x-10 bottom-12 h-[1px] z-20" style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>
            </div>

            {/* Side Narrative Blocks */}
            <div className="absolute inset-0 flex items-center justify-between px-10 md:px-28 lg:px-40 pointer-events-none">
                <div ref={leftBlockRef} className="max-w-xs space-y-4 will-change-transform">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none" style={{ color: "rgba(255,255,255,0.88)" }}>
                        CORE <br /> ARCHITECTURE
                    </h2>
                    <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Designing layered protection for digital ecosystems.
                        Network security, monitoring logic, and structural hardening.
                    </p>
                </div>

                <div ref={rightBlockRef} className="max-w-xs space-y-4 text-right will-change-transform">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none" style={{ color: "rgba(255,255,255,0.88)" }}>
                        SYSTEM <br /> EVOLUTION
                    </h2>
                    <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Integrating AI-driven systems with decentralized infrastructure.
                        Exploring blockchain as future-ready architecture.
                    </p>
                </div>
            </div>

            {/* Footer symbols */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 text-[9px] font-mono tracking-[0.5em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
                <span>[ Security ]</span>
                <span>[ Intelligence ]</span>
                <span>[ Web3 ]</span>
            </div>
        </section>
    );
};

export default ResilienceSection;

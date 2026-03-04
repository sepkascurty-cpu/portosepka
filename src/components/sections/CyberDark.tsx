"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const CyberDark = () => {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const lines = gsap.utils.toArray<HTMLElement>(".vision-line");
            lines.forEach((line, i) => {
                gsap.set(line, { opacity: 0, y: 30, scale: 0.99 });
                gsap.to(line, {
                    opacity: 1, y: 0, scale: 1, duration: 1.4, delay: i * 0.3, ease: "power3.out",
                    scrollTrigger: { trigger: line, start: "top 85%", toggleActions: "play none none none" }
                });
            });

            const total = document.querySelector(".vision-total");
            if (total) {
                gsap.set(total, { opacity: 0, y: 40, scale: 0.96 });
                gsap.to(total, {
                    opacity: 1, y: 0, scale: 1, duration: 1.6, ease: "power3.out",
                    scrollTrigger: { trigger: total, start: "top 85%", toggleActions: "play none none none" }
                });
            }

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx2d = canvas.getContext("2d");
        if (!ctx2d) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            init();
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < 40; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    size: Math.random() * 1.5
                });
            }
        };

        const draw = () => {
            ctx2d.clearRect(0, 0, canvas.width, canvas.height);
            ctx2d.fillStyle = "rgba(255, 255, 255, 0.12)";
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx2d.beginPath();
                ctx2d.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx2d.fill();
            });
            animationFrameId = requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            id="vision"
            className="relative flex items-center justify-center overflow-hidden py-[10vh]"
            style={{ minHeight: "80vh" }}
        >
            {/* Subtle vertical divider above */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.04))" }} />

            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />

            <div className="relative z-10 max-w-4xl px-8 md:px-20 space-y-12">
                <div className="space-y-6">
                    <p className="vision-line text-xl md:text-2xl font-light tracking-[0.15em] uppercase opacity-100 will-change-transform" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Cyber Security as foundation.
                    </p>
                    <p className="vision-line text-xl md:text-2xl font-light tracking-[0.15em] uppercase opacity-100 will-change-transform" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Artificial Intelligence as acceleration.
                    </p>
                    <p className="vision-line text-xl md:text-2xl font-light tracking-[0.15em] uppercase opacity-100 will-change-transform" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Web3 as structural evolution.
                    </p>
                </div>

                <h2 className="vision-total text-3xl md:text-6xl font-black uppercase tracking-tighter leading-tight pt-8 opacity-100 will-change-transform" style={{ color: "rgba(255,255,255,0.88)" }}>
                    Engineering resilience <br /> for the digital future.
                </h2>
            </div>

            <div className="absolute top-8 right-8 md:right-20 text-[9px] font-mono tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.12)" }}>
                SCENE_05 / STRATEGIC_VISION
            </div>
        </section>
    );
};

export default CyberDark;

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, ShieldAlert, Zap, Lock } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const AIConnection = () => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const content = document.querySelector(".ai-content");
            if (content) {
                gsap.set(content, { opacity: 0, y: 30, scale: 0.98 });
                gsap.to(content, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: content,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    }
                });
            }

            const features = gsap.utils.toArray<HTMLElement>(".ai-feature");
            features.forEach((feat, i) => {
                gsap.set(feat, { scale: 0.9, opacity: 0, y: 20 });
                gsap.to(feat, {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: feat,
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
        <section ref={containerRef} id="ai" className="relative py-32 bg-[#050505] px-4 overflow-hidden border-b border-white/5">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="ai-content space-y-8 opacity-100 will-change-transform">
                    <div className="space-y-4">
                        <span className="text-jesko-accent font-mono text-xs tracking-[0.3em] uppercase">The Intelligence Layer</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            AI SYSTEM <br /><span className="text-guardian-sky">ROBUSTNESS</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                            As autonomous systems scale, the vulnerability surface expands. I focus on securing machine learning pipelines against adversarial attacks and model exploitation.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ai-feature-grid">
                        {[
                            { icon: ShieldAlert, title: "Model Defense", desc: "Adversarial training & filtering" },
                            { icon: Lock, title: "Data Integrity", desc: "Poisoning prevention" },
                            { icon: Zap, title: "Fast Inference", desc: "Low-latency security checks" },
                            { icon: Brain, title: "Secure LLMs", desc: "Prompt injection mitigation" },
                        ].map((item, i) => (
                            <div key={i} className="ai-feature p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-guardian-sky/30 transition-colors space-y-3 opacity-100 will-change-transform">
                                <item.icon className="w-6 h-6 text-guardian-sky" />
                                <h4 className="text-white font-bold tracking-tight">{item.title}</h4>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-guardian-sky/5 rounded-full blur-[120px] animate-pulse" />
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/5 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-guardian-sky/20 to-transparent opacity-30" />
                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-guardian-sky/20 border-dashed animate-[spin_20s_linear_infinite]" />
                        <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border border-jesko-accent/20 animate-[spin_15s_linear_infinite_reverse]" />
                        <Brain className="w-16 h-16 md:w-20 md:h-20 text-white relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                    </div>
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-jesko-accent animate-ping"
                            style={{
                                top: `${20 + Math.random() * 60}%`,
                                left: `${20 + Math.random() * 60}%`,
                                animationDuration: `${2 + Math.random() * 2}s`,
                                animationDelay: `${i * 0.5}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AIConnection;

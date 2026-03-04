"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ExternalLink } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const certifications = [
    {
        title: "Certified Ethical Hacking — Fundamentals",
        issuer: "EC-Council / Professional Body",
        year: "2025",
        desc: "Focused on penetration testing principles and vulnerability assessment methodology.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "AI Security Architecture",
        issuer: "Tech Academy / Open Learning",
        year: "2024",
        desc: "Designing secure model pipelines and protecting intelligent infrastructure.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Blockchain Defense Specialist",
        issuer: "Web3 Security Institute",
        year: "2024",
        desc: "Auditing smart contracts and securing decentralized network protocols.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"
    }
];

const CertificationShowcase = () => {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (titleRef.current) {
                gsap.set(titleRef.current, { opacity: 0, y: 30, scale: 0.98 });
                gsap.to(titleRef.current, {
                    opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none none" }
                });
            }

            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                gsap.set(card, { opacity: 0, y: 40, scale: 0.97 });
                gsap.to(card, {
                    opacity: 1, y: 0, scale: 1, duration: 1.2, delay: i * 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" }
                });
            });

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (index: number) => {
        gsap.to(cardRefs.current[index], {
            y: -12, boxShadow: "0 30px 60px rgba(0,0,0,0.3)", duration: 0.4, ease: "power2.out"
        });
        gsap.to(`.cert-img-${index}`, { scale: 1.1, duration: 0.6, ease: "power2.out" });
    };

    const handleMouseLeave = (index: number) => {
        gsap.to(cardRefs.current[index], {
            y: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", duration: 0.4, ease: "power2.out"
        });
        gsap.to(`.cert-img-${index}`, { scale: 1, duration: 0.6, ease: "power2.out" });
    };

    return (
        <section
            ref={containerRef}
            id="certifications"
            className="relative py-[10vh] px-8 md:px-20 lg:px-28 overflow-hidden"
        >
            {/* Subtle vertical divider above */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.04))" }} />

            <div className="max-w-6xl">
                <div ref={titleRef} className="mb-16 opacity-100 will-change-transform">
                    <span className="text-[10px] font-mono tracking-[0.5em] uppercase mb-4 block" style={{ color: "rgba(255,255,255,0.25)" }}>Verified Knowledge</span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter" style={{ color: "rgba(255,255,255,0.88)" }}>
                        CERTIFICATIONS & <br /> PROFESSIONAL DEVELOPMENT
                    </h2>
                    <p className="mt-5 font-light max-w-xl text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Continuous learning through industry-standard validations in security, AI, and decentralized architectures.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {certifications.map((cert, i) => (
                        <div
                            key={i}
                            ref={el => { cardRefs.current[i] = el }}
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={() => handleMouseLeave(i)}
                            className="group relative overflow-hidden flex flex-col p-6 transition-all duration-500 cursor-pointer opacity-100 will-change-transform"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.05)",
                                borderRadius: "2px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            }}
                        >
                            <div className="relative w-full aspect-[4/3] overflow-hidden mb-6" style={{ borderRadius: "2px" }}>
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className={`cert-img-${i} w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700`}
                                />
                                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)", mixBlendMode: "multiply" }} />
                            </div>

                            <div className="space-y-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Award className="w-4 h-4" style={{ color: "#4A8B88" }} />
                                    <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>{cert.issuer}</span>
                                </div>
                                <h3 className="text-lg font-bold leading-tight px-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                                    {cert.title}
                                </h3>
                                <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                                    {cert.desc}
                                </p>
                                <div className="pt-3 flex items-center justify-center gap-6">
                                    <span className="text-[10px] font-mono px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>{cert.year}</span>
                                    <ExternalLink className="w-3 h-3 transition-colors" style={{ color: "rgba(255,255,255,0.15)" }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-8 right-8 md:right-20 text-[9px] font-mono tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>
                SCENE_04 / VALIDATED_CREDENTIALS
            </div>
        </section>
    );
};

export default CertificationShowcase;

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlurReveal } from "../ui/BlurReveal";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const works = [
    { 
        id: "01", 
        title: "Certificate of Appreciation", 
        category: "Selective Service System", 
        desc: "Recognition of professional expertise and contributions to strengthening the agency's security efforts.",
        year: "2025",
        image: "dicoding-ai.jpg"
    },
    { 
        id: "02", 
        title: "SIMORE Security Monitoring", 
        category: "Cyber Security", 
        desc: "Security improvement and vulnerability patching for BASARNAS Province Bengkulu.",
        year: "2025",
        image: "simore-cert.jpg"
    },
    { 
        id: "03", 
        title: "BRIN Vulnerability Disclosure", 
        category: "Bug Bounty / Disclosure", 
        desc: "Appreciation certificate from Badan Riset dan Inovasi Nasional for ethical vulnerability reporting.",
        year: "2025",
        image: "dicoding-datascience.jpg"
    },
    { 
        id: "04", 
        title: "Belajar Penerapan Data Science dengan Microsoft Fabric", 
        category: "Dicoding Academy", 
        desc: "Data Science implementation and Microsoft Fabric competency.",
        year: "2026",
        image: "brin-cert.jpg"
    },
    { 
        id: "05", 
        title: "Belajar Dasar AI", 
        category: "Dicoding Academy", 
        desc: "Foundational Artificial Intelligence competency.",
        year: "2025",
        image: "selective-service-cert.jpg"
    },
    { 
        id: "06", 
        title: "Introduction to Financial Literacy", 
        category: "Dicoding Academy", 
        desc: "Foundational understanding of financial literacy systems and logic.",
        year: "2026",
        image: "/dicoding-financial.jpg"
    }
];

const Works = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!scrollContainerRef.current) return;

            // Wait a tick for images to load geometry
            setTimeout(() => {
                const getScrollAmount = () => {
                    if (!scrollContainerRef.current) return 0;
                    // Calculate exactly how much to move: the full width minus one viewport width
                    let scrollWidth = scrollContainerRef.current.offsetWidth;
                    return -(scrollWidth - window.innerWidth);
                };

                gsap.to(scrollContainerRef.current, {
                    x: getScrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: true,
                        pinSpacing: true,
                        scrub: 1,
                        start: "top top",
                        // Make the scrolling distance exactly equal to the width to move
                        end: () => `+=${scrollContainerRef.current?.offsetWidth || 0}`,
                        invalidateOnRefresh: true,
                        anticipatePin: 1
                    }
                });

                // Force GSAP to recalculate all DOM bounds since this was delayed by 100ms
                ScrollTrigger.refresh();
            }, 100);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="works" className="relative h-screen bg-black overflow-hidden flex items-center">
            
            {/* Background Accent */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.05] rounded-full blur-[120px] pointer-events-none" />

            <div className="absolute top-12 left-8 md:left-20 z-10 mix-blend-difference">
                <BlurReveal>
                    <h2 className="text-white text-sm font-jetbrains uppercase tracking-widest">( Selected Certificates & Works )</h2>
                </BlurReveal>
            </div>

            <div ref={scrollContainerRef} className="flex h-full items-center px-8 md:px-20 gap-16 md:gap-32 w-max">
                {works.map((work) => (
                    <div key={work.id} className="w-[85vw] md:w-[50vw] max-w-[650px] flex flex-col shrink-0">
                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/3] bg-[#0a0a0a] border border-white/5 overflow-hidden group rounded-sm shadow-2xl p-4 md:p-8 flex items-center justify-center">
                            <img 
                                src={work.image} 
                                alt={work.title}
                                className="w-full h-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 relative z-10"
                                onError={(e) => {
                                    // Hide broken image
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    // Show fallback pending message
                                    const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                                    if (fallback) fallback.style.display = 'flex';
                                }}
                            />
                            {/* Fallback if image not found */}
                            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center p-8 bg-[#0a0a0a] border border-white/5" style={{ display: 'none' }}>
                                <span className="text-white/40 font-jetbrains text-lg uppercase tracking-widest mb-4">Pending Upload</span>
                                <span className="text-white/20 text-xs max-w-xs leading-relaxed">Please place <br/><code className="text-white/50">{work.image.replace('/', '')}</code><br/> in your project's <code>public</code> folder to display this certificate.</span>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div>
                                <h3 className="text-white text-2xl md:text-3xl font-light">{work.title}</h3>
                                <p className="text-white/40 mt-3 max-w-md text-sm md:text-base leading-relaxed">{work.desc}</p>
                            </div>
                            <div className="flex flex-col text-right shrink-0">
                                <span className="text-white font-jetbrains text-xs uppercase tracking-widest opacity-60">{work.category}</span>
                                <span className="text-white/30 font-jetbrains text-xs mt-1">{work.year}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Works;

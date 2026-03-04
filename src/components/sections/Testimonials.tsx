"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BlurReveal } from "../ui/BlurReveal";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
    {
        quote: "Sosok yang sangat fokus dan serius di bidang cyber security. Setiap tugas dikerjakan dengan analisis yang matang, perhitungan risiko yang jelas, dan standar keamanan yang tinggi. Tidak pernah bekerja secara asal-asalan, sehingga kolaborasi terasa aman, terarah, dan profesional.",
        author: "Putri Amanda",
        role: "Influencer & Content Creator",
        image: "/testimony-1.jpg",
        rating: 5
    },
    {
        quote: "Working with Sepka in cybersecurity projects has been a strong experience. He is disciplined, detail-oriented, and always thinks in terms of risk assessment and mitigation. His structured mindset makes collaboration smooth and secure..",
        author: "Reza Mahendra",
        role: "Senior Developer @ Tech Solution",
        image: "/testimony-2.jpg",
        rating: 5
    },
    {
        quote: "Kerja bareng dia ini rasanya seperti memiliki sistem keamanan aktif 24 jam. Sedikit celah langsung terdeteksi, sedikit bug langsung ditangani sebelum jadi masalah besar. Terlihat perfeksionis dalam urusan risiko, tapi justru itu yang membuat sistem tetap solid dan aman.",
        author: "Ahsan Tulalit",
        role: "Product Manager @ Nexa Labs",
        image: "/testimony-3.jpg",
        rating: 5
    },
    {
        quote: "Kerja bareng Sepka tuh rasanya kayak punya alarm keamanan 24 jam. Sedikit celah langsung dianalisis, sedikit bug langsung dipatch. Kadang overthinking soal risk, tapi justru itu yang bikin sistem jadi aman banget.",
        author: "Kerlana Zulfa",
        role: "Digital Artist @ Creative Hub",
        image: "/testimony-4.jpg",
        rating: 5
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const animateTransition = contextSafe((index: number, direction: 'next' | 'prev' | 'direct') => {
        const xOffset = direction === 'next' ? -60 : direction === 'prev' ? 60 : 0;
        
        // Outgoing Animation
        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(index);
                // Incoming Animation - staggered for premium feel
                gsap.fromTo(".testimony-content > *", 
                    { opacity: 0, y: 30, filter: "blur(10px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "expo.out" }
                );
                gsap.fromTo(cardRef.current,
                    { x: -xOffset * 0.5, scale: 0.98 },
                    { x: 0, scale: 1, duration: 1.2, ease: "expo.out" }
                );
            }
        });

        tl.to(".testimony-content > *", {
            opacity: 0,
            y: -20,
            filter: "blur(8px)",
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.in"
        });

        tl.to(cardRef.current, {
            x: xOffset,
            scale: 0.98,
            duration: 0.6,
            ease: "power3.inOut"
        }, 0);
    });

    const nextTestimonial = () => {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        animateTransition(nextIndex, 'next');
    };

    const prevTestimonial = () => {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        animateTransition(prevIndex, 'prev');
        resetAutoplay();
    };

    const resetAutoplay = () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(nextTestimonial, 6000); // 6 seconds
    };

    useEffect(() => {
        autoplayRef.current = setInterval(nextTestimonial, 6000);
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [currentIndex]); // Re-run when index changes to maintain 6-second window

    const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(cardRef.current, {
            rotateX,
            rotateY,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    const handleMouseLeave = contextSafe(() => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        });
    });

    const goToTestimonial = (index: number) => {
        if (index === currentIndex) return;
        const direction = index > currentIndex ? 'next' : 'prev';
        animateTransition(index, direction);
    };

    return (
        <section ref={containerRef} id="testimonials" className="relative min-h-[120vh] w-full flex flex-col items-center justify-center py-40 overflow-hidden bg-black">
            
            {/* Background Accent - Soft Glows */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-8 md:px-20 relative z-10 flex flex-col items-center">
                
                {/* Header Section */}
                <div className="text-center mb-24 max-w-2xl px-4">
                    <BlurReveal delay={0.1}>
                        <span className="text-white/30 text-[10px] md:text-xs font-jetbrains uppercase tracking-[0.5em] mb-4 block">Testimonials</span>
                    </BlurReveal>
                    <BlurReveal delay={0.2}>
                        <h2 className="text-white text-5xl md:text-7xl font-extralight tracking-tight mb-8">Trusted Voices</h2>
                    </BlurReveal>
                    <BlurReveal delay={0.3}>
                        <p className="text-white/30 text-sm md:text-base font-jetbrains leading-relaxed tracking-wide">
                            Insights from partners and clients who have witnessed the intersection of architectural precision and digital resilience.
                        </p>
                    </BlurReveal>
                </div>

                {/* Main Carousel Card */}
                <div className="relative w-full max-w-5xl px-4 flex flex-col items-center">
                    
                    {/* Testimonial Card Container - Added perspective for micro-interactions */}
                    <div className="relative w-full group perspective-[1500px]">
                        
                        {/* Interactive Testimonial Card */}
                        <div 
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="testimony-content relative bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-white/20 hover:from-white/[0.06] hover:to-white/[0.02] cursor-default"
                        >
                            {/* Scanline pattern for that "engineered" feel */}
                            <div className="absolute inset-0 rounded-[3rem] overflow-hidden opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.5) 50%)", backgroundSize: "100% 4px" }} />
                            {/* Quote Icon Bubble */}
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/[0.05] flex items-center justify-center mb-10 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                <Quote size={24} className="text-white/40 group-hover:text-white/60 transition-colors" />
                            </div>

                            {/* Testimony Text */}
                            <p className="text-white/90 text-lg md:text-3xl font-extralight leading-[1.4] italic mb-8 md:mb-12 max-w-4xl tracking-tight">
                                "{testimonials[currentIndex].quote}"
                            </p>

                            {/* Star Rating - Precise spacing */}
                            <div className="flex gap-1.5 mb-10 md:mb-16">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={14} 
                                        fill={i < testimonials[currentIndex].rating ? "currentColor" : "none"} 
                                        className={i < testimonials[currentIndex].rating ? "text-white opacity-60" : "text-white/10"} 
                                    />
                                ))}
                            </div>

                            {/* Author Info - Side-by-side style */}
                            <div className="flex items-center gap-5 text-left">
                                <div className="relative w-16 h-16 rounded-full p-0.5 border border-white/10 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                    <img 
                                        src={testimonials[currentIndex].image} 
                                        alt={testimonials[currentIndex].author} 
                                        className="w-full h-full object-cover rounded-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white text-lg font-jetbrains uppercase tracking-[0.15em] font-medium leading-tight">{testimonials[currentIndex].author}</span>
                                    <span className="text-white/30 text-[10px] font-jetbrains italic uppercase tracking-wider">{testimonials[currentIndex].role}</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons - Abstract Minimalist style - Hidden on mobile */}
                        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none px-4 md:-mx-12">
                            <button 
                                onClick={prevTestimonial}
                                className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group"
                            >
                                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button 
                                onClick={nextTestimonial}
                                className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group"
                            >
                                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Integrated Navigation Group - Dots and Arrows below the card */}
                    <div className="flex items-center gap-8 mt-16 group/nav">
                        <button 
                            onClick={prevTestimonial}
                            aria-label="Previous Testimonial"
                            className="hidden md:flex w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 items-center justify-center text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex items-center gap-3">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToTestimonial(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    className={`transition-all duration-1000 rounded-full h-1.5 ${
                                        i === currentIndex 
                                            ? "w-8 bg-white/60" 
                                            : "w-1.5 bg-white/10 hover:bg-white/25"
                                    }`}
                                />
                            ))}
                        </div>

                        <button 
                            onClick={nextTestimonial}
                            aria-label="Next Testimonial"
                            className="hidden md:flex w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 items-center justify-center text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                </div>

            </div>
            
        </section>
    );
};

export default Testimonials;

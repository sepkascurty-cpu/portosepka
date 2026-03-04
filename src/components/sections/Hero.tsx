"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import GradientBlinds from "../ui/GradientBlinds";

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 2, ease: "power3.out", delay: 0.5 }
            );
            
            gsap.fromTo(
                ".hero-fade",
                { opacity: 0 },
                { opacity: 1, duration: 2, stagger: 0.2, ease: "power2.out", delay: 1.5 }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* OGL Gradient Blinds Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] md:w-[1400px] md:h-[1400px] z-0 pointer-events-none opacity-40 rounded-full overflow-hidden [mask-image:radial-gradient(circle_at_center,white_0%,transparent_60%)]">
                <GradientBlinds
                    gradientColors={['#FFFFFF', '#000000']} 
                    angle={0}
                    noise={0.5}
                    blindCount={8}
                    blindMinWidth={40}
                    spotlightRadius={0.4}
                    spotlightSoftness={0.8}
                    spotlightOpacity={1}
                    mouseDampening={0.15}
                    distortAmount={0}
                    shineDirection="left"
                    mixBlendMode="screen"
                />
            </div>
            
            {/* Center Content */}
            <div className="z-10 flex flex-col items-center text-center">
                {/* Profile Photo - Moved outside mix-blend-difference so it does not become transparent/tembus */}
                <div className="hero-fade w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-8 border border-white/20 pointer-events-auto shadow-2xl shadow-white/5 relative z-20">
                    <img 
                        src="https://github.com/sepkascurty-cpu.png" 
                        alt="Sepka Rahmadhani" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 relative z-20" 
                    />
                </div>

                {/* Text Content with mix-blend-difference */}
                <div className="pointer-events-none mix-blend-difference relative z-10 w-full flex justify-center">
                    <h1 
                        ref={titleRef}
                        className="text-white tracking-[0.15em] md:tracking-[0.2em] uppercase font-bold"
                        style={{ fontSize: "clamp(2rem, 6vw, 6rem)", lineHeight: 1 }}
                    >
                        Sepka Rahmadhani
                    </h1>
                </div>
            </div>

            {/* Side Texts - Responsive behavior */}
            <div className="hidden lg:block">
                {/* Left Side Text */}
                <div className="hero-fade absolute left-12 top-1/2 -translate-y-1/2 w-[260px]">
                    <p className="text-[#a0a0a0] text-base leading-relaxed font-jetbrains">
                        A Cyber Security Specialist with a passion for Defense Operations
                    </p>
                </div>

                {/* Right Side Text */}
                <div className="hero-fade absolute right-12 top-1/2 -translate-y-1/2 w-[260px] text-right">
                    <p className="text-[#a0a0a0] text-base leading-relaxed font-jetbrains">
                        Focused on how to save the business from digital threats.
                    </p>
                </div>
            </div>

            {/* Mobile/Tablet Side Text - Stacked below name */}
            <div className="lg:hidden z-20 mt-12 px-8 flex flex-col items-center gap-6 text-center">
                <p className="hero-fade text-[#a0a0a0] text-xs md:text-sm leading-relaxed font-jetbrains max-w-[280px]">
                    A Cyber Security Specialist with a passion for Defense Operations
                </p>
                <div className="hero-fade w-px h-8 bg-white/10" />
                <p className="hero-fade text-[#a0a0a0] text-xs md:text-sm leading-relaxed font-jetbrains max-w-[280px]">
                    Focused on how to save the business from digital threats.
                </p>
            </div>

            {/* Bottom Coordinates & Location */}
            <div className="hero-fade absolute bottom-8 left-8 md:left-12 flex items-center gap-4 text-xs text-[#666666] font-jetbrains uppercase tracking-widest">
                <span>06°12'05" S | 106°49'42" E</span>
            </div>
            <div className="hero-fade absolute bottom-8 right-8 md:right-12 flex items-center gap-4 text-xs text-[#666666] font-jetbrains uppercase tracking-widest">
                <span>Jakarta, Indonesia</span>
            </div>
            
            {/* Center Bottom Scroll Indicator */}
            <div className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
                 <div className="w-[1px] h-12 bg-gradient-to-b from-[#666666] to-transparent animate-pulse" />
            </div>

        </section>
    );
};

export default Hero;

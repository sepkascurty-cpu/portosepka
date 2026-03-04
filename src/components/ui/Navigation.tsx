"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RollingText } from "./RollingText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navItems = [
    { name: "(Philosophy)", href: "#philosophy" },
    { name: "(Experience)", href: "#experience" },
    { name: "(Works)", href: "#works" },
    { name: "(Contact)", href: "#contact" },
];

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useGSAP(() => {
        if (isOpen) {
            // Open Animation
            gsap.to(menuRef.current, {
                opacity: 1,
                visibility: "visible",
                duration: 0.6,
                ease: "power3.out"
            });
            
            gsap.fromTo(itemsRef.current, 
                { y: 40, opacity: 0, filter: "blur(10px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power4.out", delay: 0.2 }
            );

            // Hamburger to X animation
            gsap.to(".line-1", { y: 6, rotate: 45, duration: 0.4, ease: "power2.inOut" });
            gsap.to(".line-2", { opacity: 0, x: -10, duration: 0.3, ease: "power2.inOut" });
            gsap.to(".line-3", { y: -6, rotate: -45, duration: 0.4, ease: "power2.inOut" });
        } else {
            // Close Animation
            gsap.to(menuRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => { gsap.set(menuRef.current, { visibility: "hidden" }); }
            });

            // X to Hamburger animation
            gsap.to(".line-1", { y: 0, rotate: 0, duration: 0.4, ease: "power2.inOut" });
            gsap.to(".line-2", { opacity: 1, x: 0, duration: 0.4, ease: "power2.inOut" });
            gsap.to(".line-3", { y: 0, rotate: 0, duration: 0.4, ease: "power2.inOut" });
        }
    }, { dependencies: [isOpen], scope: containerRef });

    return (
        <nav ref={containerRef} className="fixed top-8 right-8 md:top-12 md:right-12 z-[100]">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-end gap-10">
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className="text-[#a0a0a0] hover:text-white transition-colors text-sm font-jetbrains">
                        <RollingText text={item.name} />
                    </Link>
                ))}
            </div>

            {/* Premium Mobile Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative z-50 w-12 h-12 flex flex-col items-center justify-center focus:outline-none group"
                aria-label="Toggle Menu"
            >
                <div className="relative w-7 h-5">
                    <span className="line-1 absolute top-0 left-0 w-full h-[1.5px] bg-white transition-colors group-hover:bg-white" />
                    <span className="line-2 absolute top-[50%] -translate-y-[50%] left-0 w-full h-[1.5px] bg-white transition-colors group-hover:bg-white" />
                    <span className="line-3 absolute bottom-0 left-0 w-full h-[1.5px] bg-white transition-colors group-hover:bg-white" />
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            <div 
                ref={menuRef}
                className="fixed inset-0 opacity-0 invisible z-40 md:hidden overflow-hidden"
            >
                {/* Advanced translucent background */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-[32px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-white/[0.01] pointer-events-none" />
                
                {/* Digital Texture Overlays */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                    style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.5) 50%)", backgroundSize: "100% 4px" }} 
                />
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                {/* Digital Ornaments */}
                <div className="absolute top-12 left-8 text-[8px] font-jetbrains text-white/20 uppercase tracking-[0.4em] transform -rotate-90 origin-left">
                    System.Nav_v2.0
                </div>
                <div className="absolute bottom-12 right-8 text-[8px] font-jetbrains text-white/20 uppercase tracking-[0.4em]">
                    06°12'05" S | 106°49'42" E
                </div>

                <div className="relative flex flex-col items-center justify-center h-full gap-10 px-8">
                    {navItems.map((item, idx) => (
                        <Link 
                            key={item.name} 
                            href={item.href} 
                            ref={(el) => { itemsRef.current[idx] = el; }}
                            onClick={() => setIsOpen(false)}
                            className="text-4xl font-extralight tracking-tighter text-white/40 hover:text-white transition-all duration-500 transform hover:scale-105 active:scale-95 flex items-center gap-4"
                        >
                            <span className="text-[10px] font-jetbrains opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                            {item.name}
                        </Link>
                    ))}
                    
                    <div className="mt-16 flex flex-col items-center gap-6 opacity-20">
                        <div className="w-[1px] h-20 bg-gradient-to-b from-white via-white/50 to-transparent" />
                        <span className="text-[9px] font-jetbrains uppercase tracking-[1em] text-white pl-[1em]">Connect</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

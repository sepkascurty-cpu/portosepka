import { BlurReveal } from "../ui/BlurReveal";

const Philosophy = () => {
    return (
        <section id="philosophy" className="relative min-h-[120vh] w-full flex flex-col items-center justify-center py-40 overflow-hidden bg-black">
            
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[150px] pointer-events-none" />

            {/* Venn Diagram Container */}
            <BlurReveal delay={0.2} className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] mb-32 flex items-center justify-center">
                
                {/* Circle 1: Defense (Top) */}
                <div className="absolute top-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full border border-white/20 flex items-start justify-center pt-8 md:pt-16 backdrop-blur-sm bg-white/[0.02] mix-blend-screen transition-all duration-700 hover:bg-white/[0.05]">
                    <span className="text-white/60 font-jetbrains text-xs md:text-sm tracking-widest uppercase">Defense</span>
                </div>
                
                {/* Circle 2: Offense (Bottom Left) */}
                <div className="absolute bottom-0 left-[-5%] md:left-4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full border border-white/20 flex items-center justify-start pl-8 md:pl-16 backdrop-blur-sm bg-white/[0.02] mix-blend-screen transition-all duration-700 hover:bg-white/[0.05]">
                    <span className="text-white/60 font-jetbrains text-xs md:text-sm tracking-widest uppercase mt-[20%]">Offense</span>
                </div>

                {/* Circle 3: Strategy (Bottom Right) */}
                <div className="absolute bottom-0 right-[-5%] md:right-4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full border border-white/20 flex items-center justify-end pr-8 md:pr-16 backdrop-blur-sm bg-white/[0.02] mix-blend-screen transition-all duration-700 hover:bg-white/[0.05]">
                    <span className="text-white/60 font-jetbrains text-xs md:text-sm tracking-widest uppercase mt-[20%]">Strategy</span>
                </div>

                {/* Center Core Keyword */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none mt-[10%]">
                    <span className="text-white font-jetbrains text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-40">Resilience</span>
                </div>
            </BlurReveal>

            {/* Scroll Reveal Text */}
            <div className="max-w-3xl px-8 text-center md:text-left flex flex-col gap-10">
                <BlurReveal delay={0}>
                    <p className="text-white/80 text-xl md:text-3xl font-light leading-snug">
                        Security is not a final destination. It is a continuous practice of balancing <span className="text-white italic">defense mechanisms</span>, understanding <span className="text-white italic">offensive methodologies</span>, and applying <span className="text-white italic">strategic oversight</span>.
                    </p>
                </BlurReveal>
                
                <BlurReveal delay={0.2}>
                    <p className="text-white/40 text-sm md:text-base font-jetbrains leading-relaxed max-w-2xl">
                        I specialize in designing infrastructures that are mathematically secure but functionally invisible. By embracing the chaos of the threat landscape, we build systems that don't just withstand attacks—they adapt to them.
                    </p>
                </BlurReveal>
            </div>
            
        </section>
    );
};

export default Philosophy;

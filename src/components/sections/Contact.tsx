import { BlurReveal } from "../ui/BlurReveal";
import { RollingText } from "../ui/RollingText";

const Contact = () => {
    return (
        <footer id="contact" className="relative min-h-[100vh] flex flex-col items-center justify-between pb-12 pt-32 px-8 overflow-hidden bg-black">
            
            {/* Live GitHub Contributions */}
            <div className="w-full max-w-5xl mb-24 z-10 flex flex-col items-center">
                <BlurReveal>
                    <h3 className="text-white/40 font-jetbrains text-xs uppercase tracking-widest mb-8 text-center">( Live Activity / Contributions )</h3>
                </BlurReveal>
                <BlurReveal delay={0.2} className="w-full relative px-0 md:px-4">
                    <div className="relative group bg-white/[0.02] border-y md:border border-white/5 md:rounded-[2rem] py-10 md:py-16 overflow-hidden">
                        {/* Inner subtle glow */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="w-full overflow-x-auto pb-6 flex justify-start md:justify-center custom-scrollbar no-scrollbar-mobile mask-edges">
                            <div className="min-w-[750px] md:min-w-[850px] lg:min-w-[1000px] px-8 opacity-80 hover:opacity-100 transition-opacity duration-500 filter grayscale contrast-125 brightness-150">
                                {/* Fetching live GitHub contributions chart using a public API service */}
                                <img 
                                    src="https://ghchart.rshah.org/0A4174/sepkascurty-cpu" 
                                    alt="Sepka Rahmadhani GitHub Contributions" 
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>

                        {/* Horizontal scroll indicator hint for mobile */}
                        <div className="md:hidden flex flex-col items-center gap-2 mt-2 opacity-30 animate-pulse">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-px bg-white/30" />
                                <span className="text-[8px] font-jetbrains uppercase tracking-[0.3em]">Swipe to explore activity</span>
                                <div className="w-8 h-px bg-white/30" />
                            </div>
                        </div>
                    </div>
                </BlurReveal>
            </div>

            {/* Main Tagline & Email */}
            <div className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-4xl z-10 mb-20">
                <BlurReveal>
                    <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight mb-12">
                        Bridging the gap between <br className="hidden md:block" />
                        <span className="italic text-white/70">defense mechanisms</span> and digital resilience.
                    </h2>
                </BlurReveal>

                <BlurReveal delay={0.2}>
                    <a 
                        href="mailto:sepkascurty@gmail.com" 
                        className="text-white/60 hover:text-white transition-colors text-lg md:text-xl border-b border-white/20 hover:border-white pb-1"
                    >
                        sepkascurty@gmail.com
                    </a>
                </BlurReveal>
            </div>

            {/* Social Links Footer */}
            <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between mt-auto z-10 gap-6">
                <div className="text-white/30 text-[10px] md:text-xs font-jetbrains uppercase tracking-widest text-center md:text-left">
                    © {new Date().getFullYear()} Sepka Rahmadhani<br className="md:hidden" />
                    <span className="hidden md:inline"> | </span>Jakarta, Indonesia
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-[#a0a0a0] text-[10px] md:text-xs font-jetbrains">
                    <a href="https://github.com/sepkascurty-cpu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        (<RollingText text="Github" />)
                    </a>
                    <a href="https://www.instagram.com/arleceo?igsh=MTMxcG9tYjdoMmNmaA==" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        (<RollingText text="Instagram" />)
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        (<RollingText text="LinkedIn" />)
                    </a>
                </div>
            </div>

            {/* Ambient background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[40vh] bg-white/[0.015] blur-[100px] rounded-[100%] pointer-events-none" />
            
            {/* Minimalist scrollbar style internal injection for mobile scroll */}
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
                
                @media (max-width: 768px) {
                    .no-scrollbar-mobile::-webkit-scrollbar { display: none; }
                    .no-scrollbar-mobile { -ms-overflow-style: none; scrollbar-width: none; }
                    
                    .mask-edges {
                        -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    }
                }
            `}} />
        </footer>
    );
};

export default Contact;

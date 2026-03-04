import { BlurReveal } from "../ui/BlurReveal";

const experiences = [
    {
        id: "01",
        role: "Cyber Security Specialist",
        company: "BASARNAS",
        timeline: "2023 - Present",
        desc: "Leading security assessments, penetration testing, and infrastructure defense operations for critical national search and rescue systems."
    },
    {
        id: "02",
        role: "Web3 Security Auditor",
        company: "Freelance",
        timeline: "2022 - 2023",
        desc: "Auditing smart contracts and conducting vulnerability assessments for decentralized finance (DeFi) protocols."
    },
    {
        id: "03",
        role: "Network Security Engineer",
        company: "Enterprise Infrastructures",
        timeline: "2020 - 2022",
        desc: "Designing Zero Trust architectures, implementing next-gen firewalls, and managing SIEM integrations."
    }
];

const Experience = () => {
    return (
        <section id="experience" className="relative min-h-screen py-32 px-8 md:px-20 lg:px-28 bg-black overflow-hidden">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.05] rounded-full blur-[120px] pointer-events-none" />

            {/* Giant Background Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none mix-blend-difference overflow-hidden w-full text-center">
                <span className="text-[#111111] font-jetbrains font-bold tracking-tighter" style={{ fontSize: "clamp(10rem, 30vw, 35rem)", lineHeight: 0.8 }}>
                    EXP
                </span>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <BlurReveal>
                    <h2 className="text-white text-3xl md:text-5xl font-light mb-20">Experience</h2>
                </BlurReveal>

                <div className="flex flex-col">
                    {experiences.map((exp, index) => (
                        <div key={exp.id} className="group border-t border-white/10 py-10 hover:border-white/40 transition-colors duration-500">
                            <BlurReveal delay={index * 0.1} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                                
                                {/* ID & Timeline (Left col) */}
                                <div className="md:col-span-3 flex flex-col justify-between">
                                    <span className="text-white/30 font-jetbrains text-xs tracking-widest">{exp.id}</span>
                                    <span className="text-white/60 font-jetbrains text-sm mt-2 md:mt-0">{exp.timeline}</span>
                                </div>

                                {/* Details (Right col) */}
                                <div className="md:col-span-9 flex flex-col gap-4">
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                                        <h3 className="text-white text-2xl md:text-3xl font-light">{exp.role}</h3>
                                        <span className="text-white/50 font-jetbrains text-sm">— {exp.company}</span>
                                    </div>
                                    <p className="text-white/40 max-w-2xl leading-relaxed mt-2 text-sm md:text-base">
                                        {exp.desc}
                                    </p>
                                </div>
                            </BlurReveal>
                        </div>
                    ))}
                </div>
            </div>
            
        </section>
    );
};

export default Experience;

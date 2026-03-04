"use client";
import React from "react";
import { motion } from "framer-motion";

export const RollingText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <motion.div
      className={`relative overflow-hidden inline-flex items-center justify-center font-jetbrains ${className}`}
      initial="initial"
      whileHover="hovered"
    >
      <div className="flex">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1], // easeOutQuint
              delay: i * 0.02,
            }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 flex aria-hidden">
        {text.split("").map((char, i) => (
          <motion.span
            key={"clone-" + i}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.02,
            }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

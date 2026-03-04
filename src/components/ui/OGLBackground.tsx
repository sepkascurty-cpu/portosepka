"use client";
import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh, Color, Vec2 } from 'ogl';

const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;

const fragment = /* glsl */ `
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;

    // Simple noise function
    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }

    void main() {
        vec2 uv = vUv;
        float aspect = uResolution.x / uResolution.y;
        uv.x *= aspect;

        float t = uTime * 0.15;
        
        // Liquid distortion layers
        float n1 = noise(uv * 1.5 + t);
        float n2 = noise(uv * 3.0 - t * 0.3);
        float n3 = noise(uv * 2.0 + vec2(n1, n2) * 1.2);

        // Mix between pure black and dark/medium grey
        vec3 color = mix(uColor1, uColor2, n3);
        
        // Subtle glow peaks for highly dynamic appearance
        color += 0.05 * sin(uv.x * 5.0 + t * 2.0) * n1;
        
        // Slight vignette
        float d = length(vUv - 0.5);
        color *= 1.0 - d * 0.3;

        gl_FragColor = vec4(color, 1.0);
    }
`;

const OGLBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        
        const container = containerRef.current;
        const renderer = new Renderer({ alpha: true });
        const gl = renderer.gl;
        container.appendChild(gl.canvas);
        
        const camera = new Camera(gl);
        camera.position.z = 5;
        
        const geometry = new Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });
        
        const program = new Program(gl, {
            vertex, 
            fragment,
            uniforms: { 
                uTime: { value: 0 },
                uResolution: { value: new Vec2() },
                uColor1: { value: new Color("#000000") }, // Black base
                uColor2: { value: new Color("#222222") }, // Dark grey highlights
            },
            transparent: true,
        });
        
        const mesh = new Mesh(gl, { geometry, program });
        
        const resize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            program.uniforms.uResolution.value.set(width, height);
        };
        
        window.addEventListener('resize', resize);
        resize();
        
        let request: number;
        const update = (t: number) => {
            request = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        };
        request = requestAnimationFrame(update);
        
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(request);
            if (container.contains(gl.canvas)) {
                container.removeChild(gl.canvas);
            }
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="absolute inset-0 z-0 pointer-events-none opacity-80 md:opacity-100 mix-blend-screen"
        />
    );
};

export default OGLBackground;

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DitherVanilla({ 
    intensity = 0.5, 
    scale = 1.0, 
    speed = 1.0,
    className = "",
    style = {}
}) {
    const containerRef = useRef();
    const sceneRef = useRef();
    const rendererRef = useRef();
    const meshRef = useRef();
    const animationIdRef = useRef();

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75, 
            containerRef.current.clientWidth / containerRef.current.clientHeight, 
            0.1, 
            1000
        );
        camera.position.z = 6;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background
        rendererRef.current = renderer;
        
        containerRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);

        // Geometry and material
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0x319DFF,
            metalness: 0.7,
            roughness: 0.3,
            wireframe: false
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(scale, scale, scale);
        meshRef.current = mesh;
        scene.add(mesh);

        // Animation loop
        const animate = () => {
            if (meshRef.current) {
                meshRef.current.rotation.x += 0.005 * speed;
                meshRef.current.rotation.y += 0.01 * speed;
            }
            
            renderer.render(scene, camera);
            animationIdRef.current = requestAnimationFrame(animate);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current || !renderer || !camera) return;
            
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            
            // Dispose of Three.js resources
            if (geometry) geometry.dispose();
            if (material) material.dispose();
            if (renderer) renderer.dispose();
        };
    }, [intensity, scale, speed]);

    return (
        <div 
            ref={containerRef}
            className={`dither-container ${className}`}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                ...style
            }}
        />
    );
}

'use client'

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
    starCount?: number;
    planetSize?: number;
    planetColor?: string;
    moonSize?: number;
    moonColor?: string;
}

const ThreeStarfield: React.FC<Props> = ({
                                                starCount = 5000,
                                                planetSize = 50,
                                                planetColor = '#ff4500',
                                                moonSize = 15,
                                                moonColor = '#c0c0c0'
                                            }) => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Stars
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF });

        const starVertices = [];
        for (let i = 0; i < starCount; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Planet
        const planetGeometry = new THREE.SphereGeometry(planetSize, 32, 32);
        const planetMaterial = new THREE.MeshBasicMaterial({ color: planetColor });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.position.set(100, 0, -500);
        scene.add(planet);

        // Moon
        const moonGeometry = new THREE.SphereGeometry(moonSize, 32, 32);
        const moonMaterial = new THREE.MeshBasicMaterial({ color: moonColor });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(200, 50, -400);
        scene.add(moon);

        camera.position.z = 5;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            stars.rotation.y += 0.0002;
            planet.rotation.y += 0.005;
            moon.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, [starCount, planetSize, planetColor, moonSize, moonColor]);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 10 }} />;
};

export default ThreeStarfield;

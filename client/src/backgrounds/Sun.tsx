import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { AnimationProps } from '../types/types';

const Sun = ({ paused }: AnimationProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0.7, 1, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 4;
    controls.maxDistance = 10;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Sun texture
    const loader = new THREE.TextureLoader();
    const sunTex = loader.load('/textures/sun.jpg');

    const sunGeometry = new THREE.SphereGeometry(1, 64, 64);
    const sunMaterial = new THREE.MeshPhongMaterial({
      map: sunTex,
      bumpScale: 0.05,
      specular: new THREE.Color(0x555555),
      shininess: 15,
    });

    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(-2, 0.7, 0);
    scene.add(sun);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 20000;
    const starVertices: number[] = [];
    for (let i = 0; i < starCount; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
      );
    }
    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    const clock = new THREE.Clock();

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      if (!paused) {
        const elapsedTime = clock.getElapsedTime();
        sun.position.z = Math.cos(elapsedTime * 0.7);
        sun.position.y = Math.cos(elapsedTime * 0.7);
        sun.rotation.y += 0.004;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, [paused]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default Sun;

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { AnimationProps } from "../types/types";
const Earth = ({ paused }: AnimationProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00000); //black
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    camera.position.z = 5;
    camera.position.y = 1;
    camera.position.x = 0.7;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    //for moving and zoom
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 4;
    controls.maxDistance = 10;

    //lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    ///Textures
    const loader = new THREE.TextureLoader();
    const earthTex = loader.load("/textures/earth.jpg");
    const bump = loader.load("/textures/earth_bump.png");

    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTex,
      bumpMap: bump,
      bumpScale: 0.05,
      specular: new THREE.Color(0x555555),
      shininess: 15,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.x = 2;
    earth.position.y = 0.2;
    earth.position.z = 0.8;
    scene.add(earth);

    ///stars
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 20000;
    const starVertices: number[] = [];
    for (let i = 0; i < starCount; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
      );
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3),
    );

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    //animation
    const animate = () => {
      requestAnimationFrame(animate);
      if (!paused) {
        earth.rotation.y += 0.001;
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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, [paused]);
  return <div ref={mountRef} className="w-screen h-screen" />;
};

export default Earth;

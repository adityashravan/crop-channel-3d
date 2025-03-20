
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeDBackgroundProps {
  className?: string;
}

const ThreeDBackground: React.FC<ThreeDBackgroundProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spheresRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create spheres
    const createSpheres = () => {
      const spheres: THREE.Mesh[] = [];
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      
      // Create multiple spheres with different materials and positions
      for (let i = 0; i < 15; i++) {
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(`hsl(${210 + i * 5}, 80%, 70%)`),
          transparent: true,
          opacity: 0.3,
          shininess: 100,
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        
        // Random position
        sphere.position.x = (Math.random() - 0.5) * 60;
        sphere.position.y = (Math.random() - 0.5) * 40;
        sphere.position.z = (Math.random() - 0.5) * 30 - 10;
        
        // Random scale
        const scale = 0.5 + Math.random() * 2;
        sphere.scale.set(scale, scale, scale);
        
        // Add to scene and array
        scene.add(sphere);
        spheres.push(sphere);
      }
      
      return spheres;
    };
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x0099ff, 0.8, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create spheres
    spheresRef.current = createSpheres();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate each sphere slightly
      spheresRef.current.forEach((sphere, i) => {
        sphere.rotation.x += 0.001 + (i % 3) * 0.001;
        sphere.rotation.y += 0.002 + (i % 5) * 0.001;
        
        // Subtle float animation
        sphere.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
      });
      
      // Rotate camera position slightly
      camera.position.x = Math.sin(Date.now() * 0.0002) * 5;
      camera.position.y = Math.cos(Date.now() * 0.0001) * 2;
      camera.lookAt(scene.position);
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
  
  return <div ref={containerRef} className={`fixed inset-0 -z-10 ${className || ''}`} />;
};

export default ThreeDBackground;

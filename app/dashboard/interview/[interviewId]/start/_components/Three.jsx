import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const AvatarComponent = ({ currentQuestion }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7.5).normalize();
    scene.add(directionalLight);

    // Load 3D GLB Model
    const loader = new GLTFLoader();
    let avatar, faceMesh;

    loader.load(
      "/adcetbefore2.glb",
      (gltf) => {
        avatar = gltf.scene;
        avatar.position.set(0, -0.2, 0);
        avatar.scale.set(3.5, 3.5, 3.5);
        scene.add(avatar);

        // Position Camera
        camera.position.set(0, 6, 3);

        // Find the Correct Face Mesh
        avatar.traverse((child) => {
          if (child.isMesh && child.morphTargetDictionary) {
            if (child.name.includes("Head")) {
              faceMesh = child;
              console.log("✅ Face Mesh Selected:", faceMesh.name);
              console.log("✅ Available Blend Shapes:", Object.keys(child.morphTargetDictionary));
            }
          }
        });

        if (!faceMesh) {
          console.error("❌ No valid face mesh found with blend shapes.");
        }

        console.log("✅ Model Loaded:", avatar);
      },
      undefined,
      (error) => console.error("❌ Error loading GLB file:", error)
    );

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (currentQuestion) {
      generateAndPlayAudio(currentQuestion);
    }
  }, [currentQuestion]);

  const generateAndPlayAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.name === "Alex") || voices[0];
    utterance.rate = 1.0;

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const word = text.substring(event.charIndex, event.charIndex + event.charLength);
        syncLipMovement(word);
      }
    };

    utterance.onend = () => {
      if (faceMesh) faceMesh.morphTargetInfluences.fill(0);
    };

    speechSynthesis.speak(utterance);
  };

  const syncLipMovement = (word) => {
    if (!faceMesh || !faceMesh.morphTargetDictionary) return;

    const phonemeToViseme = {
      "h": "viseme_sil", "l": "viseme_U", "e": "viseme_E", "o": "viseme_O",
      "t": "viseme_TH", "s": "viseme_SS", "a": "viseme_aa", "m": "viseme_nn",
      "p": "viseme_PP", "c": "viseme_CH", "n": "viseme_nn", "v": "viseme_FF",
      "r": "viseme_RR", "d": "viseme_DD", "i": "viseme_I", "u": "viseme_U"
    };

    const phonemes = word.toLowerCase().split("");
    let index = 0;

    function animatePhonemes() {
      if (index >= phonemes.length) {
        faceMesh.morphTargetInfluences.fill(0);
        return;
      }

      const phoneme = phonemes[index];
      const viseme = phonemeToViseme[phoneme] || "viseme_sil";
      const morphIndex = faceMesh.morphTargetDictionary[viseme];

      if (morphIndex !== undefined) {
        faceMesh.morphTargetInfluences.fill(0);
        faceMesh.morphTargetInfluences[morphIndex] = 1;
      }

      index++;
      setTimeout(animatePhonemes, 50);
    }

    animatePhonemes();
  };

  return <div ref={mountRef}></div>;
};

export default AvatarComponent;
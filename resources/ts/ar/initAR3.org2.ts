import * as THREE from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import TWEEN from '@tweenjs/tween.js';
import cameraPara from "@/assets/camera_para.dat";
import markerURL from "@/assets/pattern-AR.patt";
import { useARToolkit } from "@/useARToolkit";

export const initAR3 = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    renderer.setSize(width, height);
    renderer.domElement.style.cssText = "position:absolute; top:0; left:0; z-index:10;";
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // カメラの視野角、クリッピングプレーンを設定
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 100);
    // カメラの位置を原点から少し離れた場所に設定
    camera.position.set(0, 2, 5);
    // カメラが原点を見るように設定
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    setupLighting(scene);

    function setupLighting(scene) {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 1, 0); // 上からの光
        scene.add(directionalLight);
    }

    const { arToolkitContext, arToolkitSource, arDispose } = useARToolkit({
        camera, cameraParaDatURL: cameraPara, domElement: renderer.domElement, markerPatternURL: markerURL, scene
    });

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x3357FF, transparent: true, opacity: 0.9 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);


    const animate = () => {
        requestAnimationFrame(animate);
        if (arToolkitSource.ready) {
            console.log('-----------');
            arToolkitContext.update(arToolkitSource.domElement);
            renderer.render(scene, camera);
            scene.visible = camera.visible;
        }
    };
    animate();

    const onTouchStart = () => {
        explodeSphere(sphere, scene);
        displayText(scene);
    };
    window.addEventListener('touchstart', onTouchStart);

    function explodeSphere(sphere, scene) {
        // Define the explosion effect here
        scene.remove(sphere);
    }

    function displayText(scene) {
        const loader = new FontLoader();
        loader.load('/assets/fonts/Noto-Sans-JP_Regular.json', function (font) {
            const textGeometry = new TextGeometry('おはよう', {
                font: font,
                size: 0.3,
                height: 0.3,
            });
            textGeometry.center();
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x3357FF, transparent: true, opacity: 0.7 });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.rotation.set(-Math.PI/2, 0, 0);
            textMesh.position.set(0, 0, 1);
            scene.add(textMesh);
        });
    }

    return () => {
        window.removeEventListener('touchstart', onTouchStart);
        scene.traverse(object => {
            if (object instanceof THREE.Mesh) {
                if (object.geometry) {
                    object.geometry.dispose();
                }
                if (object.material instanceof THREE.Material) {
                    object.material.dispose();
                }
            }
        });
        renderer.dispose();
        if (renderer.domElement && document.body.contains(renderer.domElement)) {
            document.body.removeChild(renderer.domElement);
        }
        arDispose();
    };
};

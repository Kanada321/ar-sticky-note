import * as THREE from "three";
import cameraPara from "@/assets/camera_para.dat";
import markerURL from "@/assets/pattern-AR.patt";
import { useARToolkit } from "@/useARToolkit";
import TWEEN from '@tweenjs/tween.js';

export const initAR1 = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    renderer.setSize(width, height);
    renderer.domElement.style.cssText = "position:absolute; top:0; left:0; z-index:10;";
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 20);
    camera.position.set(1, 1.5, 1.5);
    camera.lookAt(new THREE.Vector3(0, 0.5, 0));
    scene.add(camera);

    setupLighting(scene);

    let box = createBox();
    scene.add(box);
    const sphere = createSphere();
    scene.add(sphere);

    const { arToolkitContext, arToolkitSource, arDispose } = useARToolkit({
        camera,
        cameraParaDatURL: cameraPara,
        domElement: renderer.domElement,
        markerPatternURL: markerURL,
        scene,
    });

    let currentSpherePosition = new THREE.Vector3();
    let angle = 0;
    let orbitRadius = 0.5;  // Initial orbit radius

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
        if (arToolkitSource.ready) {
            arToolkitContext.update(arToolkitSource.domElement);
            updateSphereOrbit(sphere, new THREE.Vector3(0, 0.5, 0), orbitRadius);
            box.rotation.y += 0.05;  // Rotate the box
            renderer.render(scene, camera);
            scene.visible = camera.visible;
        }
    }
    animate();

    window.addEventListener("markerFound", () => {
        console.log("Marker found!");
        resetBox();
    });

    function resetBox() {
        scene.add(box);
        box.scale.set(0.7, 0.7, 0.7);  // Reset scale
        box.material.opacity = 1;  // Make box visible
        orbitRadius = 0.5;
        setTimeout(() => growAndDisappearBox(), 3000);  // Grow and disappear after 3 seconds
    }

    function growAndDisappearBox() {
        new TWEEN.Tween(box.scale)
            .to({ x: 2, y: 2, z: 2 }, 1000)
            .onUpdate(() => {
                orbitRadius = 1.4;  // Adjust orbit radius as the box grows
            })
            .start();

        new TWEEN.Tween(box.material)
            .to({ opacity: 0 }, 1000)
            .delay(1000)  // Start fading after growing
            .onComplete(() => {
                setTimeout(() => resetBox(), 500);  // Reappear after 0.5 seconds
            })
            .start();
    }

    return () => cleanup(scene, renderer, arDispose);
};

function setupLighting(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);//環境光の設定
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(0, 1, 1); // 上からの光
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffffff, 5, 100);
    pointLight.position.set(10, 10, 10); // シーンの端から光を投げる
    scene.add(pointLight);
}

function createBox() {
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const material = new THREE.MeshStandardMaterial({
        color: 0xa59595,
        transparent: true,
        opacity: 1,
    });
    return new THREE.Mesh(geometry, material);
}

function createSphere() {
    const geometry = new THREE.SphereGeometry(0.15, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xFF5733, transparent: true, opacity: 0.7 });
    return new THREE.Mesh(geometry, material);
}

let angle = 0;  // 公転の初期角度
function updateSphereOrbit(sphere, centerPosition, radius) {
    angle += 0.1;
    const newPosition = new THREE.Vector3(
        centerPosition.x + radius * Math.cos(angle),
        centerPosition.y,
        centerPosition.z + radius * Math.sin(angle)
    );
    smoothSpherePosition(sphere, newPosition);
}

let currentSpherePosition = new THREE.Vector3();
const sphereSmoothingFactor = 0.1;  // 平滑化のための定数

function smoothSpherePosition(sphere, newPosition) {
    currentSpherePosition.lerp(newPosition, sphereSmoothingFactor);
    sphere.position.copy(currentSpherePosition);
}

function cleanup(scene, renderer, arDispose) {
    scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
            } else {
                object.material.dispose();
            }
        }
    });
    renderer.dispose();
    arDispose();
    if (document.body.contains(renderer.domElement)) {
        document.body.removeChild(renderer.domElement);
    }
    window.removeEventListener("markerFound", () => resetBox());
}

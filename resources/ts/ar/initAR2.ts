import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import cameraPara from "@/assets/camera_para.dat";
import markerURL from "@/assets/pattern-AR.patt";
import { useARToolkit } from "@/useARToolkit";
import TWEEN from '@tweenjs/tween.js';

export const initAR2 = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 20);
    camera.position.set(1, 1.5, 1.5);
    scene.add(camera);

    // 照明の設定
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(2.4, 2, 5);

    //環境光の設定
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);  // 強度を1.0に設定
    scene.add(ambientLight);

    //追加の照明:
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0); // 上からの光
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 3, 100);
    pointLight.position.set(10, 10, 10); // シーンの端から光を投げる
    scene.add(pointLight);

    const {arToolkitContext, arToolkitSource, arDispose} = useARToolkit({
        camera, cameraParaDatURL: cameraPara, domElement: renderer.domElement, markerPatternURL: markerURL, scene
    });




    const loader = new GLTFLoader();
    const clock = new THREE.Clock();
    let mixer: THREE.AnimationMixer | undefined;

    function orbitAnimation(object: THREE.Object3D, radius: number, speed: number) {
        let angle = 0;
        const increase = speed * 0.05;  // Increase per frame

        new TWEEN.Tween({theta: 0})
            .to({theta: 2 * Math.PI}, 5000)
            .onUpdate((obj) => {
                angle += increase;
                object.position.x = radius * Math.cos(obj.theta);
                object.position.z = radius * Math.sin(obj.theta);
            })
            .repeat(Infinity)
            .start();
    }

    loader.load("/assets/3dmodels/Butterfly/Butterfly.gltf", function (gltf) {
        gltf.scene.scale.set(12, 12, 12);
        scene.add(gltf.scene);
        mixer = new THREE.AnimationMixer(gltf.scene);

        const flyAnimation = gltf.animations.find(clip => clip.name === "Fly_Loop_Animation");
        if (flyAnimation) {
            const action = mixer.clipAction(flyAnimation);
            action.clampWhenFinished = true;
            action.loop = THREE.LoopRepeat;
            action.play();

            // 上昇アニメーション後に円軌道アニメーションを開始
            new TWEEN.Tween(gltf.scene.position)
                .to({ y: "+0.1" }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onComplete(() => {
                    orbitAnimation(gltf.scene, 1.3, 0.03); // 5単位の半径で0.1の速度
                })
                .start();
        }
    });
// マーカーが見つかったときのハンドラー関数
    const onMarkerFound = () => {
        console.log("Marker Found!");
    };

// マーカーが見失われたときのハンドラー関数
    const onMarkerLost = () => {
        console.log("Marker Lost!");
    };

// イベントリスナーを追加
    arToolkitContext.addEventListener('markerFound', onMarkerFound);
    arToolkitContext.addEventListener('markerLost', onMarkerLost);

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        if (arToolkitSource.ready) {
            arToolkitContext.update(arToolkitSource.domElement);
            renderer.render(scene, camera);
            scene.visible = camera.visible;
        }
    }

    animate();

    return () => {
        renderer.dispose();
        arDispose();
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.geometry.dispose();
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else if (object.material) {
                    (object.material as THREE.Material).dispose();
                }
            }
        });
        if (renderer.domElement && document.body.contains(renderer.domElement)) {
            document.body.removeChild(renderer.domElement);
        }
        window.removeEventListener('markerFound', onMarkerFound);
        window.removeEventListener('markerLost', onMarkerLost);
    };
};

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

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // カメラの位置を原点から少し離れた場所に設定
    camera.position.set(0, 0, 5);
    // カメラが原点を見るように設定
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    setupLighting(scene);

    function setupLighting(scene) {
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);//環境光の設定
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
        directionalLight.position.set(0, 1, 0); // 上からの光
        scene.add(directionalLight);
        const pointLight = new THREE.PointLight(0xffffff, 3, 100);
        pointLight.position.set(10, 10, 10); // シーンの端から光を投げる
        scene.add(pointLight);
    }

    const { arToolkitContext, arToolkitSource, arDispose } = useARToolkit({
        camera, cameraParaDatURL: cameraPara, domElement: renderer.domElement, markerPatternURL: markerURL, scene
    });


    // オブジェクトを作成
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

// クリックイベントを検出する
    document.addEventListener('click', (event: MouseEvent) => {
        // クリック位置の座標を取得
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // レイキャスターを作成
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        // オブジェクトとの交差を検出
        const intersects = raycaster.intersectObjects(scene.children, true);

        // タップされたオブジェクトがある場合
        if (intersects.length > 0) {
            // そのオブジェクトを消す
            const object = intersects[0].object as THREE.Object3D;
            scene.remove(object);
        }
    });


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

    return () => {
        // window.removeEventListener('touchstart', onTouchStart);
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

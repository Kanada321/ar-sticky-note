import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import cameraPara from "@/assets/camera_para.dat";
import markerURL from "@/assets//pattern-AR.patt";
import {useARToolkit} from "@/useARToolkit";
import TWEEN from '@tweenjs/tween.js';

export const initAR2 = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    renderer.setSize(width, height);
    renderer.autoClear = true;  // 自動クリアを確実に有効にする
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 20);
    camera.position.set(1, 1.5, 1.5);
    scene.add(camera);
    // 照明の設定
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2.4, 2, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    //環境光の設定
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);  // 強度を1.0に設定
    scene.add(ambientLight);

    //追加の照明:
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0); // 上からの光
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight.position.set(10, 10, 10); // シーンの端から光を投げる
    scene.add(pointLight);

    const {arToolkitContext, arToolkitSource, arDispose} = useARToolkit({
        camera, cameraParaDatURL: cameraPara, domElement: renderer.domElement, markerPatternURL: markerURL, scene
    });

    // ３Dモデルの読み込み
    const loader = new GLTFLoader();
    const clock = new THREE.Clock();
    let mixer: THREE.AnimationMixer | undefined;
    let animationAction: THREE.AnimationAction | undefined;

// アニメーション開始後に実行する関数を定義
    function startFlyingAnimation(object: THREE.Object3D) {
        // 上昇アニメーション
        new TWEEN.Tween(object.position)
            .to({y: "+2"}, 1000)  // 4単位上昇に1000ミリ秒（1秒）かける
            .easing(TWEEN.Easing.Quadratic.Out)  // 減速しながら停止する効果
            .start();

        const startPosition = object.position.x;
        const moveDistance = 0.5;  // 左右に動く距離
        const pauseDuration = 2000; // 一時停止する時間（ミリ秒）

// 移動と一時停止を行う関数
        function moveAndPause(targetPosition: number) {
            console.log(`Moving to ${targetPosition}`);
            new TWEEN.Tween(object.position)
                .to({x: targetPosition}, 3000)  // 指定された位置へ移動
                .onComplete(() => {
                    console.log(`Reached ${targetPosition}, pausing...`);
                    setTimeout(() => {
                        // 反対方向への移動を開始
                        const nextPosition = startPosition + (targetPosition === startPosition + moveDistance ? -moveDistance : moveDistance);
                        console.log(`Next move to ${nextPosition}`);
                        moveAndPause(nextPosition);
                    }, pauseDuration); // 一時停止
                })
                .start();  // アニメーション開始
        }

// 初回の移動を開始
        setTimeout(() => {
            moveAndPause(startPosition + moveDistance);
        }, 2000);

    }

    loader.load("/assets/3dmodels/Butterfly/Butterfly.gltf", function (gltf) {
        gltf.scene.scale.set(24, 24, 24);  // スケールを10倍に設定
        gltf.scene.traverse(function (object) {
            if (object.isMesh) {
                object.material.roughness = 0.1; // 表面の粗さを減らして光沢を強くする
            }
        });
        scene.add(gltf.scene);
        mixer = new THREE.AnimationMixer(gltf.scene);

        const flyAnimation = gltf.animations.find(clip => clip.name === "Fly_Loop_Animation");
        if (flyAnimation) {
            const action = mixer.clipAction(flyAnimation);
            action.clampWhenFinished = true;
            action.loop = THREE.LoopRepeat;

            setTimeout(() => {
                action.play();
                // アニメーション開始2秒後に上昇を開始
                setTimeout(() => startFlyingAnimation(gltf.scene), 2000);
            }, 2000);
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
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        if (arToolkitSource.ready) {
            arToolkitContext.update(arToolkitSource.domElement);
            TWEEN.update();
            renderer.render(scene, camera);
            scene.visible = camera.visible;
        }
    }

// アニメーションループ
//     function animate() {
//         requestAnimationFrame(animate);
//         const delta = clock.getDelta(); // 正しく定義されたclockインスタンスを使用
//         if (mixer) {
//             mixer.update(delta);
//         }
//         if (arToolkitSource.ready) {
//             TWEEN.update();
//             renderer.render(scene, camera);
//             scene.visible = camera.visible;
//         }
//
//     }

    animate();

    return () => {
        scene.traverse((object: THREE.Object3D) => {
            if (object instanceof THREE.Mesh) {  // instanceofを使用してMeshかどうかをチェック
                object.geometry.dispose();  // ジオメトリを破棄
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else if (object.material) {
                    (object.material as THREE.Material).dispose();
                }
            }
        });
        renderer.dispose();  // レンダラーのリソースを解放
        arDispose();  // ARのリソースを解放

        // DOMからレンダラーの要素を削除
        if (renderer.domElement && document.body.contains(renderer.domElement)) {
            document.body.removeChild(renderer.domElement);
        }

        // 必要に応じてイベントリスナーを削除
        window.removeEventListener('markerFound', onMarkerFound);
        window.removeEventListener('markerLost', onMarkerLost);
    };

};

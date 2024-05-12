import * as THREE from "three";
import cameraPara from "@/assets/camera_para.dat";
import markerURL from "@/assets/pattern-AR.patt";
import { useARToolkit } from "@/useARToolkit";

export const initAR3 = () => {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    // WebGLレンダラーの設定
    const renderer = new THREE.WebGLRenderer({
        antialias: true, // エッジの滑らか化を有効化
        alpha: true, // キャンバスにアルファ（透明度）バッファを使用する
    });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0); // 背景色と透明度の設定
    renderer.setSize(width, height); // レンダラーのサイズ設定
    renderer.domElement.style.position = "absolute"; // DOM上でのレンダラーの位置設定
    renderer.domElement.style.top = "0px"; // 上端からの位置
    renderer.domElement.style.left = "0px"; // 左端からの位置
    renderer.domElement.style.zIndex = '10';
    document.body.appendChild(renderer.domElement); // DOMにレンダラーを追加

    // シーンの設定
    const scene = new THREE.Scene();

    // カメラの視野角、クリッピングプレーンを設定
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 100);
    // カメラの位置を原点から少し離れた場所に設定
    camera.position.set(0, 2, 5);
    // カメラが原点を見るように設定
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // 照明の設定
    const light = new THREE.DirectionalLight(0xffffff, 1); // 白色の指向性ライトを作成
    light.position.set(2.4, 2, 5); // ライトの位置設定
    scene.add(light); // シーンにライトを追加

    // メッシュ（3Dオブジェクト）の設定
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2), // 立方体ジオメトリの設定
        new THREE.MeshStandardMaterial({ color: 0x95BCDF }) // 灰色のマテリアル設定
    );
    box.position.set(0, 2, 0); // メッシュの位置設定
    scene.add(box); // シーンにメッシュを追加

    // ARツールキットの設定
    const { arToolkitContext, arToolkitSource ,arDispose} = useARToolkit({
        camera: camera, // AR用カメラ
        cameraParaDatURL: cameraPara, // カメラパラメータファイル
        domElement: renderer.domElement, // DOM要素
        markerPatternURL: markerURL, // マーカーURL
        scene, // シーン
    });

    // アニメーションループの設定
    function animate() {
        requestAnimationFrame(animate); // 次のフレームを要求

        if (arToolkitSource.ready) {
            console.log("arToolkitSource.ready");
            arToolkitContext.update(arToolkitSource.domElement); // ARコンテキストの更新
            renderer.render(scene, camera); // シーンとカメラを使ってレンダリング
            scene.visible = camera.visible; // シーンの可視状態をカメラの可視状態に同期
        }
    }

    animate(); // アニメーションの開始

    // イベントリスナーの設定（マーカー発見時のイベント）
    window.addEventListener("markerFound", (e) => {
        console.log("marker found!", e); // マーカー発見時にコンソールにログを出力
    });

    // クリーンアップ関数の設定
    return () => {
        // シーン内のすべてのオブジェクトを削除してクリーンアップ
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                const mesh = object as THREE.Mesh;
                if (mesh.geometry) {
                    mesh.geometry.dispose();
                }
                if (mesh.material instanceof THREE.Material) {
                    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                    materials.forEach(material => {
                        if ((material as THREE.Material).map) {
                            (material as THREE.Material).map.dispose();
                        }
                        material.dispose();
                    });
                }
            }
        });


        renderer.dispose(); // レンダラーのリソースを解放
        // カメラのリソースがあれば解放
        arDispose();

        // レンダラーのDOM要素がまだドキュメントに存在するか確認してから削除
        if (renderer.domElement && document.body.contains(renderer.domElement)) {
            document.body.removeChild(renderer.domElement);
        }

        window.removeEventListener("markerFound", () => {}); // イベントリスナーを削除
    };

};

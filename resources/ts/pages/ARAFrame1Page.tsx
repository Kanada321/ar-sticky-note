import React from 'react';
import 'aframe';
import 'aframe-ar';

const ARAFrame1Page: React.FC = () => {
    return (
        <a-scene embedded={true} arjs='sourceType: webcam;'>
            {/* マーカーの定義 */}
            <a-marker preset="custom" type='pattern' url='../assets/marker.patt'>
                {/* 赤い立方体の表示 */}
                <a-scene embedded={true} arjs='sourceType: webcam;'>
            </a-marker>
            {/* カメラの設定 */}
            <a-entity camera></a-entity>
        </a-scene>
    );
};

export default ARAFrame1Page;

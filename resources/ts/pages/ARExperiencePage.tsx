// src/pages/ARExperiencePage.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { initAR1 } from '@/ar/initAR1';
import { initAR2 } from '@/ar/initAR2';
import { initAR3 } from '@/ar/initAR3';

// 'arId' パラメータが string 型であることを明示し、インデックスシグネチャを含むように修正
interface Params {
    [key: string]: string | undefined; // すべてのプロパティが string または undefined
    arId: string; // 'arId' は必ず string
}

const ARExperiencePage: React.FC = () => {
    const { arId } = useParams<Params>();
    const navigate = useNavigate();

    useEffect(() => {
        let cleanup = () => {};

        switch (arId) {
            case '1':
                cleanup = initAR1();
                break;
            case '2':
                cleanup = initAR2();
                break;
            case '3':
                cleanup = initAR3();
                break;
            default:
                console.log('Invalid AR ID');
        }

        return () => {
            cleanup();
        };
    }, [arId]);

    const handleGoHome = () => {
        navigate('/'); // ホーム（トップページ）へ遷移
    }

    return (
        <div>
            <div>AR Experience {arId}</div>
            <button onClick={handleGoHome}
                    style={{ position: 'relative', zIndex: 100 }}
            >
                Go to Top
            </button>
            {/* トップページへのボタン */}
        </div>
    )
}

export default ARExperiencePage;

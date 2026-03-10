import React, { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Loader2 } from 'lucide-react';

const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

export default function Analysis({ image, onComplete }) {
    const [status, setStatus] = useState('인공지능 모델 로딩 중...');

    useEffect(() => {
        loadModelsAndAnalyze();
    }, []);

    const loadModelsAndAnalyze = async () => {
        try {
            setStatus('인공지능 모델 준비 중...');
            await Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
            ]);

            setStatus('얼굴 특징 분석 중...');
            const img = await faceapi.fetchImage(image);
            const detection = await faceapi.detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceExpressions();

            if (!detection) {
                alert('얼굴을 찾을 수 없습니다. 다시 시도해 주세요.');
                window.location.reload();
                return;
            }

            // Consistent Score Calculation based on facial landmarks
            // Ratio of middle face to lower face, eye size, etc.
            const landmarks = detection.landmarks.positions;
            const noseTip = landmarks[30];
            const chin = landmarks[8];
            const leftEye = landmarks[36];
            const rightEye = landmarks[45];

            const faceHeight = Math.abs(chin.y - landmarks[19].y);
            const eyeDistance = Math.abs(rightEye.x - leftEye.x);

            // Deterministic calculation (simple version)
            const ratio = (eyeDistance / faceHeight) * 100;
            let score = Math.floor(60 + (ratio % 40)); // 60-100 range

            // Map to a deterministic result
            const results = [
                { title: '우주급 최강 동안', desc: '세월이 비껴간 진정한 동안의 소유자입니다. 방부제 미모 그 자체!', id: 'baby_legend' },
                { title: '아이돌급 동안', desc: '상큼한 분위기가 물씬 풍겨요. 어디가서 신분증 검사 자주 당하시죠?', id: 'idol_vibes' },
                { title: '깔끔한 동안', desc: '실제 나이보다 훨씬 생기 있어 보여요. 꾸준한 관리가 빛을 발하는군요!', id: 'fresh_face' },
                { title: '매력적인 성숙함', desc: '동안의 요소와 세련된 성숙함이 완벽한 조화를 이룹니다.', id: 'mature_charm' }
            ];

            const resultIndex = Math.floor((score - 60) / 10) % results.length;
            const finalResult = {
                ...results[resultIndex],
                score
            };

            setTimeout(() => {
                onComplete(finalResult);
            }, 2000);

        } catch (err) {
            console.error(err);
            alert('분석 중 오류가 발생했습니다. (네트워크 연결을 확인해 주세요)');
            window.location.reload();
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
            <div className="relative w-48 h-48 mb-12">
                <div className="absolute inset-0 border-4 border-[#40C057]/20 rounded-full animate-ping" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-16 h-16 text-[#40C057] animate-spin" />
                </div>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {status}
            </h2>

            <p className="text-gray-500 font-medium text-center">
                잠시만 기다려 주세요.<br />
                기기 사양에 따라 시간이 걸릴 수 있습니다.
            </p>

            <div className="mt-12 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#40C057] h-full transition-all duration-1000" style={{ width: status.includes('로딩') ? '30%' : status.includes('분석') ? '80%' : '100%' }} />
            </div>
        </div>
    );
}

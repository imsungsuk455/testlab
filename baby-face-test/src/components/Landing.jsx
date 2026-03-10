import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

export default function Landing({ onStart }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-[#E3FAEF] rounded-full flex items-center justify-center mb-8 shadow-inner">
                <Sparkles className="w-12 h-12 text-[#40C057]" />
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                동안 테스트
            </h1>

            <p className="text-gray-500 mb-12 leading-relaxed font-medium">
                AI가 당신의 얼굴을 분석하여<br />
                얼마나 '동안'인지 측정해 드립니다.
            </p>

            <button
                onClick={onStart}
                className="w-full py-5 bg-[#40C057] hover:bg-[#37B24D] text-white rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-3"
            >
                <Camera className="w-6 h-6" />
                분석 시작하기
            </button>

            <p className="mt-8 text-xs text-gray-400 font-medium">
                * 업로드된 사진은 수집되지 않으며<br />
                분석 직후 즉시 파기됩니다.
            </p>
        </div>
    );
}

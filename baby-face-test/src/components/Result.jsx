import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCcw, Share2, Award, Info } from 'lucide-react';

export default function Result({ image, result, onRestart }) {
    useEffect(() => {
        if (result && result.score >= 85) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        }
    }, [result]);

    return (
        <div className="flex-1 flex flex-col p-8 animate-in zoom-in-95 duration-700">
            <div className="flex flex-col items-center mb-10">
                <div className="relative mb-8">
                    <img
                        src={image}
                        alt="Captured"
                        className="w-48 h-48 rounded-[36px] object-cover ring-8 ring-[#E3FAEF] grayscale-10 transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-[#40C057] text-white p-4 rounded-3xl shadow-xl flex flex-col items-center">
                        <span className="text-xs font-bold uppercase tracking-wider mb-1">DONG-AN</span>
                        <span className="text-2xl font-black">{result.score}%</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-2 bg-[#E3FAEF] px-5 py-2 rounded-2xl">
                    <Award className="w-5 h-5 text-[#40C057]" />
                    <span className="text-[#40C057] font-extrabold text-sm tracking-tight">{result.title}</span>
                </div>

                <h2 className="text-3xl font-black text-gray-900 text-center tracking-tight px-4 leading-tight mb-4">
                    당신은 {result.title}급 동안!
                </h2>

                <p className="text-gray-500 mb-8 text-center leading-relaxed font-medium px-4">
                    {result.desc}
                </p>
            </div>

            <div className="mt-auto space-y-4">
                <button
                    onClick={() => {
                        const currentUrl = window.location.href;
                        navigator.clipboard.writeText(`동안 테스트 결과! 내 점수는 ${result.score}% 였습니다. 당신의 동안도는? ${currentUrl}`);
                        alert('결과가 복사되었습니다!');
                    }}
                    className="w-full py-5 bg-[#F1F3F5] text-gray-700 rounded-2xl font-bold text-lg transition-all hover:bg-gray-200 active:scale-95 flex items-center justify-center gap-3 shadow-sm"
                >
                    <Share2 className="w-6 h-6" />
                    친구에게 자랑하기
                </button>

                <button
                    onClick={onRestart}
                    className="w-full py-5 border-2 border-[#40C057] text-[#40C057] rounded-2xl font-bold text-lg transition-all hover:bg-[#F1FDF6] active:scale-95 flex items-center justify-center gap-3"
                >
                    <RefreshCcw className="w-6 h-6" />
                    다시 해보기
                </button>

                <div className="flex items-start gap-4 p-5 bg-[#FDFCF0] rounded-2xl border border-[#F9F6D6]">
                    <Info className="w-6 h-6 text-[#F08C00] flex-shrink-0" />
                    <p className="text-xs text-[#865B17] leading-relaxed font-medium">
                        AI 분석 결과는 참고용으로만 사용해 주세요.<br />
                        실제 나이와 다를 수 있지만 당신의 매력은 영구적입니다!
                    </p>
                </div>
            </div>
        </div>
    );
}

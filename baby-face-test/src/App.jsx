import React, { useState } from 'react';
import Landing from './components/Landing';
import CameraCapture from './components/CameraCapture';
import Analysis from './components/Analysis';
import Result from './components/Result';

export default function App() {
    const [step, setStep] = useState('landing');
    const [imageData, setImageData] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);

    const goToStep = (nextStep) => setStep(nextStep);

    const handleCapture = (image) => {
        setImageData(image);
        setStep('analysis');
    };

    const handleAnalysisComplete = (result) => {
        setAnalysisResult(result);
        setStep('result');
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden min-h-[600px] flex flex-col relative transition-all duration-500 ease-in-out">
                {step === 'landing' && <Landing onStart={() => goToStep('capture')} />}
                {step === 'capture' && (
                    <CameraCapture
                        onCapture={handleCapture}
                        onBack={() => goToStep('landing')}
                    />
                )}
                {step === 'analysis' && (
                    <Analysis
                        image={imageData}
                        onComplete={handleAnalysisComplete}
                    />
                )}
                {step === 'result' && (
                    <Result
                        image={imageData}
                        result={analysisResult}
                        onRestart={() => goToStep('landing')}
                    />
                )}
            </div>

            <footer className="mt-8 text-gray-400 text-sm font-medium">
                &copy; 2026 TesterLab BabyFace Test
            </footer>
        </div>
    );
}

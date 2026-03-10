import React, { useRef, useState, useEffect } from 'react';
import { Camera, ChevronLeft, Upload, RefreshCcw } from 'lucide-react';

export default function CameraCapture({ onCapture, onBack }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        startCamera();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            const constraints = { video: { facingMode: 'user' } };
            const newStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(newStream);
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }
        } catch (err) {
            setError('카메라를 시작할 수 없습니다. 대신 사진을 업로드해 주세요.');
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = canvas.toDataURL('image/jpeg');
            onCapture(imageData);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onCapture(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex-1 flex flex-col p-6 animate-in slide-in-from-right duration-500">
            <button onClick={onBack} className="self-start mb-6 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-8 h-8 text-gray-400" />
            </button>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">
                얼굴을 확인해 주세요
            </h2>

            <div className="relative aspect-[3/4] bg-gray-100 rounded-[32px] overflow-hidden mb-8 shadow-inner ring-4 ring-[#E3FAEF]">
                {error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                        <p className="text-gray-400 mb-6 font-medium leading-relaxed">{error}</p>
                        <label className="bg-[#40C057] text-white py-4 px-8 rounded-2xl font-bold cursor-pointer transition-all hover:bg-[#37B24D] active:scale-95 shadow-lg flex items-center gap-3">
                            <Upload className="w-5 h-5" />
                            사진 업로드
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                        </label>
                    </div>
                ) : (
                    <>
                        <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover mirror" />
                        <canvas ref={canvasRef} className="hidden" />
                        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 aspect-square border-2 border-dashed border-white/50 rounded-full flex items-center justify-center">
                            <div className="w-full h-full border-2 border-white/20 rounded-full animate-pulse" />
                        </div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full">
                            가이드라인에 맞게 얼굴을 맞춰주세요
                        </div>
                    </>
                )}
            </div>

            <div className="mt-auto space-y-4">
                {!error && (
                    <button
                        onClick={capturePhoto}
                        className="w-full py-5 bg-[#40C057] hover:bg-[#37B24D] text-white rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-3"
                    >
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-[#40C057] rounded-full" />
                        </div>
                        측정하기
                    </button>
                )}

                <label className="w-full py-4 text-gray-500 font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 rounded-2xl transition-colors">
                    <Upload className="w-5 h-5" />
                    갤러리에서 선택
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
            </div>

            <style>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
        </div>
    );
}

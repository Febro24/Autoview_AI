import { useState, useRef, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import DropZone from '@/components/DropZone';
import ImagePreview from '@/components/ImagePreview';
import CarDiagram from '@/components/CarDiagram';
import ConfidenceChart from '@/components/ConfidenceChart';
import History from '@/components/History';
import FeatureCards from '@/components/FeatureCards';
import { predict, loadModel } from '@/lib/model';

export default function Home() {
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [allScores, setAllScores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelStatus, setModelStatus] = useState('loading');
  const [history, setHistory] = useState([]);
  const [inferenceMethod, setInferenceMethod] = useState(null);
  const fileRef = useRef(null);
  const imgRef = useRef(null);

  // Load model on mount
  useEffect(() => {
    loadModel().then((m) => {
      setModelStatus(m ? 'ready' : 'fallback');
    });
  }, []);

  const handleFileSelect = useCallback(async (file) => {
    setLoading(true);
    setPrediction(null);
    setAllScores(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      setPreview(dataUrl);

      // Create image element for inference
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = async () => {
        imgRef.current = img;

        try {
          const result = await predict(img);
          setPrediction(result.prediction);
          setAllScores(result.scores);
          setInferenceMethod(result.method);

          setHistory((prev) => [
            {
              preview: dataUrl,
              prediction: result.prediction.class,
              confidence: result.prediction.confidence,
              filename: file.name,
              time: new Date().toLocaleTimeString(),
              method: result.method,
            },
            ...prev,
          ].slice(0, 12));
        } catch (err) {
          console.error('[AutoView] Prediction error:', err);
        } finally {
          setLoading(false);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  const reset = () => {
    setPreview(null);
    setPrediction(null);
    setAllScores(null);
    setInferenceMethod(null);
  };

  return (
    <>
      <Head>
        <title>AutoViewAI — Vehicle Angle Detection</title>
      </Head>

      <div className="min-h-screen relative">
        {/* Ambient background effects */}
        <div
          className="fixed pointer-events-none"
          style={{
            top: '-30%', right: '-20%', width: '60vw', height: '60vw',
            background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
          }}
        />
        <div
          className="fixed pointer-events-none"
          style={{
            bottom: '-20%', left: '-10%', width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)',
          }}
        />

        <Header modelStatus={modelStatus} />

        <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
          <div className={`grid gap-8 ${preview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
            
            {/* Left: Upload / Image */}
            <div>
              {!preview ? (
                <div className="animate-fade-up">
                  {/* Hero text */}
                  <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                      <span className="text-white/90">Identify </span>
                      <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                        Vehicle Angles
                      </span>
                      <span className="text-white/90"> Instantly</span>
                    </h1>
                    <p className="text-base text-white/30 max-w-lg mx-auto leading-relaxed">
                      Upload a car photo and our AI classifies the camera angle in real-time — 
                      powered by EfficientNet running directly in your browser.
                    </p>
                  </div>
                  <DropZone onFileSelect={handleFileSelect} />
                </div>
              ) : (
                <ImagePreview
                  preview={preview}
                  prediction={prediction}
                  loading={loading}
                  onReset={reset}
                  onUploadAnother={() => fileRef.current?.click()}
                />
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleFileSelect(file);
                }}
                className="hidden"
              />
            </div>

            {/* Right: Results */}
            {preview && (
              <div className="animate-fade-up-delay">
                <CarDiagram prediction={prediction} />
                <ConfidenceChart scores={allScores} />
                <History items={history} />

                {/* Inference method badge */}
                {inferenceMethod && (
                  <div className="mt-4 text-center">
                    <span className="text-[10px] font-mono text-white/15 tracking-wider uppercase">
                      inference: {inferenceMethod === 'tfjs' ? 'tensorflow.js (real model)' : 'pixel heuristic (demo)'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Feature cards when no image */}
        {!preview && <FeatureCards />}

        {/* Footer */}
        <footer className="text-center py-10 px-6">
          <div className="text-[11px] text-white/15 font-mono tracking-[0.08em]">
            CLEARQUOTE TECHNOLOGIES • VEHICLE VIEW CLASSIFICATION • EFFICIENTNETB2 + TFLITE → TF.JS
          </div>
        </footer>
      </div>
    </>
  );
}

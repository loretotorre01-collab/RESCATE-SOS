import { useState, useEffect, useRef } from 'react';
import { Timer, Compass, ChevronRight, Sparkles, X } from 'lucide-react';
import { DiagnosticData } from '../types';
import { POSES } from '../data';

interface RescueYogaStepProps {
  diagnosticData: DiagnosticData | null;
  onNext: () => void;
}

export default function RescueYogaStep({ diagnosticData, onNext }: RescueYogaStepProps) {
  const initialPoseKey = diagnosticData?.symptoms[0] || 'gases';
  const [activePoseKey, setActivePoseKey] = useState<string>(
    POSES[initialPoseKey] ? initialPoseKey : 'gases'
  );
  const [poseTimer, setPoseTimer] = useState<number>(180); // 3 minutes standard
  const [poseTimerActive, setPoseTimerActive] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const poseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (poseTimerActive) {
      poseTimerRef.current = setInterval(() => {
        setPoseTimer((prev) => {
          if (prev <= 1) {
            setPoseTimerActive(false);
            setStatusMessage('¡Postura completada! Esperamos que sientas alivio abdominal.');
            if (poseTimerRef.current) clearInterval(poseTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (poseTimerRef.current) clearInterval(poseTimerRef.current);
    }

    return () => {
      if (poseTimerRef.current) clearInterval(poseTimerRef.current);
    };
  }, [poseTimerActive]);

  const togglePoseTimer = () => {
    setPoseTimerActive(!poseTimerActive);
  };

  const resetPoseTimer = () => {
    setPoseTimerActive(false);
    setPoseTimer(180);
    setStatusMessage(null);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display font-bold text-2xl text-primary mb-1">
          Paso 2: Postura de Alivio Físico
        </h2>
        <p className="text-on-surface-variant text-sm">
          Libera la presión mecánica, los gases atrapados y favorece la digestión con este ejercicio dirigido.
        </p>
      </div>

      {statusMessage && (
        <div className="bg-[#e9f8e9] border border-primary/20 text-primary p-4 rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 flex-shrink-0 text-primary" />
            <p className="text-xs font-semibold">{statusMessage}</p>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="p-1 rounded-full hover:bg-primary/10 text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Symptom pose togglers */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {Object.keys(POSES).map((key) => {
          const active = activePoseKey === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActivePoseKey(key);
                resetPoseTimer();
              }}
              className={`flex-none px-4 py-2 rounded-full font-sans font-semibold text-xs border transition-all ${
                active
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-surface-container-low border-primary/10 text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {POSES[key].target}
            </button>
          );
        })}
      </div>

      {/* Active Posture Card */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-sm border border-primary/10">
        <div className="relative h-64 w-full bg-surface-container-highest overflow-hidden">
          <img
            src={POSES[activePoseKey].image}
            alt={POSES[activePoseKey].name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute bottom-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-sans font-bold">
            Recomendado para: {POSES[activePoseKey].target}
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-display font-bold text-xl text-primary">
                {POSES[activePoseKey].name}
              </h3>
              <p className="text-on-surface-variant text-sm italic font-medium">
                {POSES[activePoseKey].subtitle}
              </p>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <Compass className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#e9f8e9] p-4 rounded-xl border border-primary/5">
            <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1">
              Beneficio Principal
            </span>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              {POSES[activePoseKey].benefit}
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-sans font-bold text-xs text-on-surface uppercase tracking-wider">
              Instrucciones Paso a Paso:
            </h4>
            <ul className="space-y-2">
              {POSES[activePoseKey].steps.map((step, index) => (
                <li key={index} className="flex gap-3 text-xs text-on-surface-variant leading-relaxed">
                  <span className="flex-none w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-[10px] font-bold">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Posture holding timer card */}
      <div className="glass-card rounded-2xl p-5 border border-primary/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary font-sans font-bold text-xs uppercase tracking-wider">
            <Timer className="w-4 h-4" />
            <span>Temporizador de Postura</span>
          </div>
          <button
            onClick={togglePoseTimer}
            className="text-primary font-sans font-bold text-xs underline focus:outline-none"
          >
            {poseTimerActive ? 'Pausar' : 'Iniciar Alivio'}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-2">
          <div className="font-display font-bold text-3xl text-primary">
            {formatTime(poseTimer)}
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(poseTimer / 180) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-center text-[10px] text-on-surface-variant/70 mt-3 italic">
          Mantén una respiración suave y constante durante el ejercicio.
        </p>
      </div>

      {/* Proceed button */}
      <button
        onClick={() => {
          setPoseTimerActive(false);
          onNext();
        }}
        className="w-full bg-primary hover:bg-[#005049] text-white py-4 rounded-xl font-display font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
      >
        <span>Continuar al Paso 3</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

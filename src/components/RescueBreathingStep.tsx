import { useState, useEffect, useRef } from 'react';
import { Pause, Play, RotateCcw, Info, ChevronRight } from 'lucide-react';

interface RescueBreathingStepProps {
  onNext: () => void;
}

export default function RescueBreathingStep({ onNext }: RescueBreathingStepProps) {
  const [breathTechnique, setBreathTechnique] = useState<'diafragmatica' | '478'>('diafragmatica');
  const [breathingActive, setBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhalar' | 'Retener' | 'Exhalar'>('Inhalar');
  const [breathSeconds, setBreathSeconds] = useState<number>(4);
  const [breathingTotalTime, setBreathingTotalTime] = useState<number>(180); // 3 minutes standard
  const breathingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Guide breathing logic
  useEffect(() => {
    if (breathingActive) {
      breathingTimerRef.current = setInterval(() => {
        setBreathingTotalTime((prev) => {
          if (prev <= 1) {
            setBreathingActive(false);
            if (breathingTimerRef.current) clearInterval(breathingTimerRef.current);
            return 0;
          }
          return prev - 1;
        });

        setBreathSeconds((prevSec) => {
          if (prevSec <= 1) {
            // Transition phase
            if (breathTechnique === 'diafragmatica') {
              if (breathPhase === 'Inhalar') {
                setBreathPhase('Exhalar');
                return 4; // Exhale 4s
              } else {
                setBreathPhase('Inhalar');
                return 4; // Inhale 4s
              }
            } else {
              // 4-7-8 Technique
              if (breathPhase === 'Inhalar') {
                setBreathPhase('Retener');
                return 7; // Hold 7s
              } else if (breathPhase === 'Retener') {
                setBreathPhase('Exhalar');
                return 8; // Exhale 8s
              } else {
                setBreathPhase('Inhalar');
                return 4; // Inhale 4s
              }
            }
          }
          return prevSec - 1;
        });
      }, 1000);
    } else {
      if (breathingTimerRef.current) clearInterval(breathingTimerRef.current);
    }

    return () => {
      if (breathingTimerRef.current) clearInterval(breathingTimerRef.current);
    };
  }, [breathingActive, breathPhase, breathTechnique]);

  const toggleBreathing = () => {
    setBreathingActive(!breathingActive);
  };

  const resetBreathing = () => {
    setBreathingActive(false);
    setBreathingTotalTime(180);
    setBreathPhase('Inhalar');
    setBreathSeconds(4);
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
          Paso 1: Protocolo de Respiración
        </h2>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Sincroniza tu cuerpo y mente para calmar el sistema entérico y aliviar la tensión gástrica.
        </p>
      </div>

      {/* Selection of breath type */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setBreathTechnique('diafragmatica');
            resetBreathing();
          }}
          className={`p-4 rounded-xl border text-left transition-all ${
            breathTechnique === 'diafragmatica'
              ? 'bg-primary/5 border-primary shadow-sm'
              : 'bg-white border-primary/10'
          }`}
        >
          <h3 className="font-display font-bold text-sm text-primary">
            Respiración Diafragmática
          </h3>
          <p className="text-on-surface-variant text-xs mt-1">
            Estimula el sistema nervioso entérico.
          </p>
        </button>

        <button
          onClick={() => {
            setBreathTechnique('478');
            resetBreathing();
          }}
          className={`p-4 rounded-xl border text-left transition-all ${
            breathTechnique === '478'
              ? 'bg-primary/5 border-primary shadow-sm'
              : 'bg-white border-primary/10'
          }`}
        >
          <h3 className="font-display font-bold text-sm text-primary">
            Técnica 4-7-8
          </h3>
          <p className="text-on-surface-variant text-xs mt-1">
            Calma profunda y relajación visceral inmediata.
          </p>
        </button>
      </div>

      {/* Breathing Circle Container */}
      <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center border border-primary/10 min-h-[280px]">
        {/* Visual breathing expansion bubble */}
        <div className="relative flex items-center justify-center h-44 w-44">
          <div
            className="absolute rounded-full bg-primary/10 transition-all duration-1000 ease-in-out border border-primary/20"
            style={{
              width:
                breathPhase === 'Inhalar'
                  ? '100%'
                  : breathPhase === 'Retener'
                  ? '85%'
                  : '50%',
              height:
                breathPhase === 'Inhalar'
                  ? '100%'
                  : breathPhase === 'Retener'
                  ? '85%'
                  : '50%',
            }}
          />
          <div
            className="absolute rounded-full bg-primary/20 transition-all duration-1000 ease-in-out"
            style={{
              width:
                breathPhase === 'Inhalar'
                  ? '85%'
                  : breathPhase === 'Retener'
                  ? '85%'
                  : '35%',
              height:
                breathPhase === 'Inhalar'
                  ? '85%'
                  : breathPhase === 'Retener'
                  ? '85%'
                  : '35%',
            }}
          />

          <div className="relative text-center z-10">
            <p className="text-2xl font-bold font-display text-primary">
              {formatTime(breathingTotalTime)}
            </p>
            <p className="text-xs uppercase font-sans font-bold tracking-widest text-primary mt-1">
              {breathingActive ? breathPhase : 'PREPARADO'}
            </p>
            {breathingActive && (
              <p className="text-xl font-extrabold text-[#006058] mt-1">
                {breathSeconds}s
              </p>
            )}
          </div>
        </div>

        {/* Breathing controls */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={toggleBreathing}
            className="bg-primary text-white py-3 px-6 rounded-full font-display font-bold text-sm shadow-md hover:bg-[#005049] transition-all flex items-center gap-2"
          >
            {breathingActive ? (
              <>
                <Pause className="w-4 h-4 fill-white" /> Pausar
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Iniciar Rescate
              </>
            )}
          </button>
          <button
            onClick={resetBreathing}
            className="border border-primary/20 text-primary hover:bg-primary/5 p-3 rounded-full transition-all"
            aria-label="Reiniciar temporizador"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Diaphragm benefit info card */}
      <div className="bg-[#eefdee] rounded-xl p-4 border border-primary/10 flex items-start gap-3">
        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-display font-bold text-xs text-primary uppercase tracking-wider mb-1">
            Beneficio del Diafragma
          </h4>
          <p className="text-on-surface-variant text-xs leading-relaxed">
            La respiración profunda estimula el nervio vago, lo que reduce drásticamente las señales de espasmo en el tracto digestivo de manera inmediata.
          </p>
        </div>
      </div>

      {/* Bottom Action bar */}
      <button
        onClick={() => {
          setBreathingActive(false);
          onNext();
        }}
        className="w-full bg-primary hover:bg-[#005049] text-white py-4 rounded-xl font-display font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform mt-4"
      >
        <span>Continuar al Paso 2</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Leaf, Sparkles, Sprout, Flame, Timer, ArrowRight, X } from 'lucide-react';
import { ELIXIRS } from '../data';

interface RescueElixirsStepProps {
  onNext: () => void;
}

export default function RescueElixirsStep({ onNext }: RescueElixirsStepProps) {
  const [selectedElixirKey, setSelectedElixirKey] = useState<string>('dandelion');
  const [elixirTimer, setElixirTimer] = useState<number>(300); // 5 minutes standard
  const [elixirTimerActive, setElixirTimerActive] = useState<boolean>(false);
  const [showElixirModal, setShowElixirModal] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const elixirTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (elixirTimerActive) {
      elixirTimerRef.current = setInterval(() => {
        setElixirTimer((prev) => {
          if (prev <= 1) {
            setElixirTimerActive(false);
            setShowElixirModal(false);
            setStatusMessage('¡Elixir infusionado con éxito! Bebe despacio a sorbos templados.');
            if (elixirTimerRef.current) clearInterval(elixirTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (elixirTimerRef.current) clearInterval(elixirTimerRef.current);
    }

    return () => {
      if (elixirTimerRef.current) clearInterval(elixirTimerRef.current);
    };
  }, [elixirTimerActive]);

  const startElixirInfusion = () => {
    setElixirTimer(300); // 5 minutes
    setElixirTimerActive(true);
    setShowElixirModal(true);
    setStatusMessage(null);
  };

  const stopElixirInfusion = () => {
    setElixirTimerActive(false);
    setShowElixirModal(false);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getElixirIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-primary" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-primary" />;
      case 'Sprout':
        return <Sprout className="w-6 h-6 text-primary" />;
      case 'FlameKindling':
        return <Flame className="w-6 h-6 text-primary" />;
      default:
        return <Leaf className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display font-bold text-2xl text-primary mb-1">
          Paso 4: Elixir Medicinal
        </h2>
        <p className="text-on-surface-variant text-sm">
          Selecciona el elixir herbario natural que mejor se adapte para apaciguar tus espasmos o digestión pesada.
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

      {/* Bento-style selection banner image */}
      <div className="relative h-44 rounded-2xl overflow-hidden shadow-sm border border-primary/15">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaOg5O_KR0xzHKy3Dtf1ZXvaoP1YacZQYNYFMVZb1cr6J4ySpaKn6bb9Jvn1dws3MFdK0LVl7vIp9NAv2KLTx84oShBo7ahZV93bmLOnpQu5rJC21p9YbtVh2xdfgVbgaZ9NKDugSi-pI1w5BPHwLpgBa2upC5Wndlpn8H2F6IeCbyP__LMjbhVITWjohYlrDgzQMcfA3oCFmkr5Dm5w5Gl_VeNCfJcRd5UI6kWxY8ZvEjZZgf0sOpbVTkTTfVl-qnDZ_iaUo8L9o"
          alt="Hojas de infusión de menta"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <span className="bg-primary/90 text-white font-sans text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Ingredientes 100% Naturales
          </span>
        </div>
      </div>

      {/* Elixir Option Cards Selection */}
      <div className="grid grid-cols-2 gap-3">
        {Object.keys(ELIXIRS).map((key) => {
          const elixir = ELIXIRS[key];
          const active = selectedElixirKey === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedElixirKey(key)}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2.5 transition-all text-center ${
                active
                  ? 'bg-primary/5 border-primary shadow-sm scale-[1.02]'
                  : 'bg-white border-primary/10 hover:border-primary/20'
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-[#eefdee] flex items-center justify-center">
                {getElixirIcon(elixir.icon)}
              </div>
              <span className="font-display font-bold text-xs text-on-surface">
                {elixir.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Elixir info */}
      <div className="glass-card rounded-2xl p-6 border border-primary/10 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
            {getElixirIcon(ELIXIRS[selectedElixirKey].icon)}
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-on-surface">
              {ELIXIRS[selectedElixirKey].title}
            </h3>
            <p className="text-[10px] text-primary uppercase tracking-widest font-bold">
              Elixir Medicinal Preparado
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div>
            <h4 className="font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider mb-1">
              Beneficios
            </h4>
            <p className="text-xs text-on-surface leading-relaxed">
              {ELIXIRS[selectedElixirKey].benefits}
            </p>
          </div>

          <div className="bg-[#e9f8e9] p-4 rounded-xl border border-primary/5">
            <h4 className="font-sans font-bold text-xs text-primary mb-1.5 uppercase tracking-wider">
              Receta Rápida
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed whitespace-pre-line">
              {ELIXIRS[selectedElixirKey].steps}
            </p>
          </div>

          {/* Timer activation */}
          <button
            onClick={startElixirInfusion}
            className="w-full bg-primary hover:bg-[#005049] text-white py-3.5 px-6 rounded-full font-display font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Timer className="w-4 h-4" />
            <span>Iniciar Temporizador (5:00)</span>
          </button>
        </div>
      </div>

      {/* Proceed button */}
      <button
        onClick={() => {
          setElixirTimerActive(false);
          onNext();
        }}
        className="w-full bg-surface-container-highest border border-primary/20 text-primary py-4 rounded-xl font-display font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
      >
        <span>Continuar al Paso 5 (Comida de Rescate)</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* STEP 4 INFUSION OVERLAY TIMER */}
      {showElixirModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md px-5 animate-fade-in">
          <div className="glass-card w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl space-y-6">
            <h3 className="font-display font-bold text-lg text-primary">
              Infusionando...
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-[90%] mx-auto">
              Respira profundamente y relaja tu musculatura mientras el elixir herbario de{' '}
              <span className="font-bold text-primary">{ELIXIRS[selectedElixirKey].title}</span> se activa.
            </p>

            {/* Countdown ring */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  className="text-surface-container-highest"
                  cx="72"
                  cy="72"
                  fill="transparent"
                  r="64"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-primary transition-all duration-1000 ease-linear"
                  cx="72"
                  cy="72"
                  fill="transparent"
                  r="64"
                  stroke="currentColor"
                  strokeDasharray="402"
                  strokeDashoffset={402 - (elixirTimer / 300) * 402}
                  strokeWidth="8"
                />
              </svg>
              <div className="absolute font-display font-bold text-2xl text-primary">
                {formatTime(elixirTimer)}
              </div>
            </div>

            <button
              onClick={stopElixirInfusion}
              className="text-error font-sans font-bold text-xs hover:bg-error/10 px-5 py-2 rounded-full transition-colors focus:outline-none"
            >
              Cancelar Infusión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Moon, Sparkles, Play, Pause, RotateCcw } from 'lucide-react';

const RELAX_DURATION = 740; // 12:20 de descanso consciente

export default function ResourcesTab() {
  // ---- Temporizador de Descanso Consciente (post-cena) ----
  const [relaxTime, setRelaxTime] = useState(RELAX_DURATION);
  const [isRelaxing, setIsRelaxing] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRelaxing) {
      intervalRef.current = setInterval(() => {
        setRelaxTime(prev => {
          if (prev <= 1) {
            setIsRelaxing(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRelaxing]);

  const toggleRelax = () => setIsRelaxing(!isRelaxing);
  const resetRelax = () => {
    setIsRelaxing(false);
    setRelaxTime(RELAX_DURATION);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ---- Cuenta atrás real hasta las 17:00 (antes mostraba "--:--" fijo) ----
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    // Actualizar cada 30 segundos es suficiente para un contador de horas:minutos
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(now);
  target.setHours(17, 0, 0, 0);
  const diffMin = Math.floor((target.getTime() - now.getTime()) / 60000);
  const isPastFive = diffMin <= 0;

  const countdownStr = isPastFive
    ? '✓'
    : `${Math.floor(diffMin / 60)}:${String(diffMin % 60).padStart(2, '0')}`;
  const countdownLabel = isPastFive
    ? 'Hora cumplida hoy'
    : diffMin <= 60
    ? '¡Falta poco!'
    : 'Horas restantes';

  // Progreso del día hacia las 17:00 (0% a medianoche, 100% a las 17:00)
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
  const dayProgress = Math.min(100, Math.round((minutesSinceMidnight / (17 * 60)) * 100));

  return (
    <div className="space-y-6 pb-28 animate-fade-in text-on-surface">
      {/* Header */}
      <section className="text-left">
        <h2 className="font-display font-bold text-2xl text-on-surface">
          Tu Rutina Nocturna
        </h2>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Dos momentos clave cada tarde para preparar tu digestión y cerrar el día con el abdomen en calma.
        </p>
      </section>

      {/* Rutina Nocturna */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
            <Moon className="w-5 h-5 text-primary fill-primary/10" />
            <span>Rutina Nocturna</span>
          </h3>
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        </div>

        <div className="space-y-3">
          {/* Tarjeta 1: Preparación de infusión (17:00) */}
          <div className="bg-surface-container-low rounded-2xl p-5 flex flex-col gap-3.5 border border-primary/10">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-sans font-extrabold text-[10px] text-primary uppercase tracking-wider block mb-0.5">
                  Preparación de infusión
                </span>
                <h4 className="font-display font-bold text-base text-on-surface">
                  Momento Clave: 17:00
                </h4>
              </div>
              <div className="text-right">
                <span className="font-display font-black text-xl text-primary block leading-none">
                  {countdownStr}
                </span>
                <span className="text-[9px] font-sans font-bold text-on-surface-variant uppercase tracking-wider mt-0.5 inline-block">
                  {countdownLabel}
                </span>
              </div>
            </div>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              Hora ideal para ingerir la última infusión digestiva del día y reducir
              paulatinamente el ritmo metabólico antes de la cena.
            </p>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${dayProgress}%` }}
              />
            </div>
          </div>

          {/* Tarjeta 2: Descanso consciente (post-cena) */}
          <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 border border-primary/15 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-sans font-extrabold text-[10px] text-secondary uppercase tracking-wider block mb-0.5">
                  Descanso consciente
                </span>
                <h4 className="font-display font-bold text-base text-on-surface">
                  Post-Cena
                </h4>
              </div>
              <div className="text-right">
                <span className="font-display font-black text-xl text-on-surface block leading-none">
                  {formatTime(relaxTime)}
                </span>
                <span className="text-[9px] font-sans font-bold text-on-surface-variant uppercase tracking-wider mt-0.5 inline-block">
                  Minutos de relax
                </span>
              </div>
            </div>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              Disfruta de este tiempo para favorecer la desinflamación y la tranquilidad de tu abdomen.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleRelax}
                className="flex-grow bg-primary hover:bg-[#005049] text-white py-3 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                {isRelaxing ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" /> Pausar Relax
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" /> Iniciar Descanso Consciente
                  </>
                )}
              </button>
              <button
                onClick={resetRelax}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-primary/20 hover:bg-primary/5 text-on-surface-variant active:scale-90 transition-transform"
                aria-label="Reiniciar rutina nocturna"
              >
                <RotateCcw className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Frase de cierre */}
      <div className="pt-2 flex justify-center">
        <div className="w-full max-w-[300px] rounded-full border-2 border-primary/15 flex items-center justify-center relative p-5 bg-[#e9f8e9]/30">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl pointer-events-none" />
          <div className="text-center relative z-10 px-4">
            <p className="font-sans font-medium text-[11px] text-on-surface-variant italic leading-relaxed">
              &ldquo;Un abdomen en paz es el centro de un cuerpo con energía.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
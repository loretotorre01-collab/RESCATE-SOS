import { useState, useEffect, useRef } from 'react';
import { Timer, Compass, ChevronRight, AlertTriangle } from 'lucide-react';

interface RescueMassageStepProps {
  onNext: () => void;
}

export default function RescueMassageStep({ onNext }: RescueMassageStepProps) {
  const [activeMassageStep, setActiveMassageStep] = useState<number>(1);
  const [massageTimer, setMassageTimer] = useState<number>(180); // 3 minutes standard
  const [massageTimerActive, setMassageTimerActive] = useState<boolean>(false);
  const massageTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (massageTimerActive) {
      massageTimerRef.current = setInterval(() => {
        setMassageTimer((prev) => {
          if (prev <= 1) {
            setMassageTimerActive(false);
            alert('¡Sesión de automasaje completada! Siente la ligereza de tu vientre.');
            if (massageTimerRef.current) clearInterval(massageTimerRef.current);
            return 0;
          }

          // Cycle active massage step every 45 seconds to keep the guide interactive
          const cycleStep = 4 - Math.floor((prev - 1) / 45);
          setActiveMassageStep(Math.min(Math.max(cycleStep, 1), 4));

          return prev - 1;
        });
      }, 1000);
    } else {
      if (massageTimerRef.current) clearInterval(massageTimerRef.current);
    }

    return () => {
      if (massageTimerRef.current) clearInterval(massageTimerRef.current);
    };
  }, [massageTimerActive]);

  const toggleMassageTimer = () => {
    setMassageTimerActive(!massageTimerActive);
  };

  const resetMassageTimer = () => {
    setMassageTimerActive(false);
    setMassageTimer(180);
    setActiveMassageStep(1);
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
          Paso 3: Guía de Masaje Intestinal
        </h2>
        <p className="text-on-surface-variant text-sm">
          Sigue el sentido natural de las agujas del reloj para ayudar al tránsito intestinal y desinflamar la pared abdominal.
        </p>
      </div>

      {/* Interactive schematic massage diagram */}
      <div className="glass-card rounded-2xl p-6 border border-primary/10 shadow-sm flex flex-col items-center">
        <span className="text-[10px] bg-primary/15 text-primary px-3 py-1 rounded-full font-sans font-bold uppercase tracking-wider mb-4">
          Sentido de las agujas del reloj
        </span>

        {/* Stylized vector representation of large intestine (colon) */}
        <div className="relative w-full max-w-[240px] h-48 bg-surface-container-low rounded-xl border border-primary/10 flex items-center justify-center overflow-hidden">
          {/* Outer colon frame */}
          <div className="w-36 h-36 border-4 border-dashed border-[#bacac6] rounded-full relative flex items-center justify-center">
            {/* Glowing highlighted arrows for active step */}
            {activeMassageStep === 1 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#40e0d0]/20 border-2 border-primary rounded-full animate-pulse flex items-center justify-center text-primary font-bold text-xs">
                  Centro
                </div>
              </div>
            )}

            {/* 2: Ascenso (right side of colon, bottom-to-top) */}
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-primary/10 border rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
                activeMassageStep === 2
                  ? 'bg-[#40e0d0]/30 border-primary shadow-md scale-110'
                  : 'border-transparent'
              }`}
            >
              <span className="text-[9px] font-bold text-primary">↑</span>
              <span className="text-[8px] font-semibold text-primary font-sans">Subir</span>
            </div>

            {/* 3: Transverso (top side, right-to-left) */}
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-6 bg-primary/10 border rounded-lg flex items-center justify-center gap-1 transition-all duration-300 ${
                activeMassageStep === 3
                  ? 'bg-[#40e0d0]/30 border-primary shadow-md scale-110'
                  : 'border-transparent'
              }`}
            >
              <span className="text-[9px] font-bold text-primary">←</span>
              <span className="text-[8px] font-semibold text-primary font-sans">Cruzado</span>
            </div>

            {/* 4: Descenso (left side, top-to-bottom) */}
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-primary/10 border rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
                activeMassageStep === 4
                  ? 'bg-[#40e0d0]/30 border-primary shadow-md scale-110'
                  : 'border-transparent'
              }`}
            >
              <span className="text-[8px] font-semibold text-primary font-sans">Bajar</span>
              <span className="text-[9px] font-bold text-primary">↓</span>
            </div>

            {/* Core colon graphic placeholder text */}
            <div className="text-[9px] font-semibold text-on-surface-variant uppercase text-center tracking-wider max-w-[80%] leading-tight pointer-events-none">
              Colon <br /> Ascendente → Descendente
            </div>
          </div>
        </div>

        <div className="w-full mt-4 flex items-center justify-between text-xs text-on-surface-variant font-sans font-semibold border-t border-primary/10 pt-3">
          <span className="flex items-center gap-1 text-primary">
            <Compass className="w-4 h-4" /> Movimientos circulares
          </span>
          <span className="text-[#006a62]">Educativo</span>
        </div>
      </div>

      {/* Interactive list of steps */}
      <div className="space-y-3">
        <h3 className="font-sans font-bold text-sm text-on-surface uppercase tracking-wider mb-1">
          Pasos del Automasaje:
        </h3>

        {/* Step 1 */}
        <div
          onClick={() => setActiveMassageStep(1)}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeMassageStep === 1
              ? 'bg-primary/5 border-primary shadow-sm'
              : 'bg-white border-primary/5 hover:bg-surface-container-low'
          }`}
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold">
              1
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-on-surface">Preparación</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed mt-0.5">
                Túmbate boca arriba en una superficie cómoda con las rodillas ligeramente flexionadas. Pon tus palmas templadas sobre tu ombligo.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div
          onClick={() => setActiveMassageStep(2)}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeMassageStep === 2
              ? 'bg-primary/5 border-primary shadow-sm'
              : 'bg-white border-primary/5 hover:bg-surface-container-low'
          }`}
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold">
              2
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-on-surface">Ascenso (Lado Derecho)</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed mt-0.5">
                Realiza movimientos circulares suaves con presión ligera desde la ingle derecha hacia arriba, hasta alcanzar las costillas derechas.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div
          onClick={() => setActiveMassageStep(3)}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeMassageStep === 3
              ? 'bg-primary/5 border-primary shadow-sm'
              : 'bg-white border-primary/5 hover:bg-surface-container-low'
          }`}
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold">
              3
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-on-surface">Transverso (Superior)</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed mt-0.5">
                Desliza tus dedos horizontalmente por debajo de las costillas inferiores, dirigiéndote desde el lado derecho hacia el lado izquierdo.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div
          onClick={() => setActiveMassageStep(4)}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeMassageStep === 4
              ? 'bg-primary/5 border-primary shadow-sm'
              : 'bg-white border-primary/5 hover:bg-surface-container-low'
          }`}
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold">
              4
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-on-surface">Descenso (Lado Izquierdo)</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed mt-0.5">
                Baja ejerciendo una sutil compresión desde las costillas izquierdas hacia la ingle izquierda, completando el círculo evacuador.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Massage timer container */}
      <div className="glass-card rounded-2xl p-5 border border-primary/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary font-sans font-bold text-xs uppercase tracking-wider">
            <Timer className="w-4 h-4" />
            <span>Tiempo de Masaje Recomendado</span>
          </div>
          <button
            onClick={toggleMassageTimer}
            className="text-primary font-sans font-bold text-xs underline focus:outline-none"
          >
            {massageTimerActive ? 'Pausar' : 'Iniciar Guía'}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-2">
          <div className="font-display font-bold text-3xl text-primary">
            {formatTime(massageTimer)}
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(massageTimer / 180) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-center text-[10px] text-on-surface-variant/70 mt-3 italic">
          Realiza el automasaje de forma constante y relajada.
        </p>
      </div>

      {/* Contraindications Warning card */}
      <div className="bg-error-container text-[#ba1a1a] p-4 rounded-xl border border-error/10 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-1">
            Contraindicaciones
          </h4>
          <ul className="list-disc list-inside text-[11px] leading-relaxed space-y-1 opacity-90">
            <li>Evitar en caso de dolor agudo intenso, fiebre o sospecha de apendicitis.</li>
            <li>No realizar inmediatamente después de una comida copiosa (esperar 2 horas).</li>
            <li>Consultar al médico en caso de embarazo o cirugías abdominales recientes.</li>
          </ul>
        </div>
      </div>

      {/* Proceed button */}
      <button
        onClick={() => {
          setMassageTimerActive(false);
          onNext();
        }}
        className="w-full bg-primary hover:bg-[#005049] text-white py-4 rounded-xl font-display font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
      >
        <span>Continuar al Paso 4: Elixir Medicinal</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

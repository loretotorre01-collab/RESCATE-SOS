import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  ClipboardList,
  Leaf,
  Moon,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Download,
  Info
} from 'lucide-react';
import { RESOURCES } from '../data';

interface ResourcesTabProps {
  onStartMassageTimer?: () => void;
}

export default function ResourcesTab({ onStartMassageTimer }: ResourcesTabProps) {
  // Timer State for the "Post-Cena" relaxation routine
  const [relaxSeconds, setRelaxSeconds] = useState<number>(740); // 12m 20s
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setRelaxSeconds((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setRelaxSeconds(740); // Reset to 12:20
  };

  const [downloadedResource, setDownloadedResource] = useState<string | null>(null);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = (resourceName: string) => {
    setDownloadedResource(resourceName);
    setTimeout(() => {
      setDownloadedResource((prev) => (prev === resourceName ? null : prev));
    }, 4000);
  };

  return (
    <div className="space-y-6 pb-28 animate-fade-in text-on-surface">
      {/* Welcome Title section */}
      <section className="text-left">
        <h2 className="font-display font-bold text-2xl text-on-surface">
          Tus Recursos de Bienestar
        </h2>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Accede a tu biblioteca exclusiva de herramientas diseñadas para el alivio sistemático y la salud digestiva a largo plazo.
        </p>
      </section>

      {downloadedResource && (
        <div className="bg-[#e9f8e9] border border-primary/20 text-primary p-4 rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 flex-shrink-0 text-primary" />
            <p className="text-xs font-semibold">
              ¡Descarga iniciada! Se está guardando el archivo "{downloadedResource}" en tu dispositivo.
            </p>
          </div>
          <button
            onClick={() => setDownloadedResource(null)}
            className="text-xs font-bold text-primary hover:text-black font-sans px-2"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Asymmetric Bento-like Resources layout */}
      <div className="grid grid-cols-1 gap-4">
        {/* Manual Card */}
        <div
          onClick={() => handleDownload('Manual de Bienestar Abdominal.pdf')}
          className="glass-card rounded-2xl p-5 flex flex-col gap-4 shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-all border border-primary/5"
        >
          <div className="absolute top-2 right-2 p-4 opacity-10">
            <BookOpen className="w-16 h-16 text-primary" />
          </div>

          <div className="flex items-start justify-between">
            <div className="p-3 rounded-full bg-primary-container text-on-primary-container">
              <BookOpen className="w-5 h-5 fill-primary/15" />
            </div>
            <span className="font-sans font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-surface-container-high rounded text-primary border border-primary/5">
              PDF • 15 pág
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-base text-on-surface mb-1 group-hover:text-primary transition-colors">
              Manual de Bienestar Abdominal
            </h3>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              Guía paso a paso sobre anatomía visceral, respiración rítmica y automasaje restaurativo.
            </p>
          </div>

          <button className="flex items-center gap-1.5 text-primary font-sans font-bold text-xs mt-1 group-hover:translate-x-1.5 transition-transform self-start">
            <span>Ver Recurso</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Protocol Card Horizontal */}
        <div className="glass-card rounded-2xl p-4 flex items-center justify-between shadow-sm border-l-4 border-primary border-y border-r border-primary/5 relative">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#c6e9e9] flex items-center justify-center text-[#006058]">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xs text-on-surface leading-tight">
                Protocolo de Intervención Integral
              </h3>
              <p className="text-[11px] text-on-surface-variant mt-0.5 font-medium">
                Metodología clínica de 3 fases para el colon irritable
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDownload('Protocolo de Intervención Integral.pdf')}
            className="p-2 rounded-full hover:bg-surface-container-high text-primary active:scale-95 transition-all"
            aria-label="Descargar protocolo"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Compendio Card (Full Width with decorative pattern) */}
        <div
          onClick={() => handleDownload('Compendio de Remedios Naturales.pdf')}
          className="relative rounded-2xl bg-primary text-white p-5 shadow-md overflow-hidden group cursor-pointer border border-primary/10"
        >
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2.5">
              <Leaf className="w-6 h-6 text-primary-container fill-primary-container/10" />
              <h3 className="font-display font-bold text-base">
                Compendio de Remedios Naturales
              </h3>
            </div>
            <p className="text-white/95 text-xs leading-relaxed max-w-[90%]">
              Catálogo de infusiones, aceites esenciales anti-gases y técnicas ancestrales validadas científicamente para apaciguar la distensión gástrica de forma eficaz.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[9px] uppercase tracking-wider font-extrabold bg-white/15 px-2 py-0.5 rounded border border-white/5">
                Infusiones
              </span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold bg-white/15 px-2 py-0.5 rounded border border-white/5">
                Tópicos
              </span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold bg-white/15 px-2 py-0.5 rounded border border-white/5">
                Dietética
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rutina Nocturna Section */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-primary flex items-center gap-2">
            <Moon className="w-5 h-5 text-primary fill-primary/10" />
            <span>Rutina Nocturna</span>
          </h2>
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        </div>

        <div className="space-y-3">
          {/* Timer Card 1 (Static Progress) */}
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
                  --:--
                </span>
                <span className="text-[9px] font-sans font-bold text-on-surface-variant uppercase tracking-wider mt-0.5 inline-block">
                  Falta poco
                </span>
              </div>
            </div>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              Hora ideal para ingerir la última infusión digestiva del día y reducir paulatinamente el ritmo metabólico antes de la cena.
            </p>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '65%' }} />
            </div>
          </div>

          {/* Timer Card 2 (Active Interactive relaxation clock) */}
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
                  {formatTime(relaxSeconds)}
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
                onClick={toggleTimer}
                className="flex-grow bg-primary hover:bg-[#005049] text-white py-3 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                {timerActive ? (
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
                onClick={resetTimer}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-primary/20 hover:bg-primary/5 text-on-surface-variant active:scale-90 transition-transform"
                aria-label="Reiniciar rutina nocturna"
              >
                <RotateCcw className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Anchor Quote Capsule */}
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

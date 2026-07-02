import { useState } from 'react';
import { X, CheckCircle, Smile, Meh, Frown, ArrowRight } from 'lucide-react';

interface EvaluationModalProps {
  onSave: (intensityAfter: number, notes: string, reliefRate: number) => void;
  onClose: () => void;
}

export default function EvaluationModal({ onSave, onClose }: EvaluationModalProps) {
  const [intensityAfter, setIntensityAfter] = useState<number>(3);
  const [reliefOption, setReliefOption] = useState<'totally' | 'little' | 'same' | null>('little');
  const [notes, setNotes] = useState<string>('');

  const getIntensityInfo = (level: number) => {
    if (level === 0) return { label: 'Sin dolor', color: 'text-primary' };
    if (level <= 3) return { label: 'Leve', color: 'text-primary' };
    if (level <= 7) return { label: 'Moderado', color: 'text-[#d97706]' };
    return { label: 'Intenso', color: 'text-error' };
  };

  const currentInfo = getIntensityInfo(intensityAfter);

  const handleSubmit = () => {
    // Calculate relief rate
    let reliefRate = 0;
    if (reliefOption === 'totally') reliefRate = 85;
    else if (reliefOption === 'little') reliefRate = 45;
    else reliefRate = 15;

    onSave(intensityAfter, notes, reliefRate);
  };

  return (
    <div className="space-y-6 pb-28 animate-fade-in text-on-surface">
      {/* Hero Header */}
      <section className="text-center py-4">
        <div className="inline-flex items-center justify-center p-4 bg-secondary-container rounded-full mb-3 animate-pulse">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display font-bold text-2xl text-on-surface mb-1">
          ¿Cómo te sientes ahora?
        </h2>
        <p className="text-on-surface-variant text-sm leading-relaxed max-w-[90%] mx-auto">
          Tu bienestar es nuestra prioridad. Cuéntanos cómo ha evolucionado tu malestar tras realizar el protocolo.
        </p>
      </section>

      {/* Distress scale adjustment card */}
      <div className="glass-card rounded-xl p-6 shadow-sm border border-primary/5">
        <label className="block font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider mb-4">
          Selecciona tu nivel de malestar actual
        </label>
        <div className="relative pt-2 pb-2">
          <input
            type="range"
            min="0"
            max="10"
            value={intensityAfter}
            onChange={(e) => setIntensityAfter(parseInt(e.target.value))}
            className="w-full h-2 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
            style={{
              background: `linear-gradient(to right, #006a62 0%, #40e0d0 ${
                (intensityAfter / 10) * 100
              }%, #d8e6d8 ${(intensityAfter / 10) * 100}%, #d8e6d8 100%)`,
            }}
          />
          <div className="flex justify-between mt-4 px-1 text-xs font-semibold">
            <span className="text-primary font-bold">0 (Sin dolor)</span>
            <span className="text-error font-bold">10 (Máximo)</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-primary-container/20 rounded-lg border border-primary/10 text-center transition-all">
          <span className={`font-display font-extrabold text-base ${currentInfo.color}`}>
            Nivel Actual: {intensityAfter} ({currentInfo.label})
          </span>
        </div>
      </div>

      {/* Symptom Specific Question Option group */}
      <div className="glass-card rounded-xl p-6 shadow-sm border border-primary/5">
        <h3 className="font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider mb-3">
          ¿Ha disminuido tu <span className="text-primary italic font-semibold">tensión abdominal</span>?
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Option 1: Yes, totally */}
          <button
            onClick={() => setReliefOption('totally')}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
              reliefOption === 'totally'
                ? 'bg-primary/5 border-primary text-primary shadow-sm'
                : 'bg-white border-primary/10 hover:bg-surface-container-low text-on-surface-variant'
            }`}
          >
            <div className="flex items-center gap-3">
              <Smile className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold">Sí, totalmente</span>
            </div>
            {reliefOption === 'totally' && <CheckCircle className="w-4 h-4 text-primary" />}
          </button>

          {/* Option 2: A little */}
          <button
            onClick={() => setReliefOption('little')}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
              reliefOption === 'little'
                ? 'bg-primary/5 border-primary text-primary shadow-sm'
                : 'bg-white border-primary/10 hover:bg-surface-container-low text-on-surface-variant'
            }`}
          >
            <div className="flex items-center gap-3">
              <Smile className="w-5 h-5 text-secondary" />
              <span className="text-xs font-semibold">Un poco</span>
            </div>
            {reliefOption === 'little' && <CheckCircle className="w-4 h-4 text-primary" />}
          </button>

          {/* Option 3: Same */}
          <button
            onClick={() => setReliefOption('same')}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
              reliefOption === 'same'
                ? 'bg-primary/5 border-primary text-primary shadow-sm'
                : 'bg-white border-primary/10 hover:bg-surface-container-low text-on-surface-variant'
            }`}
          >
            <div className="flex items-center gap-3">
              <Meh className="w-5 h-5 text-on-surface-variant/70" />
              <span className="text-xs font-semibold">Sigue igual</span>
            </div>
            {reliefOption === 'same' && <CheckCircle className="w-4 h-4 text-primary" />}
          </button>
        </div>
      </div>

      {/* Personal Notes TextArea */}
      <div className="glass-card rounded-xl p-6 shadow-sm border border-primary/5">
        <label htmlFor="eval-notes" className="block font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider mb-2">
          ¿Algo más que quieras registrar en tu historial?
        </label>
        <textarea
          id="eval-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ej: Me siento mucho más ligera, el dolor sordo de estómago casi ha desaparecido por completo..."
          rows={3}
          className="w-full bg-surface-container-lowest border border-primary/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-3 text-xs text-on-surface leading-relaxed placeholder:text-on-surface-variant/40"
        />
      </div>

      {/* Submitting pill illustration background effect */}
      <div className="relative w-full h-24 rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-primary font-display font-semibold text-xs px-6 py-2 bg-primary/10 border border-primary/20 rounded-full">
          Procesando tu bienestar...
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-[#005049] text-white py-4 px-6 rounded-2xl font-display font-bold text-md shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          id="btn-save-evaluation"
        >
          <span>Guardar y Ver Historial</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

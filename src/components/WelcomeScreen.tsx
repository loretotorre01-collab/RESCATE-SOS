import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, CheckCircle, ArrowRight, Shield, Leaf, Activity, Check } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
  initialName?: string;
  isTab?: boolean;
}

export default function WelcomeScreen({ onComplete, initialName = '', isTab = false }: WelcomeScreenProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (initialName) {
      setName(initialName);
    }
  }, [initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, introduce tu nombre para personalizar tu experiencia.');
      return;
    }
    onComplete(name.trim());
    if (isTab) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className={`${isTab ? 'space-y-6 pb-28 animate-fade-in' : 'min-h-screen bg-surface flex flex-col justify-between p-6 md:p-12 animate-fade-in'} text-on-surface`}>
      {/* Decorative Top Accent - only on fullscreen onboarding */}
      {!isTab && (
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-[#40e0d0] to-primary" />
      )}

      {/* Main Content Card Container */}
      <div className={`${isTab ? 'w-full space-y-6' : 'max-w-[550px] mx-auto w-full my-auto space-y-8 py-8'}`}>
        
        {/* Header and Brand */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-4 bg-primary-container rounded-3xl shadow-sm animate-pulse mb-2">
            <Heart className="w-10 h-10 text-primary fill-primary/10" />
          </div>
          <h1 className="font-display font-black text-3xl md:text-4xl text-primary tracking-tight">
            S.O.S. Abdomen Feliz
          </h1>
          <p className="text-on-surface-variant font-medium text-xs uppercase tracking-widest">
            Alivio Digestivo e Intestinal Inmediato
          </p>
        </header>

        {/* Objective & Description */}
        <section className="bg-white rounded-2xl p-6 border border-primary/5 shadow-sm space-y-3">
          <h2 className="font-display font-bold text-lg text-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Nuestro Objetivo</span>
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Acompañarte sistemáticamente en los momentos de mayor distensión, gases o incomodidad intestinal. A través de un método clínico integral en 3 fases (respiración consciente, yoga adaptativo y automasaje de colon), devolvemos la ligereza y el bienestar natural a tu abdomen de forma inmediata y natural.
          </p>
        </section>

        {/* Benefits Section */}
        <section className="space-y-4">
          <h3 className="font-display font-bold text-xs text-on-surface-variant uppercase tracking-wider pl-1">
            Beneficios de tu Protocolo Diario
          </h3>
          <div className="grid grid-cols-1 gap-3.5">
            {/* Benefit 1 */}
            <div className="flex gap-4 p-4 rounded-xl bg-[#e9f8e9]/40 border border-primary/5">
              <div className="p-2 bg-white rounded-lg text-primary shadow-sm flex-shrink-0 h-10 w-10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs text-on-surface">Alivio Sintomático Rápido</h4>
                <p className="text-on-surface-variant text-[11px] leading-relaxed mt-0.5">
                  Técnicas basadas en fisioterapia y yoga clínico para reducir la hinchazón abdominal en minutos.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex gap-4 p-4 rounded-xl bg-[#e9f8e9]/40 border border-primary/5">
              <div className="p-2 bg-white rounded-lg text-primary shadow-sm flex-shrink-0 h-10 w-10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs text-on-surface">Diagnóstico S.O.S.</h4>
                <p className="text-on-surface-variant text-[11px] leading-relaxed mt-0.5">
                  Identificamos el origen y tipo de molestia para recomendarte posturas de yoga y masajes específicos.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex gap-4 p-4 rounded-xl bg-[#e9f8e9]/40 border border-primary/5">
              <div className="p-2 bg-white rounded-lg text-primary shadow-sm flex-shrink-0 h-10 w-10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs text-on-surface">Recursos de Bienestar y Hábitos</h4>
                <p className="text-on-surface-variant text-[11px] leading-relaxed mt-0.5">
                  Catálogo de infusiones calmantes, manuales de salud digestiva, y racha de ligereza para monitorizar tu éxito.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Name personalization input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="glass-card rounded-2xl p-6 border border-primary/10 shadow-sm space-y-4">
            <label htmlFor="user-name" className="block font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider">
              ¿Cómo te gustaría que te llamemos?
            </label>
            <div className="space-y-1.5">
              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                  setIsSaved(false);
                }}
                placeholder="Escribe tu nombre aquí..."
                className="w-full bg-surface-container-lowest border border-primary/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 transition-colors"
                maxLength={40}
              />
              {error && (
                <p className="text-error text-[11px] font-medium leading-relaxed">
                  {error}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-[#005049] text-white py-4 px-6 rounded-2xl font-display font-bold text-md shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isSaved ? (
              <>
                <Check className="w-5 h-5" />
                <span>¡Nombre guardado!</span>
              </>
            ) : (
              <>
                <span>{isTab ? 'Guardar y actualizar nombre' : 'Comenzar mi viaje de bienestar'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

      </div>

      {/* Footer Branding - only on fullscreen onboarding */}
      {!isTab && (
        <footer className="text-center text-on-surface-variant/40 text-[10px] font-sans pb-4">
          S.O.S. Abdomen Feliz • Respira, restablece y vive con ligereza
        </footer>
      )}
    </div>
  );
}

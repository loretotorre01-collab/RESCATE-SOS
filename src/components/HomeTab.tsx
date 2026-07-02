import React, { useState } from 'react';
import { Zap, Wind, Flame, ShieldAlert, CheckCircle, Scale, Utensils, Sparkles } from 'lucide-react';
import { DiagnosticData } from '../types';

interface HomeTabProps {
  onStartRescue: (data: DiagnosticData) => void;
}

export default function HomeTab({ onStartRescue }: HomeTabProps) {
  const [distressLevel, setDistressLevel] = useState<number>(5);
  const [mealType, setMealType] = useState<'pesada' | 'rapida' | 'normal' | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleStart = () => {
    onStartRescue({
      distressLevel,
      mealType,
      symptoms: selectedSymptoms,
    });
  };

  // Helper to get distress level color and word
  const getDistressInfo = (level: number) => {
    if (level <= 3) return { label: 'Leve', color: 'text-primary' };
    if (level <= 7) return { label: 'Moderado', color: 'text-[#d97706]' };
    return { label: 'Intenso', color: 'text-error' };
  };

  const distressInfo = getDistressInfo(distressLevel);

  return (
    <div className="space-y-6 pb-28 animate-fade-in">
      {/* Hero Welcome banner */}
      <div className="bg-[#e9f8e9] rounded-2xl p-6 border border-primary/10 shadow-sm relative overflow-hidden">
        <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
        <h2 className="font-display font-bold text-2xl text-primary mb-2">
          Botón de Rescate
        </h2>
        <p className="text-on-surface-variant text-sm leading-relaxed max-w-[90%]">
          Configura tu diagnóstico rápido para recibir una guía terapéutica de alivio inmediato y profesional.
        </p>
      </div>

      {/* Distress Level Card */}
      <div className="glass-card rounded-2xl p-6 shadow-sm border border-primary/5">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <ActivityIcon className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-sm uppercase tracking-wider">
            Nivel de Molestia
          </h3>
        </div>

        <div className="flex justify-between text-xs text-on-surface-variant/70 px-1">
          <span>Leve</span>
          <span className={`font-bold text-lg ${distressInfo.color}`}>
            {distressLevel} ({distressInfo.label})
          </span>
          <span>Extremo</span>
        </div>

        <div className="mt-2 relative">
          <input
            type="range"
            min="1"
            max="10"
            value={distressLevel}
            onChange={(e) => setDistressLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
            style={{
              background: `linear-gradient(to right, #006a62 0%, #3adccc ${
                ((distressLevel - 1) / 9) * 100
              }%, #d8e6d8 ${((distressLevel - 1) / 9) * 100}%, #d8e6d8 100%)`,
            }}
          />
        </div>

        <p className="text-center text-[11px] text-on-surface-variant/60 mt-4 italic">
          Desliza para ajustar la intensidad de tu malestar abdominal
        </p>
      </div>

      {/* Meal type selection card */}
      <div className="glass-card rounded-2xl p-6 shadow-sm border border-primary/5">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Utensils className="w-5 h-5" />
          <h3 className="font-display font-semibold text-sm uppercase tracking-wider">
            ¿Qué has comido hoy?
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Heavy */}
          <button
            onClick={() => setMealType('pesada')}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
              mealType === 'pesada'
                ? 'bg-primary border-primary text-white shadow-md'
                : 'bg-surface border-primary/10 hover:border-primary/30 text-on-surface-variant'
            }`}
          >
            <Scale className="w-6 h-6 mb-2" />
            <span className="text-xs font-semibold">Pesada</span>
          </button>

          {/* Fast */}
          <button
            onClick={() => setMealType('rapida')}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
              mealType === 'rapida'
                ? 'bg-primary border-primary text-white shadow-md'
                : 'bg-surface border-primary/10 hover:border-primary/30 text-on-surface-variant'
            }`}
          >
            <Zap className="w-6 h-6 mb-2" />
            <span className="text-xs font-semibold">Rápida</span>
          </button>

          {/* Normal */}
          <button
            onClick={() => setMealType('normal')}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
              mealType === 'normal'
                ? 'bg-primary border-primary text-white shadow-md'
                : 'bg-surface border-primary/10 hover:border-primary/30 text-on-surface-variant'
            }`}
          >
            <Sparkles className="w-6 h-6 mb-2" />
            <span className="text-xs font-semibold">Normal</span>
          </button>
        </div>
      </div>

      {/* Primary Symptoms Selection */}
      <div className="glass-card rounded-2xl p-6 shadow-sm border border-primary/5">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <CheckCircle className="w-5 h-5" />
          <h3 className="font-display font-semibold text-sm uppercase tracking-wider">
            Síntoma Principal
          </h3>
        </div>

        <div className="space-y-2">
          {/* Gases */}
          <label
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
              selectedSymptoms.includes('gases')
                ? 'bg-primary/5 border-primary text-primary'
                : 'bg-surface border-primary/10 hover:border-primary/20 text-on-surface'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedSymptoms.includes('gases')}
                onChange={() => toggleSymptom('gases')}
                className="rounded border-primary/20 text-primary focus:ring-primary w-4 h-4"
              />
              <span className="text-sm font-semibold">Gases</span>
            </div>
            <Wind className="w-5 h-5 opacity-85" />
          </label>

          {/* Pesadez */}
          <label
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
              selectedSymptoms.includes('pesadez')
                ? 'bg-primary/5 border-primary text-primary'
                : 'bg-surface border-primary/10 hover:border-primary/20 text-on-surface'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedSymptoms.includes('pesadez')}
                onChange={() => toggleSymptom('pesadez')}
                className="rounded border-primary/20 text-primary focus:ring-primary w-4 h-4"
              />
              <span className="text-sm font-semibold">Pesadez</span>
            </div>
            <Scale className="w-5 h-5 opacity-85" />
          </label>

          {/* Acidez */}
          <label
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
              selectedSymptoms.includes('acidez')
                ? 'bg-primary/5 border-primary text-primary'
                : 'bg-surface border-primary/10 hover:border-primary/20 text-on-surface'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedSymptoms.includes('acidez')}
                onChange={() => toggleSymptom('acidez')}
                className="rounded border-primary/20 text-primary focus:ring-primary w-4 h-4"
              />
              <span className="text-sm font-semibold">Acidez</span>
            </div>
            <Flame className="w-5 h-5 opacity-85" />
          </label>

          {/* Dolor */}
          <label
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
              selectedSymptoms.includes('dolor')
                ? 'bg-primary/5 border-primary text-primary'
                : 'bg-surface border-primary/10 hover:border-primary/20 text-on-surface'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedSymptoms.includes('dolor')}
                onChange={() => toggleSymptom('dolor')}
                className="rounded border-primary/20 text-primary focus:ring-primary w-4 h-4"
              />
              <span className="text-sm font-semibold">Dolor / Cólicos</span>
            </div>
            <ShieldAlert className="w-5 h-5 opacity-85" />
          </label>
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-2">
        <button
          onClick={handleStart}
          className="w-full bg-primary hover:bg-[#005049] text-white py-4 px-6 rounded-2xl font-display font-bold text-md shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          id="btn-iniciar-rescate-main"
        >
          <Zap className="w-5 h-5 group-hover:animate-bounce" />
          <span>INICIAR RESCATE</span>
        </button>
        <p className="text-center text-xs text-on-surface-variant/60 mt-3 leading-relaxed px-4">
          Al iniciar, el sistema procesará tu estado y te ofrecerá una guía de respiración, masaje y ejercicios calmantes adaptados.
        </p>
      </div>

      {/* Decorative Visual Card */}
      <div className="relative rounded-2xl overflow-hidden h-40 flex items-end p-6 shadow-sm">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD__uRphv2WmGMmAQDo7YRXZuqtL6FXeV28aZbiK6b9cQVCb27LFWyKeXLGLYOZ1VPyeLAX_ssrd9SIY1sIEKxt4azevUAFwXhiavRn0orSogQ6eEcKoKAV37VgrnzJWxRXrELdsRVmOQW2jZlHdtkRXPnq2uF7gMlYBjd9MGJT4e1qzIOfjQpYVBgMh3qn9vUhCqGytgLuYjCUoC0j2PXClmsG54aA2xsZkfsXG7mSRt-UIO2pZtHK8IvFPT24fd7CLx82mwjT_sQ"
            alt="Fondo relajante"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
        </div>
        <div className="relative z-10">
          <span className="text-white font-display font-bold text-sm tracking-wide uppercase drop-shadow-sm">
            Tómate un respiro
          </span>
          <p className="text-white/90 text-xs mt-0.5 font-medium drop-shadow-sm">
            El alivio y la ligereza están a tan solo un clic de distancia.
          </p>
        </div>
      </div>
    </div>
  );
}

// Custom simple inline sub-component to prevent missing icon issues
function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

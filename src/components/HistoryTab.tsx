import { useState } from 'react';
import { Sparkles, Calendar, TrendingUp, Heart, Trash2, ArrowUpRight } from 'lucide-react';
import { LogEntry } from '../types';
import { getStreakDays } from '../utils';

interface HistoryTabProps {
  logs: LogEntry[];
  onClearLogs?: () => void;
  userName?: string;
}

export default function HistoryTab({ logs, onClearLogs, userName = '' }: HistoryTabProps) {
  const [showAllLogs, setShowAllLogs] = useState(false);

  // Calculate dynamic stats
  const totalRescues = logs.length;

  // Alivio promedio real: sin registros no hay dato que mostrar (antes
  // enseñaba un 85% inventado que confundía).
  const averageRelief = totalRescues > 0
    ? Math.round(logs.reduce((sum, item) => sum + item.relief, 0) / totalRescues)
    : 0;

  // Etiqueta del anillo acorde al valor real
  const reliefLabel =
    totalRescues === 0 ? 'Aún sin datos'
    : averageRelief >= 60 ? 'Nivel Óptimo'
    : averageRelief >= 30 ? 'Buen progreso'
    : 'Sigue practicando';

  // Rescates de ESTE mes (antes contaba todo el historial)
  const now = new Date();
  const monthlyRescues = logs.filter(log => {
    const d = new Date(log.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  const streakDays = getStreakDays(logs);

  // Filter shown logs
  const displayedLogs = showAllLogs ? logs : logs.slice(0, 3);

  return (
    <div className="space-y-6 pb-28 animate-fade-in text-on-surface">
      {/* Welcome Header */}
      <section className="text-left">
        <h2 className="font-display font-bold text-2xl text-primary">
          Tu Progreso de Bienestar
        </h2>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Cada día de ligereza y calma abdominal es una victoria para tu salud digestiva.
        </p>
      </section>

      {/* Bento Grid: Main Statistics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Streak Card */}
        <div className="col-span-2 glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center overflow-hidden relative border border-primary/5 shadow-sm">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-xl" />
          <div className="bg-primary-container text-on-primary-container p-3 rounded-full mb-2">
            <Sparkles className="w-5 h-5 fill-primary/10" />
          </div>
          <span className="text-xs text-on-surface-variant font-medium">
            Racha de Ligereza
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-display font-black text-4xl text-pill-gradient">
              {streakDays}
            </span>
            <span className="font-display font-bold text-lg text-primary">
              {streakDays === 1 ? 'Día' : 'Días'}
            </span>
          </div>
          <p className="text-[11px] text-primary font-bold mt-2 font-sans">
            {streakDays === 0
              ? '¡Inicia tu racha hoy completando tu primer rescate!'
              : streakDays === 1
              ? '¡Tu primer día de ligereza! Sigue así mañana.'
              : `¡${streakDays} días cuidando tu abdomen, sigue sumando!`}
          </p>
        </div>

        {/* Average Relief (Pie/Circle chart SVG) */}
        <div className="col-span-1 glass-card rounded-2xl p-4 flex flex-col items-center justify-between border border-primary/5 shadow-sm text-center">
          <span className="text-xs text-on-surface-variant font-medium leading-tight">
            Alivio Promedio
          </span>
          <div className="relative w-24 h-24 my-3 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                className="text-surface-container-highest"
                cx="18"
                cy="18"
                fill="none"
                r="16"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <circle
                className="text-primary"
                cx="18"
                cy="18"
                fill="none"
                r="16"
                stroke="currentColor"
                strokeDasharray={`${averageRelief}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display font-extrabold text-base text-primary">
                {totalRescues > 0 ? `${averageRelief}%` : '—'}
              </span>
            </div>
          </div>
          <span className="text-[10px] text-on-secondary-container font-semibold">
            {reliefLabel}
          </span>
        </div>

        {/* Total Successful Rescues */}
        <div className="col-span-1 glass-card rounded-2xl p-4 flex flex-col items-center justify-between border border-primary/5 shadow-sm text-center">
          <span className="text-xs text-on-surface-variant font-medium leading-tight">
            Rescates Exitosos
          </span>
          <div className="flex items-center justify-center h-24">
            <div className="bg-[#c6e9e9] text-[#006058] rounded-full w-14 h-14 flex items-center justify-center animate-pulse">
              <span className="font-display font-black text-xl">{monthlyRescues}</span>
            </div>
          </div>
          <span className="text-[10px] text-on-secondary-container font-semibold">
            Este mes
          </span>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-on-surface">
            Historial de Rescate
          </h3>
          <div className="flex gap-2">
            {onClearLogs && totalRescues > 0 && (
              <button
                onClick={onClearLogs}
                className="text-on-surface-variant/60 hover:text-error text-xs font-semibold flex items-center gap-1 focus:outline-none"
              >
                <Trash2 className="w-3.5 h-3.5" /> Limpiar
              </button>
            )}
            {totalRescues > 3 && (
              <button
                onClick={() => setShowAllLogs(!showAllLogs)}
                className="text-primary hover:underline text-xs font-bold focus:outline-none"
              >
                {showAllLogs ? 'Ver menos' : 'Ver todo'}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2.5">
          {displayedLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white rounded-xl p-4 flex items-center justify-between border border-surface-container-highest transition-transform hover:scale-[0.99] active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#e9f8e9] rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Heart className="w-5 h-5 fill-primary/10" />
                </div>
                <div>
                  <p className="font-sans font-bold text-xs text-on-surface leading-tight">
                    {log.type}
                  </p>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">
                    {log.dateStr}
                  </p>
                  {log.notes && (
                    <p className="text-[10px] text-on-surface-variant/80 mt-1 italic leading-relaxed line-clamp-1 max-w-[280px]">
                      &ldquo;{log.notes}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 text-primary">
                <span className="font-sans font-bold text-xs">+{log.relief}%</span>
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          ))}

          {logs.length === 0 && (
            <div className="text-center py-8 glass-card rounded-xl border-dashed border border-outline-variant/50">
              <Calendar className="w-8 h-8 text-outline-variant mx-auto mb-2" />
              <p className="text-on-surface-variant text-xs font-medium">
                No hay registros guardados. Completa tu primer rescate para empezar.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Motivational Bottom Banner */}
      <section className="pt-2">
        <div className="relative rounded-2xl overflow-hidden h-36 flex items-center p-6 shadow-sm bg-[#e9f8e9]">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD__uRphv2WmGMmAQDo7YRXZuqtL6FXeV28aZbiK6b9cQVCb27LFWyKeXLGLYOZ1VPyeLAX_ssrd9SIY1sIEKxt4azevUAFwXhiavRn0orSogQ6eEcKoKAV37VgrnzJWxRXrELdsRVmOQW2jZlHdtkRXPnq2uF7gMlYBjd9MGJT4e1qzIOfjQpYVBgMh3qn9vUhCqGytgLuYjCUoC0j2PXClmsG54aA2xsZkfsXG7mSRt-UIO2pZtHK8IvFPT24fd7CLx82mwjT_sQ"
              alt="Fondo relajante"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-25"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <div className="relative z-10">
            <h4 className="font-display font-bold text-lg text-primary mb-1">
              ¡Sigue así{userName ? `, ${userName}` : ''}!
            </h4>
            <p className="text-on-surface-variant text-xs leading-relaxed max-w-[200px] font-medium">
              Tu constancia diaria está transformando tu digestión y devolviéndole calma a tu cuerpo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
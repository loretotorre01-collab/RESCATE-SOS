import { LogEntry } from './types';

// Clave de almacenamiento independiente por usuaria: cambiar de nombre
// ya no destruye el historial de nadie, solo cambia de perfil.
export const logsKeyFor = (name: string) =>
  `sos_abdomen_logs_${name.trim().toLowerCase()}`;

export const loadLogsFor = (name: string): LogEntry[] => {
  try {
    const saved = localStorage.getItem(logsKeyFor(name));
    if (saved) return JSON.parse(saved);

    // Migración: las versiones anteriores guardaban todo bajo una única
    // clave global. Si existe, la adoptamos como historial de esta usuaria.
    const legacy = localStorage.getItem('sos_abdomen_logs');
    if (legacy) {
      localStorage.setItem(logsKeyFor(name), legacy);
      return JSON.parse(legacy);
    }
  } catch (e) {
    console.warn('No se pudo leer el historial guardado.', e);
  }
  return [];
};

export const saveLogsFor = (name: string, logs: LogEntry[]) => {
  localStorage.setItem(logsKeyFor(name), JSON.stringify(logs));
};

// Racha real para todo el mundo: días distintos con al menos un registro.
export const getStreakDays = (logs: LogEntry[]): number => {
  if (logs.length === 0) return 0;
  const uniqueDays = new Set(
    logs.map(log => {
      try {
        return new Date(log.date).toISOString().split('T')[0];
      } catch {
        return log.date;
      }
    })
  );
  return uniqueDays.size;
};

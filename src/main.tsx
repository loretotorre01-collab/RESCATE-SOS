// Parches de seguridad para entornos de iframe aislados (como Google Sites)
// Evita bloqueos por políticas de cookies de terceros o sandboxing estricto
try {
  // Intentar acceder para ver si lanza excepción de seguridad
  const test = window.localStorage;
  if (!test) {
    throw new Error("localStorage no está definido");
  }
} catch (e) {
  console.warn("localStorage bloqueado o no disponible en este iframe. Aplicando polyfill en memoria para Google Sites.", e);
  const memoryStore: Record<string, string> = {};
  
  // Implementación segura en memoria compatible con la API de localStorage
  const mockStorage = {
    getItem: (key: string) => (key in memoryStore ? memoryStore[key] : null),
    setItem: (key: string, value: string) => {
      memoryStore[key] = String(value);
    },
    removeItem: (key: string) => {
      delete memoryStore[key];
    },
    clear: () => {
      for (const k in memoryStore) {
        delete memoryStore[k];
      }
    },
    key: (index: number) => Object.keys(memoryStore)[index] || null,
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  try {
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true
    });
  } catch (err) {
    // Si no se puede redefinir directamente, lo inyectamos como propiedad global
    (window as any).localStorage = mockStorage;
  }
}

// Envolturas de seguridad para alert() y confirm() por si el iframe sandbox de Google Sites los bloquea
try {
  const originalAlert = window.alert;
  window.alert = function (message?: any) {
    try {
      originalAlert(message);
    } catch (e) {
      console.warn("alert() bloqueado por el sandbox del iframe. Mensaje:", message);
    }
  };
} catch (e) {
  console.warn("No se pudo envolver alert().");
}

try {
  const originalConfirm = window.confirm;
  window.confirm = function (message?: string): boolean {
    try {
      return originalConfirm(message);
    } catch (e) {
      console.warn("confirm() bloqueado por el sandbox del iframe. Devolviendo 'true' por defecto. Mensaje:", message);
      return true;
    }
  };
} catch (e) {
  console.warn("No se pudo envolver confirm().");
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

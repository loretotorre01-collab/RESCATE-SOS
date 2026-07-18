// Parches de seguridad para entornos de iframe aislados (como Google Sites)
// Evita bloqueos por políticas de cookies de terceros o sandboxing estricto
try {
  // No basta con leer window.localStorage: en algunos navegadores existe
  // pero lanza excepción al escribir. Hacemos una prueba de escritura real.
  const testKey = '__sos_test__';
  window.localStorage.setItem(testKey, '1');
  window.localStorage.removeItem(testKey);
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

// Envolturas de seguridad para alert(), confirm() y prompt() por si el
// iframe sandbox de Google Sites los bloquea
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
      // IMPORTANTE: devolvemos 'false' (cancelar). confirm() protege acciones
      // destructivas (borrar historial, restaurar protocolo); si el diálogo
      // está bloqueado, lo seguro es NO ejecutar la acción, nunca ejecutarla.
      console.warn("confirm() bloqueado por el sandbox del iframe. Cancelando la acción por seguridad. Mensaje:", message);
      return false;
    }
  };
} catch (e) {
  console.warn("No se pudo envolver confirm().");
}

try {
  const originalPrompt = window.prompt;
  window.prompt = function (message?: string, defaultValue?: string): string | null {
    try {
      return originalPrompt(message, defaultValue);
    } catch (e) {
      // 'null' equivale a que el usuario canceló el diálogo: el código que
      // llama a prompt() ya sabe manejar ese caso sin romperse.
      console.warn("prompt() bloqueado por el sandbox del iframe. Mensaje:", message);
      return null;
    }
  };
} catch (e) {
  console.warn("No se pudo envolver prompt().");
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
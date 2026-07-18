import { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeTab from './components/HomeTab';
import RescueWizard from './components/RescueWizard';
import EvaluationModal from './components/EvaluationModal';
import HistoryTab from './components/HistoryTab';
import ResourcesTab from './components/ResourcesTab';
import WelcomeScreen from './components/WelcomeScreen';
import { Tab, DiagnosticData, LogEntry } from './types';
import { loadLogsFor, saveLogsFor, logsKeyFor, getStreakDays } from './utils';
import { Heart, User, ClipboardList, Info, HelpCircle, X, RotateCcw, Edit2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('inicio');
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showEvaluation, setShowEvaluation] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [onboarded, setOnboarded] = useState<boolean>(false);
  const [isRescueActive, setIsRescueActive] = useState<boolean>(false);

  // Cargar nombre e historial de esa usuaria desde localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('sos_abdomen_user_name');
    if (savedName) {
      setUserName(savedName);
      setOnboarded(true);
      setLogs(loadLogsFor(savedName));
    } else {
      setUserName('');
      setOnboarded(false);
      setLogs([]);
    }
  }, []);

  const handleStartRescue = (data: DiagnosticData) => {
    setDiagnosticData(data);
    setIsRescueActive(true);
    setActiveTab('rescate');
    setShowEvaluation(false);
    setShowSidebar(false);
  };

  const handleFinishRescue = () => {
    setShowEvaluation(true);
  };

  const handleSaveEvaluation = (intensityAfter: number, notes: string, reliefRate: number) => {
    const intensityBefore = diagnosticData?.distressLevel || 5;
    const firstSymptom = diagnosticData?.symptoms[0] || 'Tensión';
    const formattedSymptom = firstSymptom.charAt(0).toUpperCase() + firstSymptom.slice(1);

    // El % de alivio se calcula con los datos reales (antes vs. después),
    // en lugar del valor fijo que venía del modal. Si el "antes" fuera 0,
    // usamos el valor del modal como respaldo.
    const relief =
      intensityBefore > 0
        ? Math.max(0, Math.round(((intensityBefore - intensityAfter) / intensityBefore) * 100))
        : reliefRate;

    const newEntry: LogEntry = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString(),
      type: 'Protocolo de Rescate',
      label: `Alivio de ${formattedSymptom}`,
      intensityBefore,
      intensityAfter,
      notes: notes || 'Protocolo completado con éxito, sensación de desinflamación y ligereza.',
      relief,
      dateStr: `Hoy, ${new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      })} • Alivio Exitoso`,
    };

    const updated = [newEntry, ...logs];
    setLogs(updated);
    saveLogsFor(userName, updated);
    setShowEvaluation(false);
    setIsRescueActive(false);
    setActiveTab('progreso');
  };

  const handleClearLogs = () => {
    const confirmed = window.confirm(
      '¿Estás segura de que quieres borrar el historial de progreso? Esta acción no se puede deshacer.'
    );
    if (confirmed) {
      localStorage.removeItem(logsKeyFor(userName));
      setLogs([]);
    }
  };

  const handleCompleteOnboarding = (name: string) => {
    const trimmed = name.trim();
    localStorage.setItem('sos_abdomen_user_name', trimmed);
    setUserName(trimmed);
    setOnboarded(true);
    setIsRescueActive(false);

    // Cada nombre tiene su propio historial guardado: si es una persona
    // nueva empieza de cero; si vuelve alguien anterior, recupera el suyo.
    setLogs(loadLogsFor(trimmed));
    setActiveTab('rescate');
  };

  const handleResetAppData = () => {
    const confirmed = window.confirm(
      '¿Quieres cerrar este perfil y volver a la pantalla de inicio? ' +
      'Tu historial quedará guardado y se recuperará al volver a escribir el mismo nombre.'
    );
    if (confirmed) {
      // No borramos el historial: queda guardado bajo el nombre de la usuaria.
      localStorage.removeItem('sos_abdomen_user_name');
      setLogs([]);
      setDiagnosticData(null);
      setUserName('');
      setOnboarded(false);
      setIsRescueActive(false);
      setActiveTab('inicio');
      setShowSidebar(false);
    }
  };

  if (!onboarded) {
    return <WelcomeScreen onComplete={handleCompleteOnboarding} />;
  }

  return (
    <div className="bg-surface min-h-screen font-sans antialiased text-on-surface">
      {/* Top Header App Bar */}
      <Header
        userName={userName}
        onMenuClick={() => setShowSidebar(true)}
        onNavigateHome={() => {
          setActiveTab('inicio');
          setShowEvaluation(false);
        }}
      />

      {/* Sidebar Drawer Menu Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          {/* Side Panel */}
          <div className="relative flex flex-col w-full max-w-xs bg-white h-full shadow-2xl p-6 space-y-6 animate-slide-in text-on-surface z-10 border-r border-primary/10">
            <div className="flex items-center justify-between pb-4 border-b border-primary/10">
              <div className="flex items-center gap-2 text-primary font-display font-bold text-lg">
                <Heart className="w-5 h-5 fill-primary/10" />
                <span>Mi Panel S.O.S.</span>
              </div>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info Card */}
            <div className="bg-[#e9f8e9] rounded-2xl p-4 border border-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-display font-bold">
                  {userName ? userName.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-primary">{userName || 'Usuario'}</h4>
                  <p className="text-[10px] text-on-surface-variant font-semibold">
                    Racha activa: {getStreakDays(logs)} {getStreakDays(logs) === 1 ? 'día' : 'días'} de ligereza
                  </p>
                </div>
              </div>
              {/* El lápiz lleva al formulario de nombre de la pestaña Inicio.
                  Antes usaba window.prompt(), que Google Sites puede bloquear. */}
              <button
                onClick={() => {
                  setActiveTab('inicio');
                  setShowEvaluation(false);
                  setShowSidebar(false);
                }}
                className="p-1 rounded-full hover:bg-primary/10 text-primary transition-colors"
                title="Editar nombre"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Navigation links inside side panel */}
            <div className="space-y-1.5 flex-grow">
              <span className="text-[10px] font-sans font-bold text-on-surface-variant/60 uppercase tracking-wider block px-2 mb-2">
                Accesos Rápidos
              </span>

              <button
                onClick={() => {
                  setActiveTab('rescate');
                  setIsRescueActive(false);
                  setShowEvaluation(false);
                  setShowSidebar(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-surface-container-low transition-colors text-left"
              >
                <ClipboardList className="w-4 h-4 text-primary" />
                <span>Iniciar Diagnóstico</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('rescate');
                  setIsRescueActive(true);
                  setShowEvaluation(false);
                  setShowSidebar(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-surface-container-low transition-colors text-left"
              >
                <Heart className="w-4 h-4 text-primary" />
                <span>Protocolo de Rescate</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('masaje');
                  setShowEvaluation(false);
                  setShowSidebar(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-surface-container-low transition-colors text-left"
              >
                <Info className="w-4 h-4 text-primary" />
                <span>Automasaje de Colon</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('progreso');
                  setShowEvaluation(false);
                  setShowSidebar(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-surface-container-low transition-colors text-left"
              >
                <User className="w-4 h-4 text-primary" />
                <span>Mi Historial y Gráficos</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('bonos');
                  setShowEvaluation(false);
                  setShowSidebar(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-surface-container-low transition-colors text-left"
              >
                <HelpCircle className="w-4 h-4 text-primary" />
                <span>Rutina Nocturna</span>
              </button>
            </div>

            {/* Bottom Actions inside side panel */}
            <div className="pt-4 border-t border-primary/10">
              <button
                onClick={handleResetAppData}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all text-left"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Cambiar de Perfil</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-[600px] mx-auto px-5 pt-20 pb-12">
        {showEvaluation ? (
          <EvaluationModal
            onSave={handleSaveEvaluation}
            onClose={() => setShowEvaluation(false)}
          />
        ) : (
          <>
            {activeTab === 'inicio' && (
              <WelcomeScreen
                onComplete={handleCompleteOnboarding}
                initialName={userName}
                isTab={true}
              />
            )}

            {activeTab === 'rescate' && (
              isRescueActive ? (
                <RescueWizard
                  diagnosticData={diagnosticData}
                  onFinishRescue={handleFinishRescue}
                  onNavigateHome={() => {
                    setIsRescueActive(false);
                    setActiveTab('rescate');
                  }}
                  initialStep={1}
                />
              ) : (
                <HomeTab onStartRescue={handleStartRescue} />
              )
            )}

            {activeTab === 'masaje' && (
              <RescueWizard
                diagnosticData={diagnosticData}
                onFinishRescue={handleFinishRescue}
                onNavigateHome={() => {
                  setActiveTab('rescate');
                }}
                initialStep={3} // Ir directamente al paso 3 (automasaje)
              />
            )}

            {activeTab === 'progreso' && (
              <HistoryTab logs={logs} onClearLogs={handleClearLogs} userName={userName} />
            )}

            {activeTab === 'bonos' && <ResourcesTab />}
          </>
        )}
      </main>

      {/* Bottom Navigation Tabs bar */}
      <BottomNav activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        setShowEvaluation(false);
        // Al pulsar "Rescate" en la barra inferior, ir siempre al cuestionario
        if (tab === 'rescate') {
          setIsRescueActive(false);
        }
      }} />
    </div>
  );
}
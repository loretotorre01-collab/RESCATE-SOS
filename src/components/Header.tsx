import { useState, useEffect } from 'react';
import { Menu, Bell, X, Sparkles, AlertCircle, Heart } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  onNavigateHome?: () => void;
  userName?: string;
}

export default function Header({ onMenuClick, onNavigateHome, userName = 'Marina' }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: '¡Racha activa!',
      text: `Llevas 12 días cuidando tu abdomen. ¡Sigue así, ${userName}!`,
      type: 'success',
      time: 'Hace 5m',
    },
    {
      id: 2,
      title: 'Tip de Bienestar',
      text: 'Beber agua tibia antes del desayuno estimula suavemente el peristaltismo.',
      type: 'info',
      time: 'Hace 2h',
    },
    {
      id: 3,
      title: 'Elixir Recomendado',
      text: '¿Tienes gases? Prueba la infusión de hinojo para un alivio carminativo rápido.',
      type: 'tip',
      time: 'Hace 1d',
    },
  ]);

  useEffect(() => {
    setNotifications(prev => prev.map(notif => {
      if (notif.id === 1) {
        return {
          ...notif,
          text: `Llevas 12 días cuidando tu abdomen. ¡Sigue así, ${userName}!`
        };
      }
      return notif;
    }));
  }, [userName]);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-primary/10 z-50 transition-all">
        <div className="flex items-center justify-between px-5 h-full w-full max-w-[600px] mx-auto">
          {/* Left: Menu & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="p-1.5 rounded-full hover:bg-surface-container-high text-primary active:scale-95 transition-all"
              aria-label="Menú de opciones"
              id="menu-toggle-btn"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group text-left"
              id="brand-logo-btn"
            >
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary group-hover:rotate-12 transition-transform duration-300">
                <Heart className="w-4 h-4 fill-primary/20" />
              </div>
              <h1 className="font-display text-lg font-bold text-primary tracking-tight">
                S.O.S. Abdomen Feliz
              </h1>
            </button>
          </div>

          {/* Right: Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-surface-container-high text-primary active:scale-95 transition-all relative"
              aria-label="Notificaciones"
              id="notification-bell-btn"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass-card rounded-2xl p-4 shadow-xl z-50 animate-fade-in border border-primary/10 text-on-surface">
                <div className="flex items-center justify-between pb-3 border-b border-primary/10 mb-2">
                  <span className="font-display font-bold text-primary text-sm flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-primary-container fill-primary/30" /> Notificaciones
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-on-surface-variant text-xs">
                    No tienes nuevas recomendaciones. ¡Sigue cuidando tu salud digestiva!
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[280px] overflow-y-auto no-scrollbar">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-3 bg-surface-container-low rounded-xl border border-primary/5 relative flex gap-2"
                      >
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-xs text-primary">
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-on-surface-variant">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed">
                            {notif.text}
                          </p>
                        </div>
                        <button
                          onClick={() => removeNotification(notif.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1 self-start"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

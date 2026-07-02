import { Home, Flame, BookOpen, Activity, TrendingUp } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    {
      id: 'inicio' as Tab,
      label: 'Inicio',
      icon: Home,
    },
    {
      id: 'rescate' as Tab,
      label: 'Rescate',
      icon: Flame,
    },
    {
      id: 'masaje' as Tab,
      label: 'Masaje',
      icon: Activity,
    },
    {
      id: 'progreso' as Tab,
      label: 'Progreso',
      icon: TrendingUp,
    },
    {
      id: 'bonos' as Tab,
      label: 'Bonos',
      icon: BookOpen,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl border-t border-primary/10 shadow-[0_-4px_16px_rgba(0,106,98,0.06)] rounded-t-2xl">
      <div className="flex justify-around items-center h-16 max-w-[600px] mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 group focus:outline-none relative"
              id={`nav-item-${item.id}`}
            >
              {isActive ? (
                <div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1.5 active:scale-95 transition-all duration-200">
                  <Icon className="w-5 h-5 animate-pulse" />
                  <span className="text-[10px] font-bold mt-0.5 tracking-tight font-sans">
                    {item.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-on-secondary-container/70 group-hover:text-primary transition-colors py-1.5">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium mt-0.5 font-sans">
                    {item.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

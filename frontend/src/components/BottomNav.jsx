import React from 'react';
import { Search, Building2, CheckSquare, FlaskConical, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

export const BottomNav = ({ activeTab, setActiveTab }) => {
  const { t, highContrast } = useLanguage();

  const tabs = [
    { id: 'finder', label: t('tab_finder'), icon: Search },
    { id: 'buildings', label: t('tab_buildings'), icon: Building2 },
    { id: 'checklist', label: t('tab_checklist'), icon: CheckSquare },
    { id: 'tests', label: t('tab_tests'), icon: FlaskConical },
    { id: 'help', label: t('tab_help'), icon: HelpCircle }
  ];

  return (
    <nav 
      aria-label="Main Navigation"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t transition-colors ${
      highContrast 
        ? 'bg-black text-white border-yellow-400' 
        : 'bg-white/95 backdrop-blur-md text-slate-600 border-slate-200'
    }`}>
      <div className="max-w-md mx-auto flex items-center justify-around py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-full py-2 px-1 transition-all min-h-[48px] min-w-[48px] touch-manipulation ${
                isActive 
                  ? highContrast 
                    ? 'text-yellow-400 font-bold scale-105' 
                    : 'text-blue-600 font-semibold' 
                  : 'hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-600'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} aria-hidden="true" />
              <span className="text-[10px] tracking-tight leading-tight text-center truncate max-w-[68px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

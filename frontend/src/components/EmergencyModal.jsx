import React from 'react';
import { AlertTriangle, Phone, X, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EmergencyModal = ({ isOpen, onClose, emergencyData }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border-2 border-red-500 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-red-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-100 text-red-600">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-red-700">
                {t('emergency_banner_title')}
              </h3>
              <p className="text-[11px] text-red-900 font-semibold uppercase tracking-wider">
                Immediate Action Required
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Alert Notice */}
        <div className="my-4 bg-red-50 rounded-2xl p-3.5 border border-red-200">
          <p className="text-xs font-bold text-red-900 leading-snug">
            {emergencyData?.instruction || "DO NOT WAIT IN ROUTINE OPD REGISTRATION QUEUES. Proceed directly to Emergency / Nehru Hospital or Advanced Trauma Centre (ATC)."}
          </p>
        </div>

        {/* Warning Signs */}
        <div className="space-y-1.5 mb-5">
          <p className="text-xs font-bold text-slate-700">Acute Red-Flag Signs:</p>
          <ul className="text-xs text-slate-600 space-y-1.5">
            {emergencyData?.warning_signs?.map((sign, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Call Buttons */}
        <div className="space-y-2">
          <a
            href="tel:0172-2755555"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Nehru Hospital Emergency (0172-2755555)</span>
          </a>

          <a
            href="tel:0172-2755454"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call Advanced Trauma Centre (0172-2755454)</span>
          </a>
        </div>
      </div>
    </div>
  );
};

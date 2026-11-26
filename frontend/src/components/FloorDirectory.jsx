import React, { useState } from 'react';
import { Layers, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

export const FloorDirectory = ({ floorData = [] }) => {
  const [openFloor, setOpenFloor] = useState(0); // Ground Floor default open
  const { lang, highContrast } = useLanguage();

  if (!floorData || floorData.length === 0) return null;

  return (
    <div className={`rounded-2xl border p-4 shadow-sm transition-all space-y-3 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white' 
        : 'bg-white border-slate-200'
    }`}>
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-sm md:text-base text-slate-900">
            {lang === 'hi' ? 'न्यू ओपीडी: किस फ्लोर पर क्या है? (फ्लोर गाइड)' : 'New OPD: Floor-by-Floor Directory'}
          </h3>
          <p className="text-[11px] text-slate-500">
            {lang === 'hi' ? 'लिफ्ट या सीढ़ियों से जाने से पहले सही मंजिल देखें' : 'Ground Floor through 5th Floor Layout (Blocks A, B, C, D)'}
          </p>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        {floorData.map((f, idx) => {
          const isOpen = openFloor === idx;
          const floorLabel = lang === 'hi' ? f.hindi_floor : lang === 'pa' ? f.punjabi_floor : f.floor;

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all overflow-hidden ${
                isOpen 
                  ? 'bg-blue-50/50 border-blue-200' 
                  : 'bg-slate-50/70 border-slate-100 hover:border-slate-200'
              }`}
            >
              <button
                onClick={() => setOpenFloor(isOpen ? -1 : idx)}
                aria-expanded={isOpen}
                className="w-full p-3 flex items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                    isOpen ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {idx === 0 ? 'G' : idx}
                  </span>
                  <span className="font-bold text-xs md:text-sm text-slate-800">
                    {floorLabel}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 border-t border-blue-100/60 animate-in fade-in duration-150">
                  <ul className="space-y-1.5 mt-1">
                    {f.services.map((srv, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-[11px] text-slate-700 leading-snug">
                        <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

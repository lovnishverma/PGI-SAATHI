import React, { useState } from 'react';
import { Compass, Info, ChevronDown, ChevronUp, UserCheck, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { AudioButton } from './AudioButton';

export const GoldenRules = ({ goldenRules, cardProcess, lostAdvice, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { lang, highContrast } = useLanguage();

  const fullAudio = goldenRules
    .map((r) => {
      const title = lang === 'hi' ? r.hindi_title : lang === 'pa' ? (r.punjabi_title || r.title) : r.title;
      const desc = lang === 'hi' ? r.hindi_desc : lang === 'pa' ? (r.punjabi_desc || r.desc) : r.desc;
      return `${r.num}. ${title}. ${desc}`;
    })
    .join(' ');

  return (
    <div className={`rounded-2xl border transition-all shadow-xs overflow-hidden ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white' 
        : 'bg-white border-blue-200'
    }`}>
      {/* Header bar that toggles */}
      <div 
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 flex items-center justify-between cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-blue-600"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white">
            <Compass className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-xs md:text-sm text-blue-950">
              {lang === 'hi' ? 'सबसे पहले यह 5 बातें समझें (मार्गदर्शन)' : lang === 'pa' ? 'ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਇਹ 5 ਗੱਲਾਂ ਸਮਝੋ' : '5 Essential PGIMER Orientation Rules'}
            </h3>
            <p className="text-[10px] text-blue-700">
              {lang === 'hi' ? 'ओपीडी में समय और परेशानी बचाने के सुनहरे नियम' : 'Crucial advice to avoid standing in the wrong queues'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AudioButton text={fullAudio} />
          <span className="text-slate-500 hover:text-slate-800 p-1 flex items-center justify-center">
            {isOpen ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
          </span>
        </div>
      </div>

      {/* Expandable Content */}
      {isOpen && (
        <div className="p-4 space-y-4 text-xs animate-in fade-in duration-150">
          {/* 5 Rules List */}
          <div className="space-y-2.5">
            {goldenRules.map(rule => (
              <div key={rule.num} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                  {rule.num}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">
                    {lang === 'hi' ? rule.hindi_title : lang === 'pa' ? rule.punjabi_title : rule.title}
                  </h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">
                    {lang === 'hi' ? rule.hindi_desc : rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Card Banwane ka Aasaan Process */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 space-y-2">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>{lang === 'hi' ? 'कार्ड बनवाने का आसान तरीका' : 'OPD Card Making Process'}</span>
            </h4>

            <div className="space-y-1.5 text-[11px] text-amber-900 leading-relaxed">
              <p>
                <strong>• {lang === 'hi' ? 'नया मरीज' : 'New Patient'}: </strong>
                {cardProcess?.new_patient?.instruction || "Hospital help desk par bolo: 'Mujhe pehli baar dikhana hai, patient ko ___ ki dikkat hai. Card kahan banega?'"}
              </p>
              <p>
                <strong>• {lang === 'hi' ? 'पुराना मरीज' : 'Returning Patient'}: </strong>
                {cardProcess?.returning_patient?.instruction || "Pehle se bana CR number/card lekar aao. Same patient ke liye bina poochhe naya CR number na banwao."}
              </p>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200/80 mt-1">
                <span className="font-bold text-rose-800 inline-flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-700 shrink-0" aria-hidden="true" />
                  Online Pre-Registration Warning:
                </span>
                <span className="text-slate-700 ml-1">
                  {cardProcess?.online_pre_registration?.instruction || "Ghar se details bhar sakte ho, lekin isse kisi particular doctor ki confirmed appointment nahi hoti. Counter par verification zaroori hai."}
                </span>
              </div>
            </div>
          </div>

          {/* Advice for Lost Patients */}
          {lostAdvice && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 text-[11px] text-blue-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>{lang === 'hi' ? 'रास्ता न समझ आए तो:' : 'If you get confused:'} </strong>
                {lostAdvice}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

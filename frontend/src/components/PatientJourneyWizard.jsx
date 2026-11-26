import React, { useState } from 'react';
import { Footprints, CheckCircle2, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { AudioButton } from './AudioButton';

export const PatientJourneyWizard = ({ steps = [] }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { lang, highContrast } = useLanguage();

  if (!steps || steps.length === 0) return null;

  const current = steps[activeStep] || steps[0];
  const stepTitle = lang === 'hi' ? current.hindi_title : lang === 'pa' ? current.punjabi_title : current.title;
  const stepDesc = lang === 'hi' ? current.hindi_desc : lang === 'pa' ? current.punjabi_desc : current.desc;
  const speechText = `${stepTitle}. ${stepDesc}. Tip: ${current.tip || ''}`;

  return (
    <div className={`rounded-2xl border p-4 shadow-sm transition-all ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white' 
        : 'bg-white border-blue-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base text-blue-950">
              {lang === 'hi' ? 'नए मरीज के 6 आसान कदम (गाइड)' : lang === 'pa' ? 'ਨਵੇਂ ਮਰੀਜ਼ ਲਈ 6 ਆਸਾਨ ਕਦਮ' : 'First-Time Patient: 6 Step Journey'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {lang === 'hi' ? 'अस्पताल गेट से डॉक्टर और दवाई तक का सीधा रास्ता' : 'Gate to Doctor & Medicines Roadmap (Quantyx OPD Guide)'}
            </p>
          </div>
        </div>
        <AudioButton text={speechText} />
      </div>

      {/* Stepper Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
        {steps.map((s, idx) => {
          const isActive = idx === activeStep;
          const isDone = idx < activeStep;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              aria-label={`Step ${s.step}: ${s.title}`}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1 min-h-[36px] ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isDone
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <span>{s.step}</span>
              {isDone && <CheckCircle2 className="w-3 h-3 text-blue-600" />}
            </button>
          );
        })}
      </div>

      {/* Active Step Content Card */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-100/60 px-2 py-0.5 rounded">
              Step {current.step} of {steps.length}
            </span>
            <h4 className="font-bold text-base text-slate-900 mt-1">
              {stepTitle}
            </h4>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed font-normal">
          {stepDesc}
        </p>

        {current.tip && (
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>{lang === 'hi' ? 'महत्वपूर्ण सलाह:' : 'Crucial Tip:'} </strong>
              <span>{current.tip}</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-3">
        <button
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1 min-h-[40px]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'पिछला' : 'Previous'}</span>
        </button>

        <span className="text-[11px] text-slate-400 font-medium">
          {activeStep + 1} / {steps.length}
        </span>

        <button
          onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={activeStep === steps.length - 1}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 flex items-center gap-1 shadow-xs min-h-[40px]"
        >
          <span>{lang === 'hi' ? 'अगला कदम' : 'Next Step'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

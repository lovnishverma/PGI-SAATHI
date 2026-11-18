import React from 'react';
import { FlaskConical, AlertTriangle, CheckCircle2, MapPin, Pill } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AudioButton } from './AudioButton';

export const LabTestGuide = ({ protocols }) => {
  const { t, highContrast } = useLanguage();

  return (
    <div className="space-y-4 pb-20">
      {/* Prime Rule Alert */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-900 shadow-xs">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-red-950">
              Golden Rule: Check Doctor's Test Slip First!
            </h4>
            <p className="mt-1 leading-relaxed text-red-800">
              Never assume all tests take place in one room. Every investigation (blood, urine, stool, biopsy, X-Ray) 
              has specific counters printed or stamped on your doctor's test requisition slip.
            </p>
          </div>
        </div>
      </div>

      {/* Fasting Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 shadow-xs">
        <div className="flex items-start gap-2.5">
          <Pill className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-blue-950">
              Important: Fasting & Regular Medicines
            </h4>
            <ul className="mt-1.5 space-y-1 list-disc list-inside text-blue-800">
              <li>Not every blood test requires an empty stomach (fasting).</li>
              <li><strong>Do not stop</strong> routine blood pressure or heart medications without specific doctor orders.</li>
              <li>Ask the lab counter: <em>"Kya yeh test khali pet hoga?"</em></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Published Sample Collection Rooms */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-slate-800 px-1">
          Published Sample Collection Reference Counters
        </h3>

        {protocols && protocols.map((proto, idx) => {
          const speechText = `${proto.type}. Location: ${proto.published_location}. ${proto.verification_warning || ''}`;

          return (
            <div
              key={idx}
              className={`rounded-2xl p-4 border transition-all shadow-xs ${
                highContrast 
                  ? 'bg-black border-yellow-400 text-white' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {proto.type}
                    </h4>
                  </div>
                </div>
                <AudioButton text={speechText} />
              </div>

              {/* Location Badge */}
              <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">Published Location: </span>
                  <span className="text-slate-700 font-medium">{proto.published_location}</span>
                </div>
              </div>

              {/* Warning/Notes */}
              <p className="text-[11px] text-slate-500 mt-2 italic leading-relaxed">
                ⚠️ {proto.verification_warning}
              </p>

              {proto.fasting_guidance && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-medium">
                  ✓ {proto.fasting_guidance}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { FlaskConical, AlertTriangle, CheckCircle2, MapPin, Pill, HelpCircle, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AudioButton } from './AudioButton';

export const LabTestGuide = ({ protocols, fourQuestions }) => {
  const { lang, t, highContrast } = useLanguage();

  return (
    <div className="space-y-4 pb-20">
      {/* Prime Rule Alert */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-900 shadow-xs">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-red-950">
              {lang === 'hi' ? 'सबसे जरूरी नियम: डॉक्टर की टेस्ट पर्ची देखें' : 'Golden Rule: Check Doctor\'s Test Slip First!'}
            </h4>
            <p className="mt-1 leading-relaxed text-red-800">
              {lang === 'hi'
                ? 'हर टेस्ट एक ही कमरे में नहीं होता। डॉक्टर की पर्ची पर जो लैब/काउंटर लिखा हो, वही फॉलो करें। रूम 127 और रूम 25 संदर्भ नंबर हैं, अस्पताल पहुंचकर स्टाफ से दोबारा जांचें।'
                : 'Never assume all tests take place in one room. Every investigation (blood, urine, stool, biopsy, X-Ray) has specific counters stamped on your doctor\'s test requisition slip.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Questions Before Giving Sample */}
      {fourQuestions && (
        <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2 font-semibold text-sm">
            <HelpCircle className="w-4 h-4 text-emerald-300" />
            <span>
              {lang === 'hi' ? 'सैंपल देने से पहले यह 4 बातें पूछें' : lang === 'pa' ? 'ਸੈਂਪਲ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ ਇਹ 4 ਗੱਲਾਂ ਪੁੱਛੋ' : '4 Questions to Ask Before Giving Samples'}
            </span>
          </div>
          <div className="space-y-2 mt-3">
            {fourQuestions.map((q, idx) => (
              <div key={idx} className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs text-xs">
                <p className="font-bold text-white">
                  {idx + 1}. {lang === 'hi' ? q.hindi : lang === 'pa' ? q.punjabi : q.q}
                </p>
                <p className="text-[11px] text-emerald-200 mt-0.5">
                  👉 {q.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Published Sample Collection Rooms */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-slate-800 px-1 flex items-center justify-between">
          <span>{lang === 'hi' ? 'प्रकाशित सैंपल कलेक्शन काउंटर (दिशानिर्देश)' : 'Published Sample Collection Reference Counters'}</span>
        </h3>

        {protocols && protocols.map((proto, idx) => {
          const typeName = lang === 'hi' && proto.hindi_type ? proto.hindi_type : proto.type;
          const speechText = `${typeName}. Location: ${proto.published_location}. ${proto.verification_warning || ''}`;

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
                      {typeName}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {proto.type}
                    </p>
                  </div>
                </div>
                <AudioButton text={speechText} />
              </div>

              {/* Location Badge */}
              <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">
                    {lang === 'hi' ? 'प्रकाशित स्थान: ' : 'Location: '}
                  </span>
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

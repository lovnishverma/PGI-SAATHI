import React, { useState } from 'react';
import { FlaskConical, AlertTriangle, MapPin, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { AudioButton } from './AudioButton';

export const LabTestGuide = ({ protocols, fourQuestions, onlineReportsGuide = null }) => {
  const { lang, highContrast } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: lang === 'hi' ? 'सभी जांच' : 'All Tests' },
    { id: 'blood', label: lang === 'hi' ? 'खून की जांच (Blood/Routine)' : 'Blood (Routine)' },
    { id: 'special', label: lang === 'hi' ? 'विशेष जांच / दवा निगरानी' : 'Special / TDM' },
    { id: 'urine', label: lang === 'hi' ? 'पेशाब / मल जांच (Urine/Stool)' : 'Urine / Stool' }
  ];

  const filteredProtocols = (protocols || []).filter(proto => {
    if (selectedCategory === 'all') return true;
    const text = (proto.type + ' ' + (proto.hindi_type || '')).toLowerCase();
    if (selectedCategory === 'blood') return text.includes('routine') || text.includes('blood') || text.includes('खून') || text.includes('127');
    if (selectedCategory === 'special') return text.includes('tdm') || text.includes('drug') || text.includes('विशेष') || text.includes('25');
    if (selectedCategory === 'urine') return text.includes('urine') || text.includes('stool') || text.includes('पेशाब');
    return true;
  });

  return (
    <div className="space-y-4 pb-20 md:pb-6">
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
                <p className="text-[11px] text-emerald-200 mt-0.5 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-300 shrink-0" aria-hidden="true" />
                  <span>{q.note}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Published Sample Collection Rooms */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <h3 className="font-bold text-sm text-slate-800">
            {lang === 'hi' ? 'प्रकाशित सैंपल कलेक्शन काउंटर (दिशानिर्देश)' : 'Published Sample Collection Reference Counters'}
          </h3>
          <div 
            role="group" 
            aria-label="Filter tests by type" 
            className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs"
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={selectedCategory === cat.id}
                className={`px-2.5 py-1.5 rounded-full font-medium transition-all text-[11px] shrink-0 ${
                  selectedCategory === cat.id
                    ? highContrast
                      ? 'bg-yellow-400 text-black font-bold'
                      : 'bg-teal-700 text-white font-semibold shadow-xs'
                    : highContrast
                      ? 'bg-black text-yellow-300 border border-yellow-400'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProtocols.map((proto, idx) => {
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
              <p className="text-[11px] text-slate-500 mt-2 italic leading-relaxed flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{proto.verification_warning}</span>
              </p>

              {proto.fasting_guidance && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-medium flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{proto.fasting_guidance}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Online Lab Reports Portal Walkthrough */}
      {onlineReportsGuide && (
        <div className="bg-slate-50 border border-blue-200 rounded-2xl p-4 space-y-3 text-xs shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">📥</span>
              <h4 className="font-bold text-slate-900 text-sm">
                {lang === 'hi' ? 'घर बैठे ऑनलाइन टेस्ट रिपोर्ट डाउनलोड करें (pgimer.edu.in)' : 'Download Lab Reports Online (Zero Queue)'}
              </h4>
            </div>
            <a
              href={onlineReportsGuide.portal_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 underline shrink-0"
            >
              {lang === 'hi' ? 'पोर्टल लिंक ↗' : 'Portal Link ↗'}
            </a>
          </div>

          <p className="text-[11px] text-slate-600">
            {onlineReportsGuide.turnaround_time}
          </p>

          <div className="space-y-1.5 pt-1">
            <strong className="text-slate-800 text-[11px] block">
              {lang === 'hi' ? 'डाउनलोड करने के आसान कदम:' : 'Simple Steps to Download:'}
            </strong>
            <ul className="space-y-1 text-[11px] text-slate-700">
              {onlineReportsGuide.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Pill, Home, Sparkles, MapPin, Tag } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

export const AmenitiesGuide = ({ pharmacies = [], sarais = [] }) => {
  const [activeSubTab, setActiveSubTab] = useState('pharmacies');
  const { lang, highContrast } = useLanguage();

  return (
    <div className={`rounded-2xl border p-4 shadow-sm transition-all space-y-4 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white' 
        : 'bg-white border-slate-200'
    }`}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base text-slate-900">
              {lang === 'hi' ? 'सस्ती दवाइयां (AMRIT) व रुकने की सराय' : 'Subsidized Pharmacies (AMRIT) & Sarais'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {lang === 'hi' ? 'दवाइयों पर 50-70% तक की छूट और दूर से आए मरीजों के लिए कम खर्च में रुकने की जगह' : 'Save 50%–70% on medicines and access hospital night shelters'}
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 mt-3 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('pharmacies')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'pharmacies'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>{lang === 'hi' ? 'सस्ती दवाइयां (AMRIT)' : 'AMRIT Pharmacies'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sarais')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'sarais'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{lang === 'hi' ? 'रुकने की सराय (Dharamshalas)' : 'Night Stays & Sarais'}</span>
          </button>
        </div>
      </div>

      {/* AMRIT Pharmacies List */}
      {activeSubTab === 'pharmacies' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-start gap-2">
            <Tag className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>{lang === 'hi' ? 'अमृत (AMRIT) फार्मेसी का लाभ:' : 'Save 50% to 70%:'} </strong>
              <span>
                {lang === 'hi'
                  ? 'अस्पताल के बाहर महंगे मेडिकल स्टोरों पर जाने से बचें। परिसर के अंदर HLL की अमृत फार्मेसी में ब्रांडेड दवाइयों, कैंसर व दिल की दवाइयों पर 50% से 70% तक आधिकारिक छूट मिलती है।'
                  : 'Avoid private chemists outside Gate 1. In-campus AMRIT pharmacies run by HLL Lifecare offer 50% to 70% discounts on branded medicines, stents, implants, and oncology drugs.'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {pharmacies.map((p) => (
              <div
                key={p.id}
                className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-xs md:text-sm">
                    {p.name}
                  </h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded shrink-0">
                    {p.timings}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{p.location}</span>
                </p>

                <p className="text-[11px] text-emerald-700 font-medium bg-emerald-50/60 p-1.5 rounded-lg border border-emerald-100/80">
                  {p.discounts}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sarais and Accommodation List */}
      {activeSubTab === 'sarais' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 text-xs text-blue-950 flex items-start gap-2">
            <Home className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>{lang === 'hi' ? 'कम खर्च में ठहरने की सुविधा:' : 'Subsidized Night Stays:'} </strong>
              <span>
                {lang === 'hi'
                  ? 'दूर से आए मरीजों के तीमारदार अस्पताल कॉरिडोर में न सोएं। परिसर के अंदर रेड क्रॉस व रोटरी सराय में बेहद मामूली दरों पर बिस्तर व कमरे उपलब्ध हैं।'
                  : 'Outstation patient attendants do not need to sleep on cold corridor floors. In-campus Sarais offer subsidized dormitory beds (₹50–₹100) and family rooms upon showing patient treatment slips.'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {sarais.map((s) => (
              <div
                key={s.id}
                className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs md:text-sm">
                      {s.name}
                    </h4>
                    <span className="text-[10px] text-blue-600 font-medium">
                      {s.type}
                    </span>
                  </div>
                  {s.charges && (
                    <span className="text-[10px] bg-slate-200 text-slate-800 font-semibold px-2 py-0.5 rounded shrink-0">
                      {s.charges}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{s.location}</span>
                </p>

                {s.capacity && (
                  <p className="text-[11px] text-slate-500">
                    <strong>Capacity:</strong> {s.capacity}
                  </p>
                )}

                {s.eligibility && (
                  <p className="text-[11px] text-amber-900 bg-amber-50 p-1.5 rounded-lg border border-amber-200/60">
                    <strong>Note:</strong> {s.eligibility}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

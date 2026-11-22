import React from 'react';
import { Building2, Phone, MapPin, AlertCircle, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AudioButton } from './AudioButton';

export const BuildingsGuide = ({ buildings }) => {
  const { lang, highContrast } = useLanguage();

  const getBuildingTitle = (b) => {
    if (lang === 'hi' && b.hindi_name) return b.hindi_name;
    if (lang === 'pa' && b.punjabi_name) return b.punjabi_name;
    return b.name;
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Banner Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 shadow-xs">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-amber-950">
              Important: Not all clinics are in New OPD
            </h4>
            <p className="mt-1 leading-relaxed">
              Patients often waste hours standing in New OPD lines for heart, eye, or children's doctors. 
              The <strong>Advanced Centres</strong> have their own separate registration counters and buildings.
            </p>
          </div>
        </div>
      </div>

      {/* Buildings Cards */}
      <div className="grid grid-cols-1 gap-3.5">
        {buildings.map((b) => {
          const title = getBuildingTitle(b);
          const speechText = `${title}. Landmark: ${b.landmark}. ${b.description}`;

          return (
            <div
              key={b.id}
              className={`rounded-2xl p-4 border transition-all shadow-xs ${
                highContrast 
                  ? 'bg-black border-yellow-400 text-white' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl ${
                    b.is_separate_building 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      {title}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-500 inline-flex items-center gap-1">
                      {b.is_separate_building ? (
                        <>
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" aria-hidden="true" />
                          <span>Separate Building</span>
                        </>
                      ) : (
                        'Main Block'
                      )}
                    </span>
                  </div>
                </div>
                <AudioButton text={speechText} />
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {b.description}
              </p>

              {/* Landmark info */}
              <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-start gap-2 text-xs text-slate-700">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Landmark: </span>
                  <span>{b.landmark}</span>
                </div>
              </div>

              {/* Reception Phone Numbers */}
              {b.reception_phone && b.reception_phone.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Reception:</span>
                  <div className="flex gap-2">
                    {b.reception_phone.map((ph, idx) => (
                      <a
                        key={idx}
                        href={`tel:${ph}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{ph}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

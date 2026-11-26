import React from 'react';
import { Building2, Phone, MapPin, AlertCircle, Star, Navigation } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { AudioButton } from './AudioButton';
import { FloorDirectory } from './FloorDirectory';
import { AmenitiesGuide } from './AmenitiesGuide';
import { CampusMap } from './CampusMap';

export const BuildingsGuide = ({ buildings = [], floorDirectory = [], pharmacies = [], sarais = [], transport = null, welfare = null, parking = null, atms = [], hearse = null }) => {
  const { lang, highContrast } = useLanguage();

  const getBuildingTitle = (b) => {
    if (lang === 'hi' && b.hindi_name) return b.hindi_name;
    if (lang === 'pa' && b.punjabi_name) return b.punjabi_name;
    return b.name;
  };

  const gateLandmarks = [
    {
      gate: lang === 'hi' ? 'गेट 1 (मुख्य प्रवेश द्वार - सेक्टर 12)' : 'Gate 1 (Main Entrance - Sector 12)',
      nearest: 'New OPD Block, Administrative Block, Kairon Block, Research Block A/B',
      desc: lang === 'hi' ? 'सामान्य ओपीडी पर्ची बनवाने और न्यू ओपीडी जाने के लिए मुख्य गेट।' : 'Primary gate for General OPD registrations and New OPD clinics.'
    },
    {
      gate: lang === 'hi' ? 'गेट 2 (कालका रोड / सेक्टर 11 की तरफ)' : 'Gate 2 (Towards Sector 11 / Kalka Road)',
      nearest: 'Advanced Eye Centre (AEC), Advanced Cardiac Centre (ACC), Advanced Paediatric Centre (APC)',
      desc: lang === 'hi' ? 'आँख, दिल और बच्चों के विशेष केंद्रों में जाने के लिए सबसे नजदीकी गेट।' : 'Closest entrance directly accessing Eye, Heart, and Children specialist centers.'
    },
    {
      gate: lang === 'hi' ? 'गेट 3 (नेहरू अस्पताल / आपातकालीन प्रवेश)' : 'Gate 3 / Emergency Gate (Nehru Block)',
      nearest: 'Advanced Trauma Centre (ATC), Emergency Ward, Nehru Hospital',
      desc: lang === 'hi' ? '24 घंटे खुली इमरजेंसी और ट्रॉमा सेंटर के लिए 24x7 सीधा प्रवेश।' : '24x7 vehicle/ambulance access direct to Emergency & Advanced Trauma Centre.'
    }
  ];

  return (
    <div className="space-y-4 pb-20 md:pb-6">
      {/* Banner Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 shadow-xs">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-amber-950">
              {lang === 'hi' ? 'सावधानी: सभी विभाग न्यू ओपीडी (New OPD) में नहीं हैं' : 'Important: Not all clinics are in New OPD'}
            </h4>
            <p className="mt-1 leading-relaxed">
              {lang === 'hi' 
                ? 'अक्सर मरीज आँख, दिल या बच्चों के डॉक्टरों के लिए न्यू ओपीडी की लाइन में खड़े होकर समय गंवा देते हैं। इन विशेष सेंटरों के अपने अलग काउंटर और भवन हैं।' 
                : 'Patients often waste hours standing in New OPD lines for heart, eye, or children\'s doctors. The Advanced Centres have their own separate registration counters and buildings.'}
            </p>
          </div>
        </div>
      </div>

      {/* Campus Gate Entry Landmark Guide */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-4 shadow-sm border border-slate-800">
        <div className="flex items-center gap-2 mb-2 font-semibold text-sm text-blue-200">
          <Navigation className="w-4 h-4 text-blue-400" />
          <span>{lang === 'hi' ? 'पीजीआई परिसर के मुख्य गेट व दिशा-निर्देश' : 'PGIMER Campus Gate Landmarks & Entry Points'}</span>
        </div>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          {lang === 'hi' 
            ? 'सही गेट से प्रवेश करने पर अस्पताल के भीतर पैदल चलने की थकान से बचा जा सकता है:' 
            : 'Entering from the correct gate saves 10-15 minutes of unnecessary walking inside campus:'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {gateLandmarks.map((g, idx) => (
            <div key={idx} className="bg-white/10 rounded-xl p-3 border border-white/10 text-xs">
              <span className="font-bold text-yellow-300 block mb-1">{g.gate}</span>
              <p className="font-semibold text-white text-[11px] mb-1">{g.nearest}</p>
              <p className="text-[11px] text-slate-300 leading-normal">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive 2D Campus Layout Map */}
      <CampusMap buildings={buildings} />

      {/* New OPD Floor-by-Floor Directory */}
      {floorDirectory && floorDirectory.length > 0 && (
        <FloorDirectory floorData={floorDirectory} />
      )}

      {/* AMRIT Pharmacies, Sarais, Shuttles, ATMs & Welfare Guide */}
      {(pharmacies?.length > 0 || sarais?.length > 0 || transport || welfare || parking || atms?.length > 0 || hearse) && (
        <AmenitiesGuide
          pharmacies={pharmacies}
          sarais={sarais}
          transport={transport}
          welfare={welfare}
          parking={parking}
          atms={atms}
          hearse={hearse}
        />
      )}

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

import React, { useState } from 'react';
import { Pill, Home, Sparkles, MapPin, Tag, Bus, Accessibility, HeartHandshake, Droplet, Phone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

export const AmenitiesGuide = ({ pharmacies = [], sarais = [], transport = null, welfare = null }) => {
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
              {lang === 'hi' ? 'अस्पताल सुविधाएं, सस्ती दवाइयां व निःशुल्क शटल' : 'Hospital Amenities, Subsidies & Free Campus Transit'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {lang === 'hi' ? 'AMRIT दवाइयां, सराय, गोल्फ कार्ट, आयुष्मान भारत और ब्लड बैंक दिशा-निर्देश' : 'AMRIT pharmacies, Sarais, Free Golf Carts, Ayushman Bharat & Blood Bank Guide'}
            </p>
          </div>
        </div>

        {/* 4 Sub-tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-3 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('pharmacies')}
            className={`py-2 px-1 rounded-lg transition-all flex items-center justify-center gap-1.5 text-center min-h-[38px] ${
              activeSubTab === 'pharmacies'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Pill className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'hi' ? 'सस्ती दवाइयां' : 'Pharmacies'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sarais')}
            className={`py-2 px-1 rounded-lg transition-all flex items-center justify-center gap-1.5 text-center min-h-[38px] ${
              activeSubTab === 'sarais'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'hi' ? 'रुकने की सराय' : 'Sarais'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('transport')}
            className={`py-2 px-1 rounded-lg transition-all flex items-center justify-center gap-1.5 text-center min-h-[38px] ${
              activeSubTab === 'transport'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bus className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'hi' ? 'शटल व व्हीलचेयर' : 'Transit & Wheelchair'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('welfare')}
            className={`py-2 px-1 rounded-lg transition-all flex items-center justify-center gap-1.5 text-center min-h-[38px] ${
              activeSubTab === 'welfare'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'hi' ? 'आयुष्मान व ब्लड बैंक' : 'Welfare & Blood Bank'}</span>
          </button>
        </div>
      </div>

      {/* 1. AMRIT Pharmacies List */}
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

      {/* 2. Sarais and Accommodation List */}
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

      {/* 3. Transport & Mobility (Golf Carts, Shuttles & Wheelchair Stations) */}
      {activeSubTab === 'transport' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-950 flex items-start gap-2">
            <Bus className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong>{lang === 'hi' ? 'परिसर के अंदर 100% निशुल्क शटल सेवा:' : '100% Free Campus Transit:'} </strong>
              <span>
                {lang === 'hi'
                  ? 'बुजुर्गों, दिव्यांगों और गर्भवती महिलाओं के लिए मुख्य गेट, न्यू ओपीडी और सभी सेंटरों के बीच फ्री बैटरी वाली गाड़ियां और शटल बसें निरंतर चलती हैं।'
                  : 'Free battery-operated golf carts and shuttle vans operate across Gate 1, New OPD, Nehru Hospital, and specialty centres for elderly and mobility-impaired visitors.'}
              </span>
            </div>
          </div>

          {/* Shuttles & Golf Carts */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              {lang === 'hi' ? 'निशुल्क शटल व बैटरी वाहन रूट' : 'Free Shuttle Routes & Carts'}
            </h4>
            {transport?.shuttles_and_carts?.map((shuttle) => (
              <div key={shuttle.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-bold text-slate-900 text-xs md:text-sm">
                    {lang === 'hi' ? shuttle.hindi_name : shuttle.name}
                  </h5>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded shrink-0">
                    {shuttle.cost}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700">
                  <strong>Route:</strong> {shuttle.route}
                </p>
                <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 pt-0.5">
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    ⏱️ {shuttle.frequency}
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    ♿ {shuttle.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Wheelchair & Stretcher Stations */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Accessibility className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'hi' ? 'व्हीलचेयर और स्ट्रेचर सहायता केंद्र' : 'Wheelchair & Stretcher Stations'}</span>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {transport?.wheelchair_stretcher_stations?.map((station) => (
                <div key={station.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px]">{station.location}</span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-medium px-1.5 py-0.5 rounded">
                      {station.availability}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{station.how_to_get}</p>
                </div>
              ))}
            </div>

            {transport?.control_room && (
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2 mt-2">
                <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>{lang === 'hi' ? 'सुरक्षा कंट्रोल रूम (व्हीलचेयर सहायता):' : 'Security Control Room Assistance:'} </strong>
                  <span>{transport.control_room.aso_security}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Welfare Schemes & Blood Bank */}
      {activeSubTab === 'welfare' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          {/* Ayushman Bharat Card */}
          {welfare?.ayushman_bharat && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <h4 className="font-bold text-slate-900 text-xs md:text-sm">
                  {lang === 'hi' ? welfare.ayushman_bharat.hindi_name : welfare.ayushman_bharat.name}
                </h4>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {welfare.ayushman_bharat.coverage}
              </p>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 space-y-1 text-[11px]">
                <strong className="text-slate-800 block">{lang === 'hi' ? 'परिसर में आयुष्मान काउंटर:' : 'Active Help Desk Counters:'}</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  {welfare.ayushman_bharat.counters.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
              <p className="text-[10px] text-slate-500">
                <strong>Admin Office:</strong> {welfare.ayushman_bharat.admin_office}
              </p>
            </div>
          )}

          {/* Poor Patient Welfare Fund (PPWF) */}
          {welfare?.poor_patient_cell && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-rose-600 shrink-0" />
                <h4 className="font-bold text-slate-900 text-xs md:text-sm">
                  {lang === 'hi' ? welfare.poor_patient_cell.hindi_name : welfare.poor_patient_cell.name}
                </h4>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {welfare.poor_patient_cell.assistance}
              </p>
              <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-100 space-y-0.5">
                <p>📍 <strong>Location:</strong> {welfare.poor_patient_cell.location}</p>
                <p>⏰ <strong>Timings:</strong> {welfare.poor_patient_cell.timings}</p>
                <p>📄 <strong>Documents:</strong> {welfare.poor_patient_cell.required_docs}</p>
              </div>
            </div>
          )}

          {/* Blood Bank (Department of Transfusion Medicine) */}
          {welfare?.blood_bank && (
            <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-rose-600 shrink-0" />
                  <h4 className="font-bold text-rose-950 text-xs md:text-sm">
                    {lang === 'hi' ? welfare.blood_bank.hindi_name : welfare.blood_bank.name}
                  </h4>
                </div>
                <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                  24x7 Emergency Issue
                </span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                <strong>{lang === 'hi' ? 'रिप्लेसमेंट डोनेशन नियम:' : 'Replacement Donor Slip Process:'} </strong>
                {welfare.blood_bank.replacement_slip_process}
              </p>
              <div className="bg-white p-2 rounded-lg border border-rose-100 text-[11px] text-slate-600 space-y-1">
                <p>⏰ <strong>Donation Timings:</strong> {welfare.blood_bank.donation_timings}</p>
                <p>📞 <strong>Blood Bank Direct Helplines:</strong> {welfare.blood_bank.helplines.join(" • ")}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

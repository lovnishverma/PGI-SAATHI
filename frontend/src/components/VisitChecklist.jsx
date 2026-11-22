import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, RotateCcw, ShieldCheck, UserCheck, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AudioButton } from './AudioButton';

export const VisitChecklist = ({ checklistItems }) => {
  const { lang, t, highContrast } = useLanguage();
  const [patientType, setPatientType] = useState('new'); // 'new' or 'returning'
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('pgi_saathi_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('pgi_saathi_checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const items = checklistItems || [
    { id: "id_proof", text: "ID proof (Aadhaar / Voter ID / Driving License)" },
    { id: "old_card", text: "Purana CR / OPD card (पुराना कार्ड व पर्ची)" },
    { id: "old_prescription", text: "Doctor ki purani parchi (Old prescription)" },
    { id: "reports", text: "Blood / X-ray / MRI / CT scan reports (जांच रिपोर्टें)" },
    { id: "discharge_summary", text: "Discharge summary (अगर पहले अस्पताल में भर्ती हुए थे)" },
    { id: "referral_letter", text: "Referral letter (अगर किसी दूसरे अस्पताल से भेजा गया है)" },
    { id: "medicines_list", text: "Medicines list (चल रही दवाइयों की पूरी सूची या पत्ते)" },
    { id: "registered_mobile", text: "Registered mobile phone (SMS व OTP के लिए चालू फोन)" },
    { id: "online_confirmation", text: "Online pre-registration confirmation slip (अगर ऑनलाइन भरी है)" }
  ];

  const toggleItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReset = () => {
    if (window.confirm("Reset all ticked items in your visit checklist?")) {
      setCheckedItems({});
    }
  };

  const shareToWhatsApp = () => {
    const listText = items
      .map((item, idx) => `${idx + 1}. ${item.text}`)
      .join('\n');
    const message = encodeURIComponent(
      `*PGI Chandigarh Visit Checklist (PGIMER)*\n\nEnsure to carry these documents:\n\n${listText}\n\nGenerated via PGI Saathi (Offline OPD Guide)`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;
  const audioSummary = items.map(item => item.text).join(". ");

  return (
    <div className="space-y-4 pb-20">
      {/* Header and Progress Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-base md:text-lg">
              {lang === 'hi' ? 'साथ क्या लेकर आना है? (चेकलिस्ट)' : t('checklist_title')}
            </h2>
            <p className="text-xs text-emerald-100 mt-1 max-w-sm">
              {lang === 'hi' ? 'घर से निकलने से पहले यह कागजात जरूर साथ रख लें ताकि लाइन में लगकर लौटना न पड़े।' : t('checklist_desc')}
            </p>
          </div>
          <AudioButton text={audioSummary} className="bg-white/20 text-white border-white/30" />
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-emerald-100 mb-1 font-medium">
            <span>{lang === 'hi' ? 'तैयार सामग्री:' : 'Prepared:'} {checkedCount} of {items.length} items</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-emerald-950/40 rounded-full h-2">
            <div
              className="bg-emerald-300 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Patient Type Switcher */}
      <div className="flex bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setPatientType('new')}
          className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            patientType === 'new' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>{lang === 'hi' ? 'नया मरीज (First Visit)' : t('new_patient')}</span>
        </button>
        <button
          onClick={() => setPatientType('returning')}
          className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            patientType === 'returning' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{lang === 'hi' ? 'पुराना मरीज (Follow-up)' : t('returning_patient')}</span>
        </button>
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = Boolean(checkedItems[item.id]);

          // Filter recommendation based on patient type
          if (patientType === 'new' && (item.id === 'old_card' || item.id === 'discharge_summary')) return null;

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                isChecked
                  ? 'bg-emerald-50/60 border-emerald-300 text-slate-800'
                  : highContrast 
                    ? 'bg-black border-yellow-400 text-white' 
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
            >
              {isChecked ? (
                <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 shrink-0" />
              )}
              <span className={`text-xs md:text-sm font-medium ${isChecked ? 'line-through text-slate-500' : ''}`}>
                {item.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{lang === 'hi' ? 'डेटा फोन में ही सुरक्षित रहता है' : 'Stored locally on device'}</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={shareToWhatsApp}
            className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-200 inline-flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share to WhatsApp'}</span>
          </button>
          <button
            onClick={handleReset}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1.5 rounded"
          >
            {t('clear_checklist')}
          </button>
        </div>
      </div>
    </div>
  );
};

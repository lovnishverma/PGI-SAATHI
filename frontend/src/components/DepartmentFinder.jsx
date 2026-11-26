import React, { useState, useMemo } from 'react';
import { Search, Building, AlertCircle, Phone, Clock, Info, X, ChevronDown, ShieldAlert, AlertTriangle, MapPin } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { AudioButton } from './AudioButton';
import { detectEmergency, detectOffCampusDeflection, normalizeQuery } from '../utils/emergencyInterception';
import { PatientJourneyWizard } from './PatientJourneyWizard';

export const DepartmentFinder = ({ departments, buildings, schedule, onOpenEmergency, journeySteps = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const { lang, t, highContrast } = useLanguage();

  // Evaluate query for acute life-threatening emergency signs
  const emergencyCheck = useMemo(() => {
    return detectEmergency(searchQuery);
  }, [searchQuery]);

  // Evaluate query for off-campus municipal deflections (e.g. routine animal bites or travel vaccines)
  const deflectionCheck = useMemo(() => {
    return detectOffCampusDeflection(searchQuery, lang);
  }, [searchQuery, lang]);

  const { filteredDepts, matchRationaleMap } = useMemo(() => {
    const q = normalizeQuery(searchQuery);
    const rationales = {};

    const results = departments.filter(dept => {
      // Building filter
      if (selectedBuilding !== 'all' && dept.building_id !== selectedBuilding) {
        return false;
      }
      if (!q) return true;

      const normName = normalizeQuery(dept.name || '');
      const normHindi = normalizeQuery(dept.hindi_name || '');
      const normPunjabi = normalizeQuery(dept.punjabi_name || '');
      const normNotes = normalizeQuery(dept.notes || '');

      // Name matches
      if (normName.includes(q)) {
        rationales[dept.id] = `Department name matched "${searchQuery}"`;
        return true;
      }
      if (normHindi.includes(q)) {
        rationales[dept.id] = `Hindi department name matched "${searchQuery}"`;
        return true;
      }
      if (normPunjabi.includes(q)) {
        rationales[dept.id] = `Punjabi department name matched "${searchQuery}"`;
        return true;
      }

      // Concerns matches
      if (Array.isArray(dept.concerns)) {
        const matchedConcern = dept.concerns.find(c => normalizeQuery(c).includes(q));
        if (matchedConcern) {
          rationales[dept.id] = `Matched common symptom: "${matchedConcern}"`;
          return true;
        }
      }

      // Notes match
      if (normNotes.includes(q)) {
        rationales[dept.id] = `Matched in department orientation guidance`;
        return true;
      }

      return false;
    });

    return { filteredDepts: results, matchRationaleMap: rationales };
  }, [departments, searchQuery, selectedBuilding]);

  const getBuilding = (id) => buildings.find(b => b.id === id);

  const getDeptTitle = (dept) => {
    if (lang === 'hi' && dept.hindi_name) return dept.hindi_name;
    if (lang === 'pa' && dept.punjabi_name) return dept.punjabi_name;
    return dept.name;
  };

  const getBuildingTitle = (b) => {
    if (!b) return '';
    if (lang === 'hi' && b.hindi_name) return b.hindi_name;
    if (lang === 'pa' && b.punjabi_name) return b.punjabi_name;
    return b.name;
  };

  const commonSymptoms = [
    { label: lang === 'hi' ? 'आँख (Eye)' : lang === 'pa' ? 'ਅੱਖ (Eye)' : 'Eye (AEC)', query: 'eye' },
    { label: lang === 'hi' ? 'दिल (Heart)' : lang === 'pa' ? 'ਦਿਲ (Heart)' : 'Heart (ACC)', query: 'heart' },
    { label: lang === 'hi' ? 'बच्चे (Child)' : lang === 'pa' ? 'ਬੱਚੇ (Child)' : 'Child (APC)', query: 'child' },
    { label: lang === 'hi' ? 'हड्डी / दर्द (Bone)' : lang === 'pa' ? 'ਹੱਡੀ (Bone)' : 'Bone / Ortho', query: 'bone' },
    { label: lang === 'hi' ? 'दांत (Dental)' : lang === 'pa' ? 'ਦੰਦ (Dental)' : 'Dental', query: 'dental' },
    { label: lang === 'hi' ? 'सिर / नस (Brain)' : lang === 'pa' ? 'ਦਿਮਾਗ (Brain)' : 'Neurology', query: 'brain' },
    { label: lang === 'hi' ? 'गुर्दा (Kidney)' : lang === 'pa' ? 'ਗੁਰਦਾ (Kidney)' : 'Kidney', query: 'kidney' },
    { label: lang === 'hi' ? 'बुखार / कमजोरी' : lang === 'pa' ? 'ਬੁਖਾਰ / ਕਮਜ਼ੋਰੀ' : 'Fever / Illness', query: 'fever' },
  ];

  return (
    <div className="space-y-4 pb-20 md:pb-6">
      {/* 6-Step Chronological Patient Journey Wizard */}
      {journeySteps && journeySteps.length > 0 && (
        <PatientJourneyWizard steps={journeySteps} />
      )}

      {/* Search Input */}
      <div className="relative sticky top-[57px] md:top-[65px] z-20 pt-1 pb-1" role="search">
        <label htmlFor="dept-search-input" className="sr-only">
          {t('search_placeholder')}
        </label>
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" aria-hidden="true" />
        </div>
        <input
          id="dept-search-input"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('search_placeholder')}
          className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-sm min-h-[44px] ${
            emergencyCheck.isEmergency
              ? 'border-red-500 ring-2 ring-red-400 bg-red-50/40 text-red-950'
              : highContrast 
                ? 'bg-black text-yellow-300 border-yellow-400 placeholder:text-yellow-600' 
                : 'bg-white text-slate-900 border-slate-300 placeholder:text-slate-400'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search input"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center justify-center min-w-[44px] min-h-[44px] text-xs text-slate-400 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* PRIORITY EMERGENCY INTERCEPTION BANNER */}
      {emergencyCheck.isEmergency && (
        <div 
          role="alert" 
          aria-live="assertive"
          className="bg-red-600 text-white p-4 rounded-2xl shadow-lg border-2 border-red-700 animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/20 rounded-xl shrink-0">
              <ShieldAlert className="w-6 h-6 text-white animate-pulse" aria-hidden="true" />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-red-700 px-2 py-0.5 rounded">
                  Acute Red-Flag Symptom Detected
                </span>
                <h3 className="text-base font-extrabold mt-1">
                  CRITICAL ALERT: DO NOT WAIT IN OPD REGISTRATION QUEUES!
                </h3>
                <p className="text-xs text-red-100 font-medium mt-0.5">
                  Sign detected: <strong className="text-white underline">{emergencyCheck.label}</strong>. Routine morning OPD clinics cannot treat active life-threatening emergencies.
                </p>
              </div>

              <div className="bg-red-700/80 p-3 rounded-xl border border-red-500 text-xs text-white space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-yellow-300 shrink-0" />
                  <span>Immediate Action Protocol:</span>
                </p>
                <p className="text-[11px] text-red-100 leading-relaxed">
                  Proceed directly to <strong>Nehru Hospital Emergency Block</strong> or <strong>Advanced Trauma Centre (ATC)</strong>. Emergency triage operates 24x7 without prior OPD card or token.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {onOpenEmergency && (
                  <button
                    onClick={onOpenEmergency}
                    className="px-3.5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs rounded-xl inline-flex items-center gap-1.5 shadow-sm transition-colors min-h-[44px]"
                  >
                    <ShieldAlert className="w-4 h-4 text-red-700" />
                    <span>Open Emergency Modal</span>
                  </button>
                )}
                <a
                  href="tel:01722755555"
                  className="px-3.5 py-2.5 bg-white text-red-700 font-bold text-xs rounded-xl inline-flex items-center gap-1.5 hover:bg-red-50 shadow-sm transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Emergency (0172-2755555)</span>
                </a>
                <a
                  href="tel:01722755454"
                  className="px-3.5 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl inline-flex items-center gap-1.5 hover:bg-slate-800 transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Trauma Centre (0172-2755454)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OFF-CAMPUS DEFLECTION BANNER (Animal Bites / Yellow Fever) */}
      {!emergencyCheck.isEmergency && deflectionCheck && (
        <div 
          role="region" 
          aria-label={deflectionCheck.title}
          className="bg-amber-500 text-slate-950 p-4 rounded-2xl shadow-md border-2 border-amber-600 animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-black/10 rounded-xl shrink-0 text-slate-950">
              <MapPin className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-amber-300 px-2 py-0.5 rounded">
                  {deflectionCheck.badge}
                </span>
                <h3 className="text-base font-extrabold mt-1 text-slate-950">
                  {deflectionCheck.title}
                </h3>
                <p className="text-xs text-amber-950 font-semibold mt-0.5 leading-relaxed">
                  {deflectionCheck.warning}
                </p>
              </div>

              <div className="bg-amber-600/20 p-3 rounded-xl border border-amber-600/40 text-xs text-slate-950 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-900 shrink-0" />
                  <span>{lang === 'hi' ? 'सही अधिकृत केंद्र:' : lang === 'pa' ? 'ਸਹੀ ਅਧਿਕਾਰਤ ਕੇਂਦਰ:' : 'Correct Destination:'}</span>
                </p>
                <p className="text-[12px] text-amber-950 leading-relaxed font-medium">
                  {deflectionCheck.destination}
                </p>
              </div>

              {deflectionCheck.phone && (
                <div className="pt-1">
                  <a
                    href={`tel:${deflectionCheck.phone.replace(/[^0-9]/g, '')}`}
                    className="px-3.5 py-2 bg-slate-950 text-amber-300 font-bold text-xs rounded-xl inline-flex items-center gap-1.5 hover:bg-slate-900 shadow-sm transition-colors min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call {deflectionCheck.phoneLabel}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Symptom Chips */}
      <div className="space-y-1">
        <p className="text-[11px] font-semibold text-slate-500 px-1">
          {lang === 'hi' ? 'त्वरित खोज (समान्य समस्याएं):' : lang === 'pa' ? 'ਤੁਰੰਤ ਖੋਜ (ਆਮ ਸਮੱਸਿਆਵਾਂ):' : 'Quick Symptom Shortcuts:'}
        </p>
        <div 
          role="group" 
          aria-label="Quick symptom search shortcuts" 
          className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs py-0.5"
        >
          {commonSymptoms.map((sym, idx) => {
            const isSelected = searchQuery.toLowerCase().trim() === sym.query;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (isSelected) {
                    setSearchQuery('');
                  } else {
                    setSearchQuery(sym.query);
                  }
                }}
                aria-pressed={isSelected}
                className={`px-3 py-1.5 rounded-full shrink-0 font-medium transition-all text-xs min-h-[34px] focus-visible:outline-2 focus-visible:outline-blue-600 ${
                  isSelected
                    ? highContrast
                      ? 'bg-yellow-400 text-black font-bold'
                      : 'bg-blue-600 text-white shadow-xs font-semibold'
                    : highContrast
                      ? 'bg-neutral-900 text-yellow-300 border border-yellow-400'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {sym.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* OPD Schedule Card - Collapsible */}
      <div className="bg-linear-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-3.5 shadow-sm border border-blue-800 transition-all">
        <button
          onClick={() => setIsScheduleOpen(!isScheduleOpen)}
          aria-expanded={isScheduleOpen}
          className="w-full flex items-center justify-between font-semibold text-xs md:text-sm text-left focus-visible:outline-2 focus-visible:outline-white rounded"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-300 shrink-0" />
            <span>{t('opd_timings_title')}</span>
            <span className="text-[11px] text-blue-200 font-normal hidden sm:inline">(8:00 AM – 11:00 AM)</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-blue-300 transition-transform duration-200 ${
              isScheduleOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isScheduleOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-100 mt-3 pt-3 border-t border-blue-800/80 animate-in fade-in duration-150">
            <div className="bg-white/10 rounded-lg p-2.5 backdrop-blur-xs">
              <p className="font-bold text-white">{t('weekday_timings')}</p>
              <p className="text-[11px] text-blue-200 mt-0.5">{schedule?.weekdays?.notes}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2.5 backdrop-blur-xs">
              <p className="font-bold text-white">{t('saturday_timings')}</p>
              <p className="text-[11px] text-blue-200 mt-0.5">{t('closed_sunday')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Building Filter Pills */}
      <div 
        role="group" 
        aria-label="Filter departments by building" 
        className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs py-1"
      >
        <button
          onClick={() => setSelectedBuilding('all')}
          aria-pressed={selectedBuilding === 'all'}
          className={`px-3.5 py-2 rounded-full shrink-0 font-medium transition-all min-h-[40px] focus-visible:outline-2 focus-visible:outline-blue-600 ${
            selectedBuilding === 'all'
              ? highContrast ? 'bg-yellow-400 text-black font-bold' : 'bg-blue-600 text-white shadow-xs font-semibold'
              : highContrast ? 'bg-black text-yellow-300 border border-yellow-400 hover:bg-neutral-900' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          {t('all_buildings')}
        </button>
        {buildings.map(b => (
          <button
            key={b.id}
            onClick={() => setSelectedBuilding(b.id)}
            aria-pressed={selectedBuilding === b.id}
            className={`px-3.5 py-2 rounded-full shrink-0 font-medium transition-all min-h-[40px] focus-visible:outline-2 focus-visible:outline-blue-600 ${
              selectedBuilding === b.id
                ? highContrast ? 'bg-yellow-400 text-black font-bold' : 'bg-blue-600 text-white shadow-xs font-semibold'
                : highContrast ? 'bg-black text-yellow-300 border border-yellow-400 hover:bg-neutral-900' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {b.name.split('(')[0].trim()}
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div 
        aria-live="polite"
        className="flex items-center justify-between text-xs text-slate-500 px-1"
      >
        <span>
          Showing {filteredDepts.length} {filteredDepts.length === 1 ? 'department' : 'departments'}
          {searchQuery && ` for "${searchQuery}"`}
        </span>
        <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
          Verified Directory
        </span>
      </div>

      {/* Routine Non-Diagnostic Clinical Notice */}
      {searchQuery && !emergencyCheck.isEmergency && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl px-3 py-2 text-[11px] text-blue-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
          <span>
            Search suggestions provide hospital building orientation only and do not constitute clinical diagnosis or medical triage.
          </span>
        </div>
      )}

      {/* Departments List */}
      <div className="space-y-3">
        {filteredDepts.length === 0 ? (
          <div className="text-center py-10 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                {searchQuery ? `No department found for "${searchQuery}"` : 'No departments match selected filter'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                Try searching by simple symptom or body part (e.g., eye, bone, heart, chest, kidney), or visit the Central Registration Counter.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              {(searchQuery || selectedBuilding !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBuilding('all');
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors min-h-[38px]"
                >
                  Clear All Filters
                </button>
              )}
              <a
                href="tel:01722756565"
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors min-h-[38px]"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Call PGI Operator (0172-2756565)</span>
              </a>
            </div>
          </div>
        ) : (
          filteredDepts.map(dept => {
            const building = getBuilding(dept.building_id);
            const deptTitle = getDeptTitle(dept);
            const buildingTitle = getBuildingTitle(building);
            const speechText = `${deptTitle}. Location: ${buildingTitle}. ${dept.notes || ''}`;
            const rationale = matchRationaleMap[dept.id];

            return (
              <div
                key={dept.id}
                className={`rounded-2xl p-4 border transition-all shadow-xs ${
                  highContrast 
                    ? 'bg-black border-yellow-400 text-white' 
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-blue-950">
                      {deptTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {dept.name}
                    </p>
                  </div>
                  <AudioButton text={speechText} />
                </div>

                {/* Match Rationale Pill */}
                {rationale && (
                  <div className="mt-2 text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md inline-block font-medium">
                    {rationale}
                  </div>
                )}

                {/* Building Location Badge */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md ${
                    building?.is_separate_building
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    <Building className="w-3.5 h-3.5" />
                    <span>{buildingTitle}</span>
                  </span>

                  {building?.reception_phone?.[0] && (
                    <a
                      href={`tel:${building.reception_phone[0]}`}
                      className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md border border-slate-200 transition-colors"
                    >
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>{building.reception_phone[0]}</span>
                    </a>
                  )}
                </div>

                {/* Separate Building Warning Banner */}
                {building?.is_separate_building && (
                  <div className="mt-2.5 bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-start gap-2 text-xs text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">{t('separate_building_alert')}: </span>
                      <span>{t('separate_building_notice')}</span>
                    </div>
                  </div>
                )}

                {/* Referral Note */}
                {dept.referral_needed && (
                  <p className="mt-2 text-[11px] text-slate-500 italic flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{t('referral_notice')}</span>
                  </p>
                )}

                {/* Symptom / Concerns tags */}
                {dept.concerns && dept.concerns.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                    <span className="text-[10px] text-slate-400 font-medium py-0.5">Key topics:</span>
                    {dept.concerns.slice(0, 6).map((c, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Search, Building, AlertCircle, Phone, Clock, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AudioButton } from './AudioButton';

export const DepartmentFinder = ({ departments, buildings, schedule }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const { lang, t, highContrast } = useLanguage();

  const filteredDepts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return departments.filter(dept => {
      // Building filter
      if (selectedBuilding !== 'all' && dept.building_id !== selectedBuilding) {
        return false;
      }
      if (!q) return true;

      // Match name in current or alternate languages
      const nameMatch = 
        dept.name?.toLowerCase().includes(q) ||
        dept.hindi_name?.includes(q) ||
        dept.punjabi_name?.includes(q);

      // Match concerns/symptoms array
      const concernMatch = dept.concerns?.some(c => c.toLowerCase().includes(q));

      return nameMatch || concernMatch;
    });
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

  return (
    <div className="space-y-4 pb-20">
      {/* OPD Schedule Card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-4 shadow-sm border border-blue-800">
        <div className="flex items-center gap-2 mb-2 font-semibold text-sm">
          <Clock className="w-4 h-4 text-blue-300" />
          <span>{t('opd_timings_title')}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-100">
          <div className="bg-white/10 rounded-lg p-2.5 backdrop-blur-xs">
            <p className="font-bold text-white">{t('weekday_timings')}</p>
            <p className="text-[11px] text-blue-200 mt-0.5">{schedule?.weekdays?.notes}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2.5 backdrop-blur-xs">
            <p className="font-bold text-white">{t('saturday_timings')}</p>
            <p className="text-[11px] text-blue-200 mt-0.5">{t('closed_sunday')}</p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative" role="search">
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
          className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs min-h-[44px] ${
            highContrast 
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
            ✕
          </button>
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
        <span>Showing {filteredDepts.length} departments</span>
        <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
          {t('verified_badge')}
        </span>
      </div>

      {/* Departments List */}
      <div className="space-y-3">
        {filteredDepts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <Info className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No exact match found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Please check spelling, or visit the New OPD Central Help Desk at the hospital entrance for guidance.
            </p>
          </div>
        ) : (
          filteredDepts.map(dept => {
            const building = getBuilding(dept.building_id);
            const deptTitle = getDeptTitle(dept);
            const buildingTitle = getBuildingTitle(building);
            const speechText = `${deptTitle}. Location: ${buildingTitle}. ${dept.notes || ''}`;

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
                    <span className="text-[10px] text-slate-400 font-medium py-0.5">Matched for:</span>
                    {dept.concerns.slice(0, 5).map((c, i) => (
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

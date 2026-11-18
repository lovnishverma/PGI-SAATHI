import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DepartmentFinder } from './components/DepartmentFinder';
import { BuildingsGuide } from './components/BuildingsGuide';
import { VisitChecklist } from './components/VisitChecklist';
import { LabTestGuide } from './components/LabTestGuide';
import { HelpDeskPhrases } from './components/HelpDeskPhrases';
import { EmergencyModal } from './components/EmergencyModal';
import { dataService } from './services/dataService';

function MainApp() {
  const [activeTab, setActiveTab] = useState('finder');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [protocols, setProtocols] = useState([]);
  const [phrases, setPhrases] = useState([]);
  const [emergencyData, setEmergencyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { t, highContrast } = useLanguage();

  useEffect(() => {
    async function loadData() {
      try {
        const [depts, blds, sched, protos, phrs, emerg] = await Promise.all([
          dataService.getDepartments(),
          dataService.getBuildings(),
          dataService.getOPDSchedule(),
          dataService.getSampleProtocols(),
          dataService.getHelpDeskPhrases(),
          dataService.getEmergencyGuidance()
        ]);
        setDepartments(depts);
        setBuildings(blds);
        setSchedule(sched);
        setProtocols(protos);
        setPhrases(phrs);
        setEmergencyData(emerg);
      } catch (err) {
        console.error("Error loading PGI Saathi data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sticky Header */}
      <Header onOpenEmergency={() => setIsEmergencyOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-500">
              Loading PGI Saathi directory...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'finder' && (
              <DepartmentFinder
                departments={departments}
                buildings={buildings}
                schedule={schedule}
              />
            )}
            {activeTab === 'buildings' && (
              <BuildingsGuide buildings={buildings} />
            )}
            {activeTab === 'checklist' && (
              <VisitChecklist />
            )}
            {activeTab === 'tests' && (
              <LabTestGuide protocols={protocols} />
            )}
            {activeTab === 'help' && (
              <HelpDeskPhrases phrases={phrases} />
            )}
          </>
        )}

        {/* Global Footer Disclaimer */}
        <footer className="mt-8 mb-20 text-center text-[11px] text-slate-400 px-4 leading-relaxed">
          <p>{t('disclaimer')}</p>
          <p className="mt-1 font-medium text-slate-500">
            PGI Saathi • Independent Open Source Project • 100% Serverless
          </p>
        </footer>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        emergencyData={emergencyData}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

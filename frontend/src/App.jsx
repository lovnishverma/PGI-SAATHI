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
import { GoldenRules } from './components/GoldenRules';
import { InstallPrompt } from './components/InstallPrompt';
import { dataService } from './services/dataService';

function MainApp() {
  const [activeTab, setActiveTab] = useState('finder');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [protocols, setProtocols] = useState([]);
  const [fourQuestions, setFourQuestions] = useState([]);
  const [phrases, setPhrases] = useState([]);
  const [goldenRules, setGoldenRules] = useState([]);
  const [cardProcess, setCardProcess] = useState(null);
  const [checklistItems, setChecklistItems] = useState([]);
  const [importantNumbers, setImportantNumbers] = useState([]);
  const [officialLinks, setOfficialLinks] = useState([]);
  const [lostAdvice, setLostAdvice] = useState('');
  const [emergencyData, setEmergencyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { t, highContrast } = useLanguage();

  useEffect(() => {
    async function loadData() {
      try {
        const [
          depts, blds, sched, protos, fourQs, phrs, rules, cardProc, items, numbers, links, advice, emerg
        ] = await Promise.all([
          dataService.getDepartments(),
          dataService.getBuildings(),
          dataService.getOPDSchedule(),
          dataService.getSampleProtocols(),
          dataService.getSampleFourQuestions(),
          dataService.getHelpDeskPhrases(),
          dataService.getGoldenRules(),
          dataService.getCardMakingProcess(),
          dataService.getChecklistItems(),
          dataService.getImportantNumbers(),
          dataService.getOfficialLinks(),
          dataService.getLostAdvice(),
          dataService.getEmergencyGuidance()
        ]);
        setDepartments(depts);
        setBuildings(blds);
        setSchedule(sched);
        setProtocols(protos);
        setFourQuestions(fourQs);
        setPhrases(phrs);
        setGoldenRules(rules);
        setCardProcess(cardProc);
        setChecklistItems(items);
        setImportantNumbers(numbers);
        setOfficialLinks(links);
        setLostAdvice(advice);
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
      <Header
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* PWA Offline Install Banner */}
      <InstallPrompt />

      {/* Main Container - Responsive Dual Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-500">
              Loading PGI Saathi directory...
            </p>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            {/* Desktop Left Rail: Golden rules and vital hospital orientation */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
              {goldenRules.length > 0 && (
                <GoldenRules
                  goldenRules={goldenRules}
                  cardProcess={cardProcess}
                  lostAdvice={lostAdvice}
                  defaultOpen={true}
                />
              )}
            </aside>

            {/* Main Content Area */}
            <section className="lg:col-span-8 space-y-4">
              {/* On mobile only, keep GoldenRules collapsible above tabs */}
              <div className="lg:hidden">
                {goldenRules.length > 0 && (
                  <GoldenRules
                    goldenRules={goldenRules}
                    cardProcess={cardProcess}
                    lostAdvice={lostAdvice}
                    defaultOpen={false}
                  />
                )}
              </div>

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
                <VisitChecklist checklistItems={checklistItems} />
              )}
              {activeTab === 'tests' && (
                <LabTestGuide protocols={protocols} fourQuestions={fourQuestions} />
              )}
              {activeTab === 'help' && (
                <HelpDeskPhrases
                  phrases={phrases}
                  numbers={importantNumbers}
                  officialLinks={officialLinks}
                />
              )}
            </section>
          </div>
        )}

        {/* Global Footer Disclaimer */}
        <footer className="mt-12 mb-20 md:mb-6 text-center text-[11px] text-slate-400 px-4 leading-relaxed border-t border-slate-200/60 pt-6">
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

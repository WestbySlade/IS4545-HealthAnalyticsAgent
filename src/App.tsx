import React, { useState, useMemo } from 'react';
import { PATIENT_FEEDBACK_DATASET } from './data/patientFeedbackData';
import {
  PatientFeedback,
  ServiceLine,
  VisitType,
  PatientPersona,
  SentimentType,
  BottleneckCategory
} from './types/healthcare';
import {
  computeExecutiveKPIs,
  computeSatisfactionDistribution
} from './utils/analytics';
import { ExecutiveHeader } from './components/ExecutiveHeader';
import { AgentConsultationBar } from './components/AgentConsultationBar';
import { Section1ExecutiveOverview } from './components/Section1ExecutiveOverview';
import { Section2SatisfactionInsights } from './components/Section2SatisfactionInsights';
import { Section3NLPAnalysis } from './components/Section3NLPAnalysis';
import { Section4HiddenProblems } from './components/Section4HiddenProblems';
import { Section6HealthcareEquity } from './components/Section6HealthcareEquity';
import { Section7AIRiskMonitoring } from './components/Section7AIRiskMonitoring';
import { Section8AIAgentOpportunities } from './components/Section8AIAgentOpportunities';
import { Section9ExecutiveRecommendations } from './components/Section9ExecutiveRecommendations';
import { ChiefAIOfficerSuite } from './components/ChiefAIOfficerSuite';
import { FeedbackExplorer } from './components/FeedbackExplorer';
import { UploadDatasetModal } from './components/UploadDatasetModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  // Active dataset state (starts with 160 rich records, can be replaced by user upload)
  const [dataset, setDataset] = useState<PatientFeedback[]>(PATIENT_FEEDBACK_DATASET);

  // Navigation & mode
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isCAIOMode, setIsCAIOMode] = useState<boolean>(false);

  // Filter state
  const [selectedServiceLine, setSelectedServiceLine] = useState<ServiceLine | null>(null);
  const [selectedVisitType, setSelectedVisitType] = useState<VisitType | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<PatientPersona | null>(null);
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType | null>(null);
  const [selectedBottleneck, setSelectedBottleneck] = useState<BottleneckCategory | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyRisks, setOnlyRisks] = useState<boolean>(false);

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Filtered dataset for visualizations and counts
  const filteredData = useMemo(() => {
    return dataset.filter((item) => {
      if (selectedServiceLine && item.serviceLine !== selectedServiceLine) return false;
      if (selectedVisitType && item.visitType !== selectedVisitType) return false;
      if (selectedPersona && item.persona !== selectedPersona) return false;
      if (selectedSentiment && item.sentiment !== selectedSentiment) return false;
      if (selectedBottleneck && item.bottleneckType !== selectedBottleneck) return false;
      if (selectedTheme && !item.themes.includes(selectedTheme)) return false;
      if (
        selectedKeyword &&
        !item.keywords.some((k) => k.toLowerCase().includes(selectedKeyword.toLowerCase())) &&
        !item.comment.toLowerCase().includes(selectedKeyword.toLowerCase())
      ) {
        return false;
      }
      if (
        onlyRisks &&
        !item.aiRisk.hallucinationTrap &&
        !item.aiRisk.biasRisk &&
        !item.aiRisk.requiresHumanReview
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesComment = item.comment.toLowerCase().includes(q);
        const matchesKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
        const matchesId = item.id.toLowerCase().includes(q);
        if (!matchesComment && !matchesKeywords && !matchesId) return false;
      }
      return true;
    });
  }, [
    dataset,
    selectedServiceLine,
    selectedVisitType,
    selectedPersona,
    selectedSentiment,
    selectedBottleneck,
    selectedTheme,
    selectedKeyword,
    onlyRisks,
    searchQuery
  ]);

  // Aggregated analytics metrics
  const metrics = useMemo(() => computeExecutiveKPIs(filteredData), [filteredData]);
  const distribution = useMemo(() => computeSatisfactionDistribution(filteredData), [filteredData]);

  // Handle dataset replacement from upload modal
  const handleDatasetLoaded = (newDataset: PatientFeedback[]) => {
    setDataset(newDataset);
    setSelectedServiceLine(null);
    setSelectedVisitType(null);
    setSelectedPersona(null);
    setSelectedSentiment(null);
    setSelectedBottleneck(null);
    setSelectedKeyword(null);
    setSelectedTheme(null);
    setSearchQuery('');
    setOnlyRisks(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Bar Contract Navigation */}
      <ExecutiveHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExport={() => setIsExportOpen(true)}
        onOpenUpload={() => setIsUploadOpen(true)}
        isCAIOMode={isCAIOMode}
        setIsCAIOMode={setIsCAIOMode}
        filteredCount={filteredData.length}
        totalCount={dataset.length}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Interactive Healthcare Analytics & CAIO Query Engine */}
        <AgentConsultationBar
          data={filteredData}
          metrics={metrics}
          onFilterServiceLine={(sl) => {
            setSelectedServiceLine(sl);
            setActiveTab('satisfaction');
          }}
          onFilterRisk={() => {
            setOnlyRisks(true);
            setActiveTab('risk');
          }}
        />

        {/* View Switching: CAIO Strategic Suite vs Modular Dashboard Tabs */}
        {isCAIOMode ? (
          <div className="space-y-8">
            <ChiefAIOfficerSuite
              data={filteredData}
              onOpenReportModal={() => setIsExportOpen(true)}
            />
            {/* Embedded Core Overview in CAIO Mode */}
            <Section1ExecutiveOverview
              metrics={metrics}
              onFilterSentiment={(s) => setSelectedSentiment(s)}
              activeSentimentFilter={selectedSentiment}
            />
            <Section8AIAgentOpportunities />
            <Section7AIRiskMonitoring data={filteredData} />
            <Section9ExecutiveRecommendations />
          </div>
        ) : (
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <>
                <Section1ExecutiveOverview
                  metrics={metrics}
                  onFilterSentiment={(s) => setSelectedSentiment(s)}
                  activeSentimentFilter={selectedSentiment}
                />
                <Section2SatisfactionInsights
                  data={filteredData}
                  distribution={distribution}
                  selectedServiceLine={selectedServiceLine}
                  setSelectedServiceLine={setSelectedServiceLine}
                  selectedVisitType={selectedVisitType}
                  setSelectedVisitType={setSelectedVisitType}
                  selectedPersona={selectedPersona}
                  setSelectedPersona={setSelectedPersona}
                />
              </>
            )}

            {activeTab === 'satisfaction' && (
              <Section2SatisfactionInsights
                data={filteredData}
                distribution={distribution}
                selectedServiceLine={selectedServiceLine}
                setSelectedServiceLine={setSelectedServiceLine}
                selectedVisitType={selectedVisitType}
                setSelectedVisitType={setSelectedVisitType}
                selectedPersona={selectedPersona}
                setSelectedPersona={setSelectedPersona}
              />
            )}

            {activeTab === 'nlp' && (
              <Section3NLPAnalysis
                data={filteredData}
                selectedKeyword={selectedKeyword}
                setSelectedKeyword={setSelectedKeyword}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
              />
            )}

            {activeTab === 'bottlenecks' && (
              <Section4HiddenProblems
                data={filteredData}
                onSelectBottleneck={(b) => setSelectedBottleneck(b)}
                selectedBottleneck={selectedBottleneck}
              />
            )}

            {activeTab === 'equity' && (
              <Section6HealthcareEquity
                data={filteredData}
                onSelectPersona={(p) => setSelectedPersona(p)}
                selectedPersona={selectedPersona}
              />
            )}

            {activeTab === 'risk' && (
              <Section7AIRiskMonitoring data={filteredData} />
            )}

            {activeTab === 'agents' && (
              <Section8AIAgentOpportunities />
            )}

            {activeTab === 'recommendations' && (
              <Section9ExecutiveRecommendations />
            )}

            {activeTab === 'explorer' && (
              <FeedbackExplorer
                data={dataset}
                selectedServiceLine={selectedServiceLine}
                setSelectedServiceLine={setSelectedServiceLine}
                selectedVisitType={selectedVisitType}
                setSelectedVisitType={setSelectedVisitType}
                selectedPersona={selectedPersona}
                setSelectedPersona={setSelectedPersona}
                selectedSentiment={selectedSentiment}
                setSelectedSentiment={setSelectedSentiment}
                selectedBottleneck={selectedBottleneck}
                setSelectedBottleneck={setSelectedBottleneck}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onlyRisks={onlyRisks}
                setOnlyRisks={setOnlyRisks}
              />
            )}
          </div>
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">AegisHealth Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Healthcare Analytics Agent & Chief AI Officer Executive Suite</span>
          </div>

          <div className="flex items-center gap-4">
            <span>HIPAA Safe Harbor De-identified</span>
            <span aria-hidden="true">·</span>
            <span>HCAHPS Standardized</span>
            <span aria-hidden="true">·</span>
            <span>FDA SaMD Risk Monitored</span>
          </div>
        </div>
      </footer>

      {/* Dataset Upload Modal */}
      <UploadDatasetModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDatasetLoaded={handleDatasetLoaded}
        currentCount={dataset.length}
      />

      {/* Executive Briefing Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        metrics={metrics}
        data={filteredData}
      />
    </div>
  );
}

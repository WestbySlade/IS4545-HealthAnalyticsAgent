import React, { useState, useMemo } from 'react';
import {
  PatientFeedback,
  ServiceLine,
  VisitType,
  PatientPersona,
  SentimentType,
  BottleneckCategory
} from '../types/healthcare';
import {
  Search,
  Filter,
  Download,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  ThumbsUp,
  ThumbsDown,
  Clock,
  ExternalLink
} from 'lucide-react';

interface FeedbackExplorerProps {
  data: PatientFeedback[];
  selectedServiceLine: ServiceLine | null;
  setSelectedServiceLine: (sl: ServiceLine | null) => void;
  selectedVisitType: VisitType | null;
  setSelectedVisitType: (vt: VisitType | null) => void;
  selectedPersona: PatientPersona | null;
  setSelectedPersona: (p: PatientPersona | null) => void;
  selectedSentiment: SentimentType | null;
  setSelectedSentiment: (s: SentimentType | null) => void;
  selectedBottleneck: BottleneckCategory | null;
  setSelectedBottleneck: (b: BottleneckCategory | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onlyRisks: boolean;
  setOnlyRisks: (val: boolean) => void;
}

export const FeedbackExplorer: React.FC<FeedbackExplorerProps> = ({
  data,
  selectedServiceLine,
  setSelectedServiceLine,
  selectedVisitType,
  setSelectedVisitType,
  selectedPersona,
  setSelectedPersona,
  selectedSentiment,
  setSelectedSentiment,
  selectedBottleneck,
  setSelectedBottleneck,
  searchQuery,
  setSearchQuery,
  onlyRisks,
  setOnlyRisks
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (selectedServiceLine && item.serviceLine !== selectedServiceLine) return false;
      if (selectedVisitType && item.visitType !== selectedVisitType) return false;
      if (selectedPersona && item.persona !== selectedPersona) return false;
      if (selectedSentiment && item.sentiment !== selectedSentiment) return false;
      if (selectedBottleneck && item.bottleneckType !== selectedBottleneck) return false;
      if (
        onlyRisks &&
        !item.aiRisk.hallucinationTrap &&
        !item.aiRisk.biasRisk &&
        !item.aiRisk.requiresHumanReview
      )
        return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesComment = item.comment.toLowerCase().includes(q);
        const matchesKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesRisk = item.aiRisk.riskNote.toLowerCase().includes(q);
        if (!matchesComment && !matchesKeywords && !matchesId && !matchesRisk) return false;
      }

      return true;
    });
  }, [
    data,
    selectedServiceLine,
    selectedVisitType,
    selectedPersona,
    selectedSentiment,
    selectedBottleneck,
    onlyRisks,
    searchQuery
  ]);

  // Export current filtered view to CSV
  const handleExportCSV = () => {
    const headers = [
      'FeedbackID',
      'Date',
      'ServiceLine',
      'VisitType',
      'Persona',
      'SatisfactionScore',
      'CommunicationRating',
      'WaitTimeMinutes',
      'Sentiment',
      'Bottleneck',
      'AI_RiskType',
      'Comment'
    ];

    const rows = filteredData.map((d) => [
      d.id,
      d.date,
      `"${d.serviceLine}"`,
      `"${d.visitType}"`,
      `"${d.persona}"`,
      d.satisfactionScore,
      d.communicationRating,
      d.waitTimeMinutes,
      d.sentiment,
      `"${d.bottleneckType}"`,
      `"${d.aiRisk.riskType}"`,
      `"${d.comment.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Patient_Feedback_Analysis_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasFiltersActive =
    !!selectedServiceLine ||
    !!selectedVisitType ||
    !!selectedPersona ||
    !!selectedSentiment ||
    !!selectedBottleneck ||
    onlyRisks ||
    !!searchQuery;

  const handleClearAll = () => {
    setSelectedServiceLine(null);
    setSelectedVisitType(null);
    setSelectedPersona(null);
    setSelectedSentiment(null);
    setSelectedBottleneck(null);
    setOnlyRisks(false);
    setSearchQuery('');
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>PATIENT FEEDBACK AUDIT REPOSITORY</span>
            <span aria-hidden="true">·</span>
            <span>Unstructured NLP & Verbatim Evidence</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Interactive Feedback Explorer
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Filtered CSV ({filteredData.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
        {/* Search input */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search comments by keyword (e.g. wait, nurse, interpreter, dosage, portal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            onClick={() => setOnlyRisks(!onlyRisks)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
              onlyRisks
                ? 'bg-rose-50 border-rose-300 text-rose-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>AI Risk Flagged Only</span>
          </button>

          {hasFiltersActive && (
            <button
              onClick={handleClearAll}
              className="text-xs text-slate-500 hover:text-slate-900 underline whitespace-nowrap px-2"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Filter Dropdowns Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 border-t border-slate-100 text-xs">
          {/* Service line */}
          <select
            value={selectedServiceLine || ''}
            onChange={(e) => setSelectedServiceLine((e.target.value as ServiceLine) || null)}
            className="p-1.5 border border-slate-200 rounded-md text-xs text-slate-700 bg-white"
          >
            <option value="">All Service Lines</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Oncology">Oncology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Neurology">Neurology</option>
            <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
            <option value="General Surgery">General Surgery</option>
          </select>

          {/* Visit Type */}
          <select
            value={selectedVisitType || ''}
            onChange={(e) => setSelectedVisitType((e.target.value as VisitType) || null)}
            className="p-1.5 border border-slate-200 rounded-md text-xs text-slate-700 bg-white"
          >
            <option value="">All Visit Types</option>
            <option value="Emergency">Emergency</option>
            <option value="Inpatient">Inpatient</option>
            <option value="Outpatient">Outpatient</option>
            <option value="Telehealth">Telehealth</option>
          </select>

          {/* Persona */}
          <select
            value={selectedPersona || ''}
            onChange={(e) => setSelectedPersona((e.target.value as PatientPersona) || null)}
            className="p-1.5 border border-slate-200 rounded-md text-xs text-slate-700 bg-white"
          >
            <option value="">All Personas</option>
            <option value="Senior Chronic Care (65+)">Senior Chronic Care</option>
            <option value="Tech-Savvy Young Adult">Tech-Savvy Young Adult</option>
            <option value="Non-English Preferred">Non-English Preferred</option>
            <option value="Working Parent">Working Parent</option>
            <option value="Vulnerable / Underinsured">Vulnerable / Underinsured</option>
          </select>

          {/* Sentiment */}
          <select
            value={selectedSentiment || ''}
            onChange={(e) => setSelectedSentiment((e.target.value as SentimentType) || null)}
            className="p-1.5 border border-slate-200 rounded-md text-xs text-slate-700 bg-white"
          >
            <option value="">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          {/* Bottleneck Category */}
          <select
            value={selectedBottleneck || ''}
            onChange={(e) => setSelectedBottleneck((e.target.value as BottleneckCategory) || null)}
            className="p-1.5 border border-slate-200 rounded-md text-xs text-slate-700 bg-white"
          >
            <option value="">All Bottlenecks</option>
            <option value="Wait Times">Wait Times</option>
            <option value="Communication Gap">Communication Gap</option>
            <option value="Tech Barrier">Tech Barrier</option>
            <option value="Scheduling Delay">Scheduling Delay</option>
            <option value="Discharge Hand-off">Discharge Hand-off</option>
          </select>
        </div>
      </div>

      {/* Results Count Strip */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900 font-mono tabular-nums">{filteredData.length}</strong> matching feedback records
        </span>
        <span>Click row to expand clinical risk context & governance actions</span>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/70">
                <th className="py-2.5 px-3 w-8"></th>
                <th className="py-2.5 px-3">ID & Date</th>
                <th className="py-2.5 px-3">Service Line</th>
                <th className="py-2.5 px-3">Setting</th>
                <th className="py-2.5 px-3">Persona</th>
                <th className="py-2.5 px-3 text-center">Score</th>
                <th className="py-2.5 px-3 text-right">Wait</th>
                <th className="py-2.5 px-3">Comment Preview</th>
                <th className="py-2.5 px-3">Risk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500">
                    No patient feedback records match your active search filters.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const isExpanded = expandedId === item.id;
                  const hasRisk =
                    item.aiRisk.hallucinationTrap ||
                    item.aiRisk.biasRisk ||
                    item.aiRisk.requiresHumanReview;

                  return (
                    <React.Fragment key={item.id}>
                      <tr
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className={`cursor-pointer transition-colors hover:bg-slate-50/80 ${
                          isExpanded ? 'bg-slate-50' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3 text-slate-400">
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="font-mono font-bold text-slate-900 block">{item.id}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-800 whitespace-nowrap">
                          {item.serviceLine}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                          {item.visitType}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                          {item.persona}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`font-mono font-bold px-1.5 py-0.5 rounded text-[11px] ${
                              item.satisfactionScore >= 4
                                ? 'bg-emerald-50 text-emerald-800'
                                : item.satisfactionScore >= 3
                                ? 'bg-amber-50 text-amber-800'
                                : 'bg-rose-50 text-rose-800'
                            }`}
                          >
                            {item.satisfactionScore} ★
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700 whitespace-nowrap">
                          {item.waitTimeMinutes}m
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 max-w-xs truncate">
                          {item.comment}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {hasRisk ? (
                            <span className="text-[11px] font-semibold text-rose-700 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span>{item.aiRisk.riskType}</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Nominal</span>
                          )}
                        </td>
                      </tr>

                      {/* Expandable Drilldown Row */}
                      {isExpanded && (
                        <tr className="bg-slate-50/70">
                          <td colSpan={9} className="p-4 border-b border-slate-200">
                            <div className="space-y-3 max-w-5xl">
                              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed">
                                <span className="font-bold text-slate-900 block mb-1">
                                  Full Verbatim Patient Comment:
                                </span>
                                "{item.comment}"
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                                  <span className="font-semibold text-slate-900 block">Extracted NLP Themes & Keywords:</span>
                                  <div className="flex flex-wrap gap-1.5 pt-1">
                                    {item.themes.map((th) => (
                                      <span key={th} className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 text-[11px]">
                                        {th}
                                      </span>
                                    ))}
                                    {item.keywords.map((kw) => (
                                      <span key={kw} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[11px]">
                                        #{kw}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                                  <span className="font-semibold text-slate-900 block">Identified Friction Bottleneck:</span>
                                  <div className="text-slate-700 text-xs">
                                    Primary: <strong className="text-slate-900">{item.bottleneckType}</strong>
                                    {item.equityConcerns.length > 0 && (
                                      <span className="block mt-1 text-rose-700 font-medium">
                                        Equity Concerns: {item.equityConcerns.join(', ')}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {hasRisk && (
                                <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-xs space-y-1.5">
                                  <div className="flex items-center gap-2 text-amber-900 font-bold">
                                    <ShieldAlert className="w-4 h-4 text-amber-700" />
                                    <span>Clinical AI Governance Audit: {item.aiRisk.riskType}</span>
                                  </div>
                                  <p className="text-slate-700">
                                    <strong>Risk Assessment:</strong> {item.aiRisk.riskNote}
                                  </p>
                                  <p className="text-slate-700">
                                    <strong>Governance Directive:</strong> {item.aiRisk.governanceAction}
                                  </p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

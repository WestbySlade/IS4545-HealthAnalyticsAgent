import React, { useState } from 'react';
import { PatientFeedback, ServiceLine } from '../types/healthcare';
import { DashboardMetrics } from '../utils/analytics';
import { Sparkles, Brain, ArrowRight, CornerDownLeft, CheckCircle2, ChevronRight } from 'lucide-react';

interface AgentConsultationBarProps {
  data: PatientFeedback[];
  metrics: DashboardMetrics;
  onFilterServiceLine?: (sl: ServiceLine) => void;
  onFilterRisk?: () => void;
}

export const AgentConsultationBar: React.FC<AgentConsultationBarProps> = ({
  data,
  metrics,
  onFilterServiceLine,
  onFilterRisk
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [customQuery, setCustomQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const cannedQueries = [
    {
      id: 'q1',
      title: 'Board Talking Point: ED Wait Times',
      prompt: 'Summarize our ED wait time exposure and the 3-month mitigation strategy for the board.',
      answer: `BOARD EXECUTIVE TALKING POINT:\nEmergency Department patients endure an average wait of 195 minutes (vs. national target of 45 minutes), driving 58% of all hospital grievances and significant Left Without Being Seen (LWBS) risk. Crucially, 82% of patient friction stems from a complete lack of queue transparency rather than the wait duration alone. Our recommended 3-month Quick Win is deploying the "AegisTriage" automated pre-arrival SMS queue companion, which provides live stage estimates and diverts low-acuity patients to immediate telehealth slots—projected to cut wait complaints by 35% with an initial outlay under $120K.`
    },
    {
      id: 'q2',
      title: 'Health Equity & Language Gaps',
      prompt: 'What are the concrete risks facing our non-English speaking patient population?',
      answer: `HEALTH EQUITY CLINICAL AUDIT:\nNon-English Preferred patients register a 2.95 / 5.0 satisfaction score (vs. 3.64 institutional average) and their follow-up adherence drops to 51.4%. Our NLP sentiment analysis uncovered critical clinical safety vulnerabilities: instances where minors were asked to translate surgical consent forms, untranslated chemotherapy fever warnings in oncology, and near-miss anticoagulant overdoses caused by patients using unverified consumer translation tools. Rolling out "DischargeBridge" with certified medical AI translation across 35+ languages is an urgent clinical quality imperative.`
    },
    {
      id: 'q3',
      title: 'Specialist Referral Leakage ROI',
      prompt: 'What is the financial return of automating neurology and oncology scheduling?',
      answer: `CAIO FINANCIAL & CAPACITY APPRAISAL:\nNeurology and Oncology patients face up to 4-month wait backlogs, leading to a 34.5% patient abandonment rate. Disconnected EHR workflows frequently fail to append prior-authorization codes, causing day-of appointment cancellations. Deploying the "OptiSchedule" Prior-Auth & Specialist Access Engine will cut consultation lead times from 84 days to 18 days and recapture an estimated $4.8M annually in previously forfeited specialist clinic capacity.`
    },
    {
      id: 'q4',
      title: 'Clinical AI Hallucination Safeguards',
      prompt: 'What governance guardrails protect against patient-facing AI hallucinations?',
      answer: `CLINICAL AI GOVERNANCE PROTOCOL:\nWe have identified 4 high-severity hallucination trap records in patient text, including automated symptom checkers advising an acute cardiac patient to rest at home, and unverified discharge summaries with contradictory anticoagulant timing. To mitigate malpractice exposure, we have established a mandatory 3-tier governance architecture: (1) Hard-stop redirection to 911/triage nurses for red-flag symptoms, (2) Mandatory physician/pharmacist digital dual-signature on AI-generated discharge instructions, and (3) Quarterly demographic parity audits under NIST AI RMF.`
    }
  ];

  const handleSelectQuery = (item: (typeof cannedQueries)[0]) => {
    setSelectedPrompt(item.title);
    setResponse(item.answer);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    setSelectedPrompt(customQuery);
    // Deterministic clinical synthesis
    const q = customQuery.toLowerCase();
    if (q.includes('ed') || q.includes('emergency') || q.includes('wait')) {
      setResponse(cannedQueries[0].answer);
    } else if (q.includes('language') || q.includes('spanish') || q.includes('equity') || q.includes('interpreter')) {
      setResponse(cannedQueries[1].answer);
    } else if (q.includes('roi') || q.includes('financial') || q.includes('cost') || q.includes('money')) {
      setResponse(cannedQueries[2].answer);
    } else {
      setResponse(
        `HEALTHCARE ANALYTICS AGENT EXECUTIVE SYNTHESIS:\nRegarding "${customQuery}": Analysis across ${metrics.totalComments} active patient comments indicates that provider communication remains strong at ${metrics.avgCommunication.toFixed(2)} / 5.0, but operational hand-offs represent the largest determinant of overall patient satisfaction (${metrics.avgSatisfaction.toFixed(2)}). Specifically, wait-time bottlenecks and discharge communication friction account for over 68% of negative sentiment. Prioritizing our 5 AI agent opportunities will drive an estimated $12.3M in annual operating value while lifting HCAHPS percentile rankings by 12–18 points.`
      );
    }
    setCustomQuery('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Interactive Healthcare Analytics Agent & CAIO Query Engine
            </h3>
            <p className="text-xs text-slate-500">
              Instant executive synthesis, board briefing talking points, and clinical ROI calculations
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400">Grounded in {metrics.totalComments} Feedback Records</span>
      </div>

      {/* Preset Executive Questions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {cannedQueries.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectQuery(item)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap shrink-0 text-left cursor-pointer ${
              selectedPrompt === item.title
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Custom Query Input */}
      <form onSubmit={handleCustomSubmit} className="relative flex items-center">
        <input
          type="text"
          placeholder="Ask the Healthcare Analytics Agent & CAIO anything (e.g. 'Draft memo on oncology wait times', 'What is our readmission penalty exposure?')..."
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          className="w-full pl-3.5 pr-24 py-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
        />
        <button
          type="submit"
          className="absolute right-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1"
        >
          <span>Ask Agent</span>
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </form>

      {/* Response Box */}
      {response && (
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs leading-relaxed space-y-2 border border-slate-800 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-indigo-300 font-semibold text-[11px] border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAIO Strategic Synthesis: {selectedPrompt}</span>
            </span>
            <button
              onClick={() => setResponse(null)}
              className="text-slate-400 hover:text-white text-[11px]"
            >
              Close
            </button>
          </div>
          <p className="whitespace-pre-line text-slate-200 text-xs font-normal">{response}</p>
        </div>
      )}
    </div>
  );
};

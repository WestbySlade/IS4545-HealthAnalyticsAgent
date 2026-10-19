import React, { useState } from 'react';
import { PatientFeedback } from '../types/healthcare';
import { CAIO_STRATEGIC_PILLARS, AI_AGENT_RECOMMENDATIONS } from '../data/patientFeedbackData';
import {
  Brain,
  Layers,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Crosshair,
  FileText
} from 'lucide-react';

interface ChiefAIOfficerSuiteProps {
  data: PatientFeedback[];
  onOpenReportModal: () => void;
}

export const ChiefAIOfficerSuite: React.FC<ChiefAIOfficerSuiteProps> = ({
  data,
  onOpenReportModal
}) => {
  const [expandedPillar, setExpandedPillar] = useState<number>(1);
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null);

  // 2x2 Prioritization Matrix Data (Impact vs Feasibility/Effort)
  const matrixItems = [
    {
      id: 'm1',
      title: 'Multilingual AI Discharge Paperwork (DischargeBridge)',
      impact: 'High',
      effort: 'Low (Quick Win)',
      quadrant: 'Quick Wins',
      roi: '$2.1M / yr',
      clinicalRisk: 'Near-miss overdose prevention'
    },
    {
      id: 'm2',
      title: 'ED Triage Queue Companion & Transparency (AegisTriage)',
      impact: 'High',
      effort: 'Low (Quick Win)',
      quadrant: 'Quick Wins',
      roi: '$1.4M / yr',
      clinicalRisk: 'LWBS reduction'
    },
    {
      id: 'm3',
      title: 'Ambient Clinical Documentation (EchoScribe)',
      impact: 'High',
      effort: 'Medium (3–6 Mo)',
      quadrant: 'Strategic Pillars',
      roi: '$3.2M / yr',
      clinicalRisk: 'Physician burnout & note accuracy'
    },
    {
      id: 'm4',
      title: 'Autonomous Prior-Auth & Capacity Scheduling (OptiSchedule)',
      impact: 'High',
      effort: 'High (6–12 Mo)',
      quadrant: 'Transformative',
      roi: '$4.8M / yr',
      clinicalRisk: 'Specialist referral abandonment'
    },
    {
      id: 'm5',
      title: 'Proactive Outbound Recovery Copilot (CareSync)',
      impact: 'Medium',
      effort: 'Medium (3–6 Mo)',
      quadrant: 'Strategic Pillars',
      roi: '$850K / yr',
      clinicalRisk: 'Readmission & medication compliance'
    },
    {
      id: 'm6',
      title: 'Patient Portal Chatbot for General FAQs',
      impact: 'Low',
      effort: 'Low',
      quadrant: 'Tactical',
      roi: '$150K / yr',
      clinicalRisk: 'Hallucination liability (Requires Guardrails)'
    }
  ];

  return (
    <section className="space-y-6">
      {/* Executive CAIO Header Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-2">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>OFFICE OF THE CHIEF AI OFFICER</span>
            <span aria-hidden="true">·</span>
            <span>CLINICAL AI TRANSFORMATION DOCTRINE</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Chief AI Officer Strategic Transformation Suite
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Synthesizing clinical feedback into enterprise AI architecture, prioritizing high-yield generative agents, and enforcing stringent algorithmic governance across hospital operations.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shrink-0 shadow-xs"
        >
          <FileText className="w-4 h-4" />
          <span>Generate CAIO Board Memorandum</span>
        </button>
      </div>

      {/* The 5 Foundational Strategic Questions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            The 5 Foundational Questions Answered for Hospital Leadership
          </h3>
          <span className="text-xs text-slate-500">Click any question to view executive drill-down</span>
        </div>

        <div className="space-y-3">
          {CAIO_STRATEGIC_PILLARS.map((pillar) => {
            const isExpanded = expandedPillar === pillar.questionNumber;

            return (
              <div
                key={pillar.questionNumber}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setExpandedPillar(isExpanded ? 0 : pillar.questionNumber)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-900 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      Q{pillar.questionNumber}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {pillar.question}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 bg-slate-50/50">
                    <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
                      <strong className="text-slate-900 block mb-1">Executive Summary:</strong>
                      {pillar.executiveSummary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {pillar.keyMetrics.map((km, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200">
                          <span className="text-[11px] text-slate-500 block">{km.label}</span>
                          <span className="text-base font-bold font-mono tabular-nums text-slate-900 block mt-0.5">
                            {km.value}
                          </span>
                          {km.trend && (
                            <span className="text-[11px] text-indigo-700 font-medium">{km.trend}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1.5">
                      <span className="text-xs font-bold text-slate-900 block">
                        CAIO Prescribed Action Plan:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                        {pillar.actionPlan.map((action, idx) => (
                          <li key={idx}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Opportunity & Prioritization Matrix (Impact vs Effort 2x2) */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              AI Opportunity & Value Prioritization Matrix (Impact vs. Feasibility)
            </h3>
            <p className="text-xs text-slate-500">
              Evaluation of enterprise agent initiatives by financial ROI, clinical safety, and execution complexity
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Total Pipeline:</span>
            <span className="font-mono font-bold text-slate-900">$12.3M Estimated ROI</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Quadrant 1: High Impact / Low Effort (Quick Wins) */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                Quadrant I: High Impact / Low Effort (Deploy Immediately)
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                Q1 Priority
              </span>
            </div>

            {matrixItems
              .filter((m) => m.quadrant === 'Quick Wins')
              .map((item) => (
                <div key={item.id} className="p-3 rounded-lg bg-white border border-emerald-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                    <span className="text-xs font-mono font-bold text-emerald-700 tabular-nums">{item.roi}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Target: {item.clinicalRisk}</span>
                    <span className="text-emerald-800 font-medium">{item.effort}</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Quadrant 2: High Impact / Higher Effort (Strategic Transformation) */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-700" />
                Quadrant II: High Impact / Multi-Month Scale (Strategic)
              </span>
              <span className="text-[10px] bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-full font-bold">
                Q2–Q4 Scale
              </span>
            </div>

            {matrixItems
              .filter((m) => m.quadrant === 'Strategic Pillars' || m.quadrant === 'Transformative')
              .map((item) => (
                <div key={item.id} className="p-3 rounded-lg bg-white border border-indigo-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                    <span className="text-xs font-mono font-bold text-indigo-700 tabular-nums">{item.roi}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Target: {item.clinicalRisk}</span>
                    <span className="text-indigo-800 font-medium">{item.effort}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* AI Risk & Governance Matrix */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Institutional AI Risk & Governance Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Regulatory compliance guardrails and mandatory audit controls
            </p>
          </div>
          <span className="text-xs text-slate-500">FDA SaMD Tier II Aligned</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                <th className="py-2.5 px-3">AI Application Domain</th>
                <th className="py-2.5 px-3">Primary Risk Vector</th>
                <th className="py-2.5 px-3">Regulatory Standard</th>
                <th className="py-2.5 px-3">Human-in-the-Loop Protocol</th>
                <th className="py-2.5 px-3">Audit Frequency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Patient Triage Chatbot</td>
                <td className="py-2.5 px-3 text-slate-700">Hallucination; under-triage of cardiac/stroke symptoms</td>
                <td className="py-2.5 px-3 font-mono text-slate-600">FDA SaMD / 21 CFR</td>
                <td className="py-2.5 px-3 text-slate-700">100% hard-stop redirect to 911/Nurse for red-flag symptoms</td>
                <td className="py-2.5 px-3 text-slate-500">Continuous Real-time</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Multilingual Discharge Summaries</td>
                <td className="py-2.5 px-3 text-slate-700">Incorrect dosage translation; missing allergy warnings</td>
                <td className="py-2.5 px-3 font-mono text-slate-600">HHS Section 1557</td>
                <td className="py-2.5 px-3 text-slate-700">Attending nurse/pharmacist digital sign-off before printing</td>
                <td className="py-2.5 px-3 text-slate-500">Weekly Random Sample</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Ambient Clinical Documentation</td>
                <td className="py-2.5 px-3 text-slate-700">Omission of negative findings; diagnostic hallucination</td>
                <td className="py-2.5 px-3 font-mono text-slate-600">HIPAA Security Rule</td>
                <td className="py-2.5 px-3 text-slate-700">Treating physician mandatory review & chart signature</td>
                <td className="py-2.5 px-3 text-slate-500">Monthly Peer Audit</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Capacity & Scheduling Optimizer</td>
                <td className="py-2.5 px-3 text-slate-700">Algorithmic demographic bias against Medicaid patients</td>
                <td className="py-2.5 px-3 font-mono text-slate-600">Title VI Civil Rights</td>
                <td className="py-2.5 px-3 text-slate-700">Clinical appeals review for denied appointment slots</td>
                <td className="py-2.5 px-3 text-slate-500">Quarterly Demographic Parity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

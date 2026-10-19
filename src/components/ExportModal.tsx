import React from 'react';
import { DashboardMetrics } from '../utils/analytics';
import { PatientFeedback } from '../types/healthcare';
import {
  EXECUTIVE_PRIORITIES,
  AI_AGENT_RECOMMENDATIONS,
  CAIO_STRATEGIC_PILLARS
} from '../data/patientFeedbackData';
import { X, Printer, Download, FileText, CheckCircle2 } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: DashboardMetrics;
  data: PatientFeedback[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  metrics,
  data
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 p-8 space-y-6 shadow-2xl border border-slate-200 print:m-0 print:p-0 print:border-none print:shadow-none">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Executive Board Briefing & CAIO Transformation Memorandum
              </h3>
              <p className="text-xs text-slate-500">
                Print-ready executive summary for Hospital Board of Directors and Executive Committee
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Executive Memorandum Content */}
        <div className="space-y-6 text-slate-900 print:space-y-4">
          {/* Header block */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold tracking-wider uppercase text-slate-900">
                AegisHealth System · Office of the Chief AI Officer
              </span>
              <span>Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Executive Memorandum: Patient Feedback Analytics & AI Transformation Strategy
            </h1>
            <div className="mt-2 text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>Prepared for:</strong> Chief Executive Officer & Board Quality Committee</span>
              <span><strong>Author:</strong> Chief AI Officer & Lead Healthcare Analytics Agent</span>
              <span><strong>Scope:</strong> {metrics.totalComments} Patient Encounters across 8 Service Lines</span>
            </div>
          </div>

          {/* Section 1: Executive KPI Strip */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              1. Core Healthcare Operational Indicators
            </h2>
            <div className="grid grid-cols-5 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Analyzed Feedback</span>
                <span className="text-lg font-bold font-mono text-slate-900">{metrics.totalComments}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Mean Satisfaction</span>
                <span className="text-lg font-bold font-mono text-slate-900">{metrics.avgSatisfaction.toFixed(2)} / 5.0</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Communication</span>
                <span className="text-lg font-bold font-mono text-slate-900">{metrics.avgCommunication.toFixed(2)} / 5.0</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Follow-Up Adherence</span>
                <span className="text-lg font-bold font-mono text-slate-900">{metrics.followUpComplianceRate}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Average Wait Time</span>
                <span className="text-lg font-bold font-mono text-slate-900">{metrics.avgWaitTime} mins</span>
              </div>
            </div>
          </div>

          {/* Section 2: Executive Synthesis */}
          <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Executive Synthesis & Root Cause Assessment
            </h2>
            <p>
              Frontline clinical staff and bedside nurses maintain strong interpersonal ratings (communication rating <strong className="text-slate-900">{metrics.avgCommunication.toFixed(2)} / 5.0</strong>). However, institutional satisfaction is degraded by severe structural transitions:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-800">
              <li>
                <strong>Emergency Department Wait Spikes:</strong> Emergency patients endure average wait times exceeding 195 minutes with high LWBS (Left Without Being Seen) vulnerability driven by triage queue opacity.
              </li>
              <li>
                <strong>Discharge Hand-off & Health Equity Gaps:</strong> Non-English preferred and geriatric patients suffer near-miss adverse events due to default English 9pt discharge paperwork and a shortage of certified interpreters.
              </li>
              <li>
                <strong>Specialist Scheduling Backlogs:</strong> Neurology and Oncology appointments face 4-month wait backlogs caused by disconnected EHR referral and prior-authorization failures.
              </li>
            </ul>
          </div>

          {/* Section 3: Recommended AI Agents */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              3. Recommended Clinical & Operational AI Agent Portfolio
            </h2>
            <div className="space-y-2 text-xs">
              {AI_AGENT_RECOMMENDATIONS.slice(0, 3).map((agent) => (
                <div key={agent.id} className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{agent.name} ({agent.acronym})</span>
                    <span className="font-mono text-emerald-700 font-bold">{agent.estimatedCostReduction}</span>
                  </div>
                  <p className="text-slate-600 mt-1">{agent.purpose}</p>
                  <div className="mt-1.5 text-[11px] text-slate-500">
                    <strong>Human Safeguard:</strong> {agent.humanInLoopProtocol}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Top 5 Organizational Priorities */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              4. Immediate Actionable Executive Priorities
            </h2>
            <div className="space-y-1.5 text-xs">
              {EXECUTIVE_PRIORITIES.map((p) => (
                <div key={p.rank} className="flex items-start gap-2.5">
                  <span className="font-mono font-bold text-slate-900 shrink-0">0{p.rank}.</span>
                  <div>
                    <strong className="text-slate-900">{p.title}</strong>{' '}
                    <span className="text-slate-500">({p.timeframe})</span>
                    <p className="text-slate-600 text-[11px]">{p.expectedOutcome} · Lead: {p.leadOwner}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Sign-Off Footer */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-slate-500">
            <div>
              <div className="border-b border-slate-300 pb-6 mb-1"></div>
              <span className="font-semibold text-slate-700 block">Chief AI Officer</span>
              <span>AegisHealth Clinical AI Governance</span>
            </div>
            <div>
              <div className="border-b border-slate-300 pb-6 mb-1"></div>
              <span className="font-semibold text-slate-700 block">Chief Medical Officer</span>
              <span>Clinical Safety & Quality Committee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

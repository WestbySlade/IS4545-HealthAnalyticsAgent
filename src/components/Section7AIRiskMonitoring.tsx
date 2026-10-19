import React, { useState } from 'react';
import { PatientFeedback } from '../types/healthcare';
import {
  ShieldAlert,
  AlertTriangle,
  Scale,
  UserCheck,
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';

interface Section7AIRiskMonitoringProps {
  data: PatientFeedback[];
}

export const Section7AIRiskMonitoring: React.FC<Section7AIRiskMonitoringProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'hallucinations' | 'bias' | 'humanReview'>('hallucinations');
  const [reviewedCases, setReviewedCases] = useState<string[]>([]);

  const hallucinationComments = data.filter((d) => d.aiRisk.hallucinationTrap);
  const biasComments = data.filter((d) => d.aiRisk.biasRisk);
  const humanReviewComments = data.filter((d) => d.aiRisk.requiresHumanReview);

  const toggleReviewStatus = (id: string) => {
    if (reviewedCases.includes(id)) {
      setReviewedCases(reviewedCases.filter((item) => item !== id));
    } else {
      setReviewedCases([...reviewedCases, id]);
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>SECTION 07</span>
            <span aria-hidden="true">·</span>
            <span>Clinical AI Safety, Governance & Malpractice Mitigation</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            AI Risk Monitoring & Clinical Safety Oversight
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span className="font-semibold">NIST AI RMF & FDA SaMD Monitored</span>
        </div>
      </div>

      {/* KPI Ticker for Risks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('hallucinations')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'hallucinations'
              ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Hallucination Traps
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {hallucinationComments.length} Flagged
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Conflicting dosages, false reassure triage, translation errors
          </p>
        </button>

        <button
          onClick={() => setActiveTab('bias')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'bias'
              ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-800">
              Demographic Bias
            </span>
            <Scale className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {biasComments.length} Flagged
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pain under-triage, Medicaid bias, language exclusion
          </p>
        </button>

        <button
          onClick={() => setActiveTab('humanReview')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'humanReview'
              ? 'bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-800">
              Human Review Queue
            </span>
            <UserCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {humanReviewComments.length} Pending
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Mandatory clinical risk committee & safety adjudication
          </p>
        </button>
      </div>

      {/* Main Content Area based on Selected Tab */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {activeTab === 'hallucinations' && '1. Hallucination Trap Patient Comments'}
              {activeTab === 'bias' && '2. Demographic & Clinical Bias Incident Comments'}
              {activeTab === 'humanReview' && '3. Critical Incidents Requiring Human Clinical Review'}
            </h3>
            <p className="text-xs text-slate-500">
              {activeTab === 'hallucinations' &&
                'Cases where automated AI/chatbots or translation engines generated erroneous or contradictory care guidance.'}
              {activeTab === 'bias' &&
                'Cases indicating disparate treatment, pain dismissal, or institutional bias against vulnerable groups.'}
              {activeTab === 'humanReview' &&
                'Adverse events, patient left without being seen (LWBS), and legal/regulatory compliance escalations.'}
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Active Records:{' '}
            <span className="font-mono tabular-nums font-semibold text-slate-700">
              {activeTab === 'hallucinations'
                ? hallucinationComments.length
                : activeTab === 'bias'
                ? biasComments.length
                : humanReviewComments.length}
            </span>
          </span>
        </div>

        {/* List of Flagged Records */}
        <div className="space-y-3">
          {(activeTab === 'hallucinations'
            ? hallucinationComments
            : activeTab === 'bias'
            ? biasComments
            : humanReviewComments
          ).map((item) => {
            const isResolved = reviewedCases.includes(item.id);

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  isResolved
                    ? 'bg-slate-50/60 border-slate-200 opacity-75'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">{item.id}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-xs font-semibold text-slate-700">{item.serviceLine}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500">{item.persona}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm">
                      {item.aiRisk.riskType}
                    </span>
                    <button
                      onClick={() => toggleReviewStatus(item.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {isResolved ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Adjudicated</span>
                        </>
                      ) : (
                        <span>Mark Reviewed</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Verbatim quote */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-800 leading-relaxed mb-3">
                  "{item.comment}"
                </div>

                {/* Risk and Governance notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-amber-50/40 p-3 rounded-lg border border-amber-100">
                  <div>
                    <span className="font-semibold text-amber-900 block mb-0.5">Clinical Risk Assessment:</span>
                    <p className="text-slate-700">{item.aiRisk.riskNote}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-indigo-900 block mb-0.5">Mandatory Governance Action:</span>
                    <p className="text-slate-700">{item.aiRisk.governanceAction}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Governance Charter Strip */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Clinical AI Risk Mitigation Architecture
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">1. Hard-Stop Red Flagging</span>
            Any conversational bot must instantly transfer chest pain, acute dyspnea, and suicidal ideation to 911 / emergency triage desk with zero LLM medical advice generation.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">2. Pharmacist Verification Gate</span>
            All AI-simplified discharge medication summaries must have electronic dual-signature approval from attending nurse or pharmacist before patient delivery.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">3. Algorithmic Bias Auditing</span>
            Quarterly statistical parity tests across age, race, and insurance status to ensure triage recommendation times and pain intervention recommendations show zero demographic skew.
          </div>
        </div>
      </div>
    </section>
  );
};

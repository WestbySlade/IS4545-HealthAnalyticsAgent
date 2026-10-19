import React, { useState } from 'react';
import { AI_AGENT_RECOMMENDATIONS } from '../data/patientFeedbackData';
import { AIAgentRecommendation } from '../types/healthcare';
import { Bot, Shield, CheckCircle2, TrendingUp, DollarSign, Sparkles, Layers } from 'lucide-react';

export const Section8AIAgentOpportunities: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgentRecommendation>(AI_AGENT_RECOMMENDATIONS[0]);
  const [bedsCapacity, setBedsCapacity] = useState<number>(450);

  // Dynamic ROI calculation based on hospital bed size
  const scaleFactor = bedsCapacity / 450;
  const estimatedAnnualSavings = (12.3 * scaleFactor).toFixed(1);
  const estimatedReadmissionsAvoided = Math.round(184 * scaleFactor);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>SECTION 08</span>
            <span aria-hidden="true">·</span>
            <span>Agentic AI System Architecture & Opportunity Pipeline</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Healthcare AI Agent Opportunities
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200">
          <Bot className="w-3.5 h-3.5" />
          <span className="font-semibold">5 Tailored Clinical & Operational Agents</span>
        </div>
      </div>

      {/* Interactive Value Realization Simulator Bar */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Agent Portfolio ROI Simulator</h3>
            <p className="text-xs text-slate-500">
              Scale enterprise impact based on licensed acute and specialty inpatient bed capacity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-700">Health System Size:</span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="150"
                max="1200"
                step="50"
                value={bedsCapacity}
                onChange={(e) => setBedsCapacity(Number(e.target.value))}
                className="w-32 accent-slate-900 cursor-pointer"
              />
              <span className="font-mono tabular-nums text-xs font-bold text-slate-900 w-16">
                {bedsCapacity} Beds
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">
              Projected Annual Value Creation
            </span>
            <div className="text-2xl font-bold font-mono tabular-nums text-emerald-700 mt-0.5">
              ${estimatedAnnualSavings}M / year
            </div>
            <span className="text-[11px] text-slate-500">Operating margin & capacity recapture</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">
              Preventable Readmissions Avoided
            </span>
            <div className="text-2xl font-bold font-mono tabular-nums text-indigo-700 mt-0.5">
              ~{estimatedReadmissionsAvoided} Cases / yr
            </div>
            <span className="text-[11px] text-slate-500">Via DischargeBridge & CareSync</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">
              Physician Documentation Time Saved
            </span>
            <div className="text-2xl font-bold font-mono tabular-nums text-sky-700 mt-0.5">
              1.8 Hours / Clinician / Day
            </div>
            <span className="text-[11px] text-slate-500">Via EchoScribe ambient SOAP notes</span>
          </div>
        </div>
      </div>

      {/* Grid: Agent selector tabs on left, deep specification on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
            Recommended AI Agent Portfolio
          </span>
          {AI_AGENT_RECOMMENDATIONS.map((agent) => {
            const isSelected = selectedAgent.id === agent.id;

            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-slate-900">{agent.acronym}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                    {agent.timeframe}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">{agent.name}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">{agent.targetFriction}</p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-700 font-semibold">{agent.estimatedCostReduction}</span>
                  <span className="text-slate-400">{agent.clinicalDomain.split('&')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Agent Specification Card */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs lg:col-span-2 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                  {selectedAgent.acronym}
                </span>
                <span className="text-xs text-slate-500 font-medium">{selectedAgent.clinicalDomain}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{selectedAgent.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Deployment Horizon</span>
              <span className="text-xs font-bold text-indigo-900">{selectedAgent.timeframe}</span>
            </div>
          </div>

          {/* Section: Purpose */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Agent Purpose</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              {selectedAgent.purpose}
            </p>
          </div>

          {/* Section: Expected Organizational Impact */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Expected Organizational Impact & ROI
            </h4>
            <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-sm text-slate-800 space-y-2">
              <p className="font-medium text-emerald-900">{selectedAgent.expectedImpact}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1 border-t border-emerald-200/60">
                <span className="text-slate-700">
                  Direct Cost Impact: <strong className="text-emerald-800">{selectedAgent.estimatedCostReduction}</strong>
                </span>
                <span className="text-slate-700">
                  HCAHPS Domain Lift: <strong className="text-emerald-800">{selectedAgent.hcahpsLiftEstimate}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Section: Target Friction & Human in the Loop Protocol */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                Target Friction in Feedback
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedAgent.targetFriction}</p>
            </div>

            <div className="p-4 rounded-lg bg-indigo-50/50 border border-indigo-100 space-y-1.5">
              <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                Human-in-the-Loop Safeguard
              </span>
              <p className="text-xs text-indigo-900 leading-relaxed">{selectedAgent.humanInLoopProtocol}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

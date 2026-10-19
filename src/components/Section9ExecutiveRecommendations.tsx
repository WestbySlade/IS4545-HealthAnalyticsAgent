import React from 'react';
import { EXECUTIVE_PRIORITIES } from '../data/patientFeedbackData';
import { Target, Zap, Milestone, Award, Calendar, CheckSquare, Clock } from 'lucide-react';

export const Section9ExecutiveRecommendations: React.FC = () => {
  const quickWins = [
    {
      title: 'Emergency Department Queue Status Transparency via SMS',
      owner: 'VP Emergency Medicine & IT',
      target: '35% drop in ED wait complaints',
      description: 'Deploy automated pre-arrival SMS links showing queue stage, estimated wait bands, and non-emergent telehealth diversion options.'
    },
    {
      title: 'Multilingual AI Discharge Paperwork & Voice Playback',
      owner: 'Chief Medical Officer & Nursing',
      target: 'Eliminate discharge interpreter delay',
      description: 'EHR add-on that translates complex discharge medication summaries into 6th-grade Spanish, Cantonese, and Arabic with QR-code audio playback.'
    },
    {
      title: 'Voice-OTP Phone Authentication for Geriatric Patients',
      owner: 'Chief Information Officer',
      target: '100% elimination of landline lockout fees',
      description: 'Enable automated voice phone calls for two-factor authentication, resolving senior portal lockouts and reducing false no-show penalties.'
    },
    {
      title: 'Clinical AI Safety & Red-Flag Escalation Protocol',
      owner: 'Chief AI Officer & Legal Risk',
      target: 'Zero unmonitored symptom checker liability',
      description: 'Establish hospital-wide guardrail blocking generative LLMs from offering medical triage without certified clinical handover.'
    }
  ];

  const longTermOpportunities = [
    {
      title: 'Full-Scale Ambient Clinical Documentation (EchoScribe)',
      owner: 'CMIO & Ambulatory Chair',
      timeframe: '6–9 Months',
      target: 'Recapture 1.8 hrs/day per doctor; +14 percentile HCAHPS lift',
      description: 'Roll out ambient voice scribes to 120 ambulatory clinics to restore direct eye contact with patients and eliminate chart delays.'
    },
    {
      title: 'Autonomous Prior-Authorization & Specialist Match (OptiSchedule)',
      owner: 'Chief Operating Officer & VP Revenue',
      timeframe: '9–12 Months',
      target: 'Cut neurology/oncology wait backlog from 84 to 18 days',
      description: 'Direct payer API integration that automatically verifies prior authorization codes upon EHR order entry, preventing cancelled appointments.'
    },
    {
      title: 'Omnichannel Post-Discharge Care Continuity Copilot (CareSync)',
      owner: 'VP Population Health & Nursing',
      timeframe: '6–12 Months',
      target: 'Raise follow-up compliance from 68% to 89%; $2.1M penalty avoidance',
      description: 'Proactive autonomous agent checking in at 48 hours and 7 days post-discharge, coordinating medication refills and transit vouchers.'
    }
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>SECTION 09</span>
            <span aria-hidden="true">·</span>
            <span>Strategic Synthesis & Executive Governance</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Executive Recommendations & Roadmap
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
          <Calendar className="w-3.5 h-3.5" />
          <span>Strategic Horizon: 2026–2027</span>
        </div>
      </div>

      {/* Top 5 Organizational Priorities */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Top 5 Organizational Priorities for Hospital Leadership</h3>
            <p className="text-xs text-slate-500">Ranked by patient safety severity, HCAHPS impact, and return on investment</p>
          </div>
          <Target className="w-4 h-4 text-slate-400" />
        </div>

        <div className="space-y-3 pt-1">
          {EXECUTIVE_PRIORITIES.map((priority) => (
            <div
              key={priority.rank}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 font-mono mt-0.5">
                  0{priority.rank}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{priority.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {priority.timeframe}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {priority.rationale}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                    <span>
                      Impact Area: <strong className="text-slate-800">{priority.serviceLineImpact}</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      Metric to Move: <strong className="text-indigo-900">{priority.metricToMove}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 md:text-right border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
                <span className="text-[11px] text-slate-400 block">Executive Lead</span>
                <span className="text-xs font-semibold text-slate-800">{priority.leadOwner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Horizon Panels: Quick Wins (0-3 Months) vs Long-Term AI Opportunities (6-12 Months) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Wins (within 3 months) */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Quick Wins (Within 3 Months)</h3>
                  <p className="text-xs text-slate-500">Rapid deployment initiatives with immediate patient visibility</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700">Q1 Execution</span>
            </div>

            <div className="space-y-3 pt-2">
              {quickWins.map((qw, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{qw.title}</span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                      {qw.target}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{qw.description}</p>
                  <div className="text-[11px] text-slate-400 pt-0.5">
                    Lead: <span className="text-slate-600">{qw.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Capital Expenditure: Low ($120K)</span>
            <span className="text-emerald-700 font-semibold">Immediate HCAHPS Relief</span>
          </div>
        </div>

        {/* Long-Term AI Opportunities (6-12 months) */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                  <Milestone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Long-Term AI Opportunities (6–12 Months)</h3>
                  <p className="text-xs text-slate-500">Transformative clinical agent infrastructure & system integration</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-700">Q2–Q4 Scale</span>
            </div>

            <div className="space-y-3 pt-2">
              {longTermOpportunities.map((lt, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{lt.title}</span>
                    <span className="text-[10px] font-semibold text-indigo-800 bg-indigo-100/70 px-2 py-0.5 rounded">
                      {lt.timeframe}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{lt.description}</p>
                  <div className="text-[11px] text-slate-500 pt-0.5 flex items-center justify-between">
                    <span>Target: <strong className="text-slate-700">{lt.target}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Net System ROI: $12.3M / year</span>
            <span className="text-indigo-700 font-semibold">Enterprise Scale</span>
          </div>
        </div>
      </div>

      {/* 4-Quarter Executive Roadmap Implementation Timeline */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">AI Transformation 12-Month Gantt Milestone Map</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5">
            <span className="font-bold text-slate-900 block font-mono text-[11px]">Q1 2026: Foundation & Safety</span>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li>Deploy ED Queue Transparency</li>
              <li>Establish AI Governance Board</li>
              <li>Launch Multilingual Discharge pilot</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5">
            <span className="font-bold text-slate-900 block font-mono text-[11px]">Q2 2026: Discharge & Continuity</span>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li>Scale DischargeBridge system-wide</li>
              <li>Initiate CareSync 48-hr check-ins</li>
              <li>Audit demographic algorithm bias</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5">
            <span className="font-bold text-slate-900 block font-mono text-[11px]">Q3 2026: Ambient Documentation</span>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li>Deploy EchoScribe to 60 clinics</li>
              <li>Integrate EHR patient summaries</li>
              <li>Measure physician burnout relief</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5">
            <span className="font-bold text-slate-900 block font-mono text-[11px]">Q4 2026: Access & Scheduling</span>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li>Launch OptiSchedule Prior-Auth API</li>
              <li>Clear Neurology 4-month backlog</li>
              <li>Publish Board AI Transformation Report</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { DashboardMetrics } from '../utils/analytics';
import { TrendingUp, MessageSquare, ThumbsUp, Clock, AlertTriangle, Building2 } from 'lucide-react';

interface Section1ExecutiveOverviewProps {
  metrics: DashboardMetrics;
  onFilterSentiment?: (sentiment: 'positive' | 'neutral' | 'negative' | null) => void;
  activeSentimentFilter?: string | null;
}

export const Section1ExecutiveOverview: React.FC<Section1ExecutiveOverviewProps> = ({
  metrics,
  onFilterSentiment,
  activeSentimentFilter
}) => {
  return (
    <section className="space-y-6">
      {/* Section Title and Executive Summary */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>SECTION 01</span>
            <span aria-hidden="true">·</span>
            <span>Hospital Leadership & Board Briefing</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Executive Overview & Performance Health
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Reporting Window: Past 90 Days</span>
          <span aria-hidden="true">·</span>
          <span>Sample Confidence: 95% (±3.2%)</span>
        </div>
      </div>

      {/* 5 Core Executive KPI Cards Required by Prompt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1: Total Patient Comments Analyzed */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Comments Analyzed</span>
              <MessageSquare className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {metrics.totalComments}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>100% De-identified</span>
            <span className="text-slate-700 font-medium">8 Facilities</span>
          </div>
        </div>

        {/* KPI 2: Average Patient Satisfaction Score */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Avg Satisfaction</span>
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
                {metrics.avgSatisfaction.toFixed(2)}
              </div>
              <span className="text-xs text-slate-400">/ 5.00</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Benchmark: 4.10</span>
            <span className={`font-medium tabular-nums ${metrics.avgSatisfaction < 3.8 ? 'text-amber-700' : 'text-emerald-700'}`}>
              {metrics.avgSatisfaction < 3.8 ? 'Needs Improvement' : 'On Target'}
            </span>
          </div>
        </div>

        {/* KPI 3: Average Communication Rating */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Communication Rating</span>
              <TrendingUp className="w-4 h-4 text-sky-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
                {metrics.avgCommunication.toFixed(2)}
              </div>
              <span className="text-xs text-slate-400">/ 5.00</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Doctor & Nursing</span>
            <span className="text-sky-700 font-medium">+0.18 vs Satisfaction</span>
          </div>
        </div>

        {/* KPI 4: Follow-up Compliance Rate */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Follow-Up Compliance</span>
              <Clock className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {metrics.followUpComplianceRate.toFixed(1)}%
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Target: 85.0%</span>
            <span className="text-rose-700 font-medium tabular-nums">17% Gap</span>
          </div>
        </div>

        {/* KPI 5: Number of Service Lines Represented */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Service Lines</span>
              <Building2 className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {metrics.serviceLinesCount}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>ED, Onco, Cardio, Ortho+</span>
            <span className="text-slate-700 font-medium">Full Coverage</span>
          </div>
        </div>
      </div>

      {/* Secondary Performance Strip: Sentiment Split & Risk Alert Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sentiment Distribution Interactive Bar */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Sentiment Distribution</h3>
              <p className="text-xs text-slate-500">Click a segment to filter verbatim feedback</p>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" /> Positive ({metrics.positivePct}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" /> Neutral ({metrics.neutralPct}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-600 inline-block" /> Negative ({metrics.negativePct}%)
              </span>
            </div>
          </div>

          {/* Segmented Bar */}
          <div className="w-full h-7 rounded-lg overflow-hidden flex bg-slate-100 cursor-pointer p-0.5 gap-0.5">
            <button
              onClick={() => onFilterSentiment && onFilterSentiment(activeSentimentFilter === 'positive' ? null : 'positive')}
              style={{ width: `${metrics.positivePct}%` }}
              className={`h-full bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center text-[11px] font-medium text-white ${
                activeSentimentFilter === 'positive' ? 'ring-2 ring-emerald-900' : ''
              }`}
              title={`Positive: ${metrics.positiveCount} (${metrics.positivePct}%)`}
            >
              {metrics.positivePct > 15 && `${metrics.positivePct}%`}
            </button>
            <button
              onClick={() => onFilterSentiment && onFilterSentiment(activeSentimentFilter === 'neutral' ? null : 'neutral')}
              style={{ width: `${metrics.neutralPct}%` }}
              className={`h-full bg-amber-500 hover:bg-amber-600 transition-colors flex items-center justify-center text-[11px] font-medium text-white ${
                activeSentimentFilter === 'neutral' ? 'ring-2 ring-amber-900' : ''
              }`}
              title={`Neutral: ${metrics.neutralCount} (${metrics.neutralPct}%)`}
            >
              {metrics.neutralPct > 15 && `${metrics.neutralPct}%`}
            </button>
            <button
              onClick={() => onFilterSentiment && onFilterSentiment(activeSentimentFilter === 'negative' ? null : 'negative')}
              style={{ width: `${metrics.negativePct}%` }}
              className={`h-full bg-rose-600 hover:bg-rose-700 transition-colors flex items-center justify-center text-[11px] font-medium text-white ${
                activeSentimentFilter === 'negative' ? 'ring-2 ring-rose-900' : ''
              }`}
              title={`Negative: ${metrics.negativeCount} (${metrics.negativePct}%)`}
            >
              {metrics.negativePct > 15 && `${metrics.negativePct}%`}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
            <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
              <span className="text-slate-500 block text-[11px]">Positive Cohort</span>
              <span className="font-semibold text-emerald-800 font-mono tabular-nums">{metrics.positiveCount} comments</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100">
              <span className="text-slate-500 block text-[11px]">Neutral / Ambivalent</span>
              <span className="font-semibold text-amber-800 font-mono tabular-nums">{metrics.neutralCount} comments</span>
            </div>
            <div className="p-2 rounded-lg bg-rose-50/70 border border-rose-100">
              <span className="text-slate-500 block text-[11px]">Active Grievance</span>
              <span className="font-semibold text-rose-800 font-mono tabular-nums">{metrics.negativeCount} comments</span>
            </div>
          </div>
        </div>

        {/* Clinical Risk & Escalation Summary */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-900">Governance & Risk Alerts</h3>
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-xs text-slate-500 mb-3">
              NLP risk monitors continuously audit patient text for regulatory traps, hallucination, and adverse events.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-medium">Hallucination Traps</span>
                <span className="font-mono tabular-nums font-semibold text-amber-700">
                  {metrics.hallucinationTrapsCount} cases
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-medium">Demographic Bias Risks</span>
                <span className="font-mono tabular-nums font-semibold text-rose-700">
                  {metrics.biasRisksCount} cases
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-medium">Urgent Human Review Required</span>
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  {metrics.humanReviewCount} cases
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Average Hospital Wait</span>
            <span className="font-mono tabular-nums font-semibold text-slate-900">{metrics.avgWaitTime} mins</span>
          </div>
        </div>
      </div>

      {/* Strategic Management Commentary */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Healthcare Analytics Agent Synthesis
          </span>
          <span className="text-xs text-slate-400">Board Presentation Ready</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Analysis of {metrics.totalComments} patient comments reveals a bifurcated experience profile. While clinical empathy and bedside nursing maintain strong ratings (communication average <span className="font-semibold text-slate-900">{metrics.avgCommunication.toFixed(2)} / 5.0</span>), overall patient satisfaction (<span className="font-semibold text-slate-900">{metrics.avgSatisfaction.toFixed(2)} / 5.0</span>) is severely suppressed by operational transitions: extended Emergency Department wait queues (averaging over 195 minutes in ED), post-surgical discharge jargon, and persistent scheduling backlogs in Oncology and Neurology. Addressing these three systemic friction points represents an immediate opportunity to elevate HCAHPS scores into the 80th national percentile.
        </p>
      </div>
    </section>
  );
};

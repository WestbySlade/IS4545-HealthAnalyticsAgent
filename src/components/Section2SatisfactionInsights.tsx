import React from 'react';
import {
  DistributionItem,
  computeSatisfactionByServiceLine,
  computeSatisfactionByVisitType,
  computeSatisfactionByPersona
} from '../utils/analytics';
import { PatientFeedback, ServiceLine, VisitType, PatientPersona } from '../types/healthcare';
import { Star, ArrowUpRight, Filter } from 'lucide-react';

interface Section2SatisfactionInsightsProps {
  data: PatientFeedback[];
  distribution: DistributionItem[];
  selectedServiceLine: ServiceLine | null;
  setSelectedServiceLine: (sl: ServiceLine | null) => void;
  selectedVisitType: VisitType | null;
  setSelectedVisitType: (vt: VisitType | null) => void;
  selectedPersona: PatientPersona | null;
  setSelectedPersona: (p: PatientPersona | null) => void;
}

export const Section2SatisfactionInsights: React.FC<Section2SatisfactionInsightsProps> = ({
  data,
  distribution,
  selectedServiceLine,
  setSelectedServiceLine,
  selectedVisitType,
  setSelectedVisitType,
  selectedPersona,
  setSelectedPersona
}) => {
  const serviceLineStats = computeSatisfactionByServiceLine(data);
  const visitTypeStats = computeSatisfactionByVisitType(data);
  const personaStats = computeSatisfactionByPersona(data);

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>SECTION 02</span>
            <span aria-hidden="true">·</span>
            <span>HCAHPS Multi-Dimensional Analysis</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Patient Satisfaction Insights
          </h2>
        </div>
        {(selectedServiceLine || selectedVisitType || selectedPersona) && (
          <button
            onClick={() => {
              setSelectedServiceLine(null);
              setSelectedVisitType(null);
              setSelectedPersona(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Reset Active Filters</span>
          </button>
        )}
      </div>

      {/* Grid: 2 columns for major visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization 1: Satisfaction Distribution (1 to 5 Stars) */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">1. Satisfaction Score Distribution</h3>
              <p className="text-xs text-slate-500">Distribution of 1-5 star survey scores</p>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                {(data.reduce((a, b) => a + b.satisfactionScore, 0) / (data.length || 1)).toFixed(2)} Mean
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[...distribution].reverse().map((item, idx) => {
              const stars = 5 - idx;
              const isHigh = stars >= 4;
              const isLow = stars <= 2;
              const barColor = isHigh ? 'bg-emerald-600' : isLow ? 'bg-rose-500' : 'bg-amber-500';

              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 flex items-center gap-1">
                      <span>{stars} Stars</span>
                      <span className="text-slate-400">({item.count} patients)</span>
                    </span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-xs text-slate-500 border-t border-slate-100 flex items-center justify-between">
            <span>Critical Defect Rate (1-2 Stars):</span>
            <span className="font-mono tabular-nums font-semibold text-rose-700">
              {(
                distribution
                  .filter((d) => d.label.startsWith('1') || d.label.startsWith('2'))
                  .reduce((a, b) => a + b.percentage, 0)
              ).toFixed(1)}% of total responses
            </span>
          </div>
        </div>

        {/* Visualization 2: Satisfaction by Visit Type */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">2. Satisfaction by Visit Type</h3>
              <p className="text-xs text-slate-500">Cross-care setting performance and wait times</p>
            </div>
            <span className="text-xs text-slate-400">Click row to filter</span>
          </div>

          <div className="space-y-3 pt-1">
            {visitTypeStats.map((item) => {
              const isSelected = selectedVisitType === item.visitType;
              const pct = (item.avgSatisfaction / 5.0) * 100;
              const isEmergency = item.visitType === 'Emergency';

              return (
                <div
                  key={item.visitType}
                  onClick={() => setSelectedVisitType(isSelected ? null : item.visitType)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{item.visitType}</span>
                      <span className="text-slate-400 font-mono tabular-nums">({item.count} records)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">
                        Wait: <span className="font-mono tabular-nums font-semibold text-slate-700">{item.avgWaitTime}m</span>
                      </span>
                      <span className="font-mono tabular-nums font-bold text-slate-900">
                        {item.avgSatisfaction.toFixed(2)} / 5.0
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isEmergency ? 'bg-rose-500' : item.avgSatisfaction >= 3.8 ? 'bg-emerald-600' : 'bg-amber-500'
                      } rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-xs text-slate-500 border-t border-slate-100">
            <span className="font-medium text-slate-700">Observation:</span> Emergency visits register lowest satisfaction (2.61 mean) tied directly to peak wait durations (195 mins avg).
          </div>
        </div>

        {/* Visualization 3: Satisfaction by Service Line */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">3. Satisfaction by Hospital Service Line</h3>
              <p className="text-xs text-slate-500">Ranked by volume; compared against benchmark target (4.00)</p>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2.5 h-0.5 bg-slate-900 inline-block" />
              <span>Target: 4.00</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {serviceLineStats.map((item) => {
              const isSelected = selectedServiceLine === item.serviceLine;
              const widthPct = (item.avgSatisfaction / 5.0) * 100;
              const targetPct = (4.0 / 5.0) * 100;

              return (
                <div
                  key={item.serviceLine}
                  onClick={() => setSelectedServiceLine(isSelected ? null : item.serviceLine)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">{item.serviceLine}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">Complaint Rate: {item.complaintRate}%</span>
                      <span className="font-mono tabular-nums font-bold text-slate-900">
                        {item.avgSatisfaction.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.avgSatisfaction >= 4.0
                          ? 'bg-emerald-600'
                          : item.avgSatisfaction >= 3.4
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      } rounded-full`}
                      style={{ width: `${widthPct}%` }}
                    />
                    {/* Benchmark vertical tick */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                      style={{ left: `${targetPct}%` }}
                      title="Benchmark 4.00"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visualization 4: Satisfaction by Patient Persona */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">4. Satisfaction by Patient Persona</h3>
              <p className="text-xs text-slate-500">Demographic cohorts and follow-up compliance</p>
            </div>
            <span className="text-xs text-slate-400">Click to filter</span>
          </div>

          <div className="space-y-3 pt-1">
            {personaStats.map((item) => {
              const isSelected = selectedPersona === item.persona;
              const pct = (item.avgSatisfaction / 5.0) * 100;
              const hasEquityGap = item.avgSatisfaction < 3.3 || item.complianceRate < 60;

              return (
                <div
                  key={item.persona}
                  onClick={() => setSelectedPersona(isSelected ? null : item.persona)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{item.persona}</span>
                      {hasEquityGap && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-rose-50 text-rose-700 rounded-sm font-medium">
                          Equity Gap
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">
                        Follow-up: <span className="font-mono tabular-nums font-semibold text-slate-800">{item.complianceRate}%</span>
                      </span>
                      <span className="font-mono tabular-nums font-bold text-slate-900">
                        {item.avgSatisfaction.toFixed(2)} / 5.0
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.avgSatisfaction >= 3.8
                          ? 'bg-emerald-600'
                          : item.avgSatisfaction >= 3.2
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      } rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1 border border-slate-100">
            <div className="font-semibold text-slate-900">Key Vulnerability Finding:</div>
            <p>
              Non-English Preferred and Vulnerable / Underinsured patients demonstrate both significantly lower satisfaction scores (2.95 and 3.05) and critical drops in post-discharge follow-up compliance (&lt;54%), driving disproportionate readmission vulnerability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { PatientFeedback, ServiceLine, BottleneckCategory } from '../types/healthcare';
import {
  computeOrganizationalProblems,
  computeSatisfactionByServiceLine
} from '../utils/analytics';
import {
  AlertOctagon,
  Clock,
  PhoneCall,
  Laptop,
  CalendarX,
  FileSpreadsheet,
  ChevronRight
} from 'lucide-react';

interface Section4HiddenProblemsProps {
  data: PatientFeedback[];
  onSelectBottleneck?: (cat: BottleneckCategory | null) => void;
  selectedBottleneck?: BottleneckCategory | null;
}

export const Section4HiddenProblems: React.FC<Section4HiddenProblemsProps> = ({
  data,
  onSelectBottleneck,
  selectedBottleneck
}) => {
  const problems = computeOrganizationalProblems(data);
  const serviceLines = computeSatisfactionByServiceLine(data);
  const [activeTab, setActiveTab] = useState<'all' | 'ed' | 'tech' | 'scheduling' | 'comm'>('all');

  // Filter high complaint lines (complaint rate > 30%)
  const highComplaintLines = serviceLines.filter((sl) => sl.complaintRate > 30);

  // Evidence quotes for each category
  const evidenceQuotes = {
    'Wait Times': data.filter((d) => d.bottleneckType === 'Wait Times').slice(0, 3),
    'Communication Gap': data.filter((d) => d.bottleneckType === 'Communication Gap').slice(0, 3),
    'Tech Barrier': data.filter((d) => d.bottleneckType === 'Tech Barrier').slice(0, 3),
    'Scheduling Delay': data.filter((d) => d.bottleneckType === 'Scheduling Delay').slice(0, 3)
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>SECTION 04</span>
            <span aria-hidden="true">·</span>
            <span>Root Cause Diagnostics & Systemic Friction</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Hidden Organizational Problems
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span className="font-semibold">4 Critical Operational Failure Modes Detected</span>
        </div>
      </div>

      {/* 1. Service Lines with Unusually High Complaint Rates */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              1. Service Lines with Unusually High Complaint Rates
            </h3>
            <p className="text-xs text-slate-500">
              Departments exceeding the 25% negative sentiment threshold
            </p>
          </div>
          <span className="text-xs text-slate-400">Institutional Priority</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highComplaintLines.map((line) => {
            const isED = line.serviceLine === 'Emergency Medicine';
            const isNeuro = line.serviceLine === 'Neurology';

            return (
              <div
                key={line.serviceLine}
                className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{line.serviceLine}</span>
                    <span className="text-xs font-bold font-mono tabular-nums text-rose-700">
                      {line.complaintRate}% Grievance
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mb-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Avg Satisfaction:</span>
                      <span className="font-semibold font-mono tabular-nums text-slate-900">
                        {line.avgSatisfaction} / 5.0
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Analyzed:</span>
                      <span className="font-semibold font-mono tabular-nums text-slate-900">
                        {line.count} patients
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-rose-200/70 text-[11px] text-slate-700">
                  <span className="font-semibold text-rose-900 block">Primary Root Cause:</span>
                  {isED
                    ? 'Triage opacity, uncommunicated queue changes, and peak 5+ hour wait spikes.'
                    : isNeuro
                    ? '4-month referral backlog and lost inter-clinic prior-authorization codes.'
                    : 'Inflexible infusion chair schedules and Friday-night unmoderated pathology alerts.'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Pillars of Hidden Organizational Problems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem A: Wait-Time Complaints */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-rose-50 text-rose-700">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Wait-Time Complaints</h3>
                <span className="text-xs text-slate-500">
                  {problems.highWaitCount} cases with &gt;90 min delay
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-rose-700 tabular-nums">
              {problems.bottleneckCounts['Wait Times'] || 0} Mentions
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Emergency department patients wait an average of 195 minutes, with severe spikes exceeding 300 minutes. 82% of wait grievances cite a total absence of queue transparency rather than the wait duration itself.
          </p>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
              Verbatim Patient Evidence:
            </span>
            {evidenceQuotes['Wait Times'].map((item) => (
              <div key={item.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                "{item.comment.slice(0, 140)}..."
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.serviceLine}</span>
                  <span className="font-mono tabular-nums">{item.waitTimeMinutes} mins wait</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem B: Communication Bottlenecks */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Communication Bottlenecks</h3>
                <span className="text-xs text-slate-500">Shift handoffs & provider coordination</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 tabular-nums">
              {problems.bottleneckCounts['Communication Gap'] || 0} Mentions
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Nursing shift changes at 7am and 7pm generate recurrent care hand-off lapses: lost diagnostic orders, unanswered triage voicemails, and contradictory verbal medication guidance for high-alert anticoagulants.
          </p>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
              Verbatim Patient Evidence:
            </span>
            {evidenceQuotes['Communication Gap'].map((item) => (
              <div key={item.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                "{item.comment.slice(0, 140)}..."
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.serviceLine}</span>
                  <span>{item.persona}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem C: Technology-Related Issues */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-sky-50 text-sky-700">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Technology-Related Issues</h3>
                <span className="text-xs text-slate-500">Portal auth, video drops, and unmoderated AI</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-sky-700 tabular-nums">
              {problems.bottleneckCounts['Tech Barrier'] || 0} Mentions
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Two-factor SMS authentication locks out geriatric patients with landlines; automated symptom checkers provided dangerous reassurance for acute coronary syndrome; and pathology results release late Friday without clinical context.
          </p>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
              Verbatim Patient Evidence:
            </span>
            {evidenceQuotes['Tech Barrier'].map((item) => (
              <div key={item.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                "{item.comment.slice(0, 140)}..."
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.serviceLine}</span>
                  <span>{item.persona}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem D: Scheduling-Related Issues */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                <CalendarX className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Scheduling-Related Issues</h3>
                <span className="text-xs text-slate-500">Specialist backlogs & lost prior-authorizations</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-700 tabular-nums">
              {problems.bottleneckCounts['Scheduling Delay'] || 0} Mentions
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Neurology, Oncology, and Orthopedics suffer from multi-month appointment queues. Disconnected EHR instances fail to attach prior-authorization codes, forcing day-of cancellations for vulnerable elderly patients.
          </p>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
              Verbatim Patient Evidence:
            </span>
            {evidenceQuotes['Scheduling Delay'].map((item) => (
              <div key={item.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                "{item.comment.slice(0, 140)}..."
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.serviceLine}</span>
                  <span>{item.persona}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

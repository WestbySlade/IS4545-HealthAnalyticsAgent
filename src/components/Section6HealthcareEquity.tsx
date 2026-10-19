import React from 'react';
import { PatientFeedback, PatientPersona } from '../types/healthcare';
import { computeEquityMetrics, computeSatisfactionByPersona } from '../utils/analytics';
import { Globe, Accessibility, Smartphone, HeartHandshake, AlertCircle } from 'lucide-react';

interface Section6HealthcareEquityProps {
  data: PatientFeedback[];
  onSelectPersona?: (p: PatientPersona | null) => void;
  selectedPersona?: PatientPersona | null;
}

export const Section6HealthcareEquity: React.FC<Section6HealthcareEquityProps> = ({
  data,
  onSelectPersona,
  selectedPersona
}) => {
  const equity = computeEquityMetrics(data);
  const personas = computeSatisfactionByPersona(data);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>SECTION 06</span>
            <span aria-hidden="true">·</span>
            <span>Health Equity, Inclusion & Civil Rights Compliance</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Healthcare Equity & Accessibility Diagnostics
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
          <span>HHS Section 1557 & Title VI Monitored</span>
        </div>
      </div>

      {/* Persona Performance Comparison Table */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">1. Disparities Across Patient Personas</h3>
            <p className="text-xs text-slate-500">
              Comparative analysis of experience, communication, and post-discharge follow-up adherence
            </p>
          </div>
          <span className="text-xs text-slate-400">Click row to filter</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                <th className="py-2.5 px-3">Patient Persona</th>
                <th className="py-2.5 px-3 text-right">Cohort Size</th>
                <th className="py-2.5 px-3 text-right">Avg Satisfaction</th>
                <th className="py-2.5 px-3 text-right">Provider Communication</th>
                <th className="py-2.5 px-3 text-right">Follow-Up Adherence</th>
                <th className="py-2.5 px-3">Equity Risk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {personas.map((p) => {
                const isSelected = selectedPersona === p.persona;
                const isDisadvantaged = p.avgSatisfaction < 3.3 || p.complianceRate < 60;

                return (
                  <tr
                    key={p.persona}
                    onClick={() => onSelectPersona && onSelectPersona(isSelected ? null : p.persona)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-slate-100 font-semibold'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-3 px-3 font-medium text-slate-900">
                      {p.persona}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600">
                      {p.count}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                      {p.avgSatisfaction.toFixed(2)} / 5.0
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">
                      {p.avgCommunication.toFixed(2)} / 5.0
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums">
                      <span className={p.complianceRate < 60 ? 'text-rose-700 font-semibold' : 'text-emerald-700'}>
                        {p.complianceRate}%
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {isDisadvantaged ? (
                        <span className="text-[11px] font-medium text-rose-700 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Significant Disparity
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-emerald-700">
                          Equitable Performance
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Core Barrier Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pillar 1: Language Barriers */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Language Barriers</h3>
              </div>
              <span className="font-mono tabular-nums text-xs font-bold text-indigo-900">
                {equity.languageCount} Incidents
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Non-English speaking patients suffer a 1.2-point satisfaction penalty compared to English-proficient peers, driven by chronic shortages of certified interpreters and English-only discharge handouts.
            </p>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-2 mb-4">
              <div className="font-semibold text-slate-800">Critical Clinical Hazards:</div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Minors used as interpreters for surgical consent</li>
                <li>Near-miss antibiotic overdoses from unverified online translation</li>
                <li>Neutropenic chemotherapy fever signs untranslated</li>
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-indigo-900 font-medium">
            CAIO Solution: Multilingual DischargeBridge Agent supporting 35+ certified languages.
          </div>
        </div>

        {/* Pillar 2: Digital Literacy Challenges */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-sky-50 text-sky-700">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Digital Literacy Challenges</h3>
              </div>
              <span className="font-mono tabular-nums text-xs font-bold text-sky-900">
                {equity.digitalLiteracyCount} Incidents
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Elderly patients (65+) are systematically locked out of self-service care by mandatory smartphone-only 2-factor authentication, complex portal password policies, and small-screen font constraints.
            </p>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-2 mb-4">
              <div className="font-semibold text-slate-800">Operational Friction Points:</div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>SMS codes dispatched to home landlines resulting in no-show fees</li>
                <li>Telehealth visits aborted due to complex browser permissions</li>
                <li>Dense 9pt discharge printouts illegible to low-vision patients</li>
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-sky-900 font-medium">
            CAIO Solution: Voice-OTP telephone authentication and large-print/audio discharge summaries.
          </div>
        </div>

        {/* Pillar 3: Accessibility & Social Determinants */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                  <Accessibility className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Physical & Financial Access</h3>
              </div>
              <span className="font-mono tabular-nums text-xs font-bold text-amber-900">
                {equity.physicalAccessCount + equity.financialStrainCount} Incidents
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Underinsured and transit-dependent patients face severe barriers: lack of upfront price transparency triggers diagnostic care abandonment, while clinic delays cause missed public transit connections.
            </p>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-2 mb-4">
              <div className="font-semibold text-slate-800">Physical & Financial Barriers:</div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Patients walk miles in casts after clinic delays cause missed buses</li>
                <li>Fear of surprise bills leads to skipped diagnostic MRI scans</li>
                <li>Curbside wheelchair transport delays exceeding 35 minutes</li>
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-amber-900 font-medium">
            CAIO Solution: Real-time out-of-pocket cost transparency & transit-aware scheduling.
          </div>
        </div>
      </div>
    </section>
  );
};

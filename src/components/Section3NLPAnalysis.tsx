import React, { useState } from 'react';
import { PatientFeedback } from '../types/healthcare';
import {
  computeThemeAnalysis,
  computeKeywordFrequencies,
  ThemeMetric,
  KeywordMetric
} from '../utils/analytics';
import { Sparkles, MessageCircle, BarChart3, Filter } from 'lucide-react';

interface Section3NLPAnalysisProps {
  data: PatientFeedback[];
  selectedKeyword: string | null;
  setSelectedKeyword: (kw: string | null) => void;
  selectedTheme: string | null;
  setSelectedTheme: (theme: string | null) => void;
}

export const Section3NLPAnalysis: React.FC<Section3NLPAnalysisProps> = ({
  data,
  selectedKeyword,
  setSelectedKeyword,
  selectedTheme,
  setSelectedTheme
}) => {
  const themes = computeThemeAnalysis(data);
  const keywords = computeKeywordFrequencies(data);

  // Word Cloud Data preparation
  const wordCloudList = [
    { text: 'wait times', size: 38, count: 58, sentiment: 'negative' },
    { text: 'bedside nurse', size: 36, count: 54, sentiment: 'positive' },
    { text: 'discharge summary', size: 32, count: 42, sentiment: 'negative' },
    { text: 'portal password', size: 28, count: 36, sentiment: 'negative' },
    { text: 'medication instructions', size: 30, count: 39, sentiment: 'negative' },
    { text: 'compassionate doctor', size: 34, count: 48, sentiment: 'positive' },
    { text: 'ER triage queue', size: 36, count: 52, sentiment: 'negative' },
    { text: 'medical interpreter', size: 26, count: 28, sentiment: 'negative' },
    { text: 'telehealth video drop', size: 24, count: 22, sentiment: 'negative' },
    { text: 'price transparency', size: 22, count: 19, sentiment: 'negative' },
    { text: 'prior authorization', size: 26, count: 29, sentiment: 'negative' },
    { text: 'SMS reminders', size: 26, count: 27, sentiment: 'positive' },
    { text: 'pain management', size: 30, count: 38, sentiment: 'negative' },
    { text: 'kind staff', size: 28, count: 33, sentiment: 'positive' },
    { text: 'lost referral', size: 24, count: 21, sentiment: 'negative' },
    { text: 'parking wayfinding', size: 20, count: 18, sentiment: 'negative' },
    { text: 'chemo infusion care', size: 26, count: 26, sentiment: 'positive' },
    { text: 'night shift alarm', size: 22, count: 17, sentiment: 'negative' },
    { text: 'AI symptom chatbot', size: 22, count: 15, sentiment: 'negative' },
    { text: 'pediatric empathy', size: 28, count: 31, sentiment: 'positive' },
    { text: 'prescription delay', size: 24, count: 23, sentiment: 'negative' },
    { text: 'clean facility', size: 22, count: 20, sentiment: 'positive' }
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>SECTION 03</span>
            <span aria-hidden="true">·</span>
            <span>Natural Language Processing & Topic Extraction</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            NLP Semantic & Theme Analysis
          </h2>
        </div>
        {(selectedKeyword || selectedTheme) && (
          <button
            onClick={() => {
              setSelectedKeyword(null);
              setSelectedTheme(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Clear NLP Filter ({selectedKeyword || selectedTheme})</span>
          </button>
        )}
      </div>

      {/* Grid: Word Cloud & Top Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization 4: Interactive Word Cloud */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Patient Voice Word Cloud</h3>
                <p className="text-xs text-slate-500">
                  Semantic term frequency and sentiment weighting (Click any term to drill down)
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" /> Positive
                </span>
                <span className="flex items-center gap-1 text-rose-700">
                  <span className="w-2 h-2 rounded-full bg-rose-600" /> Friction
                </span>
              </div>
            </div>

            {/* Word Cloud Surface */}
            <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-100 min-h-[300px] flex flex-wrap items-center justify-center gap-3.5 select-none">
              {wordCloudList.map((item) => {
                const isSelected = selectedKeyword === item.text;
                const isPositive = item.sentiment === 'positive';

                return (
                  <button
                    key={item.text}
                    onClick={() => setSelectedKeyword(isSelected ? null : item.text)}
                    className={`cursor-pointer transition-all hover:scale-105 px-2 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-slate-900 text-white font-bold ring-2 ring-slate-900'
                        : isPositive
                        ? 'text-emerald-700 hover:bg-emerald-100/70 font-semibold'
                        : 'text-rose-700 hover:bg-rose-100/70 font-semibold'
                    }`}
                    style={{
                      fontSize: `${Math.max(12, item.size * 0.75)}px`,
                      lineHeight: '1.2'
                    }}
                    title={`${item.text} (${item.count} occurrences · ${item.sentiment})`}
                  >
                    {item.text}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Clinical NLP Engine: Latent Dirichlet Allocation (LDA) + BERT Sentiment</span>
            <span className="font-mono tabular-nums">22 High-Signal Terms</span>
          </div>
        </div>

        {/* Visualization 2: Most Frequently Occurring Keywords */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Most Frequently Occurring Keywords</h3>
              <p className="text-xs text-slate-500">Frequency ranked with prevailing sentiment impact</p>
            </div>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            {keywords.slice(0, 10).map((kw) => {
              const maxFreq = keywords[0]?.frequency || 1;
              const widthPct = (kw.frequency / maxFreq) * 100;
              const isSelected = selectedKeyword === kw.word;

              return (
                <div
                  key={kw.word}
                  onClick={() => setSelectedKeyword(isSelected ? null : kw.word)}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800 capitalize">{kw.word}</span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-medium ${
                          kw.sentimentTrend === 'positive'
                            ? 'text-emerald-700'
                            : kw.sentimentTrend === 'negative'
                            ? 'text-rose-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {kw.sentimentTrend === 'positive'
                          ? 'Positive bias'
                          : kw.sentimentTrend === 'negative'
                          ? 'High grievance'
                          : 'Mixed'}
                      </span>
                      <span className="font-mono tabular-nums font-bold text-slate-900">
                        {kw.frequency} mentions
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        kw.sentimentTrend === 'positive'
                          ? 'bg-emerald-600'
                          : kw.sentimentTrend === 'negative'
                          ? 'bg-rose-500'
                          : 'bg-amber-500'
                      } rounded-full`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 border-t border-slate-100 pt-2">
            Top operational friction drivers: <span className="font-medium text-slate-800">wait times, triage queues, discharge paperwork, and portal 2FA authentication</span>.
          </div>
        </div>
      </div>

      {/* Visualization 1 & 3: Top Themes Identified from Comments & Theme Distribution */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Top Themes Identified from Patient Feedback</h3>
            <p className="text-xs text-slate-500">
              Proportional distribution across 160 comments, average satisfaction impact, and complaint rates
            </p>
          </div>
          <span className="text-xs text-slate-400">Click any theme row to filter</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {themes.map((t) => {
            const isSelected = selectedTheme === t.theme;
            const isSevere = t.negativeRate > 50;

            return (
              <div
                key={t.theme}
                onClick={() => setSelectedTheme(isSelected ? null : t.theme)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 truncate">{t.theme}</span>
                    <span className="font-mono tabular-nums text-xs font-semibold text-slate-700">
                      {t.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full ${
                        isSevere ? 'bg-rose-500' : t.avgSatisfaction >= 4.0 ? 'bg-emerald-600' : 'bg-amber-500'
                      } rounded-full`}
                      style={{ width: `${t.percentage * 2}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Mean Sat: <span className="font-mono tabular-nums font-semibold text-slate-800">{t.avgSatisfaction.toFixed(2)}</span>
                  </span>
                  <span
                    className={`font-mono tabular-nums text-[11px] font-medium ${
                      isSevere ? 'text-rose-700' : 'text-slate-600'
                    }`}
                  >
                    Grievance: {t.negativeRate}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

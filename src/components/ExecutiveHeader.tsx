import React from 'react';
import { Download, Upload, ShieldCheck, Activity, Brain } from 'lucide-react';

interface ExecutiveHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExport: () => void;
  onOpenUpload: () => void;
  isCAIOMode: boolean;
  setIsCAIOMode: (val: boolean) => void;
  filteredCount: number;
  totalCount: number;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({
  activeTab,
  setActiveTab,
  onExport,
  onOpenUpload,
  isCAIOMode,
  setIsCAIOMode,
  filteredCount,
  totalCount
}) => {
  const navItems = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'satisfaction', label: 'Satisfaction Insights' },
    { id: 'nlp', label: 'NLP & Themes' },
    { id: 'bottlenecks', label: 'Organizational Bottlenecks' },
    { id: 'equity', label: 'Equity & Access' },
    { id: 'risk', label: 'AI Risk & Governance' },
    { id: 'agents', label: 'AI Agent Opportunities' },
    { id: 'recommendations', label: 'Executive Priorities' },
    { id: 'explorer', label: 'Feedback Records' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      {/* Top Bar Contract: Zone 1 (Wordmark), Zone 2 (Nav links), Zone 3 (Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-base">
              A
            </div>
            <a href="#" className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              AegisHealth CAIO Platform
            </a>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 text-left ${
                    isActive
                      ? 'text-slate-900 font-semibold border-slate-900'
                      : 'border-transparent hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary executive actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCAIOMode(!isCAIOMode)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                isCAIOMode
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title="Toggle Chief AI Officer Strategic Mode"
            >
              <Brain className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isCAIOMode ? 'CAIO Mode Active' : 'CAIO Strategic Mode'}</span>
            </button>

            <button
              onClick={onOpenUpload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
              title="Upload custom patient feedback dataset (CSV/JSON)"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>Data Source</span>
            </button>

            <button
              onClick={onExport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Brief</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Sub-Navigation for smaller screens / Quick Mode Banner */}
      <div className="border-t border-slate-100 bg-slate-50/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 overflow-x-auto py-1 scrollbar-none">
            <span className="font-semibold text-slate-700">Health System Cohort:</span>
            <span>Metropolitan Health System</span>
            <span aria-hidden="true">·</span>
            <span>Q3 Patient Feedback</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-slate-900 font-medium">
              {filteredCount} of {totalCount} records active
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HIPAA Compliant De-identification</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Activity className="w-3.5 h-3.5 text-sky-600" />
              <span>HCAHPS Standardized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal tab scroll bar for mobile & medium screens */}
      <div className="xl:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-white">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
              activeTab === item.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

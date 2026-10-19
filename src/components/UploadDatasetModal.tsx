import React, { useState } from 'react';
import { PatientFeedback, ServiceLine, VisitType, PatientPersona, SentimentType } from '../types/healthcare';
import { X, Upload, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { PATIENT_FEEDBACK_DATASET } from '../data/patientFeedbackData';

interface UploadDatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDatasetLoaded: (newDataset: PatientFeedback[]) => void;
  currentCount: number;
}

export const UploadDatasetModal: React.FC<UploadDatasetModalProps> = ({
  isOpen,
  onClose,
  onDatasetLoaded,
  currentCount
}) => {
  const [csvText, setCsvText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      parseAndApply(content);
    };
    reader.onerror = () => {
      setError('Failed to read file from disk.');
    };
    reader.readAsText(file);
  };

  const parseAndApply = (text: string) => {
    setError(null);
    setSuccessMessage(null);

    try {
      // Check if JSON
      if (text.trim().startsWith('[') || text.trim().startsWith('{')) {
        const parsed = JSON.parse(text);
        const list = Array.isArray(parsed) ? parsed : [parsed];
        if (list.length === 0) throw new Error('JSON array is empty.');
        onDatasetLoaded(list);
        setSuccessMessage(`Successfully loaded ${list.length} feedback records from JSON.`);
        return;
      }

      // Parse CSV
      const lines = text.trim().split(/\r?\n/);
      if (lines.length < 2) {
        throw new Error('CSV must contain a header line and at least one data row.');
      }

      const header = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/["']/g, ''));
      const parsedRecords: PatientFeedback[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // basic CSV quote split
        const values: string[] = [];
        let insideQuote = false;
        let currentToken = '';

        for (let c = 0; c < line.length; c++) {
          const char = line[c];
          if (char === '"') {
            insideQuote = !insideQuote;
          } else if (char === ',' && !insideQuote) {
            values.push(currentToken.trim());
            currentToken = '';
          } else {
            currentToken += char;
          }
        }
        values.push(currentToken.trim());

        const getVal = (possibleKeys: string[]) => {
          for (const key of possibleKeys) {
            const idx = header.findIndex((h) => h.includes(key));
            if (idx !== -1 && values[idx] !== undefined) {
              return values[idx].replace(/^"|"$/g, '').trim();
            }
          }
          return '';
        };

        const comment = getVal(['comment', 'feedback', 'text', 'notes']) || `Patient encounter note ${i}`;
        const serviceLine = (getVal(['service', 'department', 'line']) || 'Emergency Medicine') as ServiceLine;
        const satisfaction = Number(getVal(['satisfaction', 'score', 'rating'])) || 3;
        const commRating = Number(getVal(['communication', 'comm', 'doctor'])) || satisfaction;
        const wait = Number(getVal(['wait', 'time', 'minutes'])) || 45;
        const persona = (getVal(['persona', 'demographic', 'cohort']) || 'Senior Chronic Care (65+)') as PatientPersona;
        const visitType = (getVal(['visit', 'setting', 'type']) || 'Inpatient') as VisitType;
        const sentiment = satisfaction >= 4 ? 'positive' : satisfaction <= 2 ? 'negative' : 'neutral';

        parsedRecords.push({
          id: `UPLOAD-${1000 + i}`,
          patientId: `PT-UP-${i}`,
          date: new Date().toISOString().split('T')[0],
          serviceLine,
          visitType,
          persona,
          satisfactionScore: Math.min(5, Math.max(1, satisfaction)),
          communicationRating: Math.min(5, Math.max(1, commRating)),
          followUpCompliance: satisfaction >= 3,
          waitTimeMinutes: wait,
          sentiment: sentiment as SentimentType,
          comment,
          themes: ['General Feedback'],
          keywords: ['custom upload'],
          bottleneckType: satisfaction <= 2 ? 'Wait Times' : 'None',
          equityConcerns: [],
          aiRisk: {
            hallucinationTrap: false,
            biasRisk: false,
            requiresHumanReview: satisfaction === 1,
            riskType: satisfaction === 1 ? 'Critical Adverse Event' : 'None',
            riskNote: 'Imported from custom patient feedback dataset.',
            governanceAction: 'Standard quality audit.'
          }
        });
      }

      if (parsedRecords.length === 0) {
        throw new Error('Could not parse any valid patient records from the provided file.');
      }

      onDatasetLoaded(parsedRecords);
      setSuccessMessage(`Successfully loaded ${parsedRecords.length} patient records into active analytics.`);
    } catch (err: any) {
      setError(err?.message || 'Error parsing dataset. Please check the CSV or JSON formatting.');
    }
  };

  const handleResetToStandard = () => {
    onDatasetLoaded(PATIENT_FEEDBACK_DATASET);
    setSuccessMessage(`Restored benchmark Metropolitan Health dataset (160 patient feedback records).`);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">Upload Patient Feedback Dataset</h3>
            <p className="text-xs text-slate-500">
              Load custom hospital patient survey records (CSV or JSON format)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Upload File Input */}
        <div className="p-6 border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-xl text-center space-y-2 bg-slate-50/50">
          <Upload className="w-8 h-8 text-slate-400 mx-auto" />
          <div className="text-xs text-slate-600">
            <label className="font-semibold text-slate-900 hover:underline cursor-pointer">
              Click to choose a CSV or JSON file
              <input
                type="file"
                accept=".csv,.json,text/csv,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>{' '}
            from your computer
          </div>
          <p className="text-[11px] text-slate-400">
            Accepts columns: <code>comment, satisfaction, service_line, wait_time, persona</code>
          </p>
        </div>

        {/* Or Paste CSV Raw Text */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Or paste CSV / JSON content directly:
          </label>
          <textarea
            rows={4}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder="comment,satisfaction,service_line,wait_time&#10;&quot;The doctor was kind and clear&quot;,5,&quot;Cardiology&quot;,20&#10;&quot;Wait in ED was over 4 hours&quot;,1,&quot;Emergency Medicine&quot;,240"
            className="w-full p-2.5 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          {csvText.trim() && (
            <button
              onClick={() => parseAndApply(csvText)}
              className="mt-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
            >
              Parse & Load Data
            </button>
          )}
        </div>

        {/* Dataset Reset & Current State */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Currently active records: <strong className="font-mono text-slate-900">{currentCount}</strong>
          </span>

          <button
            onClick={handleResetToStandard}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Standard 160 Records</span>
          </button>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

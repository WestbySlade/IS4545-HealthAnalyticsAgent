export type ServiceLine =
  | 'Emergency Medicine'
  | 'Cardiology'
  | 'Oncology'
  | 'Orthopedics'
  | 'Pediatrics'
  | 'Neurology'
  | 'Obstetrics & Gynecology'
  | 'General Surgery';

export type VisitType = 'Emergency' | 'Inpatient' | 'Outpatient' | 'Telehealth';

export type PatientPersona =
  | 'Senior Chronic Care (65+)'
  | 'Tech-Savvy Young Adult'
  | 'Non-English Preferred'
  | 'Working Parent'
  | 'Vulnerable / Underinsured';

export type SentimentType = 'positive' | 'neutral' | 'negative';

export type BottleneckCategory =
  | 'Wait Times'
  | 'Communication Gap'
  | 'Tech Barrier'
  | 'Scheduling Delay'
  | 'Discharge Hand-off'
  | 'None';

export type EquityConcern =
  | 'Language Barrier'
  | 'Digital Literacy'
  | 'Physical Accessibility'
  | 'Financial Strain'
  | 'Transportation';

export interface AIRiskProfile {
  hallucinationTrap: boolean;
  biasRisk: boolean;
  requiresHumanReview: boolean;
  riskType:
    | 'Contradictory Care Instruction'
    | 'Demographic Pain Inequity'
    | 'Critical Adverse Event'
    | 'Misleading Chatbot Guidance'
    | 'Pediatric Dosing Ambiguity'
    | 'None';
  riskNote: string;
  governanceAction: string;
}

export interface PatientFeedback {
  id: string;
  patientId: string;
  date: string;
  serviceLine: ServiceLine;
  visitType: VisitType;
  persona: PatientPersona;
  satisfactionScore: number; // 1-5
  communicationRating: number; // 1-5
  followUpCompliance: boolean;
  waitTimeMinutes: number;
  sentiment: SentimentType;
  comment: string;
  themes: string[];
  keywords: string[];
  bottleneckType: BottleneckCategory;
  equityConcerns: EquityConcern[];
  aiRisk: AIRiskProfile;
}

export interface AIAgentRecommendation {
  id: string;
  name: string;
  acronym: string;
  purpose: string;
  expectedImpact: string;
  clinicalDomain: string;
  timeframe: 'Immediate (0-3 Months)' | 'Mid-Term (3-6 Months)' | 'Long-Term (6-12 Months)';
  complexity: 'Low' | 'Medium' | 'High';
  targetFriction: string;
  humanInLoopProtocol: string;
  estimatedCostReduction: string;
  hcahpsLiftEstimate: string;
}

export interface ExecutivePriority {
  rank: number;
  title: string;
  rationale: string;
  timeframe: '0-3 Months (Quick Win)' | '3-6 Months' | '6-12 Months (Strategic AI)';
  serviceLineImpact: string;
  expectedOutcome: string;
  metricToMove: string;
  leadOwner: string;
}

export interface CAIOQuestionAnswer {
  questionNumber: number;
  question: string;
  executiveSummary: string;
  keyMetrics: { label: string; value: string; trend?: string }[];
  actionPlan: string[];
}

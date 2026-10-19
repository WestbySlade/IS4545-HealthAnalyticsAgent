import { PatientFeedback, ServiceLine, VisitType, PatientPersona } from '../types/healthcare';

export interface DashboardMetrics {
  totalComments: number;
  avgSatisfaction: number;
  avgCommunication: number;
  followUpComplianceRate: number;
  serviceLinesCount: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  avgWaitTime: number;
  flaggedRiskCount: number;
  hallucinationTrapsCount: number;
  biasRisksCount: number;
  humanReviewCount: number;
}

export function computeExecutiveKPIs(data: PatientFeedback[]): DashboardMetrics {
  const total = data.length;
  if (total === 0) {
    return {
      totalComments: 0,
      avgSatisfaction: 0,
      avgCommunication: 0,
      followUpComplianceRate: 0,
      serviceLinesCount: 0,
      positiveCount: 0,
      neutralCount: 0,
      negativeCount: 0,
      positivePct: 0,
      neutralPct: 0,
      negativePct: 0,
      avgWaitTime: 0,
      flaggedRiskCount: 0,
      hallucinationTrapsCount: 0,
      biasRisksCount: 0,
      humanReviewCount: 0
    };
  }

  const sumSat = data.reduce((acc, curr) => acc + curr.satisfactionScore, 0);
  const sumComm = data.reduce((acc, curr) => acc + curr.communicationRating, 0);
  const compliantCount = data.filter((d) => d.followUpCompliance).length;
  const uniqueServiceLines = new Set(data.map((d) => d.serviceLine)).size;

  const pos = data.filter((d) => d.sentiment === 'positive').length;
  const neu = data.filter((d) => d.sentiment === 'neutral').length;
  const neg = data.filter((d) => d.sentiment === 'negative').length;

  const totalWait = data.reduce((acc, curr) => acc + curr.waitTimeMinutes, 0);

  const hallucinationTraps = data.filter((d) => d.aiRisk.hallucinationTrap).length;
  const biasRisks = data.filter((d) => d.aiRisk.biasRisk).length;
  const humanReviews = data.filter((d) => d.aiRisk.requiresHumanReview).length;
  const flaggedAny = data.filter(
    (d) => d.aiRisk.hallucinationTrap || d.aiRisk.biasRisk || d.aiRisk.requiresHumanReview
  ).length;

  return {
    totalComments: total,
    avgSatisfaction: +(sumSat / total).toFixed(2),
    avgCommunication: +(sumComm / total).toFixed(2),
    followUpComplianceRate: +((compliantCount / total) * 100).toFixed(1),
    serviceLinesCount: uniqueServiceLines,
    positiveCount: pos,
    neutralCount: neu,
    negativeCount: neg,
    positivePct: +((pos / total) * 100).toFixed(1),
    neutralPct: +((neu / total) * 100).toFixed(1),
    negativePct: +((neg / total) * 100).toFixed(1),
    avgWaitTime: Math.round(totalWait / total),
    flaggedRiskCount: flaggedAny,
    hallucinationTrapsCount: hallucinationTraps,
    biasRisksCount: biasRisks,
    humanReviewCount: humanReviews
  };
}

export interface DistributionItem {
  label: string;
  count: number;
  percentage: number;
  avgSatisfaction?: number;
  avgCommunication?: number;
}

export function computeSatisfactionDistribution(data: PatientFeedback[]): DistributionItem[] {
  const scores = [1, 2, 3, 4, 5];
  const total = data.length || 1;
  return scores.map((score) => {
    const matching = data.filter((d) => Math.round(d.satisfactionScore) === score);
    return {
      label: `${score} Star${score > 1 ? 's' : ''}`,
      count: matching.length,
      percentage: +((matching.length / total) * 100).toFixed(1)
    };
  });
}

export function computeSatisfactionByServiceLine(data: PatientFeedback[]) {
  const map: { [key in ServiceLine]?: { count: number; sumSat: number; sumComm: number; negCount: number } } = {};
  data.forEach((d) => {
    if (!map[d.serviceLine]) {
      map[d.serviceLine] = { count: 0, sumSat: 0, sumComm: 0, negCount: 0 };
    }
    const rec = map[d.serviceLine]!;
    rec.count += 1;
    rec.sumSat += d.satisfactionScore;
    rec.sumComm += d.communicationRating;
    if (d.sentiment === 'negative') rec.negCount += 1;
  });

  return Object.entries(map).map(([key, val]) => {
    return {
      serviceLine: key as ServiceLine,
      count: val.count,
      avgSatisfaction: +(val.sumSat / val.count).toFixed(2),
      avgCommunication: +(val.sumComm / val.count).toFixed(2),
      complaintRate: +((val.negCount / val.count) * 100).toFixed(1)
    };
  }).sort((a, b) => b.count - a.count);
}

export function computeSatisfactionByVisitType(data: PatientFeedback[]) {
  const visitTypes: VisitType[] = ['Emergency', 'Inpatient', 'Outpatient', 'Telehealth'];
  return visitTypes.map((vt) => {
    const records = data.filter((d) => d.visitType === vt);
    const count = records.length;
    const avgSat = count > 0 ? +(records.reduce((a, b) => a + b.satisfactionScore, 0) / count).toFixed(2) : 0;
    const avgComm = count > 0 ? +(records.reduce((a, b) => a + b.communicationRating, 0) / count).toFixed(2) : 0;
    const avgWait = count > 0 ? Math.round(records.reduce((a, b) => a + b.waitTimeMinutes, 0) / count) : 0;
    return {
      visitType: vt,
      count,
      avgSatisfaction: avgSat,
      avgCommunication: avgComm,
      avgWaitTime: avgWait
    };
  });
}

export function computeSatisfactionByPersona(data: PatientFeedback[]) {
  const personas: PatientPersona[] = [
    'Senior Chronic Care (65+)',
    'Tech-Savvy Young Adult',
    'Non-English Preferred',
    'Working Parent',
    'Vulnerable / Underinsured'
  ];

  return personas.map((p) => {
    const records = data.filter((d) => d.persona === p);
    const count = records.length;
    const avgSat = count > 0 ? +(records.reduce((a, b) => a + b.satisfactionScore, 0) / count).toFixed(2) : 0;
    const avgComm = count > 0 ? +(records.reduce((a, b) => a + b.communicationRating, 0) / count).toFixed(2) : 0;
    const complianceRate = count > 0 ? +((records.filter((r) => r.followUpCompliance).length / count) * 100).toFixed(1) : 0;
    return {
      persona: p,
      count,
      avgSatisfaction: avgSat,
      avgCommunication: avgComm,
      complianceRate
    };
  });
}

export interface ThemeMetric {
  theme: string;
  count: number;
  percentage: number;
  avgSatisfaction: number;
  negativeRate: number;
}

export function computeThemeAnalysis(data: PatientFeedback[]): ThemeMetric[] {
  const themeMap: { [key: string]: { count: number; sumSat: number; negCount: number } } = {};
  data.forEach((d) => {
    d.themes.forEach((t) => {
      if (!themeMap[t]) themeMap[t] = { count: 0, sumSat: 0, negCount: 0 };
      themeMap[t].count += 1;
      themeMap[t].sumSat += d.satisfactionScore;
      if (d.sentiment === 'negative') themeMap[t].negCount += 1;
    });
  });

  const total = data.length || 1;
  return Object.entries(themeMap)
    .map(([theme, val]) => ({
      theme,
      count: val.count,
      percentage: +((val.count / total) * 100).toFixed(1),
      avgSatisfaction: +(val.sumSat / val.count).toFixed(2),
      negativeRate: +((val.negCount / val.count) * 100).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count);
}

export interface KeywordMetric {
  word: string;
  frequency: number;
  sentimentTrend: 'negative' | 'positive' | 'mixed';
  avgScore: number;
}

export function computeKeywordFrequencies(data: PatientFeedback[]): KeywordMetric[] {
  const map: { [key: string]: { count: number; sumScore: number; negCount: number; posCount: number } } = {};
  data.forEach((d) => {
    d.keywords.forEach((kw) => {
      const normalized = kw.trim().toLowerCase();
      if (!map[normalized]) {
        map[normalized] = { count: 0, sumScore: 0, negCount: 0, posCount: 0 };
      }
      map[normalized].count += 1;
      map[normalized].sumScore += d.satisfactionScore;
      if (d.sentiment === 'negative') map[normalized].negCount += 1;
      if (d.sentiment === 'positive') map[normalized].posCount += 1;
    });
  });

  return Object.entries(map)
    .map(([word, val]) => {
      let trend: 'negative' | 'positive' | 'mixed' = 'mixed';
      if (val.negCount > val.posCount) trend = 'negative';
      else if (val.posCount > val.negCount) trend = 'positive';
      return {
        word,
        frequency: val.count,
        sentimentTrend: trend,
        avgScore: +(val.sumScore / val.count).toFixed(2)
      };
    })
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 24);
}

export function computeOrganizationalProblems(data: PatientFeedback[]) {
  const bottleneckCounts: { [key: string]: number } = {
    'Wait Times': 0,
    'Communication Gap': 0,
    'Tech Barrier': 0,
    'Scheduling Delay': 0,
    'Discharge Hand-off': 0
  };

  const highWaitCases = data.filter((d) => d.waitTimeMinutes >= 90);
  const techIssues = data.filter((d) => d.bottleneckType === 'Tech Barrier');
  const schedulingIssues = data.filter((d) => d.bottleneckType === 'Scheduling Delay');
  const communicationGaps = data.filter((d) => d.bottleneckType === 'Communication Gap');

  data.forEach((d) => {
    if (d.bottleneckType && bottleneckCounts[d.bottleneckType] !== undefined) {
      bottleneckCounts[d.bottleneckType] += 1;
    }
  });

  return {
    bottleneckCounts,
    highWaitCount: highWaitCases.length,
    techIssuesCount: techIssues.length,
    schedulingIssuesCount: schedulingIssues.length,
    communicationGapsCount: communicationGaps.length,
    totalBottlenecks: Object.values(bottleneckCounts).reduce((a, b) => a + b, 0)
  };
}

export function computeEquityMetrics(data: PatientFeedback[]) {
  const languageCases = data.filter((d) => d.equityConcerns.includes('Language Barrier'));
  const digitalLiteracyCases = data.filter((d) => d.equityConcerns.includes('Digital Literacy'));
  const physicalAccessCases = data.filter((d) => d.equityConcerns.includes('Physical Accessibility'));
  const financialStrainCases = data.filter((d) => d.equityConcerns.includes('Financial Strain'));
  const transportationCases = data.filter((d) => d.equityConcerns.includes('Transportation'));

  const eslAvgSat =
    languageCases.length > 0
      ? +(languageCases.reduce((a, b) => a + b.satisfactionScore, 0) / languageCases.length).toFixed(2)
      : 0;

  const seniorData = data.filter((d) => d.persona === 'Senior Chronic Care (65+)');
  const seniorAvgSat =
    seniorData.length > 0
      ? +(seniorData.reduce((a, b) => a + b.satisfactionScore, 0) / seniorData.length).toFixed(2)
      : 0;

  return {
    languageCount: languageCases.length,
    digitalLiteracyCount: digitalLiteracyCases.length,
    physicalAccessCount: physicalAccessCases.length,
    financialStrainCount: financialStrainCases.length,
    transportationCount: transportationCases.length,
    eslAvgSat,
    seniorAvgSat
  };
}

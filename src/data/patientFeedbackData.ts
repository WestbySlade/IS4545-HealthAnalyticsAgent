import {
  PatientFeedback,
  AIAgentRecommendation,
  ExecutivePriority,
  CAIOQuestionAnswer
} from '../types/healthcare';

export const INITIAL_PATIENT_FEEDBACK: PatientFeedback[] = [
  {
    id: 'FB-1001',
    patientId: 'PT-8831',
    date: '2026-09-14',
    serviceLine: 'Emergency Medicine',
    visitType: 'Emergency',
    persona: 'Vulnerable / Underinsured',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: false,
    waitTimeMinutes: 285,
    sentiment: 'negative',
    comment:
      'Waited 4.5 hours in the ER waiting room with excruciating abdominal pain. No one updated me or explained the triage queue. When the doctor finally saw me, he rushed through the exam in 3 minutes and did not answer my questions about generic prescription alternatives I could afford.',
    themes: ['Wait Times', 'Bedside Manner & Empathy', 'Billing & Insurance'],
    keywords: ['emergency wait', 'triage queue', 'rush', 'unanswered questions', 'prescription cost'],
    bottleneckType: 'Wait Times',
    equityConcerns: ['Financial Strain'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: true,
      requiresHumanReview: true,
      riskType: 'Demographic Pain Inequity',
      riskNote: 'Patient reports severe under-triage and dismissal of acute abdominal pain; unaddressed financial constraints.',
      governanceAction: 'Escalate to ED Nurse Director and Social Work patient advocate.'
    }
  },
  {
    id: 'FB-1002',
    patientId: 'PT-4109',
    date: '2026-09-15',
    serviceLine: 'Cardiology',
    visitType: 'Outpatient',
    persona: 'Senior Chronic Care (65+)',
    satisfactionScore: 2,
    communicationRating: 2,
    followUpCompliance: false,
    waitTimeMinutes: 45,
    sentiment: 'negative',
    comment:
      'The automated portal generated a medication reconciliation summary that had conflicting advice with what Dr. Vance told me verbally regarding my Metoprolol and Eliquis timing. When I called the cardiology triage line to verify, I got voicemail and never heard back.',
    themes: ['Medication Instructions', 'Portal & Mobile App', 'Care Coordination'],
    keywords: ['conflicting medication', 'Eliquis', 'Metoprolol', 'portal summary', 'voicemail'],
    bottleneckType: 'Communication Gap',
    equityConcerns: ['Digital Literacy'],
    aiRisk: {
      hallucinationTrap: true,
      biasRisk: false,
      requiresHumanReview: true,
      riskType: 'Contradictory Care Instruction',
      riskNote: 'Automated digital discharge summary contradicted oral physician regimen for high-alert anticoagulants.',
      governanceAction: 'Immediate pharmacy outreach; audit LLM/EHR discharge summary sync template.'
    }
  },
  {
    id: 'FB-1003',
    patientId: 'PT-7220',
    date: '2026-09-16',
    serviceLine: 'Oncology',
    visitType: 'Outpatient',
    persona: 'Non-English Preferred',
    satisfactionScore: 2,
    communicationRating: 2,
    followUpCompliance: true,
    waitTimeMinutes: 70,
    sentiment: 'negative',
    comment:
      'Mi madre necesitaba una explicacin detallada de sus ciclos de quimioterapia. Esperamos 45 minutos adicionales por un intrprete mdico y al final nos dieron folletos solo en ingls. Los efectos secundarios la aterrorizan y no pudimos entender las advertencias de fiebre.',
    themes: ['Language & Interpreter', 'Care Coordination', 'Bedside Manner & Empathy'],
    keywords: ['intérprete', 'quimioterapia', 'folletos inglés', 'efectos secundarios', 'barrera de idioma'],
    bottleneckType: 'Communication Gap',
    equityConcerns: ['Language Barrier'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: true,
      requiresHumanReview: true,
      riskType: 'Critical Adverse Event',
      riskNote: 'Neutropenic fever warning instructions failed delivery due to lack of certified Spanish translation.',
      governanceAction: 'Immediate oncology nurse navigator follow-up with certified medical interpreter; furnish translated chemotherapy toxicity protocols.'
    }
  },
  {
    id: 'FB-1004',
    patientId: 'PT-9943',
    date: '2026-09-17',
    serviceLine: 'Pediatrics',
    visitType: 'Outpatient',
    persona: 'Working Parent',
    satisfactionScore: 5,
    communicationRating: 5,
    followUpCompliance: true,
    waitTimeMinutes: 10,
    sentiment: 'positive',
    comment:
      'Dr. Alvarez was incredible with our 4-year-old daughter. She got down on eye level, turned the ear check into a game, and sent follow-up reminders directly via SMS with clear visual milestones for her asthma action plan. Zero friction, zero wait.',
    themes: ['Bedside Manner & Empathy', 'Care Coordination'],
    keywords: ['child friendly', 'asthma action plan', 'SMS reminders', 'empathy', 'on time'],
    bottleneckType: 'None',
    equityConcerns: [],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Exemplary pediatric encounter; strong protocol compliance.',
      governanceAction: 'None.'
    }
  },
  {
    id: 'FB-1005',
    patientId: 'PT-3312',
    date: '2026-09-18',
    serviceLine: 'Orthopedics',
    visitType: 'Inpatient',
    persona: 'Senior Chronic Care (65+)',
    satisfactionScore: 4,
    communicationRating: 4,
    followUpCompliance: true,
    waitTimeMinutes: 20,
    sentiment: 'positive',
    comment:
      'Total knee replacement went smoothly. The surgical staff and physical therapy teams worked in great harmony. The only minor inconvenience was that the wheelchair transport to the curb was delayed by 35 minutes upon discharge.',
    themes: ['Care Coordination', 'Facility Cleanliness & Noise'],
    keywords: ['knee replacement', 'physical therapy', 'transport delay', 'wheelchair'],
    bottleneckType: 'Discharge Hand-off',
    equityConcerns: ['Physical Accessibility'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Standard post-op feedback; discharge dispatch bottleneck.',
      governanceAction: 'Include in transport capacity scheduling metrics.'
    }
  },
  {
    id: 'FB-1006',
    patientId: 'PT-6611',
    date: '2026-09-19',
    serviceLine: 'Neurology',
    visitType: 'Outpatient',
    persona: 'Senior Chronic Care (65+)',
    satisfactionScore: 1,
    communicationRating: 2,
    followUpCompliance: false,
    waitTimeMinutes: 90,
    sentiment: 'negative',
    comment:
      'It took 4 months to get this memory assessment appointment. When we arrived, the clinic told us the referral was missing authorization codes from our primary care clinic. Neither clinic communicated with each other, and we had to reschedule for November.',
    themes: ['Care Coordination', 'Scheduling Delay'],
    keywords: ['4 month wait', 'memory clinic', 'lost referral', 'authorization code', 'uncoordinated'],
    bottleneckType: 'Scheduling Delay',
    equityConcerns: ['Transportation'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: true,
      riskType: 'None',
      riskNote: 'Breakdown in cross-clinic EHR interoperability and referral authorization causing critical diagnostic delay in dementia workup.',
      governanceAction: 'Expedited neurology access review; trigger automatic prior-auth verification.'
    }
  },
  {
    id: 'FB-1007',
    patientId: 'PT-5521',
    date: '2026-09-20',
    serviceLine: 'Obstetrics & Gynecology',
    visitType: 'Inpatient',
    persona: 'Tech-Savvy Young Adult',
    satisfactionScore: 4,
    communicationRating: 5,
    followUpCompliance: true,
    waitTimeMinutes: 15,
    sentiment: 'positive',
    comment:
      'The labor and delivery nurses were compassionate angels. The postpartum app allowed us to log feeds and ask lactation consultants questions, which made bringing our first baby home much less intimidating.',
    themes: ['Bedside Manner & Empathy', 'Portal & Mobile App', 'Care Coordination'],
    keywords: ['labor delivery', 'lactation support', 'postpartum app', 'compassionate'],
    bottleneckType: 'None',
    equityConcerns: [],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'High engagement with maternal health digital app.',
      governanceAction: 'None.'
    }
  },
  {
    id: 'FB-1008',
    patientId: 'PT-1877',
    date: '2026-09-21',
    serviceLine: 'General Surgery',
    visitType: 'Inpatient',
    persona: 'Senior Chronic Care (65+)',
    satisfactionScore: 2,
    communicationRating: 2,
    followUpCompliance: false,
    waitTimeMinutes: 50,
    sentiment: 'negative',
    comment:
      'Was discharged after gallbladder surgery with 8 pages of dense medical jargon printed out. I have macular degeneration and cannot read 9pt font. Asked for large print or an audio summary, but the clerk said the computer does not print bigger letters.',
    themes: ['Discharge Clarity', 'Care Coordination'],
    keywords: ['gallbladder', 'medical jargon', 'macular degeneration', 'small font', 'accessibility'],
    bottleneckType: 'Discharge Hand-off',
    equityConcerns: ['Physical Accessibility', 'Digital Literacy'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: true,
      riskType: 'None',
      riskNote: 'EHR discharge template fails ADA compliance for low-vision patients; elevated readmission risk.',
      governanceAction: 'Implement multimodal accessibility discharge formatting (TTS + large-print).'
    }
  },
  {
    id: 'FB-1009',
    patientId: 'PT-2299',
    date: '2026-09-22',
    serviceLine: 'Emergency Medicine',
    visitType: 'Emergency',
    persona: 'Tech-Savvy Young Adult',
    satisfactionScore: 2,
    communicationRating: 3,
    followUpCompliance: false,
    waitTimeMinutes: 210,
    sentiment: 'negative',
    comment:
      'I tried using the health system AI symptom chatbot before coming in. It categorized my severe chest tightness as mild anxiety and told me to rest. When I came to the ER on a hunch, the troponin test showed an acute cardiac event. That chatbot advice was dangerously misleading.',
    themes: ['Portal & Mobile App', 'Wait Times'],
    keywords: ['AI symptom chatbot', 'dangerous advice', 'chest pain', 'troponin', 'hallucination'],
    bottleneckType: 'Tech Barrier',
    equityConcerns: [],
    aiRisk: {
      hallucinationTrap: true,
      biasRisk: false,
      requiresHumanReview: true,
      riskType: 'Misleading Chatbot Guidance',
      riskNote: 'Unregulated patient-facing conversational AI gave false reassurance for ACS (acute coronary syndrome) symptoms.',
      governanceAction: 'Urgent CAIO and Clinical Governance review; suspend triage LLM until clinical boundaries and red-flag escalation are locked down.'
    }
  },
  {
    id: 'FB-1010',
    patientId: 'PT-3345',
    date: '2026-09-23',
    serviceLine: 'Cardiology',
    visitType: 'Telehealth',
    persona: 'Senior Chronic Care (65+)',
    satisfactionScore: 3,
    communicationRating: 3,
    followUpCompliance: true,
    waitTimeMinutes: 25,
    sentiment: 'neutral',
    comment:
      'The video connection kept dropping every 4 minutes. Dr. Lee was patient and tried calling my landline, but we could not review my Holter monitor results visually as intended. Video platform needs to be far more stable for rural seniors.',
    themes: ['Portal & Mobile App', 'Care Coordination'],
    keywords: ['telehealth drop', 'video connection', 'Holter monitor', 'rural bandwidth'],
    bottleneckType: 'Tech Barrier',
    equityConcerns: ['Digital Literacy'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Telehealth platform latency and audio/video bandwidth degradation.',
      governanceAction: 'Deploy low-bandwidth adaptive telehealth fallback mode.'
    }
  },
  {
    id: 'FB-1011',
    patientId: 'PT-4488',
    date: '2026-09-24',
    serviceLine: 'Oncology',
    visitType: 'Outpatient',
    persona: 'Working Parent',
    satisfactionScore: 3,
    communicationRating: 4,
    followUpCompliance: true,
    waitTimeMinutes: 55,
    sentiment: 'neutral',
    comment:
      'The clinical team is world-class, but the scheduling department has zero flexibility for working parents. Every infusion appointment is only offered during 10am-2pm on weekdays, forcing me to burn through all my family medical leave.',
    themes: ['Scheduling Delay', 'Care Coordination'],
    keywords: ['infusion schedule', 'work conflict', 'inflexible hours', 'family leave'],
    bottleneckType: 'Scheduling Delay',
    equityConcerns: ['Financial Strain'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Infusion chair allocation lacks flexible evening or weekend micro-shift blocks.',
      governanceAction: 'Evaluate extended-hours chair scheduling algorithm.'
    }
  },
  {
    id: 'FB-1012',
    patientId: 'PT-9012',
    date: '2026-09-25',
    serviceLine: 'Pediatrics',
    visitType: 'Telehealth',
    persona: 'Non-English Preferred',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: false,
    waitTimeMinutes: 40,
    sentiment: 'negative',
    comment:
      'Trying to log into the patient portal required receiving a security code via email, which was only written in complex English. We could not get the translator on the video screen simultaneously, so the pediatrician had to terminate the visit after 10 minutes.',
    themes: ['Language & Interpreter', 'Portal & Mobile App'],
    keywords: ['portal 2FA', 'English only', 'no simultaneous translator', 'cancelled visit'],
    bottleneckType: 'Tech Barrier',
    equityConcerns: ['Language Barrier', 'Digital Literacy'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: true,
      requiresHumanReview: true,
      riskType: 'Demographic Pain Inequity',
      riskNote: 'Dual-barrier authentication and telehealth architecture structurally excludes non-English speaking families.',
      governanceAction: 'Prioritize multilingual 2FA and integrated 3-way interpreter telehealth bridging.'
    }
  },
  {
    id: 'FB-1013',
    patientId: 'PT-7734',
    date: '2026-09-26',
    serviceLine: 'Emergency Medicine',
    visitType: 'Emergency',
    persona: 'Senior Chronic Care (65+)',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: false,
    waitTimeMinutes: 320,
    sentiment: 'negative',
    comment:
      'Over 5 hours waiting on a hard plastic chair while feeling dizzy and dehydrated. When I asked the desk nurse for water, she barked that patients cannot eat or drink until seen. Shift change occurred and no one knew what tests were ordered for me.',
    themes: ['Wait Times', 'Bedside Manner & Empathy', 'Care Coordination'],
    keywords: ['5 hour wait', 'shift change confusion', 'dehydrated', 'rudeness', 'lost orders'],
    bottleneckType: 'Wait Times',
    equityConcerns: ['Physical Accessibility'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: true,
      riskType: 'Critical Adverse Event',
      riskNote: 'Unsupervised geriatric patient experiencing syncope symptoms; nursing shift communication breakdown.',
      governanceAction: 'ED shift change handover checklist audit; hydration protocol review.'
    }
  },
  {
    id: 'FB-1014',
    patientId: 'PT-6029',
    date: '2026-09-27',
    serviceLine: 'Cardiology',
    visitType: 'Inpatient',
    persona: 'Tech-Savvy Young Adult',
    satisfactionScore: 5,
    communicationRating: 5,
    followUpCompliance: true,
    waitTimeMinutes: 10,
    sentiment: 'positive',
    comment:
      'Post-catheterization care was seamless. The nursing team utilized digital bedside tablets to explain my echocardiogram images and walked me through my heart rate variability stats. Discharge summary appeared in Apple Health within minutes.',
    themes: ['Bedside Manner & Empathy', 'Discharge Clarity', 'Portal & Mobile App'],
    keywords: ['cardiac catheterization', 'bedside tablet', 'Apple Health sync', 'clear explanation'],
    bottleneckType: 'None',
    equityConcerns: [],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Exemplary tech-enabled care coordination and patient engagement.',
      governanceAction: 'None.'
    }
  },
  {
    id: 'FB-1015',
    patientId: 'PT-8190',
    date: '2026-09-28',
    serviceLine: 'Orthopedics',
    visitType: 'Outpatient',
    persona: 'Vulnerable / Underinsured',
    satisfactionScore: 2,
    communicationRating: 3,
    followUpCompliance: false,
    waitTimeMinutes: 60,
    sentiment: 'negative',
    comment:
      'The surgeon recommended an MRI, but nobody would tell me how much it would cost under my high-deductible plan. I spent two weeks calling pre-authorization with conflicting numbers given. I ended up skipping the scan out of fear of a $3,000 surprise bill.',
    themes: ['Billing & Insurance', 'Care Coordination'],
    keywords: ['price transparency', 'MRI cost', 'pre-auth delay', 'skipped scan', 'surprise bill'],
    bottleneckType: 'Communication Gap',
    equityConcerns: ['Financial Strain'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Absence of upfront price estimate directly resulted in diagnostic care abandonment.',
      governanceAction: 'Implement real-time patient out-of-pocket estimation tool at point of order.'
    }
  },
  {
    id: 'FB-1016',
    patientId: 'PT-1244',
    date: '2026-09-29',
    serviceLine: 'Obstetrics & Gynecology',
    visitType: 'Outpatient',
    persona: 'Non-English Preferred',
    satisfactionScore: 4,
    communicationRating: 4,
    followUpCompliance: true,
    waitTimeMinutes: 20,
    sentiment: 'positive',
    comment:
      'The clinic provided an in-person medical interpreter named Sofia who stayed throughout my prenatal anatomy scan. She translated every medical term clearly to Mandarin and ensured I felt respected and heard.',
    themes: ['Language & Interpreter', 'Bedside Manner & Empathy'],
    keywords: ['Mandarin interpreter', 'prenatal scan', 'respect', 'clear explanation'],
    bottleneckType: 'None',
    equityConcerns: [],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Model example of effective language access in prenatal care.',
      governanceAction: 'Benchmark Mandarin interpreter availability.'
    }
  },
  {
    id: 'FB-1017',
    patientId: 'PT-5012',
    date: '2026-09-30',
    serviceLine: 'General Surgery',
    visitType: 'Outpatient',
    persona: 'Working Parent',
    satisfactionScore: 3,
    communicationRating: 3,
    followUpCompliance: true,
    waitTimeMinutes: 35,
    sentiment: 'neutral',
    comment:
      'Pre-op instructions said nothing about where to park or how far the surgical pavilion was from the lot. Hauling my stroller across two parking garages while fasting was stressful. Better maps and signage are badly needed.',
    themes: ['Facility Cleanliness & Noise', 'Care Coordination'],
    keywords: ['parking distance', 'wayfinding', 'signage', 'stroller'],
    bottleneckType: 'Tech Barrier',
    equityConcerns: ['Physical Accessibility'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Hospital campus wayfinding friction.',
      governanceAction: 'Deploy SMS pre-visit wayfinding link with designated parking bay maps.'
    }
  },
  {
    id: 'FB-1018',
    patientId: 'PT-6391',
    date: '2026-10-01',
    serviceLine: 'Neurology',
    visitType: 'Inpatient',
    persona: 'Senior Chronic Care (65+)',
    satisfactionScore: 4,
    communicationRating: 4,
    followUpCompliance: true,
    waitTimeMinutes: 15,
    sentiment: 'positive',
    comment:
      'Dr. Kapoor spent 40 minutes reviewing my Parkinson medication regimen. The nurses were attentive and managed night alarms effectively so I could finally sleep. The follow-up telehealth appointment was booked before I even left the ward.',
    themes: ['Bedside Manner & Empathy', 'Medication Instructions', 'Care Coordination'],
    keywords: ['Parkinson', 'medication review', 'quiet night', 'discharge follow-up'],
    bottleneckType: 'None',
    equityConcerns: [],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Strong multidisciplinary chronic neurology care.',
      governanceAction: 'None.'
    }
  },
  {
    id: 'FB-1019',
    patientId: 'PT-7108',
    date: '2026-10-02',
    serviceLine: 'Emergency Medicine',
    visitType: 'Emergency',
    persona: 'Non-English Preferred',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: false,
    waitTimeMinutes: 240,
    sentiment: 'negative',
    comment:
      'They handed my 12-year-old son the consent papers to translate for my chest infection because no Arabic interpreter was logged into the video cart. Having a child translate complex medical terms is unacceptable and dangerous.',
    themes: ['Language & Interpreter', 'Care Coordination', 'Wait Times'],
    keywords: ['child translating', 'Arabic interpreter missing', 'consent papers', 'unacceptable'],
    bottleneckType: 'Communication Gap',
    equityConcerns: ['Language Barrier'],
    aiRisk: {
      hallucinationTrap: false,
      biasRisk: true,
      requiresHumanReview: true,
      riskType: 'Contradictory Care Instruction',
      riskNote: 'Severe compliance violation: child used for medical interpretation and legal consent.',
      governanceAction: 'Immediate report to Office of Civil Rights & Hospital Compliance Officer; lock ED interpreter SLA.'
    }
  },
  {
    id: 'FB-1020',
    patientId: 'PT-9801',
    date: '2026-10-03',
    serviceLine: 'Pediatrics',
    visitType: 'Emergency',
    persona: 'Working Parent',
    satisfactionScore: 2,
    communicationRating: 2,
    followUpCompliance: true,
    waitTimeMinutes: 190,
    sentiment: 'negative',
    comment:
      'The automated prescription text sent us to a 24-hour pharmacy that was permanently closed. We spent 2 hours in the middle of the night searching for open antibiotics for our 2-year-old with a 104 fever. The hospital computer data is completely outdated.',
    themes: ['Portal & Mobile App', 'Medication Instructions', 'Care Coordination'],
    keywords: ['closed pharmacy', 'antibiotics delay', 'pediatric fever', 'outdated data'],
    bottleneckType: 'Tech Barrier',
    equityConcerns: ['Transportation'],
    aiRisk: {
      hallucinationTrap: true,
      biasRisk: false,
      requiresHumanReview: true,
      riskType: 'Pediatric Dosing Ambiguity',
      riskNote: 'Outdated EHR pharmacy routing directory resulted in acute delay of pediatric antibiotic administration.',
      governanceAction: 'Implement real-time pharmacy open-hours verification API in e-prescribing module.'
    }
  }
];

// Generate additional realistic records to achieve 160 richly detailed patient feedback items
const ADDITIONAL_SERVICE_LINES: { [key: string]: { avgWait: number; typicalThemes: string[] } } = {
  'Emergency Medicine': { avgWait: 195, typicalThemes: ['Wait Times', 'Bedside Manner & Empathy', 'Care Coordination', 'Facility Cleanliness & Noise'] },
  'Cardiology': { avgWait: 38, typicalThemes: ['Medication Instructions', 'Care Coordination', 'Portal & Mobile App', 'Bedside Manner & Empathy'] },
  'Oncology': { avgWait: 52, typicalThemes: ['Scheduling Delay', 'Care Coordination', 'Bedside Manner & Empathy', 'Language & Interpreter'] },
  'Orthopedics': { avgWait: 42, typicalThemes: ['Care Coordination', 'Billing & Insurance', 'Discharge Clarity', 'Wait Times'] },
  'Pediatrics': { avgWait: 28, typicalThemes: ['Bedside Manner & Empathy', 'Portal & Mobile App', 'Care Coordination', 'Wait Times'] },
  'Neurology': { avgWait: 48, typicalThemes: ['Scheduling Delay', 'Care Coordination', 'Medication Instructions'] },
  'Obstetrics & Gynecology': { avgWait: 26, typicalThemes: ['Bedside Manner & Empathy', 'Care Coordination', 'Discharge Clarity'] },
  'General Surgery': { avgWait: 34, typicalThemes: ['Discharge Clarity', 'Care Coordination', 'Billing & Insurance', 'Facility Cleanliness & Noise'] }
};

const SAMPLE_COMMENTS: {
  sentiment: 'positive' | 'neutral' | 'negative';
  satisfaction: number;
  commRating: number;
  persona: PatientFeedback['persona'];
  serviceLine: PatientFeedback['serviceLine'];
  visitType: PatientFeedback['visitType'];
  comment: string;
  themes: string[];
  keywords: string[];
  bottleneck: PatientFeedback['bottleneckType'];
  equity: PatientFeedback['equityConcerns'];
  risk: PatientFeedback['aiRisk'];
}[] = [
  {
    sentiment: 'negative',
    satisfaction: 1,
    commRating: 2,
    persona: 'Senior Chronic Care (65+)',
    serviceLine: 'Emergency Medicine',
    visitType: 'Emergency',
    comment: 'The waiting area was chaotic and freezing. After waiting 4 hours, nobody told me why younger patients who came after me were seen first. I felt ignored and left before seeing the physician.',
    themes: ['Wait Times', 'Bedside Manner & Empathy'],
    keywords: ['chaotic wait', 'left without being seen', 'triage confusion', 'ignored'],
    bottleneck: 'Wait Times',
    equity: ['Physical Accessibility'],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: true,
      riskType: 'Critical Adverse Event',
      riskNote: 'Patient Left Without Being Seen (LWBS) - critical clinical safety indicator in elderly cohort.',
      governanceAction: 'Follow-up safety outreach within 24 hours.'
    }
  },
  {
    sentiment: 'positive',
    satisfaction: 5,
    commRating: 5,
    persona: 'Senior Chronic Care (65+)',
    serviceLine: 'Cardiology',
    visitType: 'Outpatient',
    comment: 'Dr. Patel is a saint. He took time to draw a diagram of my heart valve and carefully coordinated with my nephrologist to protect my kidneys. Excellent follow-up packet printed in clear font.',
    themes: ['Bedside Manner & Empathy', 'Care Coordination', 'Discharge Clarity'],
    keywords: ['diagram explanation', 'nephrologist sync', 'valve repair', 'thorough doctor'],
    bottleneck: 'None',
    equity: [],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Exemplary chronic multi-specialty care.',
      governanceAction: 'None.'
    }
  },
  {
    sentiment: 'negative',
    satisfaction: 2,
    commRating: 1,
    persona: 'Non-English Preferred',
    serviceLine: 'Cardiology',
    visitType: 'Inpatient',
    comment: 'My family speaks Cantonese. The nurse used Google Translate on her personal phone to explain my pacemaker restrictions. Some translations made no sense, like saying not to walk for 3 months instead of not lifting arms.',
    themes: ['Language & Interpreter', 'Care Coordination'],
    keywords: ['personal phone translate', 'Cantonese', 'pacemaker restriction error', 'unsafe'],
    bottleneck: 'Communication Gap',
    equity: ['Language Barrier'],
    risk: {
      hallucinationTrap: true,
      biasRisk: true,
      requiresHumanReview: true,
      riskType: 'Contradictory Care Instruction',
      riskNote: 'Unsanctioned consumer translation app generated dangerously flawed post-cardiac surgical restrictions.',
      governanceAction: 'Enforce certified enterprise translation policy; hospital device MDM audit.'
    }
  },
  {
    sentiment: 'negative',
    satisfaction: 2,
    commRating: 2,
    persona: 'Tech-Savvy Young Adult',
    serviceLine: 'Oncology',
    visitType: 'Outpatient',
    comment: 'The patient portal notified me of my pathology biopsy results at 11pm on a Friday night without any clinician context. Finding out bad news through an unmoderated push notification left me panicked all weekend.',
    themes: ['Portal & Mobile App', 'Bedside Manner & Empathy'],
    keywords: ['Friday night pathology notification', 'panic', 'unmoderated results', 'lack of clinician call'],
    bottleneck: 'Tech Barrier',
    equity: [],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: true,
      riskType: 'Contradictory Care Instruction',
      riskNote: 'Cures Act immediate release compliance gap: sensitive diagnostic release lacked physician delay guardrail.',
      governanceAction: 'Configure sensitive oncology result release delay until physician review.'
    }
  },
  {
    sentiment: 'positive',
    satisfaction: 5,
    commRating: 5,
    persona: 'Working Parent',
    serviceLine: 'Pediatrics',
    visitType: 'Telehealth',
    comment: 'The pediatrician answered our video call within 3 minutes of scheduling. She diagnosed our sons rash, ordered hydrocortisone directly to our grocery pharmacy, and saved us an ER trip in the rain.',
    themes: ['Bedside Manner & Empathy', 'Portal & Mobile App'],
    keywords: ['quick telehealth', 'pediatric rash', 'avoided ER', 'convenient'],
    bottleneck: 'None',
    equity: [],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Optimal acute low-acuity diversion to telehealth.',
      governanceAction: 'None.'
    }
  },
  {
    sentiment: 'negative',
    satisfaction: 2,
    commRating: 2,
    persona: 'Vulnerable / Underinsured',
    serviceLine: 'Obstetrics & Gynecology',
    visitType: 'Outpatient',
    comment: 'I felt judged the moment I mentioned I was on Medicaid. The receptionist was dismissive when I asked if the ultrasound was covered, and the doctor seemed eager to end the visit quickly.',
    themes: ['Bedside Manner & Empathy', 'Billing & Insurance'],
    keywords: ['Medicaid stigma', 'dismissive receptionist', 'rushed visit', 'disrespect'],
    bottleneck: 'Communication Gap',
    equity: ['Financial Strain'],
    risk: {
      hallucinationTrap: false,
      biasRisk: true,
      requiresHumanReview: true,
      riskType: 'Demographic Pain Inequity',
      riskNote: 'Payer-status discrimination reported by vulnerable maternal patient.',
      governanceAction: 'Front-desk bias training; patient relations outreach.'
    }
  },
  {
    sentiment: 'neutral',
    satisfaction: 3,
    commRating: 3,
    persona: 'Senior Chronic Care (65+)',
    serviceLine: 'Orthopedics',
    visitType: 'Outpatient',
    comment: 'Surgeon was competent, but the clinic waiting room was packed shoulder-to-shoulder with 45 minutes of delay past appointment time. No seating for people with walkers.',
    themes: ['Wait Times', 'Facility Cleanliness & Noise'],
    keywords: ['overbooked clinic', 'waiting room delay', 'walker seating missing'],
    bottleneck: 'Wait Times',
    equity: ['Physical Accessibility'],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Physical clinic capacity and double-booking strain.',
      governanceAction: 'Orthopedic clinic slot smoothing.'
    }
  },
  {
    sentiment: 'positive',
    satisfaction: 4,
    commRating: 5,
    persona: 'Tech-Savvy Young Adult',
    serviceLine: 'General Surgery',
    visitType: 'Outpatient',
    comment: 'Clear pre-op dietary instructions sent via SMS checklist with automated check-ins the morning of hernia repair. Made the preparation foolproof.',
    themes: ['Care Coordination', 'Portal & Mobile App'],
    keywords: ['SMS pre-op checklist', 'hernia prep', 'foolproof', 'clear instructions'],
    bottleneck: 'None',
    equity: [],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Effective asynchronous SMS preparation sequence.',
      governanceAction: 'None.'
    }
  },
  {
    sentiment: 'negative',
    satisfaction: 1,
    commRating: 2,
    persona: 'Non-English Preferred',
    serviceLine: 'Emergency Medicine',
    visitType: 'Emergency',
    comment: 'The discharge instructions were printed in English despite my chart clearly indicating Vietnamese as primary language. I almost took the antibiotic twice a day instead of once because I relied on an online translator.',
    themes: ['Language & Interpreter', 'Discharge Clarity', 'Medication Instructions'],
    keywords: ['Vietnamese discharge missing', 'dosing near-miss', 'online translation risk'],
    bottleneck: 'Discharge Hand-off',
    equity: ['Language Barrier'],
    risk: {
      hallucinationTrap: true,
      biasRisk: true,
      requiresHumanReview: true,
      riskType: 'Contradictory Care Instruction',
      riskNote: 'Near-miss adverse medication event caused by default English discharge paperwork.',
      governanceAction: 'Hard-stop EHR alert blocking discharge until patient language matches handout.'
    }
  },
  {
    sentiment: 'neutral',
    satisfaction: 3,
    commRating: 4,
    persona: 'Working Parent',
    serviceLine: 'Pediatrics',
    visitType: 'Inpatient',
    comment: 'Nurses were caring and gentle, but the call button response times at 3am were over 25 minutes when my sons IV bag was beeping loudly.',
    themes: ['Care Coordination', 'Facility Cleanliness & Noise'],
    keywords: ['beeping IV alarm', 'slow call bell', '3am nurse response'],
    bottleneck: 'Communication Gap',
    equity: [],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Nighttime telemetry alarm fatigue and staffing ratios.',
      governanceAction: 'Smart alarm filtering to reduce ward noise.'
    }
  },
  {
    sentiment: 'negative',
    satisfaction: 2,
    commRating: 2,
    persona: 'Senior Chronic Care (65+)',
    serviceLine: 'Neurology',
    visitType: 'Telehealth',
    comment: 'I spent 20 minutes trying to remember my portal password. When I hit password reset, it texted a code to a home landline that cannot receive texts. The appointment was marked as a no-show.',
    themes: ['Portal & Mobile App', 'Scheduling Delay'],
    keywords: ['landline 2FA failure', 'password reset', 'erroneous no-show'],
    bottleneck: 'Tech Barrier',
    equity: ['Digital Literacy'],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'Inflexible 2FA architecture misidentifies landlines as SMS endpoints, unfairly penalizing seniors with no-show fees.',
      governanceAction: 'Configure voice-call OTP option for landline patient accounts.'
    }
  },
  {
    sentiment: 'positive',
    satisfaction: 5,
    commRating: 4,
    persona: 'Senior Chronic Care (65+)',
    serviceLine: 'Oncology',
    visitType: 'Inpatient',
    comment: 'The infusion suites nurses treated my husband like family during his 6-hour chemotherapy session. Warm blankets, warm tea, and constant updates on lab results.',
    themes: ['Bedside Manner & Empathy', 'Care Coordination'],
    keywords: ['compassionate infusion nurses', 'warm blankets', 'constant lab updates'],
    bottleneck: 'None',
    equity: [],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'High patient satisfaction in oncology nursing.',
      governanceAction: 'None.'
    }
  },
  {
    sentiment: 'negative',
    satisfaction: 2,
    commRating: 2,
    persona: 'Vulnerable / Underinsured',
    serviceLine: 'Orthopedics',
    visitType: 'Outpatient',
    comment: 'I take two city buses to get to the orthopedic clinic. The doctor was 50 minutes late, which caused me to miss the last return bus and I had to walk 3 miles in a leg cast.',
    themes: ['Wait Times', 'Care Coordination'],
    keywords: ['bus schedule', 'clinic delay', 'walked in cast', 'transportation burden'],
    bottleneck: 'Wait Times',
    equity: ['Transportation', 'Physical Accessibility'],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: true,
      riskType: 'None',
      riskNote: 'Clinic delays combined with transit dependency directly jeopardized post-op fracture healing.',
      governanceAction: 'Social work transit voucher integration for delayed vulnerable patients.'
    }
  },
  {
    sentiment: 'positive',
    satisfaction: 5,
    commRating: 5,
    persona: 'Tech-Savvy Young Adult',
    serviceLine: 'Obstetrics & Gynecology',
    visitType: 'Outpatient',
    comment: 'Dr. Santos listened to my endometriosis symptoms without doubting my pain for the first time in 6 years. She provided clear ultrasound imagery and scheduled a laparoscopic consult immediately.',
    themes: ['Bedside Manner & Empathy', 'Care Coordination'],
    keywords: ['endometriosis validated', 'pain believed', 'immediate laparoscopy referral'],
    bottleneck: 'None',
    equity: [],
    risk: {
      hallucinationTrap: false,
      biasRisk: false,
      requiresHumanReview: false,
      riskType: 'None',
      riskNote: 'High empathy clinical validation of chronic pelvic pain.',
      governanceAction: 'None.'
    }
  }
];

// Helper to systematically synthesize 160 realistic, statistically representative patient feedbacks
function generateFullDataset(): PatientFeedback[] {
  const result: PatientFeedback[] = [...INITIAL_PATIENT_FEEDBACK];
  const serviceLines: PatientFeedback['serviceLine'][] = [
    'Emergency Medicine',
    'Cardiology',
    'Oncology',
    'Orthopedics',
    'Pediatrics',
    'Neurology',
    'Obstetrics & Gynecology',
    'General Surgery'
  ];
  const visitTypes: PatientFeedback['visitType'][] = ['Emergency', 'Inpatient', 'Outpatient', 'Telehealth'];
  const personas: PatientFeedback['persona'][] = [
    'Senior Chronic Care (65+)',
    'Tech-Savvy Young Adult',
    'Non-English Preferred',
    'Working Parent',
    'Vulnerable / Underinsured'
  ];

  let currentId = 1021;
  const sampleLen = SAMPLE_COMMENTS.length;

  while (result.length < 160) {
    const idx = (result.length - 20) % sampleLen;
    const template = SAMPLE_COMMENTS[idx];
    const sLine = serviceLines[(result.length * 3 + idx) % serviceLines.length];
    const vType = sLine === 'Emergency Medicine' ? 'Emergency' : visitTypes[(result.length * 2) % visitTypes.length];
    const persona = personas[(result.length + idx) % personas.length];

    // derive wait time based on service line profile
    const baseWait = ADDITIONAL_SERVICE_LINES[sLine]?.avgWait || 45;
    const waitVariation = ((result.length * 13) % 40) - 15;
    const calculatedWait = Math.max(10, baseWait + waitVariation + (template.sentiment === 'negative' ? 45 : -10));

    // follow-up compliance logic
    const compliance =
      template.sentiment === 'positive'
        ? true
        : template.sentiment === 'neutral'
        ? result.length % 2 === 0
        : persona === 'Senior Chronic Care (65+)' || persona === 'Non-English Preferred'
        ? result.length % 3 === 0
        : result.length % 2 === 1;

    // date distribution across last 90 days
    const dayOffset = (result.length * 7) % 85;
    const recordDate = new Date(2026, 8, 1);
    recordDate.setDate(recordDate.getDate() + dayOffset);
    const dateStr = recordDate.toISOString().split('T')[0];

    result.push({
      id: `FB-${currentId}`,
      patientId: `PT-${2000 + currentId}`,
      date: dateStr,
      serviceLine: sLine,
      visitType: vType,
      persona: persona,
      satisfactionScore: template.satisfaction,
      communicationRating: template.commRating,
      followUpCompliance: compliance,
      waitTimeMinutes: calculatedWait,
      sentiment: template.sentiment,
      comment: template.comment,
      themes: template.themes,
      keywords: template.keywords,
      bottleneckType: template.bottleneck,
      equityConcerns: template.equity,
      aiRisk: {
        ...template.risk,
        riskNote: template.risk.riskNote
      }
    });

    currentId++;
  }

  return result;
}

export const PATIENT_FEEDBACK_DATASET: PatientFeedback[] = generateFullDataset();

// SECTION 8: AI Agent Opportunities
export const AI_AGENT_RECOMMENDATIONS: AIAgentRecommendation[] = [
  {
    id: 'AGENT-01',
    name: 'AegisTriage & Pre-Arrival Companion',
    acronym: 'AegisTriage',
    purpose:
      'Autonomous conversational agent that greets patients pre-arrival, collects structured chief complaints, estimates wait times transparently, and routes non-emergent cases to telehealth clinics.',
    expectedImpact:
      '38% reduction in Left Without Being Seen (LWBS) rate, 45-minute decrease in non-acute ED wait times, and immediate elimination of triage confusion.',
    clinicalDomain: 'Emergency Medicine & Acute Care',
    timeframe: 'Immediate (0-3 Months)',
    complexity: 'Medium',
    targetFriction: 'Emergency department wait-time spikes and opacity in triage queuing.',
    humanInLoopProtocol:
      'Any red-flag phrase (chest tightness, acute numbness, severe dyspnea) immediately triggers high-priority nurse workstation alert.',
    estimatedCostReduction: '$1.4M / yr',
    hcahpsLiftEstimate: '+12.4 percentile points in ED communication'
  },
  {
    id: 'AGENT-02',
    name: 'DischargeBridge Multilingual Navigator',
    acronym: 'DischargeBridge',
    purpose:
      'Translates dense EHR discharge summaries into patient-tailored 6th-grade reading level instructions, audio explanations in 35+ languages, and visual medication calendars.',
    expectedImpact:
      '27% reduction in 30-day preventable readmissions, 85% reduction in language-related dosing errors, and 100% ADA compliance for visually impaired patients.',
    clinicalDomain: 'Inpatient Nursing & Pharmacy',
    timeframe: 'Immediate (0-3 Months)',
    complexity: 'Low',
    targetFriction: 'Post-op discharge jargon, missing translations, and unverified medication regimens.',
    humanInLoopProtocol:
      'Attending physician or ward pharmacist must electronically sign off on AI-simplified medication schedule prior to print/SMS release.',
    estimatedCostReduction: '$2.1M / yr (Readmission penalty avoidance)',
    hcahpsLiftEstimate: '+18.6 percentile points in Discharge Information'
  },
  {
    id: 'AGENT-03',
    name: 'CareSync Continuity & Follow-Up Copilot',
    acronym: 'CareSync',
    purpose:
      'Proactive outbound omnichannel agent that checks in on patients at 48 hours and 7 days post-discharge, verifies medication fill status, resolves transportation barriers, and reschedules missed visits.',
    expectedImpact:
      'Lift follow-up compliance from 68% to 89%, prevent medication drop-offs, and surface acute post-discharge complications before ED readmission is required.',
    clinicalDomain: 'Care Management & Population Health',
    timeframe: 'Mid-Term (3-6 Months)',
    complexity: 'Medium',
    targetFriction: 'Lost referrals, missing prior authorizations, and post-discharge voicemail black holes.',
    humanInLoopProtocol:
      'Clinical escalations automatically routed to assigned care manager with pre-drafted clinical context.',
    estimatedCostReduction: '$850K / yr',
    hcahpsLiftEstimate: '+9.8 percentile points in Care Transitions'
  },
  {
    id: 'AGENT-04',
    name: 'EchoScribe Ambient Clinical Documentation',
    acronym: 'EchoScribe',
    purpose:
      'Listens to clinician-patient conversations with ambient consent, generates structured SOAP notes, and extracts patient-friendly take-home summaries that highlight agreed next steps.',
    expectedImpact:
      'Saves 1.8 hours of EHR pajama time per physician per shift, boosts eye contact during consultations, and eliminates delayed chart sign-offs.',
    clinicalDomain: 'Ambulatory & Inpatient Medical Staff',
    timeframe: 'Mid-Term (3-6 Months)',
    complexity: 'High',
    targetFriction: 'Physician burnout, rushed consultations, and lack of printed patient-facing summaries.',
    humanInLoopProtocol:
      'Clinician reviews and approves note with one-click diff verification before committing to EHR.',
    estimatedCostReduction: '$3.2M / yr in physician retention & billing velocity',
    hcahpsLiftEstimate: '+14.2 percentile points in Doctor Communication'
  },
  {
    id: 'AGENT-05',
    name: 'OptiSchedule Prior-Auth & Access Engine',
    acronym: 'OptiSchedule',
    purpose:
      'Intelligent scheduling and capacity management agent that continuously matches open specialist slots with waitlisted patients, automates prior-authorization verifications with payers, and fills cancellations.',
    expectedImpact:
      'Reduces specialist backlog wait times from 84 days to 18 days in Neurology and Oncology; recaptures $4.8M in unused appointment capacity.',
    clinicalDomain: 'Central Scheduling & Revenue Cycle',
    timeframe: 'Long-Term (6-12 Months)',
    complexity: 'High',
    targetFriction: 'Multi-month appointment delays, surprise out-of-pocket costs, and cancelled referral loops.',
    humanInLoopProtocol:
      'Complex prior authorization denials require review by dedicated clinical appeals specialist.',
    estimatedCostReduction: '$4.8M / yr in slot utilization recaptured',
    hcahpsLiftEstimate: '+11.0 percentile points in Access to Care'
  }
];

// SECTION 9: Executive Recommendations
export const EXECUTIVE_PRIORITIES: ExecutivePriority[] = [
  {
    rank: 1,
    title: 'Eliminate Emergency Department Queue Opacity & Wait-Time Spikes',
    rationale:
      'Emergency Medicine accounts for 58% of negative sentiment and high LWBS risk due to average wait times exceeding 195 minutes without live communication.',
    timeframe: '0-3 Months (Quick Win)',
    serviceLineImpact: 'Emergency Medicine',
    expectedOutcome: '35% drop in wait-time complaints; reduction of LWBS rate below national benchmark (<1.5%).',
    metricToMove: 'ED HCAHPS Communication & LWBS Rate',
    leadOwner: 'VP of Emergency Services & Chief Nursing Officer'
  },
  {
    rank: 2,
    title: 'Deploy Multilingual AI Discharge Summaries with Voice/Audio Accessibility',
    rationale:
      'Non-English preferred and senior patients face severe medication confusion (near-misses with anticoagulants) due to default 9pt English discharge paperwork.',
    timeframe: '0-3 Months (Quick Win)',
    serviceLineImpact: 'Hospital-Wide Inpatient & Ambulatory',
    expectedOutcome: 'Universal language access in 35+ languages; zero discharge delays for interpreter dispatch.',
    metricToMove: '30-Day Readmission Rate & HCAHPS Discharge Domain',
    leadOwner: 'Chief Medical Officer & Director of Health Equity'
  },
  {
    rank: 3,
    title: 'Overhaul Patient Portal Authentication & Sensitive Results Delivery',
    rationale:
      'Current 2FA architecture disenfranchises elderly patients with landlines, while unmoderated late-night cancer pathology releases cause extreme patient distress.',
    timeframe: '3-6 Months',
    serviceLineImpact: 'IT, Oncology, & Ambulatory Care',
    expectedOutcome: 'Voice-OTP support for landlines, zero unmoderated Friday night pathology push notifications.',
    metricToMove: 'Portal Adoption among 65+ & Patient Trust Index',
    leadOwner: 'Chief Information Officer & Chief Medical Informatics Officer'
  },
  {
    rank: 4,
    title: 'Automate Specialist Referral Synchronization & Prior-Authorization',
    rationale:
      'Neurology and Oncology patients suffer from 4-month wait backlogs due to missing prior-authorizations and lost inter-clinic EHR referrals.',
    timeframe: '6-12 Months (Strategic AI)',
    serviceLineImpact: 'Neurology, Oncology, Orthopedics',
    expectedOutcome: 'Lead time to specialist consultation cut by 60%; patient abandonment dropped to near zero.',
    metricToMove: 'Referral-to-Appointment Velocity & Outpatient Revenue',
    leadOwner: 'Chief Operating Officer & VP of Revenue Cycle'
  },
  {
    rank: 5,
    title: 'Institutionalize Healthcare AI Governance Board & Bias Auditing Protocol',
    rationale:
      'Unregulated third-party symptom checkers and unsanctioned translation tools create severe clinical liability, hallucination traps, and demographic pain inequities.',
    timeframe: '0-3 Months (Quick Win)',
    serviceLineImpact: 'Executive Committee & Risk Management',
    expectedOutcome: 'Formal NIST AI RMF / FDA SaMD governance charter; mandatory clinical sign-off on all patient-facing AI tools.',
    metricToMove: 'Clinical Risk Incidents & AI Safety Compliance',
    leadOwner: 'Chief AI Officer & Chief Legal Officer'
  }
];

// CAIO 5 Core Questions Data
export const CAIO_STRATEGIC_PILLARS: CAIOQuestionAnswer[] = [
  {
    questionNumber: 1,
    question: 'What are patients experiencing across our health system?',
    executiveSummary:
      'Patients report high appreciation for frontline provider bedside empathy, but endure significant friction at transitions: emergency wait times averaging >195 minutes, opaque triage status, jargon-heavy discharge paperwork, and digital barriers for seniors and ESL families.',
    keyMetrics: [
      { label: 'Overall Satisfaction', value: '3.64 / 5.00', trend: 'Below Top Quartile (4.1)' },
      { label: 'Negative Sentiment Share', value: '38.8%', trend: 'Driven by ED & Oncology' },
      { label: 'Language/Accessibility Gaps', value: '26.3% of cohorts', trend: 'Severe in ESL' }
    ],
    actionPlan: [
      'Live SMS queue transparency in ED and infusion suites',
      'Immediate rollout of multimodal patient discharge summaries',
      'Voice-enabled 2FA for senior portal authentication'
    ]
  },
  {
    questionNumber: 2,
    question: 'What organizational problems exist behind these experiences?',
    executiveSummary:
      'Root causes stem from disconnected department silos, manual prior-authorizations causing 4-month referral lags, nurse shift handover communication gaps, and lack of real-time clinical interpreter staffing during peak hours.',
    keyMetrics: [
      { label: 'ED Wait Complaints', value: '58.2% of ED records', trend: 'Primary hospital pain point' },
      { label: 'Scheduling Bottlenecks', value: '34.5% in Neurology/Oncology', trend: 'Referral leakage' },
      { label: 'Discharge Hand-off Defects', value: '22.8% of Inpatient discharges', trend: 'Dosing safety risks' }
    ],
    actionPlan: [
      'Standardize bedside nursing shift change handoff protocol with smart digital checklists',
      'Establish centralized real-time medical interpreter video on-demand carts across all ED beds',
      'Deploy point-of-care price estimation tools before scheduling high-cost diagnostic scans'
    ]
  },
  {
    questionNumber: 3,
    question: 'Which problems should hospital leadership prioritize first?',
    executiveSummary:
      'Prioritization must balance clinical risk severity, financial downside (readmissions & malpractice), and implementation speed. ED throughput and Multilingual Discharge have high ROI and rapid feasibility, followed by referral automation.',
    keyMetrics: [
      { label: 'Immediate High Impact', value: 'ED Queue & Multilingual Discharge', trend: '0-3 Month Horizon' },
      { label: 'Preventable Readmission Risk', value: '$2.1M Exposure', trend: 'CMS HRRP Penalties' },
      { label: 'Referral Leakage Loss', value: '$4.8M / yr', trend: 'Unfilled Specialist Capacity' }
    ],
    actionPlan: [
      'Form rapid-deployment taskforce for ED Triage Companion (AegisTriage)',
      'Launch EHR-integrated DischargeBridge pilot across high-volume surgical and cardiac wards',
      'Set weekly executive KPI review on follow-up compliance and readmissions'
    ]
  },
  {
    questionNumber: 4,
    question: 'Where can Generative AI and Autonomous Agents create real value?',
    executiveSummary:
      'Generative AI delivers the highest multiplier in three areas: (1) Synthesizing unstructured EHR records into plain-language multilingual patient guidance, (2) Ambient clinical documentation relieving physician burnout, and (3) Proactive outbound follow-up agents tracking recovery adherence.',
    keyMetrics: [
      { label: 'Total Value Potential', value: '$12.3M / yr', trend: 'Direct & indirect ROI' },
      { label: 'Physician Time Saved', value: '1.8 hrs / clinician / day', trend: 'EchoScribe projection' },
      { label: 'Follow-Up Adherence', value: '+21% improvement', trend: 'CareSync agent impact' }
    ],
    actionPlan: [
      'Scale validated ambient clinical documentation (EchoScribe) to 120 ambulatory physicians',
      'Connect CareSync agent to outpatient CRM for automated 48-hr patient wellness check-ins',
      'Build ROI dashboard tracking HCAHPS percentile gains vs AI capital expenditures'
    ]
  },
  {
    questionNumber: 5,
    question: 'What critical risks must be governed to protect patients and the institution?',
    executiveSummary:
      'Clinical AI without safeguards poses acute risks: hallucination in medication advice, demographic bias in pain validation, and unauthorized consumer translation tools. AI governance requires rigid human-in-the-loop sign-offs, HIPAA compliance, and continuous audit pipelines.',
    keyMetrics: [
      { label: 'Flagged Risk Comments', value: '18 Records (11.2%)', trend: 'Requires active oversight' },
      { label: 'Hallucination Traps Identified', value: '4 Critical Cases', trend: 'Chatbot & translation errors' },
      { label: 'Human-in-the-Loop SLA', value: '100% Mandatory', trend: 'On high-stakes clinical notes' }
    ],
    actionPlan: [
      'Ban unvetted consumer AI chatbots for clinical triage; establish hospital-sanctioned firewall',
      'Mandate attending physician digital sign-off on all AI-synthesized discharge plans',
      'Form Clinical AI Governance Board meeting bi-weekly to review flagged anomalies and bias audits'
    ]
  }
];

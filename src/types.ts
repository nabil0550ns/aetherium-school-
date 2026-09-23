export interface Student {
  id: string;
  name: string;
  grade: 'Preparatory (Age 4)' | 'Primary (Grade 3, Age 8)' | 'Middle School (Grade 7, Age 12)';
  pillar: 'preparatory' | 'primary' | 'middle';
  avatar: string;
  attendance: string;
  supervisedZone: string;
  zoneSupervisor: string;
  cognitiveTwin: {
    stage: string;
    dominantPillar: string;
    activePetals: number;
    skills: { name: string; score: number; category: string }[];
  };
  todaysNutrition: {
    mealName: string;
    chef: string;
    origin: string;
    distanceMiles: number;
    calories: number;
    proteinG: number;
    greensScore: number;
    allergens: string[];
    allergenCheckPassed: boolean;
  };
}

export interface TouchpointLog {
  id: string;
  studentId: string;
  timestamp: string;
  educatorName: string;
  educatorRole: string;
  category: 'curiosity' | 'empathy' | 'resilience' | 'leadership' | 'milestone';
  note: string;
  empathyScore: number;
  encryptedReceipt: string;
}

export interface AdministrativeSummons {
  id: string;
  title: string;
  type: 'Consent Deed' | 'Symposium Convocation' | 'Laboratory Protocol Authorization';
  issuingOfficer: string;
  dateIssued: string;
  deadline: string;
  status: 'pending' | 'signed';
  legalSummary: string;
  fullTerms: string[];
  signatureDataUrl?: string;
  signedTimestamp?: string;
  hashVerification?: string;
}

export interface SeatScarcity {
  pillar: 'Preparatory' | 'Primary' | 'Middle School';
  ageRange: string;
  totalCap: number;
  seatsRemaining: number;
  cohortYear: string;
  ratio: string;
}

export interface TestimonialVoice {
  id: string;
  name: string;
  role: string;
  organization: string;
  studentAffiliation: string;
  quote: string;
  audioDuration: string;
  avatar: string;
}

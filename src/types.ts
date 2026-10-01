export interface Student {
  id: string;
  name: string;
  grade: string;
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
  type: string;
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
  pillarAr: string;
  ageRange: string;
  totalCap: number;
  seatsRemaining: number;
  cohortYear: string;
  ratio: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'school' | 'activities' | 'events' | 'announcements' | 'success' | 'competitions' | 'trips' | 'workshops';
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'classes' | 'labs' | 'nature' | 'sports';
  image: string;
  caption: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TimetableSlot {
  day: string;
  period: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface HomeworkQuest {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'completed' | 'in_progress' | 'pending';
  xpReward: number;
}

export interface StudentBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  dateEarned: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  avatar: string;
  quote: string;
  childInfo: string;
  audioDuration: string;
}

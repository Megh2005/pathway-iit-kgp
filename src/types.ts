export type ComplexityRating = 'Introductory' | 'Intermediate' | 'Advanced' | 'Cutting-Edge Frontier';

export interface PaperMeta {
  title: string;
  authors: string[];
  year: string | number;
  journalOrConference?: string;
  doiOrArxiv?: string;
  domain: string;
  tldr: string;
  readingTimeMinutes: number;
  complexityRating: ComplexityRating;
}

export interface NovelMechanism {
  name: string;
  description: string;
  whyItMatters: string;
}

export interface BenchmarkResult {
  metric: string;
  priorState: string;
  thisPaper: string;
  impact: string;
}

export interface StatusQuoComparison {
  aspect: string;
  before: string;
  after: string;
}

export interface NewOutputs {
  primaryBreakthrough: string;
  novelMechanisms: NovelMechanism[];
  keyFindings: string[];
  benchmarkResults: BenchmarkResult[];
  statusQuoBeforeVsAfter: StatusQuoComparison[];
}

export interface AnalogyCastItem {
  technicalTerm: string;
  everydayEquivalent: string;
}

export interface ComparativeAnalogies {
  everydayAnalogy: {
    title: string;
    narrative: string;
    cast: AnalogyCastItem[];
  };
  visualMetaphor: string;
  intuitionTakeaway: string;
}

export type DoomscrollCardType =
  | 'hook'
  | 'problem'
  | 'breakthrough'
  | 'analogy'
  | 'mechanism'
  | 'metrics'
  | 'buzz'
  | 'future';

export interface DoomscrollCard {
  id: string;
  stage: number;
  totalStages: number;
  type: DoomscrollCardType;
  badge: string;
  headline: string;
  subheadline?: string;
  analogyHighlight?: string;
  bulletPoints: string[];
  statOrQuote?: {
    label: string;
    value: string;
  };
  takeaway: string;
  gradientTheme?: string;
}

export type PaperRelationshipType =
  | 'Foundation / Precursor'
  | 'Direct Competitor'
  | 'Evolution / Follow-up'
  | 'Real-world Application';

export interface RelatedPaper {
  title: string;
  authors: string;
  year: number | string;
  venueOrSource?: string;
  url: string;
  relationshipType: PaperRelationshipType;
  whyItMatters: string;
  comparisonWithAnalyzedPaper: string;
}

export interface TrendMilestone {
  period: string;
  milestone: string;
}

export interface GroundedSource {
  title: string;
  url: string;
}

export interface RecentBuzzAndTrends {
  buzzSummary: string;
  communitySentiment: 'Revolutionary' | 'Broadly Adopted' | 'Hotly Debated' | 'Niche / Specialized';
  industryAdoptionStatus: string;
  controversiesOrDebates: string[];
  trendTimeline: TrendMilestone[];
  groundedSources?: GroundedSource[];
}

export interface ThesisTopic {
  title: string;
  description: string;
  difficulty: 'Medium' | 'High' | 'Moonshot';
}

export interface FutureScope {
  unsolvedLimitations: string[];
  promisingThesisTopics: ThesisTopic[];
  openQuestionsForField: string[];
  industryApplicationOpportunities: string[];
}

export interface SimpleTermsExplanation {
  forHighSchooler: string;
  forTechFounder: string;
  forSeniorResearcher: string;
}

export interface PaperAnalysisResult {
  paperMeta: PaperMeta;
  newOutputs: NewOutputs;
  comparativeAnalogies: ComparativeAnalogies;
  doomscrollCards: DoomscrollCard[];
  relatedPapers: RelatedPaper[];
  recentBuzzAndTrends: RecentBuzzAndTrends;
  futureScope: FutureScope;
  simpleTermsExplanation: SimpleTermsExplanation;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

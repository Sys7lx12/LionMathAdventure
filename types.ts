export enum ViewState {
  ONBOARDING = 'ONBOARDING',
  HOME = 'HOME',
  LEARN_MENU = 'LEARN_MENU',
  LEARN_LESSON = 'LEARN_LESSON',
  PRACTICE_MENU = 'PRACTICE_MENU',
  PRACTICE_SESSION = 'PRACTICE_SESSION',
  TEST_MENU = 'TEST_MENU',
  TEST_SESSION = 'TEST_SESSION',
  TEST_RESULT = 'TEST_RESULT',
  PROFILE = 'PROFILE'
}

export enum LionMood {
  HAPPY = 'HAPPY',
  THINKING = 'THINKING',
  CHEERING = 'CHEERING',
  SLEEPY = 'SLEEPY',
  NEUTRAL = 'NEUTRAL'
}

export enum QuestionType {
  MCQ = 'MCQ',
  FILL = 'FILL',
  DRAG = 'DRAG'
}

export interface Question {
  id: string;
  type: QuestionType;
  factor1: number;
  factor2: number;
  answer: number;
  options?: number[]; // For MCQ
  prompt?: string;
}

export interface TestSet {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  timeLimitSeconds: number; // 0 for no limit
  minPassScore: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  name: string;
  grade: number;
  stars: number;
  unlockedTables: number[]; // e.g., [2, 3]
  bestTestScores: Record<string, number>; // testSetId -> score
  totalQuestionsAnswered: number;
  avatarSkin: string;
}
export enum AppRoute {
  HOME = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  ONBOARDING = '/onboarding',
  PUZZLE = '/puzzle',
  DASHBOARD = '/dashboard',
  COACHING = '/coaching',
  COMMUNITY = '/community',
  CLINICIAN = '/clinician',
  ADMIN = '/admin'
}

export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  onboardingCompleted: boolean;
  puzzleScore?: number;
  joinedAt?: number;
  profilePicture?: string;
  currentDay: number; // Added to track journey progress
}

export enum Emotion {
  SADNESS = 'sadness',
  STRESS = 'stress',
  ANXIETY = 'anxiety',
  HOPE = 'hope'
}

export interface EmotionalAnalysis {
  summary: string;
  scores: {
    sadness: number;
    stress: number;
    anxiety: number;
    hope: number;
  };
  flags: {
    high_risk: boolean;
    requires_clinician: boolean;
  };
}

export interface MindPuzzleResult {
  score: number; // 0-100
  metrics: {
    focus: number;
    patience: number;
    decision_making: number;
    emotional_control: number;
  };
}

export enum CoachType {
  MIND = 'Mind Coach',
  BODY = 'Body Coach',
  SOCIAL = 'Social Coach'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface DailyTask {
  id: string;
  timeOfDay: 'morning' | 'mid_day' | 'evening' | 'night';
  title: string;
  completed: boolean;
  type: 'check' | 'input' | 'photo';
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  userProfilePic?: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  topic: string; // 'anxiety', 'ptsd', 'sobriety', etc.
  timestamp: number;
  likes: number;
}

export interface RecoveredStory {
  id: string;
  title: string;
  author: string;
  condition: string;
  content: string;
  techniquesUsed: string[];
  recoveryDuration: string;
}
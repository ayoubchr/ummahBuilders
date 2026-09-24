
export type Profession = 'Engineering' | 'Design' | 'Product' | 'Community' | 'Research' | 'Founding' | 'Other';

export interface UserProfile {
  id: string;
  name?: string;
  alias?: string;
  country: string;
  city_region?: string;
  profession: Profession;
  bio?: string;
  tags: string[];
  contact_email?: string;
  contact_telegram?: string;
  is_matchable: boolean;
  avatar_url?: string;
}

export interface MatchScore {
  profileId: string;
  score: number;
  reason: string;
}

export enum OnboardingStep {
  AUTH = 1,
  PROFILE = 2,
  INTERESTS = 3,
  VISIBILITY = 4,
  SUCCESS = 5
}

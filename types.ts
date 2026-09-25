
export type Profession = 'Engineering' | 'Design' | 'Product' | 'Community' | 'Research' | 'Founding' | 'Other';

export type Topic =
  | 'Tech'
  | 'Finance'
  | 'Media'
  | 'Career'
  | 'Entrepreneurship'
  | 'Education'
  | 'Health'
  | 'IslamicFinance'
  | 'Design'
  | 'Research'
  | 'Mentoring'
  | 'Charity';

export interface UserProfile {
  id: string;
  name?: string;
  alias?: string;
  country: string;
  city_region?: string;
  profession: Profession;
  bio?: string;
  tags: Topic[];
  contact_email?: string;
  contact_telegram?: string;
  is_matchable: boolean;
  avatar_url?: string;
}

export type MatchReason =
  | { kind: 'tag'; value: Topic }
  | { kind: 'profession'; value: Profession }
  | { kind: 'country'; value: string };

export interface MatchScore {
  profileId: string;
  score: number;
  reason: MatchReason | null;
}

export enum OnboardingStep {
  ACCOUNT = 1,
  IDENTITY = 2,
  CRAFT = 3,
  INTERESTS = 4,
  CONTACT = 5
}

export type ResourceKind = 'link' | 'document' | 'summary';

export interface Resource {
  id: string;
  title: string;
  kind: ResourceKind;
  url?: string;
  description?: string;
  topic: Topic;
  authorId: string;
  authorName: string;
  createdAt: string; // ISO date
}

export type EventKind = 'talk' | 'hackathon' | 'sharktank' | 'meetup';

export interface CommunityEvent {
  id: string;
  title: string;
  kind: EventKind;
  date: string; // ISO datetime from <input type="datetime-local">
  location: string;
  description?: string;
  organizerId: string;
  organizerName: string;
  attendeeIds: string[];
}

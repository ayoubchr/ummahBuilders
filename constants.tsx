
import { UserProfile, Profession } from './types';

export const PROFESSIONS: Profession[] = [
  'Engineering',
  'Design',
  'Product',
  'Community',
  'Research',
  'Founding',
  'Other'
];

export const TOPIC_SUGGESTIONS = [
  'Privacy Tech',
  'Ethical AI',
  'Islamic Finance',
  'Community Platforms',
  'Halal Supply Chain',
  'Open Source',
  'Web3',
  'Education',
  'Mental Health',
  'Cybersecurity'
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: '1',
    name: 'Ahmed K.',
    alias: 'ak_builder',
    country: 'Turkey',
    city_region: 'Istanbul',
    profession: 'Engineering',
    bio: 'Building privacy-first tools for the ummah. Excited about peer-to-peer systems.',
    tags: ['Privacy Tech', 'Open Source', 'Engineering'],
    is_matchable: true,
    avatar_url: 'https://picsum.photos/seed/ahmed/200'
  },
  {
    id: '2',
    name: 'Sara M.',
    alias: 'design_ummah',
    country: 'United Kingdom',
    city_region: 'London',
    profession: 'Design',
    bio: 'UI/UX Designer focused on creating inclusive and respectful digital spaces.',
    tags: ['Design', 'Ethical AI', 'Community Platforms'],
    is_matchable: true,
    avatar_url: 'https://picsum.photos/seed/sara/200'
  },
  {
    id: '3',
    name: 'Omar J.',
    alias: 'omar_j',
    country: 'United Arab Emirates',
    city_region: 'Dubai',
    profession: 'Product',
    bio: 'Scaling fintech products that align with Islamic principles.',
    tags: ['Islamic Finance', 'Product', 'Ethical AI'],
    is_matchable: true,
    avatar_url: 'https://picsum.photos/seed/omar/200'
  },
  {
    id: '4',
    name: 'Fatima Z.',
    alias: 'fa_research',
    country: 'Malaysia',
    city_region: 'Kuala Lumpur',
    profession: 'Research',
    bio: 'Social researcher studying the impact of digital bias on minority communities.',
    tags: ['Education', 'Research', 'Community Platforms'],
    is_matchable: true,
    avatar_url: 'https://picsum.photos/seed/fatima/200'
  }
];

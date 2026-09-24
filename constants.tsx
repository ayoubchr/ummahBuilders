
import { UserProfile, Profession, Topic } from './types';

export const PROFESSIONS: Profession[] = [
  'Engineering',
  'Design',
  'Product',
  'Community',
  'Research',
  'Founding',
  'Other'
];

export const TOPICS: Topic[] = [
  'Tech',
  'Finance',
  'Media',
  'Career',
  'Entrepreneurship',
  'Education',
  'Health',
  'IslamicFinance',
  'Design',
  'Research',
  'Mentoring',
  'Charity'
];

// Placeholder members until there is a backend.
export const MOCK_USERS: UserProfile[] = [
  {
    id: '1',
    name: 'Ahmed K.',
    alias: 'ak_builder',
    country: 'België',
    city_region: 'Antwerpen',
    profession: 'Engineering',
    bio: 'Software engineer. Wil graag jongeren helpen die de stap naar IT willen zetten.',
    tags: ['Tech', 'Mentoring', 'Career'],
    contact_email: 'ahmed@example.com',
    is_matchable: true,
    avatar_url: 'https://picsum.photos/seed/ahmed/200'
  },
  {
    id: '2',
    name: 'Sara M.',
    alias: 'sara_design',
    country: 'Nederland',
    city_region: 'Rotterdam',
    profession: 'Design',
    bio: 'UX-designer. Bezig met toegankelijke en respectvolle digitale ruimtes.',
    tags: ['Design', 'Media', 'Education'],
    contact_telegram: '@sara_design',
    is_matchable: true,
    avatar_url: 'https://picsum.photos/seed/sara/200'
  },
  {
    id: '3',
    name: 'Omar J.',
    alias: 'omar_j',
    country: 'België',
    city_region: 'Brussel',
    profession: 'Founding',
    bio: 'Ondernemer met een achtergrond in finance. Interesse in halal financiering en crowdfunding.',
    tags: ['IslamicFinance', 'Entrepreneurship', 'Finance'],
    contact_email: 'omar@example.com',
    is_matchable: true,
    avatar_url: 'https://picsum.photos/seed/omar/200'
  },
  {
    id: '4',
    name: 'Fatima Z.',
    alias: 'fatima_z',
    country: 'Nederland',
    city_region: 'Utrecht',
    profession: 'Research',
    bio: 'Onderzoeker in de sociale wetenschappen. Wil problemen binnen de ummah onderzoeken en oplossingen publiceren.',
    tags: ['Research', 'Education', 'Charity'],
    is_matchable: true,
    avatar_url: 'https://picsum.photos/seed/fatima/200'
  }
];

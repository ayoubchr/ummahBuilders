import { MatchReason } from '../types';
import { Translations } from '../i18n/translations';

export const formatMatchReason = (reason: MatchReason | null | undefined, t: Translations): string => {
  if (!reason) return '';
  switch (reason.kind) {
    case 'tag':
      return t.match.tag(t.topics[reason.value]);
    case 'profession':
      return t.match.profession(t.professions[reason.value]);
    case 'country':
      return t.match.country(reason.value);
  }
};

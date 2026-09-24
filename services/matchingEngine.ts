
import { UserProfile, MatchScore, MatchReason } from '../types';

export const calculateMatches = (currentUser: UserProfile, allUsers: UserProfile[]): MatchScore[] => {
  return allUsers
    .filter(u => u.id !== currentUser.id && u.is_matchable)
    .map(user => {
      let score = 0;
      let reason: MatchReason | null = null;

      // 3 points per shared topic tag
      const sharedTags = user.tags.filter(tag => currentUser.tags.includes(tag));
      score += sharedTags.length * 3;
      if (sharedTags.length > 0) {
        reason = { kind: 'tag', value: sharedTags[0] };
      }

      // 2 points for same profession
      if (user.profession === currentUser.profession) {
        score += 2;
        if (!reason) reason = { kind: 'profession', value: user.profession };
      }

      // 1 point for same region
      if (user.country.trim().toLowerCase() === currentUser.country.trim().toLowerCase()) {
        score += 1;
        if (!reason) reason = { kind: 'country', value: user.country };
      }

      return { profileId: user.id, score, reason };
    })
    .sort((a, b) => b.score - a.score);
};

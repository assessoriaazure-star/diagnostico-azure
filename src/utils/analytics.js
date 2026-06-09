import { getLevel } from './levels';

export function calcMedia(scores, moduleIds) {
  const vals = moduleIds.map(id => scores[id] ?? 0);
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
}

export function getAreasCriticas(scores, moduleIds, n = 2) {
  return [...moduleIds]
    .sort((a, b) => (scores[a] ?? 0) - (scores[b] ?? 0))
    .slice(0, n);
}

export function getAreasFortes(scores, moduleIds, n = 2) {
  return [...moduleIds]
    .sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0))
    .slice(0, n);
}

export function calcGap(score, target) {
  return Math.max(0, target - score);
}

export function getRanking(scores, modules) {
  return modules
    .map(m => ({ ...m, score: scores[m.id] ?? 0, level: getLevel(scores[m.id] ?? 0) }))
    .sort((a, b) => a.score - b.score);
}

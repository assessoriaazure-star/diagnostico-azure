import { useState, useCallback } from 'react';
import { MODULES } from '../data/modules';

function calcModuleScore(module, answers) {
  let total = 0;
  let maxTotal = 0;

  for (const q of module.questions) {
    if (q.type === 'single') {
      const max = Math.max(...q.options.map(o => o.score));
      maxTotal += max;
      total += answers[q.id] ?? 0;
    } else {
      // multi
      maxTotal += q.maxScore;
      const sel = answers[q.id] ?? [];
      const hasExclusive = sel.some(label => {
        const opt = q.options.find(o => o.label === label);
        return opt?.exclusive && opt.score === 0;
      });
      if (hasExclusive) {
        total += 0;
      } else {
        const pts = sel.reduce((s, label) => {
          const opt = q.options.find(o => o.label === label);
          return s + (opt?.score ?? 0);
        }, 0);
        total += Math.min(pts, q.maxScore);
      }
    }
  }

  return maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0;
}

export function useScores() {
  const [answers, setAnswers] = useState({});   // { moduleId: { qId: value } }
  const [completed, setCompleted] = useState({}); // { moduleId: true }
  const [scores, setScores] = useState({});      // { moduleId: pct }

  const saveAnswers = useCallback((moduleId, moduleAnswers) => {
    const module = MODULES.find(m => m.id === moduleId);
    if (!module) return;

    const pct = calcModuleScore(module, moduleAnswers);

    setAnswers(prev => ({ ...prev, [moduleId]: moduleAnswers }));
    setCompleted(prev => ({ ...prev, [moduleId]: true }));
    setScores(prev => ({ ...prev, [moduleId]: pct }));
  }, []);

  const completedCount = Object.keys(completed).length;
  const allDone = completedCount === MODULES.length;

  return { answers, completed, scores, saveAnswers, completedCount, allDone };
}

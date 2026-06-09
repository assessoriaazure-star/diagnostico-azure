import React, { useState, useEffect } from 'react';
import { MODULES } from '../data/modules';

export default function QuizScreen({ moduleId, onBack, onComplete }) {
  const module = MODULES.find(m => m.id === moduleId);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null); // single: score | multi: []
  const [animating, setAnimating] = useState(false);

  const question = module.questions[qIndex];
  const isMulti = question.type === 'multi';
  const total = module.questions.length;

  useEffect(() => {
    setSelected(isMulti ? [] : null);
  }, [qIndex, isMulti]);

  const canContinue = isMulti ? (selected?.length > 0) : selected !== null;

  const advance = () => {
    if (!canContinue) return;
    const newAnswers = { ...answers, [question.id]: selected };

    if (qIndex < total - 1) {
      setAnimating(true);
      setTimeout(() => {
        setAnswers(newAnswers);
        setQIndex(i => i + 1);
        setAnimating(false);
      }, 160);
    } else {
      onComplete(moduleId, newAnswers);
    }
  };

  // Single-select: seleciona e avança automaticamente após 350ms
  const handleSingleSelect = (score) => {
    setSelected(score);
    setTimeout(() => {
      const newAnswers = { ...answers, [question.id]: score };
      if (qIndex < total - 1) {
        setAnimating(true);
        setTimeout(() => {
          setAnswers(newAnswers);
          setQIndex(i => i + 1);
          setAnimating(false);
        }, 160);
      } else {
        onComplete(moduleId, newAnswers);
      }
    }, 350);
  };

  const toggleMulti = (label, opt) => {
    if (opt.exclusive) {
      setSelected([label]);
      return;
    }
    setSelected(prev => {
      const without = prev.filter(l => {
        const o = question.options.find(x => x.label === l);
        return !o?.exclusive;
      });
      return without.includes(label) ? without.filter(l => l !== label) : [...without, label];
    });
  };

  const ALPHA = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: module.color, padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 640, margin: '0 auto' }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: 8, padding: '6px 10px', fontSize: 16, cursor: 'pointer' }}>‹</button>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginBottom: 4 }}>
              {module.icon} {module.label} — {qIndex + 1}/{total}
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((qIndex + 1) / total) * 100}%`, background: '#fff', borderRadius: 4, transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, maxWidth: 640, width: '100%', margin: '0 auto', padding: '24px 1rem', opacity: animating ? 0 : 1, transition: 'opacity 0.15s' }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-dark-blue)', lineHeight: 1.5, marginBottom: 24 }}>
          {question.text}
        </h2>

        {isMulti && (
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
            Selecione todas que se aplicam
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {question.options.map((opt, i) => {
            const isSel = isMulti
              ? (selected || []).includes(opt.label)
              : selected === opt.score;

            return (
              <button
                key={i}
                onClick={() => isMulti ? toggleMulti(opt.label, opt) : handleSingleSelect(opt.score)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
                  background: isSel ? module.bg : '#fff',
                  border: `1.5px solid ${isSel ? module.color : 'var(--border)'}`,
                  borderRadius: 10, cursor: 'pointer', textAlign: 'left', transition: 'all 0.12s',
                }}
              >
                <span style={{
                  minWidth: 24, height: 24, borderRadius: isMulti ? 6 : '50%',
                  background: isSel ? module.color : '#F0F4F8',
                  color: isSel ? '#fff' : 'var(--text-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                }}>
                  {isMulti ? (isSel ? '✓' : '') : ALPHA[i]}
                </span>
                <span style={{ fontSize: 14, color: isSel ? module.color : 'var(--text-primary)', fontWeight: isSel ? 500 : 400, lineHeight: 1.5 }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      {(isMulti || selected !== null) && (
        <div style={{ padding: '16px', maxWidth: 640, width: '100%', margin: '0 auto' }}>
          <button
            onClick={advance}
            disabled={!canContinue}
            style={{
              width: '100%', padding: '13px 0', fontSize: 15, fontWeight: 600,
              background: canContinue ? module.color : '#D0DAE6',
              color: canContinue ? '#fff' : '#8A9BAD',
              border: 'none', borderRadius: 10, cursor: canContinue ? 'pointer' : 'not-allowed',
            }}
          >
            {qIndex < total - 1 ? 'Continuar →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

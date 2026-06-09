import React from 'react';
import { MODULES } from '../data/modules';
import { getLevel, getLevelDescription } from '../utils/levels';
import { ACTIONS } from '../data/actions';
import { METAS } from '../data/benchmarks';

function getLevelKey(pct) {
  if (pct >= 75) return 'avancado';
  if (pct >= 50) return 'estruturado';
  if (pct >= 25) return 'formacao';
  return 'critico';
}

export default function ResultScreen({ moduleId, scores, completedCount, onHome, onSummary, onNext }) {
  const mod = MODULES.find(m => m.id === moduleId);
  const pct = scores[moduleId] ?? 0;
  const level = getLevel(pct);
  const gap = Math.max(0, (METAS[moduleId] ?? 80) - pct);
  const actions = ACTIONS[moduleId]?.[getLevelKey(pct)] ?? [];
  const modIndex = MODULES.findIndex(m => m.id === moduleId);
  const nextMod = MODULES[modIndex + 1];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Cabeçalho colorido */}
      <div style={{ width: '100%', background: mod.color, padding: '28px 20px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>{mod.icon}</div>
        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{mod.label}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Resultado do diagnóstico</p>
      </div>

      {/* Card de resultado */}
      <div style={{ width: '100%', maxWidth: 560, padding: '0 1rem', marginTop: -24, zIndex: 1 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
          {/* Score */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <span style={{ fontSize: 40, fontWeight: 700, color: mod.color }}>{pct}%</span>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)', marginLeft: 6 }}>de maturidade</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: level.color, background: level.bg, border: `1px solid ${level.border}`, borderRadius: 20, padding: '5px 12px' }}>
              {level.label}
            </span>
          </div>

          {/* Barra */}
          <div style={{ height: 10, background: '#E8EFF6', borderRadius: 6, marginBottom: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: mod.color, borderRadius: 6, transition: 'width 0.6s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 16 }}>
            <span>0%</span>
            <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Meta Azure: {METAS[moduleId]}%</span>
            <span>100%</span>
          </div>

          {/* Descrição do nível */}
          <div style={{ background: level.bg, border: `1px solid ${level.border}`, borderRadius: 10, padding: '10px 14px', marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: level.color, fontWeight: 500 }}>{getLevelDescription(pct)}</p>
            {gap > 0 && (
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                Gap para a meta Azure: <strong style={{ color: 'var(--color-accent)' }}>{gap} pontos</strong>
              </p>
            )}
          </div>

          {/* Ações */}
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-dark-blue)', marginBottom: 12 }}>
            {pct < 50 ? '🚨 Ações urgentes' : '🎯 Próximos passos'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', background: '#F8FAFB', borderRadius: 8, border: '0.5px solid var(--border)' }}>
                <span style={{ color: mod.color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}.</span>
                <span style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navegação */}
        <div style={{ display: 'flex', gap: 10, marginTop: 20, marginBottom: 40 }}>
          <button onClick={onHome} style={btnStyle('#F0F4F8', 'var(--text-primary)')}>Início</button>
          {completedCount >= 3 && (
            <button onClick={onSummary} style={btnStyle('var(--color-accent)', '#fff')}>Painel geral</button>
          )}
          {nextMod && (
            <button onClick={() => onNext(nextMod.id)} style={btnStyle(mod.color, '#fff')}>
              {nextMod.icon} {nextMod.label} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function btnStyle(bg, color) {
  return {
    flex: 1, padding: '11px 0', fontSize: 13, fontWeight: 600,
    background: bg, color, border: 'none', borderRadius: 10, cursor: 'pointer',
  };
}

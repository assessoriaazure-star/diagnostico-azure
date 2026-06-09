import React from 'react';
import { MODULES } from '../data/modules';
import { getLevel } from '../utils/levels';

export default function HomeScreen({ intro, completed, scores, completedCount, onSelectModule, onSummary }) {
  const showSummary = completedCount >= 3;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: 'var(--color-dark-blue)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Azure</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, borderLeft: '1px solid rgba(255,255,255,0.25)', paddingLeft: 10 }}>ConstruHUB</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{intro.nome_loja}</span>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 1rem' }}>
        {/* Título */}
        <div style={{ padding: '24px 0 8px' }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-dark-blue)' }}>Diagnóstico de Gestão</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            Responda com base no que acontece de verdade na sua loja hoje
          </p>
        </div>

        {/* Progresso global */}
        <div style={{ background: '#fff', border: '0.5px solid var(--border)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-dark-blue)' }}>Progresso geral</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{completedCount} de {MODULES.length} áreas</span>
          </div>
          <div style={{ height: 6, background: '#E8EFF6', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(completedCount / MODULES.length) * 100}%`, background: 'var(--color-mid-blue)', borderRadius: 6, transition: 'width 0.4s' }} />
          </div>
        </div>

        {/* Grade de módulos */}
        <div style={{ display: 'grid', gap: 12 }}>
          {MODULES.map((mod, i) => {
            const done = !!completed[mod.id];
            const pct = scores[mod.id];
            const level = done ? getLevel(pct) : null;

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, background: '#fff',
                  border: `0.5px solid ${done ? mod.color + '55' : 'var(--border)'}`,
                  borderRadius: 12, padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
                  boxShadow: done ? `0 2px 8px ${mod.color}18` : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {/* Ícone / número */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: done ? mod.bg : '#F4F7FA', fontSize: 20, flexShrink: 0,
                }}>
                  {mod.icon}
                </div>

                {/* Texto */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: done ? mod.color : 'var(--text-primary)' }}>
                      {i + 1}. {mod.label}
                    </span>
                    {done && level && (
                      <span style={{ fontSize: 11, fontWeight: 600, color: level.color, background: level.bg, border: `1px solid ${level.border}`, borderRadius: 20, padding: '2px 8px' }}>
                        {level.label}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{mod.description}</p>
                  {done && (
                    <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 4, background: '#E8EFF6', borderRadius: 4 }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: mod.color, borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: mod.color }}>{pct}%</span>
                    </div>
                  )}
                </div>

                {/* Seta */}
                <span style={{ color: done ? mod.color : '#C0CCDA', fontSize: 18, flexShrink: 0 }}>›</span>
              </button>
            );
          })}
        </div>

        {/* Botão painel geral */}
        {showSummary && (
          <button
            onClick={onSummary}
            style={{
              width: '100%', marginTop: 20, padding: '13px 0', fontSize: 15, fontWeight: 600,
              background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer',
            }}
          >
            📊 Ver painel geral {completedCount === MODULES.length ? '(completo)' : `(${completedCount}/7)`}
          </button>
        )}
      </div>
    </div>
  );
}

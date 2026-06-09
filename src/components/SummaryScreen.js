import React, { useEffect } from 'react';
import {
  Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import { MODULES, MODULE_IDS } from '../data/modules';
import { METAS } from '../data/benchmarks';
import { getLevel } from '../utils/levels';
import { calcMedia, getAreasCriticas, getAreasFortes, calcGap } from '../utils/analytics';
import { ACTIONS } from '../data/actions';
import { useSheets } from '../hooks/useSheets';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function getLevelKey(pct) {
  if (pct >= 75) return 'avancado';
  if (pct >= 50) return 'estruturado';
  if (pct >= 25) return 'formacao';
  return 'critico';
}

export default function SummaryScreen({ intro, scores, completedCount, allDone, onHome, onModule }) {
  const { send, status } = useSheets();

  useEffect(() => {
    if (allDone && status === 'idle') {
      send(intro, scores);
    }
  }, [allDone]); // eslint-disable-line

  const media = calcMedia(scores, MODULE_IDS);
  const level = getLevel(media);
  const criticas = getAreasCriticas(scores, MODULE_IDS);
  const fortes = getAreasFortes(scores, MODULE_IDS);
  const critCount = MODULE_IDS.filter(id => (scores[id] ?? 0) < 25).length;

  const labels = MODULES.map(m => m.label.replace('Gestão de ', '').replace('Gestão e ', '').replace(' e Digital', ''));

  const radarData = {
    labels,
    datasets: [
      {
        label: 'Sua loja',
        data: MODULES.map(m => scores[m.id] ?? 0),
        backgroundColor: 'rgba(46,109,164,0.15)',
        borderColor: '#2E6DA4',
        borderWidth: 2,
        pointBackgroundColor: '#2E6DA4',
        pointRadius: 4,
      },
      {
        label: 'Meta Azure',
        data: MODULES.map(m => METAS[m.id]),
        backgroundColor: 'rgba(232,160,32,0.07)',
        borderColor: '#E8A020',
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 0,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: 'Sua loja',
        data: MODULES.map(m => scores[m.id] ?? 0),
        backgroundColor: MODULES.map(m => m.color + 'CC'),
        borderRadius: 6,
      },
    ],
  };

  const radarOpts = {
    responsive: true, maintainAspectRatio: true,
    scales: { r: { min: 0, max: 100, ticks: { stepSize: 25, font: { size: 10 } }, pointLabels: { font: { size: 11 } } } },
    plugins: { legend: { position: 'bottom', labels: { font: { size: 12 } } } },
  };

  const barOpts = {
    responsive: true, maintainAspectRatio: true,
    scales: {
      y: { min: 0, max: 100, ticks: { callback: v => v + '%' } },
      x: { ticks: { font: { size: 11 } } },
    },
    plugins: { legend: { display: false } },
  };

  const resumo = () => {
    const lv = level.label.toLowerCase();
    const crit = criticas.map(id => MODULES.find(m => m.id === id)?.label).join(' e ');
    const fort = fortes.map(id => MODULES.find(m => m.id === id)?.label).join(' e ');
    return `${intro.nome_loja} apresenta maturidade geral ${lv} (${media}%). Os pontos fortes são ${fort}. As áreas que precisam de atenção imediata são ${crit}. O foco das ações de curto prazo deve priorizar essas áreas para maximizar o impacto nos resultados.`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ background: 'var(--color-dark-blue)', padding: '16px 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>Azure ConstruHUB</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginLeft: 12 }}>Painel de Diagnóstico</span>
          </div>
          <button onClick={onHome} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>
            ← Início
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 1rem', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <KpiCard title="Maturidade geral" value={`${media}%`} sub={level.label} color={level.color} bg={level.bg} />
          <KpiCard title="Áreas avaliadas" value={`${completedCount}/7`} sub="módulos concluídos" color="#2E6DA4" bg="#E6F1FB" />
          <KpiCard title="Áreas críticas" value={critCount} sub="abaixo de 25%" color="#C0392B" bg="#FCEBEB" />
          <KpiCard title="Pontos fortes" value={MODULE_IDS.filter(id => (scores[id] ?? 0) >= 75).length} sub="acima de 75%" color="#1E7A46" bg="#EAF3DE" />
        </div>

        {/* Radar */}
        <Card title="Roda do Negócio Azure">
          <Radar data={radarData} options={radarOpts} />
        </Card>

        {/* Barras */}
        <Card title="Resultado por área">
          <Bar data={barData} options={barOpts} />
        </Card>

        {/* Barras horizontais detalhadas */}
        <Card title="Diagnóstico detalhado">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MODULES.map(mod => {
              const pct = scores[mod.id] ?? 0;
              const lv = getLevel(pct);
              const done = completedCount > 0 && scores[mod.id] !== undefined;
              return (
                <button
                  key={mod.id}
                  onClick={() => onModule(mod.id)}
                  style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 12px', background: done ? mod.bg + '66' : '#F8FAFB', border: `0.5px solid ${done ? mod.color + '44' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', textAlign: 'left' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: done ? mod.color : 'var(--text-secondary)' }}>
                      {mod.icon} {mod.label}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {done && <span style={{ fontSize: 11, fontWeight: 600, color: lv.color, background: lv.bg, border: `1px solid ${lv.border}`, borderRadius: 20, padding: '2px 8px' }}>{lv.label}</span>}
                      <span style={{ fontSize: 13, fontWeight: 700, color: done ? mod.color : 'var(--text-secondary)' }}>{done ? `${pct}%` : '—'}</span>
                    </div>
                  </div>
                  {done && (
                    <div style={{ height: 6, background: '#E8EFF6', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: mod.color, borderRadius: 4 }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Análise de gap */}
        <Card title="Análise de gap — Meta Azure">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {MODULES.map(mod => {
              const pct = scores[mod.id] ?? 0;
              const meta = METAS[mod.id];
              const gap = calcGap(pct, meta);
              const done = scores[mod.id] !== undefined;
              return (
                <div key={mod.id} style={{ padding: '10px 12px', background: '#F8FAFB', border: '0.5px solid var(--border)', borderRadius: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: mod.color, marginBottom: 4 }}>{mod.icon} {mod.label.replace('Gestão de ', '').replace('Gestão e ', '')}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Atual: <strong style={{ color: 'var(--text-primary)' }}>{done ? `${pct}%` : '—'}</strong></span>
                    <span style={{ color: 'var(--text-secondary)' }}>Meta: <strong style={{ color: 'var(--color-accent)' }}>{meta}%</strong></span>
                  </div>
                  {done && gap > 0 && (
                    <div style={{ marginTop: 4, fontSize: 11, color: '#C0392B', fontWeight: 600 }}>▲ {gap}pts de gap</div>
                  )}
                  {done && gap === 0 && (
                    <div style={{ marginTop: 4, fontSize: 11, color: '#1E7A46', fontWeight: 600 }}>✓ Meta atingida</div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Plano de ação */}
        <Card title="Plano de ação prioritário">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {criticas.slice(0, 3).map((id, i) => {
              const mod = MODULES.find(m => m.id === id);
              const pct = scores[id] ?? 0;
              const action = ACTIONS[id]?.[getLevelKey(pct)]?.[0];
              return (
                <div key={id} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: mod.bg, border: `1px solid ${mod.color}33`, borderRadius: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: mod.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: mod.color, marginBottom: 4 }}>{mod.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>{action}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Resumo executivo */}
        <Card title="Resumo executivo">
          <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.7 }}>{resumo()}</p>
        </Card>

        {/* Status envio */}
        {allDone && (
          <div style={{ padding: '12px 16px', background: status === 'done' ? '#EAF3DE' : status === 'error' ? '#FCEBEB' : '#E6F1FB', border: '0.5px solid var(--border)', borderRadius: 10, fontSize: 13, color: 'var(--text-primary)', textAlign: 'center' }}>
            {status === 'sending' && '⏳ Enviando dados para o consultor...'}
            {status === 'done' && '✅ Diagnóstico registrado com sucesso!'}
            {status === 'error' && '⚠️ Não foi possível salvar os dados. O consultor pode registrar manualmente.'}
            {status === 'idle' && ''}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div style={{ background: '#fff', border: '0.5px solid var(--border)', borderRadius: 14, padding: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-dark-blue)', marginBottom: 16 }}>{title}</h3>
      {children}
    </div>
  );
}

function KpiCard({ title, value, sub, color, bg }) {
  return (
    <div style={{ background: bg, border: `1px solid ${color}33`, borderRadius: 12, padding: '14px 16px' }}>
      <div style={{ fontSize: 11, color: color, fontWeight: 600, marginBottom: 4 }}>{title.toUpperCase()}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: color + 'AA', marginTop: 4 }}>{sub}</div>
    </div>
  );
}

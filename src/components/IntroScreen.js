import React, { useState } from 'react';

const field = {
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#1B3A5C', marginBottom: 6 },
  input: {
    width: '100%', padding: '10px 12px', fontSize: 15, border: '1px solid #D0DAE6',
    borderRadius: 8, outline: 'none', background: '#fff', color: '#1B2A3B',
  },
  req: { color: '#C0392B', marginLeft: 2 },
};

export default function IntroScreen({ onStart }) {
  const [form, setForm] = useState({ nome_loja: '', nome_responsavel: '', cargo: '', cidade: '', telefone: '' });
  const valid = form.nome_loja.trim() && form.nome_responsavel.trim() && form.cidade.trim();

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', background: 'var(--bg-page)' }}>
      {/* Logo / header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--color-dark-blue)', color: '#fff', padding: '10px 20px', borderRadius: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: 0.5 }}>Azure</span>
          <span style={{ fontSize: 13, opacity: 0.75, borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: 10 }}>ConstruHUB</span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-dark-blue)', marginBottom: 8 }}>
          Diagnóstico de Gestão
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 380, margin: '0 auto' }}>
          Avalie 7 áreas do seu negócio e receba um plano de ação personalizado em ~15 minutos.
        </p>
      </div>

      {/* Card */}
      <div style={{ background: '#fff', border: '0.5px solid var(--border)', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 480, boxShadow: '0 4px 24px rgba(27,58,92,0.08)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-dark-blue)', marginBottom: 24 }}>
          Identificação da loja
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={field.label}>Nome da loja<span style={field.req}>*</span></label>
            <input style={field.input} value={form.nome_loja} onChange={set('nome_loja')} placeholder="Ex: Materiais Silva" />
          </div>
          <div>
            <label style={field.label}>Nome do responsável<span style={field.req}>*</span></label>
            <input style={field.input} value={form.nome_responsavel} onChange={set('nome_responsavel')} placeholder="Ex: João Silva" />
          </div>
          <div>
            <label style={field.label}>Cargo / função</label>
            <input style={field.input} value={form.cargo} onChange={set('cargo')} placeholder="Ex: Proprietário, Gerente" />
          </div>
          <div>
            <label style={field.label}>Cidade<span style={field.req}>*</span></label>
            <input style={field.input} value={form.cidade} onChange={set('cidade')} placeholder="Ex: São Paulo - SP" />
          </div>
          <div>
            <label style={field.label}>Telefone / WhatsApp</label>
            <input style={field.input} value={form.telefone} onChange={set('telefone')} placeholder="(11) 99999-9999" />
          </div>
        </div>

        <button
          onClick={() => onStart(form)}
          disabled={!valid}
          style={{
            width: '100%', marginTop: 28, padding: '13px 0', fontSize: 15, fontWeight: 600,
            background: valid ? 'var(--color-dark-blue)' : '#D0DAE6',
            color: valid ? '#fff' : '#8A9BAD', border: 'none', borderRadius: 10,
            cursor: valid ? 'pointer' : 'not-allowed', transition: 'background 0.2s',
          }}
        >
          Iniciar diagnóstico →
        </button>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)', marginTop: 12 }}>
          Seus dados são usados apenas para gerar o relatório de diagnóstico.
        </p>
      </div>
    </div>
  );
}

export function getLevel(pct) {
  if (pct >= 75) return { label: 'Avançado',     color: '#1E7A46', bg: '#EAF3DE', border: '#B7DDB0' };
  if (pct >= 50) return { label: 'Estruturado',  color: '#2E6DA4', bg: '#E6F1FB', border: '#A8C8ED' };
  if (pct >= 25) return { label: 'Em formação',  color: '#B87400', bg: '#FAEEDA', border: '#F0C87A' };
  return              { label: 'Crítico',        color: '#C0392B', bg: '#FCEBEB', border: '#F0A8A0' };
}

export function getLevelDescription(pct) {
  if (pct >= 75) return 'Sua gestão nesta área está madura. Foque em inovar e manter os ganhos.';
  if (pct >= 50) return 'Boa base estruturada. Há oportunidades claras de otimização e escala.';
  if (pct >= 25) return 'Fundamentos existem mas ainda inconsistentes. Priorize processos básicos.';
  return 'Área crítica com impacto direto no resultado. Ação imediata necessária.';
}

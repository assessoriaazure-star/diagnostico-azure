import { useState, useCallback } from 'react';
import { MODULE_IDS } from '../data/modules';
import { getLevel } from '../utils/levels';
import { getAreasCriticas, getAreasFortes, calcMedia } from '../utils/analytics';

const SHEETS_URL = process.env.REACT_APP_SHEETS_URL;

export function useSheets() {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const send = useCallback(async (intro, scores) => {
    if (!SHEETS_URL) {
      console.warn('REACT_APP_SHEETS_URL não configurada');
      setStatus('done');
      return;
    }

    setStatus('sending');

    const media = calcMedia(scores, MODULE_IDS);
    const criticas = getAreasCriticas(scores, MODULE_IDS).join(', ');
    const fortes = getAreasFortes(scores, MODULE_IDS).join(', ');

    const payload = {
      data_hora: new Date().toISOString(),
      nome_loja: intro.nome_loja,
      nome_responsavel: intro.nome_responsavel,
      cargo: intro.cargo,
      cidade: intro.cidade,
      telefone: intro.telefone,
      scores,
      media_geral: media,
      nivel_geral: getLevel(media).label,
      areas_criticas: criticas,
      areas_fortes: fortes,
      versao_quiz: process.env.REACT_APP_VERSION || '1.0.0',
    };

    try {
      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus('done');
    } catch (err) {
      console.error('Erro ao enviar para Sheets:', err);
      setStatus('error');
    }
  }, []);

  return { send, status };
}

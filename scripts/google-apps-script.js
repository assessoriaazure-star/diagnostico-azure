// ============================================================
// DIAGNÓSTICO AZURE CONSTRUHUB — Google Apps Script Backend
// Conta: assessoriaazure@gmail.com
// Como usar: Google Sheets → Extensões → Apps Script → colar este código → Implantar
// ============================================================

const SHEET_NAME = 'respostas';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'data_hora','nome_loja','nome_responsavel','cargo','cidade','telefone',
        'gestao','pessoas','estoque','produtos','vendas','financeiro','marketing',
        'media_geral','nivel_geral',
        'gestao_nivel','pessoas_nivel','estoque_nivel','produtos_nivel',
        'vendas_nivel','financeiro_nivel','marketing_nivel',
        'areas_criticas','areas_fortes','versao_quiz'
      ]);
    }

    const areas = ['gestao','pessoas','estoque','produtos','vendas','financeiro','marketing'];

    const nivelLabel = (p) => {
      if (p >= 75) return 'Avançado';
      if (p >= 50) return 'Estruturado';
      if (p >= 25) return 'Em formação';
      return 'Crítico';
    };

    const scores = data.scores || {};
    const pctsArr = areas.map(a => scores[a] || 0);
    const media = Math.round(pctsArr.reduce((s,v) => s+v, 0) / areas.length);

    const sorted = areas
      .map((a,i) => ({ a, p: pctsArr[i] }))
      .sort((x,y) => x.p - y.p);
    const criticas = sorted.slice(0,2).map(x => x.a).join(', ');
    const fortes   = sorted.slice(-2).reverse().map(x => x.a).join(', ');

    const row = [
      new Date().toLocaleString('pt-BR'),
      data.nome_loja        || '—',
      data.nome_responsavel || '—',
      data.cargo            || '—',
      data.cidade           || '—',
      data.telefone         || '—',
      ...areas.map(a => scores[a] || 0),
      media,
      nivelLabel(media),
      ...areas.map(a => nivelLabel(scores[a] || 0)),
      criticas,
      fortes,
      data.versao_quiz      || '1.0'
    ];

    sheet.appendRow(row);

    notificarConsultor(data, media, criticas);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', media, nivel: nivelLabel(media), areas_criticas: criticas }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    console.error(err);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', msg: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function notificarConsultor(data, media, criticas) {
  try {
    const nivel = media >= 75 ? 'Avançado' : media >= 50 ? 'Estruturado' : media >= 25 ? 'Em formação' : 'Crítico';
    const assunto = `[Diagnóstico Azure] Nova resposta — ${data.nome_loja || 'Loja não identificada'}`;
    const corpo = `
Nova resposta recebida no Diagnóstico Azure ConstruHUB.

LOJA: ${data.nome_loja || '—'}
RESPONSÁVEL: ${data.nome_responsavel || '—'} (${data.cargo || '—'})
CIDADE: ${data.cidade || '—'}
TELEFONE: ${data.telefone || '—'}

RESULTADO:
Maturidade geral: ${media}% — ${nivel}
Áreas mais críticas: ${criticas}

Acesse a planilha para ver o detalhe completo.

---
Azure Sistemas · ConstruHUB · Diagnóstico de Gestão
    `.trim();

    GmailApp.sendEmail('assessoriaazure@gmail.com', assunto, corpo);
  } catch(err) {
    console.log('Erro ao enviar e-mail:', err);
  }
}

// Execute esta função para testar manualmente
function testeManual() {
  const mockData = {
    nome_loja: 'Loja Teste',
    nome_responsavel: 'João Teste',
    cargo: 'Proprietário',
    cidade: 'São Paulo - SP',
    telefone: '(11) 99999-9999',
    scores: { gestao:60, pessoas:35, estoque:45, produtos:55, vendas:40, financeiro:25, marketing:50 },
    versao_quiz: '1.0'
  };
  const e = { postData: { contents: JSON.stringify(mockData) } };
  const result = doPost(e);
  Logger.log(result.getContent());
}

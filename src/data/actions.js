// Ações por módulo e nível
export const ACTIONS = {
  gestao: {
    critico: [
      'Defina 3 indicadores mínimos para acompanhar semanalmente (faturamento, margem, estoque)',
      'Implante uma reunião semanal de 30 min com sua equipe para alinhar prioridades',
      'Documente os 5 processos mais críticos da loja para reduzir dependência de você',
    ],
    formacao: [
      'Crie um painel simples no Azure com os indicadores que você já acompanha',
      'Delegue pelo menos 2 decisões operacionais a um colaborador de confiança',
      'Estabeleça metas mensais por área e acompanhe em reunião mensal',
    ],
    estruturado: [
      'Implante DRE mensal e revise com sua equipe gerencial',
      'Desenvolva um plano de sucessão para funções-chave',
      'Conecte suas metas de gestão aos benchmarks do Índice Azure ConstruHUB',
    ],
    avancado: [
      'Documente boas práticas e crie manual operacional para novas unidades',
      'Avalie expansão ou franquia com base nos indicadores consolidados',
      'Mentore outros lojistas — o conhecimento acumulado tem valor de mercado',
    ],
  },
  pessoas: {
    critico: [
      'Mapeie as funções essenciais e defina responsabilidades claras para cada colaborador',
      'Implante processo de integração para novos colaboradores (mínimo 1 semana)',
      'Realize conversa individual mensal com cada vendedor para dar e receber feedback',
    ],
    formacao: [
      'Crie um roteiro de treinamento básico de produtos e atendimento',
      'Implante avaliação de desempenho semestral com critérios objetivos',
      'Defina política de remuneração variável atrelada a metas de venda',
    ],
    estruturado: [
      'Desenvolva plano de carreira para os melhores colaboradores',
      'Realize treinamentos trimestrais com foco em produto e técnica de venda',
      'Meça NPS interno (satisfação da equipe) semestralmente',
    ],
    avancado: [
      'Implante programa de liderança para preparar sucessores internos',
      'Crie comitê de melhoria contínua com participação da equipe',
      'Benchmarke seus processos de RH com as melhores lojas Azure ConstruHUB',
    ],
  },
  estoque: {
    critico: [
      'Faça inventário físico urgente e corrija divergências no sistema Azure',
      'Defina estoque mínimo para os 20 itens de maior giro (curva A)',
      'Bloqueie compras sem verificação de estoque — elimine duplicidade de pedidos',
    ],
    formacao: [
      'Implante curva ABC no Azure para focar nas categorias mais rentáveis',
      'Configure alertas de estoque mínimo no sistema para os itens da curva A',
      'Defina lead time de entrega por fornecedor e ajuste o ponto de reposição',
    ],
    estruturado: [
      'Realize inventário cíclico mensal (rotação por categorias)',
      'Negocie consignação ou VMI com 2-3 fornecedores estratégicos',
      'Analise giro e cobertura de estoque mensalmente — elimine itens sem saída',
    ],
    avancado: [
      'Implante previsão de demanda com base em histórico de 12 meses do Azure',
      'Automatize reposição para itens de curva A com pedido mínimo configurado',
      'Conecte estoque ao planejamento financeiro para otimizar capital de giro',
    ],
  },
  produtos: {
    critico: [
      'Mapeie as 10 categorias que geram 80% do seu faturamento e foque nelas',
      'Verifique se os preços de venda cobrem custo + margem desejada em todos os itens ativos',
      'Limpe o cadastro de produtos inativos no Azure para clareza operacional',
    ],
    formacao: [
      'Defina política de precificação por categoria (markup mínimo por família)',
      'Analise margem real por categoria mensalmente no Azure',
      'Identifique oportunidades de venda casada (cross-sell) entre categorias complementares',
    ],
    estruturado: [
      'Implante gestão de mix por sazonalidade (o que cada época do ano demanda)',
      'Negocie exclusividade ou condição diferenciada em pelo menos uma categoria âncora',
      'Monitore participação de mercado local nas categorias de maior volume',
    ],
    avancado: [
      'Desenvolva linha própria ou marca própria em categorias de commodities',
      'Use dados do Azure ConstruHUB para benchmark de mix com lojas similares',
      'Crie programa de lançamento de produtos com campanha de ativação',
    ],
  },
  vendas: {
    critico: [
      'Defina meta de venda mensal por vendedor e acompanhe diariamente',
      'Implante abordagem padrão de atendimento — scripts básicos para balcão e telefone',
      'Comece a registrar todas as vendas por vendedor no Azure para ter dados reais',
    ],
    formacao: [
      'Treine equipe em técnicas de venda consultiva (perguntas, soluções, não só produto)',
      'Implante follow-up de orçamentos — contato em 24-48h após envio',
      'Crie carteira de clientes: cada vendedor é responsável por um grupo de contas',
    ],
    estruturado: [
      'Implante CRM simples (pode ser no Azure) para registrar contatos e oportunidades',
      'Crie programa de fidelidade ou conta corrente para clientes recorrentes',
      'Analise taxa de conversão orçamento→venda e trabalhe as objeções mais comuns',
    ],
    avancado: [
      'Implante processo de prospecção ativa — vendedores que visitam obras e construtores',
      'Crie time de televendas ou atendimento digital para ampliar canal',
      'Meça LTV (valor de vida) por cliente e invista nos mais estratégicos',
    ],
  },
  financeiro: {
    critico: [
      'Separe imediatamente finanças pessoais e da empresa — conta PJ exclusiva',
      'Implante controle diário de caixa — entradas e saídas registradas no Azure',
      'Mapeie todas as dívidas e obrigações fixas — saiba exatamente quanto precisa faturar para não perder dinheiro',
    ],
    formacao: [
      'Elabore DRE mensal — mesmo que simples — para saber se está dando lucro de verdade',
      'Defina capital de giro ideal e monitore a posição de caixa semanalmente',
      'Negocie prazos de pagamento de fornecedores alinhados com prazo médio de recebimento',
    ],
    estruturado: [
      'Implante fluxo de caixa projetado para 90 dias — antecipe necessidades',
      'Compare sua margem bruta com o benchmark Azure: 36,55% — identifique desvios',
      'Analise custo por m² ou por vendedor e compare com referências do Índice Azure',
    ],
    avancado: [
      'Crie reserva estratégica equivalente a 3 meses de custos fixos',
      'Implante planejamento orçamentário anual com revisão trimestral',
      'Avalie rentabilidade por filial, canal e linha de produto com dados do Azure',
    ],
  },
  marketing: {
    critico: [
      'Crie ou reative perfil no Google Meu Negócio com fotos e horário atualizados',
      'Abra perfil no Instagram e publique ao menos 3x por semana (produtos, obras, dicas)',
      'Colete e responda todas as avaliações no Google — é o seu cartão de visita digital',
    ],
    formacao: [
      'Defina identidade visual consistente para redes sociais (logo, cores, fontes)',
      'Crie um calendário de conteúdo mensal — pelo menos 12 posts planejados',
      'Use WhatsApp Business para comunicação com clientes — catálogo, status e respostas automáticas',
    ],
    estruturado: [
      'Implante base de clientes segmentada para disparos de WhatsApp com ofertas direcionadas',
      'Invista R$300-500/mês em tráfego pago no Google e Instagram para obras e reformas na sua cidade',
      'Crie parceria com arquitetos, construtores e pedreiros — programa de indicação com benefícios',
    ],
    avancado: [
      'Desenvolva presença em marketplace ou loja virtual para clientes fora da sua área',
      'Produza conteúdo educativo (YouTube, Reels) que posicione sua loja como referência técnica',
      'Meça CAC (custo de aquisição) e ROI de cada canal de marketing mensalmente',
    ],
  },
};

export const exportCihaPt = {
  title: 'Exportar informações para Ministério da Saúde',

  mensagens: {
    registroNaoSelecionado:
      'Necessário selecionar ao menos um registro para realizar o processamento.',
    registrosPendentes:
      'Para realizar a exportação, é necessário corrigir as pendências dos registros ou removê-los por meio do processo "Não Liberar".',
    semItensParaExportar: 'Não há itens disponíveis para exportação',
    parametrosObrigatorios:
      'Por favor, forneça todos os parâmetros necessários para realizar a consulta.',
    parametrosObrigatoriosOutraCompetencia:
      'Os Parametros data inicio e data final são obrigatórios.',
    mesCompetenciaInvalido: 'Mês de competência inválido',
    anoCompetenciaInvalido: 'Ano de competência inválido',
    competenciaInvalida: 'Competência inválida',
    processoSucesso: 'Processo executado com sucesso',
    exportacaoSucesso:
      'Processo executado com sucesso. Arquivo gravado em : /Arquivos/CIHA',

    avisoFiltro:
      'A exportação, apenas utilizará os filtros (Unidade Faturamento, Status e Competência) para geração do arquivo.',
  },

  label: {
    dados: 'Dados',
    completos: 'completos',
    incompletos: 'incompletos',
    codigoPaciente: 'Código Paciente',
    cpf: 'Cpf',
    paciente: 'Paciente',
    prontuario: 'Prontuário',
    atendimento: 'Atendimento',
    convenio: 'Convênio',
    tipoAtendimento: 'Tipo Atendimento',
    liberar: 'Liberar',
    naoLiberar: 'Não Liberar',
    processos: 'Processos',
    unidadeFaturamento: 'Unidade Faturamento',
    status: 'Status',
    competencia: 'Competência',
    pendencias: 'Pendências para rexportação do registro',
    incluirAtendimentoForaCompetencia: 'Incluir Atendimentos',
    dataInicio: 'Data Inicio',
    dataFinal: 'Data Final',
  },
  botoes: {
    consultar: 'Consultar',
  },
};

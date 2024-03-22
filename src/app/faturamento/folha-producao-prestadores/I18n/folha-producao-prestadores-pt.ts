export const folhaProducaoPrestadoresPt = {
  title: 'Folha de Produção Prestadores',

  mensagens: {},

  grupo: {
    lancamento: {
      title: 'Lançamentos',
      label: {
        todosLancamentos: 'Todos',
        somenteAReceber: 'A Receber',
        somenteRecebidos: 'Recebidos',
      },
    },
    periodo: {
      title: 'Período',
      label: {
        execucao: 'Execução',
        previsao: 'Previsão',
        recebimento: 'Recebimento',
        somentePeriodoPrevisto: 'Somente período previsto',
      },
    },
    prestador: {
      title: 'Prestador',
      labels: {
        grupoPrestador: 'Grupo de prestador / Prestador',
        prestadores: 'Prestadores do Grupo',
        procedimentosGrupoPrestador:
          'Inclui procedimentos dos grupos de Prestadores',
      },
    },
    convenio: {
      title: 'Convênio',
    },
    parametrosUnidade: {
      title: 'Parametros da Unidade',
      labels: { remesa: 'Nº remesa', convenio: 'Convênio' },
    },
    exibicaoMedico: {
      title: 'Exibir Por:',
      label: {
        medicoRepasse: 'Médico Repasse',
        medicoExecutante: 'Médico Executante',
      },
    },
    ordenacao: {
      title: 'Ordenar por:',
      label: {
        data: 'Data',
        nomePaciente: 'Nome Paciente',
      },
    },
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
    visualizar: 'Visualizar',
  },
};

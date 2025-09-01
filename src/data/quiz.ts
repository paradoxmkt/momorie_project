import type { QuizData } from '@/types/quiz';

export const quizData: QuizData = {
  id: 'memory_focus_test',
  title: 'Teste de Memória e Foco',
  description: 'Quão aguçado está o seu cérebro? Faça nosso Teste de Memória e Foco, desenvolvido por especialistas, para avaliar sua clareza mental, concentração e memória. Descubra como seu cérebro se comporta sob pressão e receba um roteiro personalizado para atingir o desempenho cognitivo máximo.',
  totalQuestions: 20, // Approximate, includes memory tests
  estimatedTime: '5-7 minutos',
  screens: [
    {
      id: 'screen_0',
      key: 'welcome',
      type: 'welcome',
      title: 'Bem-vindo ao Teste de Memória e Foco',
      description: 'Descubra seus pontos fortes cognitivos e áreas para melhorar com nosso teste rápido e envolvente.',
      buttonText: 'Começar o Teste',
    },
    {
      id: 'screen_1',
      key: 'gender',
      type: 'demographic',
      order: 1,
      title: 'Para começar, selecione seu gênero',
      options: ['Homem', 'Mulher'],
    },
    {
      id: 'screen_2',
      key: 'memory_training_experience',
      type: 'single_choice',
      order: 2,
      question: 'Você já treinou sua mente com jogos de memória?',
      options: ['Sim', 'Não', 'Não sei'],
    },
    {
      id: 'question_1',
      key: 'forgot_known_word',
      type: 'self_assessment',
      order: 3,
      question: 'Com que frequência você esquece uma palavra conhecida da qual normalmente se lembra?',
      options: ['Frequentemente', 'Às vezes', 'Quase nunca'],
    },
     {
      id: 'question_additional_1',
      key: 'remember_appointments',
      type: 'self_assessment',
      order: 4,
      question: 'Você se lembra de compromissos e datas importantes sem precisar de lembretes?',
      options: ['Quase sempre', 'Às vezes', 'Raramente'],
    },
    {
      id: 'question_2',
      key: 'forgot_names',
      type: 'self_assessment',
      order: 5,
      question: 'Com que frequência você esquece os nomes das pessoas que acabou de conhecer?',
      options: ['Frequentemente', 'Às vezes', 'Raramente'],
    },
     {
      id: 'question_additional_2',
      key: 'multitasking_difficulty',
      type: 'self_assessment',
      order: 6,
      question: 'Como você avalia sua capacidade de realizar várias tarefas ao mesmo tempo?',
      options: ['Muito boa', 'Razoável', 'Tenho dificuldade'],
    },
    {
      id: 'question_3',
      key: 'recall_yesterday_lunch',
      type: 'self_assessment',
      order: 7,
      question: 'Você consegue se lembrar do que comeu no almoço de ontem?',
      options: ['Sim, claramente', 'Tenho uma vaga ideia', 'Não, de jeito nenhum'],
    },
    {
      id: 'question_additional_3',
      key: 'remember_shopping_list',
      type: 'self_assessment',
      order: 8,
      question: 'Ao ir às compras, com que frequência você se lembra de todos os itens sem uma lista?',
      options: ['Quase sempre', 'Às vezes', 'Raramente ou nunca'],
    },
    {
      id: 'question_4',
      key: 'losing_train_of_thought',
      type: 'self_assessment',
      order: 9,
      question: 'Com que frequência você perde o fio da meada durante uma conversa?',
      options: ['Frequentemente', 'Ocasionalmente', 'Raramente ou nunca'],
    },
    {
      id: 'question_additional_4',
      key: 'remember_movie_details',
      type: 'self_assessment',
      order: 10,
      question: 'Depois de assistir a um filme, quão bem você se lembra dos detalhes da trama?',
      options: ['Muito bem', 'Razoavelmente', 'Esqueço rapidamente'],
    },
    {
      id: 'question_5',
      key: 'misplacing_items',
      type: 'self_assessment',
      order: 11,
      question: 'Com que frequência você perde objetos como chaves ou celular?',
      options: ['Diariamente', 'Algumas vezes por semana', 'Raramente'],
    },
    {
      id: 'question_additional_5',
      key: 'remember_instructions',
      type: 'self_assessment',
      order: 12,
      question: 'Com que frequência você precisa que instruções ou informações sejam repetidas?',
      options: ['Frequentemente', 'Ocasionalmente', 'Raramente'],
    },
    {
      id: 'question_6',
      key: 'difficulty_concentrating',
      type: 'self_assessment',
      order: 13,
      question: 'Ao ler um livro ou artigo, com que frequência você precisa reler um parágrafo por não ter absorvido a informação?',
      options: ['Quase sempre', 'Às vezes', 'Quase nunca'],
    },
     {
      id: 'question_additional_6',
      key: 'energy_levels',
      type: 'self_assessment',
      order: 14,
      question: 'Como você descreveria seus níveis de energia mental ao longo do dia?',
      options: ['Estáveis e altos', 'Flutuam bastante', 'Geralmente baixos'],
    },
     {
      id: 'question_additional_7',
      key: 'recalling_past_events',
      type: 'self_assessment',
      order: 15,
      question: 'Quão bem você se lembra de eventos que aconteceram há mais de um ano?',
      options: ['Lembro-me de detalhes vívidos', 'Lembro-me dos aspectos gerais', 'Minhas lembranças são vagas'],
    },
    {
      id: 'question_additional_8',
      key: 'distracted_by_environment',
      type: 'self_assessment',
      order: 16,
      question: 'Com que facilidade você se distrai com o que está acontecendo ao seu redor?',
      options: ['Muito facilmente', 'Depende da situação', 'Raramente me distraio'],
    },
    {
      id: 'question_additional_9',
      key: 'mental_fatigue',
      type: 'self_assessment',
      order: 17,
      question: 'Com que frequência você sente fadiga mental após tarefas que exigem concentração?',
      options: ['Quase sempre', 'Às vezes', 'Raramente'],
    },
    {
      id: 'screen_final',
      key: 'memory_game_intro',
      type: 'memory_intro',
      order: 18,
      title: 'Vamos testar sua memória!',
      description: 'Agora, vamos para alguns exercícios práticos. Prepare-se para testar sua memória visual e de curto prazo. Vamos começar?',
      buttonText: 'Estou pronto!',
    },
    {
        id: 'memory_test_1',
        key: 'color_sequence_test',
        type: 'color_sequence',
        order: 19,
        question: 'Memorize a sequência de cores.',
        data: {
            sequence: ['red', 'blue', 'green', 'yellow']
        }
    },
    {
        id: 'memory_test_2',
        key: 'pattern_recall_test',
        type: 'pattern_recall',
        order: 20,
        question: 'Memorize o padrão de quadrados.',
        data: {
            pattern: [
                [true, false, false],
                [false, true, true],
                [true, false, false],
            ]
        }
    },
    {
        id: 'memory_test_3',
        key: 'word_list_test',
        type: 'word_list',
        order: 21,
        question: 'Memorize a lista de palavras.',
        data: {
            words_to_memorize: ['casa', 'árvore', 'rio', 'sol', 'livro', 'lua'],
            all_words: ['gato', 'rio', 'pedra', 'lua', 'casa', 'vento', 'livro', 'mar', 'sol', 'flor', 'árvore', 'nuvem']
        }
    }
  ],
};

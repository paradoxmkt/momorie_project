
import type { QuizData, Shape } from '@/types/quiz';

const generateGrid = (rows: number, cols: number, starPosition?: {row: number, col: number}): Shape[][] => {
    const grid: Shape[][] = Array(rows).fill(null).map(() => Array(cols).fill('circle'));
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            grid[r][c] = Math.random() > 0.5 ? 'circle' : 'triangle';
        }
    }
    if (starPosition) {
        grid[starPosition.row][starPosition.col] = 'star';
    }
    return grid;
};


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
      id: 'question_additional_5',
      key: 'remember_instructions',
      type: 'self_assessment',
      order: 2,
      question: 'Com que frequência você precisa que instruções ou informações sejam repetidas?',
      options: ['Frequentemente', 'Ocasionalmente', 'Raramente'],
    },
    {
      id: 'question_6',
      key: 'difficulty_concentrating',
      type: 'self_assessment',
      order: 3,
      question: 'Ao ler um livro ou artigo, com que frequência você precisa reler um parágrafo por não ter absorvido a informação?',
      options: ['Quase sempre', 'Às vezes', 'Quase nunca'],
    },
     {
      id: 'question_additional_6',
      key: 'energy_levels',
      type: 'self_assessment',
      order: 4,
      question: 'Como você descreveria seus níveis de energia mental ao longo do dia?',
      options: ['Estáveis e altos', 'Flutuam bastante', 'Geralmente baixos'],
    },
     {
      id: 'question_additional_7',
      key: 'recalling_past_events',
      type: 'self_assessment',
      order: 5,
      question: 'Quão bem você se lembra de eventos que aconteceram há mais de um ano?',
      options: ['Lembro-me de detalhes vívidos', 'Lembro-me dos aspectos gerais', 'Minhas lembranças são vagas'],
    },
    {
      id: 'question_additional_8',
      key: 'distracted_by_environment',
      type: 'self_assessment',
      order: 6,
      question: 'Com que facilidade você se distrai com o que está acontecendo ao seu redor?',
      options: ['Muito facilmente', 'Depende da situação', 'Raramente me distraio'],
    },
    {
      id: 'question_additional_9',
      key: 'mental_fatigue',
      type: 'self_assessment',
      order: 7,
      question: 'Com que frequência você sente fadiga mental após tarefas que exigem concentração?',
      options: ['Quase sempre', 'Às vezes', 'Raramente'],
    },
    {
      id: 'question_new_1',
      key: 'concentrate_on_task',
      type: 'self_assessment',
      order: 8,
      question: 'Quando você se senta para realizar uma tarefa, quão fácil é para você começar e manter o foco?',
      options: ['Muito fácil, eu mergulho de cabeça', 'Leva um tempo para engrenar', 'Eu procastino e me distraio facilmente'],
    },
    {
      id: 'question_new_2',
      key: 'remember_new_info',
      type: 'self_assessment',
      order: 9,
      question: 'Ao ser apresentado a novas informações (por exemplo, em uma reunião ou aula), quanto você retém sem precisar tomar notas extensivas?',
      options: ['Retenho a maior parte', 'Retenho os pontos principais, mas esqueço detalhes', 'Luto para lembrar da maior parte'],
    },
    {
      id: 'question_new_3',
      key: 'focus_noisy_env',
      type: 'self_assessment',
      order: 10,
      question: 'Como você avalia sua capacidade de se concentrar em uma tarefa em um ambiente barulhento ou com muitas distrações?',
      options: ['Consigo me isolar e focar', 'É um desafio, mas consigo', 'Acho quase impossível me concentrar'],
    },
    {
      id: 'question_new_4',
      key: 'info_overload',
      type: 'self_assessment',
      order: 11,
      question: 'Com que frequência você se sente sobrecarregado por excesso de informações, resultando em dificuldade para tomar decisões ou se lembrar de coisas?',
      options: ['Raramente', 'Ocasionalmente', 'Frequentemente'],
    },
    {
      id: 'question_new_5',
      key: 'recall_recent_conversations',
      type: 'self_assessment',
      order: 12,
      question: 'Quão bem você se lembra dos detalhes de conversas que teve nos últimos dias?',
      options: ['Lembro-me muito bem', 'Lembro-me do essencial, mas não dos detalhes', 'Muitas vezes esqueço o que foi dito'],
    },
    {
      id: 'screen_final',
      key: 'memory_game_intro',
      type: 'memory_intro',
      order: 13,
      title: 'Vamos testar sua memória!',
      description: 'Agora, vamos para alguns exercícios práticos. Prepare-se para testar sua memória visual e de curto prazo. Vamos começar?',
      buttonText: 'Estou pronto!',
    },
    {
        id: 'memory_test_1',
        key: 'color_sequence_test',
        type: 'color_sequence',
        order: 14,
        question: 'Memorize a sequência de cores.',
        data: {
            sequence: ['red', 'blue', 'green', 'yellow']
        }
    },
    {
        id: 'memory_test_2',
        key: 'number_sequence_test',
        type: 'number_sequence',
        order: 15,
        question: 'Memorize a sequência de números.',
        data: {
            sequence: [8, 2, 6, 4, 9, 1]
        }
    },
    {
        id: 'memory_test_3',
        key: 'word_list_test',
        type: 'word_list',
        order: 16,
        question: 'Memorize a lista de palavras.',
        data: {
            words_to_memorize: ['casa', 'árvore', 'rio', 'sol', 'livro', 'lua'],
            all_words: ['gato', 'rio', 'pedra', 'lua', 'casa', 'vento', 'livro', 'mar', 'sol', 'flor', 'árvore', 'nuvem']
        }
    },
    {
        id: 'memory_test_4',
        key: 'pattern_recall_test',
        type: 'pattern_recall',
        order: 17,
        question: 'Memorize o padrão.',
        data: {
            gridSize: 3,
            pattern: [
                [false, true, false],
                [true, true, false],
                [false, false, true]
            ]
        }
    },
    {
        id: 'memory_test_5',
        key: 'color_sequence_test_reversed',
        type: 'color_sequence',
        order: 18,
        question: 'Memorize a sequência de cores e recorde-a na ordem inversa.',
        data: {
            sequence: ['purple', 'orange', 'cyan', 'pink'],
            reversed: true
        }
    },
    {
      id: 'memory_test_6',
      key: 'visual_match_test',
      type: 'visual_match',
      order: 19,
      title: 'Memorize as imagens rapidamente',
      description: 'Você tem 10 segundos para memorizar',
      data: {
        visualMatch: {
          gridSize: { rows: 3, cols: 4 },
          leftGrid: generateGrid(3, 4),
          rightGrid: generateGrid(3, 4, {row: 1, col: 2}),
          correctSide: 'right',
          memorizeDuration: 10,
        }
      }
    },
    {
      id: 'memory_test_7',
      key: 'visual_match_test_2',
      type: 'visual_match',
      order: 20,
      title: 'Memorize as imagens novamente',
      description: 'Encontre a forma única. Você tem 8 segundos.',
      data: {
        visualMatch: {
          gridSize: { rows: 3, cols: 4 },
          leftGrid: generateGrid(3, 4, {row: 2, col: 1}),
          rightGrid: generateGrid(3, 4),
          correctSide: 'left',
          memorizeDuration: 8,
        }
      }
    }
  ],
};

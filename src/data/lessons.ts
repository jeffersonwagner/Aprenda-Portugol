import type { Lesson } from "../types";

export const lessons: Lesson[] = [
  // ───────────────────────── Unidade 1: Primeiros Passos ─────────────────────────
  {
    id: "pp-1",
    unitId: "primeiros-passos",
    title: "O que é Portugol?",
    description: "Conheça a estrutura básica de um algoritmo",
    icon: "💻",
    exercises: [
      {
        id: "pp-1-1",
        type: "multiple-choice",
        prompt: "Portugol é...",
        options: [
          "Uma linguagem de programação real usada em produção",
          "Uma pseudolinguagem para representar algoritmos em português",
          "Um tipo de banco de dados",
          "Um sistema operacional",
        ],
        correctIndex: 1,
        explanation:
          "Portugol (pseudocódigo) ajuda a pensar na lógica de um programa antes de escrevê-lo em uma linguagem real.",
      },
      {
        id: "pp-1-2",
        type: "multiple-choice",
        prompt: "Todo algoritmo em Portugol começa com qual palavra-chave?",
        options: ["inicio", "algoritmo", "var", "programa"],
        correctIndex: 1,
        explanation: "Todo programa começa com 'algoritmo \"nome\"'.",
      },
      {
        id: "pp-1-3",
        type: "fill-blank",
        prompt: "Complete o algoritmo para que ele termine corretamente.",
        code: 'algoritmo "Meu Primeiro Programa"\ninicio\n  escreva("Olá, mundo!")\n___',
        options: ["fimalgoritmo", "fim", "fimprograma", "termina"],
        correctAnswer: "fimalgoritmo",
        explanation: "Todo algoritmo é encerrado com 'fimalgoritmo'.",
      },
      {
        id: "pp-1-4",
        type: "order-blocks",
        prompt:
          "Coloque as linhas na ordem correta para formar um algoritmo válido.",
        blocks: [
          'algoritmo "Ola"',
          "inicio",
          '  escreva("Olá!")',
          "fimalgoritmo",
        ],
        explanation:
          "A estrutura é sempre: algoritmo → inicio → comandos → fimalgoritmo.",
      },
      {
        id: "pp-1-5",
        type: "multiple-choice",
        prompt: "Qual comando é usado para exibir uma mensagem na tela?",
        options: ["leia", "escreva", "mostra", "imprime"],
        correctIndex: 1,
        explanation: "'escreva' exibe texto ou valores na tela.",
      },
    ],
  },
  {
    id: "pp-2",
    unitId: "primeiros-passos",
    title: "Comentários e Comandos",
    description: "Documente seu código e entenda os comandos",
    icon: "📝",
    exercises: [
      {
        id: "pp-2-1",
        type: "multiple-choice",
        prompt: "Como se escreve um comentário de uma linha em Portugol?",
        options: [
          "# comentário",
          "// comentário",
          "<!-- comentário -->",
          "' comentário",
        ],
        correctIndex: 1,
        explanation: "Comentários de uma linha começam com //.",
      },
      {
        id: "pp-2-2",
        type: "fill-blank",
        prompt: "Complete para transformar a linha em um comentário.",
        code: 'algoritmo "Comentado"\ninicio\n  ___ Este programa exibe uma saudação\n  escreva("Bom dia!")\nfimalgoritmo',
        options: ["//", "/*", "#", "--"],
        correctAnswer: "//",
        explanation: "O compilador ignora tudo depois de // na mesma linha.",
      },
      {
        id: "pp-2-3",
        type: "multiple-choice",
        prompt: "Como os comandos em Portugol geralmente são separados?",
        options: [
          "Por ponto e vírgula (;)",
          "Por uma nova linha",
          "Por ponto final (.)",
          "Por chaves ({ })",
        ],
        correctIndex: 1,
        explanation:
          "Diferente de outras linguagens, cada comando fica em sua própria linha.",
      },
      {
        id: "pp-2-4",
        type: "order-blocks",
        prompt: "Ordene as linhas deste algoritmo comentado.",
        blocks: [
          'algoritmo "Saudacao"',
          "// Programa que cumprimenta o usuário",
          "inicio",
          '  escreva("Olá!")',
          "fimalgoritmo",
        ],
      },
      {
        id: "pp-2-5",
        type: "multiple-choice",
        prompt: 'O que o comando abaixo faz?\n\nescreva("Portugol é divertido!")',
        options: [
          "Lê um valor digitado pelo usuário",
          "Exibe o texto na tela",
          "Declara uma variável",
          "Cria um comentário",
        ],
        correctIndex: 1,
      },
    ],
  },

  // ───────────────────────── Unidade 2: Entrada e Saída ─────────────────────────
  {
    id: "es-1",
    unitId: "entrada-saida",
    title: "Variáveis e Tipos",
    description: "inteiro, real, caractere e logico",
    icon: "🔤",
    exercises: [
      {
        id: "es-1-1",
        type: "multiple-choice",
        prompt: "Qual tipo é usado para armazenar números inteiros?",
        options: ["real", "inteiro", "caractere", "logico"],
        correctIndex: 1,
      },
      {
        id: "es-1-2",
        type: "multiple-choice",
        prompt: "Qual tipo é usado para armazenar valores como 3.14?",
        options: ["inteiro", "real", "caractere", "logico"],
        correctIndex: 1,
        explanation: "Números com casas decimais usam o tipo 'real'.",
      },
      {
        id: "es-1-3",
        type: "fill-blank",
        prompt: "Complete a declaração da variável 'idade'.",
        code: "var\n  idade: ___\ninicio\n  idade <- 25",
        options: ["inteiro", "real", "caractere", "logico"],
        correctAnswer: "inteiro",
      },
      {
        id: "es-1-4",
        type: "multiple-choice",
        prompt: "Qual tipo armazena apenas verdadeiro ou falso?",
        options: ["inteiro", "real", "logico", "caractere"],
        correctIndex: 2,
        explanation: "O tipo 'logico' guarda 'verdadeiro' ou 'falso'.",
      },
      {
        id: "es-1-5",
        type: "order-blocks",
        prompt: "Ordene a declaração e o uso da variável 'nome'.",
        blocks: ["var", "  nome: caractere", "inicio", '  nome <- "Ana"', "fimalgoritmo"],
      },
    ],
  },
  {
    id: "es-2",
    unitId: "entrada-saida",
    title: "Leia e Escreva",
    description: "Interaja com o usuário",
    icon: "🎤",
    exercises: [
      {
        id: "es-2-1",
        type: "multiple-choice",
        prompt:
          "Qual comando lê um valor digitado pelo usuário e guarda em uma variável?",
        options: ["escreva", "leia", "var", "atribui"],
        correctIndex: 1,
      },
      {
        id: "es-2-2",
        type: "fill-blank",
        prompt: "Complete para ler o nome digitado pelo usuário.",
        code: 'var\n  nome: caractere\ninicio\n  escreva("Digite seu nome: ")\n  ___(nome)\nfimalgoritmo',
        options: ["leia", "escreva", "var", "nome"],
        correctAnswer: "leia",
      },
      {
        id: "es-2-3",
        type: "multiple-choice",
        prompt: "Qual símbolo é usado para atribuir um valor a uma variável?",
        options: ["=", "<-", "==", "->"],
        correctIndex: 1,
        explanation: "A seta '<-' é o operador de atribuição do Portugol.",
      },
      {
        id: "es-2-4",
        type: "fill-blank",
        prompt: "Complete a atribuição do valor 10 à variável x.",
        code: "var\n  x: inteiro\ninicio\n  x ___ 10\n  escreva(x)\nfimalgoritmo",
        options: ["<-", "=", "==", ":"],
        correctAnswer: "<-",
      },
      {
        id: "es-2-5",
        type: "order-blocks",
        prompt:
          "Ordene um algoritmo que lê a idade e exibe uma mensagem com ela.",
        blocks: [
          "var",
          "  idade: inteiro",
          "inicio",
          "  leia(idade)",
          '  escreva("Sua idade é: ", idade)',
          "fimalgoritmo",
        ],
      },
    ],
  },

  // ───────────────────────── Unidade 3: Decisões ─────────────────────────
  {
    id: "dec-1",
    unitId: "decisoes",
    title: "Se... Então",
    description: "Tome decisões no seu algoritmo",
    icon: "🔀",
    exercises: [
      {
        id: "dec-1-1",
        type: "multiple-choice",
        prompt: "Qual estrutura é usada para tomar decisões em Portugol?",
        options: ["para", "se...entao", "enquanto", "leia"],
        correctIndex: 1,
      },
      {
        id: "dec-1-2",
        type: "fill-blank",
        prompt: "Complete a estrutura condicional.",
        code: 'se (idade >= 18) ___\n  escreva("Maior de idade")\nfimse',
        options: ["entao", "faca", "inicio", "então:"],
        correctAnswer: "entao",
      },
      {
        id: "dec-1-3",
        type: "multiple-choice",
        prompt:
          'Qual é a saída deste trecho?\n\nx <- 7\nse (x > 5) entao\n  escreva("Maior")\nsenao\n  escreva("Menor")\nfimse',
        options: ["Maior", "Menor", "7", "Erro"],
        correctIndex: 0,
      },
      {
        id: "dec-1-4",
        type: "order-blocks",
        prompt: "Ordene a estrutura que verifica se o aluno foi aprovado.",
        blocks: [
          "se (nota >= 6) entao",
          '  escreva("Aprovado")',
          "senao",
          '  escreva("Reprovado")',
          "fimse",
        ],
      },
      {
        id: "dec-1-5",
        type: "multiple-choice",
        prompt: "Qual palavra-chave finaliza uma estrutura se...entao?",
        options: ["fim", "fimse", "fimentao", "termina"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "dec-2",
    unitId: "decisoes",
    title: "Operadores Relacionais e Lógicos",
    description: "Compare valores e combine condições",
    icon: "⚖️",
    exercises: [
      {
        id: "dec-2-1",
        type: "multiple-choice",
        prompt: "Qual operador representa 'diferente de' em Portugol?",
        options: ["!=", "<>", "><", "not="],
        correctIndex: 1,
      },
      {
        id: "dec-2-2",
        type: "multiple-choice",
        prompt:
          "Qual operador lógico representa 'E' (as duas condições precisam ser verdadeiras)?",
        options: ["ou", "e", "nao", "&&"],
        correctIndex: 1,
      },
      {
        id: "dec-2-3",
        type: "fill-blank",
        prompt: "Complete para exigir as duas condições verdadeiras.",
        code: 'se (idade >= 18) ___ (possuiCarteira = verdadeiro) entao\n  escreva("Pode dirigir")\nfimse',
        options: ["e", "ou", "nao", "="],
        correctAnswer: "e",
      },
      {
        id: "dec-2-4",
        type: "multiple-choice",
        prompt:
          'Qual é a saída deste trecho?\n\na <- 10\nb <- 20\nse (a > b) ou (a < b) entao\n  escreva("Diferentes")\nsenao\n  escreva("Iguais")\nfimse',
        options: ["Diferentes", "Iguais", "10", "20"],
        correctIndex: 0,
        explanation: "'ou' basta que uma das condições seja verdadeira.",
      },
      {
        id: "dec-2-5",
        type: "multiple-choice",
        prompt: "Qual operador representa 'maior ou igual'?",
        options: [">=", "=>", ">", "=="],
        correctIndex: 0,
      },
    ],
  },

  // ───────────────────────── Unidade 4: Repetições ─────────────────────────
  {
    id: "rep-1",
    unitId: "repeticoes",
    title: "Para...Faça",
    description: "Repita comandos um número definido de vezes",
    icon: "🔁",
    exercises: [
      {
        id: "rep-1-1",
        type: "multiple-choice",
        prompt:
          "Qual estrutura de repetição é ideal quando sabemos exatamente quantas vezes repetir?",
        options: ["enquanto", "para", "repita", "se"],
        correctIndex: 1,
      },
      {
        id: "rep-1-2",
        type: "fill-blank",
        prompt: "Complete o laço que conta de 1 até 10.",
        code: "para i de 1 ___ 10 faca\n  escreva(i)\nfimpara",
        options: ["ate", "até", "para", "entao"],
        correctAnswer: "ate",
      },
      {
        id: "rep-1-3",
        type: "multiple-choice",
        prompt:
          'Qual é a saída deste trecho?\n\npara i de 1 ate 3 faca\n  escreva(i, " ")\nfimpara',
        options: ["1 2 3", "0 1 2", "1 2 3 4", "3 2 1"],
        correctIndex: 0,
      },
      {
        id: "rep-1-4",
        type: "order-blocks",
        prompt: "Ordene o laço que exibe os números de 1 a 5.",
        blocks: ["para i de 1 ate 5 faca", "  escreva(i)", "fimpara"],
      },
      {
        id: "rep-1-5",
        type: "multiple-choice",
        prompt: "Qual palavra-chave encerra um laço 'para'?",
        options: ["fim", "fimpara", "fimpar", "para_fim"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "rep-2",
    unitId: "repeticoes",
    title: "Enquanto e Repita",
    description: "Repita comandos enquanto uma condição for válida",
    icon: "🔄",
    exercises: [
      {
        id: "rep-2-1",
        type: "multiple-choice",
        prompt: "A estrutura 'enquanto...faca' testa a condição:",
        options: [
          "depois de executar o bloco",
          "antes de executar o bloco",
          "nunca",
          "apenas uma vez",
        ],
        correctIndex: 1,
        explanation:
          "Se a condição já começar falsa, o bloco 'enquanto' nunca executa.",
      },
      {
        id: "rep-2-2",
        type: "multiple-choice",
        prompt: "A estrutura 'repita...ate' testa a condição:",
        options: [
          "antes de executar o bloco",
          "depois de executar o bloco",
          "nunca",
          "duas vezes",
        ],
        correctIndex: 1,
        explanation:
          "O bloco 'repita' sempre executa pelo menos uma vez, pois a condição é testada no final.",
      },
      {
        id: "rep-2-3",
        type: "fill-blank",
        prompt: "Complete o laço 'enquanto'.",
        code: "x <- 0\nenquanto (x < 5) ___\n  x <- x + 1\n  escreva(x)\nfimenquanto",
        options: ["faca", "entao", "ate", "fimenquanto"],
        correctAnswer: "faca",
      },
      {
        id: "rep-2-4",
        type: "multiple-choice",
        prompt:
          "Qual é a saída deste trecho?\n\nx <- 1\nrepita\n  escreva(x)\n  x <- x + 1\nate (x > 3)",
        options: ["1 2 3", "1 2 3 4", "0 1 2", "Nunca para"],
        correctIndex: 0,
      },
      {
        id: "rep-2-5",
        type: "order-blocks",
        prompt: "Ordene o laço que conta de 1 até 3 usando 'enquanto'.",
        blocks: [
          "x <- 1",
          "enquanto (x <= 3) faca",
          "  escreva(x)",
          "  x <- x + 1",
          "fimenquanto",
        ],
      },
    ],
  },

  // ───────────────────────── Unidade 5: Vetores ─────────────────────────
  {
    id: "vet-1",
    unitId: "vetores",
    title: "Declarando Vetores",
    description: "Armazene várias informações em uma variável",
    icon: "📊",
    exercises: [
      {
        id: "vet-1-1",
        type: "multiple-choice",
        prompt: "Qual palavra é usada para declarar um vetor (array) em Portugol?",
        options: ["lista", "vetor", "array", "conjunto"],
        correctIndex: 1,
      },
      {
        id: "vet-1-2",
        type: "fill-blank",
        prompt: "Complete a declaração do vetor 'notas'.",
        code: "var\n  notas: vetor[1..5] ___ real",
        options: ["de", "tipo", "como", "para"],
        correctAnswer: "de",
      },
      {
        id: "vet-1-3",
        type: "multiple-choice",
        prompt: "Em 'notas: vetor[1..5] de real', quantas posições o vetor possui?",
        options: ["4", "5", "6", "Indefinido"],
        correctIndex: 1,
      },
      {
        id: "vet-1-4",
        type: "fill-blank",
        prompt: "Complete a atribuição do primeiro valor do vetor.",
        code: "var\n  numeros: vetor[1..3] de inteiro\ninicio\n  numeros[1] ___ 10",
        options: ["<-", "=", "==", ":"],
        correctAnswer: "<-",
      },
      {
        id: "vet-1-5",
        type: "multiple-choice",
        prompt: "Como acessamos o segundo elemento do vetor 'numeros'?",
        options: ["numeros(2)", "numeros[2]", "numeros.2", "numeros{2}"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "vet-2",
    unitId: "vetores",
    title: "Percorrendo Vetores",
    description: "Use laços para ler e exibir vetores",
    icon: "🧮",
    exercises: [
      {
        id: "vet-2-1",
        type: "multiple-choice",
        prompt:
          'Qual é a saída deste trecho?\n\nn[1] <- 10\nn[2] <- 20\nn[3] <- 30\npara i de 1 ate 3 faca\n  escreva(n[i], " ")\nfimpara',
        options: ["10 20 30", "1 2 3", "30 20 10", "n[1] n[2] n[3]"],
        correctIndex: 0,
      },
      {
        id: "vet-2-2",
        type: "order-blocks",
        prompt: "Ordene o laço que lê 3 valores para dentro do vetor n.",
        blocks: ["para i de 1 ate 3 faca", "  leia(n[i])", "fimpara"],
      },
      {
        id: "vet-2-3",
        type: "multiple-choice",
        prompt:
          "Qual estrutura de repetição é mais comum para percorrer todas as posições de um vetor de tamanho conhecido?",
        options: ["enquanto", "para", "repita", "se"],
        correctIndex: 1,
      },
      {
        id: "vet-2-4",
        type: "fill-blank",
        prompt: "Complete o laço que soma todos os elementos do vetor n.",
        code: "soma <- 0\npara i de 1 ate 5 faca\n  soma <- soma ___ n[i]\nfimpara",
        options: ["+", "<-", "=", "*"],
        correctAnswer: "+",
      },
      {
        id: "vet-2-5",
        type: "multiple-choice",
        prompt:
          "O que acontece se tentarmos acessar 'notas[10]' em um vetor declarado como 'vetor[1..5] de real'?",
        options: [
          "Retorna zero automaticamente",
          "É um erro de índice fora dos limites",
          "O vetor cresce automaticamente",
          "Nada acontece",
        ],
        correctIndex: 1,
      },
    ],
  },

  // ───────────────────────── Unidade 6: Funções e Procedimentos ─────────────────────────
  {
    id: "fun-1",
    unitId: "funcoes",
    title: "Funções",
    description: "Blocos de código que retornam um valor",
    icon: "⚙️",
    exercises: [
      {
        id: "fun-1-1",
        type: "multiple-choice",
        prompt: "Qual palavra-chave declara uma função em Portugol?",
        options: ["procedimento", "funcao", "metodo", "rotina"],
        correctIndex: 1,
      },
      {
        id: "fun-1-2",
        type: "fill-blank",
        prompt: "Complete o comando que devolve o valor calculado.",
        code: "funcao dobro(x: inteiro): inteiro\ninicio\n  ___ x * 2\nfimfuncao",
        options: ["retorne", "escreva", "retorna_valor", "devolve"],
        correctAnswer: "retorne",
      },
      {
        id: "fun-1-3",
        type: "multiple-choice",
        prompt:
          "O que aparece depois dos dois-pontos em 'funcao soma(a, b: inteiro): inteiro'?",
        options: [
          "O nome da função",
          "O tipo de retorno da função",
          "Um comentário",
          "O valor inicial",
        ],
        correctIndex: 1,
      },
      {
        id: "fun-1-4",
        type: "order-blocks",
        prompt: "Ordene a função que calcula o quadrado de um número.",
        blocks: [
          "funcao quadrado(n: inteiro): inteiro",
          "inicio",
          "  retorne n * n",
          "fimfuncao",
        ],
      },
      {
        id: "fun-1-5",
        type: "multiple-choice",
        prompt:
          "Qual é a saída deste programa?\n\nfuncao triplo(x: inteiro): inteiro\ninicio\n  retorne x * 3\nfimfuncao\n\ninicio\n  escreva(triplo(4))\nfimalgoritmo",
        options: ["12", "7", "4", "43"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "fun-2",
    unitId: "funcoes",
    title: "Procedimentos",
    description: "Blocos de código que executam ações",
    icon: "🧩",
    exercises: [
      {
        id: "fun-2-1",
        type: "multiple-choice",
        prompt: "Qual a principal diferença entre função e procedimento?",
        options: [
          "Procedimento não pode receber parâmetros",
          "Função retorna um valor, procedimento não",
          "Não há diferença",
          "Função só existe em Python",
        ],
        correctIndex: 1,
      },
      {
        id: "fun-2-2",
        type: "fill-blank",
        prompt: "Complete a declaração do procedimento.",
        code: '___ saudacao(nome: caractere)\ninicio\n  escreva("Olá, ", nome)\nfimprocedimento',
        options: ["procedimento", "funcao", "algoritmo", "var"],
        correctAnswer: "procedimento",
      },
      {
        id: "fun-2-3",
        type: "multiple-choice",
        prompt: "Qual palavra-chave finaliza um procedimento?",
        options: ["fimfuncao", "fimprocedimento", "fim", "fimalgoritmo"],
        correctIndex: 1,
      },
      {
        id: "fun-2-4",
        type: "order-blocks",
        prompt: "Ordene o procedimento que exibe uma mensagem de boas-vindas.",
        blocks: [
          "procedimento mensagem()",
          "inicio",
          '  escreva("Bem-vindo!")',
          "fimprocedimento",
        ],
      },
      {
        id: "fun-2-5",
        type: "multiple-choice",
        prompt: "Por que usamos funções e procedimentos ao programar?",
        options: [
          "Para deixar o código mais lento",
          "Para organizar e reaproveitar trechos de código",
          "Porque são obrigatórios em todo algoritmo",
          "Para substituir variáveis",
        ],
        correctIndex: 1,
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons.filter((l) => l.unitId === unitId);
}

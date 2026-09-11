import type { Lesson } from "../types";

// Sintaxe validada contra exemplos reais do Portugol Studio (UNIVALI):
// https://github.com/UNIVALI-LITE/Portugol-Studio

export const lessons: Lesson[] = [
  // ───────────────────────── Unidade 1: Primeiros Passos ─────────────────────────
  {
    id: "pp-1",
    unitId: "primeiros-passos",
    title: "O que é Portugol?",
    description: "Conheça a estrutura básica de um programa",
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
        prompt:
          "Todo programa em Portugol Studio começa com qual palavra reservada?",
        options: ["algoritmo", "programa", "var", "main"],
        correctIndex: 1,
        explanation:
          "Todo programa em Portugol Studio é envolvido pela palavra 'programa' e um par de chaves { }.",
      },
      {
        id: "pp-1-3",
        type: "fill-blank",
        prompt: "Complete o programa para que ele feche corretamente.",
        code: 'programa\n{\n  funcao inicio()\n  {\n    escreva("Olá, mundo!")\n  }\n___',
        options: ["}", ")", "fimalgoritmo", ";"],
        correctAnswer: "}",
        explanation:
          "Cada chave aberta '{' precisa de uma chave fechada '}' correspondente — aqui fechamos o bloco 'programa'.",
      },
      {
        id: "pp-1-4",
        type: "order-blocks",
        prompt: "Ordene as linhas para formar a função inicio().",
        blocks: ["funcao inicio()", "{", 'escreva("Olá!")', "}"],
        explanation:
          "A função 'inicio' contém as instruções que serão executadas quando o programa rodar.",
      },
      {
        id: "pp-1-5",
        type: "multiple-choice",
        prompt: "Qual comando é usado para exibir uma mensagem na tela?",
        options: ["leia", "escreva", "mostra", "imprime"],
        correctIndex: 1,
        explanation: "'escreva' exibe texto ou valores no console.",
      },
    ],
  },
  {
    id: "pp-2",
    unitId: "primeiros-passos",
    title: "Comentários e Blocos",
    description: "Documente seu código e entenda os blocos { }",
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
        explanation:
          "Comentários de uma linha começam com //. Também existem comentários de bloco com /* ... */.",
      },
      {
        id: "pp-2-2",
        type: "fill-blank",
        prompt: "Complete para transformar a linha em um comentário.",
        code: 'funcao inicio()\n{\n  ___ Exibe uma saudação\n  escreva("Bom dia!")\n}',
        options: ["//", "/*", "#", "--"],
        correctAnswer: "//",
        explanation: "O compilador ignora tudo depois de // na mesma linha.",
      },
      {
        id: "pp-2-3",
        type: "multiple-choice",
        prompt:
          "Como delimitamos o início e o fim de um bloco de comandos (como o corpo de uma função) em Portugol Studio?",
        options: [
          "Com as palavras inicio e fim",
          "Com chaves { }",
          "Com ponto e vírgula",
          "Apenas com indentação (espaços)",
        ],
        correctIndex: 1,
        explanation:
          "Diferente de outros dialetos de Portugol, o Portugol Studio usa chaves { } para marcar blocos, como em C ou Java.",
      },
      {
        id: "pp-2-4",
        type: "order-blocks",
        prompt: "Ordene as linhas deste programa comentado.",
        blocks: [
          "funcao inicio()",
          "{",
          "// Cumprimenta o usuário",
          'escreva("Olá!")',
          "}",
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
    description: "inteiro, real, cadeia, caracter e logico",
    icon: "🔤",
    exercises: [
      {
        id: "es-1-1",
        type: "multiple-choice",
        prompt: "Qual tipo é usado para armazenar números inteiros?",
        options: ["real", "inteiro", "cadeia", "logico"],
        correctIndex: 1,
      },
      {
        id: "es-1-2",
        type: "multiple-choice",
        prompt: "Qual tipo é usado para armazenar valores como 3.14?",
        options: ["inteiro", "real", "cadeia", "logico"],
        correctIndex: 1,
        explanation: "Números com casas decimais usam o tipo 'real'.",
      },
      {
        id: "es-1-3",
        type: "fill-blank",
        prompt: "Complete a declaração da variável 'idade'.",
        code: "___ idade\nidade = 25",
        options: ["inteiro", "real", "cadeia", "logico"],
        correctAnswer: "inteiro",
      },
      {
        id: "es-1-4",
        type: "multiple-choice",
        prompt: "Qual tipo armazena apenas verdadeiro ou falso?",
        options: ["inteiro", "real", "logico", "cadeia"],
        correctIndex: 2,
        explanation: "O tipo 'logico' guarda 'verdadeiro' ou 'falso'.",
      },
      {
        id: "es-1-5",
        type: "order-blocks",
        prompt: "Ordene a declaração, atribuição e exibição da variável 'nome'.",
        blocks: ["cadeia nome", 'nome = "Ana"', "escreva(nome)"],
        explanation:
          "'cadeia' é o tipo usado para texto (strings) em Portugol Studio.",
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
        options: ["escreva", "leia", "cadeia", "atribui"],
        correctIndex: 1,
      },
      {
        id: "es-2-2",
        type: "fill-blank",
        prompt: "Complete para ler o nome digitado pelo usuário.",
        code: 'cadeia nome\nescreva("Digite seu nome: ")\n___(nome)',
        options: ["leia", "escreva", "cadeia", "nome"],
        correctAnswer: "leia",
      },
      {
        id: "es-2-3",
        type: "multiple-choice",
        prompt:
          "Qual símbolo é usado para atribuir um valor a uma variável em Portugol Studio?",
        options: ["<-", "=", "==", "->"],
        correctIndex: 1,
        explanation:
          "Portugol Studio usa '=' para atribuição, como em C — diferente de dialetos como o VisuAlg, que usam '<-'.",
      },
      {
        id: "es-2-4",
        type: "fill-blank",
        prompt: "Complete a atribuição do valor 10 à variável x.",
        code: "inteiro x\nx ___ 10\nescreva(x)",
        options: ["=", "<-", "==", ":"],
        correctAnswer: "=",
      },
      {
        id: "es-2-5",
        type: "order-blocks",
        prompt:
          "Ordene um trecho que lê a idade e exibe uma mensagem com ela.",
        blocks: [
          "inteiro idade",
          "leia(idade)",
          'escreva("Sua idade é: ", idade)',
        ],
      },
    ],
  },

  // ───────────────────────── Unidade 3: Decisões ─────────────────────────
  {
    id: "dec-1",
    unitId: "decisoes",
    title: "Se... Senão",
    description: "Tome decisões no seu programa",
    icon: "🔀",
    exercises: [
      {
        id: "dec-1-1",
        type: "multiple-choice",
        prompt: "Qual estrutura é usada para tomar decisões em Portugol?",
        options: ["para", "se...senao", "enquanto", "leia"],
        correctIndex: 1,
      },
      {
        id: "dec-1-2",
        type: "fill-blank",
        prompt: "Complete para abrir o bloco de comandos do 'se'.",
        code: 'se (idade >= 18)\n___\n  escreva("Maior de idade")\n}',
        options: ["{", "entao", "faca", ":"],
        correctAnswer: "{",
        explanation:
          "Em Portugol Studio não existe a palavra 'entao' — o bloco começa direto com '{'.",
      },
      {
        id: "dec-1-3",
        type: "multiple-choice",
        prompt:
          'Qual é a saída deste trecho?\n\ninteiro x = 7\nse (x > 5)\n{\n  escreva("Maior")\n}\nsenao\n{\n  escreva("Menor")\n}',
        options: ["Maior", "Menor", "7", "Erro"],
        correctIndex: 0,
      },
      {
        id: "dec-1-4",
        type: "order-blocks",
        prompt: "Ordene a estrutura que verifica se o aluno foi aprovado.",
        blocks: [
          "se (nota >= 6)",
          "{",
          'escreva("Aprovado")',
          "}",
          "senao",
          "{",
          'escreva("Reprovado")',
          "}",
        ],
      },
      {
        id: "dec-1-5",
        type: "multiple-choice",
        prompt:
          "Como se delimita o bloco de comandos dentro de um 'se' em Portugol Studio?",
        options: [
          "Com a palavra fimse",
          "Com chaves { }",
          "Com ponto e vírgula",
          "Com a palavra entao",
        ],
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
        prompt: "Qual operador representa 'diferente de' em Portugol Studio?",
        options: ["!=", "<>", "><", "not="],
        correctIndex: 0,
        explanation:
          "Portugol Studio usa operadores no estilo C: == (igual) e != (diferente).",
      },
      {
        id: "dec-2-2",
        type: "multiple-choice",
        prompt:
          "Qual operador lógico representa 'E' (as duas condições precisam ser verdadeiras)?",
        options: ["ou", "e", "nao", "&&"],
        correctIndex: 1,
        explanation:
          "Os operadores lógicos continuam sendo palavras em português: e, ou, nao.",
      },
      {
        id: "dec-2-3",
        type: "fill-blank",
        prompt: "Complete para exigir as duas condições verdadeiras.",
        code: 'se (idade >= 18 ___ possuiCarteira == verdadeiro)\n{\n  escreva("Pode dirigir")\n}',
        options: ["e", "ou", "nao", "="],
        correctAnswer: "e",
      },
      {
        id: "dec-2-4",
        type: "multiple-choice",
        prompt:
          'Qual é a saída deste trecho?\n\ninteiro a = 10, b = 20\nse (a > b ou a < b)\n{\n  escreva("Diferentes")\n}\nsenao\n{\n  escreva("Iguais")\n}',
        options: ["Diferentes", "Iguais", "10", "20"],
        correctIndex: 0,
        explanation: "'ou' basta que uma das condições seja verdadeira.",
      },
      {
        id: "dec-2-5",
        type: "multiple-choice",
        prompt:
          "Qual operador representa 'igual a' (comparação) em Portugol Studio?",
        options: ["=", "==", "eq", ":="],
        correctIndex: 1,
        explanation:
          "Cuidado para não confundir: '=' atribui um valor, '==' compara dois valores.",
      },
    ],
  },

  // ───────────────────────── Unidade 4: Repetições ─────────────────────────
  {
    id: "rep-1",
    unitId: "repeticoes",
    title: "Para (i = ...; ...; ...)",
    description: "Repita comandos um número definido de vezes",
    icon: "🔁",
    exercises: [
      {
        id: "rep-1-1",
        type: "multiple-choice",
        prompt:
          "Qual estrutura de repetição é ideal quando sabemos exatamente quantas vezes repetir?",
        options: ["enquanto", "para", "faca...enquanto", "se"],
        correctIndex: 1,
      },
      {
        id: "rep-1-2",
        type: "fill-blank",
        prompt: "Complete o incremento do laço que conta de 1 até 10.",
        code: "para (inteiro i = 1; i <= 10; ___)\n{\n  escreva(i)\n}",
        options: ["i++", "i + 1", "incrementa(i)", "proximo i"],
        correctAnswer: "i++",
        explanation:
          "O laço 'para' tem três partes separadas por ';': valor inicial, condição e incremento.",
      },
      {
        id: "rep-1-3",
        type: "multiple-choice",
        prompt:
          'Qual é a saída deste trecho?\n\npara (inteiro i = 1; i <= 3; i++)\n{\n  escreva(i, " ")\n}',
        options: ["1 2 3", "0 1 2", "1 2 3 4", "3 2 1"],
        correctIndex: 0,
      },
      {
        id: "rep-1-4",
        type: "order-blocks",
        prompt: "Ordene o laço que exibe os números de 1 a 5.",
        blocks: ["para (inteiro i = 1; i <= 5; i++)", "{", "escreva(i)", "}"],
      },
      {
        id: "rep-1-5",
        type: "multiple-choice",
        prompt:
          "Em 'para (inteiro i = 1; i <= 10; i++)', qual é o papel da parte 'i <= 10'?",
        options: [
          "O valor inicial do contador",
          "A condição que mantém o laço repetindo",
          "O incremento do contador",
          "Um comentário",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "rep-2",
    unitId: "repeticoes",
    title: "Enquanto e Faça...Enquanto",
    description: "Repita comandos enquanto uma condição for válida",
    icon: "🔄",
    exercises: [
      {
        id: "rep-2-1",
        type: "multiple-choice",
        prompt: "A estrutura 'enquanto (condicao) { }' testa a condição:",
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
        prompt: "A estrutura 'faca { } enquanto(condicao)' executa o bloco:",
        options: [
          "só se a condição já for verdadeira antes de começar",
          "pelo menos uma vez, testando a condição no final",
          "nunca — é apenas um comentário",
          "somente quando a condição for falsa",
        ],
        correctIndex: 1,
        explanation:
          "'faca...enquanto' sempre executa o bloco pelo menos uma vez, pois a condição só é testada no final.",
      },
      {
        id: "rep-2-3",
        type: "fill-blank",
        prompt: "Complete o laço 'enquanto'.",
        code: "inteiro x = 0\nenquanto (x < 5)\n___\n  x = x + 1\n  escreva(x)\n}",
        options: ["{", "faca", "entao", "fimenquanto"],
        correctAnswer: "{",
      },
      {
        id: "rep-2-4",
        type: "multiple-choice",
        prompt:
          "Qual é a saída deste trecho?\n\ninteiro x = 1\nfaca\n{\n  escreva(x)\n  x = x + 1\n}\nenquanto(x <= 3)",
        options: ["1 2 3", "1 2 3 4", "0 1 2", "Nunca para"],
        correctIndex: 0,
        explanation:
          "Repare que a condição de 'faca...enquanto' indica quando CONTINUAR repetindo (não quando parar).",
      },
      {
        id: "rep-2-5",
        type: "order-blocks",
        prompt: "Ordene o laço que conta de 1 até 3 usando 'enquanto'.",
        blocks: [
          "inteiro x = 1",
          "enquanto (x <= 3)",
          "{",
          "escreva(x)",
          "x = x + 1",
          "}",
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
        prompt:
          "Como se declara um vetor de 5 números reais chamado 'notas' em Portugol Studio?",
        options: [
          "notas: vetor[1..5] de real",
          "real notas[5]",
          "vetor real notas(5)",
          "array<real> notas",
        ],
        correctIndex: 1,
        explanation:
          "A sintaxe é 'tipo nome[tamanho]', igual à declaração de arrays em C.",
      },
      {
        id: "vet-1-2",
        type: "fill-blank",
        prompt: "Complete a declaração de um vetor de 5 posições.",
        code: "real notas___",
        options: ["[5]", "[1..5]", "(5)", ".5"],
        correctAnswer: "[5]",
      },
      {
        id: "vet-1-3",
        type: "multiple-choice",
        prompt:
          "Em Portugol Studio, qual é o índice da PRIMEIRA posição de um vetor?",
        options: ["0", "1", "-1", "Depende do tamanho"],
        correctIndex: 0,
        explanation:
          "Diferente de dialetos como o VisuAlg (que começam em 1), os vetores do Portugol Studio começam no índice 0.",
      },
      {
        id: "vet-1-4",
        type: "fill-blank",
        prompt: "Complete a atribuição da primeira posição do vetor.",
        code: "inteiro numeros[3]\nnumeros[0] ___ 10",
        options: ["=", "<-", "==", ":"],
        correctAnswer: "=",
      },
      {
        id: "vet-1-5",
        type: "multiple-choice",
        prompt:
          "Em 'inteiro numeros[3]', qual é o índice da ÚLTIMA posição válida?",
        options: ["3", "2", "4", "Indefinido"],
        correctIndex: 1,
        explanation: "Um vetor de tamanho 3 tem posições válidas 0, 1 e 2.",
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
          'Qual é a saída deste trecho?\n\ninteiro n[3]\nn[0] = 10\nn[1] = 20\nn[2] = 30\npara (inteiro i = 0; i < 3; i++)\n{\n  escreva(n[i], " ")\n}',
        options: ["10 20 30", "1 2 3", "30 20 10", "n[0] n[1] n[2]"],
        correctIndex: 0,
      },
      {
        id: "vet-2-2",
        type: "order-blocks",
        prompt: "Ordene o laço que lê 3 valores para dentro do vetor n.",
        blocks: ["para (inteiro i = 0; i < 3; i++)", "{", "leia(n[i])", "}"],
      },
      {
        id: "vet-2-3",
        type: "multiple-choice",
        prompt:
          "Qual estrutura de repetição é mais comum para percorrer todas as posições de um vetor de tamanho conhecido?",
        options: ["enquanto", "para", "faca...enquanto", "se"],
        correctIndex: 1,
      },
      {
        id: "vet-2-4",
        type: "fill-blank",
        prompt: "Complete o laço que soma todos os elementos do vetor n.",
        code: "inteiro soma = 0\npara (inteiro i = 0; i < 5; i++)\n{\n  soma = soma ___ n[i]\n}",
        options: ["+", "=", "==", "*"],
        correctAnswer: "+",
      },
      {
        id: "vet-2-5",
        type: "multiple-choice",
        prompt:
          "Em um vetor declarado como 'inteiro notas[5]', o que acontece ao acessar 'notas[5]'?",
        options: [
          "Retorna zero automaticamente",
          "É um erro: o índice válido vai de 0 a 4",
          "O vetor cresce automaticamente",
          "Nada acontece",
        ],
        correctIndex: 1,
      },
    ],
  },

  // ───────────────────────── Unidade 6: Funções ─────────────────────────
  {
    id: "fun-1",
    unitId: "funcoes",
    title: "Funções com Retorno",
    description: "Blocos de código que devolvem um valor",
    icon: "⚙️",
    exercises: [
      {
        id: "fun-1-1",
        type: "multiple-choice",
        prompt:
          "Qual palavra reservada declara uma função em Portugol Studio?",
        options: ["procedimento", "funcao", "metodo", "rotina"],
        correctIndex: 1,
      },
      {
        id: "fun-1-2",
        type: "fill-blank",
        prompt: "Complete o comando que devolve o valor calculado.",
        code: "funcao inteiro dobro(inteiro x)\n{\n  ___ x * 2\n}",
        options: ["retorne", "escreva", "retorna_valor", "devolve"],
        correctAnswer: "retorne",
      },
      {
        id: "fun-1-3",
        type: "multiple-choice",
        prompt:
          "Em 'funcao inteiro soma(inteiro a, inteiro b)', o que significa o 'inteiro' logo após 'funcao'?",
        options: [
          "O nome da função",
          "O tipo de retorno da função",
          "Um comentário",
          "O tipo do primeiro parâmetro",
        ],
        correctIndex: 1,
      },
      {
        id: "fun-1-4",
        type: "order-blocks",
        prompt: "Ordene a função que calcula o quadrado de um número.",
        blocks: [
          "funcao inteiro quadrado(inteiro n)",
          "{",
          "retorne n * n",
          "}",
        ],
      },
      {
        id: "fun-1-5",
        type: "multiple-choice",
        prompt:
          "Qual é a saída deste programa?\n\nfuncao inteiro triplo(inteiro x)\n{\n  retorne x * 3\n}\n\nfuncao inicio()\n{\n  escreva(triplo(4))\n}",
        options: ["12", "7", "4", "43"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "fun-2",
    unitId: "funcoes",
    title: "Funções sem Retorno",
    description: "O equivalente aos 'procedimentos' de outros dialetos",
    icon: "🧩",
    exercises: [
      {
        id: "fun-2-1",
        type: "multiple-choice",
        prompt:
          "Como se escreve, em Portugol Studio, uma função que NÃO devolve nenhum valor (o que em outros dialetos é chamado de 'procedimento')?",
        options: [
          "Usando a palavra reservada 'procedimento'",
          "Uma 'funcao' comum, apenas sem escrever tipo de retorno antes do nome",
          "Usando 'funcao vazia'",
          "Não é possível criar funções sem retorno",
        ],
        correctIndex: 1,
        explanation:
          "Portugol Studio não tem a palavra 'procedimento': toda sub-rotina é 'funcao', e o tipo antes do nome é opcional — sem ele, a função é do tipo 'vazio'.",
      },
      {
        id: "fun-2-2",
        type: "fill-blank",
        prompt: "Complete a declaração desta função sem retorno.",
        code: '___ saudacao(cadeia nome)\n{\n  escreva("Olá, ", nome)\n}',
        options: ["funcao", "funcao vazio", "procedimento", "metodo"],
        correctAnswer: "funcao",
      },
      {
        id: "fun-2-3",
        type: "multiple-choice",
        prompt: "O tipo 'vazio' em Portugol Studio representa:",
        options: [
          "Um vetor sem elementos",
          "A ausência de valor de retorno de uma função",
          "Um erro de compilação",
          "Um tipo numérico",
        ],
        correctIndex: 1,
      },
      {
        id: "fun-2-4",
        type: "order-blocks",
        prompt: "Ordene a função que exibe uma mensagem de boas-vindas.",
        blocks: ["funcao mensagem()", "{", 'escreva("Bem-vindo!")', "}"],
      },
      {
        id: "fun-2-5",
        type: "multiple-choice",
        prompt: "Por que usamos funções ao programar?",
        options: [
          "Para deixar o código mais lento",
          "Para organizar e reaproveitar trechos de código",
          "Porque são obrigatórias em todo programa",
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

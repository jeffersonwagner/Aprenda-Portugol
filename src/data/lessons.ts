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

  {
    id: "pp-3",
    unitId: "primeiros-passos",
    title: "Desafio de Código",
    description: "Escreva seu primeiro programa do zero",
    icon: "⌨️",
    exercises: [
      {
        id: "pp-3-1",
        type: "code",
        prompt:
          'Complete a função inicio() para exibir a mensagem "Aprendendo Portugol!" na tela.',
        starterCode:
          'programa\n{\n  funcao inicio()\n  {\n    // Escreva aqui o comando que exibe "Aprendendo Portugol!"\n\n  }\n}',
        expectedOutput: "Aprendendo Portugol!",
        hint: 'Use escreva("Aprendendo Portugol!") dentro da função inicio().',
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

  {
    id: "es-3",
    unitId: "entrada-saida",
    title: "Desafio de Código",
    description: "Leia um dado e exiba uma saudação",
    icon: "⌨️",
    exercises: [
      {
        id: "es-3-1",
        type: "code",
        prompt: "Leia o nome digitado pelo usuário e exiba \"Olá, \" seguido do nome.",
        starterCode:
          "programa\n{\n  funcao inicio()\n  {\n    cadeia nome\n\n    // Leia o nome digitado e exiba a saudação\n\n  }\n}",
        inputs: ["Maria"],
        expectedOutput: "Olá, Maria",
        hint: 'Use leia(nome) e depois escreva("Olá, ", nome).',
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

  {
    id: "dec-3",
    unitId: "decisoes",
    title: "Desafio de Código",
    description: "Escreva uma decisão condicional do zero",
    icon: "⌨️",
    exercises: [
      {
        id: "dec-3-1",
        type: "code",
        prompt:
          "Leia a idade e exiba \"Maior de idade\" se for >= 18, ou \"Menor de idade\" caso contrário.",
        starterCode:
          "programa\n{\n  funcao inicio()\n  {\n    inteiro idade\n    leia(idade)\n\n    // Complete a estrutura se/senao\n\n  }\n}",
        inputs: ["20"],
        expectedOutput: "Maior de idade",
        hint: 'Use se (idade >= 18) { escreva("Maior de idade") } senao { escreva("Menor de idade") }.',
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

  {
    id: "rep-3",
    unitId: "repeticoes",
    title: "Desafio de Código",
    description: "Escreva um laço do zero",
    icon: "⌨️",
    exercises: [
      {
        id: "rep-3-1",
        type: "code",
        prompt:
          "Exiba os números de 1 a 5, cada um seguido de um espaço, usando um laço 'para'.",
        starterCode:
          "programa\n{\n  funcao inicio()\n  {\n    // Escreva o laço que exibe 1 2 3 4 5\n\n  }\n}",
        expectedOutput: "1 2 3 4 5",
        hint: 'para (inteiro i = 1; i <= 5; i++) { escreva(i, " ") }',
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

  {
    id: "vet-3",
    unitId: "vetores",
    title: "Desafio de Código",
    description: "Percorra um vetor do zero",
    icon: "⌨️",
    exercises: [
      {
        id: "vet-3-1",
        type: "code",
        prompt: "Preencha o vetor com os números 10, 20 e 30 e depois exiba a soma deles.",
        starterCode:
          "programa\n{\n  funcao inicio()\n  {\n    inteiro numeros[3]\n    inteiro soma = 0\n\n    numeros[0] = 10\n    numeros[1] = 20\n    numeros[2] = 30\n\n    // Percorra o vetor somando os valores em soma e exiba o resultado\n\n  }\n}",
        expectedOutput: "60",
        hint: "Use um laço 'para' de 0 até 2 somando numeros[i] em soma, e depois escreva(soma).",
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

  {
    id: "fun-3",
    unitId: "funcoes",
    title: "Desafio de Código",
    description: "Complete uma função do zero",
    icon: "⌨️",
    exercises: [
      {
        id: "fun-3-1",
        type: "code",
        prompt: "Complete a função 'dobro' para retornar o dobro do número recebido.",
        starterCode:
          "programa\n{\n  funcao inteiro dobro(inteiro x)\n  {\n    // Complete o retorno\n\n  }\n\n  funcao inicio()\n  {\n    escreva(dobro(21))\n  }\n}",
        expectedOutput: "42",
        hint: "retorne x * 2",
      },
    ],
  },

  // ─────────────────── Unidade 7: Operadores Aritméticos ───────────────────
  {
    id: "ar-1",
    unitId: "operadores-aritmeticos",
    title: "Operadores e Precedência",
    description: "+ - * / % e a ordem das operações",
    icon: "➗",
    exercises: [
      {
        id: "ar-1-1",
        type: "multiple-choice",
        prompt: "Qual é o resultado de '5 + 4 * 2' em Portugol?",
        options: ["18", "13", "9", "20"],
        correctIndex: 1,
        explanation:
          "A multiplicação é feita primeiro: 4 * 2 = 8, depois 5 + 8 = 13.",
      },
      {
        id: "ar-1-2",
        type: "multiple-choice",
        prompt: "Qual é o resultado de '(5 + 4) * 2'?",
        options: ["13", "18", "9", "20"],
        correctIndex: 1,
        explanation:
          "Os parênteses forçam a soma a acontecer primeiro: 5 + 4 = 9, depois 9 * 2 = 18.",
      },
      {
        id: "ar-1-3",
        type: "multiple-choice",
        prompt:
          "Qual grupo de operadores tem prioridade sobre soma (+) e subtração (-) em Portugol?",
        options: [
          "Nenhum — todos têm a mesma prioridade",
          "Multiplicação (*), divisão (/) e módulo (%)",
          "Apenas a multiplicação",
          "Apenas os parênteses",
        ],
        correctIndex: 1,
      },
      {
        id: "ar-1-4",
        type: "fill-blank",
        prompt: "Complete para calcular o resto da divisão de 10 por 3.",
        code: "inteiro resto\nresto = 10 ___ 3",
        options: ["%", "/", "*", "div"],
        correctAnswer: "%",
        explanation: "O símbolo % é o operador de módulo (resto da divisão).",
      },
      {
        id: "ar-1-5",
        type: "multiple-choice",
        prompt: "Qual é o resultado de '10 % 3'?",
        options: ["3", "1", "0", "10"],
        correctIndex: 1,
        explanation: "10 dividido por 3 dá 3 com resto 1.",
      },
    ],
  },
  {
    id: "ar-2",
    unitId: "operadores-aritmeticos",
    title: "Divisão Inteira e Módulo",
    description: "O que acontece ao dividir dois inteiros",
    icon: "🧮",
    exercises: [
      {
        id: "ar-2-1",
        type: "multiple-choice",
        prompt:
          "Se 'valor' é do tipo inteiro, o que faz o comando 'valor / 2'?",
        options: [
          "Sempre retorna um número real, com casas decimais",
          "Retorna a divisão inteira, descartando as casas decimais",
          "Dá erro de compilação",
          "Retorna o resto da divisão",
        ],
        correctIndex: 1,
        explanation:
          "Entre dois valores inteiro, o operador / faz divisão inteira automaticamente.",
      },
      {
        id: "ar-2-2",
        type: "fill-blank",
        prompt: "Complete para calcular a metade inteira do valor.",
        code: "inteiro metade, valor = 7\nmetade = valor ___ 2\nescreva(metade)",
        options: ["/", "%", "*", "div"],
        correctAnswer: "/",
      },
      {
        id: "ar-2-3",
        type: "multiple-choice",
        prompt:
          "Qual é a saída deste trecho?\n\ninteiro valor = 7\nescreva(valor / 2)",
        options: ["3", "3.5", "4", "0"],
        correctIndex: 0,
      },
      {
        id: "ar-2-4",
        type: "multiple-choice",
        prompt:
          "Qual operador retorna o RESTO de uma divisão entre dois números inteiros?",
        options: ["/", "%", "//", "resto"],
        correctIndex: 1,
      },
      {
        id: "ar-2-5",
        type: "order-blocks",
        prompt: "Ordene o trecho que calcula e exibe o resto de 17 por 5.",
        blocks: ["inteiro resto", "resto = 17 % 5", "escreva(resto)"],
      },
    ],
  },

  {
    id: "ar-3",
    unitId: "operadores-aritmeticos",
    title: "Desafio de Código",
    description: "Calcule um resto de divisão do zero",
    icon: "⌨️",
    exercises: [
      {
        id: "ar-3-1",
        type: "code",
        prompt: "Leia dois números inteiros e exiba o resto da divisão do primeiro pelo segundo.",
        starterCode:
          "programa\n{\n  funcao inicio()\n  {\n    inteiro a, b\n    leia(a)\n    leia(b)\n\n    // Exiba o resto da divisão de a por b\n\n  }\n}",
        inputs: ["17", "5"],
        expectedOutput: "2",
        hint: "Use o operador %: escreva(a % b)",
      },
    ],
  },

  // ─────────────────── Unidade 8: Escolha e Caso ───────────────────
  {
    id: "esc-1",
    unitId: "escolha-caso",
    title: "Escolha (switch)",
    description: "Testando vários valores possíveis de uma variável",
    icon: "🎯",
    exercises: [
      {
        id: "esc-1-1",
        type: "multiple-choice",
        prompt:
          "Qual comando permite testar vários valores possíveis de uma mesma variável, como alternativa a vários 'se/senao'?",
        options: ["repita", "escolha", "funcao", "vetor"],
        correctIndex: 1,
      },
      {
        id: "esc-1-2",
        type: "fill-blank",
        prompt: "Complete para encerrar o caso e evitar que ele continue para o próximo.",
        code: 'escolha (opcao)\n{\n  caso 1:\n    escreva("Primeira opção")\n  ___\n\n  caso contrario:\n    escreva("Opção inválida")\n}',
        options: ["pare", "fimcaso", "break;", "fimse"],
        correctAnswer: "pare",
        explanation:
          "'pare' encerra o caso atual, evitando que a execução continue para o próximo 'caso'.",
      },
      {
        id: "esc-1-3",
        type: "multiple-choice",
        prompt:
          'Qual é a saída deste trecho?\n\ninteiro dia = 3\nescolha (dia)\n{\n  caso 1:\n    escreva("Segunda")\n  pare\n\n  caso 2:\n    escreva("Terça")\n  pare\n\n  caso 3:\n    escreva("Quarta")\n  pare\n\n  caso contrario:\n    escreva("Dia inválido")\n}',
        options: ["Quarta", "Terça", "Dia inválido", "3"],
        correctIndex: 0,
      },
      {
        id: "esc-1-4",
        type: "order-blocks",
        prompt: "Ordene o trecho que trata a nota 10 em uma estrutura 'escolha'.",
        blocks: [
          "escolha (nota)",
          "{",
          "caso 10:",
          'escreva("Perfeito!")',
          "pare",
          "}",
        ],
      },
      {
        id: "esc-1-5",
        type: "multiple-choice",
        prompt: "O que o 'caso contrario' representa dentro de uma estrutura 'escolha'?",
        options: [
          "O primeiro caso testado",
          "Um erro de sintaxe",
          "O bloco executado quando nenhum outro 'caso' corresponde ao valor",
          "Uma repetição infinita",
        ],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "esc-2",
    unitId: "escolha-caso",
    title: "Desafio de Código",
    description: "Escreva uma estrutura escolha do zero",
    icon: "⌨️",
    exercises: [
      {
        id: "esc-2-1",
        type: "code",
        prompt:
          "Leia um número de 1 a 3 e exiba o nome do lugar no pódio (1=Ouro, 2=Prata, 3=Bronze) usando 'escolha'.",
        starterCode:
          "programa\n{\n  funcao inicio()\n  {\n    inteiro posicao\n    leia(posicao)\n\n    // Complete a estrutura escolha\n\n  }\n}",
        inputs: ["2"],
        expectedOutput: "Prata",
        hint: 'Use escolha (posicao) { caso 1: escreva("Ouro") pare caso 2: escreva("Prata") pare caso 3: escreva("Bronze") pare }',
      },
    ],
  },

  // ─────────────────── Unidade 9: Matrizes ───────────────────
  {
    id: "mat-1",
    unitId: "matrizes",
    title: "Declarando Matrizes",
    description: "Vetores de duas dimensões (linhas e colunas)",
    icon: "🗂️",
    exercises: [
      {
        id: "mat-1-1",
        type: "multiple-choice",
        prompt:
          "Como se declara uma matriz de 3 linhas por 4 colunas de números inteiros?",
        options: [
          "inteiro m[3, 4]",
          "inteiro m[3][4]",
          "matriz inteiro m(3,4)",
          "inteiro m[3..4]",
        ],
        correctIndex: 1,
        explanation:
          "Uma matriz é declarada com dois pares de colchetes: [linhas][colunas].",
      },
      {
        id: "mat-1-2",
        type: "multiple-choice",
        prompt: "Como acessamos o elemento da linha 2 e coluna 1 de uma matriz 'm'?",
        options: ["m[2, 1]", "m(2)(1)", "m[2][1]", "m.get(2,1)"],
        correctIndex: 2,
      },
      {
        id: "mat-1-3",
        type: "fill-blank",
        prompt: "Complete a declaração de uma matriz TAMANHO x TAMANHO.",
        code: "const inteiro TAMANHO = 5\ncaracter matriz___",
        options: ["[TAMANHO][TAMANHO]", "[TAMANHO, TAMANHO]", "(TAMANHO, TAMANHO)", "[TAMANHO x TAMANHO]"],
        correctAnswer: "[TAMANHO][TAMANHO]",
      },
      {
        id: "mat-1-4",
        type: "multiple-choice",
        prompt:
          "Em Portugol Studio, como se escreve um valor literal do tipo 'caracter' (um único caractere)?",
        options: [
          'Entre aspas duplas, como "a"',
          "Entre aspas simples, como 'a'",
          "Sem nenhuma marcação, como a",
          "Entre colchetes, como [a]",
        ],
        correctIndex: 1,
        explanation:
          "Aspas duplas são usadas para 'cadeia' (texto); aspas simples são usadas para um único 'caracter'.",
      },
      {
        id: "mat-1-5",
        type: "order-blocks",
        prompt: "Ordene a declaração de uma matriz de caracteres TAMANHO x TAMANHO.",
        blocks: ["const inteiro TAMANHO = 5", "caracter matriz[TAMANHO][TAMANHO]"],
      },
    ],
  },
  {
    id: "mat-2",
    unitId: "matrizes",
    title: "Percorrendo Matrizes",
    description: "Laços aninhados e passagem por referência",
    icon: "🔲",
    exercises: [
      {
        id: "mat-2-1",
        type: "multiple-choice",
        prompt:
          "Qual é a saída deste trecho?\n\ninteiro m[2][2]\nm[0][0] = 1\nm[0][1] = 2\nm[1][0] = 3\nm[1][1] = 4\nescreva(m[1][0])",
        options: ["3", "1", "2", "4"],
        correctIndex: 0,
      },
      {
        id: "mat-2-2",
        type: "order-blocks",
        prompt: "Ordene os laços aninhados que percorrem todas as posições de m.",
        blocks: [
          "para (inteiro linha = 0; linha < 3; linha++)",
          "{",
          "para (inteiro coluna = 0; coluna < 3; coluna++)",
          "{",
          "escreva(m[linha][coluna])",
          "}",
          "}",
        ],
      },
      {
        id: "mat-2-3",
        type: "multiple-choice",
        prompt: "Para percorrer todas as posições de uma matriz, geralmente usamos:",
        options: [
          "Um único laço 'para'",
          "Dois laços 'para' aninhados (um para linha, um para coluna)",
          "Um laço 'enquanto' apenas",
          "Não é possível percorrer uma matriz",
        ],
        correctIndex: 1,
      },
      {
        id: "mat-2-4",
        type: "fill-blank",
        prompt: "Complete a atribuição dentro da função.",
        code: "funcao preenche(inteiro &matriz[][])\n{\n  matriz[0][0] ___ 100\n}",
        options: ["=", "<-", "==", ":"],
        correctAnswer: "=",
      },
      {
        id: "mat-2-5",
        type: "multiple-choice",
        prompt:
          "Ao declarar um parâmetro de função como 'inteiro &matriz[][]', o que significa o símbolo '&' antes do nome?",
        options: [
          "É apenas um comentário",
          "Indica que a matriz é passada por referência (alterações dentro da função afetam a matriz original)",
          "Indica que a matriz é somente leitura",
          "É obrigatório em toda função",
        ],
        correctIndex: 1,
        explanation:
          "Sem o '&', a função receberia uma cópia da matriz e as alterações não seriam refletidas fora dela.",
      },
    ],
  },
  {
    id: "mat-3",
    unitId: "matrizes",
    title: "Desafio de Código",
    description: "Escreva uma matriz do zero",
    icon: "⌨️",
    exercises: [
      {
        id: "mat-3-1",
        type: "code",
        prompt:
          "Preencha a matriz 2x2 com os valores 1, 2, 3 e 4 (linha por linha) e exiba a soma dos elementos da diagonal principal (m[0][0] + m[1][1]).",
        starterCode:
          "programa\n{\n  funcao inicio()\n  {\n    inteiro m[2][2]\n\n    m[0][0] = 1\n    m[0][1] = 2\n    m[1][0] = 3\n    m[1][1] = 4\n\n    // Exiba a soma da diagonal principal\n\n  }\n}",
        expectedOutput: "5",
        hint: "escreva(m[0][0] + m[1][1])",
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

# Aprenda Portugol

Uma trilha gamificada de lições para aprender lógica de programação com
**Portugol**, na sintaxe do [Portugol Studio](https://github.com/UNIVALI-LITE/Portugol-Studio)
(UNIVALI) — a mesma linguagem do Portugol Web Studio. Exercícios curtos e
interativos, corações (vidas), XP e sequência de dias — tudo salvo
localmente no navegador.

A sintaxe de cada exercício foi conferida contra exemplos reais do
repositório oficial do Portugol Studio, para ficar fiel ao que é ensinado
e executado nessas ferramentas.

## Conteúdo

9 unidades, 26 lições, 94 exercícios cobrindo:

1. **Primeiros Passos** — estrutura `programa { funcao inicio() { ... } }`, comentários
2. **Entrada e Saída** — variáveis, tipos (`inteiro`, `real`, `cadeia`, `caracter`, `logico`), `leia`/`escreva`
3. **Decisões** — `se (...) { } senao { }`, operadores relacionais (`==`, `!=`) e lógicos (`e`, `ou`, `nao`)
4. **Repetições** — `para (inteiro i = 1; i <= n; i++)`, `enquanto`, `faca...enquanto`
5. **Vetores** — declaração (`tipo nome[tamanho]`) e percorrimento — índices começam em **0**
6. **Funções** — `funcao tipo nome(...)` com `retorne`; funções sem tipo de retorno (o equivalente a "procedimento" em outros dialetos)
7. **Operadores Aritméticos** — precedência de `* / %` sobre `+ -`, parênteses, divisão inteira e módulo
8. **Escolha e Caso** — `escolha (...) { caso valor: ... pare ... caso contrario: ... }`
9. **Matrizes** — vetores bidimensionais (`tipo nome[linhas][colunas]`), laços aninhados e passagem por referência (`&`)

Cada lição mistura quatro tipos de exercício: múltipla escolha, completar
código (fill-in-the-blank), ordenar blocos de código e um **desafio de
código aberto** ao final de cada unidade — um editor de verdade onde você
escreve o programa do zero e ele é executado por um interpretador de
Portugol Studio implementado neste projeto (`src/lib/portugol/`), com
saída de console e mensagens de erro reais.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

Outros comandos:

```bash
npm run build    # build de produção em dist/
npm run lint     # oxlint
npm run preview  # serve o build de produção localmente
```

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Progresso (XP, sequência, lições concluídas) persistido em `localStorage` —
  não há backend nesta primeira versão.

## Estrutura

```
src/
  data/            conteúdo das unidades e lições (fonte da verdade do curso)
  components/      trilha, nós de lição, barra de corações/progresso, exercícios
  pages/           Home (trilha) e Lição (execução dos exercícios)
  state/           contexto de progresso (XP, streak, corações, localStorage)
  lib/             lógica de correção de exercícios e utilidades
  lib/portugol/    interpretador de Portugol Studio (lexer, parser, avaliador),
                   usado para rodar e corrigir os desafios de código aberto
```

## Créditos e referências

Este é um projeto de estudo independente, sem vínculo oficial com a
UNIVALI. A sintaxe usada em todos os exercícios foi cuidadosamente
alinhada com o **Portugol Studio**, ambiente de programação didática
desenvolvido pelo Laboratório de Inovação Tecnológica na Educação (LITE)
da Universidade do Vale do Itajaí (UNIVALI) — a mesma linguagem/compilador
usado pelo Portugol Web Studio. Cada trecho de código deste app foi
conferido contra exemplos reais do repositório oficial do projeto, para
não introduzir sintaxe inventada:

- Portugol Studio: <https://github.com/UNIVALI-LITE/Portugol-Studio>
- Site oficial: <https://univali-lite.github.io/Portugol-Studio/>
- Exemplos de referência consultados: <https://github.com/UNIVALI-LITE-BACKUP/Portugol-Studio-Recursos>
  (exemplos originais de autoria de Giordana Maria da Costa Valle e Carlos
  Alexandre Krueger, UNIVALI, 2013)

Se você for citar este material em um trabalho acadêmico, a referência
correta para a ferramenta/linguagem é o próprio Portugol Studio, por
exemplo:

> UNIVALI — Laboratório de Inovação Tecnológica na Educação (LITE).
> **Portugol Studio**. Itajaí: UNIVALI. Disponível em:
> <https://univali-lite.github.io/Portugol-Studio/>.

## Possíveis próximos passos

- Suporte a mais bibliotecas do Portugol Studio no interpretador (`Util`, `Texto`, `Matematica`)
- Mais unidades (registros/`tipo`, recursão, biblioteca de texto/cadeia)
- Sistema de conquistas/badges
- Sincronizar progresso com uma conta (backend)
- Efeitos sonoros e animações de acerto/erro

# Aprenda Portugol

Um "Duolingo" para quem está aprendendo lógica de programação com **Portugol**
(pseudocódigo em português, no estilo VisuAlg). Trilha de lições com
exercícios curtos e interativos, corações (vidas), XP e sequência de dias —
tudo salvo localmente no navegador.

## Conteúdo

6 unidades, 12 lições, 60 exercícios cobrindo:

1. **Primeiros Passos** — estrutura de um algoritmo, comentários
2. **Entrada e Saída** — variáveis, tipos (`inteiro`, `real`, `caractere`, `logico`), `leia`/`escreva`
3. **Decisões** — `se...entao...senao`, operadores relacionais e lógicos
4. **Repetições** — `para`, `enquanto`, `repita...ate`
5. **Vetores** — declaração e percorrimento de vetores
6. **Funções e Procedimentos** — `funcao`, `procedimento`, `retorne`

Cada lição mistura três tipos de exercício: múltipla escolha, completar
código (fill-in-the-blank) e ordenar blocos de código.

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
  data/         conteúdo das unidades e lições (fonte da verdade do curso)
  components/   trilha, nós de lição, barra de corações/progresso, exercícios
  pages/        Home (trilha) e Lição (execução dos exercícios)
  state/        contexto de progresso (XP, streak, corações, localStorage)
  lib/          lógica de correção de exercícios e utilidades
```

## Possíveis próximos passos

- Editor de código embutido para exercícios "escreva o algoritmo do zero"
- Mais unidades (matrizes, registros/`tipo`, recursão)
- Sistema de conquistas/badges
- Sincronizar progresso com uma conta (backend)
- Efeitos sonoros e animações de acerto/erro

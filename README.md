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

6 unidades, 12 lições, 60 exercícios cobrindo:

1. **Primeiros Passos** — estrutura `programa { funcao inicio() { ... } }`, comentários
2. **Entrada e Saída** — variáveis, tipos (`inteiro`, `real`, `cadeia`, `caracter`, `logico`), `leia`/`escreva`
3. **Decisões** — `se (...) { } senao { }`, operadores relacionais (`==`, `!=`) e lógicos (`e`, `ou`, `nao`)
4. **Repetições** — `para (inteiro i = 1; i <= n; i++)`, `enquanto`, `faca...enquanto`
5. **Vetores** — declaração (`tipo nome[tamanho]`) e percorrimento — índices começam em **0**
6. **Funções** — `funcao tipo nome(...)` com `retorne`; funções sem tipo de retorno (o equivalente a "procedimento" em outros dialetos)

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

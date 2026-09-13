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

## Praticar

Além da trilha principal, a aba **Praticar** reúne modos de estudo livre,
sem afetar XP/streak/corações da trilha:

- **Flashcards** — 40 cards (fácil/médio/difícil) com enunciado, dica
  opcional, solução comentada e explicação. Vire a carta, avalie se
  acertou, acompanhe pontuação com bônus de sequência e veja quantos
  cards você já domina — tudo persistido em `localStorage`, então seu
  progresso sobrevive a um F5. Suporta teclado (espaço/enter vira, ← → 
  navega, 1/2 marca acertei/errei, H mostra a dica).

## Conta e progresso na nuvem

Sem nenhuma configuração, o app já funciona completo em **modo visitante**:
todo o progresso (trilha e flashcards) fica salvo em `localStorage`, só
neste navegador. Se você quiser criar uma conta para acessar seu progresso
de qualquer aparelho, o app usa [Supabase](https://supabase.com) (Postgres +
autenticação) como backend — não existe um servidor próprio deste projeto.

Para habilitar:

1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. No **SQL Editor** do painel, rode o conteúdo de `supabase/schema.sql`
   deste repositório — cria as tabelas de progresso e as políticas de RLS
   (cada usuário só acessa os próprios dados).
3. Em **Project Settings → API**, copie a **Project URL** e a chave
   **anon public** (ou **publishable**, nos projetos mais novos).
4. Copie `.env.example` para `.env.local` e cole os dois valores.

Sem essas variáveis, a tela de conta simplesmente avisa que a
sincronização não está configurada e o app segue em modo visitante — nada
quebra. Ao logar pela primeira vez, o progresso local é mesclado com o
que já existir na nuvem (nunca sobrescreve, só soma/mantém o melhor de
cada lado).

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
- Supabase (Postgres + Auth) para conta e sincronização de progresso na
  nuvem — opcional; sem configurar, tudo funciona só com `localStorage`.

## Estrutura

```
src/
  data/            conteúdo das unidades/lições e dos flashcards
  components/      trilha, nós de lição, tab bar, barra de corações/progresso, exercícios
  pages/           Home (trilha), Praticar (hub), Flashcards, Lição e Conta
  state/           auth, progresso da trilha e dos flashcards (localStorage + Supabase)
  lib/             cliente Supabase, sincronização de progresso, correção de exercícios
  lib/portugol/    interpretador de Portugol Studio (lexer, parser, avaliador),
                   usado para rodar e corrigir os desafios de código aberto
supabase/
  schema.sql       tabelas de progresso + políticas de RLS (rode no SQL Editor do Supabase)
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

Os 40 flashcards da aba Praticar têm origem no projeto
[Portugol Flash Cards](https://github.com/jeffersonwagner/portugol-flash-cards),
do mesmo autor deste repositório, com conteúdo revisado e integrado à
interface e ao sistema de progresso deste app.

## Possíveis próximos passos

- Suporte a mais bibliotecas do Portugol Studio no interpretador (`Util`, `Texto`, `Matematica`)
- Mais unidades (registros/`tipo`, recursão, biblioteca de texto/cadeia)
- Sistema de conquistas/badges
- Login social (Google) além de e-mail/senha
- Indicador de status de sincronização (hoje ela é "melhor esforço" e silenciosa)
- Efeitos sonoros e animações de acerto/erro
- Deploy público

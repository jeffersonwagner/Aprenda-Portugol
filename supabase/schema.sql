-- Aprenda Portugol — schema de progresso na nuvem
--
-- Como usar: no painel do Supabase, abra "SQL Editor" e rode este arquivo
-- inteiro uma vez. Ele cria as tabelas de progresso e as políticas de RLS
-- (Row Level Security) que garantem que cada usuário só enxerga e altera
-- os próprios dados — nunca os de outra pessoa.
--
-- Pode rodar de novo com segurança: os "if not exists" e "drop policy if
-- exists" evitam erro em uma segunda execução.

-- ───────────────────────── Progresso da trilha ─────────────────────────
create table if not exists public.lesson_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  xp integer not null default 0,
  streak integer not null default 0,
  last_active_date date,
  lesson_progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.lesson_progress enable row level security;

drop policy if exists "select own lesson progress" on public.lesson_progress;
create policy "select own lesson progress" on public.lesson_progress
  for select using (auth.uid() = user_id);

drop policy if exists "insert own lesson progress" on public.lesson_progress;
create policy "insert own lesson progress" on public.lesson_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "update own lesson progress" on public.lesson_progress;
create policy "update own lesson progress" on public.lesson_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ───────────────────────── Progresso dos flashcards ─────────────────────────
create table if not exists public.flashcards_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  results jsonb not null default '{}'::jsonb,
  total_score integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.flashcards_progress enable row level security;

drop policy if exists "select own flashcards progress" on public.flashcards_progress;
create policy "select own flashcards progress" on public.flashcards_progress
  for select using (auth.uid() = user_id);

drop policy if exists "insert own flashcards progress" on public.flashcards_progress;
create policy "insert own flashcards progress" on public.flashcards_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "update own flashcards progress" on public.flashcards_progress;
create policy "update own flashcards progress" on public.flashcards_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ───────────────────────── updated_at automático ─────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.lesson_progress;
create trigger set_updated_at
  before update on public.lesson_progress
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.flashcards_progress;
create trigger set_updated_at
  before update on public.flashcards_progress
  for each row execute function public.set_updated_at();

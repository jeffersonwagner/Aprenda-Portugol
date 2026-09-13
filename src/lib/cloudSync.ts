import { supabase } from "./supabase";

/** Fetches the single row belonging to `userId` from a progress table, or null. */
export async function fetchCloudRow<T>(
  table: string,
  userId: string
): Promise<T | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) {
    console.error(`Erro ao buscar ${table}:`, error.message);
    return null;
  }
  return (data as T) ?? null;
}

/** Upserts (creates or replaces) the row belonging to `userId` in a progress table. */
export async function upsertCloudRow(
  table: string,
  userId: string,
  data: Record<string, unknown>
): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase
    .from(table)
    .upsert({ user_id: userId, ...data }, { onConflict: "user_id" });
  if (error) {
    console.error(`Erro ao salvar ${table}:`, error.message);
  }
}

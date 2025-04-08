import { createClient } from "@supabase/supabase-js";
import { DATA_SUPABASE_ANON_KEY, DATA_SUPABASE_URL } from "@env";

export const dataSupabase = createClient(
  DATA_SUPABASE_URL,
  DATA_SUPABASE_ANON_KEY
);

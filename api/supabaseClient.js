import { createClient } from "@supabase/supabase-js";
import {
  AUTH_SUPABASE_URL,
  AUTH_SUPABASE_ANON_KEY,
  DATA_SUPABASE_URL,
  DATA_SUPABASE_ANON_KEY,
} from "@env"; // Import from dotenv

export const authSupabase = createClient(
  AUTH_SUPABASE_URL,
  AUTH_SUPABASE_ANON_KEY
);
export const dataSupabase = createClient(
  DATA_SUPABASE_URL,
  DATA_SUPABASE_ANON_KEY
);

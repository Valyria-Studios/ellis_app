import { createClient } from "@supabase/supabase-js";

const AUTH_SUPABASE_URL = "https://cwltcznpuhvsvqwnhidm.supabase.co";
const AUTH_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bHRjem5wdWh2c3Zxd25oaWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExOTgwMDUsImV4cCI6MjA1Njc3NDAwNX0.M-ZSRSC_x-Tjg1R3hA7hmwUeco9MllcCqMC47dGpg8c";
export const authSupabase = createClient(
  AUTH_SUPABASE_URL,
  AUTH_SUPABASE_ANON_KEY
);

const DATA_SUPABASE_URL = "https://kvdwmktfynsgcdjebylu.supabase.co"; // Replace with your Supabase URL
const DATA_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2ZHdta3RmeW5zZ2NkamVieWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMDc3NzksImV4cCI6MjA1NjY4Mzc3OX0.poxBxEI-THs-aPAKvgn7ZU-OGGT9R3wm-2DS6tID8Sc"; // Replace with your Supabase API key
export const dataSupabase = createClient(
  DATA_SUPABASE_URL,
  DATA_SUPABASE_ANON_KEY
);

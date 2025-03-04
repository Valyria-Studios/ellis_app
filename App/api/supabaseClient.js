import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://kvdwmktfynsgcdjebylu.supabase.co"; // Replace with your Supabase URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2ZHdta3RmeW5zZ2NkamVieWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMDc3NzksImV4cCI6MjA1NjY4Mzc3OX0.poxBxEI-THs-aPAKvgn7ZU-OGGT9R3wm-2DS6tID8Sc"; // Replace with your Supabase API key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;

import { createClient } from "@supabase/supabase-js";

// Uses environment variables to connect to a Supabase project.
// Create a .env.local file in the root with:
// NEXT_PUBLIC_SUPABASE_URL=your_project_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

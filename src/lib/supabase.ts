import { createClient } from '@supabase/supabase-js';

// Log environment variable loading for debugging
console.log("Supabase config loading...");

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check for missing environment variables
if (!supabaseUrl) {
  console.error("Missing VITE_SUPABASE_URL environment variable");
}

if (!supabaseAnonKey) {
  console.error("Missing VITE_SUPABASE_ANON_KEY environment variable");
}

console.log(`Supabase URL configured: ${supabaseUrl ? 'Yes' : 'No'}`);
console.log(`Supabase Anon Key configured: ${supabaseAnonKey ? 'Yes' : 'No'}`);

// Create the client even if variables are missing, will fail gracefully
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',  // Fallback value to prevent crashes
  supabaseAnonKey || 'placeholder-key'  // Fallback value to prevent crashes
);

// Add a simple test method to check if Supabase is working
export const testSupabaseConnection = async () => {
  try {
    console.log("Testing Supabase connection...");
    const { error } = await supabase.from('health_check').select('*').limit(1);
    
    if (error) {
      console.error("Supabase connection test failed:", error);
      return { success: false, error };
    }
    
    console.log("Supabase connection successful");
    return { success: true };
  } catch (err) {
    console.error("Unexpected error testing Supabase:", err);
    return { success: false, error: err };
  }
};
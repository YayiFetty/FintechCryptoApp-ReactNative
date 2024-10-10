import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = " https://yxkekjuidyagbhloodzm.supabase.co";
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4a2VranVpZHlhZ2JobG9vZHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNTc2NTcsImV4cCI6MjA0MDkzMzY1N30.WQj6srpmXz3sVADhUVvJOlq2n55iLmIZwCE9gHO5QpI'


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

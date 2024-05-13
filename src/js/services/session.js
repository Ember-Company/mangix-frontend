import { supabase } from "../supabase/supabase";

export default async function getSession() {
  return await supabase.auth.getSession();
}

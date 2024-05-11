import { supabase } from "../supabase/supabase";

export default async function CreateAccount(email, password) {
  return await supabase.auth.signUp({
    email,
    password,
  });
}

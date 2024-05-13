import { supabase } from "../supabase/supabase";

export async function logout() {
  return await supabase.auth.signOut();
}

export async function loginUser(email, password) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function createAccount(email, password) {
  return await supabase.auth.signUp({
    email,
    password,
  });
}

export async function getSession() {
  return await supabase.auth.getSession();
}

export async function getUser(session) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user.id);

  const [user] = data;

  return {
    user,
    error,
  };
}

export async function getAllUsers() {
  return await supabase.from("profiles").select("*");
}

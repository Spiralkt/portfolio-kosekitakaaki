"use server";

// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation"; // import redirect from 'next/navigation'.

// async function getUser() {
//   try {
//     const supabase = await createClient();
//     const { data, error } = await supabase.auth.getUser();
//     if (error) throw error;

//     return { data, error }; // if !user, `data.user` returns `null`.
//   } catch {
//     redirect("/error"); // be careful. use "next/navigation".
//   }
// }

// export { getUser };

import { createClient } from "@/utils/supabase/server";

async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  // Don't throw an error or redirect here.

  if (error) {
    console.error(error.message);

    return null;
  }
  console.log(data.user, "@/actions/auth.ts");
  return data.user;
}

export { getUser };

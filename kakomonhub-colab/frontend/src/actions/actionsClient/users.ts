"use client";

// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { handleError } from "@/lib/utils";

import { createClient } from "@/utils/supabase/client"; // make sure u import function from 'server', not 'client'

export async function logOutAction() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // revalidatePath("/", "layout");
  } catch (error) {
    console.error(error);
    console.log("@/actions/users.ts");
    redirect("/error"); // this never shows what error occured to users.
  }
}

// *uses handleError. but, i suppose it's unnecessary for just logOut.
// export async function logOutAction() {
//   try {
//     const supabase = await createClient();

//     const { error } = await supabase.auth.signOut();

//     if (error) throw error;

//     revalidatePath("/", "layout");
//     return { errorMessage: error };
//   } catch (error) {
//     console.error(error);
//     console.log("@/actions/users.ts");
//     return handleError(error);
//   }
// }

export async function loginAction(formData: FormData) {
  try {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) throw error;

    // revalidatePath("/", "layout");
    // redirect("/private");
    return { errorMessage: null };
  } catch (error) {
    console.error(error);
    console.log("@/actions/users.ts");
    // redirect("/error");
    return handleError(error);
  }
}

// export async function loginAction(formData: FormData) {
//   const supabase = await createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { error } = await supabase.auth.signInWithPassword(data);
//   if (error) {
//     console.error(error);
//     console.log("@/actions/users.ts");
//     redirect("/error");
//   }
//   revalidatePath("/", "layout");
//   redirect("/private");
// }

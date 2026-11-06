"use server";

import { revalidatePath } from "next/cache";
import { handleError } from "@/lib/utils";

import { createClient } from "@/utils/supabase/server"; // make sure u import function from 'server', not 'client'
import { prisma } from "@/db/prisma";

export async function signUpAction(formData: FormData) {
  try {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const authData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { data, error } = await supabase.auth.signUp(authData);
    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Error signing up.");

    await prisma.user.create({
      data: {
        id: userId,
        email: authData.email,
      },
    });

    // if (data.user) {
    //   redirect("/direction/exception/is-user"); // these should be handled not by manually, but by libraries.
    // }

    revalidatePath("/", "layout");
    // redirect("/direction/confirm"); // change to goat method. and, redirect after the message shown.
    return { errorMessage: null };
  } catch (error) {
    console.error(error);
    console.log("@/actions/users.ts");
    // redirect("/error");
    return handleError(error);
  }
}

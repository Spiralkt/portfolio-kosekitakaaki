"use client";

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// import { loginAction, signUpAction } from "@/actions/tutorialFCC_users";
import { loginAction } from "@/actions/actionsClient/users";
import { signUpAction } from "@/actions/users";

type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      //use this for all sever side activities.

      let errorMessage;

      if (isLoginForm) {
        // await loginAction(formData);
        errorMessage = (await loginAction(formData)).errorMessage;
        console.log("this code never run. after redirection to /error.");
        if (!errorMessage) {
          toast.success("Logged in!");
          router.replace("/private");
        } else {
          toast.error(errorMessage);
        }
      } else {
        // await signUpAction(formData);
        errorMessage = (await signUpAction(formData)).errorMessage;
        console.log("this code never run. after redirection to /error.");
        if (!errorMessage) {
          toast.success("Signed up!", {
            description: "Please check your email.",
          });
          router.replace("/direction/confirm");
        } else {
          toast.error(errorMessage);
        }
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="example@dc.tohoku.ac.jp"
            type="email"
            required
            disabled={isPending}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {isLoginForm ? (
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            ) : null}
          </div>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-6 flex flex-col gap-6">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-center text-sm">
          {isLoginForm ? "Don't have an account?" : "Have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 underline underline-offset-4 ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;

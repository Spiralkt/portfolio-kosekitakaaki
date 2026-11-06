// "use client"; // forget this function now. we can do this later and this is minor.

import Link from "next/link";
import { ModeToggle } from "@/components/individuals/ModeToggle";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/individuals/LogoutButton";
import { getUser } from "@/actions/auth";
// import { createClient } from "@/utils/supabase/server";

// import { useEffect, useState } from "react";
// import type { User } from "@supabase/supabase-js";

// export default function Header({ user }: { user: User | null }) {
export default async function Header() {
  const user = await getUser();

  console.log("@/components/atmosphere/Header.tsx");

  // useEffect(() => {
  //   const user = whoIsThis();
  //   console.log(user);
  // }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* <SidebarTrigger className="absolute bottom-1 left-1 size-8" /> */}
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              <h1 className="ml-7 flex flex-col pb-1 text-2xl leading-6 font-semibold">
                Kakomon <span>Hub.org</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <a
              href="#home"
              className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Home
            </a>
            <a
              href="#browse"
              className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Browse Exams
            </a>
            <a
              href="#subjects"
              className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Subjects
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              How It Works
            </a>
            <a
              href="#about"
              className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              About
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          {/* <div className="hidden items-center space-x-4 md:flex">
            <button className="font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              <Link href="/login">Login</Link>
            </button>
            <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700">
              Sign Up
            </button>
            <div className="ml-5">
              <ModeToggle />
            </div>
          </div> */}
          <div className="flex gap-4">
            {user ? (
              <>
                <Button asChild>
                  <Link href="/private/dashboard">Dashboard</Link>
                </Button>
                <LogoutButton />
              </>
            ) : (
              <>
                <Button asChild variant={"outline"}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

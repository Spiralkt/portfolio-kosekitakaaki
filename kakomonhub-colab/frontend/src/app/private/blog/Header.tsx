import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUser } from "@/actions/auth";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              <h1 className="ml-3 flex flex-col pb-1 text-2xl leading-6 font-semibold">
                Kakomon <span>Hub.org</span>
              </h1>
            </Link>
          </div>

          {/* search */}
          <div className="hidden items-center space-x-8 md:flex">
            <a>search</a>
          </div>

          <div className="flex gap-4">
            {user ? (
              <>
                <Button asChild>
                  <Link href="/private/dashboard">Dashboard</Link>
                </Button>
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
          </div>
        </div>
      </nav>
    </header>
  );
}

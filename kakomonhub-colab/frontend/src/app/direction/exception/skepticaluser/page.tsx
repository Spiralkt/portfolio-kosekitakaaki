import Link from "next/link";
export default function IsUser() {
  return (
    <div>
      <h1>Yo, how tf did you find this page?</h1>
      <h1>
        This is an authority warning. You just have attempted to access my
        private directory.
      </h1>
      <h1>
        if you are not an attacker, and somehow you are here by chance, click{" "}
        <Link
          href="/login"
          className="text-blue-500 underline underline-offset-4"
        >
          this to login
        </Link>
        .
        <h1>
          ...and, please make this confidencial. I dont wanna be inspected my
          personal property, dude.
        </h1>
      </h1>
    </div>
  );
}

// components/Navigation.js

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-xl font-bold">
          <Link href="/">Etouri</Link>
        </div>
        <div className="space-x-4">
          <Link href="/user-login"> User Login </Link>
        </div>
      </div>
    </nav>
  );
}

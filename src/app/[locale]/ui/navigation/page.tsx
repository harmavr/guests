// components/Navigation.js

import { loginAction } from "@/src/app/[locale]/lib/features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/[locale]/lib/hooks";
import Link from "next/link";
import { GoogleLogoutButton } from "../google-logout-button";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function Navigation() {

  // const loggedIn = useAppSelector(state => state.login.loggedIn)

  const user = useAppSelector(state => state.login.loggedInUser)

  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')

  const handleButton = () => {

    dispatch(loginAction.logout())

  }

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {

        console.log(session.user?.name);

        setUsername(session.user?.name!)

        // dispatch(loginAction.login({ user: session.user?.name }));  // Perform login action if authenticated
      }
    };

    checkSession();
  },);

  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Home Link */}
        <div className="text-black text-2xl font-bold hover:text-gray-700">
          <Link href="/">Etouri</Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/etouri-properties"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Etouri Properties
          </Link>

          <div className="text-gray-700">
            Hello, <span className="font-semibold">{username}</span>
          </div>

          <GoogleLogoutButton>
            Logout
          </GoogleLogoutButton>
        </div>
      </div>
    </nav>

  );
}

// components/Navigation.js
"use client";
import { loginAction } from "@/src/app/[locale]/lib/features/login/loginSlice";
import {
	useAppDispatch,
	useAppSelector,
} from "@/src/app/[locale]/lib/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import {
	useLocale,
	useTranslations,
} from "next-intl";
import { GoogleLogoutButton } from "../authentication/google-logout-button";
import LocaleSwitcher from "../locale/locale-switcher";

export default function MainNavigation() {
	// const loggedIn = useAppSelector(state => state.login.loggedIn)

	const user = useAppSelector(
		(state) => state.login.loggedInUser
	);

	const dispatch = useAppDispatch();

	const [username, setUsername] = useState("");

	const handleButton = () => {
		dispatch(loginAction.logout());
	};

	const localeActive = useLocale();
	// console.log(localeActive);

	useEffect(() => {
		const checkSession = async () => {
			const session = await getSession();
			if (session) {
				console.log(session.user?.name);

				setUsername(session.user?.name!);
			}
		};

		checkSession();
	});

	const t = useTranslations("Navigation");

	return (
		<nav className="bg-white shadow-lg p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-black text-2xl font-bold hover:text-gray-700">
					<Link
						href={`/${localeActive}/map-container`}
					>
						Etouri
					</Link>
				</div>

				<div className="flex items-center space-x-6">
					<Link
						href={`/${localeActive.replace(
							/^\/?/,
							""
						)}/reservations`}
						className="text-gray-600 hover:text-gray-800 transition-colors duration-200 "
					>
						Reservations
					</Link>

					{/* <Link
						href={`/${localeActive}/home-page`}
					>
						Reservations
					</Link> */}

					<div className="text-gray-700">
						Hello,{" "}
						<span className="font-semibold">
							{username}
						</span>
					</div>

					<GoogleLogoutButton>
						Logout
					</GoogleLogoutButton>

					<LocaleSwitcher />
				</div>
			</div>
		</nav>
	);
}

// components/Navigation.js
"use client";
import { loginAction } from "@/src/app/[locale]/(content)/lib/features/login/loginSlice";
import {
	useAppDispatch,
	useAppSelector,
} from "@/src/app/[locale]/(content)/lib/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import {
	useLocale,
	useTranslations,
} from "next-intl";
import { GoogleLogoutButton } from "../authentication/google-logout-button";
import LocaleSwitcher from "../locale/locale-switcher";
import UserLoginDropdown from "../userLoginDropdown/userLoginDropdown";
import SecondaryMainNavigation from "./mainNavigation/secondaryNavigation";

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
		<nav className="bg-white shadow-lg p-4 sticky top-0 z-10">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-black text-2xl font-bold hover:text-gray-700">
					<Link
						className="hover:underline"
						href={`/${localeActive}/map-container`}
					>
						<i>Etouri</i>
					</Link>
				</div>

				<div className="flex items-center space-x-6">
					{/* <Link

						href={`/${localeActive.replace(
							/^\/?/,
							""
						)}/reservations`}
						className="text-gray-600 hover:underline  "
					>
						Reservations
					</Link>

					<Link href={`/${localeActive}/layouts`} className="text-gray-600 hover:underline  ">
						Layouts
					</Link> */}

					<UserLoginDropdown user={username} />

					<LocaleSwitcher />
					<GoogleLogoutButton>
						Logout
					</GoogleLogoutButton>

					<SecondaryMainNavigation />
				</div>
			</div>
		</nav>
	);
}

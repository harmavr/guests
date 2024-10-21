import Link from "next/link";
import React from "react";
import { GoogleLogoutButton } from "../../authentication/google-logout-button";
import LocaleSwitcher from "../../locale/locale-switcher";
import UserLoginDropdown from "../../userLoginDropdown/userLoginDropdown";
import { useLocale } from "next-intl";

export default function SecondaryMainNavigation() {
	const localeActive = useLocale();

	return (
		<nav className="bg-white shadow-lg p-4 sticky top-0 ">
			<div className="container mx-auto flex justify-start items-center">
				<div className="text-black text-2xl font-bold hover:text-gray-700"></div>

				<div className="flex items-center space-x-6">
					<Link
						href={`/${localeActive.replace(
							/^\/?/,
							""
						)}/reservations`}
						className="text-gray-600 hover:underline  "
					>
						Reservations
					</Link>

					<Link
						href={`/${localeActive}/layouts`}
						className="text-gray-600 hover:underline  "
					>
						Layouts
					</Link>

					{/* <UserLoginDropdown user={username} /> */}
				</div>
			</div>
		</nav>
	);
}

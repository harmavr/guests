import Link from "next/link";
import React from "react";
import { GoogleLogoutButton } from "../../authentication/google-logout-button";
import LocaleSwitcher from "../../locale/locale-switcher";
import UserLoginDropdown from "../../userLoginDropdown/userLoginDropdown";
import {
	useLocale,
	useTranslations,
} from "next-intl";

export default function SecondaryMainNavigation() {
	const localeActive = useLocale();

	const t = useTranslations(
		"SecondaryNavigation"
	);

	return (
		<nav className="bg-orange-50 p-2  sticky top-20 -z-10">
			<div className="container mx-auto flex justify-start items-center ">
				<div className="flex items-center space-x-6">
					<Link
						href={`/${localeActive.replace(
							/^\/?/,
							""
						)}/reservations`}
						className="text-gray-600 hover:underline  "
					>
						{t("Reservations")}
					</Link>

					<Link
						href={`/${localeActive}/layouts`}
						className="text-gray-600 hover:underline  "
					>
						{t("Layouts")}
					</Link>

					{/* <UserLoginDropdown user={username} /> */}
				</div>
			</div>
		</nav>
	);
}

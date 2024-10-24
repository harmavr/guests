import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "@/src/app/[locale]/globals.css";

import { getMessages } from "next-intl/server";
import { StoreProvider } from "./[locale]/StoreProvider";
import PrimaryNavigation from "./[locale]/(content)/components/navigation/mainNavigation/primaryNavigation";
import SecondaryMainNavigation from "./[locale]/(content)/components/navigation/mainNavigation/secondaryNavigation";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body className="">
				<StoreProvider>
					<NextIntlClientProvider
						messages={messages}
					>
						{children}
					</NextIntlClientProvider>
				</StoreProvider>
			</body>
		</html>
	);
}

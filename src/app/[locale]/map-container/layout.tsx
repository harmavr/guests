import { ReactNode } from "react";
import Navigation from "../ui/navigation/page";

export default async function RootLayout({
	children,
}: ReactNode) {
	return <div>{children}</div>;
}

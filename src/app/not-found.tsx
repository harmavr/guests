import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

export default function NotFound() {
	const locale = useLocale();

	return (
		<div>
			Page not found Return to the
			<Link href={`/${locale}/map-container`}>
				Home Page{" "}
			</Link>
		</div>
	);
}

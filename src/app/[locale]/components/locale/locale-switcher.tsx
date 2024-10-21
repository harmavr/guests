"use client";

import {
	usePathname,
	useRouter,
} from "next/navigation";
import React, {
	ChangeEvent,
	useTransition,
} from "react";
import { useLocale } from "use-intl";

export default function LocaleSwitcher() {
	const [isPending, startTransition] =
		useTransition();
	const router = useRouter();
	const localActive = useLocale();
	const path = usePathname();

	let nextLocal;

	console.log(path);

	const newPath = path;

	function extractNextPart(path) {
		const match = path.match(
			/\/[a-z]{2}\/([^/]+)/
		);
		if (match) {
			return match[1]; // This captures the part after the language code
		}
		return null;
	}

	const onSelectChange = (
		e: ChangeEvent<HTMLSelectElement>
	) => {
		const nextLocale = e.target.value;
		nextLocal = nextLocale;
		const newPath = extractNextPart(path);
		startTransition(() => {
			console.log(nextLocale);
			router.replace(`/${nextLocale}/${newPath}`);
		});
	};

	return (
		<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
			<select
				value={localActive}
				className="md:w-full"
				name="dropdown"
				id="dropdown"
				onChange={onSelectChange}
				disabled={isPending}
			>
				<option value="en">English</option>
				<option value="gr">Greece</option>
			</select>
		</div>
	);
}

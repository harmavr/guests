"use client";

import {
	usePathname,
	useRouter,
} from "next/navigation";
import LanguageIcon from "@mui/icons-material/Language";

import React, {
	ChangeEvent,
	useState,
	useTransition,
} from "react";
import { useLocale } from "use-intl";

export default function LocaleSwitcher() {
	const [isPending, startTransition] =
		useTransition();

	const [isOpenDropdown, setIsOpenDropdown] =
		useState(false);

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

	const onSelectChange = (locale) => {
		const newPath = extractNextPart(path);
		startTransition(() => {
			router.replace(`/${locale}/${newPath}`);
		});
	};

	const handleChangeLanguage = () => {
		setIsOpenDropdown(!isOpenDropdown);
	};

	return (
		<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 ">
			<button
				className="pointer"
				onClick={handleChangeLanguage}
			>
				<LanguageIcon></LanguageIcon>
			</button>

			{isOpenDropdown && (
				<div
					className="absolute w-fit bg-white shadow-lg border rounded p-2 hover:cursor-pointer"
					id="dropdown"
				>
					<div className="flex flex-col">
						<button
							onClick={() => onSelectChange("en")}
							className="hover:bg-cyan-50"
						>
							English
						</button>
						<button
							onClick={() => onSelectChange("gr")}
							className="hover:bg-cyan-50"
						>
							Greece
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

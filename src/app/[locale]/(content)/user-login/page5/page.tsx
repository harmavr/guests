import React, {
	useEffect,
	useState,
} from "react";
import EmailModal from "../../components/modals/emailModal";
import exportFromJSON from "export-from-json";
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/[locale]/(content)/lib/store";
import { useAppSelector } from "@/src/app/[locale]/(content)/lib/hooks";
import { useSearchParams } from "next/navigation";

export default function Page5() {
	const reservation = useAppSelector(
		(state) => state.reservationData
	);

	const searchParams = useSearchParams();
	const row = parseInt(
		searchParams.get("row") || "0"
	); // Default to 0 if not found

	useEffect(() => {
		const pageButtons = [
			"#page1-button",
			"#page2-button",
			"#page3-button",
			"#page4-button",
			"#page5-button",
		];
		pageButtons.forEach((selector, index) => {
			const button =
				document.querySelector(selector);
			if (button) {
				button.classList.toggle(
					"active",
					index === 4
				); // Set active class for page 5
			}
		});
	}, [row, reservation]);

	const [openModal, setOpenModal] =
		useState(false);

	const modalHandler = () => {
		setOpenModal(!openModal);
	};

	const exportData = () => {
		const data = [reservation[row - 1]];

		const fileName = "localData";
		const exportType = exportFromJSON.types.csv;

		exportFromJSON({
			data,
			fileName,
			fields: [
				"city",
				"detailedUser",
				"kidsAges",
				"numOfAdults",
				"numOfKids",
				"propertyName",
				"tripDetails",
			],
			exportType,
		});
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setOpenModal(true);
	};

	return (
		<div className="flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
				<h1 className="text-2xl font-semibold text-green-600">
					<form onSubmit={onSubmit}>
						{openModal && (
							<EmailModal
								openModal={openModal}
								modalHandler={modalHandler}
							/>
						)}
					</form>
					All your Data has been Saved
				</h1>
				<button onClick={exportData}>
					export data
				</button>
			</div>
		</div>
	);
}

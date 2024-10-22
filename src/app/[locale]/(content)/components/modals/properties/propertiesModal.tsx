import React, { useEffect } from "react";
import {
	Properties,
	ReservationData,
	userData,
} from "../../../lib/types";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../lib/hooks";
import reservationSlice, {
	reservationActions,
} from "../../../lib/features/reservation/reservationSlice";
import { reservationDataActions } from "../../../lib/features/reservationData/reservationDataSlice";
import { useLocale } from "next-intl";

interface ModalDetails {
	openModal: boolean;
	modalHandler(): any;
	properties: any;
	row: number;
}

export default function PropertiesModal({
	properties,
	openModal,
	modalHandler,
	row,
}: ModalDetails) {
	const closeModal = (
		openModal: boolean,
		modalHandler: (arg0: boolean) => void
	) => {
		modalHandler(!openModal);
	};

	useEffect(() => {
		console.log(properties[row]);
	}, [properties, row]);

	const dispatch = useAppDispatch();

	// const prop = useSelector((state: userData) => state.properties);

	const statusHandler = (row: number) => {
		if (properties[row].status === "Confirmed") {
			console.log(
				"reservations",
				properties[row]
			);

			dispatch(
				reservationActions.saveReservation({
					formData: properties[row],
				})
			);
		}
	};

	const localeActive = useLocale();
	// console.log(localeActive);

	return (
		<>
			{openModal && (
				<>
					{/* Modal backdrop */}
					<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

					{/* Modal content */}
					<div className="fixed inset-0 flex items-center justify-center z-10 overflow-auto">
						<div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 space-y-4">
							<h3 className="text-xl font-semibold text-gray-800">
								Message
							</h3>

							<p className="text-gray-700">{`Property Code : #${properties[row].id}`}</p>

							<h1 className="text-2xl font-bold text-blue-600">
								Etouri
							</h1>

							<p className="text-gray-600">
								Pre-check-in form
							</p>

							<p className="text-gray-700">{`Dear ${properties[row].detailedUser.details[0].firstName} ${properties[row].detailedUser.details[0].lastName},`}</p>
							<p className="text-gray-600">
								In order to complete your
								pre-check-in process, please fill
								out the form linked below.
							</p>

							<p className="text-gray-700">{`Reservation ref: ${properties[row].id}`}</p>
							<p className="text-gray-700">{`Traveler's details: ${properties[row].detailedUser.details[0].firstName} ${properties[row].detailedUser.details[0].lastName}`}</p>

							<div className="flex justify-between items-center">
								<button
									className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
									onClick={() =>
										closeModal(
											openModal,
											modalHandler
										)
									}
								>
									Back
								</button>

								<Link
									href={
										properties[row].status ===
										"Pre Check-in"
											? `/${localeActive.replace(
													/^\/?/,
													""
											  )}/user-login?row=${
													row + 1
											  }`
											: `/${localeActive}/reservations`
									}
									onClick={() => {
										closeModal(
											openModal,
											modalHandler
										);
										statusHandler(row);
									}}
									className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
								>
									{properties[row].status ===
									"Pre Check-in"
										? "Complete the pre-check-in form"
										: "Complete Reservation"}
								</Link>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

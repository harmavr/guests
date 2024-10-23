"use client";

import React, {
	useEffect,
	useState,
} from "react";
import { useAppSelector } from "../lib/hooks";
import PropertiesModal from "../components/modals/properties/propertiesModal";
import PaymentsModal from "../components/modals/payments/paymentsModal";
import CreateReservation from "../components/reservations/createReservation";
import DisplayReservations from "../components/reservations/displayReservations";

export default function EtouriProperties() {
	const reservations = useAppSelector(
		(state) => state.reservationData.data
	);

	const [tab, setTab] = useState(0);

	return (
		<>
			<div className="container mx-auto pt-4 pb-4 inset-0">
				<h2 className="text-2xl font-bold mb-4 text-gray-800">
					List of Reservations
				</h2>

				<div className="tabs flex flex-row space-x-3">
					<button
						className={
							tab === 1
								? `bg-slate-300 hover:underline`
								: `hover:underline`
						}
						onClick={() => setTab(1)}
					>
						Display all Reservations
					</button>
					<button
						className={
							tab === 2
								? `bg-slate-300 hover:underline`
								: `hover:underline`
						}
						onClick={() => setTab(2)}
					>
						Create a Reservation
					</button>
				</div>

				{tab === 1 && <DisplayReservations />}

				{tab === 2 && (
					<CreateReservation setTab={setTab} />
				)}
			</div>
		</>
	);
}

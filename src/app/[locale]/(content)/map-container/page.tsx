"use client";
import React, {
	useEffect,
	useState,
} from "react";
import {
	useAppDispatch,
	useAppSelector,
} from "../lib/hooks";
import villa from "@/src/app/public/villa.jpg";

import { useRouter } from "next/navigation";
import { loginAction } from "../lib/features/login/loginSlice";
import { userData } from "../lib/types";
import Map from "../components/map/map";
import ReservationDetails from "../components/reservations/reservationDetails";

export default function MapContainer() {
	const reservations = useAppSelector(
		(state) => state.reservation.items
	);

	// const loggedIn = useAppSelector(state => state.login.loggedIn)

	// const [state, setState] = useState(loggedIn)

	const dispatch = useAppDispatch();

	const [data, setData] = useState<userData[]>(
		[]
	);

	const tripDetails = useAppSelector(
		(state) =>
			state.reservationData[0].tripDetails
	);

	const router = useRouter();

	useEffect(() => {
		setData(reservations);

		// setState(loggedIn)

		// Only redirect if the loggedIn state has changed
		// if (loggedIn) {
		//   console.log("User is logged in, redirecting...");
		dispatch(
			loginAction.login({
				user: { firstName: "", lastName: "" },
			})
		);
		// router.push("/"); // Use router.push to redirect to the home page
		// } else if (!loggedIn) {
		//   console.log("User not logged in, redirecting to login page...");
		//   router.push('/login-page'); // Redirect to login page
		// }
	}, [router, reservations, dispatch]);

	return (
		<div className="relative ">
			<main className="flex pt-16">
				<div className="w-1/3 p-8 ">
					<ul>
						{data.map((el, index) => (
							<li
								className="space-y-4"
								key={index}
							>
								<ReservationDetails
									details={el}
									title={el.propertyName}
									image={villa}
								/>
							</li>
						))}
					</ul>
				</div>
				<div className="w-2/3 p-8 ">
					<div className="top-28 sticky  overflow-hidden shadow-lg">
						<Map />
					</div>
				</div>
			</main>
		</div>
	);
}

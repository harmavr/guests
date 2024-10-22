"use client";

import ReservationNavigation from "../components/navigation/reservationNavigation";
import { Footer } from "./footer";
import Pages from "./pages";

export default function ContainerWraper() {
	return (
		<div className="flex-grow p-6 md:p-12 ">
			<ReservationNavigation />
			<hr className="border-t-2 border-gray-500 my-4" />
			<Pages />
			<Footer />
		</div>
	);
}

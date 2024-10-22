"use client";

import React, {
	useEffect,
	useState,
} from "react";
import {
	useAppDispatch,
	useAppSelector,
} from "@/src/app/[locale]/(content)/lib/hooks";
import { reservationDataActions } from "@/src/app/[locale]/(content)/lib/features/reservationData/reservationDataSlice";
import { useSearchParams } from "next/navigation";

export default function Page4() {
	const searchParams = useSearchParams();
	const row = parseInt(
		searchParams.get("row") || "0"
	);

	const dispatch = useAppDispatch();
	const property = useAppSelector(
		(state) =>
			state.reservationData.data[row - 1]
				.propertyName
	);
	const city = useAppSelector(
		(state) =>
			state.reservationData.data[row - 1].city
	);
	const num_of_adults = useAppSelector(
		(state) =>
			state.reservationData.data[row - 1]
				.numOfAdults
	);
	const num_of_kids = useAppSelector(
		(state) =>
			state.reservationData.data[row - 1]
				.numOfKids
	);
	const kidsAges = useAppSelector(
		(state) =>
			state.reservationData.data[row - 1].kidsAges
	);
	const detailedUser = useAppSelector(
		(state) =>
			state.reservationData.data[row - 1]
				.detailedUser
	);
	const tripDetails = useAppSelector(
		(state) =>
			state.reservationData.data[row - 1]
				.tripDetails
	);
	const reservation = useAppSelector(
		(state) => state.reservationData.data[row - 1]
	);

	const [data, setData] = useState(reservation);
	const [user, setUser] = useState(detailedUser);

	useEffect(() => {
		console.log(property, tripDetails);
	}, [data, detailedUser, kidsAges]);

	const saveData = (idx: number) => {
		console.log(user.details[idx]);

		dispatch(
			reservationDataActions.saveData({
				firstName: user.details[idx].firstName,
				lastName: user.details[idx].lastName,
				index: idx,
				row,
			})
		);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { name, value } = e.target;

		const updatedDetails = [...user.details];
		updatedDetails[index] = {
			...updatedDetails[index],
			[name]: value,
		};

		setUser({ ...user, details: updatedDetails });
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Submitted");
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="p-6">
				<div className="mb-6">
					<h1 className="text-2xl font-semibold mb-2">
						Property Details
					</h1>
					<p>
						Property Name:{" "}
						<span className="font-medium">
							{property}
						</span>
					</p>
					<p>
						City:{" "}
						<span className="font-medium">
							{city}
						</span>
					</p>
					<p>
						Number of Adults:{" "}
						<span className="font-medium">
							{num_of_adults}
						</span>
					</p>
					<p>
						Number of Kids:{" "}
						<span className="font-medium">
							{num_of_kids}
						</span>
					</p>
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-4">
						Saved User Data
					</h2>
					{user.details.map((userDetail, idx) => (
						<div
							key={idx}
							className="flex items-center space-x-4 mb-4"
						>
							<p className="font-medium">{`User ${
								idx + 1
							}:`}</p>
							<input
								className="flex-1 p-2 border border-gray-300 rounded"
								type="text"
								name="firstName"
								placeholder="First Name"
								value={userDetail.firstName || ""}
								onChange={(e) =>
									handleInputChange(e, idx)
								}
							/>
							<input
								className="flex-1 p-2 border border-gray-300 rounded"
								type="text"
								name="lastName"
								placeholder="Last Name"
								value={userDetail.lastName || ""}
								onChange={(e) =>
									handleInputChange(e, idx)
								}
							/>
							<button
								type="button"
								className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
								onClick={() => saveData(idx)}
							>
								Save
							</button>
						</div>
					))}
				</div>
				<div>
					<h2 className="text-xl font-semibold mb-4">
						Kids Ages
					</h2>
					{kidsAges.map((kid, idx) => (
						<p key={idx} className="mb-2">{`Kid ${
							idx + 1
						}: Age ${kid.value}, Needs Help? ${
							kid.help ? "Yes" : "No"
						}`}</p>
					))}
				</div>
				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-4">
						Travel Details
					</h2>
					{tripDetails.map((trip, idx) => (
						<div
							key={idx}
							className="p-4 border border-gray-300 rounded mb-4"
						>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="font-medium">
										Arrival Checkbox:
									</label>
									<input
										type="checkbox"
										checked={trip.arrivalCheckbox}
										readOnly
										className="ml-2"
									/>
								</div>
								<div>
									<label className="font-medium">
										Flight Arrival Date:
									</label>
									<span className="ml-2">
										{trip.arrivalDate}
									</span>
								</div>
								<div>
									<label className="font-medium">
										Flight Arrival Time:
									</label>
									<span className="ml-2">
										{trip.arrivalTime}
									</span>
								</div>
								<div>
									<label className="font-medium">
										Location Arrival:
									</label>
									<span className="ml-2">
										{trip.arrivalLocation}
									</span>
								</div>
								<div>
									<label className="font-medium">
										Flight Arrival Number:
									</label>
									<span className="ml-2">
										{trip.arrivalFlightNumber}
									</span>
								</div>
								<div>
									<label className="font-medium">
										Notes Arrival:
									</label>
									<span className="ml-2">
										{trip.arrivalNotes}
									</span>
								</div>
								<div>
									<label className="font-medium">
										Departure Checkbox:
									</label>
									<input
										type="checkbox"
										checked={
											trip.departureCheckbox
										}
										readOnly
										className="ml-2"
									/>
								</div>
								<div>
									<label className="font-medium">
										Flight Departure Date:
									</label>
									<span className="ml-2">
										{trip.departureDate}
									</span>
								</div>
								<div>
									<label className="font-medium">
										Flight Departure Time:
									</label>
									<span className="ml-2">
										{trip.departureTime}
									</span>
								</div>
								<div>
									<label className="font-medium">
										Location Departure:
									</label>
									<span className="ml-2">
										{trip.departureLocation}
									</span>
								</div>
								<div>
									<label className="font-medium">
										Flight Departure Number:
									</label>
									<span className="ml-2">
										{trip.departureFlightNumber}
									</span>
								</div>
								<div>
									<label className="font-medium">
										Notes Departure:
									</label>
									<span className="ml-2">
										{trip.departureNotes}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</form>
	);
}
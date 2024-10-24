"use client";

import React, {
	useEffect,
	useState,
} from "react";
import Image, {
	StaticImageData,
} from "next/image";
import { useAppSelector } from "@/src/app/[locale]/(content)/lib/hooks";
import { userData } from "../../lib/types";
import Modal from "../../ui/modal";
import TravellerModal from "../modals/travellerModal";

interface ReservationProps {
	title: string;
	image: StaticImageData | string;

	details: any;
}

export default function ReservationDetails({
	title,
	image,

	details,
}: ReservationProps) {
	const [click, setClick] = useState(false);
	const [
		travellerModalOpen,
		setTravellerModalOpen,
	] = useState(false);

	const data = useAppSelector(
		(state) => state.form
	);
	const [travellerId, setTravellerId] =
		useState(0);
	const travellers = useAppSelector(
		(state) => state.reservation.items
	);

	const [firstName, setFirstName] = useState();
	// travellers[0].detailedUser[travellerId].firstName
	const [lastName, setLastName] = useState();
	// travellers[0].detailedUser[travellerId].lastName
	const userDetailsHandler = (
		firstName: string,
		lastName: string
	) => {
		console.log(firstName, lastName);
		setFirstName(
			details.detailedUser.details[0].firstName
		);
		setLastName(
			details.detailedUser.details[0].lastName
		);
	};

	const modalHandler = () => {
		setClick(!click);
	};

	const travellerModalClicked = (
		index: number
	) => {
		setTravellerModalOpen(!travellerModalOpen);
		setTravellerId(index);
	};

	useEffect(() => {
		console.log(details);
	}, [details]);

	return (
		<>
			<div className="max-w-md mx-auto p-1 rounded-lg bg-slate-150 ">
				{/* Image and Title Section */}
				<div className="relative rounded-lg overflow-hidden shadow-md bg-gray-100 p-4">
					<Image
						src={image}
						alt={title}
						className="w-full h-64 object-cover rounded-lg"
					/>

					{/* Property and Guests Section */}
					<div className="relative rounded-lg overflow-hidden  bg-gray-100 p-4">
						<div className="flex items-center justify-between">
							<span className="bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full">
								Property Code:{" "}
								{details.propertyName}
							</span>

							<button
								onClick={modalHandler}
								className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							>
								{">"}
							</button>
						</div>
					</div>
				</div>

				{/* Trip Details Section */}
				<div className="border border-gray-300 rounded-lg p-4 mt-4 bg-gray-50">
					<p className="text-sm text-gray-600">
						Website
					</p>
					{/* <p className="text-gray-700 mt-1">
            From <strong>{details.tripDetails[0].FlightArrivalDate}</strong> to{" "}
            <strong>{details.tripDetails[0].FlightDepartureDate}</strong>
          </p> */}
					<span className="bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full mt-2 inline-block">
						Guests: {details.numOfAdults} Adults /{" "}
						{details.numOfKids} Kids
					</span>
				</div>

				{/* Principal Guest Details Section */}
				<div className="border border-gray-300 rounded-lg p-4 mt-4 bg-gray-50">
					<h2 className="text-lg font-semibold text-gray-800">
						PRINCIPAL GUEST DETAILS
					</h2>
					<ul className="text-gray-700 mt-2 list-disc list-inside">
						<li>
							{
								details.detailedUser.details[0]
									.firstName
							}
						</li>
						<li>
							{
								details.detailedUser.details[0]
									.lastName
							}
						</li>
					</ul>
				</div>

				{/* Travellers Section */}
				<div className="border border-gray-300 rounded-lg p-4 mt-4 bg-gray-50">
					<h2 className="text-lg font-semibold text-gray-800">
						TRAVELLERS
					</h2>
					<ul className="mt-2">
						{details.detailedUser.details
							.slice(1)
							.map((el, index) => (
								<li
									key={index}
									className="flex justify-between items-center py-2 border-b last:border-b-0"
								>
									<span>
										{`Traveller${index + 1}: `}{" "}
										{el.firstName} {el.lastName}
									</span>
									<button
										className="bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
										onClick={() =>
											travellerModalClicked(
												index + 1
											)
										}
									>
										Edit
									</button>
								</li>
							))}
					</ul>
				</div>

				{/* Trip Details Section */}
				<div className="border border-gray-300 rounded-lg p-4 mt-4 bg-gray-50">
					<h2 className="text-lg font-semibold text-gray-800">
						TRIP DETAILS
					</h2>
					<p className="text-gray-700 mt-2">
						<strong>Arrival:</strong>{" "}
						{`${details.tripDetails.LocationArrival}, ${details.tripDetails.FlightArrivalDate} at ${details.tripDetails.FlightArrivalTime}`}
					</p>
					<p className="text-gray-700 mt-1">
						<strong>Departure:</strong>{" "}
						{`${details.tripDetails.LocationDeparture}, ${details.tripDetails.FlightDepartureDate} at ${details.tripDetails.FlightDepartureTime}`}
					</p>
				</div>

				{/* Notes Section */}
				<div className="border border-gray-300 rounded-lg p-4 mt-4 bg-gray-50">
					<h2 className="text-lg font-semibold text-gray-800">
						NOTES
					</h2>
					<p className="text-gray-700 mt-2">
						<strong>Arrival Notes:</strong>{" "}
						{details.tripDetails.NotesArrival}
					</p>
					<p className="text-gray-700 mt-1">
						<strong>Departure Notes:</strong>{" "}
						{details.tripDetails.NotesDeparture}
					</p>
				</div>

				{/* Modal Section */}
				{click && (
					<Modal
						open={click}
						modalHandler={() => modalHandler()}
						userHandler={userDetailsHandler}
					/>
				)}

				{travellerModalOpen && (
					<TravellerModal
						open={travellerModalOpen}
						travellerModalHandler={
							setTravellerModalOpen
						}
						id={travellerId}
					/>
				)}
			</div>
		</>
	);
}

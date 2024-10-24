import { formActions } from "@/src/app/[locale]/(content)/lib/features/form/formSlice";
import { reservationDataActions } from "@/src/app/[locale]/(content)/lib/features/reservationData/reservationDataSlice";
import {
	useAppDispatch,
	useAppSelector,
} from "@/src/app/[locale]/(content)/lib/hooks";
import { log } from "console";
import { useSearchParams } from "next/navigation";
import React, {
	useEffect,
	useState,
} from "react";
import map from "../../components/map/map";
import { type } from "os";

export default function Page3() {
	const dispatch = useAppDispatch();

	const searchParams = useSearchParams(); // Get the search params (query string)
	const row = parseInt(
		searchParams.get("row") || "0"
	);
	const tripDetails = useAppSelector(
		(state) =>
			state.reservationData[row - 1].tripDetails
	);

	const [data, setData] = useState(tripDetails);

	useEffect(() => {
		const buttons = [
			"#page1-button",
			"#page2-button",
			"#page3-button",
			"#page4-button",
		];
		buttons.forEach((selector, index) => {
			const button =
				document.querySelector(selector);
			if (index === 2) {
				button?.classList.add("active");
			} else {
				button?.classList.remove("active");
			}
		});

		// setData(tripDetails);

		// console.log(data.arrivalCheckbox);
	}, [data, tripDetails]);

	const handleChange = (e) => {
		const { name, type, value, checked } =
			e.target;

		const newValue =
			type === "checkbox" ? checked : value;

		console.log(name, value, newValue);

		const updatedTripDetails = {
			...data,
			[name]: newValue, // Only update the relevant field
		};

		setData({
			...data,
			[name]: newValue,
			...updatedTripDetails,
		});

		console.log(updatedTripDetails);

		console.log(data);

		dispatch(
			reservationDataActions.update({
				...data,
				[name]: newValue,
				tripDetails: updatedTripDetails,
				index: row - 1,
			})
		);
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Submitted");
	};

	const inputClass =
		"appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

	return (
		<div className="p-6">
			<form onSubmit={onSubmit}>
				{/* Travel Option 1 */}
				<div className="mb-6">
					<input
						type="checkbox"
						id="travel-chania"
						name="arrivalCheckbox"
						checked={data.arrivalCheckbox}
						onChange={handleChange}
					/>
					<label
						htmlFor="travel-chania"
						className="ml-2"
					>
						Travel by boat/Already in Chania
					</label>
				</div>

				{/* Arrival Section */}
				<div className="mb-6">
					<h1 className="text-xl font-bold">
						Arrival
					</h1>
					<p className="text-sm text-gray-600 mb-4">
						Please enter the details for your
						Arrival
					</p>
					<div className="flex flex-wrap -mx-3">
						<div className="w-full md:w-1/4 px-3">
							<input
								type="date"
								name="arrivalDate"
								value={data.arrivalDate}
								className={inputClass}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full md:w-1/4 px-3">
							<input
								type="time"
								name="arrivalTime"
								className={inputClass}
								value={data.arrivalTime}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
							<select
								name="arrivalLocation"
								id="arrivalLocation"
								className="block w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								value={data.arrivalLocation}
								onChange={handleChange}
							>
								<option value="Greece">
									Greece
								</option>
								<option value="Turkey">
									Turkey
								</option>
								<option value="Albania">
									Albania
								</option>
								<option value="Italy">
									Italy
								</option>
							</select>
						</div>

						<div className="w-full md:w-1/4 px-3">
							<input
								type="text"
								className={inputClass}
								name="arrivalFlightNumber"
								value={data.arrivalFlightNumber}
								placeholder="Arrival Flight Number"
								onChange={handleChange}
							/>
						</div>
						<div className="w-full px-3">
							<textarea
								className={inputClass}
								name="arrivalNotes"
								placeholder="Your notes go here"
								value={data.arrivalNotes}
								onChange={handleChange}
							></textarea>
						</div>
					</div>
				</div>

				{/* Travel Option 2 */}
				<div className="mb-6">
					<input
						type="checkbox"
						id="travel-athens"
						name="departureCheckbox"
						checked={data.departureCheckbox}
						onChange={handleChange}
					/>
					<label
						htmlFor="travel-athens"
						className="ml-2"
					>
						Travel by boat/Already in Athens
					</label>
				</div>

				{/* Departure Section */}
				<div>
					<h1 className="text-xl font-bold">
						Departure
					</h1>
					<p className="text-sm text-gray-600 mb-4">
						Please enter the details for your
						Departure
					</p>
					<div className="flex flex-wrap -mx-3">
						<div className="w-full md:w-1/4 px-3">
							<input
								type="date"
								name="departureDate"
								value={data.departureDate}
								className={inputClass}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full md:w-1/4 px-3">
							<input
								type="time"
								name="departureTime"
								value={data.departureTime}
								className={inputClass}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
							<select
								name="departureLocation"
								id="locations"
								className="block w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								value={data.departureLocation}
								onChange={handleChange}
							>
								<option value="Greece">
									Greece
								</option>
								<option value="Turkey">
									Turkey
								</option>
								<option value="Albania">
									Albania
								</option>
								<option value="Italy">
									Italy
								</option>
							</select>
						</div>

						<div className="w-full md:w-1/4 px-3">
							<input
								type="text"
								name="departureFlightNumber"
								className={inputClass}
								value={data.departureFlightNumber}
								placeholder="Departure Flight Number"
								onChange={handleChange}
							/>
						</div>
						<div className="w-full px-3">
							<textarea
								className={inputClass}
								placeholder="Your notes go here"
								name="departureNotes"
								value={data.departureNotes}
								onChange={handleChange}
							></textarea>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

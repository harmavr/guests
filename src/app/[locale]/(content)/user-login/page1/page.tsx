"use client";

import {
	useAppDispatch,
	useAppSelector,
} from "@/src/app/[locale]/(content)/lib/hooks";
import React, {
	useEffect,
	useState,
} from "react";
import { log } from "console";
import Kids from "../kids";
import { useSelector } from "react-redux";
import ModalForKids from "../../components/modals/modalForKids";
import { userData } from "@/src/app/[locale]/(content)/lib/types";
import { formActions } from "@/src/app/[locale]/(content)/lib/features/form/formSlice";
import {
	usePathname,
	useSearchParams,
} from "next/navigation";
import { reservationDataActions } from "@/src/app/[locale]/(content)/lib/features/reservationData/reservationDataSlice";

export default function Page1() {
	const searchParams = useSearchParams(); // Get the search params (query string)
	const row = parseInt(
		searchParams.get("row") || "0"
	);

	const errorsRedux = useAppSelector(
		(state) => state.form.errors
	);

	const kidsAges = useAppSelector(
		(state) =>
			state.reservationData[row - 1].kidsAges
	);
	const [smallKidsArray, setSmallKidsArray] =
		useState<{ value: number; help: boolean }[]>([
			{ value: 0, help: false },
		]);
	const [openModal, setOpenModal] =
		useState(false);

	const dispatch = useAppDispatch();
	const page = useAppSelector(
		(state) => state.form.page
	);
	const weAreFree = useAppSelector(
		(state) => state.form.weAreFreeToGo
	);
	const reservation = useAppSelector(
		(state) => state.reservationData
	);
	// const properties = useSelector((state: userData) => state.properties.id);
	const [data, setData] = useState(
		reservation[row - 1]
	);
	const [numOfKids, setNumOfKids] = useState(
		reservation[row - 1].kidsAges
	);

	useEffect(() => {
		const page1Button = document.querySelector(
			"#page1-button"
		);
		const page2Button = document.querySelector(
			"#page2-button"
		);
		const page3Button = document.querySelector(
			"#page3-button"
		);
		const page4Button = document.querySelector(
			"#page4-button"
		);
		const page5Button = document.querySelector(
			"#page5-button"
		);

		page1Button?.classList.add("active");
		page2Button?.classList.remove("active");
		page3Button?.classList.remove("active");
		page4Button?.classList.remove("active");
		page5Button?.classList.remove("active");

		// reservation ? setData(reservation[row - 1]) : setData([]);
		// console.log(reservation);
		console.log(data);
		console.log(reservation[row - 1]);
	}, [data, reservation, row]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		console.log(name, value);

		const updatedTripDetails = {
			...data.tripDetails,
			[name]: value, // Only update the relevant field
		};

		setData({
			...data,
			[name]: value,
			tripDetails: updatedTripDetails,
		});

		console.log(updatedTripDetails);

		console.log(data);

		dispatch(
			reservationDataActions.update({
				...data,
				[name]: value,
				tripDetails: updatedTripDetails,
				index: row - 1,
			})
		);
	};

	const modalHandler = () => {
		setOpenModal(!openModal);
	};

	const onSubmit = (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const foundSmallKid = kidsAges.filter(
			(kid) => kid.value < 12
		);
		if (foundSmallKid.length === 0) {
			dispatch(formActions.setWeAreFreeToGo());
		}

		setSmallKidsArray(foundSmallKid);
		modalHandler();
		if (weAreFree) {
			dispatch(
				reservationDataActions.update({
					...data,
					kidsAges,
					index: row - 1,
				})
			);
			dispatch(formActions.next(page));
		}
		console.log("Form Submitted", {
			...data,
			kidsAges,
		});
	};

	const handleNumOfKidsChange = (e: any) => {
		const num = parseInt(e.target.value) || 0;

		let updatedKidsAges = [...data.kidsAges];

		if (num > updatedKidsAges.length) {
			const missingKids =
				num - updatedKidsAges.length;
			for (let i = 0; i < missingKids; i++) {
				updatedKidsAges.push({
					value: 0,
					help: false,
				});
			}
		} else if (num < updatedKidsAges.length) {
			updatedKidsAges = updatedKidsAges.slice(
				0,
				num
			);
		}

		setData({
			...data,
			numOfKids: num,
			kidsAges: updatedKidsAges,
		});

		setNumOfKids(updatedKidsAges);

		dispatch(
			reservationDataActions.update({
				...data,
				numOfKids: num,
				kidsAges: updatedKidsAges,
				index: row - 1,
			})
		);
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				{/* Property Name and City Inputs */}
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<input
							className={`appearance-none block md:w-full ${
								errorsRedux.propertyNameError
									? "border border-red-500 placeholder-red-500"
									: "text-gray-700 border placeholder-gray-500 "
							}   rounded py-3 px-4 mb-3 leading-tight focus:outline-none `}
							type="text"
							name="propertyName"
							placeholder="Property Name"
							value={data.propertyName}
							onChange={handleInputChange}
							required
						/>
						{errorsRedux.propertyNameError && (
							<p className="text-red-500 text-xs italic">
								This field is required.
							</p>
						)}
					</div>
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<input
							className={`appearance-none block md:w-full ${
								errorsRedux.cityError
									? "border border-red-500 placeholder-red-500"
									: "text-gray-700 border placeholder-gray-500 "
							}  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
							type="text"
							name="city"
							placeholder="City"
							value={data.city}
							onChange={handleInputChange}
							required
						/>
						{errorsRedux.cityError && (
							<p className="text-red-500 text-xs italic">
								This field is required.
							</p>
						)}
					</div>
				</div>

				{/* Date Inputs */}
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<input
							className="appearance-none block md:w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							type="date"
							name="arrivalDate"
							value={data.tripDetails.arrivalDate}
							onChange={handleInputChange}
							placeholder="Check in"
						/>
					</div>
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<input
							className="appearance-none block md:w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							type="date"
							name="departureDate"
							onChange={handleInputChange}
							value={
								data.tripDetails.departureDate
							}
							placeholder="Check out"
							// required
						/>
					</div>
				</div>

				{/* Number of Adults and Kids */}
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<input
							className={`appearance-none block md:w-full ${
								errorsRedux.numOfAdultsError
									? "border border-red-500 placeholder-red-500"
									: "text-gray-700 border placeholder-gray-500 "
							}  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
							type="number"
							name="numOfAdults"
							placeholder="Number of Adults"
							value={data.numOfAdults}
							onChange={handleInputChange}
							required
						/>
						{errorsRedux.numOfAdultsError && (
							<p className="text-red-500 text-xs italic">
								This field is required.
							</p>
						)}
					</div>
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<input
							className="appearance-none block md:w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							type="number"
							name="n_of_kids"
							placeholder="Number of Kids"
							value={data.numOfKids}
							onChange={handleNumOfKidsChange}
							required
						/>
					</div>
				</div>

				{/* Kids Ages Inputs */}
				{numOfKids && numOfKids.length > 0 && (
					<>
						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="kids">
								<p className="appearance-none block w-full py-3 px-4 mb-3 leading-tight focus:outline-none">
									Kids ages
									<br />
									<i>
										Fill in the ages for your kids
									</i>
								</p>
							</div>
						</div>

						<br />
						{Array.from(
							{
								length: Math.ceil(
									numOfKids.length / 2
								),
							},
							(_, pairIndex) => (
								<div
									key={pairIndex}
									className="w-full px-3 mb-6 md:mb-0"
								>
									<div className="flex flex-wrap -mx-3">
										{Array.from(
											{ length: 2 },
											(_, offset) => {
												const kidIndex =
													pairIndex * 2 + offset;
												return kidIndex <
													numOfKids.length ? (
													<div
														key={kidIndex}
														className="w-full md:w-1/2 px-3"
													>
														<Kids
															index={kidIndex}
															row={row}
															kidsArray={
																numOfKids
															}
														/>
													</div>
												) : null;
											}
										)}
									</div>
								</div>
							)
						)}
					</>
				)}
				{openModal &&
					smallKidsArray.length > 0 && (
						<ModalForKids
							// kidsAges={numOfKids}\
							openModal={openModal}
							modalHandler={modalHandler}
						/>
					)}
			</form>
		</>
	);
}

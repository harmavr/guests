import React, {
	useEffect,
	useState,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";
import { log } from "console";
import { useSearchParams } from "next/navigation";
import { formActions } from "../lib/features/form/formSlice";
import { useAppSelector } from "../lib/hooks";

export const Footer = () => {
	const searchParams = useSearchParams(); // Get the search params (query string)
	const row = parseInt(
		searchParams.get("row") || "0"
	);

	const dispatch = useDispatch();
	const page = useAppSelector(
		(state) => state.form.page
	);
	const errors = useAppSelector(
		(state) => state.form.errors
	);
	const detailedUser = useAppSelector(
		(state) =>
			state.reservationData.data[row - 1]
				.detailedUser
	);
	const numOfAdults = useAppSelector(
		(state) =>
			state.reservationData.data[row - 1]
				.numOfAdults
	);
	const weAreFree = useAppSelector(
		(state) => state.form.weAreFreeToGo
	);
	const formData = useAppSelector(
		(state) => state.form
	);

	const [isNextEnabled, setIsNextEnabled] =
		useState(false);
	const [userId, setUserId] = useState(0);

	const zoub = {
		firstName: "",
		lastName: "",
	};

	const [data, setData] = useState(zoub);

	useEffect(() => {
		const currentUser = detailedUser;

		console.log(detailedUser);

		console.log(
			`number of adults ${numOfAdults} and detailed user length ${detailedUser.user}`
		);

		if (page === 2) {
			setIsNextEnabled(
				numOfAdults === detailedUser.user
			);
		} else {
			setIsNextEnabled(true);
		}
	}, [page, detailedUser, numOfAdults]);

	const handleNext = () => {
		const formElement =
			document.querySelector("form");
		// console.log(formElement);
		console.log(page);

		if (formElement?.checkValidity()) {
			formElement.requestSubmit();

			console.log(
				`detailed  ${detailedUser.details.length}, numofAdults ${numOfAdults}`
			);

			if (
				numOfAdults ===
					detailedUser.details.length + 1 ||
				detailedUser.details.length ===
					numOfAdults
			) {
				if (page === 2) {
					dispatch(
						formActions.saveData({
							firstName:
								formElement?.querySelector(
									"input[name='firstName']"
								)?.value,
							lastName:
								formElement?.querySelector(
									"input[name='lastName']"
								)?.value,
							index: numOfAdults - 1, // Adjust index to 0-based for array access
						})
					);
				}
			}

			// if (page === 4) {
			//   console.log(formData);

			//   dispatch(reservationActions.saveReservation({ formData }));
			// }

			if (weAreFree) {
				dispatch(formActions.next(page));
			}
		} else {
			// Trigger validation on next button click if the form is invalid
			if (page === 1) {
				dispatch(
					formActions.validate({
						propertyName:
							formElement?.querySelector(
								"input[name='propertyName']"
							)?.value,
						city: formElement?.querySelector(
							"input[name='city']"
						)?.value,
						numOfAdults:
							formElement?.querySelector(
								"input[name='numOfAdults']"
							)?.value,
					})
				);
			}
			if (page == 2) {
				console.log("MAPINW STO DISPATCDH");

				dispatch(
					formActions.validate({
						firstName: formElement?.querySelector(
							"input[name='firstName']"
						)?.value,

						lastName: formElement?.querySelector(
							"input[name='lastName']"
						)?.value,
					})
				);
			}

			if (page === 5) {
				dispatch(
					formActions.validate({
						firstName: formElement?.querySelector(
							"input[name='firstName']"
						)?.value,

						lastName: formElement?.querySelector(
							"input[name='lastName']"
						)?.value,
					})
				);
			}
		}
	};

	const handleBack = () => {
		dispatch(formActions.back(page));
	};

	return (
		<div className="next-back-buttons mt-6 flex justify-between">
			<button
				className="bg-gray-500 text-white font-bold rounded shadow-lg hover:bg-gray-600 transition-colors duration-200 p-3"
				type="button"
				onClick={handleBack}
			>
				Back
			</button>
			<button
				className={`bg-blue-500 text-white font-bold rounded shadow-lg ${
					!isNextEnabled
						? "opacity-50 cursor-not-allowed"
						: "hover:bg-blue-600"
				} transition-colors duration-200 p-3`}
				type="button"
				onClick={handleNext}
				disabled={!isNextEnabled}
			>
				Next
			</button>
		</div>
	);
};

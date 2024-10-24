import { createSlice } from "@reduxjs/toolkit";
import { ReservationData } from "../../types";

// checkboxArrival: boolean;
// FlightArrivalDate: string;
// FlightArrivalTime: string;
// LocationArrival: string;
// FlightArrivalNumber: string;
// NotesArrival: string;
// checkboxDeparture: boolean;
// FlightDepartureDate: string;
// FlightDepartureTime: string;
// LocationDeparture: string;
// FlightDepartureNumber: string;
// NotesDeparture: string;

const initialState: ReservationData[] = [
	{
		propertyName: "Villa Aroma",
		id: 1,
		tripDetails: {
			arrivalDate: "2024-09-10",
			departureDate: "2024-09-11",
			arrivalCheckbox: true,
			arrivalTime: "11:50",
			arrivalLocation: "",
			arrivalFlightNumber: "",
			arrivalNotes: "",
			departureCheckbox: false,
			departureTime: "",
			departureLocation: "",
			departureFlightNumber: "10101",
			departureNotes: "123",
		},

		detailedUser: {
			details: [
				{
					firstName: "Charis",
					lastName: "Mavr",
				},
			],
			user: 0,
		},
		numOfKids: 1,
		numOfAdults: 2,
		total_amount: 1000,
		status: "Confirmed",
		city: "Rethymno",
		kidsAges: [{ value: 2, help: false }],

		totalAmount: 0,
	},
	{
		propertyName: "Euphoria",
		id: 2,
		tripDetails: {
			arrivalDate: "2024-10-20",
			departureDate: "2024-11-26",
			arrivalCheckbox: true,
			arrivalTime: "11:50",
			arrivalLocation: "Turkey",
			arrivalFlightNumber: "111111",
			arrivalNotes: "asd",
			departureCheckbox: true,
			departureTime: "12:50",
			departureLocation: "Greece",
			departureFlightNumber: "10101",
			departureNotes: "123",
		},

		detailedUser: {
			details: [
				{
					firstName: "Giannis",
					lastName: "Zoub",
				},
				{
					firstName: "Titos",
					lastName: "Chan",
				},
			],
			user: 0,
		},
		numOfKids: 3,
		numOfAdults: 2,
		total_amount: 1500,
		status: "Pre Check-in",
		city: "Chania",
		kidsAges: [
			{ value: 10, help: true },
			{ value: 15, help: false },
			{ value: 2, help: false },
		],
		totalAmount: 0,
	},
];

const reservationDataSlice = createSlice({
	name: "reservationData",
	initialState,
	reducers: {
		saveReservationData(state, action) {
			const { resData, status } = action.payload;
			console.log(
				"saveReservation data",
				resData
			);

			state.push({
				...resData,
				status: status,
			});

			console.log("array reservation", state);
		},
		changeStatus(state, action) {
			const { index } = action.payload;
			console.log(index);
			state[index].status = "Confirmed";
		},

		update(state, action) {
			const {
				propertyName,
				city,
				numOfAdults,
				numOfKids,
				kidsAges,
				index,
				tripDetails,
			} = action.payload;

			if (propertyName !== undefined)
				state[index].propertyName = propertyName;
			if (city !== undefined)
				state[index].city = city;
			if (numOfAdults !== undefined)
				state[index].numOfAdults =
					parseInt(numOfAdults);

			if (
				numOfAdults >
				state[index].detailedUser.details.length
			) {
				const missingUsers =
					numOfAdults -
					state[index].detailedUser.details
						.length;
				for (let i = 0; i < missingUsers; i++) {
					state[index].detailedUser.details.push({
						firstName: "",
						lastName: "",
					});
				}
			}

			if (kidsAges !== undefined)
				state[index].kidsAges = kidsAges;

			if (numOfKids !== undefined) {
				if (
					numOfKids > state[index].kidsAges.length
				) {
					const missingKids =
						numOfKids -
						state[index].kidsAges.length;
					for (let i = 0; i < missingKids; i++) {
						state[index].kidsAges.push({
							value: 0,
							help: false,
						});
					}
				}
				state[index].numOfKids = numOfKids;
			}

			if (tripDetails !== undefined) {
				state[index].tripDetails = tripDetails;
			}

			// if (tripDetails.arrivalDate !== undefined)
			// 	state[index].tripDetails.arrivalDate =
			// 		tripDetails.arrivalDate;
			// if (tripDetails.departureDate !== undefined)
			// 	state[index].tripDetails.departureDate =
			// 		tripDetails.departureDate;
		},

		saveKids(state, action) {
			const { help, kids, index, row } =
				action.payload;

			console.log(action.payload);

			// while (state[index].kidsAges.length <= index) {
			//   state[index].kidsAges.push({ value: 0, help: false });
			// }
			// state[index].kidsAges[kidId] = { value: age, help };
			console.log(kids);

			// console.log(state[row - 1].propertyName);

			state[row - 1].kidsAges = kids;

			console.log(state[row - 1].kidsAges[index]);
			// console.log(state.data[row - 1].kidsAges[0].value);

			// console.log(state.data[row - 1].kidsAges[0].value);
		},

		saveData(state, action) {
			const { firstName, lastName, index, row } =
				action.payload;
			console.log(action.payload);

			if (index >= 0) {
				state[row - 1].detailedUser.details[
					index
				] = { firstName, lastName };
				state[row - 1].detailedUser.user++;
			} else {
				console.error("Invalid index");
			}

			console.log(
				state[row - 1].detailedUser.details[index]
			);
		},

		saveHelpForKids(state, action) {
			const { row, kidId, help } = action.payload;

			state[row - 1].kidsAges[kidId].help = help;
		},

		saveTravelDetails(state, action) {
			const { row, data } = action.payload;

			console.log(row, data);

			state[row - 1].tripDetails = data;

			console.log(state[row - 1].tripDetails);
		},
	},
});

export const reservationDataActions =
	reservationDataSlice.actions;
export default reservationDataSlice.reducer;

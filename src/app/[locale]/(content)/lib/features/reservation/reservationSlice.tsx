import {
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import {
	Reservation,
	userData,
} from "../../types";
import page from "@/src/app/page";
import { log } from "console";

const initialState: Reservation = {
	items: [],
};

const reservationSlice = createSlice({
	name: "reservation",
	initialState,
	reducers: {
		saveReservation(state, action) {
			const { formData } = action.payload;
			console.log(formData);
			const {
				propertyName,
				city,
				numOfAdults,
				numOfKids,
				kidsAges,
				detailedUser,
				tripDetails,
			} = formData;

			// Transform tripDetails to match state.items structure
			const transformedTripDetails = {
				checkboxArrival:
					tripDetails.arrivalCheckbox,
				FlightArrivalDate:
					tripDetails.arrivalDate,
				FlightArrivalTime:
					tripDetails.arrivalTime,
				LocationArrival:
					tripDetails.arrivalLocation,
				FlightArrivalNumber:
					tripDetails.arrivalFlightNumber,
				NotesArrival: tripDetails.arrivalNotes,
				checkboxDeparture:
					tripDetails.departureCheckbox,
				FlightDepartureDate:
					tripDetails.departureDate,
				FlightDepartureTime:
					tripDetails.departureTime,
				LocationDeparture:
					tripDetails.departureLocation,
				FlightDepartureNumber:
					tripDetails.departureFlightNumber,
				NotesDeparture:
					tripDetails.departureNotes,
			};

			console.log(
				transformedTripDetails.LocationArrival
			);

			// Push a new reservation into state.items array
			state.items.push({
				id: state.items.length + 1, // Generate a simple ID based on length
				propertyName,
				city,
				numOfAdults,
				numOfKids,
				kidsAges,
				detailedUser,
				tripDetails: transformedTripDetails,
				status: "", // Define status as needed
				total_amount: 0, // Add logic to calculate amount if required
				page: 0,
				errors: undefined,
				weAreFreeToGo: false,
			});

			// Accessing transformed tripDetails field correctly
			console.log(state.items[0]?.tripDetails);
		},

		saveReservationFromCSV: (state, action) => {
			const { formData } = action.payload;
			console.log(formData);

			formData.forEach((reservation) => {
				state.items.push({
					propertyName: reservation.propertyName,
					city: reservation.city,
					numOfAdults: reservation.numOfAdults,
					numOfKids: reservation.numOfKids,
					kidsAges: reservation.kidsAges,
					detailedUser: reservation.detailedUser,
					tripDetails: reservation.tripDetails,
					page: 0,
					errors: undefined,
					weAreFreeToGo: false,
				});
			});
		},

		changeTravellerData(
			state,
			action: PayloadAction<{
				firstName: string;
				lastName: string;
				index: number;
			}>
		) {
			const { firstName, lastName, index } =
				action.payload;

			// Safeguard to check if the index exists
			if (
				state.items[0] &&
				state.items[0].detailedUser[index]
			) {
				// Update the specific traveller's data immutably
				state.items[0].detailedUser[index] = {
					...state.items[0].detailedUser[index],
					firstName,
					lastName,
				};
			}
		},
	},
});

export const reservationActions =
	reservationSlice.actions;
export default reservationSlice.reducer;

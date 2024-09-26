import React, { useEffect, useRef } from "react";
import { ReservationData } from "../lib/types";
import { reservationDataActions } from "../lib/features/reservationData/reservationDataSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

export default function CreateReservation({ setTab }) {
  const formRefs = useRef([]);
  const array = useAppSelector((state) => state.reservationData.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(array);
  });

  const inputFields = [
    { name: "Property Name", type: "text" },
    { name: "City", type: "text" },
    { name: "Arrival Date", type: "date" },
    { name: "Departure Date", type: "date" },
    { name: "Visitor First Name", type: "text" },
    { name: "Visitor Last Name", type: "text" },
    { name: "Total Amount", type: "number" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      propertyName: formRefs.current[0].value,
      city: formRefs.current[1].value,
      tripDetails: {
        arrivalDate: formRefs.current[2].value,
        departureDate: formRefs.current[3].value,
      },
      id: array.length + 1,
      detailedUser: [{
        firstName: formRefs.current[4].value,
        lastName: formRefs.current[5].value,
      }],
      kidsAges: [],
      total_amount: parseFloat(formRefs.current[6].value) || 0,
    };

    dispatch(reservationDataActions.saveReservationData({ resData: newReservation, status: 'Pre Check-in' }));
    setTab(1);
  };

  return (
    <div className="pt-5 max-w-xl ">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-bold mb-4">Create Reservation</h2>
        <div className="grid grid-cols-1 gap-4">
          {inputFields.map((field, index) => (
            <input
              key={index}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={field.type}
              placeholder={field.name}
              ref={(el) => (formRefs.current[index] = el)}
            />
          ))}
        </div>
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Save Data
          </button>
        </div>
      </form>
    </div>
  );
}

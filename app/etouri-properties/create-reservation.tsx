import React, { useEffect, useRef, useState } from "react";
import { ReservationData } from "../lib/types";
import { reservationDataActions } from "../lib/features/reservationData/reservationDataSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

export default function CreateReservation() {
  const formRefs = useRef([]);

  const array = useAppSelector((state) => state.reservationData.data);

  //   const [data, setData] = useState<ReservationData>({
  //     data: [
  //       {
  //         propertyName: "",
  //         city: "",
  //         tripDetails: { arrivalDate: "", departureDate: "" },
  //         visitorData: { firstName: "", lastName: "" },
  //         totalAmount: 0,
  //       },
  //     ],
  //   });

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(array);
  });

  // asda

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
      visitorData: {
        firstName: formRefs.current[4].value,
        lastName: formRefs.current[5].value,
      },
      totalAmount: parseFloat(formRefs.current[6].value) || 0,
    };

    // setData(() => ({
    //   data: [newReservation],
    // }));

    dispatch(
      reservationDataActions.saveReservationData({ resData: newReservation })
    );

    // console.log("Updated Reservation Data: ", data);
  };

  return (
    <div className="pt-5">
      <form>
        <div className="grid grid-cols-4 gap-4">
          {inputFields.map((field, index) => (
            <input
              key={index}
              className="border-2"
              type={field.type}
              placeholder={field.name}
              ref={(el) => (formRefs.current[index] = el)}
            />
          ))}
        </div>
        <div className="pt-4">
          <button type="button" onClick={handleSubmit}>
            Save Data
          </button>
        </div>
      </form>
    </div>
  );
}

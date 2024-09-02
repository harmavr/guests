import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./lib/hooks";
import { formActions } from "./lib/features/form/formSlice";
import { reservationActions } from "./lib/features/reservation/reservationSlice";

interface TravellerModalDetails {
  open: boolean;
  travellerModalHandler: (open: boolean) => void;
  id: number;
}

export default function TravellerModal({
  open,
  travellerModalHandler,
  id,
}: TravellerModalDetails) {
  const travellers = useSelector((state) => state.reservation.items);
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState(
    travellers[0].detailedUser[id].firstName
  );
  const [lastName, setLastName] = useState(
    travellers[0].detailedUser[id].lastName
  );

  useEffect(() => {
    // Update state when id or travellers data changes
    setFirstName(travellers[0].detailedUser[id].firstName);
    setLastName(travellers[0].detailedUser[id].lastName);
  }, [id, travellers]);

  const closeModal = (
    openModal: boolean,
    modalHandler: (arg0: boolean) => void
  ) => {
    modalHandler(!openModal);
  };

  const cancelHandler = () => {
    closeModal(open, travellerModalHandler);
    console.log(id);
    console.log(travellers);
    console.log(travellers[0].detailedUser[id]);
  };

  const saveTravellerDetails = () => {
    dispatch(
      reservationActions.changeTravellerData({
        firstName,
        lastName,
        index: id,
      })
    );
    closeModal(open, travellerModalHandler);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const newValue = event.target.value;

    if (field === "firstName") {
      setFirstName(newValue);
    } else {
      setLastName(newValue);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex justify-center items-center">
          <aside
            className={`w-full max-w-md p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 ${
              open ? "scale-100" : "scale-0"
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Traveller Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => handleInputChange(e, "firstName")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => handleInputChange(e, "lastName")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={cancelHandler}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={saveTravellerDetails}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

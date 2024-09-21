"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { formActions } from "@/app/lib/features/form/formSlice";
import { userData } from "@/app/lib/types";

export default function Page4() {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.form.page);
  const property = useAppSelector((state) => state.form.propertyName);
  const city = useAppSelector((state) => state.form.city);
  const num_of_adults = useAppSelector((state) => state.form.numOfAdults);
  const num_of_kids = useAppSelector((state) => state.form.numOfKids);
  const kidsAges = useAppSelector((state) => state.form.kidsAges);
  const detailedUser = useAppSelector((state) => state.form.detailedUser);
  const tripDetails = useAppSelector((state) => state.form.tripDetails);

  const [data, setData] = useState<userData>({
    propertyName: "",
    city: "",
    numOfAdults: 0,
    numOfKids: 0,
    kidsAges: [],
    tripDetails: tripDetails,
    page: 0,
    detailedUser: detailedUser,
    errors: {
      propertyNameError: false,
      cityError: false,
      numOfAdultsError: false,
    },
    weAreFreeToGo: false,
  });

  useEffect(() => {
    const page1Button = document.querySelector("#page1-button");
    const page2Button = document.querySelector("#page2-button");
    const page3Button = document.querySelector("#page3-button");
    const page4Button = document.querySelector("#page4-button");
    const page5Button = document.querySelector("#page5-button");

    page1Button?.classList.remove("active");
    page2Button?.classList.remove("active");
    page3Button?.classList.remove("active");
    page4Button?.classList.add("active");
    page5Button?.classList.remove("active");

    console.log(data.detailedUser);
    console.log(kidsAges);
  }, [data.detailedUser, detailedUser, kidsAges]);

  const saveData = (idx: number) => {
    console.log(data.detailedUser[idx].firstName);
    console.log(idx);

    dispatch(
      formActions.saveData({
        firstName: data.detailedUser[idx].firstName,
        lastName: data.detailedUser[idx].lastName,
        index: idx,
      })
    );
  };

  const handleInputChange = (
    idx: number,
    field: "firstName" | "lastName",
    value: string
  ) => {
    const updatedDetailedUser = [...data.detailedUser];
    updatedDetailedUser[idx] = { ...updatedDetailedUser[idx], [field]: value };
    setData({ ...data, detailedUser: updatedDetailedUser });
    console.log(data);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Property Details</h1>
          <p>
            Property Name: <span className="font-medium">{property}</span>
          </p>
          <p>
            City: <span className="font-medium">{city}</span>
          </p>
          <p>
            Number of Adults:{" "}
            <span className="font-medium">{num_of_adults}</span>
          </p>
          <p>
            Number of Kids: <span className="font-medium">{num_of_kids}</span>
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Saved User Data</h2>
          {data.detailedUser.map((user, idx) => (
            <div key={idx} className="flex items-center space-x-4 mb-4">
              <p className="font-medium">{`User ${idx + 1}:`}</p>
              <input
                className="flex-1 p-2 border border-gray-300 rounded"
                type="text"
                placeholder={`First Name: ${user.firstName}`}
                value={user.firstName}
                onChange={(e) =>
                  handleInputChange(idx, "firstName", e.target.value)
                }
              />
              <input
                className="flex-1 p-2 border border-gray-300 rounded"
                type="text"
                placeholder={`Last Name: ${user.lastName}`}
                value={user.lastName}
                onChange={(e) =>
                  handleInputChange(idx, "lastName", e.target.value)
                }
              />
              <button
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => saveData(idx)}
              >
                Save
              </button>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Kids Ages</h2>
          {kidsAges.map((kid, idx) => (
            <p key={idx} className="mb-2">{`Kid ${idx + 1}: Age ${
              kid.value
            }, Needs Help? ${kid.help ? "Yes" : "No"}`}</p>
          ))}
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Travel Details</h2>
          {data.tripDetails.map((trip, idx) => (
            <div key={idx} className="p-4 border border-gray-300 rounded mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">Arrival Checkbox:</label>
                  <input
                    type="checkbox"
                    checked={trip.checkboxArrival}
                    readOnly
                    className="ml-2"
                  />
                </div>
                <div>
                  <label className="font-medium">Flight Arrival Date:</label>
                  <span className="ml-2">{trip.FlightArrivalDate}</span>
                </div>
                <div>
                  <label className="font-medium">Flight Arrival Time:</label>
                  <span className="ml-2">{trip.FlightArrivalTime}</span>
                </div>
                <div>
                  <label className="font-medium">Location Arrival:</label>
                  <span className="ml-2">{trip.LocationArrival}</span>
                </div>
                <div>
                  <label className="font-medium">Flight Arrival Number:</label>
                  <span className="ml-2">{trip.FlightArrivalNumber}</span>
                </div>
                <div>
                  <label className="font-medium">Notes Arrival:</label>
                  <span className="ml-2">{trip.NotesArrival}</span>
                </div>
                <div>
                  <label className="font-medium">Departure Checkbox:</label>
                  <input
                    type="checkbox"
                    checked={trip.checkboxDeparture}
                    readOnly
                    className="ml-2"
                  />
                </div>
                <div>
                  <label className="font-medium">Flight Departure Date:</label>
                  <span className="ml-2">{trip.FlightDepartureDate}</span>
                </div>
                <div>
                  <label className="font-medium">Flight Departure Time:</label>
                  <span className="ml-2">{trip.FlightDepartureTime}</span>
                </div>
                <div>
                  <label className="font-medium">Location Departure:</label>
                  <span className="ml-2">{trip.LocationDeparture}</span>
                </div>
                <div>
                  <label className="font-medium">
                    Flight Departure Number:
                  </label>
                  <span className="ml-2">{trip.FlightDepartureNumber}</span>
                </div>
                <div>
                  <label className="font-medium">Notes Departure:</label>
                  <span className="ml-2">{trip.NotesDeparture}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

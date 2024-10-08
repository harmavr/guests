"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/[locale]/lib/hooks";
import { useSearchParams } from "next/navigation";
import { reservationDataActions } from "@/src/app/[locale]/lib/features/reservationData/reservationDataSlice";

export default function Page2() {
  const searchParams = useSearchParams(); // Get the search params (query string)
  const row = parseInt(searchParams.get("row") || "0");

  const detailedUsers = useAppSelector(
    (state) => state.reservationData.data[row - 1]?.detailedUser || []
  );

  const [user, setUser] = useState(detailedUsers);

  const dispatch = useAppDispatch();

  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const num_of_adults = useAppSelector(
    (state) => state.reservationData.data[row - 1]?.numOfAdults || 0
  );

  useEffect(() => {
    const page1Button = document.querySelector("#page1-button");
    const page2Button = document.querySelector("#page2-button");
    const page3Button = document.querySelector("#page3-button");
    const page4Button = document.querySelector("#page4-button");

    page1Button?.classList.remove("active");
    page2Button?.classList.add("active");
    page3Button?.classList.remove("active");
    page4Button?.classList.remove("active");
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted", { ...user });
  };

  const adultsArray = useAppSelector(
    (state) => state.reservationData.data[row - 1]?.detailedUser.details || []
  );

  const saveData = (index: number) => {
    console.log(`the index is ${index}`);

    dispatch(
      reservationDataActions.saveData({
        firstName: user.details[index].firstName,
        lastName: user.details[index].lastName,
        index, // 0-based index

        row,
      })
    );
    console.log(`Data saved for User ${index}`);

    if (index < adultsArray.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    const updatedUser = { ...user };

    const updatedDetails = [...updatedUser.details];

    updatedDetails[index] = {
      ...updatedDetails[index],
      [name]: value,
    };

    updatedUser.details = updatedDetails;

    setUser(updatedUser);
  };



  return (
    <>
      {adultsArray.map((el, index) => (
        <div key={index}>
          {currentUserIndex === index ? (
            <>
              <p>{`User ${index + 1} out of ${adultsArray.length}`}</p>
              <form onSubmit={onSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input
                      className={`appearance-none block md:w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${user.details[index].firstName ? 'border-slate-500' : 'border-red-500'
                        }`}
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={user.details[index].firstName || ""}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input
                      className={`appearance-none block md:w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${user.details[index].lastName ? 'border-slate-500' : 'border-red-500'
                        }`} type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={user.details[index].lastName || ""}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </div>
                </div>
                {index < adultsArray.length && (
                  <button type="button" onClick={() => saveData(index)}>
                    Done
                  </button>
                )}
                <hr />
              </form>
            </>
          ) : null}
        </div>
      ))}
    </>
  );
}

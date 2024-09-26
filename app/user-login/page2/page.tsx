"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useSearchParams } from "next/navigation";
import { reservationDataActions } from "@/app/lib/features/reservationData/reservationDataSlice";

export default function Page2() {
  const searchParams = useSearchParams(); // Get the search params (query string)
  const row = parseInt(searchParams.get("row") || "0");

  const detailedUsers = useAppSelector(
    (state) => state.reservationData.data[row - 1].detailedUser
  );

  const [user, setUser] = useState([...detailedUsers]);

  const dispatch = useAppDispatch();

  const [completedUsers, setCompletedUsers] = useState<number[]>([]);

  const num_of_adults = useAppSelector(
    (state) => state.reservationData.data[row - 1].numOfAdults
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

  const adultsArray = Array.from({ length: num_of_adults }, (_, index) => index + 1);

  const saveData = (index: number) => {
    console.log(`the index is ${index}`);

    dispatch(
      reservationDataActions.saveData({
        firstName: user[index - 1].firstName,
        lastName: user[index - 1].lastName,
        index: index - 1, // Adjust index to 0-based for array access
        row,
      })
    );
    console.log(`Data saved for User ${index}`);
    setCompletedUsers([...completedUsers, index]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    const updatedUsers = [...user];
    updatedUsers[index - 1] = { ...updatedUsers[index - 1], [name]: value };

    setUser(updatedUsers);
  };

  return (
    <>
      {adultsArray.map((index) => (
        <div key={index}>
          {completedUsers.length + 1 === index ? (
            <>
              <p>{`User${index} out of ${adultsArray.length}`}</p>
              <form onSubmit={onSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input
                      className="appearance-none block md:w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={user[index - 1].firstName || ""}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input
                      className="appearance-none block md:w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={user[index - 1].lastName || ""}
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

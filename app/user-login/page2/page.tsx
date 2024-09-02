"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Footer } from "../footer";
import { formActions } from "@/app/lib/features/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";

export default function Page2() {
  const zoub = {
    firstName: "",
    lastName: "",
  };
  const dispatch = useAppDispatch();

  const [data, setData] = useState(zoub);
  const [completedUsers, setCompletedUsers] = useState<number[]>([]);
  const page = useAppSelector((state) => state.form.page);
  const property = useAppSelector((state) => state.form.propertyName);
  const city = useAppSelector((state) => state.form.city);
  const num_of_adults = useAppSelector((state) => state.form.numOfAdults);

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

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Submitted", { ...data });
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   console.log(`Name ${name}, Value ${value}`);
  //   console.log(data);

  //   setData({ ...data, [name]: value });

  //   dispatch(
  //     formActions.submit({
  //       ...data,
  //       [name]: value,
  //     })
  //   );

  //   // Trigger validation
  //   dispatch(
  //     formActions.validate({
  //       propertyName: name === "propertyName" ? value : undefined,
  //       city: name === "city" ? value : undefined,
  //       numOfAdults: name === "numberOfAdults" ? value : undefined,
  //     })
  //   );
  // };

  const adultsArray = Array.from(
    { length: num_of_adults },
    (_, index) => index + 1
  );

  const saveData = (index: number) => {
    console.log(`the index is ${index}`);

    dispatch(
      formActions.saveData({
        firstName: data.firstName,
        lastName: data.lastName,
        index: index - 1, // Adjust index to 0-based for array access
      })
    );
    console.log(`Data saved for User${index}`, data);
    setCompletedUsers([...completedUsers, index]);

    // dispatch(
    //   formActions.validate({
    //     firstName: name
    //   })
    // );

    // const next = () => {
    //   dispatch(formActions.next);
    // };

    setData(zoub);
  };

  return (
    <>
      {adultsArray.map((index) => (
        <div key={index}>
          {completedUsers.length + 1 === index ? (
            <>
              <p>{`User${index} out of ${adultsArray.length}`}</p>
              {/* <h3>{`User${index}`}</h3> */}
              <form onSubmit={onSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input
                      className="appearance-none block md:w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={(e) => {
                        setData({ ...data, firstName: e.target.value });
                      }}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input
                      className="appearance-none block md:w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={(e) => {
                        setData({ ...data, lastName: e.target.value });
                      }}
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

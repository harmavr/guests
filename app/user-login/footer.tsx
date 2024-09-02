import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../lib/features/form/formSlice";
import { reservationActions } from "../lib/features/reservation/reservationSlice";
import Page1 from "./page1/page";
import { log } from "console";

export const Footer = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.form.page);
  const errors = useSelector((state) => state.form.errors);
  const detailedUser = useSelector((state) => state.form.detailedUser);
  const numOfAdults = useSelector((state) => state.form.numOfAdults);
  const weAreFree = useSelector((state) => state.form.weAreFreeToGo);
  const formData = useSelector((state) => state.form);

  const [isNextEnabled, setIsNextEnabled] = useState(false);
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
      `number of adults ${numOfAdults} and detailed user length ${currentUser.length}`
    );

    if (page === 2) {
      setIsNextEnabled(
        parseInt(numOfAdults) === currentUser.length + 1 ||
          currentUser.length === parseInt(numOfAdults)
      );
    } else {
      setIsNextEnabled(true);
    }
  }, [page, detailedUser, numOfAdults]);

  const handleNext = () => {
    const formElement = document.querySelector("form");
    // console.log(formElement);
    console.log(page);

    if (formElement?.checkValidity()) {
      formElement.requestSubmit();

      console.log(
        `detailed  ${detailedUser.length}, numofAdults ${numOfAdults}`
      );

      if (
        parseInt(numOfAdults) === detailedUser.length + 1 ||
        detailedUser.length === parseInt(numOfAdults)
      ) {
        if (page === 2) {
          dispatch(
            formActions.saveData({
              firstName: formElement?.querySelector("input[name='firstName']")
                ?.value,
              lastName: formElement?.querySelector("input[name='lastName']")
                ?.value,
              index: numOfAdults - 1, // Adjust index to 0-based for array access
            })
          );
        }
      }

      if (page === 4) {
        console.log(formData);

        dispatch(reservationActions.saveReservation({ formData }));
      }

      if (weAreFree) {
        dispatch(formActions.next(page));
      }
    } else {
      // Trigger validation on next button click if the form is invalid
      if (page === 1) {
        dispatch(
          formActions.validate({
            propertyName: formElement?.querySelector(
              "input[name='propertyName']"
            )?.value,
            city: formElement?.querySelector("input[name='city']")?.value,
            numOfAdults: formElement?.querySelector("input[name='numOfAdults']")
              ?.value,
          })
        );
      }
      if (page == 2) {
        console.log("MAPINW STO DISPATCDH");

        dispatch(
          formActions.validate({
            firstName: formElement?.querySelector("input[name='firstName']")
              ?.value,

            lastName: formElement?.querySelector("input[name='lastName']")
              ?.value,
          })
        );
      }

      if (page === 6) {
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
          !isNextEnabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
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

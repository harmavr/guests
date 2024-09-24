import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { formActions } from "../lib/features/form/formSlice";
import Link from "next/link";
import { verificationActions } from "../lib/features/verification-code/verificationCodeSlice";
import { ReservationData } from "../lib/types";
import { reservationDataActions } from "../lib/features/reservationData/reservationDataSlice";
import { useSearchParams } from "next/navigation";

interface ModalDetails {
  openModal: boolean;
  modalHandler(): any;
}

export default function EmailModal({ openModal, modalHandler }: ModalDetails) {
  const closeModal = (
    openModal: boolean,
    modalHandler: (arg0: boolean) => void
  ) => {
    modalHandler(!openModal);
  };

  const reservation = useAppSelector(state => state.reservationData.data)
  const searchParams = useSearchParams(); // Get the search params (query string)
  const row = parseInt(searchParams.get("row"));

  useEffect(() => {
    verifyRef.current?.focus();
    console.log("Modal opened or updated");
  }, []);

  const [codeArray, setCodeArray] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState(""); // State to store error message

  const dispatch = useAppDispatch();

  const accessCode = useSelector((state: any) => state.verification.keyAccess);

  useEffect(() => {
    console.log(accessCode);
  });

  const checkCodeHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission
    const codeString = codeArray.join("");
    const codeNumber = parseInt(codeString);
    if (accessCode !== codeNumber) {
      setError("Incorrect verification code. Please try again."); // Set error message
      console.log(codeArray);
    } else {
      setError(""); // Clear any previous error messages
      console.log("SUCCESS");

      dispatch(reservationDataActions.changeStatus({ index: row - 1 }))
      closeModal(openModal, modalHandler);
      dispatch(formActions.init());
      dispatch(verificationActions.newCode());

      // Proceed with next step (e.g., close modal, redirect, etc.)
    }
  };

  // Refs for input fields
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const verifyRef = useRef<HTMLButtonElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    console.log(value);

    if (Number(value) && value.length === 1) {
      // Update the code array with the new value
      const updatedCodeArray = [...codeArray];
      updatedCodeArray[index] = value;
      setCodeArray(updatedCodeArray);

      // Move focus to the next input field
      if (index < inputRefs.current.length - 1 && value) {
        inputRefs.current[index + 1].focus();
      }
      if (index === inputRefs.current.length - 1) {
        verifyRef.current?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index >= 0) {
      // Move focus to the previous input field on Backspace
      // inputRefs.current[index].value = "";
      const updatedCodeArray = [...codeArray];
      updatedCodeArray[index] = "";
      setCodeArray(updatedCodeArray);

      index > 0
        ? inputRefs.current[index - 1].focus()
        : inputRefs.current[index].focus();

      console.log(e.key);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");

    if (pasteData.length === 6 && Number(pasteData)) {
      const updatedCodeArray = pasteData.split("").slice(0, 6);
      setCodeArray(updatedCodeArray);

      // Automatically fill each input with the corresponding digit and set focus to the last one
      updatedCodeArray.forEach((digit, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = digit;
        }
      });

      // Set focus to the last input
      // inputRefs.current[5]?.focus();
      verifyRef.current?.focus();
    }
  };

  return (
    <>
      {openModal && (
        <>
          {/* Modal backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

          {/* Modal content */}
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <h2 className="text-2xl font-semibold mb-4">
                E-mail Verification
              </h2>
              <p className="mb-4">We sent a verification code to your e-mail</p>
              <p className="mb-4">Type your security code or paste it below</p>

              <div className="flex justify-center space-x-2 mb-4">
                {codeArray.map((code, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-10 h-12 border rounded text-center text-lg"
                    maxLength={1}
                    value={codeArray[index]}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el!)} // Assign refs dynamically
                    onPaste={index === 0 ? handlePaste : undefined} // Only handle paste on the first input
                  />
                ))}
              </div>

              {/* Error message */}
              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="flex justify-between items-center">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
                  onClick={() => closeModal(openModal, modalHandler)}
                >
                  Back
                </button>

                <button
                  ref={verifyRef}
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={checkCodeHandler}
                >
                  Verify my e-mail
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

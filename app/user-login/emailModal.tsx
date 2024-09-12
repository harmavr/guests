import { Verification } from "next/dist/lib/metadata/types/metadata-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../lib/hooks";
import { formActions } from "../lib/features/form/formSlice";
import Link from "next/link";

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

  useEffect(() => {
    console.log("Modal opened or updated");
  });

  const [code, setCode] = useState("");
  const [error, setError] = useState(""); // State to store error message

  const dispatch = useAppDispatch();

  const accessCode = useSelector(
    (state: Verification) => state.verification.keyAccess
  );

  useEffect(() => {
    console.log(accessCode);
  });

  const checkCodeHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission

    if (accessCode !== parseInt(code)) {
      setError("Incorrect verification code. Please try again."); // Set error message
      console.log(parseInt(code));
    } else {
      setError(""); // Clear any previous error messages
      console.log("SUCCESS");
      closeModal(openModal, modalHandler);
      dispatch(formActions.init());

      // Proceed with next step (e.g., close modal, redirect, etc.)
    }
  };

  return (
    <>
      {openModal && (
        <>
          {/* Modal backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

          {/* Modal content */}
          {/* <form onSubmit={checkCodeHandler}> */}
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <h2 className="text-2xl font-semibold mb-4">
                E-mail Verification
              </h2>
              <p className="mb-4">We sent a verification code to your e-mail</p>
              <p className="mb-4">Type your security code</p>

              <div className="flex justify-center space-x-2 mb-4">
                <input
                  type="number"
                  className="w-10 h-12 border rounded text-center text-lg"
                  maxLength={1}
                  onChange={(e) => {
                    setCode(code + e.target.value);
                  }}
                />
                <input
                  type="number"
                  className="w-10 h-12 border rounded text-center text-lg"
                  maxLength={1}
                  onChange={(e) => {
                    setCode(code + e.target.value);
                  }}
                />
                <input
                  type="number"
                  className="w-10 h-12 border rounded text-center text-lg"
                  maxLength={1}
                  onChange={(e) => {
                    setCode(code + e.target.value);
                  }}
                />
                <input
                  type="number"
                  className="w-10 h-12 border rounded text-center text-lg"
                  maxLength={1}
                  onChange={(e) => {
                    setCode(code + e.target.value);
                  }}
                />
                <input
                  type="number"
                  className="w-10 h-12 border rounded text-center text-lg"
                  maxLength={1}
                  onChange={(e) => {
                    setCode(code + e.target.value);
                  }}
                />
                <input
                  type="number"
                  className="w-10 h-12 border rounded text-center text-lg"
                  maxLength={1}
                  onChange={(e) => {
                    setCode(code + e.target.value);
                  }}
                />
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
                  type="submit" // Submit button to trigger form submit
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={checkCodeHandler}
                >
                  Verify my e-mail
                </button>
              </div>
            </div>
          </div>
          {/* </form> */}
        </>
      )}
    </>
  );
}

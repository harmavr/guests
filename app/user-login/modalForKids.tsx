import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { formActions } from "../lib/features/form/formSlice";
import { reservationDataActions } from "../lib/features/reservationData/reservationDataSlice";
import { useSearchParams } from "next/navigation";

interface ModalDetails {
  openModal: boolean;
  modalHandler(): any;
}

export default function ModalForKids({
  openModal,
  modalHandler,
}: ModalDetails) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const row = parseInt(searchParams.get("row") || "0"); // Default to 0 if not found

  const kids = useAppSelector(
    (state) => state.reservationData.data[row - 1]?.kidsAges || []
  );

  const test = useAppSelector(
    (state) => state.reservationData.data[row - 1]
  );

  const [localKidsAges, setLocalKidsAges] = useState(kids);

  const closeModal = (
    openModal: boolean,
    modalHandler: (arg0: boolean) => void
  ) => {
    modalHandler(!openModal);
  };

  useEffect(() => {
    setLocalKidsAges(kids);
  }, [kids]);

  const weAreFree = useAppSelector((state) => state.form.weAreFreeToGo);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedKidsAges = localKidsAges.map((kid, i) =>
      i === index ? { ...kid, help: checked } : kid
    );

    setLocalKidsAges(updatedKidsAges);

    dispatch(
      reservationDataActions.saveHelpForKids({
        row: row,
        kidId: index,
        help: checked,
      })
    );
  };

  const handleDoneClick = () => {
    dispatch(formActions.setWeAreFreeToGo(!weAreFree));
    closeModal(openModal, modalHandler); // Close the modal after saving
  };

  return (
    <>
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
      )}
      <aside
        id="separator-sidebar"
        className={`fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white rounded-lg shadow-lg transition-transform ${openModal ? "scale-100" : "scale-0"
          }`}
        aria-label="Sidebar"
      >
        <div className="p-4">
          {/* Content */}
          {localKidsAges?.length > 0 ? (
            localKidsAges.map(
              (kid, index) =>
                kid?.value < 12 && (
                  <div key={index}>
                    <label className="container">
                      Kid {index + 1} with age {kid?.value} needs extra help?
                      <input
                        type="checkbox"
                        checked={kid?.help}
                        onChange={(e) =>
                          handleCheckboxChange(index, e.target.checked)
                        }
                      />
                    </label>
                  </div>
                )
            )
          ) : (
            <p>No kids available</p>
          )}
        </div>
        <button onClick={handleDoneClick}>Done</button>
      </aside>
    </>
  );
}

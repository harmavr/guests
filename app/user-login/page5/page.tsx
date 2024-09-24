import React, { useEffect, useState } from "react";
import EmailModal from "../emailModal";
import exportFromJSON from "export-from-json";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { useAppSelector } from "@/app/lib/hooks";

export default function Page5() {
  const reservations = useSelector(
    (state: RootState) => state.reservation.items
  );

  const reservation = useAppSelector(state => state.reservationData.data)

  useEffect(() => {
    const page1Button = document.querySelector("#page1-button");
    const page2Button = document.querySelector("#page2-button");
    const page3Button = document.querySelector("#page3-button");
    const page4Button = document.querySelector("#page4-button");
    const page5Button = document.querySelector("#page5-button");

    page1Button?.classList.remove("active");
    page2Button?.classList.remove("active");
    page3Button?.classList.remove("active");
    page4Button?.classList.remove("active");
    page5Button?.classList.add("active");

    console.log(reservations);

    // console.log(data.detailedUser);
    // console.log(kidsAges);
  }, [reservations]);

  const [openModal, setOpenModal] = useState(false);

  const [next, setNext] = useState(false);

  const modalHandler = () => {
    setOpenModal(!openModal);
    setNext(!next);
  };

  const closeModal = (
    openModal: boolean,
    modalHandler: (arg0: boolean) => void
  ) => {
    modalHandler(!openModal);
  };

  const exportData = () => {
    const data = reservations;

    const fileName = "localData";
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({
      data,
      fileName,
      fields: [
        "city",
        "detailedUser",
        "kidsAges",
        "numOfAdults",
        "numOfKids",
        "propertyName",
        "tripDetails",
      ],
      exportType,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(!openModal);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-semibold text-green-600">
          <form onSubmit={onSubmit}>
            {openModal && (
              <EmailModal openModal={openModal} modalHandler={modalHandler} />
            )}
          </form>
          All your Data has been Saved
        </h1>
        <button onClick={exportData}>export data</button>
      </div>
    </div>
  );
}

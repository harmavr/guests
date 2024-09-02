"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { formActions } from "../lib/features/form/formSlice";
import Page1 from "./page1/page";
import Page2 from "./page2/page";
import Page4 from "./page4/page";
import Page3 from "./page3/page";
import Page5 from "./page5/page";

export default function Pages() {
  const page = useAppSelector((state) => state.form.page);
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (page === 1) {
      setTitle("Reservation Info");
    }
    if (page === 2) {
      setTitle("Guests Details");
    }
    if (page === 3) {
      setTitle("Trip details");
    }
    if (page === 4) {
      setTitle("Summary");
    }
    if (page === 5) {
      setTitle("Confirmation Page");
    }
  }, [page]);

  // const handleNext = () => {
  //   dispatch(formActions.next(page));
  // };

  // const handleBack = () => {
  //   dispatch(formActions.back(page));
  // };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col w-full max-w-lgt p-4">
            <Page1 />
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col w-full max-w-lgt p-4">
            <Page2 />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-start p-4">
            <Page3 />
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-start p-4">
            <Page4 />
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col items-start p-4">
            <Page5 />
          </div>
        );
      // case 6:
      //   return (
      //     <div className="flex flex-col items-start p-4">
      //       <Page1 />
      //     </div>
      //   );
      default:
        return <div className="p-4">Page not found</div>;
    }
  };

  return (
    <div>
      <div className="flex x-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <div className="text-lg font-bold mb-4">{title}</div>
        </div>
        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">{renderPage()}</div>
      </div>
    </div>
  );
}

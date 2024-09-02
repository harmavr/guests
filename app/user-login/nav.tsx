"use client";
import React from "react";

export default function Nav() {
  return (
    <nav
      className="flex grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium   md:justify-start  "
      id="nav-buttons"
    >
      <button id="page1-button">
        <div className="relative text-left">
          <h1>Reservation Info</h1>
          <i>The overview of your reservation</i>
        </div>
      </button>
      {">"}
      <button id="page2-button">
        <div className="relative text-left">
          <h1>Guests Details</h1>
          <i>Enter the details for the guests</i>
        </div>
      </button>
      {">"}
      <button id="page3-button">
        <div className="relative text-left">
          <h1>Trip details</h1>
          <i>Enter the details of your trip</i>
        </div>
      </button>
      {">"}
      <button id="page4-button">
        <div className="relative text-left">
          <h1>Summary</h1>
          <i>View the summary for your reservation</i>
        </div>
      </button>
      {">"}
      <button id="page5-button">
        <div className="relative text-left">
          <h1>Confirmation</h1>
          <i>All your data has been saved successfully!</i>
        </div>
      </button>
    </nav>
  );
}

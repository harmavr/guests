"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Properties } from "../lib/types";
import PropertiesModal from "./propertiesModal";
import PaymentsModal from "./paymentsModal";

export default function EtouriProperties() {
  const properties = useSelector((state: Properties) => state.properties);
  const [openModal, setOpenModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState(0);
  const [resultList, setResultList] = useState<Properties[]>([]);
  const [dropdownList, setDropdownList] = useState<Properties[]>([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const [propertyFromDropdown, setPropertyFromDropdown] = useState("");

  const [propertyArray, setPropertyArray] = useState<Properties[]>([]);

  const modalHandler = () => {
    setOpenModal(!openModal);
  };

  const paymentsModalHandler = () => {
    setOpenPaymentModal(!openPaymentModal);
  };

  const handleSearch = (term: string) => {
    setLoading(true);
    setTimeout(() => {
      const resultsArray = properties.filter(
        (el: Properties) =>
          el.name.toLowerCase().includes(term.toLowerCase()) ||
          el.id.toString().includes(term.toLowerCase()) ||
          el.visitor.toLowerCase().includes(term.toLowerCase())
        // el.details.toLowerCase().includes(term.toLowerCase())
      );
      setResultList(resultsArray);
      setLoading(false);
    }, 2000);
  };

  const handleSearchForProperties = (term: string) => {
    const resultsArray = properties.filter((el: Properties) =>
      el.city.toLowerCase().includes(term.toLowerCase())
    );
    setPropertyArray(resultsArray);
  };

  const handleOptionClick = (city: string) => {
    setPropertyFromDropdown(city);
    setIsOpenDropdown(false);

    const filteredResults = properties.filter((el: Properties) =>
      el.city.toLowerCase().includes(city.toLowerCase())
    );
    setResultList(filteredResults);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        List of Reservations
      </h2>
      <h1 className="text-lg font-semibold text-gray-700 mb-2">
        See analytically the reservations, input filter, and create your own
        lists
      </h1>
      <h3 className="text-base text-gray-600 mb-6">
        In this site you can see bla bla...
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search by name, ID, visitor, or details */}
        <input
          className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500 transition-all outline-none"
          type="search"
          placeholder="Search by name, ID, visitor, or details"
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Search by cities */}
        <div className="relative">
          <input
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500 transition-all outline-none"
            type="search"
            placeholder="Search by Cities"
            name="city"
            value={propertyFromDropdown}
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
            onChange={(e) => {
              setPropertyFromDropdown(e.target.value);
              handleSearchForProperties(e.target.value);
              setIsOpenDropdown(true);
            }}
          />
          {/* Dropdown */}
          {isOpenDropdown && (
            <ul className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
              {/* Filter distinct city values */}
              {[...new Set(propertyArray.map((el: Properties) => el.city))].map(
                (city, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-600 transition-all"
                    onClick={() => handleOptionClick(city)}
                  >
                    {city}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        {/* Date Input */}
        <input
          className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500 transition-all outline-none"
          type="date"
          placeholder="Date"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        {/* Table for Properties */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-4 text-gray-600 font-semibold">
                PROPERTY
              </th>
              <th className="text-left p-4 text-gray-600 font-semibold">
                CITY
              </th>
              <th className="text-left p-4 text-gray-600 font-semibold">A/A</th>
              <th className="text-left p-4 text-gray-600 font-semibold">
                DETAILS
              </th>
              <th className="text-left p-4 text-gray-600 font-semibold">
                NIGHTS
              </th>
              <th className="text-left p-4 text-gray-600 font-semibold">
                VISITOR
              </th>
              <th className="text-left p-4 text-gray-600 font-semibold">
                TOTAL AMOUNT
              </th>
              <th className="text-left p-4 text-gray-600 font-semibold">
                STATUS
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Display Loader if loading */}
            {loading ? (
              <tr>
                <td className="text-center p-4" colSpan={7}>
                  <div>Loading...</div>
                </td>
              </tr>
            ) : resultList.length > 0 ? (
              resultList.map((el: Properties, index: number) => (
                <tr
                  key={el.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    modalHandler();
                    setRow(index);
                  }}
                >
                  <td className="p-4">{el.name}</td>
                  <td className="p-4">{el.city}</td>
                  <td className="p-4">{el.id}</td>
                  <td className="p-4">{el.details}</td>
                  <td className="p-4">{el.nights}</td>
                  <td className="p-4">{el.visitor}</td>
                  <td className="p-4">{el.total_amount}</td>
                  <td className="p-4">{el.status}</td>
                </tr>
              ))
            ) : (
              properties.map((el: Properties, index: number) => (
                <tr
                  key={el.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    modalHandler();
                    setRow(index);
                  }}
                >
                  <td className="p-4">{el.name}</td>
                  <td className="p-4">{el.city}</td>
                  <td className="p-4">{el.id}</td>
                  <td className="p-4">{el.details}</td>
                  <td className="p-4">{el.nights}</td>
                  <td className="p-4">{el.visitor}</td>
                  <td className="p-4">{el.total_amount}</td>
                  <td className="p-4">{el.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Payment Button */}
        <div className="mt-4">
          <button
            className="rounded bg-blue-500 text-white px-6 py-2 font-semibold hover:bg-blue-600 transition-all"
            onClick={() => setOpenPaymentModal(true)}
          >
            Payment
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {openPaymentModal && (
        <PaymentsModal
          open={openPaymentModal}
          modalHandler={paymentsModalHandler}
        />
      )}

      {/* Properties Modal */}
      {openModal && (
        <PropertiesModal
          properties={properties}
          openModal={openModal}
          row={row}
          modalHandler={modalHandler}
        />
      )}
    </div>
  );
}

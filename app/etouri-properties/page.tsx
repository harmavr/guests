"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Properties, ReservationData, userData } from "../lib/types";
import PropertiesModal from "./propertiesModal";
import PaymentsModal from "./paymentsModal";
import CreateReservation from "./create-reservation";
import { useAppSelector } from "../lib/hooks";

export default function EtouriProperties() {
  const properties = useSelector((state: userData) => state.properties);
  const reservations = useAppSelector((state) => state.reservationData.data);
  const [openModal, setOpenModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState(0);
  const [resultList, setResultList] =
    useState<(userData | Properties)[]>(properties);
  // const [dropdownList, setDropdownList] = useState<Properties[]>([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [resultsFound, setResultsFound] = useState(true); // Initially true since we're displaying all properties

  const [propertyFromDropdown, setPropertyFromDropdown] = useState("");

  const [searchArray, setSearchArray] = useState([]);

  const [propertyArray, setPropertyArray] = useState<Properties[]>([]);

  // const reservations = useSelector(
  //   (state: RootState) => state.reservation.items
  // );
  // const [data, setData] = useState<userData[]>([]);

  // useEffect(() => {
  //   setData(reservations);
  //   console.log(reservations);
  // }, [reservations]);

  const [reservationArray, setReservationArray] = useState<ReservationData[]>(
    []
  );

  const [tab, setTab] = useState(0);

  const modalHandler = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    setReservationArray(reservations);
    console.log(reservations);
  }, [reservations]);

  const paymentsModalHandler = () => {
    setOpenPaymentModal(!openPaymentModal);
  };

  const handleSearch = (term: string) => {
    setLoading(true);
    setTimeout(() => {
      if (!term) {
        // If the search box is empty, show all results
        setResultList(properties);
        setResultsFound(true);
      } else {
        const resultsArray = properties.filter(
          (el: userData) =>
            el.propertyName.toLowerCase().includes(term.toLowerCase()) ||
            el.id.toString().includes(term.toLowerCase()) ||
            el.detailedUser[0].firstName
              .toLowerCase()
              .includes(term.toLowerCase()) ||
            el.detailedUser[0].lastName
              .toLowerCase()
              .includes(term.toLowerCase())
        );
        setResultList(resultsArray);
        setResultsFound(resultsArray.length > 0);
      }
      setLoading(false);
    }, 2000);
  };

  const handleSearchForProperties = (term: string) => {
    if (!term) {
      // If the search box is empty, show all results
      setResultList(properties);
      setResultsFound(true);
    } else {
      const resultsArray = properties.filter((el: Properties) =>
        el.city.toLowerCase().includes(term.toLowerCase())
      );
      setPropertyArray(resultsArray);
    }
  };

  const handleOptionClick = (city: string) => {
    setPropertyFromDropdown(city);
    setIsOpenDropdown(false);

    const filteredResults = properties.filter((el: Properties) =>
      el.city.toLowerCase().includes(city.toLowerCase())
    );
    setResultList(filteredResults);
  };

  const searchByDate = (date: string) => {
    setLoading(true);

    setTimeout(() => {
      const resultsArray = properties.filter((el: userData) => {
        const arrivalDate = el.tripDetails[0].FlightArrivalDate.replace(
          /[^\d\/\n]/g,
          ""
        );
        const departureDate = el.tripDetails[0].FlightDepartureDate.replace(
          /[^\d\/\n]/g,
          ""
        );
        console.log(arrivalDate);

        const dates = arrivalDate.split("\n");

        const x = new Date();
        let currentDay = x.getDate();
        let currentMonth = x.getMonth() + 1; // JS months are 0-based, so add 1
        let currentYear = x.getFullYear();

        return dates.some((dateStr) => {
          const [day, month, year] = dateStr.split("/").map(Number); // Convert to numbers
          if (!day || !month || !year) return false;

          switch (date) {
            case "Current Year":
              return year === currentYear;

            case "Current Month":
              return month === currentMonth && year === currentYear;

            case "Current Day":
              return (
                day === currentDay &&
                month === currentMonth &&
                year === currentYear
              );

            default:
              return false;
          }
        });
      });

      setResultList(resultsArray);
      setResultsFound(resultsArray.length > 0);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          List of Reservations
        </h2>

        <div className="tabs flex flex-row space-x-3">
          <button
            className={
              tab === 1 ? `bg-slate-300 hover:underline` : `hover:underline`
            }
            onClick={() => setTab(1)}
          >
            Display all Reservations
          </button>
          <button
            className={
              tab === 2 ? `bg-slate-300 hover:underline` : `hover:underline`
            }
            onClick={() => setTab(2)}
          >
            Create a Reservation
          </button>
        </div>

        {tab === 1 && (
          <div className="pt-5">
            <h1 className="text-lg font-semibold text-gray-700 mb-2">
              See analytically the reservations, input filter, and create your
              own lists
            </h1>
            <h3 className="text-base text-gray-600 mb-6">
              In this site you can see bla bla...
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Search by name, ID, visitor, or details */}
              <input
                className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500 transition-all outline-none"
                type="search"
                placeholder="Search by Property name, ID or visitor"
                onChange={(e) => handleSearch(e.target.value)}
              />

              {/* Search by City */}
              <div className="relative">
                <input
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500 transition-all outline-none"
                  type="search"
                  placeholder="Search by City"
                  name="city"
                  value={propertyFromDropdown}
                  onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                  onChange={(e) => {
                    setPropertyFromDropdown(e.target.value);
                    handleSearchForProperties(e.target.value);
                    setIsOpenDropdown(true);
                  }}
                />
                {isOpenDropdown && (
                  <ul className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
                    {properties
                      .map((el: Properties) => el.city) // Extract the city names
                      .filter(
                        (city: string, index: number, self: string) =>
                          self.indexOf(city) === index
                      ) // Remove duplicates
                      .filter((city: string): boolean =>
                        city
                          .toLowerCase()
                          .includes(propertyFromDropdown.toLowerCase())
                      ) // Filter based on input
                      .map((city: string, index: string) => (
                        <li
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-600 transition-all"
                          onClick={() => handleOptionClick(city)}
                        >
                          {city}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              {/* Date Input */}
              <select
                name="account"
                id="account"
                defaultValue=""
                className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500 transition-all outline-none"
                onChange={(e) => searchByDate(e.target.value)}
              >
                <option value="" disabled>
                  Select Date
                </option>
                <option value="Current Year">Current Year</option>
                <option value="Current Month">Current Month</option>
                <option value="Current Day">Current Day</option>
              </select>
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
                    <th className="text-left p-4 text-gray-600 font-semibold">
                      A/A
                    </th>
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
                  {loading ? (
                    <tr>
                      <td className="text-center p-4" colSpan={7}>
                        <div>Loading...</div>
                      </td>
                    </tr>
                  ) : resultList.length > 0 ? (
                    resultList.map((el: userData, index: number) => (
                      <tr
                        key={el.id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          modalHandler();
                          setRow(index);
                        }}
                      >
                        <td className="p-4">{el.propertyName}</td>
                        <td className="p-4">{el.city}</td>
                        <td className="p-4">{el.id}</td>
                        <td className="p-4">
                          {el.tripDetails[0].FlightArrivalDate}{" "}
                          {el.tripDetails[0].FlightDepartureDate}
                        </td>
                        <td className="p-4">{`el.nights`}</td>
                        <td className="p-4">
                          {el.detailedUser[0].firstName}{" "}
                          {el.detailedUser[0].lastName}
                        </td>
                        <td className="p-4">{el.total_amount}</td>
                        <td className="p-4">{el.status}</td>
                      </tr>
                    ))
                  ) : !resultsFound ? (
                    <tr>
                      <td className="text-center p-4" colSpan={7}>
                        No Results Found
                      </td>
                    </tr>
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

                {/* RESERVATION ARRAY */}

                <tbody>
                  {reservations.map((el: ReservationData, index: number) => (
                    <tr
                      key={el.data[index].id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        modalHandler();
                        setRow(index);
                      }}
                    >
                      <td className="p-4">{el.data[index].propertyName}</td>
                      <td className="p-4">{el.data[index].city}</td>
                      <td className="p-4">{el.data[index].id}</td>
                      <td className="p-4">
                        {el.data[index].tripDetails.arrivalDate}{" "}
                        {el.data[index].tripDetails.departureDate}
                      </td>
                      <td className="p-4">{`el.data[index].nights`}</td>
                      <td className="p-4">
                        {el.data[index].visitorData.firstName}{" "}
                        {el.data[index].visitorData.lastName}
                      </td>
                      <td className="p-4">{el.data[index].totalAmount}</td>
                      <td className="p-4">{el.data[index].status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* END */}
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
          </div>
        )}

        {tab === 2 && <CreateReservation />}

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
    </>
  );
}

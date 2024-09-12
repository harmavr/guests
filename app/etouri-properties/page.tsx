"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Properties } from "../lib/types";
import PropertiesModal from "./propertiesModal";

export default function EtouriProperties() {
  const properties = useSelector((state: Properties) => state.properties);
  const [openModal, setOpenModal] = useState(false);
  const [row, setRow] = useState(0);

  const modalHandler = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tailwind CSS Styled Table</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-4 text-gray-600 font-semibold">
                PROPERTY
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
          {properties.map((el: Properties, index: number) => (
            <>
              <tbody>
                <tr
                  className="border-b hover:bg-gray-50"
                  onClick={() => {
                    modalHandler();
                    setRow(index);
                  }}
                >
                  <td className="p-4">{el.name}</td>
                  <td className="p-4">{el.id}</td>
                  <td className="p-4">{el.details}</td>
                  <td className="p-4">{el.nights}</td>
                  <td className="p-4">{el.visitor}</td>

                  <td className="p-4">{el.total_amount}</td>
                  <td className="p-4">{el.status}</td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
      </div>

      {openModal && (
        <PropertiesModal
          properties={properties}
          openModal={openModal}
          row={row}
          modalHandler={() => modalHandler()}
        />
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import PaymentsFormModal from "./paymentsFormModal";
import Payments from "./payments";
import { useSelector } from "react-redux";
import { TransactionList, Transactions } from "../lib/types";
import CSVUpload from "../ui/navigation/csv-upload";

interface ModalDetails {
  open: boolean;
  modalHandler(): any;
}

export default function PaymentsModal({ open, modalHandler }: ModalDetails) {
  const [openPaymentsFormModal, setOpenPaymentsFormModal] = useState(false);

  const paymentsFormModalHandler = () => {
    setOpenPaymentsFormModal(!openPaymentsFormModal);
  };

  const transactionList = useSelector(
    (state: { transaction: TransactionList }) => state.transaction.items
  );

  const [tab, setTab] = useState(0);

  useEffect(() => {
    console.log(transactionList);
  }, [transactionList]);

  const closeModal = () => {
    modalHandler();
  };

  return (
    <>
      {open && (
        <>
          {/* Dark background overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10"></div>

          {/* Modal content */}
          <div className="fixed  inset-0 flex items-end justify-end z-10 ">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full transform translate-y-3 opacity-1  ease-out  p-6 space-y-6 h-full overflow-auto">
              {/* Modal header with close button */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Payments</h2>
                <button
                  className="text-gray-400 hover:text-gray-600 transition"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </div>

              <div className="tabs flex flex-row space-x-3">
                <button
                  className={
                    tab === 1
                      ? `bg-slate-300 hover:underline`
                      : `hover:underline`
                  }
                  onClick={() => setTab(1)}
                >
                  Upload CSV
                </button>
                <button
                  className={
                    tab === 2
                      ? `bg-slate-300 hover:underline`
                      : `hover:underline`
                  }
                  onClick={() => setTab(2)}
                >
                  Transaction
                </button>
              </div>

              {tab === 1 && <CSVUpload />}
              {tab === 2 && (
                <div>
                  {/* Add Payment Button */}
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
                      onClick={() => setOpenPaymentsFormModal(true)}
                    >
                      + Add Payment
                    </button>
                  </div>

                  {/* Info Text */}
                  <p className="text-sm text-gray-500">
                    Here you can see payment details and add new payments.
                  </p>

                  {/* Payments List */}
                  {transactionList.length > 0 ? (
                    <div className="space-y-4">
                      {transactionList.map(
                        (transaction: Transactions, index: number) => (
                          <Payments
                            key={index}
                            element={transaction}
                            index={index}
                          />
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">No transactions available</p>
                  )}
                </div>
              )}
              {/* Back Button */}
              <div className="flex justify-start">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-all"
                  onClick={closeModal}
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* Payment Form Modal */}
          <div className={`fixed inset-0 z-10 transition-all duration-500 ease-in-out
          ${openPaymentsFormModal ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}
           `}>

            <PaymentsFormModal
              open={openPaymentsFormModal}
              modalHandler={paymentsFormModalHandler}
            />

          </div>
        </>
      )}
    </>
  );
}

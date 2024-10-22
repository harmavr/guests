import React, { useState } from "react";
import { useAppDispatch } from "../../../lib/hooks";
import { transactionAction } from "../../../lib/features/transactions/transactionsSlice";
import { useSelector } from "react-redux";
import { TransactionList } from "../../../lib/types";

interface ModalDetails {
	open: boolean;
	modalHandler(): any;
}

export default function PaymentsFormModal({
	open,
	modalHandler,
}: ModalDetails) {
	const closeModal = (
		openModal: boolean,
		modalHandler: (arg0: boolean) => void
	) => {
		modalHandler(!openModal);
	};

	const transaction = useSelector(
		(state) => state.transaction
	);

	const [data, setData] =
		useState<TransactionList>({
			items: [
				{
					paymentMethod: "",
					transactionNumber: 0,
					date: "",
					account: "",
					company: "",
					description: "",
					total: 0,
				},
			],
		});

	const dispatch = useAppDispatch();

	return (
		<>
			{open && (
				<>
					<div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm z-10"></div>

					<div className="fixed inset-0 flex items-center justify-end z-10 overflow-auto ">
						<div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 space-y-6 h-full z-20">
							<h1 className="text-xl font-semibold">
								New transaction
							</h1>
							<p className="text-gray-600">
								<i>
									Fill in the required information
									for the transaction
								</i>
							</p>

							<form className="space-y-4">
								<div className="w-full">
									<select
										name="payment-method"
										id="payment-method"
										defaultValue=""
										className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
										onChange={(e) => {
											const updatedData =
												data.items.map(
													(item, index) => {
														if (index === 0) {
															return {
																...item,
																paymentMethod:
																	e.target.value,
															};
														}
														return item;
													}
												);
											setData({
												items: updatedData,
											});
											console.log(updatedData);
										}}
									>
										<option disabled value="">
											Select payment method
										</option>
										<option value="Cash">
											Cash
										</option>
										<option value="Debit Card">
											Debit Card
										</option>
									</select>
								</div>

								<div className="w-full">
									<select
										name="account"
										id="account"
										defaultValue=""
										className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
										onChange={(e) => {
											const updatedData =
												data.items.map(
													(item, index) => {
														if (index === 0) {
															return {
																...item,
																account:
																	e.target.value,
															};
														}
														return item;
													}
												);
											setData({
												items: updatedData,
											});
											console.log(updatedData);
										}}
									>
										<option value="" disabled>
											Select account
										</option>
										<option value="Account 1">
											Account 1
										</option>
										<option value="Account 2">
											Account 2
										</option>
									</select>
								</div>

								<input
									type="number"
									placeholder="Transaction number"
									className="block w-full bg-white border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
									onChange={(e) => {
										const updatedData =
											data.items.map(
												(item, index) => {
													if (index === 0) {
														return {
															...item,
															transactionNumber:
																e.target.value,
														};
													}
													return item;
												}
											);
										setData({
											items: updatedData,
										});
										console.log(updatedData);
									}}
								/>

								<input
									type="date"
									className="block w-full bg-white border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
									onChange={(e) => {
										const updatedData =
											data.items.map(
												(item, index) => {
													if (index === 0) {
														return {
															...item,
															date: e.target
																.value,
														};
													}
													return item;
												}
											);
										setData({
											items: updatedData,
										});
										console.log(updatedData);
									}}
								/>

								<div className="w-full">
									<select
										name="company"
										id="company"
										defaultValue=""
										className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
										onChange={(e) => {
											const updatedData =
												data.items.map(
													(item, index) => {
														if (index === 0) {
															return {
																...item,
																company:
																	e.target.value,
															};
														}
														return item;
													}
												);
											setData({
												items: updatedData,
											});
											console.log(updatedData);
										}}
									>
										<option disabled value="">
											Select company
										</option>
										<option value="Eurobank">
											Eurobank
										</option>
										<option value="Pireus">
											Pireus
										</option>
									</select>
								</div>

								<input
									type="text"
									placeholder="Description"
									className="block w-full bg-white border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
									onChange={(e) => {
										const updatedData =
											data.items.map(
												(item, index) => {
													if (index === 0) {
														return {
															...item,
															description:
																e.target.value,
														};
													}
													return item;
												}
											);
										setData({
											items: updatedData,
										});
										console.log(updatedData);
									}}
								/>

								<input
									type="number"
									placeholder="TOTAL"
									className="block w-full bg-white border-2 border-gray-300 py-2 px-4 rounded-md uppercase focus:outline-none focus:ring-2 focus:ring-gray-500"
									onChange={(e) => {
										const updatedData =
											data.items.map(
												(item, index) => {
													if (index === 0) {
														return {
															...item,
															total:
																e.target.value,
														};
													}
													return item;
												}
											);
										setData({
											items: updatedData,
										});
										console.log(updatedData);
									}}
								/>

								<button
									type="button"
									className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
									onClick={() => {
										dispatch(
											transactionAction.saveTransactionData(
												{
													data: data.items,
												}
											)
										);
										closeModal(
											open,
											modalHandler
										);
									}}
								>
									Save
								</button>
							</form>

							<button
								className="mt-4 w-full bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
								onClick={() =>
									closeModal(open, modalHandler)
								}
							>
								Back
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

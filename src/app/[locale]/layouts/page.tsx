"use client";

import React, {
	useEffect,
	useState,
} from "react";
import {
	useAppDispatch,
	useAppSelector,
} from "../lib/hooks";
import { userData } from "../lib/types";
import ReservationsTable from "../components/chart/reservations-table";
import ProductRevenue from "../components/chart/productRevenue";
import TodaysSales from "../components/chart/todaysSales";

export default function Layouts() {
	const reservations = useAppSelector(
		(state) => state.reservation.items
	);

	const dispatch = useAppDispatch();

	const [data, setData] = useState<userData[]>(
		[]
	);

	useEffect(() => {
		setData(reservations);
	}, [reservations]);

	return (
		<div className="p-4 flex flex-col  space-y-8 w-full ">
			{/* Container 1 */}

			<div className="flex flex-row">
				{/* Area 1 */}
				<div className="md:w-1/3 w-full p-4 flex flex-col space-y-4">
					<div className="h-2/3 bg-gray-200 flex justify-center items-center">
						<p> photo1</p>
					</div>
					<div className="h-1/3 flex space-x-4">
						<div className="w-1/2 bg-gray-200 flex justify-center items-center">
							<ProductRevenue />
						</div>
						<div className="w-1/2 bg-gray-200 flex justify-center items-center">
							{/* <TodaysSales /> */}
						</div>
					</div>
				</div>

				{/* Area 2 */}
				<div className="md:w-1/3 w-full p-4 flex space-x-4">
					<div className="w-1/2 space-y-4">
						<div className="h-1/2 bg-gray-200 flex justify-center items-center">
							<p>photo1</p>
						</div>
						<div className="h-1/2 bg-gray-200 flex justify-center items-center">
							<p>photo 2</p>
						</div>
					</div>
					<div className="w-1/2 space-y-4">
						<div className="h-1/2 bg-gray-200 flex justify-center items-center">
							<p>photo3</p>
						</div>
						<div className="h-1/2 bg-gray-200 flex justify-center items-center">
							<p>photo 4</p>
						</div>
					</div>
				</div>

				{/* Reservation Area */}
				<div className="md:w-1/3 w-full p-4">
					{data.length > 0 ? (
						<ReservationsTable details={data} />
					) : (
						<div className="h-full flex justify-center items-center">
							<p>No content</p>
						</div>
					)}
				</div>
			</div>

			{/* Container 2 */}

			<div className="flex flex-row">
				{/* Area 1 */}
				<div className="md:w-1/3 w-full p-4 flex flex-col space-y-4">
					<div className="h-1/3 bg-gray-200 flex justify-center items-center">
						<p>photo1</p>
					</div>
					<div className="h-1/3 bg-gray-200 flex justify-center items-center">
						<p>photo2</p>
					</div>
					<div className="h-1/3 bg-gray-200 flex justify-center items-center">
						<p>photo3</p>
					</div>
				</div>

				{/* Area 2 */}
				<div className="md:w-1/3 w-full p-4 flex space-x-4">
					<div className="w-2/3 space-y-4">
						<div className="h-full bg-gray-200 flex justify-center items-center">
							<p>photo1</p>
						</div>
					</div>
					<div className="w-1/3 space-y-4">
						<div className="h-full bg-gray-200 flex justify-center items-center">
							<p>photo2</p>
						</div>
					</div>
				</div>

				{/* Area 3 */}
				<div className="md:w-1/3 w-full p-4">
					<div className="h-full w-full bg-gray-200 flex justify-center items-center">
						<p>photo1</p>
					</div>
				</div>
			</div>

			{/* Container 3 */}

			<div className="flex flex-row">
				{/* Area 1 */}
				<div className="md:w-1/3 w-full p-4 flex flex-col space-y-4">
					<div className="h-full bg-gray-200 flex justify-center items-center">
						<p>photo1</p>
					</div>
				</div>

				{/* Area 2 */}
				<div className="md:w-1/3 w-full p-4 flex flex-col space-y-4">
					<div className="h-full bg-gray-200 flex justify-center items-center">
						<p>photo2</p>
					</div>
				</div>

				{/* Reservation Area */}
				<div className="md:w-1/3 w-full p-4">
					{data.length > 0 ? (
						<ReservationsTable details={data} />
					) : (
						<div className="h-full flex justify-center items-center">
							<p>No content</p>
						</div>
					)}
				</div>
			</div>

			{/* Container 4 */}

			<div className="flex flex-row">
				{/* Area 1 */}
				<div className="md:w-1/4 w-full p-4 flex flex-col space-y-4">
					<div className="h-full bg-gray-200 flex justify-center items-center">
						<p>photo1</p>
					</div>
				</div>

				{/* Area 2 */}
				<div className="md:w-1/4 w-full p-4 flex space-x-4">
					<div className="w-1/2 space-y-4">
						<div className="h-full bg-gray-200 flex justify-center items-center">
							<p>photo2</p>
						</div>
					</div>
					<div className="w-1/2 space-y-4">
						<div className="h-1/2 bg-gray-200 flex justify-center items-center">
							<p>photo 1</p>
						</div>
						<div className="h-1/2 bg-gray-200 flex justify-center items-center">
							<p>photo 2</p>
						</div>
					</div>
				</div>

				{/*  Area 4 */}
				<div className="md:w-1/4 w-full p-4 flex space-x-4">
					<div className="h-full w-full bg-gray-200 flex justify-center items-center">
						<p>photo1</p>
					</div>
				</div>

				{/* Area 5 */}
				<div className="md:w-1/4 w-full p-4 flex space-x-4">
					<div className="h-full w-full bg-gray-200 flex justify-center items-center">
						<p>photo1</p>
					</div>
				</div>
			</div>
		</div>
	);
}

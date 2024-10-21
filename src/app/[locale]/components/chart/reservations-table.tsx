import React from "react";
import { userData } from "../../lib/types";

export default function ReservationsTable({
	details,
}) {
	return (
		<>
			<div className="flex flex-col  overflow-y-auto">
				<h1>Reservations</h1>
				<table className="w-full bg-white border border-gray-200 rounded-lg">
					<thead>
						<tr className="bg-gray-100 border-b">
							<th className="text-left p-4">
								Property Name
							</th>
							<th className="text-left p-4">
								City
							</th>
							<th className="text-left p-4">
								Number of Adults
							</th>
							<th className="text-left p-4">
								Number of Kids
							</th>
							<th className="text-left p-4">
								Arrival Day
							</th>
							<th className="text-left p-4">
								Departure Day
							</th>
							<th className="text-left p-4">
								Total Value
							</th>
						</tr>
					</thead>
					<tbody>
						{details.map((el: userData) => (
							<tr
								key={el.id}
								className="w-full cursor-pointer"
							>
								<td className="text-left p-4">
									{el.propertyName}
								</td>
								<td className="text-left p-4">
									{el.city}
								</td>
								<td className="text-left p-4">
									{el.numOfAdults}
								</td>
								<td className="text-left p-4">
									{el.numOfKids}
								</td>
								<td className="text-left p-4">
									{
										el.tripDetails[0]
											.FlightArrivalDate
									}
								</td>
								<td className="text-left p-4">
									{" "}
									{
										el.tripDetails[0]
											.FlightDepartureDate
									}
								</td>
								<td className="text-left p-4">
									{el.total_amount}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

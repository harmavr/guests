import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { data } from "../../lib/features/test";

export default function ProductRevenue() {
	return (
		<LineChart
			xAxis={[
				{ data: [1, 2, 3, 5, 8, 10, 12, 20] },
			]}
			series={[
				{
					data: data,
					area: true,
				},
			]}
			tooltip={{ trigger: "item" }}
			width={500}
			height={300}
		/>
	);
}

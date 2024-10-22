"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import {
	dataset,
	valueFormatter,
} from "../../lib/data/weather";

type TickParamsSelectorProps = {
	tickPlacement:
		| "end"
		| "start"
		| "middle"
		| "extremities";
	tickLabelPlacement: "tick" | "middle";
	setTickPlacement: React.Dispatch<
		React.SetStateAction<
			"end" | "start" | "middle" | "extremities"
		>
	>;
	setTickLabelPlacement: React.Dispatch<
		React.SetStateAction<"tick" | "middle">
	>;
};

function TickParamsSelector({
	tickPlacement,
	tickLabelPlacement,
	setTickPlacement,
	setTickLabelPlacement,
}: TickParamsSelectorProps) {
	return (
		<Stack
			direction="column"
			justifyContent="space-between"
			sx={{ width: "100%" }}
		></Stack>
	);
}

const chartSetting = {
	yAxis: [
		{
			label: "rainfall (mm)",
		},
	],

	height: 300,
	sx: {
		[`& .${axisClasses.directionY} .${axisClasses.label}`]:
			{
				transform: "translateX(-10px)",
			},
	},
};

export default function TodaysSales() {
	const [tickPlacement, setTickPlacement] =
		React.useState<
			"start" | "end" | "middle" | "extremities"
		>("middle");
	const [
		tickLabelPlacement,
		setTickLabelPlacement,
	] = React.useState<"middle" | "tick">("middle");

	return (
		<div>
			<TickParamsSelector
				tickPlacement={tickPlacement}
				tickLabelPlacement={tickLabelPlacement}
				setTickPlacement={setTickPlacement}
				setTickLabelPlacement={
					setTickLabelPlacement
				}
			/>
			<BarChart
				dataset={dataset}
				xAxis={[
					{
						scaleType: "band",
						dataKey: "month",
						tickPlacement,
						tickLabelPlacement,
					},
				]}
				{...chartSetting}
			/>
		</div>
	);
}

"use client";

/* eslint-disable react/no-children-prop */
import ContainerWraper from "./container-wrapper";
import Navigation from "../ui/navigation/page";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* <div className="fixed top-0 w-full z-10">
        <Navigation />
      </div> */}

			<div className="border border-gray-300 rounded-md bg-white  flex-grow mt-28 mb-8 mr-9 ml-10  flex items-center justify-center h-full">
				<ContainerWraper />
			</div>
		</>
	);
}

// max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700

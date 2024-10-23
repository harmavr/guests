import React from "react";
import ArrowScrollTop from "./(content)/components/arrowTop/arrowScrollTop";

export default function Layout({ children }) {
	return (
		<div>
			{children}
			<ArrowScrollTop />
		</div>
	);
}

"use client";

import React, { useState } from "react";
import { GoogleLogoutButton } from "../authentication/google-logout-button";

interface UserLoginDropdownProps {
	user: string;
}

const UserLoginDropdown: React.FC<
	UserLoginDropdownProps
> = ({ user }) => {
	const [isOpenDropdown, setIsOpenDropdown] =
		useState(false);

	const handleDropdown = () => {
		setIsOpenDropdown(!isOpenDropdown);
	};

	return (
		<>
			<div className="relative">
				<div className="flex items-center justify-between p-2 ">
					<div className="font-semibold">
						{user}
					</div>
					<div>
						<button onClick={handleDropdown}>
							Icon{" "}
						</button>
						{isOpenDropdown && (
							<div className="absolute bg-white shadow-lg border rounded w-full">
								<p>Settings</p>
								<p>User Details</p>
								<GoogleLogoutButton>
									Logout
								</GoogleLogoutButton>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserLoginDropdown;

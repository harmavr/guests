"use client";

import React, { useState } from "react";
import { GoogleLogoutButton } from "../authentication/google-logout-button";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

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
			<div className="flex items-center justify-between p-2 ">
				<div className="font-semibold">
					{user}
				</div>
				<div>
					<button onClick={handleDropdown}>
						<ManageAccountsIcon />
					</button>
					{isOpenDropdown && (
						<div className="absolute w-fit bg-white shadow-lg border rounded p-2 ">
							<p>Settings</p>
							<p>User Details</p>
							<GoogleLogoutButton>
								Logout
							</GoogleLogoutButton>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default UserLoginDropdown;

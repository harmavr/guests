import React, {
	FC,
	ReactNode,
	useEffect,
} from "react";
import {
	signIn,
	getSession,
} from "next-auth/react";
import { useAppDispatch } from "../../lib/hooks";
import { loginAction } from "../../lib/features/login/loginSlice";

interface GoogleSignInButtonProps {
	children: ReactNode;
}

export const GoogleLoginButton: FC<
	GoogleSignInButtonProps
> = ({ children }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const checkSession = async () => {
			const session = await getSession();
			if (session) {
				console.log(session.user?.name);

				dispatch(
					loginAction.login({
						user: session.user?.name,
					})
				); // Perform login action if authenticated
			}
		};

		checkSession();
	}, [dispatch]);

	const loginWithGoogle = () => {
		signIn("google", {
			callbackUrl:
				"http://localhost:3000/en/home-page",
		});
	};

	return (
		<button
			className="border-2 bg-green-900 text-white p-5 rounded-lg hover:bg-green-700"
			onClick={loginWithGoogle}
		>
			{children}
		</button>
	);
};

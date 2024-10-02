"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { loginAction } from "../lib/features/login/loginSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [error, setError] = useState("");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const user = useAppSelector(state => state.login.userCredentials);
    const login = useAppSelector(state => state.login.loggedIn);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        const matchedUser = user.find(
            u => u.email === userData.email && u.password === userData.password
        );

        if (matchedUser) {
            console.log("Login success");
            dispatch(loginAction.changeStatus());

            router.push("/");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="border-2 rounded-lg bg-slate-100 p-8 w-fit shadow-lg">
                <div className="flex flex-col space-y-6">
                    <div className="text-center">
                        <h1 className="text-blue-600 text-2xl font-semibold">Login</h1>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <input
                            className="p-3 w-96 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleInput}
                        />
                        <input
                            className="p-3 w-96 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={handleInput}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="showPassword"
                            className="cursor-pointer"
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPassword" className="text-sm cursor-pointer">
                            Show password
                        </label>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                            type="button"
                            onClick={handleLogin}
                        >
                            SIGN IN
                        </button>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <div>
                            Forgot{" "}
                            <button type="button" className="text-blue-500 hover:underline">
                                Username / Password?
                            </button>
                        </div>
                        <div>
                            Don't have an account?{" "}
                            <Link href="/signup-page" className="text-blue-500 hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

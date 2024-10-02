"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch } from "../lib/hooks";
import { loginAction } from "../lib/features/login/loginSlice";
import { UserLogin } from "../lib/types";
// import { redirect } from "next/navigation";

import { useRouter } from "next/navigation";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter()

    const [registerData, setRegisterData] = useState<UserLogin>({
        userCredentials: [{
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }],
        loggedIn: false
    });

    const [validData, setValidData] = useState({
        remail: "",
        rpassword: ""
    });

    const dispatch = useAppDispatch();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            userCredentials: [{
                ...registerData.userCredentials[0],
                [name]: value
            }]
        });
    };

    const handleValidCredentials = (e) => {
        const { name, value } = e.target;
        setValidData({ ...validData, [name]: value });
    };

    const handleSignUp = () => {
        if (isEmailValid && isPasswordValid && registerData.userCredentials[0].firstName && registerData.userCredentials[0].lastName) {
            dispatch(loginAction.registerUser({ data: registerData }));
            router.push('/login-page')
            // redirect("/login-page");
        }
    };

    const isEmailValid = validData.remail !== "" && validData.remail === registerData.userCredentials[0].email;
    const isPasswordValid = validData.rpassword !== "" && validData.rpassword === registerData.userCredentials[0].password;
    const isFormValid = isEmailValid && isPasswordValid && registerData.userCredentials[0].firstName && registerData.userCredentials[0].lastName;

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="border-2 rounded-lg bg-slate-100 p-8 w-fit shadow-lg">
                <div className="flex flex-col space-y-6">
                    <div className="text-center">
                        <h1 className="text-blue-600 text-2xl font-semibold">Register</h1>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <input
                            className="p-3 w-96 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            onChange={handleInput}
                        />
                        <input
                            className="p-3 w-96 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            onChange={handleInput}
                        />
                        <input
                            className="p-3 w-96 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleInput}
                        />
                        <input
                            className={`p-3 w-96 border rounded focus:outline-none focus:ring-2 ${validData.remail === ""
                                ? "border-gray-300"
                                : isEmailValid
                                    ? "border-green-500"
                                    : "border-red-500"
                                }`}
                            type="email"
                            name="remail"
                            placeholder="Re-enter Email"
                            onChange={handleValidCredentials}
                        />
                        <input
                            className="p-3 w-96 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={handleInput}
                        />
                        <input
                            className={`p-3 w-96 border rounded focus:outline-none focus:ring-2 ${validData.rpassword === ""
                                ? "border-gray-300"
                                : isPasswordValid
                                    ? "border-green-500"
                                    : "border-red-500"
                                }`}
                            type={showPassword ? "text" : "password"}
                            name="rpassword"
                            placeholder="Re-enter Password"
                            onChange={handleValidCredentials}
                        />
                    </div>

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
                            className={`px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
                            type="button"
                            disabled={!isFormValid}
                            onClick={handleSignUp}
                        >
                            SIGN UP
                        </button>
                    </div>

                    <div className="text-center">
                        <Link href="/login-page" className="text-blue-600 hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

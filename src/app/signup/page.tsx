"use client";

import React from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import logo from "@/assets/images/authPage.png";
import Image from "next/image";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import TextInput from "@/components/Utilities/TextInput";
import { useSignup } from "@/hooks/auth/useSignup";
import AuthLogo from "@/assets/images/authPage.png";

export default function Page() {
  const {
    isLoading,
    handleSignup,
    firstName,
    setConfirmPassword,
    setEmail,
    setFirstname,
    setLastname,
    setPassword,
    confirmPassword,
    email,
    password,
    lastName,
    checkboxHandler,
  } = useSignup();
  return (
    <div className="grid grid-cols-12 gap-4 text-white p-10 container mx-auto">
      <div className="hidden md:flex col-span-12 md:col-span-6 p-5 md:p-20 flex-col bg-blue rounded-lg border border-borderColor max-h-fit ">
        <h1 className="text-4xl text-center font-semibold mb-10 ">
          Unlock the Power of <span className="text-primary">GenAI</span>{" "}
          Copywriting Tool
        </h1>
        <Image
          src={AuthLogo}
          alt="Auth"
          className="aspect-square rounded-lg mx-auto"
        />
      </div>
      <div className="col-span-12 md:col-span-6 px-0 md:px-20 flex">
        <div className="flex gap-4 flex-col w-full items-center justify-center">
          <Image src={logo} alt="logo" className="h-40 w-40 mb-5 rounded-lg" />
          <div className="flex flex-col w-full gap-4">
            <TextInput
              value={firstName}
              setValue={setFirstname}
              label="First Name"
              placeholder="Enter First Name"
              name="name"
              type="text"
              isInputPrimary={false}
            />
            <TextInput
              value={lastName}
              setValue={setLastname}
              label="Last Name"
              placeholder="Enter Last Name"
              name="lastName"
              type="text"
              isInputPrimary={false}
            />
            <TextInput
              value={email}
              setValue={setEmail}
              label="Email"
              placeholder="Enter Email"
              name="email"
              type="email"
              isInputPrimary={false}
            />
            <TextInput
              value={password}
              setValue={setPassword}
              label="Password"
              placeholder="Enter Password"
              name="password"
              type="password"
              isInputPrimary={false}
            />
            <TextInput
              value={confirmPassword}
              setValue={setConfirmPassword}
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              isInputPrimary={false}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="checked-checkbox"
              type="checkbox"
              value=""
              onChange={checkboxHandler}
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:outline-none focus:border-none focus:ring-0"
            />
            <label
              htmlFor="checked-checkbox"
              className="text-slate-400 text-sm"
            >
              I agree to the{" "}
              <Link
                href={"/terms-of-service"}
                className="text-primary hover:underline"
              >
                Term of Use
              </Link>{" "}
              and{" "}
              <Link
                href={"privacy-policy"}
                className="text-primary hover:underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          <PrimaryButton onClick={handleSignup} isLoading={isLoading}>
            Sign up
          </PrimaryButton>
          <p className="text-lightGray">
            Already have an account?{" "}
            <Link href={`/login`} className="text-primary hover:cursor-pointer">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

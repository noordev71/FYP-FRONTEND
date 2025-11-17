"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import logo from "@/assets/images/authPage.png";
import Image from "next/image";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import TextInput from "@/components/Utilities/TextInput";
import { useLogin } from "@/hooks/auth/useLogin";
import AuthLogo from "@/assets/images/authPage.png";

import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import useSettings from "@/hooks/settings/useSettings";

export default function Page() {
  const { email, setEmail, password, setPassword, isLoading, handleLogin } =
    useLogin();

  const { checkIfUserValidated } = useSettings();

  const router = useRouter();
  const cookie = new Cookies();
  // if (cookie.get("token")) {
  //   router.push("home/dashboard");
  // }

  useEffect(() => {
    const validateUser = async () => {
      const result = await checkIfUserValidated();
      if (result.status === 200) {
        if (!result.valid) {
          return;
        }
        router.push("/");
      }
    };
    if (cookie.get("token")) {
      validateUser();
    }
  });

  return (
    <div className="grid grid-cols-12 gap-4 text-white p-10 container mx-auto mt-12">
      <div className="hidden md:flex col-span-12 md:col-span-6 p-5 md:p-20 flex-col bg-blue rounded-lg border border-borderColor max-h-fit ">
        <h1 className="text-primary text-4xl text-center font-semibold mb-10 ">
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
              forgotPassword={true}
            />
          </div>
          <PrimaryButton onClick={handleLogin} isLoading={isLoading}>
            Sign in
          </PrimaryButton>
          <p className="text-lightGray">
            Dont have an account?{" "}
            <Link
              href={`/signup`}
              className="text-primary hover:cursor-pointer"
            >
              Signup for free
            </Link>
          </p>
        </div>
      </div>
      {/* <ToastContainer
        position="top-center"
        toastClassName="bg-dark text-white"
      /> */}
    </div>
  );
}

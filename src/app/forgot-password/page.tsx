"use client";

import React from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import logo from "@/assets/images/Version.svg";

import Image from "next/image";
import TextInput from "@/components/Utilities/TextInput";
import { useForgot } from "@/hooks/auth/useForgot";
// ForgotPassword
export default function Page() {
  // const { email, setEmail, password, setPassword, isLoading, handleLogin } = useLogin()
  const { email, setEmail, isLoading, handleForgotPassword } = useForgot();

  return (
    <div className="flex h-full items-center py-16 min-h-screen">
      <main className="w-full max-w-lg mx-auto p-6">
        <div className="mt-7 rounded-xl shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-200">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-200">
                Remember your password?{" "}
                <Link
                  className="text-primary decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/login"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <section>
                <div className="grid gap-y-4">
                  <TextInput
                    label="Email address"
                    value={email}
                    setValue={setEmail}
                    type="email"
                    placeholder="Email Address"
                  />

                  <PrimaryButton
                    onClick={handleForgotPassword}
                    isLoading={isLoading}
                  >
                    Reset password
                  </PrimaryButton>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
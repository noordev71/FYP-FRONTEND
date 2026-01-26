import React, { useEffect } from "react";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import TextInputSettings from "./TextInputSettings";
import { useProfile } from "@/hooks/settings/useProfile";
import Loader from "@/components/Loader/Loader";

export default function ProfileTabContent() {
  const {
    getUserDetails,
    email,
    setEmail,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleProfileSave,
    isLoading,
  } = useProfile();

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <div className="text-white rounded-lg shadow-md p-4 sm:p-7 dark:bg-neutral-800">
        {isLoading && <Loader forPage={false} />}
        <div className="mb-8">
          <h2 className=" text-3xl text-primary font-bold  montserrat">
            Profile{" "}
          </h2>
          <p className="text-sm">
            Manage your name, password and account settings.
          </p>
        </div>

        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
          {/* <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
              Profile photo
            </label>
          </div> */}

          {/* <div className="sm:col-span-9">
            <div className="flex items-center gap-5">
              <div className="inline-block size-16 rounded-full border-gray-200 border ring-2 ring-white dark:ring-neutral-900 relative shadows-sm">
                <img
                  src={profilePhoto}
                  alt="Profile Picture"
                  className="w-full h-full object-cover rounded-full"
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex gap-x-2">
                <div>
                  <button
                    onClick={handleFileClick}
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
                    Upload photo
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="sm:col-span-3">
            <label
              htmlFor="af-account-full-name"
              className="inline-block text-sm mt-2.5"
            >
              Full name
            </label>
          </div>

          <div className="sm:col-span-9">
            <div className="sm:flex">
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Maria"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Boone"
              />
            </div>
          </div> */}

          <div className="sm:col-span-3">
            <label className="inline-block text-sm mt-2.5">Email</label>
          </div>

          <div className="sm:col-span-9">
            <TextInputSettings
              type="email"
              placeholder="example@example.com"
              value={email}
              setValue={setEmail}
              disabled={true}
            />
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="af-account-password"
              className="inline-block text-sm mt-2.5"
            >
              Password
            </label>
          </div>

          <div className="sm:col-span-9">
            <div className="space-y-2">
              <TextInputSettings
                type="password"
                placeholder="Enter current password"
                value={oldPassword}
                setValue={setOldPassword}
              />
              <TextInputSettings
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                setValue={setNewPassword}
              />
              <TextInputSettings
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                setValue={setConfirmPassword}
              />
            </div>

            <div className="sm:col-span-9">
              <div className="flex justify-end">
                <div className=" w-fit mt-5">
                  <PrimaryButton className=" px-8" onClick={handleProfileSave}>
                    Save
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

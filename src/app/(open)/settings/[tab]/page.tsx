"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import ProfileTabContent from "@/components/Settings/ProfileTabContent";
import { useAuthContext } from "@/context/AuthContext";

export default function Page({ params }: { params: { tab: string } }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const authCtx = useAuthContext();

  const selectedIndexHandler = (value: number) => {
    setSelectedIndex(value);
  };

  return (
    <div className="w-full">
      {/* <section>
                <h2 className=' text-3xl text-primary font-bold  montserrat'>Settings </h2>
            </section> */}
      <Tab.Group selectedIndex={selectedIndex} onChange={selectedIndexHandler}>
        <Tab.List>
          <div className="flex flex-row gap-x-3 mb-5 w-fit px-3 rounded-lg shadow-md  dark:bg-neutral-800 text-sm">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={` p-2 hover:text-primary transition-all duration-200
                    ${
                      selected
                        ? "text-primary border-b-2 border-b-primary border-t-white  text-center font-medium"
                        : ""
                    }
                  `}
                >
                  Profile
                </button>
              )}
            </Tab>
            {/* <Tab>
              {({ selected }) => (
                <button
                  className={` p-2 hover:text-primary transition-all duration-200
                    ${
                      selected
                        ? "text-primary border-b-2 border-b-primary border-t-white  text-center font-medium"
                        : ""
                    }
                  `}
                >
                  Billing
                </button>
              )}
            </Tab> */}
            {/* <Tab>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "text-primary border-b-2 border-t-2  border-b-primary border-t-white p-2 text-center font-medium"
                      : "bg-white border-b-2 border-t-2 border-white text-black p-2"
                  }
                >
                  Invoices
                </button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "text-primary border-b-2 border-t-2  border-b-primary border-t-white p-2 text-center font-medium"
                      : "bg-white border-b-2 border-t-2 border-white text-black p-2"
                  }
                >
                  Credits
                </button>
              )}
            </Tab> */}
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ProfileTabContent />
          </Tab.Panel>
          {/* <Tab.Panel>
            <BillingTabContent selectedIndexHandler={selectedIndexHandler} />
          </Tab.Panel> */}
          {/* <Tab.Panel>
            <InvoicesTabContent />
          </Tab.Panel>
          <Tab.Panel>
            <CreditsTabContent />
          </Tab.Panel> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

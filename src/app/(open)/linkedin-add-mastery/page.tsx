"use client";
import LinkedinPosts from "@/components/LinkedinAdPosting/LinkedinPosts";
import { Tab } from "@headlessui/react";

export default function Page() {
  const classNames = (
    ...classes: (string | undefined | null | boolean)[]
  ): string => {
    // classes is an array of arguments passed to the function
    return classes.filter(Boolean).join(" ");
  };

  return (
    <section className="w-full">
      <Tab.Group>
        {/* <Tab.List className="flex space-x-1 gap-4">
          {["Linkedin Posts", "Linkedin Comments"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "py-2.5 text-sm leading-5 font-medium",
                  "focus:outline-none",
                  selected
                    ? "text-blue-600 border-b-2 border-b-blue-600"
                    : "text-gray-700 hover:opacity-70"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List> */}
        <Tab.Panels className="mt-2">
          <Tab.Panel className="">
            <LinkedinPosts />
          </Tab.Panel>
          {/* <Tab.Panel className="">
            <LinkedinComments />
          </Tab.Panel> */}
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}

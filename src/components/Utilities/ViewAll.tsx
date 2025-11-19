"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";

import Loader from "../Loader/Loader";
import { PrimaryButton } from "@/components/Button/PrimaryButton";

interface ViewAllCardsProps {
  title: string;
  getAllCards: Function;
  getAllStats: Function;
  allAdsLoaded: boolean;
  currentAds: React.ReactNode;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
}

const ViewAll: React.FC<ViewAllCardsProps> = ({
  title,
  getAllCards,
  getAllStats,
  allAdsLoaded,
  currentAds,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const router = useRouter();

  useEffect(() => {
    getAllCards();
    // getAllStats();
  }, []);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center gap-x-4">
        {/* Left Section */}
        <section>
          <h2 className=" text-5xl text-white font-bold  montserrat">
            {title}
          </h2>
          <p className="font-medium text-gray-600 text-sm leading-6">
            Here is the generated {title} history.
          </p>
        </section>

        {/* Right Section */}
        <section>
          <PrimaryButton
            className=""
            onClick={() => router.push(`/${title.toLowerCase()}-add-posting`)}
          >
            <div className="flex">
              <div className="flex items-center">
                <FaCirclePlus className="w-4 h-4 mr-1" />
              </div>
              <label className="cursor-pointer">New Post</label>
            </div>
          </PrimaryButton>
        </section>
      </div>
      {/* <div className="grid grid-cols-3 gap-3 mt-5">
        <StatCard label="Total Articles" stat={totalAds} />
        <StatCard
          label="Total Articles in last week"
          stat={totalAdsInLastWeek}
        />
        <StatCard
          label="Total credits usage"
          stat={totalCredits}
          toggleOnStat={totalCreditsInLastWeek}
        />
      </div> */}
      {!allAdsLoaded ? (
        <Loader />
      ) : totalItems === 0 ? (
        <h2 className="p-10 text-center text-primary text-2xl font-bold">
          Content generated will appear here.
        </h2>
      ) : (
        <>
          <div className="">{currentAds}</div>

          {/* Need to add infinite scroll as pagination */}
          {/* <div className="flex w-full justify-center mt-5">
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={onPageChange}
            />
          </div> */}
        </>
      )}
    </section>
  );
};

export default ViewAll;

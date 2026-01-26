"use client";

import React, { Fragment } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import PostCard from "@/components/HomePage/PostCard";
import useEmail from "@/hooks/home/useEmail";
import ViewAll from "@/components/Utilities/ViewAll";

export default function Page() {
  const {
    getAllEmailData,
    getEmailStats,
    currentItems,
    allEmails,
    allEmailsLoaded,
    itemsPerPage,
    onPageChange,
    currentPage,
    totalAds,
    totalAdsInLastWeek,
    formatDate,
    totalCredits,
    totalCreditsInLastWeek,
  } = useEmail();

  const items = (
    <div className="">
      {currentItems.length !== 0 &&
        currentItems?.map((item: any, index) => {
          return (
            <div key={index} className="mb-10">
              <p className="text-xl font-bold mb-3">{item.date_created}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {item?.email_data.map((emailAd: any) => {
                  return (
                    <PostCard
                      key={emailAd.id}
                      id={emailAd.id}
                      title={emailAd.title}
                      featureName={emailAd.feature_name}
                      detail={emailAd.response}
                      date_created={emailAd.last_edit}
                      isDataLoaded={allEmailsLoaded}
                      module={"email-marketing"}
                      isLatest={index === 0}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );

  return (
    <Fragment>
      <ViewAll
        title="Email-marketing"
        getAllCards={getAllEmailData}
        getAllStats={getEmailStats}
        allAdsLoaded={allEmailsLoaded}
        currentAds={items}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={allEmails.length || 0}
        onPageChange={onPageChange}
      />
    </Fragment>
  );
}

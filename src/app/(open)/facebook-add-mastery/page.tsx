"use client";

import React, { Fragment } from "react";

import PostCard from "@/components/HomePage/PostCard";
import { useFacebookAd } from "@/hooks/home/useFacebookAd";
import ViewAll from "@/components/Utilities/ViewAll";

export default function Page() {
  const {
    getAllFacebookPosts,
    allFacebookAds,
    onPageChange,
    currentItems,
    currentPage,
    itemsPerPage,
    allFacebookAdsLoaded,
    getAllFacebookStats,
  } = useFacebookAd();

  const items = (
    <div className="">
      {currentItems.length !== 0 &&
        currentItems?.map((item: any, index) => {
          return (
            <div key={index} className="mb-10">
              <p className="text-xl font-bold mb-3">
                {item.date_created.split("T")[0]}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {item?.facebook_data.map((fb: any) => {
                  return (
                    <PostCard
                      key={fb.id}
                      id={fb.id}
                      title={fb.title}
                      featureName={fb.feature_name}
                      detail={fb.response}
                      date_created={fb.last_edit}
                      isDataLoaded={allFacebookAdsLoaded}
                      module={"facebook-add-mastery"}
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
        title="Facebook"
        getAllCards={getAllFacebookPosts}
        getAllStats={getAllFacebookStats}
        allAdsLoaded={allFacebookAdsLoaded}
        currentAds={items}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={allFacebookAds.length || 0}
        onPageChange={onPageChange}
      />
    </Fragment>
  );
}

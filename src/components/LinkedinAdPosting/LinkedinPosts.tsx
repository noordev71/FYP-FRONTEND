"use client";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import PostCard from "@/components/HomePage/PostCard";
import { useLinkedinAd } from "@/hooks/home/useLinkedinAd";
import ViewAll from "@/components/Utilities/ViewAll";

export default function LinkedinPosts() {
  const {
    getAllLinkedinPosts,
    allLinkedinAds,
    onPageChange,
    currentItems,
    currentPage,
    itemsPerPage,
    allLinkedinAdsLoaded,
    totalAds,
    totalAdsInLastWeek,
    totalCredits,
    totalCreditsInLastWeek,
    getAllLinkedinStats,
  } = useLinkedinAd();

  const items = (
    <div className="">
      {currentItems.length !== 0 &&
        currentItems?.map((item: any, index) => {
          return (
            <div key={index} className="mb-10">
              <p className="text-xl font-bold mb-3">{item.date_created}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {item?.linkedin_data.map((linkedinAd: any) => {
                  return (
                    <PostCard
                      key={linkedinAd.id}
                      id={linkedinAd.id}
                      title={linkedinAd.title}
                      featureName={linkedinAd.feature_name}
                      detail={linkedinAd.response}
                      date_created={linkedinAd.last_edit}
                      isDataLoaded={allLinkedinAdsLoaded}
                      module={"linkedin-add-mastery"}
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
        title="Linkedin"
        getAllCards={getAllLinkedinPosts}
        getAllStats={getAllLinkedinStats}
        allAdsLoaded={allLinkedinAdsLoaded}
        currentAds={items}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={allLinkedinAds.length || 0}
        onPageChange={onPageChange}
      />
    </Fragment>
    // <section className="w-full">
    //   <div className="flex justify-between items-center gap-x-4 my-4">
    //     {/* Left Section */}
    //     <section>
    //       <h2 className=" text-5xl text-primary font-bold  montserrat text-stroke">
    //         Linkedin
    //       </h2>
    //       <p className="font-medium text-gray-600 text-sm leading-6">
    //         Here is the linkedin posts history.
    //       </p>
    //     </section>

    //     {/* Right Section */}
    //     <section>
    //       <PrimaryButton
    //         className=" hover:shadow-primary hover:shadow-md"
    //         onClick={() => router.push("/linkedin-add-posting")}
    //       >
    //         <div className="flex">
    //           <div className="flex items-center">
    //             <FaCirclePlus className="w-4 h-4 mr-1" />
    //           </div>
    //           <label className="cursor-pointer">New Post</label>
    //         </div>
    //       </PrimaryButton>
    //     </section>
    //   </div>
    //   {/* <div className="grid grid-cols-3 gap-3 mt-5">
    //     <StatCard label="Total Posts" stat={totalAds} />
    //     <StatCard label="Total Posts in last week" stat={totalAdsInLastWeek} />
    //     <StatCard
    //       label="Total credits usage"
    //       stat={totalCredits}
    //       toggleOnStat={totalCreditsInLastWeek}
    //     />
    //   </div> */}

    //   {!allLinkedinAdsLoaded ? (
    //     <Loader />
    //   ) : currentItems.length === 0 ? (
    //     <h2 className="p-10 text-center gradient-text text-2xl font-bold">
    //       Content generated will appear here.
    //     </h2>
    //   ) : (
    //     <>
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
    //         {currentItems?.map(
    //           ({ id, title, feature_name, response, date_created }, index) => {
    //             return (
    //               <PostCard
    //                 key={id}
    //                 id={id}
    //                 topic={title}
    //                 target_market={feature_name}
    //                 detail={response}
    //                 date_created={date_created}
    //                 isDataLoaded={allLinkedinAdsLoaded}
    //                 module={"linkedin-add-mastery"}
    //                 isLatest={index === 0}
    //               />
    //             );
    //           }
    //         )}
    //       </div>
    //       <div className="flex w-full justify-center mt-5">
    //         <Pagination
    //           currentPage={currentPage}
    //           itemsPerPage={itemsPerPage}
    //           totalItems={allLinkedinAds?.length || 0}
    //           onPageChange={onPageChange}
    //         />
    //       </div>
    //     </>
    //   )}
    //
    // </section>
  );
}

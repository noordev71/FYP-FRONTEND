"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import NewsLetterItem from "@/components/Utilities/NewsLetterItem";

// import { useFacebookAd } from "@/hooks/home/useFacebookAd";
// import { useLinkedinAd } from "@/hooks/home/useLinkedinAd";
// import useEmail from "@/hooks/home/useEmail";
// import Loader from "@/components/Loader/Loader";
// import AISystems from "@/components/HomePage/Sections/AISystems";
// import NewsLetterItem from "@/components/Utilities/NewsLetterItem";
// import usePublicBlog from "@/hooks/home/usePublicBlog";

const LatestFeatures = [
  { text: "Facebook", path: "/facebook-add-mastery/details" },
  { text: "Linkedin Posts", path: "/linkedin-add-mastery/details" },
  { text: "Email", path: "/email-marketing/details" },
];

const NewsLetterItems = [
  {
    name: "Wahab ahmed",
    postDate: "02 September, 2024",
    title: "how do public roadmaps help you build in public",
    description: "some random description for a news letter",
  },
  {
    name: "Wahab ahmed",
    postDate: "02 September, 2024",
    title: "how do public roadmaps help you build in public",
    description: "some random description for a news letter",
  },
  {
    name: "Wahab ahmed",
    postDate: "02 September, 2024",
    title: "how do public roadmaps help you build in public",
    description: "some random description for a news letter",
  },
  {
    name: "Wahab ahmed",
    postDate: "02 September, 2024",
    title: "how do public roadmaps help you build in public",
    description: "some random description for a news letter",
  },
  {
    name: "Wahab ahmed",
    postDate: "02 September, 2024",
    title: "how do public roadmaps help you build in public",
    description: "some random description for a news letter",
  },
];

const Dashboard = () => {
  const [selectedMode, setSelectedMode] = useState("Facebook");

  // const { getAllFacebookPosts, isLoading: facebookAdsLoading } =
  //   useFacebookAd();
  // const { getAllLinkedinPosts, isLoading: linkedinAdsLoading } =
  //   useLinkedinAd();
  // const { getAllEmailData, isLoading: emailAdsLoading } = useEmail();

  // const { isLoading, getAllBlogs, allBlogs } = usePublicBlog();

  // const [currentAdsList, setCurrentAdsList] = useState<any>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (selectedMode === "Facebook") {
  //       const response = await getAllFacebookPosts();
  //       if (response) {
  //         const allAds = response.flatMap((item: any) => item.facebook_data);
  //         setCurrentAdsList(allAds.slice(0, 5));
  //       }
  //     } else if (selectedMode === "Linkedin Posts") {
  //       const response = await getAllLinkedinPosts();
  //       if (response) {
  //         const allAds = response.flatMap((item: any) => item.linkedin_data);
  //         setCurrentAdsList(allAds.slice(0, 5));
  //       }
  //     } else {
  //       const response = await getAllEmailData();
  //       if (response) {
  //         const allAds = response.flatMap((item: any) => item.email_data);
  //         setCurrentAdsList(allAds.slice(0, 5));
  //       }
  //     }
  //     // console.log("ADS", currentAdsList);
  //   };
  //   fetchData();
  // }, [selectedMode]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     getAllBlogs();
  //   };
  //   fetchData();
  // }, []);

  const path = LatestFeatures.find(
    (feature) => feature.text === selectedMode
  )?.path;

  return (
    <div className="w-full gap-10 grid grid-cols-12 gap-y-10">
      <div className="col-span-12">{/* <AISystems /> */}</div>

      <div className="col-span-12 grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-6">
          <h2 className="text-4xl font-medium mb-5">Latest generated cards</h2>
          <div className="flex py-3">
            <div className="flex gap-x-5">
              {LatestFeatures.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`hover:opacity-[0.5] transition-all duration-300 cursor-pointer pb-2 ${
                      selectedMode === item.text
                        ? "border-b border-b-primary text-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedMode(item.text);
                    }}
                  >
                    {item.text}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col my-5">
            {/* {facebookAdsLoading || linkedinAdsLoading || emailAdsLoading ? (
              <Loader />
            ) : currentAdsList?.length === 0 ? (
              <span>No ads generated</span>
            ) : (
              currentAdsList?.map((item: any) => {
                return (
                  <Link
                    key={item.id}
                    href={`${path}/${item.id}`}
                    className="flex items-center text-sm justify-between py-2 border-b border-b-900 py-10"
                  >
                    <div className="flex items-center">
                      <div className="flex flex-col gap-y-5">
                        <h3 className="font-semibold">
                          {item.title
                            ? item.title
                            : item.our_offering
                            ? item.our_offering
                            : item.service_or_product}
                        </h3>
                        <p
                          className="line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: item.response }}
                        ></p>
                      </div>
                    </div>
                    <p className="text-xs">{item.readingTime}</p>
                  </Link>
                );
              })
            )} */}
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 flex flex-col">
          <h3 className="text-4xl font-medium mb-5">Our news letter</h3>
          {/* <div className="flex flex-col gap-y-3 w-full gap-y-8">
            {false ? (
              <Loader />
            ) : (
              NewsLetterItems?.map((item) => {
                return (
                  <NewsLetterItem
                    key={item.name}
                    id={item.name}
                    name={item.title}
                    postDate={item.postDate}
                    title={item.title}
                    description={item.description}
                  />
                );
              })
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

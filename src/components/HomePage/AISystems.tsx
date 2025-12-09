import React from "react";
import RecentSystemCard from "../RecentSystemCard";
export default function AISystems() {
  return (
    <div className="">
      <h2 className="text-4xl font-medium mb-5">Available Systems</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* <div className="flex gap-x-2 items-center">
          <h2 className="text-4xl font-medium">Recently Used AI Systems</h2>
          <IoIosArrowRoundForward size={150} className="w-full" />
        </div> */}

        <RecentSystemCard
          title="Blank Document"
          platform="Document"
          desc="Start writing a document"
        />

        <RecentSystemCard
          title="Linkedin"
          platform="Linkedin"
          desc='Grow your "personal brand" (and achieve increased engagement) through the power of LinkedIn posts!'
        />
        <RecentSystemCard
          title="Facebook"
          platform="Facebook"
          desc="Write your next high converting copy for Facebook ads!"
        />
        <RecentSystemCard
          title="Email"
          platform="Email"
          desc="Maximise the power of cold outreach through email scripts that yield better results."
        />
        <RecentSystemCard
          title="Article"
          platform="Article"
          desc="Publish your next thought provoking write-up!"
        />
      </div>

      {/* <div className=' text-center w-fit mx-auto mt-10'>
        <PrimaryButton shadow={false} className=' my-5 mx-5 border-[0.5] border-[#D3D3D3]'>
          Load More...
        </PrimaryButton>
      </div> */}
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface PostCardProps {
  id: string;
  title: string;
  featureName: string;
  detail: string;
  date_created: string;
  isDataLoaded: boolean;
  isComment?: boolean;
  module: string;
  isLatest: boolean;
}

const readingTime = (text: string) => {
  const wordsPerMinute = 225;
  const words = text?.trim()?.split(/\s+/);
  const wordCount = words?.length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
};

function formatDate(datetimeString: string) {
  const date = new Date(datetimeString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  featureName,
  detail,
  date_created,
  isDataLoaded,
  module,
  isComment,
  isLatest,
}) => {
  const router = useRouter();
  const readingTimeInMins = readingTime(detail);
  const [sanitizedDetail, setSanitizedDetail] = useState<string>(""); // State for sanitized detail

  useEffect(() => {
    const convertAndSanitize = async () => {
      if (detail) {
        const rawHTML = await marked(detail); // Convert markdown to HTML
        const sanitizedHTML = DOMPurify.sanitize(rawHTML); // Sanitize the HTML
        setSanitizedDetail(sanitizedHTML); // Update state with sanitized HTML
      } else {
        setSanitizedDetail(""); // Reset if no detail
      }
    };

    convertAndSanitize(); // Call the conversion function
  }, [detail]);

  return (
    <>
      {isDataLoaded ? (
        <div
          className="flex flex-col gap-y-3 relative block overflow-hidden w-full text-white mb-5"
          onClick={() =>
            router.push(
              `/${module}/details/${id}${isComment ? "?mode=comment" : ""}`
            )
          }
        >
          <div className="w-full bg-[#282828] px-2 py-4 sm:py-6 lg:py-8 rounded-lg hover:cursor-pointer h-[200px]">
            <p
              className="text-pretty text-sm overflow-hidden truncate-twelve-lines max-h-full"
              dangerouslySetInnerHTML={{ __html: sanitizedDetail }} // Use sanitized detail
            ></p>
          </div>

          <div className="flex flex-col justify-center gap-y-2 w-full px-2 text-sm text-gray-400">
            <h2 className="line-clamp-1 text-white min-w-full font-bold text-lg">
              Title of the post: {title}
            </h2>
            <div className="w-full flex items-center gap-x-4 text-sm">
              <span>
                <span className="text-xs">{readingTimeInMins} min read</span>
              </span>
              <span className="h-1 w-1 rounded-full bg-gray-400"></span>
              <span className="text-xs">
                last edited <span>{formatDate(date_created)}</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-white  w-full shadow-sm hover:cursor-pointer">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-[#a7ada8] via-[#a7ada8] to-[#848e87]"></span>
          <div className="sm:flex sm:justify-between sm:gap-4">
            <div className="w-full">
              <div className="w-full h-3 bg-gray-300 rounded-md" />
              <div className="mt-1 w-4/6 h-3 bg-gray-300 rounded-md" />
            </div>
            <div className="hidden sm:block sm:shrink-0">
              <div className="size-16 rounded-lg object-cover shadow-sm bg-gray-300" />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-y-1">
            <div className="h-3.5 bg-gray-300 w-full rounded-md" />
            <div className="h-3.5 bg-gray-300 w-full rounded-md" />
            <div className="h-3.5 bg-gray-300 w-full rounded-md" />
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;

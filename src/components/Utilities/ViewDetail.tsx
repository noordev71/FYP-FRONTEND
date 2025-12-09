import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import TextEditor from "./TextEditor";
import Loader from "../Loader/Loader";
import TextInput from "./TextInput";
import { PrimaryButton } from "../Button/PrimaryButton";

interface ViewDetailProps {
  getAdDetails: Function;
  backTo: string;
  title: string;
  featureName: string;
  dateCreated: string;
  response: string;
  adId: any;
  updateResponse: Function;
  visibility: string;
  canEdit: boolean;
  visibilityHandler: Function;
  visibilityLoader: boolean;
  isCustomDoc?: boolean;
  changeTitleHandler?: Function;

  /** ⭐ NEW PROP */
  image?: string;
}

const ViewDetail: React.FC<ViewDetailProps> = ({
  getAdDetails,
  backTo,
  title,
  featureName,
  dateCreated,
  response,
  adId,
  updateResponse,
  visibility,
  canEdit,
  visibilityHandler,
  visibilityLoader,
  isCustomDoc = false,
  changeTitleHandler,
  image,
}) => {
  const [isResponseUpdated, setIsResponseUpdated] = useState(false);

  const fallbackImage = `${process.env.NEXT_PUBLIC_BASE_URL + image}` || "";

  console.log("IMAGE IN VIEW DETAIL", image, fallbackImage);
  // const fallbackImage =
  //   image ||
  //   "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80";

  useEffect(() => {
    getAdDetails(adId);
  }, [isResponseUpdated, visibilityLoader]);

  const responseUpdatedHandler = () => {
    setIsResponseUpdated((state) => !state);
  };

  const titleUpdatedHandler = async (event: any) => {
    event.preventDefault();
    if (changeTitleHandler) {
      const response = await changeTitleHandler(adId, event.target.title.value);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link");
    }
  };

  const downloadImage = async () => {
    try {
      const res = await fetch(fallbackImage, { mode: "cors" });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `ad-image-${adId}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download image:", err);
      toast.error("Could not download image");
    }
  };

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="grid lg:grid-cols-8 gap-y-8 lg:gap-y-0 lg:gap-x-6">
        <div className="lg:col-span-8">
          <div className="py-8 lg:pe-8 space-y-8">
            <div className="space-y-5 lg:space-y-8">
              <Link
                className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 hover:underline dark:text-blue-500"
                href={`/${backTo}`}
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Ads
              </Link>

              <div className="flex items-center gap-x-2">
                <div className="flex justify-between items-center gap-x-5">
                  <h6 className="text-sm font-bold text-gray-500">
                    Date : {dateCreated}
                  </h6>
                  <div className="w-[1px] h-5 bg-gray-500"></div>
                  <h6 className="text-sm font-bold text-gray-500">
                    Reading time : {dateCreated}
                  </h6>
                </div>
              </div>

              {!isCustomDoc && (
                <h2 className="font-bold text-xl">Title: {title}</h2>
              )}

              {visibilityLoader ? (
                <Loader />
              ) : (
                <div className="w-fit ml-auto">
                  <p className="font-bold text-xl">
                    Share the Links directly with others.
                  </p>

                  <div className="flex gap-x-4 my-2 w-fit ml-auto">
                    <button
                      className={`w-fit p-3 transition-all rounded-lg ${
                        visibility === "Private"
                          ? "bg-primary text-black"
                          : "bg-blue"
                      }`}
                      onClick={() => {
                        visibilityHandler("Private", adId);
                        copyLink();
                      }}
                    >
                      Private
                    </button>

                    <button
                      className={`w-fit p-3 transition-all rounded-lg ${
                        visibility === "Public"
                          ? "bg-primary text-black"
                          : "bg-blue"
                      }`}
                      onClick={() => {
                        visibilityHandler("Public", adId);
                        copyLink();
                      }}
                    >
                      Public
                    </button>
                  </div>

                  <p
                    className="hover:cursor-pointer font-bold text-primary text-right"
                    onClick={copyLink}
                  >
                    Copy Link
                  </p>
                </div>
              )}
            </div>

            {isCustomDoc && (
              <form
                className="max-w-[400px] flex flex-col gap-y-4"
                onSubmit={titleUpdatedHandler}
              >
                <TextInput
                  name="title"
                  placeholder="Enter document title"
                  type="text"
                  isInputPrimary={false}
                  label="Title"
                  initialValue={title}
                  canEdit={canEdit}
                />

                <div className="w-fit">
                  <PrimaryButton type="submit">Save</PrimaryButton>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="col-span-8">
          <div
            className={`${
              isCustomDoc ? "max-w-[1240px] min-h-fit h-[1755px]" : "w-full"
            }`}
          >
            {/* IMAGE DISPLAY */}
            {fallbackImage !== "" && (
              <div className="w-full max-w-3xl mx-auto space-y-3">
                <img
                  src={fallbackImage}
                  alt="Ad Image"
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                />

                {/* DOWNLOAD BUTTON */}
                <div className="text-right">
                  <a
                    onClick={downloadImage}
                    className="inline-block px-4 py-2 bg-primary text-black rounded-lg transition cursor-pointer"
                  >
                    Download Image
                  </a>
                </div>
              </div>
            )}

            {(response || isCustomDoc) && (
              <TextEditor
                value={response}
                onSubmit={updateResponse}
                adId={adId}
                responseUpdatedHandler={responseUpdatedHandler}
                canEdit={canEdit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;

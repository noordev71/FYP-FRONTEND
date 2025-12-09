import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

import { PrimaryButton } from "../Button/PrimaryButton";
import Modal from "@/components/Utilities/Modal";
import { FaBolt } from "react-icons/fa";
import { useAuthContext } from "@/context/AuthContext";
import LockedRadio from "../FacebookAdPosting/LockedRadio";
import StatusBar from "./StatusBar";
import TextEditor from "./TextEditor";
import Loader from "../Loader/Loader";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

interface AddPostingProps {
  isPostGenerated: boolean;
  submitHandler: Function;
  formToRender: React.ReactNode;
  creditsCosting?: Number;
  isLoading: boolean;
  handleRadioSelect: Function;
  radioList: Array<any>;
  selectedMode: string;
  responseRef: React.RefObject<any>;
  loadingAnimation: boolean;
  recentGeneratedAdId: any;
  updateResponse: Function;
  isOpen: boolean;
  title: string;
  description: string;
  closeModal: Function;
}

const AddPosting: React.FC<AddPostingProps> = ({
  isPostGenerated,
  submitHandler,
  formToRender,
  creditsCosting = 0,
  isLoading,
  handleRadioSelect,
  radioList,
  selectedMode,
  responseRef,
  loadingAnimation,
  recentGeneratedAdId,
  updateResponse,
  isOpen,
  title,
  description,
  closeModal,
}) => {
  console.log("IN HEEERE REF", responseRef.current);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const authCtx = useAuthContext();

  const formSubmitHandler = async (event: any) => {
    setIsCollapsed(true);
    await submitHandler(event);
  };

  const redirectToUpgradeHandler = () => {
    router.push("/settings/profile");
  };

  return (
    <div className="w-full flex flex-col p-5 items-center gap-y-5 h-fit">
      <StatusBar isPostGenerated={isPostGenerated} />
      <h2 className="text-2xl font-bold">{title}</h2>
      <span>{description}</span>
      {isPostGenerated && (
        <div className="w-fit mx-auto">
          <PrimaryButton
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsCollapsed((state) => !state);
            }}
            className="text-white hover:bg-primary hover:text-black w-fit"
          >
            {isCollapsed ? (
              <FaChevronDown className="h-4 w-4" />
            ) : (
              <FaChevronUp className="h-4 w-4" />
            )}
          </PrimaryButton>
        </div>
      )}

      <div
        className={`w-full flex justify-center ${
          !isCollapsed ? "gap-x-5" : ""
        } h-fit`}
      >
        <div
          className={` flex flex-col items-center gap-y-5 overflow-hidden transition-all duration-500 ease-in-out ${
            isCollapsed
              ? "w-0"
              : responseRef.current?.innerHTML
              ? "w-[50%]"
              : "w-full"
          } `}
        >
          <div className="flex gap-x-5 gap-y-3 justify-center flex-wrap w-fit bg-black px-2 py-4 rounded-lg items-center">
            {radioList.map((radio, index) => {
              return (
                <Fragment key={radio.value}>
                  <LockedRadio
                    key={radio.value}
                    value={radio.value}
                    handleClick={() => {
                      handleRadioSelect(
                        radio.value,
                        radio.isPremiumFeature,
                        radio.creditsCost
                      );
                    }}
                    disabled={
                      radio.isPremiumFeature ? !authCtx.isPremium : false
                    }
                    premium={radio.isPremiumFeature}
                    selectedMode={selectedMode}
                  />
                  {index + 1 < radioList.length && (
                    <div className="w-4 h-1 bg-gray-500 rounded-lg"></div>
                  )}
                </Fragment>
              );
            })}
          </div>
          {selectedMode !== "" && (
            <div className="w-full md:w-[75%]">
              <form
                className="w-full flex flex-col gap-y-3"
                onSubmit={formSubmitHandler}
              >
                {formToRender}

                <PrimaryButton isLoading={isLoading} className="">
                  <div className="flex">
                    <div className="flex items-center">
                      <FaBolt className="w-4 h-4 mr-1" />
                    </div>
                    <label className="cursor-pointer">Generate now</label>
                  </div>
                </PrimaryButton>
              </form>
            </div>
          )}
        </div>
        <div
          className={`flex flex-col items-center gap-y-5 ${
            !responseRef.current?.innerHTML
              ? "w-0 "
              : !isCollapsed
              ? "w-[50%]"
              : "w-full"
          }`}
        >
          <p
            ref={responseRef}
            className="hidden"
            // dangerouslySetInnerHTML={{
            //   __html:
            //     !isEditing && responseRef.current.innerHTML
            //       ? marked(responseRef.current?.innerHTML)
            //       : "",
            // }}
          ></p>
          {loadingAnimation && <Loader />}

          {isPostGenerated &&
            !loadingAnimation &&
            responseRef.current &&
            responseRef.current?.innerHTML !== "" && (
              <div className="w-full">
                <TextEditor
                  value={responseRef.current.innerHTML}
                  onSubmit={updateResponse}
                  adId={recentGeneratedAdId}
                  canEdit={true}
                />
              </div>
            )}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
        }}
      >
        <section className="overflow-hidden rounded-lg md:grid md:grid-cols-3">
          <div className="p-4 text-center sm:p-6 md:col-span-3 lg:p-8">
            <p className="text-lg font-extrabold text-green-700 uppercase tracking-widest underline">
              Unlock A/B testing
            </p>

            <h2 className="my-6">
              <span className="text-4xl">
                Upgrade Your Plan To Access This Feature.{" "}
              </span>
            </h2>
            <div className="w-fit mx-auto">
              <PrimaryButton onClick={redirectToUpgradeHandler}>
                Click Here to Upgrade
              </PrimaryButton>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
};

export default AddPosting;

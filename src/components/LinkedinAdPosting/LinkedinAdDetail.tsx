"use client";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import { useLinkedinAd } from "@/hooks/home/useLinkedinAd";
import ViewDetail from "@/components/Utilities/ViewDetail";

export function LinkedinAdDetail(props: any) {
  const {
    handleGetLinkedinAd,
    linkedinAdDetails,
    formatDate,
    updateGptResponse,
    visibilityHandler,
    visibilityLoader,
  } = useLinkedinAd();

  return (
    <Fragment>
      <ViewDetail
        getAdDetails={handleGetLinkedinAd}
        backTo="linkedin-add-mastery"
        title={linkedinAdDetails?.title || ""}
        featureName={linkedinAdDetails?.feature_name || ""}
        dateCreated={formatDate(
          linkedinAdDetails?.date_created || new Date().toDateString(),
        )}
        response={linkedinAdDetails?.response || ""}
        adId={props.id}
        updateResponse={updateGptResponse}
        visibility={linkedinAdDetails?.visibility || ""}
        visibilityLoader={visibilityLoader}
        canEdit={linkedinAdDetails?.can_edit || false}
        visibilityHandler={visibilityHandler}
      />
    </Fragment>
  );
}

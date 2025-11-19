"use client";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import { useFacebookAd } from "@/hooks/home/useFacebookAd";
import ViewDetail from "@/components/Utilities/ViewDetail";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // 👈 unwrap the Promise
  const {
    handleGetFacebookAdDetails,
    facebookAdDetails,
    formatDate,
    updateGptResponse,
    visibilityHandler,
    visibilityLoader,
  } = useFacebookAd();

  return (
    <Fragment>
      {id && (
        <ViewDetail
          getAdDetails={handleGetFacebookAdDetails}
          backTo="facebook-add-mastery"
          title={facebookAdDetails?.title || ""}
          featureName={facebookAdDetails?.feature_name || ""}
          dateCreated={formatDate(
            facebookAdDetails?.date_created || new Date().toDateString()
          )}
          response={facebookAdDetails?.response || ""}
          adId={id}
          updateResponse={updateGptResponse}
          visibility={facebookAdDetails?.visibility || ""}
          visibilityLoader={visibilityLoader}
          canEdit={facebookAdDetails?.can_edit || false}
          visibilityHandler={visibilityHandler}
        />
      )}
    </Fragment>
  );
}

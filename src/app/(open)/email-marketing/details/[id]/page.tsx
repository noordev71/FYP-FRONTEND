"use client";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import useEmail from "@/hooks/home/useEmail";
import ViewDetail from "@/components/Utilities/ViewDetail";

export default function Page({ params }: { params: { id: string } }) {
  const {
    getEmailDetail,
    emailDetails,
    updateGptResponse,
    formatDate,
    visibilityHandler,
    visibilityLoader,
  } = useEmail();

  return (
    <Fragment>
      <ViewDetail
        getAdDetails={getEmailDetail}
        backTo="email-marketing"
        title={emailDetails?.title}
        featureName={emailDetails?.feature_name || ""}
        dateCreated={formatDate(
          emailDetails?.date_created || new Date().toDateString(),
        )}
        response={emailDetails?.response || ""}
        adId={params.id}
        updateResponse={updateGptResponse}
        visibility={emailDetails?.visibility || ""}
        visibilityLoader={visibilityLoader}
        canEdit={emailDetails?.can_edit || false}
        visibilityHandler={visibilityHandler}
      />
    </Fragment>
  );
}

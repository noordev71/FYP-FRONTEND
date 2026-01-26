"use client";
import React, { Fragment } from "react";

import { ToastContainer } from "react-toastify";

import Dropdown from "@/components/Utilities/Dropdown";
import TextInput from "@/components/Utilities/TextInput";
import useEmail from "@/hooks/home/useEmail";
import AddPosting from "@/components/Utilities/AddPosting";

const EmailRadios = [
  {
    value: "Standard",
    isPremiumFeature: false,
    creditsCost: 5,
    tones: [
      "Standard",
      "Conversational Catalyst",
      "Attention Grabber",
      "Precision Pitcher",
      "Prompt & Persuade",
    ],
  },
  // { value: "Casual convo starter", isPremiumFeature: true, creditsCost: 5 },
  // {
  //   value: "The Goldfish attention span",
  //   isPremiumFeature: true,
  //   creditsCost: 5,
  // },
  // {
  //   value: "Long form (Outreach Copy)",
  //   isPremiumFeature: true,
  //   creditsCost: 5,
  // },
  // { value: "Million dollar Follow up", isPremiumFeature: true, creditsCost: 5 },
];

const EmailFields = [
  {
    name: "pitch",
    type: "text",
    label: "Solution (Service/Product) to present",
    textArea: true,
    maxLength: 200,
    placeholder: "Next-Gen E-commerce Platform Tailored for Startups",
    className: "shadow-sm",
    required: true,
    rows: 1,
    toolTipText: `Next-Gen E-commerce Platform Tailored for Startups`,
  },
  {
    name: "offering",
    type: "text",
    label: "Company Name as a Provider of This Service/Product",
    textArea: true,
    maxLength: 100,
    placeholder: "E.g., TechSolutions Inc.",
    className: "shadow-sm",
    required: false,
    rows: 1,
    toolTipText: `NextWave Technologies`,
  },
  {
    name: "about",
    type: "text",
    label: "Core Differentiators of Our Solution",
    textArea: true,
    maxLength: 600,
    placeholder:
      "We provide personalized customer support 24/7, ensuring your team never faces a challenge alone.",
    className: "shadow-sm",
    required: false,
    rows: 5,
    toolTipText: `We provide personalized customer support 24/7, ensuring your team never faces a challenge alone.`,
  },
  {
    name: "niche",
    type: "text",
    label: "Prospective Client’s Industry/Niche",
    textArea: true,
    maxLength: 100,
    placeholder: "Education",
    className: "shadow-sm",
    required: false,
    rows: 1,
    toolTipText: `Education`,
  },
  {
    name: "prospectCompany",
    type: "text",
    label: "Keep same or Prospective Client Company Name",
    textArea: true,
    maxLength: 100,
    placeholder: "BrightFuture Academy",
    className: "shadow-sm",
    required: false,
    rows: 1,
    toolTipText: `BrightFuture Academy`,
  },
  {
    name: "prospectName",
    type: "text",
    label: "Client Name",
    textArea: true,
    maxLength: 50,
    placeholder: "Michael Brown, Chief Technology Officer",
    className: "shadow-sm",
    required: false,
    rows: 1,
    toolTipText: `Michael Brown, Chief Technology Officer`,
  },
  {
    name: "callToAction",
    type: "text",
    label:
      "CTA (Call-To-Action)(try to keep the CTA heading consistent across all of our service fields)",
    textArea: true,
    maxLength: 200,
    placeholder:
      "Claim your free trial today and unlock the potential of our innovative platform!",
    className: "shadow-sm",
    required: false,
    rows: 2,
    toolTipText: `Claim your free trial today and unlock the potential of our innovative platform!`,
  },
];

export default function Page() {
  const {
    isOpen,
    openModal,
    closeModal,
    isLoading,
    handleSubmit,
    loadingAnimation,
    textRef,
    showActions,
    handleRadioSelect,
    creditsCosting,
    selectedMode,
    premiumFeatureDetail,
    isPostGenerated,
    recentGeneratedAdId,
    updateGptResponse,
  } = useEmail();

  const dropdown = (
    <Dropdown
      options={
        EmailRadios.find((item) => item.value === selectedMode)?.tones || []
      }
    />
  );

  const form =
    selectedMode === "" ? (
      ""
    ) : (
      <Fragment>
        {dropdown}
        {EmailFields.map((field) => {
          return (
            <TextInput
              key={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              textArea={field.textArea}
              rows={field.rows}
              maxLength={field.maxLength}
              required={field.required}
              placeholder={field.placeholder}
              className={field.className}
              toolTipText={field.toolTipText}
            />
          );
        })}
      </Fragment>
    );
  return (
    <Fragment>
      <AddPosting
        isPostGenerated={isPostGenerated}
        submitHandler={handleSubmit}
        formToRender={form}
        creditsCosting={creditsCosting}
        isLoading={isLoading}
        handleRadioSelect={handleRadioSelect}
        radioList={EmailRadios}
        selectedMode={selectedMode}
        responseRef={textRef}
        loadingAnimation={loadingAnimation}
        recentGeneratedAdId={recentGeneratedAdId}
        updateResponse={updateGptResponse}
        isOpen={isOpen}
        title="Email"
        description="Select any email feature to continue"
        closeModal={closeModal}
      />
    </Fragment>
  );
}

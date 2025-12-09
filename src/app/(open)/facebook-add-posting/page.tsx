"use client";
import React, { Fragment } from "react";

import TextInput from "@/components/Utilities/TextInput";
import { useFacebookAd } from "@/hooks/home/useFacebookAd";
import AddPosting from "@/components/Utilities/AddPosting";
import Dropdown from "@/components/Utilities/Dropdown";

const FacebookRadios = [
  {
    value: "Standard",
    isPremiumFeature: false,
    creditsCost: 3,
    tones: ["Standard", "Power Points", "Builder", "HypeFlow"],
  },
  // { value: "The bullet digestion", isPremiumFeature: true, creditsCost: 5 },
  // { value: "The suspense builder", isPremiumFeature: true, creditsCost: 5 },
  // { value: "The FOMO factory", isPremiumFeature: true, creditsCost: 5 },
  // {
  //   value: "ReviewBoost",
  //   isPremiumFeature: true,
  //   creditsCost: 5,
  //   tones: ["ReviewBoost"],
  // },
];

const ReviewBoostFields = [
  {
    name: "review",
    type: "text",
    label: "The feedback your Product/Service received",
    textArea: true,
    maxLength: 650,
    placeholder: "The Review of the product",
    className: "shadow-sm",
    required: true,
    rows: 3,
    tooltipText: "The Review of the product",
  },
  {
    name: "reviewer",
    type: "text",
    label: "Reviewer Name/ Name of the Reviewer",
    textArea: true,
    maxLength: 100,
    placeholder: "Name of the reviewer",
    className: "shadow-sm",
    required: true,
    rows: 3,
    tooltipText: "Name of the reviewer",
  },
  {
    name: "reviewedItem",
    type: "text",
    label:
      "The product/service under review/Your product/service receiving this review",
    textArea: true,
    maxLength: 200,
    placeholder: "Which product or service was reviewed?",
    className: "shadow-sm",
    required: true,
    rows: 3,
    tooltipText: "Which product or service was reviewed?",
  },
  {
    name: "idealMarket",
    type: "text",
    label: "(Your) optimal target audience",
    textArea: true,
    maxLength: 200,
    placeholder:
      "E.g., Entrepreneurs interested in productivity tools and apps",
    className: "shadow-sm",
    required: true,
    rows: 3,
    tooltipText:
      "E.g., Entrepreneurs interested in productivity tools and apps",
  },
  {
    name: "cta",
    type: "text",
    label: "Call To Action (CTA)",
    textArea: true,
    maxLength: 150,
    placeholder:
      "E.g., Streamline your workflow—download our productivity app now!",
    className: "shadow-sm",
    required: true,
    rows: 3,
    tooltipText:
      "E.g., Streamline your workflow—download our productivity app now!",
  },
];

const FacebookFields = [
  {
    name: "serviceOrProduct",
    type: "text",
    label: "Your Product/Service",
    textArea: true,
    maxLength: 200,
    placeholder:
      "A sleek, eco-friendly water bottle with temperature control for outdoor enthusiasts.",
    className: "shadow-sm",
    required: true,
    rows: 1,
    tooltipText:
      "A sleek, eco-friendly water bottle with temperature control for outdoor enthusiasts.",
  },
  {
    name: "offeringUniqueness",
    type: "text",
    label: "What are the distinctive features of your product/service?",
    textArea: true,
    maxLength: 500,
    placeholder:
      "Incorporates biodegradable materials, perfect for the environmentally conscious consumer.",
    className: "shadow-sm",
    required: true,
    rows: 3,
    tooltipText:
      "Incorporates biodegradable materials, perfect for the environmentally conscious consumer.",
  },
  {
    name: "idealMarket",
    type: "text",
    label: "(Your) optimal target audience",
    textArea: true,
    maxLength: 200,
    placeholder:
      "Outdoor adventurers aged 25-45 who prioritize sustainability and durability in their gear.",
    className: "shadow-sm",
    required: true,
    rows: 2,
    tooltipText:
      "Outdoor adventurers aged 25-45 who prioritize sustainability and durability in their gear.",
  },
  {
    name: "cta",
    type: "text",
    label: "Call To Action (CTA)",
    textArea: true,
    maxLength: 150,
    placeholder:
      "Order now to stay hydrated and eco-friendly on your next adventure!",
    className: "shadow-sm",
    required: true,
    rows: 2,
    tooltipText:
      "Order now to stay hydrated and eco-friendly on your next adventure!",
  },
];

export default function Page() {
  const {
    isOpen,
    closeModal,
    isLoading,
    handleNewAddPost,
    textRef,
    loadingAnimation,
    showActions,
    handleRadioSelect,
    premiumFeatureDetail,
    selectedMode,
    isPostGenerated,
    recentGeneratedAdId,
    updateGptResponse,
  } = useFacebookAd();

  console.log("NOW REF", textRef.current);

  const dropdown = (
    <Dropdown
      options={
        FacebookRadios.find((item) => item.value === selectedMode)?.tones || []
      }
    />
  );

  let form =
    selectedMode === "" ? (
      ""
    ) : selectedMode !== "ReviewBoost" ? (
      <Fragment>
        {dropdown}
        {FacebookFields.map((field) => {
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
              toolTipText={field.tooltipText}
            />
          );
        })}
      </Fragment>
    ) : (
      <Fragment>
        {dropdown}
        {ReviewBoostFields.map((field) => {
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
              toolTipText={field.tooltipText}
            />
          );
        })}
      </Fragment>
    );

  return (
    <Fragment>
      <AddPosting
        isPostGenerated={isPostGenerated}
        submitHandler={handleNewAddPost}
        formToRender={form}
        isLoading={isLoading}
        handleRadioSelect={handleRadioSelect}
        radioList={FacebookRadios}
        selectedMode={selectedMode}
        responseRef={textRef}
        loadingAnimation={loadingAnimation}
        recentGeneratedAdId={recentGeneratedAdId}
        updateResponse={updateGptResponse}
        isOpen={isOpen}
        title="Facebook"
        description="Select any Facebook feature to continue"
        closeModal={closeModal}
      />
    </Fragment>
  );
}
